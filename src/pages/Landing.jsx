import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#02040a]">
      {/* Background FX */}
      <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full animate-pulse"></div>

      <div className="z-10 text-center space-y-8 max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded-full mb-4">
          <Activity size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80">System_Status: Operational</span>
        </div>
        
        <h1 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
          ARCHITECT THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">GLOBAL CLASSROOM</span>
        </h1>
        
        <p className="text-lg text-white/40 font-mono max-w-2xl mx-auto italic">
          The world's first "Template + Skin" authoring suite. Decouple math logic from cultural narrative. Deploy locally in milliseconds.
        </p>

        <div className="flex items-center justify-center gap-6 pt-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group relative px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] skew-x-[-15deg] overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <span className="relative flex items-center gap-3">Initialize System <ArrowRight size={20}/></span>
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] skew-x-[-15deg] hover:bg-white/5 transition-all"
          >
            Access Archives
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
        <span>Global_Scale</span>
        <span>Math_Core</span>
        <span>Narrative_Skin</span>
      </div>
    </div>
  );
};

export default Landing;