'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import type { UserRole } from '@/lib/careers';

const ROLE_DATA = {
  student: {
    icon: '🎓',
    label: 'Student',
    headline: 'Find Your Perfect Career Before You Graduate',
    sub: "Don't graduate lost. Our 3-tier AI assessment maps your personality to your ideal career — with a step-by-step roadmap to get there.",
    stats: [{ value: '50+', label: 'Career Paths' }, { value: '3-Tier', label: 'Assessment' }, { value: '100%', label: 'Free' }],
    accentColor: '#8B5CF6',
    badge: '🎓 Students across Engineering, Medicine, Arts & Commerce',
  },
  fresher: {
    icon: '🚀',
    label: 'Fresher',
    headline: 'Land Your First Job That Actually Excites You',
    sub: "You have a degree. Now what? CareerForge AI analyzes your skills, identifies gaps, and gives you a personalized 90-day launch plan.",
    stats: [{ value: '2026', label: 'Salary Data' }, { value: 'AI', label: 'Mentor' }, { value: '90-Day', label: 'Plan' }],
    accentColor: '#06B6D4',
    badge: '🚀 Freshers from all streams — IT, Medical, Commerce & Arts',
  },
  jobseeker: {
    icon: '💼',
    label: 'Job Seeker',
    headline: 'Switch Careers or Level Up With AI Precision',
    sub: 'Feeling stuck? Our AI mentor gives you honest, direct feedback — like a career coach who tells you the truth, not just what you want to hear.',
    stats: [{ value: '10x', label: 'Faster Growth' }, { value: 'Live', label: 'Salary Trends' }, { value: 'Honest', label: 'AI Feedback' }],
    accentColor: '#F59E0B',
    badge: '💼 Mid-career professionals seeking pivot or promotion',
  },
};

const TYPING_PHRASES = [
  'AI Engineer in 12 months',
  'Hospital Administrator',
  'Fintech Analyst',
  'UX Designer',
  'Digital Marketing Lead',
  'Financial Analyst',
];

const DOMAIN_CARDS = [
  { emoji: '⚡', label: 'Engineering & Tech', desc: 'AI, Full-Stack, Cybersecurity, Cloud', color: '#8B5CF6', glow: 'rgba(139,92,246,0.2)' },
  { emoji: '🏥', label: 'Healthcare & Medicine', desc: 'Hospital Management, Health Informatics', color: '#10B981', glow: 'rgba(16,185,129,0.2)' },
  { emoji: '📊', label: 'Business & Finance', desc: 'Fintech, Investment Banking, Marketing', color: '#F59E0B', glow: 'rgba(245,158,11,0.2)' },
  { emoji: '🎨', label: 'Creative & Arts', desc: 'UX Design, Fine Arts, Digital Marketing', color: '#EC4899', glow: 'rgba(236,72,153,0.2)' },
];

const TESTIMONIALS = [
  { name: 'Priya S.', role: 'Now: AI Engineer at Google', text: "CareerForge's assessment revealed I was perfectly suited for AI/ML — I'd been studying the wrong field for 2 years.", avatar: '👩‍💻', stars: 5 },
  { name: 'Rahul M.', role: 'Now: Hospital Admin, Apollo', text: "The AI Mentor was brutally honest — it told me I lacked operational leadership skills and gave me a 6-month plan to fix it.", avatar: '👨‍⚕️', stars: 5 },
  { name: 'Ananya K.', role: 'Now: UX Lead, Flipkart', text: "The interactive roadmap changed everything. I could see every skill, every salary jump, every 'Click to Learn' — step by step.", avatar: '👩‍🎨', stars: 5 },
];

