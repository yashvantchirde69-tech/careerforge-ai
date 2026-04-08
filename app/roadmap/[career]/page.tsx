'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { CAREERS_BY_ID, DOMAIN_META, CAREERS } from '@/lib/careers';
import type { RoadmapStep } from '@/lib/careers';

interface PageProps {
  params: Promise<{ career: string }>;
}

const SALARY_COLORS = ['#8B5CF6', '#06B6D4', '#F59E0B'];

export default function RoadmapPage({ params }: PageProps) {
  const { career: careerId } = use(params);
  const career = CAREERS_BY_ID[careerId];

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'salary' | 'skills'>('roadmap');

  const storageKey = `careerforge_progress_${careerId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setCompletedSteps(new Set(JSON.parse(saved)));
  }, [storageKey]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId); else next.add(stepId);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  };

  const otherCareers = CAREERS.filter(c => c.domain === career?.domain && c.id !== careerId).slice(0, 3);

  if (!career) {
    return (
      <div style={{ minHeight: '100vh', background: '#070B14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', padding: '24px' }}>
        <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="grid-pattern" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
          <h1 style={{ color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '12px' }}>Career Not Found</h1>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 32px' }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  const meta = DOMAIN_META[career.domain];
  const progress = Math.round((completedSteps.size / career.roadmapSteps.length) * 100);
  const salaryLevels = [
    { label: 'Entry Level (0–2 yrs)', salary: career.avgSalary2026.entry, color: SALARY_COLORS[0] },
    { label: 'Mid Level (3–6 yrs)', salary: career.avgSalary2026.mid, color: SALARY_COLORS[1] },
    { label: 'Senior Level (7+ yrs)', salary: career.avgSalary2026.senior, color: SALARY_COLORS[2] },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', position: 'relative', overflowX: 'hidden' }}>
      <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="grid-pattern" />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ─── Back Navigation ─── */}
        <Link href="/results" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
          ← Back to Results
        </Link>

        {/* ─── Hero Header ─── */}
        <div style={{ background: `linear-gradient(135deg, ${meta.color}20, ${meta.color}08)`, border: `1px solid ${meta.color}44`, borderRadius: '20px', padding: '36px', marginBottom: '32px', boxShadow: `0 0 50px ${meta.glow}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '4rem', flexShrink: 0 }}>{career.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}44` }}>{meta.emoji} {meta.label}</span>
                <span className="badge badge-green">{career.jobOutlook}</span>
              </div>
              <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, marginBottom: '10px' }}>{career.title}</h1>
              <p style={{ color: '#D1D5DB', lineHeight: 1.7, fontSize: '1rem', marginBottom: '20px' }}>{career.description}</p>
              {/* Top companies */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {career.topCompanies.map(c => (
                  <span key={c} style={{ background: 'rgba(255,255,255,0.07)', padding: '5px 12px', borderRadius: '20px', color: '#D1D5DB', fontSize: '0.8rem' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Progress Tracker ─── */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '28px', border: `1px solid ${meta.color}33` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, margin: '0 0 4px', fontFamily: 'Space Grotesk, sans-serif' }}>Your Progress</h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>{completedSteps.size} of {career.roadmapSteps.length} milestones completed</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '2rem', color: meta.color, lineHeight: 1 }}>{progress}%</div>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Complete</div>
            </div>
          </div>
          <div className="progress-bar-track">
            <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${meta.color}, ${meta.color}cc)`, borderRadius: '100px', transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)', boxShadow: `0 0 12px ${meta.glow}` }} />
          </div>
          {progress === 100 && (
            <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', color: '#6EE7B7', textAlign: 'center', fontWeight: 600 }}>
              🏆 Congratulations! You've completed the entire roadmap!
            </div>
          )}
        </div>

        {/* ─── Tab Nav ─── */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(17,24,39,0.7)', borderRadius: '14px', padding: '6px', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {([['roadmap', '🗺️ Roadmap'], ['salary', '💰 Salary Trends'], ['skills', '⚡ Skills']] as const).map(([tab, label]) => (
            <button key={tab} id={`roadmap-tab-${tab}`} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: activeTab === tab ? `${meta.color}30` : 'transparent',
              color: activeTab === tab ? meta.color : '#9CA3AF',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>

        {/* ─── Tab: Roadmap ─── */}
        {activeTab === 'roadmap' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '31px', top: '32px', bottom: '32px', width: '2px', background: `linear-gradient(to bottom, ${meta.color}, ${meta.color}44, transparent)`, zIndex: 0 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {career.roadmapSteps.map((step, i) => {
                  const isDone = completedSteps.has(step.id);
                  const isExpanded = expandedStep === step.id;

                  return (
                    <div key={step.id} id={`roadmap-step-${i}`} style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                      {/* Step indicator */}
                      <button
                        id={`step-check-${step.id}`}
                        onClick={() => toggleStep(step.id)}
                        style={{
                          width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0,
                          background: isDone ? `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` : 'rgba(17,24,39,0.9)',
                          border: `3px solid ${isDone ? meta.color : 'rgba(255,255,255,0.15)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.6rem', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                          boxShadow: isDone ? `0 0 20px ${meta.glow}` : 'none',
                          position: 'relative', zIndex: 2,
                        }}
                      >
                        {isDone ? '✅' : (i + 1)}
                      </button>

                      {/* Step card */}
                      <div className="glass-card" style={{ flex: 1, padding: '24px', border: isDone ? `1px solid ${meta.color}44` : '' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                          <div>
                            <span style={{ color: '#9CA3AF', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{step.phase}</span>
                            <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700, margin: '4px 0 0' }}>{step.title}</h3>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <span className="badge badge-cyan" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>⏱ {step.duration}</span>
                            <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>📈 {step.salaryImpact}</span>
                          </div>
                        </div>

                        <p style={{ color: '#D1D5DB', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '16px' }}>{step.description}</p>

                        {/* Skills chips */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {step.skills.map(skill => (
                            <span key={skill} style={{ background: `${meta.color}18`, color: meta.color, padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: `1px solid ${meta.color}33` }}>{skill}</span>
                          ))}
                        </div>

                        {/* Expand button */}
                        <button
                          id={`expand-step-${step.id}`}
                          onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                          style={{ background: 'none', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: '8px', padding: '8px 16px', color: '#9CA3AF', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = meta.color; (e.currentTarget as HTMLElement).style.color = meta.color; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}
                        >
                          {isExpanded ? '▲ Hide Resources' : '▼ View Resources'}
                        </button>

                        {/* Expanded Resources */}
                        {isExpanded && (
                          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', animation: 'fadeInUp 0.3s ease' }}>
                            <div style={{ color: '#A78BFA', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>📚 Click to Learn Resources</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {step.resources.map((res, ri) => (
                                <a
                                  key={ri}
                                  id={`resource-${step.id}-${ri}`}
                                  href={res.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', transition: 'all 0.25s' }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = meta.color + '66'; (e.currentTarget as HTMLElement).style.background = `${meta.color}12`; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                                >
                                  <span style={{ fontSize: '1.2rem' }}>{res.type === 'Course' ? '🎓' : res.type === 'Book' ? '📖' : res.type === 'Certification' ? '🏅' : '🔧'}</span>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ color: '#F3F4F6', fontWeight: 600, fontSize: '0.9rem' }}>{res.name}</div>
                                    <div style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '2px' }}>{res.type}</div>
                                  </div>
                                  <span style={{ color: meta.color, fontSize: '0.85rem' }}>Open →</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab: Salary ─── */}
        {activeTab === 'salary' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '8px' }}>💰 2026 Salary Trajectory — {career.title}</h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '32px' }}>Based on current market data across India's top tech hubs (Bangalore, Mumbai, Hyderabad, Delhi NCR)</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {salaryLevels.map((level, i) => {
                  const numericVal = i === 0 ? 35 : i === 1 ? 65 : 90; // relative bar widths
                  return (
                    <div key={level.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ color: '#D1D5DB', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>{level.label}</span>
                        <span style={{ color: level.color, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem' }}>{level.salary}</span>
                      </div>
                      <div className="progress-bar-track" style={{ height: '12px' }}>
                        <div style={{ height: '100%', width: `${numericVal}%`, background: `linear-gradient(90deg, ${level.color}, ${level.color}88)`, borderRadius: '100px', transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)', boxShadow: `0 0 12px ${level.color}66` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px' }}>
                <div style={{ color: '#10B981', fontWeight: 700, marginBottom: '10px', fontFamily: 'Space Grotesk, sans-serif' }}>📊 Salary Growth Insights</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    `Entry → Senior salary jump: ${career.avgSalary2026.entry} → ${career.avgSalary2026.senior}`,
                    `India's ${DOMAIN_META[career.domain].label} sector is growing at 25–40% CAGR`,
                    'Remote work options significantly increase effective compensation',
                    'Certifications can fast-track salary by 2–3 years',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', color: '#D1D5DB', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Job Outlook */}
            <div className="glass-card" style={{ padding: '24px', border: `1px solid ${meta.color}33` }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>📈</div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '10px' }}>Job Market Outlook 2026</h3>
              <p style={{ color: '#D1D5DB', lineHeight: 1.7, marginBottom: '16px' }}>{career.jobOutlook}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {career.topCompanies.map(c => (
                  <span key={c} style={{ background: `${meta.color}15`, color: meta.color, padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, border: `1px solid ${meta.color}33` }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab: Skills ─── */}
        {activeTab === 'skills' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {career.skills.map((skill, i) => {
                const levelColor = skill.level === 'Beginner' ? '#10B981' : skill.level === 'Intermediate' ? '#06B6D4' : '#F59E0B';
                const levelWidth = skill.level === 'Beginner' ? 33 : skill.level === 'Intermediate' ? 66 : 100;
                return (
                  <div key={skill.name} id={`skill-card-${i}`} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', margin: 0 }}>{skill.name}</h4>
                        <span className="badge" style={{ background: `${levelColor}22`, color: levelColor, border: `1px solid ${levelColor}44`, fontSize: '0.72rem', padding: '3px 10px' }}>{skill.level}</span>
                        <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>⏱ ~{skill.estimatedHours}h</span>
                      </div>
                      <div className="progress-bar-track">
                        <div style={{ height: '100%', width: `${levelWidth}%`, background: levelColor, borderRadius: '100px', boxShadow: `0 0 8px ${levelColor}66` }} />
                      </div>
                    </div>
                    <a
                      id={`learn-skill-${i}`}
                      href={skill.learnUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: `${meta.color}22`, color: meta.color,
                        padding: '10px 18px', borderRadius: '10px', textDecoration: 'none',
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.85rem',
                        border: `1px solid ${meta.color}44`, transition: 'all 0.25s', flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${meta.color}35`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${meta.color}22`; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                    >
                      📚 Click to Learn
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Other Careers in Domain ─── */}
        {otherCareers.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>Other {meta.label} Careers</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {otherCareers.map(oc => (
                <Link key={oc.id} href={`/roadmap/${oc.id}`} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px', padding: '14px 18px', textDecoration: 'none', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = meta.color + '66'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{oc.emoji}</span>
                  <span style={{ color: '#F3F4F6', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'Space Grotesk, sans-serif' }}>{oc.title}</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
