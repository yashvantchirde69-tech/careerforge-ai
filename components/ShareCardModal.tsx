'use client';

import { useRef, useState } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  domainEmoji: string;
  domainColor: string;
  careerTitle: string;
  powerQuote: string;
  overallScore: number;
}

export default function ShareCardModal({
  isOpen, onClose, domainName, domainEmoji, domainColor, careerTitle, powerQuote, overallScore
}: ShareCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Small delay to ensure refs are firmly painted if triggered immediately
      await new Promise(r => setTimeout(r, 100));

      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
        // High quality setting for 1080x1080
        pixelRatio: 2, 
      });
      
      const link = document.createElement('a');
      link.download = `CareerForge-${careerTitle.replace(/\s+/g, '-')}-DNA.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
      // Fallback alert
      alert('Failed to generate image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0">
          <h3 className="text-white font-bold font-['Space_Grotesk'] flex items-center gap-2">
            <Share2 size={18} className="text-cyan-400" /> Share Result
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition bg-white/5 hover:bg-white/10 rounded-full p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center bg-black/50">
          <p className="text-gray-400 text-sm mb-4 text-center">Preview of your 1080x1080 Share Card</p>
          
          {/* Card Wrapper (Scaled for UI preview) */}
          <div className="relative flex justify-center w-full" style={{ aspectRatio: '1/1' }}>
            <div className="w-full absolute inset-0 overflow-hidden rounded-xl border border-white/20 shadow-2xl shadow-cyan-500/20">
              {/* CSS scaling container to fit 1080px inside whatever width it gets */}
              <div 
                className="absolute origin-top-left"
                style={{
                  width: '1080px',
                  height: '1080px',
                  transform: 'scale(calc(100cqw / 1080))',
                  containerType: 'inline-size',
                }}
              >
                {/* The Actual Card that html-to-image captures */}
                <div 
                  ref={cardRef}
                  className="w-[1080px] h-[1080px] relative flex flex-col overflow-hidden bg-[#070B14]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Heavy Glass/Glow Backgrounds */}
                  <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] rounded-full opacity-30 mix-blend-screen blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${domainColor}, transparent)` }} />
                  <div className="absolute bottom-[-200px] right-[-200px] w-[800px] h-[800px] bg-cyan-600 rounded-full opacity-20 mix-blend-screen blur-[120px] pointer-events-none" />
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                  {/* Borders wrapper */}
                  <div className="absolute inset-4 rounded-[40px] border-4 pointer-events-none" style={{ borderColor: `${domainColor}66`, boxShadow: `inset 0 0 100px ${domainColor}33, 0 0 100px ${domainColor}33` }} />
                  <div className="absolute inset-8 rounded-[30px] border border-white/10 pointer-events-none bg-slate-900/40 backdrop-blur-xl" />

                  {/* Inner Content Layout */}
                  <div className="relative z-10 p-24 h-full flex flex-col">
                    
                    {/* Header: Logo & Score */}
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                          ⚡
                        </div>
                        <span className="font-['Space_Grotesk'] font-bold text-3xl text-white tracking-tight">
                          CareerForge <span className="text-cyan-400">AI</span>
                        </span>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-gray-400 text-xl font-semibold tracking-wider uppercase mb-2">DNA Score</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-['Space_Grotesk'] font-black text-6xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">{overallScore}</span>
                          <span className="text-cyan-400 text-3xl font-bold">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Title & Domain */}
                    <div className="flex flex-col items-center text-center my-auto">
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border mb-8" style={{ backgroundColor: `${domainColor}20`, borderColor: `${domainColor}50` }}>
                        <span className="text-3xl">{domainEmoji}</span>
                        <span className="text-white text-xl font-bold tracking-widest uppercase">{domainName}</span>
                      </div>
                      
                      <h1 className="font-['Space_Grotesk'] text-white font-black leading-[1.1] mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]" style={{ fontSize: '110px' }}>
                        {careerTitle}
                      </h1>
                    </div>

                    {/* Bottom: Quote */}
                    <div className="mt-auto pt-12 border-t border-white/20">
                      <div className="relative">
                        <span className="absolute -top-16 -left-8 text-[120px] text-white/10 font-serif leading-none">"</span>
                        <p className="text-3xl text-cyan-50 italic font-semibold leading-relaxed max-w-3xl pr-12 drop-shadow-lg">
                          {powerQuote}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 shrink-0 bg-slate-900/90 backdrop-blur-md">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-4 rounded-xl font-['Space_Grotesk'] font-bold text-lg text-white flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              boxShadow: '0 0 30px rgba(6,182,212,0.4)'
            }}
          >
            {downloading ? (
              <>
                <span className="animate-spin text-2xl font-normal leading-none mb-1">⟳</span> Generating...
              </>
            ) : (
              <>
                <Download size={24} /> Download Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
