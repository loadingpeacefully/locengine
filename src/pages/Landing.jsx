import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Activity } from 'lucide-react';

const SagaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-fuchsia-500">
    <path d="M4 19.5C4 18.6716 4.67157 18 5.5 18H18.5C19.3284 18 20 17.3284 20 16.5V6.5C20 5.67157 19.3284 5 18.5 5H5.5C4.67157 5 4 5.67157 4 6.5V19.5Z" stroke="currentColor" strokeWidth="2" />
    <path d="M4 8.5C4 8.5 7 9 9.5 7.5C12 6 12 4 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16.5C12 16.5 15 17 17.5 15.5C20 14 20 12 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 4V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#02040a] font-mono">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full animate-pulse"></div>

      <div className="z-10 text-center space-y-8 max-w-4xl px-6">
        {/* BLUE CHIP UPDATED */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-cyan-500/30 bg-cyan-500/5 rounded-full mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <SagaLogo />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Lesson SAGA</span>
        </div>
        
        <h1 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
          DESIGN THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">MODERN CLASSROOM</span>
        </h1>
        
        <p className="text-lg text-white/40 font-mono max-w-2xl mx-auto italic">
          Build lessons once. Teach them anywhere. Use AI to personalize every story.
        </p>

        <div className="flex items-center justify-center gap-6 pt-8">
          <button 
            onClick={() => navigate('/lesson-builder')}
            className="group relative px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] skew-x-[-15deg] overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <span className="relative flex items-center gap-3">Start Creating with AI <Sparkles size={20} className="inline ml-2" /></span>
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] skew-x-[-15deg] hover:bg-white/5 transition-all"
          >
            View My Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;