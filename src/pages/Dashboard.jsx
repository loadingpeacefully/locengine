import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { THEME } from '../theme';
import { Box, Clock, Globe, ExternalLink, ArrowLeft, Archive, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(StorageService.getAll() || []);
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(confirm("Delete this module from archives?")) {
      StorageService.delete(id);
      setProjects(StorageService.getAll());
    }
  };

  return (
    <div className={`h-screen ${THEME.bg} p-12 overflow-y-auto font-mono text-cyan-500`}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div className="space-y-2">
            <button onClick={() => navigate('/lesson-builder')} className="flex items-center gap-2 text-white/40 hover:text-white uppercase text-[10px] font-black tracking-widest mb-4">
                <ArrowLeft size={16}/> Back to Builder
            </button>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <Archive className="text-fuchsia-500" /> Lesson SAGA Archives
            </h1>
            <p className="text-sm text-white/30 font-mono italic">Stored neural modules: {projects.length}</p>
          </div>
        </div>

        {/* GRID */}
        {projects.length === 0 ? (
            <div className="text-center text-white/20 py-20 italic">No modules in archive. Create one in the Builder.</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(proj => (
                <div key={proj.id} className={`${THEME.panel} group hover:border-cyan-500/50 transition-all cursor-pointer p-6 space-y-4`}>
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-cyan-500/10 flex items-center justify-center rounded-lg"><Box className="text-cyan-400" size={20} /></div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 ${proj.status === 'SAMPLE' ? 'bg-fuchsia-500/10 text-fuchsia-500' : 'bg-cyan-500/10 text-cyan-500'}`}>{proj.status || 'DRAFT'}</span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase group-hover:text-cyan-400 transition-colors truncate">{proj.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-white/30 flex items-center gap-1 font-mono"><Clock size={10}/> {proj.date || new Date(proj.createdAt).toLocaleDateString()}</span>
                    <span className="text-[10px] text-white/30 flex items-center gap-1 font-mono"><Globe size={10}/> {proj.localeCount || 2} Locales</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex gap-2">
                    <button onClick={() => navigate(`/editor/${proj.id}`)} className="flex-grow p-2 text-[10px] font-black uppercase bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all">Edit</button>
                    <button onClick={(e) => handleDelete(e, proj.id)} className="p-2 text-[10px] font-black uppercase bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-all"><Trash2 size={14}/></button>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;