export default function HomePage() {
  const [role, setRole] = useState<UserRole>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[typingIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && charIndex < phrase.length) {
      timeout = setTimeout(() => setCharIndex(prev => prev + 1), 80);
    } else if (!isDeleting && charIndex === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(prev => prev - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTypingIndex(prev => (prev + 1) % TYPING_PHRASES.length);
    }
    setTypingText(phrase.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  const activeRole = role ? ROLE_DATA[role] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', position: 'relative', overflow: 'hidden' }}>
      {/* Background Elements */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="grid-pattern" />

      <Navbar role={role} />

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: 'relative', zIndex: 1, paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Top badge */}
          <div className="fade-in-up" style={{ marginBottom: '24px' }}>
            <span className="badge badge-violet">
              <span>✨</span> Next-Generation AI Career Platform
            </span>
          </div>

          {/* Main headline */}
          <h1 className="fade-in-up-delay-1" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            color: '#FFFFFF',
          }}>
            From <span className="gradient-text-violet">Classroom</span><br />
            to <span className="glow-text-cyan">Boardroom</span>
          </h1>

          {/* Typing subtitle */}
          <p className="fade-in-up-delay-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: '#9CA3AF', marginBottom: '12px' }}>
            Discover your path to becoming a
          </p>
          <div className="fade-in-up-delay-2" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#FFFFFF', marginBottom: '48px', minHeight: '2.5rem' }}>
            <span style={{ color: '#A78BFA' }}>{typingText}</span>
            <span className="cursor-blink" />
          </div>

          {/* ─── Role Selector ─────────────────────────────────────────────── */}
          <div className="fade-in-up-delay-3" style={{ marginBottom: '48px' }}>
            <p style={{ color: '#9CA3AF', marginBottom: '20px', fontSize: '1rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
              Who are you today?
            </p>
            <div id="role-selector" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {(Object.entries(ROLE_DATA) as [NonNullable<UserRole>, typeof ROLE_DATA.student][]).map(([key, data]) => (
                <button
                  key={key}
                  id={`role-btn-${key}`}
                  onClick={() => setRole(key === role ? null : key)}
                  style={{
                    background: role === key ? `linear-gradient(135deg, ${data.accentColor}33, ${data.accentColor}22)` : 'rgba(17,24,39,0.7)',
                    border: `2px solid ${role === key ? data.accentColor : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: '16px',
                    padding: '20px 32px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: role === key ? `0 0 30px ${data.accentColor}44` : 'none',
                    transform: role === key ? 'translateY(-4px)' : 'none',
                    minWidth: '160px',
                  }}
                  onMouseEnter={e => {
                    if (role !== key) {
                      (e.currentTarget as HTMLElement).style.borderColor = data.accentColor;
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (role !== key) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                      (e.currentTarget as HTMLElement).style.transform = 'none';
                    }
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{data.icon}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: role === key ? data.accentColor : '#F3F4F6', transition: 'color 0.3s' }}>{data.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Dynamic Role Content ─────────────────────────────────────── */}
          {activeRole ? (
            <div id="role-dashboard" style={{
              background: 'rgba(17,24,39,0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${activeRole.accentColor}44`,
              borderRadius: '20px',
              padding: '36px',
              marginBottom: '40px',
              boxShadow: `0 0 40px ${activeRole.accentColor}22`,
              animation: 'fadeInUp 0.4s ease',
            }}>
              <div className="badge" style={{ backgroundColor: `${activeRole.accentColor}22`, color: activeRole.accentColor, border: `1px solid ${activeRole.accentColor}44`, marginBottom: '20px', display: 'inline-flex' }}>
                {activeRole.badge}
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#FFFFFF', marginBottom: '16px', fontWeight: 700 }}>{activeRole.headline}</h2>
              <p style={{ color: '#D1D5DB', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                {activeRole.sub}
              </p>
              {/* Stats */}
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
                {activeRole.stats.map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: activeRole.accentColor }}>{stat.value}</div>
                    <div style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/assessment"
                id="hero-cta-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: `linear-gradient(135deg, ${activeRole.accentColor}, ${activeRole.accentColor}cc)`,
                  color: '#FFFFFF', padding: '16px 36px', borderRadius: '14px',
                  textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: '1.05rem', boxShadow: `0 0 25px ${activeRole.accentColor}66`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 45px ${activeRole.accentColor}88`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${activeRole.accentColor}66`; }}
              >
                Start My Free Assessment <span>→</span>
              </Link>
            </div>
          ) : (
            <div className="fade-in-up-delay-4" style={{ marginBottom: '40px' }}>
              <Link
                href="/assessment"
                id="hero-default-cta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
                  color: '#FFFFFF', padding: '18px 40px', borderRadius: '14px',
                  textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: '1.1rem', boxShadow: '0 0 30px rgba(124,58,237,0.5)',
                  marginRight: '16px', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                🚀 Start Free Assessment
              </Link>
              <Link
                href="/roadmap/ai-ml-engineer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  background: 'transparent', color: '#F3F4F6',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '18px 40px', borderRadius: '14px',
                  textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                  fontSize: '1.1rem', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#06B6D4'; (e.currentTarget as HTMLElement).style.color = '#22D3EE'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = '#F3F4F6'; }}
              >
                🗺️ Explore Roadmaps
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── DOMAIN CARDS ─────────────────────────────────────────────────── */}
      <section id="domains" style={{ position: 'relative', zIndex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FFFFFF', marginBottom: '12px' }}>
              Universal <span className="gradient-text-violet">Career Coverage</span>
            </h2>
            <p style={{ color: '#9CA3AF', fontSize: '1.05rem' }}>4 domains. 50+ careers. One platform.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {DOMAIN_CARDS.map((domain, idx) => (
              <div
                key={domain.label}
                id={`domain-card-${idx}`}
                className="glass-card"
                style={{ padding: '32px 24px', textAlign: 'center', cursor: 'pointer', animation: `fadeInUp 0.6s ease ${idx * 0.1}s forwards`, opacity: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = domain.color + '66'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${domain.glow}`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{domain.emoji}</div>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '10px', fontWeight: 700 }}>{domain.label}</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.6 }}>{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ position: 'relative', zIndex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-flex' }}>How It Works</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FFFFFF' }}>
              Your <span className="gradient-text-violet">3-Step Journey</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { step: '01', title: 'Level 1: The Matcher', desc: '20 psychometric questions that decode your personality, preferences, and natural aptitude. Takes 8 minutes.', icon: '🎯', color: '#8B5CF6', label: 'Psychometric Test' },
              { step: '02', title: 'Level 2: The Foundation', desc: 'A domain-specific technical quiz in your matched field. Tests your existing knowledge and identifies exact gaps.', icon: '🧠', color: '#06B6D4', label: 'Technical Quiz' },
              { step: '03', title: 'Level 3: The Elite', desc: 'Real-world scenario challenges that test your decision-making at a senior professional level.', icon: '🏆', color: '#F59E0B', label: 'Scenario Challenge' },
            ].map((step, i) => (
              <div key={step.step} id={`step-card-${i}`} className="glass-card" style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${step.color}22`, border: `2px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: step.color, opacity: 0.4 }}>{step.step}</span>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{step.title}</h3>
                    <span className="badge" style={{ background: `${step.color}22`, color: step.color, border: `1px solid ${step.color}44`, fontSize: '0.75rem' }}>{step.label}</span>
                  </div>
                  <p style={{ color: '#D1D5DB', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/assessment" id="how-it-works-cta" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '16px 40px', fontSize: '1.05rem' }}>
              Begin Your Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AI MENTOR PREVIEW ─────────────────────────────────────────────── */}
      <section id="ai-mentor-preview" style={{ position: 'relative', zIndex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-violet" style={{ marginBottom: '20px', display: 'inline-flex' }}>🤖 Powered by Gemini AI</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFFFFF', marginBottom: '16px' }}>
                An AI Mentor That <span className="gradient-text-violet">Tells the Truth</span>
              </h2>
              <p style={{ color: '#D1D5DB', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '24px' }}>
                Unlike generic career advice, our Gemini-powered AI Mentor analyzes your <strong style={{ color: '#A78BFA' }}>specific test answers</strong> and gives you the kind of honest, direct feedback a senior professional mentor would give.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Identifies your exact weaknesses (not generic advice)', 'Tells you which skills are blocking your salary jump', 'Acts as a professional career coach — not a cheerleader'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px', color: '#D1D5DB', lineHeight: 1.6 }}>
                    <span style={{ color: '#10B981', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Mock AI Feedback Card */}
            <div className="glass-card" style={{ padding: '28px', border: '1px solid rgba(124,58,237,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', boxShadow: '0 0 15px rgba(124,58,237,0.5)' }}>🤖</div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>CareerForge AI Mentor</div>
                  <div style={{ color: '#10B981', fontSize: '0.8rem' }}>● Live Analysis</div>
                </div>
              </div>
              <p style={{ color: '#D1D5DB', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '16px' }}>
                "Based on your assessment, you have <strong style={{ color: '#A78BFA' }}>strong analytical thinking</strong> and <strong style={{ color: '#A78BFA' }}>creativity</strong>, but your answers reveal a gap in <strong style={{ color: '#EF4444' }}>technical execution skills</strong>."
              </p>
              <p style={{ color: '#D1D5DB', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '20px' }}>
                "Specifically, Q7 and Q12 show you struggle with <strong style={{ color: '#EF4444' }}>system design thinking</strong>. Here's your exact 60-day plan to fix this..."
              </p>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ color: '#6EE7B7', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>💡 Priority Action</div>
                <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Complete the System Design course (linked below) within 30 days — this single skill will unlock 3 higher-paying job titles.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section id="testimonials" style={{ position: 'relative', zIndex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFFFFF' }}>
              Real <span className="gradient-text-gold">Transformations</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} id={`testimonial-${i}`} className="glass-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {Array.from({ length: t.stars }).map((_, j) => <span key={j} style={{ color: '#F59E0B' }}>★</span>)}
                </div>
                <p style={{ color: '#D1D5DB', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '20px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '2rem' }}>{t.avatar}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ color: '#10B981', fontSize: '0.8rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section id="final-cta" style={{ position: 'relative', zIndex: 1, padding: '40px 24px 120px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '24px', padding: '60px 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FFFFFF', marginBottom: '16px' }}>
              Your Dream Career Is<br /><span className="gradient-text-violet">3 Questions Away</span>
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '36px' }}>
              Free. No signup needed. 8 minutes. Get your personalized career map, AI mentor analysis, and interactive roadmap with 2026 salary data.
            </p>
            <Link href="/assessment" id="final-cta-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              color: '#FFFFFF', padding: '18px 48px', borderRadius: '14px',
              textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: '1.1rem', boxShadow: '0 0 40px rgba(124,58,237,0.5)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(124,58,237,0.7)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(124,58,237,0.5)'; }}
            >
              🚀 Start Free Assessment Now
            </Link>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '16px' }}>No credit card • No account required • Results in 8 minutes</p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer id="footer" style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#FFFFFF' }}>CareerForge AI</span>
        </div>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>© 2026 CareerForge AI. Built to guide every career — Engineering, Healthcare, Business & Arts.</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
          <Link href="/settings" style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>API Settings</Link>
          <Link href="/assessment" style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>Assessment</Link>
          <Link href="/roadmap/ai-ml-engineer" style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>Roadmaps</Link>
        </div>
      </footer>
    </div>
  );
}
