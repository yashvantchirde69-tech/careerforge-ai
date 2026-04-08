'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PSYCHO_QUESTIONS, TECH_QUIZZES, SCENARIO_QUESTIONS } from '@/lib/assessment-data';
import type { Domain } from '@/lib/careers';
import { DOMAIN_META } from '@/lib/careers';

type AssessmentLevel = 1 | 2 | 3;

interface AssessmentState {
  level: AssessmentLevel;
  currentQ: number;
  domainScores: Record<Domain, number>;
  topDomain: Domain | null;
  level1Answers: number[];
  level2Answers: { questionId: number; selectedIndex: number; correct: boolean }[];
  level3Answers: { questionId: number; selectedIndex: number; score: number }[];
  level2Score: number;
  level3Score: number;
  timeLeft: number;
  finished: boolean;
}

const DOMAINS: Domain[] = ['tech', 'healthcare', 'business', 'creative'];

function calcTopDomains(scores: Record<Domain, number>): Domain[] {
  return [...DOMAINS].sort((a, b) => scores[b] - scores[a]);
}

export default function AssessmentPage() {
  const router = useRouter();
  const [state, setState] = useState<AssessmentState>({
    level: 1, currentQ: 0,
    domainScores: { tech: 0, healthcare: 0, business: 0, creative: 0 },
    topDomain: null, level1Answers: [], level2Answers: [], level3Answers: [],
    level2Score: 0, level3Score: 0, timeLeft: 30, finished: false,
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const totalQuestions = state.level === 1 ? 20 : state.level === 2 ? 15 : 3;
  const progress = Math.round(((state.currentQ) / totalQuestions) * 100);

  // Timer for level 2 & 3
  useEffect(() => {
    if (!timerActive || state.level === 1) return;
    if (state.timeLeft <= 0) { handleAnswer(state.level === 2 ? -1 : -1); return; }
    const t = setTimeout(() => setState(s => ({ ...s, timeLeft: s.timeLeft - 1 })), 1000);
    return () => clearTimeout(t);
  }, [state.timeLeft, timerActive, state.level]);

  const handleAnswer = useCallback((optIdx: number) => {
    if (animating) return;
    setSelectedOption(optIdx);

    if (state.level === 1) {
      const q = PSYCHO_QUESTIONS[state.currentQ];
      const newScores = { ...state.domainScores };
      if (optIdx >= 0 && q.options[optIdx]) {
        const opts = q.options[optIdx].scores;
        (Object.keys(opts) as Domain[]).forEach(d => { newScores[d] = (newScores[d] || 0) + (opts[d] || 0); });
      }
      const newAnswers = [...state.level1Answers, optIdx];

      if (state.currentQ + 1 >= 20) {
        const ranked = calcTopDomains(newScores);
        const top = ranked[0];
        setTimeout(() => {
          setState(s => ({ ...s, domainScores: newScores, level1Answers: newAnswers, topDomain: top, level: 2, currentQ: 0, timeLeft: 45 }));
          setSelectedOption(null); setTimerActive(true);
        }, 600);
      } else {
        setTimeout(() => {
          setState(s => ({ ...s, domainScores: newScores, level1Answers: newAnswers, currentQ: s.currentQ + 1 }));
          setSelectedOption(null);
        }, 400);
      }
    } else if (state.level === 2) {
      const domain = state.topDomain!;
      const q = TECH_QUIZZES[domain][state.currentQ];
      const correct = optIdx === q.correctIndex;
      const newAnswers = [...state.level2Answers, { questionId: q.id, selectedIndex: optIdx, correct }];
      const newScore = state.level2Score + (correct ? 1 : 0);
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        if (state.currentQ + 1 >= 15) {
          setState(s => ({ ...s, level2Answers: newAnswers, level2Score: newScore, level: 3, currentQ: 0, timeLeft: 120 }));
          setSelectedOption(null); setTimerActive(true);
        } else {
          setState(s => ({ ...s, level2Answers: newAnswers, level2Score: newScore, currentQ: s.currentQ + 1, timeLeft: 45 }));
          setSelectedOption(null);
        }
      }, 2000);
    } else {
      const domain = state.topDomain!;
      const q = SCENARIO_QUESTIONS[domain][state.currentQ];
      const score = optIdx >= 0 ? q.options[optIdx].score : 0;
      const newAnswers = [...state.level3Answers, { questionId: q.id, selectedIndex: optIdx, score }];
      const newScore = state.level3Score + score;
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        if (state.currentQ + 1 >= 3) {
          // Save results and navigate
          const results = {
            domainScores: state.domainScores, topDomain: state.topDomain,
            level1Answers: state.level1Answers, level2Score: state.level2Score,
            level3Score: newScore, level2Answers: state.level2Answers,
            level3Answers: newAnswers, completedAt: Date.now(),
          };
          localStorage.setItem('careerforge_results', JSON.stringify(results));
          router.push('/results');
        } else {
          setState(s => ({ ...s, level3Answers: newAnswers, level3Score: newScore, currentQ: s.currentQ + 1, timeLeft: 120 }));
          setSelectedOption(null);
        }
      }, 2500);
    }
  }, [state, animating, router]);

  const levelColors = { 1: '#06B6D4', 2: '#8B5CF6', 3: '#F59E0B' };
  const levelLabels = { 1: 'Level 1 — The Matcher', 2: 'Level 2 — The Foundation', 3: 'Level 3 — The Elite' };
  const levelIcons = { 1: '🎯', 2: '🧠', 3: '🏆' };
  const color = levelColors[state.level as keyof typeof levelColors] || '#06B6D4';

  const currentQ = state.level === 1 ? PSYCHO_QUESTIONS[state.currentQ]
    : state.level === 2 ? TECH_QUIZZES[state.topDomain!]?.[state.currentQ]
    : SCENARIO_QUESTIONS[state.topDomain!]?.[state.currentQ];

  if (!currentQ) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#040814', position: 'relative', overflowX: 'hidden' }}>
      {/* Dark Navy Base with Cyan Orbs */}
      <div className="bg-orb" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent)', width: '800px', height: '800px', top: '-200px', left: '-200px', animationDelay: '0s', position: 'fixed', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div className="bg-orb" style={{ background: 'radial-gradient(circle, rgba(11,19,43,0.8), transparent)', width: '600px', height: '600px', bottom: '-100px', right: '-100px', animationDelay: '-5s', position: 'fixed', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div className="bg-orb" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent)', width: '500px', height: '500px', top: '40%', left: '40%', animationDelay: '-10s', position: 'fixed', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div className="grid-pattern" style={{ opacity: 0.5 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ─── Header ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← CareerForge AI
          </Link>
          <span className="badge" style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
            {levelIcons[state.level]} {levelLabels[state.level]}
          </span>
          {state.level > 1 && (
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: state.timeLeft <= 10 ? '#EF4444' : color, transition: 'color 0.3s' }}>
              ⏱ {state.timeLeft}s
            </span>
          )}
        </div>

        {/* ─── Progress ─── */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#9CA3AF', fontSize: '0.9rem', fontWeight: 500 }}>Question {state.currentQ + 1} of {totalQuestions}</span>
          <span style={{ color, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', textShadow: `0 0 10px ${color}88` }}>{progress}%</span>
        </div>
        <div className="progress-bar-track" style={{ marginBottom: '40px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 15px ${color}`, height: '100%', borderRadius: '100px', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        </div>

        {/* ─── Level Transition Banner ─── */}
        {state.level === 2 && state.currentQ === 0 && (
          <div style={{ background: `${color}15`, border: `1px solid ${color}44`, borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎉</div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', marginBottom: '6px' }}>
              Great! Your Domain: <span style={{ color }}>{DOMAIN_META[state.topDomain!]?.emoji} {DOMAIN_META[state.topDomain!]?.label}</span>
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Now unlocking your domain-specific technical assessment. 45 seconds per question.</div>
          </div>
        )}
        {state.level === 3 && state.currentQ === 0 && (
          <div style={{ background: '#F59E0B15', border: '1px solid #F59E0B44', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', marginBottom: '6px' }}>Elite Level Unlocked!</div>
            <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>3 real-world scenario challenges. These test your professional judgment — think carefully.</div>
          </div>
        )}

        {/* ─── Question Card ─── */}
        <div className="glass-card" style={{ 
          padding: '48px', 
          marginBottom: '32px', 
          border: `1px solid ${color}55`, 
          background: 'rgba(11, 19, 43, 0.6)',
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px ${color}15`,
          borderRadius: '24px',
          backdropFilter: 'blur(20px)'
        }}>
          {state.level === 3 && 'scenario' in currentQ && (
            <div style={{ background: `${color}15`, border: `1px solid ${color}33`, borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
              <div style={{ color, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '6px' }}>{(currentQ as typeof SCENARIO_QUESTIONS['tech'][0]).scenario}</div>
              <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{(currentQ as typeof SCENARIO_QUESTIONS['tech'][0]).context}</p>
            </div>
          )}

          {'category' in currentQ && (
            <div style={{ color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>{currentQ.category}</div>
          )}
          {'topic' in currentQ && (
            <div style={{ color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>{(currentQ as typeof TECH_QUIZZES['tech'][0]).topic}</div>
          )}

          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, lineHeight: 1.5, marginBottom: '36px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {currentQ.question}
          </h2>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentQ.options.map((opt, i) => {
              const optText = typeof opt === 'string' ? opt : 'text' in opt ? opt.text : '';
              const isSelected = selectedOption === i;
              const isCorrect = state.level === 2 && 'correctIndex' in currentQ && i === (currentQ as typeof TECH_QUIZZES['tech'][0]).correctIndex;
              const isWrong = isSelected && state.level === 2 && !isCorrect;
              let borderColor = 'rgba(255, 255, 255, 0.06)';
              let bg = 'rgba(8, 14, 33, 0.6)';
              let boxShadow = 'none';

              if (showExplanation && isCorrect) { borderColor = '#10B981'; bg = 'rgba(16,185,129,0.15)'; boxShadow = '0 0 20px rgba(16,185,129,0.25)'; }
              else if (showExplanation && isWrong) { borderColor = '#EF4444'; bg = 'rgba(239,68,68,0.15)'; boxShadow = '0 0 20px rgba(239,68,68,0.25)'; }
              else if (isSelected && !showExplanation) { borderColor = color; bg = `${color}22`; boxShadow = `0 0 25px ${color}40`; }

              return (
                <button
                  key={i}
                  id={`option-${i}`}
                  onClick={() => !showExplanation && selectedOption === null && handleAnswer(i)}
                  disabled={showExplanation || selectedOption !== null}
                  style={{
                    background: bg, border: `2px solid ${borderColor}`,
                    boxShadow: boxShadow,
                    borderRadius: '16px', padding: '20px 24px',
                    textAlign: 'left', cursor: showExplanation || selectedOption !== null ? 'default' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', width: '100%', color: '#F3F4F6',
                    fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', lineHeight: 1.6,
                    position: 'relative', overflow: 'hidden', backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={e => { 
                    if (!showExplanation && selectedOption === null) { 
                      (e.currentTarget as HTMLElement).style.borderColor = color; 
                      (e.currentTarget as HTMLElement).style.background = `${color}15`;
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}33`;
                    } 
                  }}
                  onMouseLeave={e => { 
                    if (!showExplanation && selectedOption !== i) { 
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.06)'; 
                      (e.currentTarget as HTMLElement).style.background = 'rgba(8, 14, 33, 0.6)';
                      (e.currentTarget as HTMLElement).style.transform = 'none';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    } 
                  }}
                >
                  <span style={{ color: color, fontWeight: 800, marginRight: '16px', fontSize: '1.1rem', fontFamily: 'Space Grotesk, sans-serif' }}>{String.fromCharCode(65 + i)}.</span>
                  {optText}
                </button>
              );
            })}
          </div>

          {/* Explanation for Level 2 & 3 */}
          {showExplanation && selectedOption !== null && (
            <div style={{ marginTop: '20px', padding: '16px 20px', borderRadius: '12px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', animation: 'fadeInUp 0.3s ease' }}>
              {'explanation' in currentQ && (
                <>
                  <div style={{ color: '#A78BFA', fontWeight: 700, marginBottom: '6px', fontFamily: 'Space Grotesk, sans-serif' }}>💡 Explanation</div>
                  <p style={{ color: '#D1D5DB', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{(currentQ as typeof TECH_QUIZZES['tech'][0]).explanation}</p>
                </>
              )}
              {'options' in currentQ && state.level === 3 && selectedOption !== null && (
                <>
                  <div style={{ color: '#A78BFA', fontWeight: 700, marginBottom: '6px', fontFamily: 'Space Grotesk, sans-serif' }}>
                    💡 Analysis {(currentQ as typeof SCENARIO_QUESTIONS['tech'][0]).options[selectedOption]?.score === 5 ? '✅ Excellent' : (currentQ as typeof SCENARIO_QUESTIONS['tech'][0]).options[selectedOption]?.score >= 3 ? '⚠️ Good' : '❌ Needs Work'}
                  </div>
                  <p style={{ color: '#D1D5DB', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                    {(currentQ as typeof SCENARIO_QUESTIONS['tech'][0]).options[selectedOption!]?.analysis}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Domain Score Preview (Level 1 only) */}
        {state.level === 1 && (
          <div className="glass-card" style={{ padding: '20px 24px' }}>
            <div style={{ color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px' }}>Domain Match Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DOMAINS.map(d => {
                const meta = DOMAIN_META[d];
                const max = state.level1Answers.length * 3 || 1;
                const pct = Math.min(100, Math.round((state.domainScores[d] / max) * 100));
                return (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '20px', textAlign: 'center' }}>{meta.emoji}</span>
                    <span style={{ color: '#9CA3AF', fontSize: '0.85rem', width: '140px', flexShrink: 0 }}>{meta.label}</span>
                    <div className="progress-bar-track" style={{ flex: 1 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: meta.color, borderRadius: '100px', transition: 'width 0.5s ease', boxShadow: `0 0 6px ${meta.glow}` }} />
                    </div>
                    <span style={{ color: meta.color, fontSize: '0.8rem', fontWeight: 700, width: '36px', textAlign: 'right' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
