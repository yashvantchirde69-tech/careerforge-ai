'use client';

import { motion } from 'framer-motion';

export interface RoadmapStepData {
  phase: 'Foundation' | 'Build' | 'Launch';
  title: string;
  action: string;
}

interface RoadmapProps {
  steps: RoadmapStepData[];
}

export default function Roadmap({ steps }: RoadmapProps) {
  const getPhaseDetails = (phase: string) => {
    switch (phase) {
      case 'Foundation':
        return { icon: '🌱', color: '#10B981', glow: 'rgba(16,185,129,0.3)' };
      case 'Build':
        return { icon: '🏗️', color: '#06B6D4', glow: 'rgba(6,182,212,0.3)' };
      case 'Launch':
        return { icon: '🚀', color: '#8B5CF6', glow: 'rgba(139,92,246,0.3)' };
      default:
        return { icon: '⚡', color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' };
    }
  };

  return (
    <div className="relative py-12 px-2 md:px-8 max-w-4xl mx-auto w-full">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wider mb-4">
          YOUR ACTION PLAN
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Career DNA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Roadmap</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A personalized 3-step action plan to address your critical gaps and accelerate your career based on your Gemini AI profile.
        </p>
      </motion.div>

      {/* Vertical Timeline Line */}
      <div className="absolute left-6 md:left-1/2 top-48 bottom-12 w-[2px] bg-gradient-to-b from-cyan-500/80 via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)] transform md:-translate-x-1/2" />

      {/* Steps */}
      <div className="space-y-12 md:space-y-24 relative z-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const { icon, color, glow } = getPhaseDetails(step.phase);

          return (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? '' : 'md:flex-row-reverse'}`}
            >
              {/* Content Side */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
              >
                <div className="bg-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 shadow-lg shadow-black/20 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-300 relative group overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at ${isEven ? 'right' : 'left'} center, ${color}, transparent)` }}
                  />

                  <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                    <span 
                      className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border inline-block mb-1"
                      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}
                    >
                      {step.phase}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {step.action}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Center Node */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center -mt-6 md:mt-0"
              >
                <div 
                  className="w-12 h-12 rounded-full border-4 border-slate-900 flex items-center justify-center text-xl z-20"
                  style={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    boxShadow: `0 0 20px ${glow}, inset 0 0 10px ${glow}`,
                    borderColor: `${color}50`
                  }}
                >
                  {icon}
                </div>
              </motion.div>
              
              {/* Empty Space for opposing side on Desktop */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
