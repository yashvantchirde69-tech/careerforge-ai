'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { UserRole } from '@/lib/careers';

const NAV_CONTENT: Record<NonNullable<UserRole>, { cta: string; tools: string[] }> = {
  student: {
    cta: 'Start Your Assessment',
    tools: ['Career Matcher', 'Skill Roadmaps', 'College Guide'],
  },
  fresher: {
    cta: 'Find Your First Role',
    tools: ['Job Fit Score', 'Resume Tips', 'Interview Prep'],
  },
  jobseeker: {
    cta: 'Upgrade Your Career',
    tools: ['Career Switch', 'Salary Benchmark', 'AI Coach'],
  },
};

interface NavbarProps {
  role: UserRole;
}

export default function Navbar({ role }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const content = role ? NAV_CONTENT[role] : null;

  return (
    <>
      <nav
        id="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(7,11,20,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          padding: '0 24px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <Link href="/" id="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 110 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', boxShadow: '0 0 15px rgba(6,182,212,0.5)',
            }}>⚡</div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#FFFFFF' }}>
              CareerForge <span style={{ color: '#06B6D4' }}>AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div id="nav-tools" className="hidden md:flex items-center gap-8">
            {content && content.tools.map((tool) => (
              <span key={tool} className="text-gray-400 hover:text-cyan-400 text-sm cursor-pointer transition-colors duration-200 font-sans">
                {tool}
              </span>
            ))}
            {!content && (
              <>
                <Link href="/assessment" className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors duration-200">Assessment</Link>
                <Link href="/roadmap/ai-ml-engineer" className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors duration-200">Roadmaps</Link>
                <Link href="/settings" className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors duration-200">AI Mentor</Link>
              </>
            )}
          </div>

          {/* CTA Button / Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/assessment"
              id="nav-cta-btn"
              className="hidden md:flex"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                boxShadow: '0 0 15px rgba(6,182,212,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(6,182,212,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(6,182,212,0.4)'; }}
            >
              {content?.cta || 'Get Started'}
            </Link>
            
            {/* Mobile menu button */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center text-white bg-transparent border border-cyan-500/30 p-2 rounded-lg cursor-pointer z-110"
              style={{ boxShadow: '0 0 10px rgba(6,182,212,0.2)' }}
            >
              {menuOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} className="text-cyan-400" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 min-h-screen z-50 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-slate-900/95 backdrop-blur-md border-l border-cyan-500/20 shadow-[-10px_0_30px_rgba(6,182,212,0.15)] z-[105] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6 gap-6 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {content && content.tools.map((tool) => (
          <span key={tool} className="text-gray-300 hover:text-cyan-400 text-lg cursor-pointer transition-colors" onClick={() => setMenuOpen(false)}>
            {tool}
          </span>
        ))}
        {!content && (
          <>
            <Link href="/assessment" className="text-gray-300 hover:text-cyan-400 text-lg no-underline transition-colors" onClick={() => setMenuOpen(false)}>Assessment</Link>
            <Link href="/roadmap/ai-ml-engineer" className="text-gray-300 hover:text-cyan-400 text-lg no-underline transition-colors" onClick={() => setMenuOpen(false)}>Roadmaps</Link>
            <Link href="/settings" className="text-gray-300 hover:text-cyan-400 text-lg no-underline transition-colors" onClick={() => setMenuOpen(false)}>AI Mentor</Link>
          </>
        )}
        
        <div className="mt-8">
          <Link
            href="/assessment"
            className="flex justify-center text-center w-full"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 0 15px rgba(6,182,212,0.4)'
            }}
            onClick={() => setMenuOpen(false)}
          >
            {content?.cta || 'Get Started'}
          </Link>
        </div>
      </div>
    </>
  );
}

