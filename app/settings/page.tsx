'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('careerforge_gemini_key');
    if (stored) setApiKey(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem('careerforge_gemini_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    localStorage.removeItem('careerforge_gemini_key');
    setApiKey('');
    setSaved(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', position: 'relative' }}>
      <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="grid-pattern" />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '36px' }}>← Back to Home</Link>

        <h1 style={{ color: '#FFFFFF', fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>⚙️ Settings</h1>
        <p style={{ color: '#9CA3AF', fontSize: '1rem', marginBottom: '40px' }}>Configure your CareerForge AI experience</p>

        {/* API Key Card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', border: '1px solid rgba(124,58,237,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🤖</div>
            <div>
              <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 4px' }}>Gemini AI API Key</h2>
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>Required for the AI Mentor feedback section</p>
            </div>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
            <p style={{ color: '#FCD34D', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
              🔒 Your API key is stored <strong>only in your browser's local storage</strong>. It is never sent to any CareerForge server — only directly to Google's Gemini API.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="api-key-field" style={{ display: 'block', color: '#D1D5DB', fontWeight: 600, fontSize: '0.9rem', marginBottom: '10px', fontFamily: 'Space Grotesk, sans-serif' }}>
              Your Gemini API Key
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                id="api-key-field"
                type={revealed ? 'text' : 'password'}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF',
                  fontFamily: 'monospace', fontSize: '0.9rem', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              />
              <button
                id="toggle-reveal-btn"
                onClick={() => setRevealed(!revealed)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#9CA3AF', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.2s' }}
                title={revealed ? 'Hide' : 'Reveal'}
              >{revealed ? '🙈' : '👁️'}</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              id="save-api-key-btn"
              onClick={handleSave}
              disabled={!apiKey.trim()}
              style={{
                flex: 1, background: apiKey.trim() ? 'linear-gradient(135deg, #7C3AED, #4F46E5)' : 'rgba(255,255,255,0.05)',
                color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '14px',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem',
                cursor: apiKey.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.3s',
                boxShadow: apiKey.trim() ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
              }}
            >{saved ? '✅ Saved!' : '💾 Save API Key'}</button>
            {apiKey && (
              <button
                id="clear-api-key-btn"
                onClick={handleClear}
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5', borderRadius: '12px', padding: '14px 20px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}
              >🗑️ Clear</button>
            )}
          </div>
        </div>

        {/* How to get key */}
        <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
          <h3 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '16px' }}>📋 How to Get Your Free Gemini API Key</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { step: '1', text: 'Go to Google AI Studio', url: 'https://aistudio.google.com/app/apikey', linkText: 'aistudio.google.com' },
              { step: '2', text: 'Sign in with your Google account (free)' },
              { step: '3', text: 'Click "Create API Key" → Select any project' },
              { step: '4', text: 'Copy the key and paste it above' },
              { step: '5', text: 'Click Save — the AI Mentor is now activated!' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>{item.step}</span>
                <span style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {item.text}
                  {'url' in item && item.url && (
                    <> — <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#A78BFA' }}>{item.linkText}</a></>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clear all data */}
        <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(239,68,68,0.2)' }}>
          <h3 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '10px' }}>🗑️ Reset All Data</h3>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '16px' }}>Clear all assessment results and roadmap progress stored in your browser.</p>
          <button
            id="reset-all-data-btn"
            onClick={() => {
              if (confirm('Are you sure? This will delete all your assessment results and roadmap progress.')) {
                const keys = Object.keys(localStorage).filter(k => k.startsWith('careerforge_'));
                keys.forEach(k => localStorage.removeItem(k));
                setApiKey('');
                alert('All CareerForge data has been cleared.');
              }
            }}
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5', borderRadius: '10px', padding: '12px 20px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}
          >Reset Everything</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/results" style={{ color: '#A78BFA', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to My Results</Link>
        </div>
      </div>
    </div>
  );
}
