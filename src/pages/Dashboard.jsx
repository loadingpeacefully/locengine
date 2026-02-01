import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
// IMPORT SAMPLES
import { JUNGLE_MODULE } from '../data/module_jungle';
import { RIVER_MODULE } from '../data/module_river';
import { Plus, Box, Clock, Globe, LayoutDashboard, LogOut, Zap, User, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = StorageService.getAll();
    if (!stored || stored.length === 0) {
       const seeds = [
         {
           id: 'jungle-01',
           title: "DECIMAL OPERATIONS",
           status: "DEPLOYED",
           date: "2026-02-01",
           localeCount: 3,
           slides: JUNGLE_MODULE,
           localeData: { "Global": {}, "India": {} },
           createdAt: Date.now()
         },
         {
           id: 'river-02',
           title: "MONEY WORD PROBLEMS",
           status: "DRAFT",
           date: "2026-01-28",
           localeCount: 5,
           slides: RIVER_MODULE,
           localeData: { "Global": {}, "India": {} },
           createdAt: Date.now()
         }
       ];
       seeds.forEach(p => StorageService.save(p));
       setProjects(seeds);
    } else {
      setProjects(stored);
    }
  }, []);

  const createNew = () => {
    const newId = crypto.randomUUID();
    const newProject = {
      id: newId,
      title: "NEW_MATH_MODULE",
      slides: JUNGLE_MODULE, 
      localeData: { "Global": {}, "India": {} },
      createdAt: Date.now(),
      status: "DRAFT"
    };
    StorageService.save(newProject);
    navigate(`/editor/${newId}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(confirm("Delete this module?")) {
      StorageService.delete(id);
      setProjects(StorageService.getAll());
    }
  };

  return (
    <div className="h-screen bg-[#02040a] font-mono text-cyan-500 overflow-y-auto custom-scrollbar">
      
      {/* 1. HEADER (Matches Gemini Style) */}
      <header className="h-16 shrink-0 border-b border-white/5 px-8 flex items-center justify-between bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer">
          <Zap size={24} fill="currentColor" className="text-fuchsia-500" />
          <h1 className="text-xl font-black uppercase tracking-tighter text-white">LocEngine <span className="text-white/20">v5.0</span></h1>
        </div>

        <nav className="flex gap-8">
          <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-cyan-400">
            <LayoutDashboard size={14}/> Dashboard
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <LogOut size={14}/> Workspace
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
            <User size={18} className="text-white/40" />
          </div>
        </div>
      </header>

      {/* 2. CONTENT AREA */}
      <div className="max-w-6xl mx-auto space-y-12 py-16 px-8">
        
        {/* Title Section */}
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">PROJECT_ARCHIVES</h1>
            <p className="text-sm text-white/30 font-mono italic">Welcome back, Suneet. Your global nodes are currently synced.</p>
          </div>
          <button 
            onClick={createNew} 
            className="bg-cyan-500 text-black px-6 py-3 font-black uppercase text-xs skew-x-[-15deg] flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <Plus size={16} /> Create New Node
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(proj => (
            <div 
              key={proj.id} 
              onClick={() => navigate(`/editor/${proj.id}`)}
              className="bg-[#0a0b1e]/90 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.05)] group hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-cyan-500/10 flex items-center justify-center rounded-lg">
                    <Box className="text-cyan-400" size={20} />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 ${
                    proj.status === 'DEPLOYED' ? 'bg-green-500/10 text-green-500' : 
                    proj.status === 'DRAFT' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-cyan-500/10 text-cyan-500'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-white/30 flex items-center gap-1 font-mono"><Clock size={10}/> {proj.date || new Date(proj.createdAt).toLocaleDateString()}</span>
                    <span className="text-[10px] text-white/30 flex items-center gap-1 font-mono"><Globe size={10}/> {proj.localeCount || 2} Locales</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-2">
                  <button className="flex-grow p-2 text-[10px] font-black uppercase bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                    Edit
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, proj.id)}
                    className="p-2 text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-400 hover:bg-red-500/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;