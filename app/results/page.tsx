'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CAREERS, DOMAIN_META, CAREERS_BY_ID } from '@/lib/careers';
import type { Domain } from '@/lib/careers';
import Roadmap from '@/components/Roadmap';
import ShareCardModal from '@/components/ShareCardModal';

interface AssessmentResults {
  domainScores: Record<Domain, number>;
  topDomain: Domain;
  level1Answers: number[];
  level2Score: number;
  level3Score: number;
  level2Answers: { questionId: number; selectedIndex: number; correct: boolean }[];
  level3Answers: { questionId: number; selectedIndex: number; score: number }[];
  completedAt: number;
}

interface GeminiMentorFeedback {
  overall: string;
  strengths: string[];
  weaknesses: string[];
  priorityAction: string;
  careerFit: string;
  bluntTruth: string;
  powerQuote: string;
  roadmapSteps?: { phase: 'Foundation' | 'Build' | 'Launch'; title: string; action: string; }[];
}

const DOMAINS: Domain[] = ['tech', 'healthcare', 'business', 'creative'];

export default function ResultsPage() {
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [mentorLoading, setMentorLoading] = useState(false);
  const [mentorFeedback, setMentorFeedback] = useState<GeminiMentorFeedback | null>(null);
  const [mentorError, setMentorError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'mentor' | 'careers'>('overview');
  const [animateScores, setAnimateScores] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('careerforge_results');
    if (saved) {
      setResults(JSON.parse(saved));
      setTimeout(() => setAnimateScores(true), 300);
    }
    const savedKey = localStorage.getItem('careerforge_gemini_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const getTopDomains = (scores: Record<Domain, number>): Domain[] =>
    [...DOMAINS].sort((a, b) => scores[b] - scores[a]);

  const getRecommendedCareers = (domain: Domain) =>
    CAREERS.filter(c => c.domain === domain).slice(0, 3);

  const getOverallScore = (r: AssessmentResults) => {
    const l1 = Math.round((r.level1Answers.length / 20) * 100);
    const l2 = Math.round((r.level2Score / 15) * 100);
    const l3ScoreMax = 15; // 3 questions × max 5 points each
    const l3 = Math.round((r.level3Score / l3ScoreMax) * 100);
    return Math.round((l1 * 0.2 + l2 * 0.4 + l3 * 0.4));
  };

  const fetchGeminiFeedback = async () => {
    if (!apiKey.trim()) { setShowApiInput(true); return; }
    if (!results) return;

    setMentorLoading(true);
    setMentorError('');

    const topDomain = results.topDomain;
    const meta = DOMAIN_META[topDomain];
    const l2Pct = Math.round((results.level2Score / 15) * 100);
    const l3ScoreMax = 15;
    const l3Pct = Math.round((results.level3Score / l3ScoreMax) * 100);
    const domainRanking = getTopDomains(results.domainScores).map((d, i) => `${i + 1}. ${DOMAIN_META[d].label} (${results.domainScores[d]} pts)`).join('\n');

    const prompt = `You are a world-class career mentor with 20 years of experience coaching professionals across tech, healthcare, business, and creative fields. You are brutally honest, deeply caring, and exceptionally perceptive. You do NOT give generic advice — you analyze the specific data in front of you.

A user has completed the CareerForge AI 3-level assessment. Here is their complete performance data:

PRIMARY DOMAIN MATCH: ${meta.label} (${meta.emoji})
DOMAIN SCORE RANKING:
${domainRanking}

LEVEL 1 (Psychometric — 20 questions): Completed all 20 questions.
LEVEL 2 (Technical Quiz — 15 questions): Score ${results.level2Score}/15 (${l2Pct}% correct)
LEVEL 3 (Scenario Challenges — 3 questions): Total score ${results.level3Score}/15 points (${l3Pct}%)

INTERPRETATION GUIDELINES (use these to calibrate your feedback):
- Level 2 score 13-15/15 (87-100%): Strong technical foundation. Needs specialization, not basics.
- Level 2 score 9-12/15 (60-86%): Decent foundation with gaps. Needs targeted remediation in specific areas.
- Level 2 score 0-8/15 (0-59%): Foundational knowledge is weak. Basics must be rebuilt before advancing.
- Level 3 score 12-15 (80-100%): Excellent professional judgment. Ready for senior roles.
- Level 3 score 8-11 (53-79%): Good judgment with some gaps. Mid-level readiness.
- Level 3 score 0-7 (0-52%): Professional decision-making needs significant development.

Give your response as a JSON object with EXACTLY these keys:
{
  "overall": "2-3 sentence honest overall assessment of this person's career readiness — specific, not generic",
  "strengths": ["3 specific strengths based on actual scores", "...", "..."],
  "weaknesses": ["2-3 specific weaknesses that are genuinely blocking their career growth", "...", "..."],
  "priorityAction": "ONE specific, actionable thing they MUST do THIS WEEK to accelerate their career — be very specific, not vague. Include a specific resource or step.",
  "careerFit": "Which specific career in their domain fits them BEST right now based on their scores, and why in 1-2 sentences",
  "bluntTruth": "The one uncomfortable truth you'd tell this person that no one else will — like a mentor who really cares about their success. Be real, not harsh.",
  "powerQuote": "A 1-sentence badass, highly motivating 'One-Liner Alpha Quote' tailored specifically to their Career DNA and strengths, perfect for social media sharing.",
  "roadmapSteps": [
    { "phase": "Foundation", "title": "Short title", "action": "Specific action item" },
    { "phase": "Build", "title": "Short title", "action": "Specific action item" },
    { "phase": "Launch", "title": "Short title", "action": "Specific action item" }
  ]
}

Be specific. Use their actual domain (${meta.label}). Reference their actual scores. Do not give cookie-cutter advice. This person is counting on you to be honest.`;

    try {
      const resp = await fetch(`/api/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, clientKey: apiKey }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err?.error || 'API error');
      }

      const data = await resp.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('No response from Gemini');

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Could not parse Gemini response');
      const feedback: GeminiMentorFeedback = JSON.parse(jsonMatch[0]);
      
      localStorage.setItem('careerforge_gemini_key', apiKey);
      setMentorFeedback(feedback);
      setActiveTab('mentor');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMentorError(`Error: ${msg}. Please check your Gemini API key and try again.`);
    } finally {
      setMentorLoading(false);
    }
  };

  if (!results) {
    return (
      <div style={{ minHeight: '100vh', background: '#070B14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="grid-pattern" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎯</div>
          <h1 style={{ color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '12px' }}>No Assessment Results Found</h1>
          <p style={{ color: '#9CA3AF', marginBottom: '32px' }}>Complete the assessment first to see your personalized results.</p>
          <Link href="/assessment" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '16px 36px' }}>Start Assessment →</Link>
        </div>
      </div>
    );
  }

  const topDomains = getTopDomains(results.domainScores);
  const primaryDomain = topDomains[0];
  const meta = DOMAIN_META[primaryDomain];
  const overallScore = getOverallScore(results);
  const recommendedCareers = getRecommendedCareers(primaryDomain);
  const l2Pct = Math.round((results.level2Score / 15) * 100);
  const l3Max = 15;
  const l3Pct = Math.round((results.level3Score / l3Max) * 100);

  const scoreColor = overallScore >= 70 ? '#10B981' : overallScore >= 50 ? '#F59E0B' : '#EF4444';
  const readinessLabel = overallScore >= 80 ? 'Elite Ready' : overallScore >= 65 ? 'Job Ready' : overallScore >= 50 ? 'Learning Phase' : 'Foundation Needed';

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', position: 'relative', overflowX: 'hidden' }}>
      <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="grid-pattern" />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ─── Header ─── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>← Back to Home</Link>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎯</div>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '8px' }}>Your Career Assessment Results</h1>
          <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>Completed {new Date(results.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {/* ─── Primary Domain Banner ─── */}
        <div style={{
          background: `linear-gradient(135deg, ${meta.color}22, ${meta.color}11)`,
          border: `1px solid ${meta.color}55`, borderRadius: '20px', padding: '32px',
          marginBottom: '32px', textAlign: 'center',
          boxShadow: `0 0 40px ${meta.glow}`,
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{meta.emoji}</div>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Your Primary Domain</div>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0' }}>{meta.label}</h2>
        </div>

        {/* ─── Score Cards ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {/* Overall score */}
          <div className="glass-card" style={{ padding: '28px', textAlign: 'center', border: `1px solid ${scoreColor}44` }}>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: scoreColor, lineHeight: 1, marginBottom: '8px' }}>
              {animateScores ? overallScore : 0}%
            </div>
            <div style={{ color: scoreColor, fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{readinessLabel}</div>
            <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>Overall Score</div>
          </div>
          {/* Level 2 */}
          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: '#06B6D4', lineHeight: 1, marginBottom: '8px' }}>{results.level2Score}/15</div>
            <div style={{ color: '#06B6D4', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{l2Pct}% Correct</div>
            <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>Technical Quiz</div>
          </div>
          {/* Level 3 */}
          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: '#F59E0B', lineHeight: 1, marginBottom: '8px' }}>{results.level3Score}/{l3Max}</div>
            <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{l3Pct}% Elite Score</div>
            <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>Scenario Challenge</div>
          </div>
        </div>

        {/* ─── Domain Breakdown ─── */}
        <div className="glass-card" style={{ padding: '28px', marginBottom: '32px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Domain Compatibility Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topDomains.map((d, i) => {
              const dm = DOMAIN_META[d];
              const maxScore = 60; // 20 questions × 3 max
              const pct = Math.min(100, Math.round((results.domainScores[d] / maxScore) * 100));
              return (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem', width: '24px', textAlign: 'center' }}>{dm.emoji}</span>
                  <span style={{ color: '#D1D5DB', fontSize: '0.9rem', width: '160px', flexShrink: 0 }}>{dm.label}</span>
                  <div className="progress-bar-track" style={{ flex: 1 }}>
                    <div style={{ height: '100%', width: animateScores ? `${pct}%` : '0%', background: dm.color, borderRadius: '100px', transition: 'width 1s cubic-bezier(0.4,0,0.2,1)', boxShadow: `0 0 8px ${dm.glow}` }} />
                  </div>
                  <span style={{ color: dm.color, fontWeight: 700, fontSize: '0.9rem', width: '40px', textAlign: 'right' }}>{pct}%</span>
                  {i === 0 && <span className="badge badge-violet" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>Top Match</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Tab Navigation ─── */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(17,24,39,0.7)', borderRadius: '14px', padding: '6px', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {([['overview', '📊 Overview'], ['mentor', '🤖 AI Mentor'], ['careers', '🗺️ Career Paths']] as const).map(([tab, label]) => (
            <button key={tab} id={`tab-${tab}`} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: activeTab === tab ? 'rgba(124,58,237,0.3)' : 'transparent',
              color: activeTab === tab ? '#A78BFA' : '#9CA3AF',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem',
              transition: 'all 0.2s', borderBottom: activeTab === tab ? '2px solid #8B5CF6' : '2px solid transparent',
            }}>{label}</button>
          ))}
        </div>

        {/* ─── Tab: Overview ─── */}
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div className="glass-card" style={{ padding: '28px', marginBottom: '20px' }}>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '16px' }}>Your Assessment Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  { label: 'Questions Answered', value: '38 Total', icon: '✅', color: '#10B981' },
                  { label: 'Primary Domain', value: meta.label, icon: meta.emoji, color: meta.color },
                  { label: 'Technical Accuracy', value: `${l2Pct}%`, icon: '🧠', color: '#06B6D4' },
                  { label: 'Scenario Judgment', value: `${l3Pct}%`, icon: '🏆', color: '#F59E0B' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ color: item.color, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem' }}>{item.value}</div>
                      <div style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '2px' }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button id="get-ai-mentor-btn" onClick={fetchGeminiFeedback} disabled={mentorLoading} style={{
                flex: 1, minWidth: '200px', background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
                color: '#FFFFFF', border: 'none', borderRadius: '14px', padding: '16px',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem',
                cursor: mentorLoading ? 'wait' : 'pointer', boxShadow: '0 0 25px rgba(124,58,237,0.4)',
                transition: 'all 0.3s',
              }}>
                {mentorLoading ? '🤖 Analyzing...' : '🤖 Get AI Mentor Feedback'}
              </button>
              <Link href={`/roadmap/${recommendedCareers[0]?.id}`} style={{
                flex: 1, minWidth: '200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                color: '#FFFFFF', textDecoration: 'none', borderRadius: '14px', padding: '16px',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 0 25px rgba(6,182,212,0.4)',
              }}>🗺️ View My Roadmap</Link>
            </div>

            {/* API Key Input */}
            {showApiInput && (
              <div className="glass-card" style={{ padding: '24px', marginTop: '16px', border: '1px solid rgba(124,58,237,0.3)' }}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Enter Your Gemini API Key</div>
                <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '16px', lineHeight: 1.6 }}>
                  Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#A78BFA' }}>aistudio.google.com</a>. Your key is stored locally and never sent to our servers.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input id="gemini-api-key-input" type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                    placeholder="AIzaSy..." style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 16px', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', outline: 'none' }} />
                  <button id="submit-api-key-btn" onClick={fetchGeminiFeedback} style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                    Analyze
                  </button>
                </div>
              </div>
            )}
            {mentorError && <div style={{ marginTop: '12px', padding: '14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#FCA5A5', fontSize: '0.9rem' }}>{mentorError}</div>}
          </div>
        )}

        {/* ─── Tab: AI Mentor ─── */}
        {activeTab === 'mentor' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            {mentorFeedback ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 24px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}>🤖</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem' }}>CareerForge AI Mentor</div>
                    <div style={{ color: '#10B981', fontSize: '0.8rem' }}>● Powered by Google Gemini • Personalized to your results</div>
                  </div>
                </div>

                {/* Overall */}
                <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <div style={{ color: '#A78BFA', fontWeight: 700, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>📋 Overall Assessment</div>
                  <p style={{ color: '#F3F4F6', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>{mentorFeedback.overall}</p>
                </div>

                {/* Strengths + Weaknesses */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ color: '#10B981', fontWeight: 700, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>✅ Your Strengths</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {mentorFeedback.strengths.map((s, i) => (
                        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#F3F4F6', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          <span style={{ color: '#10B981', fontWeight: 700, flexShrink: 0 }}>→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <div style={{ color: '#EF4444', fontWeight: 700, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>⚠️ Critical Gaps</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {mentorFeedback.weaknesses.map((w, i) => (
                        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#F3F4F6', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          <span style={{ color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>→</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Priority Action */}
                <div style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ color: '#F59E0B', fontWeight: 700, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem' }}>🚀 Priority Action This Week</div>
                  <p style={{ color: '#F3F4F6', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>{mentorFeedback.priorityAction}</p>
                </div>

                {/* Career Fit */}
                <div className="glass-card" style={{ padding: '24px', border: `1px solid ${meta.color}44` }}>
                  <div style={{ color: meta.color, fontWeight: 700, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>{meta.emoji} Best Career Fit For You</div>
                  <p style={{ color: '#F3F4F6', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>{mentorFeedback.careerFit}</p>
                </div>

                {/* Blunt Truth */}
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ color: '#FCA5A5', fontWeight: 700, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>🔥 The Honest Truth (That Others Won't Tell You)</div>
                  <p style={{ color: '#F3F4F6', lineHeight: 1.8, fontSize: '1rem', margin: 0, fontStyle: 'italic' }}>"{mentorFeedback.bluntTruth}"</p>
                </div>

                {mentorFeedback.roadmapSteps && (
                  <div className="mt-8 border-t border-white/10 pt-8">
                    <Roadmap steps={mentorFeedback.roadmapSteps} />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => setIsShareModalOpen(true)} style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', padding: '16px 36px', borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', transition: 'all 0.3s'
                  }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                    📸 View Share Card
                  </button>
                  <Link href={`/roadmap/${recommendedCareers[0]?.id}`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 36px', fontSize: '1rem' }}>
                    View My Personalized Roadmap →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
                {mentorLoading ? (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'orbFloat 2s ease infinite' }}>🤖</div>
                    <h3 style={{ color: '#FFFFFF', marginBottom: '12px' }}>Gemini AI is analyzing your results...</h3>
                    <p style={{ color: '#9CA3AF' }}>Crafting personalized, honest feedback based on your specific answers. Usually takes 5–10 seconds.</p>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
                    <h3 style={{ color: '#FFFFFF', marginBottom: '12px' }}>Get Your AI Mentor Feedback</h3>
                    <p style={{ color: '#9CA3AF', marginBottom: '24px', lineHeight: 1.7 }}>Google Gemini will analyze your exact test performance and give you honest, personalized career coaching.</p>
                    <button onClick={() => { setActiveTab('overview'); setShowApiInput(true); }} className="btn-primary" style={{ border: 'none', cursor: 'pointer', display: 'inline-block', padding: '14px 32px' }}>
                      🤖 Get AI Feedback
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── Tab: Career Paths ─── */}
        {activeTab === 'careers' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Top Career Recommendations for You</h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Based on your {meta.label} domain match and test performance</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recommendedCareers.map((career, i) => (
                <div key={career.id} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap', border: i === 0 ? `1px solid ${meta.color}44` : '' }}>
                  <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{career.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{career.title}</h4>
                      {i === 0 && <span className="badge badge-violet" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>Best Match</span>}
                    </div>
                    <p style={{ color: '#D1D5DB', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '12px' }}>{career.tagline}</p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      <span style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>📈 {career.jobOutlook}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '8px', color: '#D1D5DB' }}>Entry: {career.avgSalary2026.entry}</span>
                      <span style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '8px', color: '#D1D5DB' }}>Mid: {career.avgSalary2026.mid}</span>
                      <span style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '8px', color: '#D1D5DB' }}>Senior: {career.avgSalary2026.senior}</span>
                    </div>
                    <Link href={`/roadmap/${career.id}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: i === 0 ? `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` : 'rgba(255,255,255,0.08)',
                      color: '#FFFFFF', padding: '10px 20px', borderRadius: '10px',
                      textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                      transition: 'all 0.3s',
                    }}>View Full Roadmap →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        domainName={meta.label}
        domainEmoji={meta.emoji}
        domainColor={meta.color}
        careerTitle={recommendedCareers[0]?.title || 'Professional'}
        powerQuote={mentorFeedback?.powerQuote || "Empowered to build the future."}
        overallScore={overallScore}
      />
    </div>
  );
}
