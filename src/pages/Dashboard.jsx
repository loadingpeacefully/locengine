import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
// IMPORT THE NEW SAMPLES
import { JUNGLE_MODULE } from '../data/module_jungle';
import { RIVER_MODULE } from '../data/module_river';
import { Plus, Box, Clock, Globe, ExternalLink, LayoutDashboard, LogOut, Zap, User, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = StorageService.getAll();
    
    // SEEDING LOGIC: If DB is empty, load our 2 sample modules
    if (!stored || stored.length === 0) {
       const seeds = [
         {
           id: 'jungle-01',
           title: "THE JUNGLE MYSTERY",
           status: "DEPLOYED",
           date: new Date().toLocaleDateString(),
           localeCount: 2,
           slides: JUNGLE_MODULE,
           localeData: { "Global": {}, "India": {} },
           createdAt: Date.now()
         },
         {
           id: 'river-02',
           title: "CYBER RIVER CROSSING",
           status: "REVIEW",
           date: new Date().toLocaleDateString(),
           localeCount: 2,
           slides: RIVER_MODULE,
           localeData: { "Global": {}, "India": {} },
           createdAt: Date.now()
         }
       ];
       
       // Save to storage so they persist
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
      title: "UNTITLED_MODULE",
      slides: JUNGLE_MODULE, // Default template
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'DEPLOYED': return 'text-emerald-400 bg-emerald-900/20 border-emerald-900/50';
      case 'DRAFT': return 'text-amber-400 bg-amber-900/20 border-amber-900/50';
      case 'REVIEW': return 'text-cyan-400 bg-cyan-900/20 border-cyan-900/50';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] font-mono text-slate-200 selection:bg-cyan-500/30">
      
      {/* HEADER */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#02040a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Zap className="text-fuchsia-500 fill-current w-6 h-6" />
          <h1 className="text-xl font-black tracking-tighter text-white">LOCENGINE <span className="text-white/20 font-light">V5.0</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
            <LogOut size={14} /> Workspace
          </button>
          <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40">
            <User size={16} />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tight mb-2">PROJECT_ARCHIVES</h1>
            <p className="text-slate-500 italic text-sm">Welcome back. {projects.length} global nodes online.</p>
          </div>
          
          <button 
            onClick={createNew}
            className="group relative bg-cyan-400 text-black px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-cyan-300 transition-all skew-x-[-12deg]"
          >
            <span className="flex items-center gap-2 skew-x-[12deg]">
              <Plus size={16} strokeWidth={3} /> Create New Node
            </span>
          </button>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div 
              key={proj.id} 
              onClick={() => navigate(`/editor/${proj.id}`)}
              className="bg-[#0b0c15] border border-white/5 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col h-64 relative overflow-hidden cursor-pointer"
            >
              <div className="p-6 flex justify-between items-start">
                <div className="w-10 h-10 bg-cyan-500/10 rounded border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
                  <Box size={20} />
                </div>
                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase border ${getStatusColor(proj.status)}`}>
                  {proj.status}
                </span>
              </div>

              <div className="px-6 flex-1">
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight truncate">{proj.title}</h3>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {proj.date || new Date().toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Globe size={12} /> {proj.localeCount || 2} Locales</span>
                </div>
              </div>

              <div className="bg-[#0f111a] border-t border-white/5 p-4 flex gap-3 mt-auto relative z-10">
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest py-3 rounded-sm transition-colors border border-white/5 hover:border-white/20">
                  Edit
                </button>
                <button 
                  onClick={(e) => handleDelete(e, proj.id)}
                  className="w-10 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black border border-red-500/20 hover:border-red-500 rounded-sm transition-all duration-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;