import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { getTemplate } from '../engine/registry';
import { ChevronLeft, ChevronRight, Zap, Code, Globe, Activity, Settings, Maximize2, LogOut, Save, Monitor, MousePointerClick } from 'lucide-react';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [activeLocale, setActiveLocale] = useState("India");
  const [slideIndex, setSlideIndex] = useState(0); 
  const [jsonWidth, setJsonWidth] = useState(30);
  const [viewMode, setViewMode] = useState('split');
  
  // Track active window: 'global' or 'local'
  const [activeWindow, setActiveWindow] = useState('local'); 
  
  const isResizing = useRef(false);

  // LOAD PROJECT
  useEffect(() => {
    const data = StorageService.getById(id);
    if (!data) {
        if (id.startsWith('new') || id.startsWith('ai') || id.startsWith('sample')) {
             const all = StorageService.getAll();
             const found = all.find(p => p.id === id);
             if (found) setProject(found);
             else navigate('/lesson-builder');
        } else {
             navigate('/dashboard');
        }
    } else {
        setProject(data);
    }
  }, [id, navigate]);

  const handleSave = () => { 
    if (project) {
      StorageService.save(project);
    }
  };

  const handleSaveAndClose = () => {
    handleSave();
    navigate('/lesson-builder');
  };

  // --- Resizing Logic ---
  const startResizing = useCallback(() => { isResizing.current = true; }, []);
  const stopResizing = useCallback(() => { isResizing.current = false; }, []);
  const resize = useCallback((e) => {
    if (isResizing.current) {
      const newWidth = (e.clientX / window.innerWidth) * 100 - 20; 
      if (newWidth > 15 && newWidth < 60) setJsonWidth(newWidth);
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => window.removeEventListener('mousemove', resize);
  }, [resize, stopResizing]);

  if (!project) return <div className="bg-[#02040a] h-screen text-cyan-500 flex items-center justify-center font-mono animate-pulse">INITIALIZING_NEURAL_LINK...</div>;

  const currentSlide = project.slides?.[slideIndex];
  const templateType = currentSlide?.template || currentSlide?.type || 'readonly';
  const TemplateDef = getTemplate(templateType);
  const globalData = project.localeData?.["Global"] || {};
  const localData = project.localeData?.[activeLocale] || {};

  // --- JSON CONTEXT SWITCHING ---
  const getJsonContent = () => {
    if (activeWindow === 'global') {
      return JSON.stringify(project.slides, null, 2);
    } else {
      return JSON.stringify(project.localeData?.[activeLocale] || {}, null, 2);
    }
  };

  const handleJsonChange = (e) => {
    try {
      const parsed = JSON.parse(e.target.value);
      if (activeWindow === 'global') {
        setProject({ ...project, slides: parsed });
      } else {
        setProject({
          ...project,
          localeData: {
            ...project.localeData,
            [activeLocale]: parsed
          }
        });
      }
    } catch (err) {
      // Ignore invalid JSON
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#02040a] text-slate-400 font-mono overflow-hidden selection:bg-fuchsia-500/30">
      
      {/* 1. HEADER */}
      <header className="h-14 shrink-0 border-b border-white/5 px-6 flex items-center justify-between bg-[#05060a] z-50">
        <div className="flex items-center gap-4">
          <div className="group flex items-center gap-2 cursor-pointer transition-colors" onClick={handleSaveAndClose}>
             <div className="p-2 bg-white/5 rounded-sm group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 transition-all">
                <ChevronLeft size={16} />
             </div>
             <div className="flex flex-col">
                <h1 className="text-sm font-black uppercase tracking-widest text-white leading-none">LESSON SAGA <span className="text-fuchsia-500 text-[10px]">V5.0</span></h1>
                <span className="text-[8px] font-bold text-slate-600 tracking-[0.2em] uppercase mt-1">Status: Optimized</span>
             </div>
          </div>
        </div>

        <div className="flex bg-black border border-white/10 p-1 rounded-sm gap-1">
          <button 
            onClick={() => setViewMode('split')}
            className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 ${viewMode === 'split' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
          >
            <Monitor size={12} /> Dual Stream
          </button>
          <button 
            onClick={() => setViewMode('single')}
            className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 ${viewMode === 'single' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
          >
            <Maximize2 size={12} /> Full Review
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="group relative bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest skew-x-[-12deg] shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[12deg]"></div>
            <span className="skew-x-[12deg] flex items-center gap-2">Deploy_To_Stage <Zap size={12} fill="currentColor"/></span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. SIDEBAR */}
        <aside className="w-72 bg-[#05060a] border-r border-white/5 flex flex-col shrink-0 z-20">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-[9px] font-bold text-fuchsia-500 uppercase tracking-widest">Active Node</h2>
               <Settings size={12} className="text-slate-600 cursor-pointer hover:text-white transition-colors"/>
            </div>
            
            <div className="space-y-1">
              <div 
                onClick={() => setActiveWindow('global')}
                className={`p-3 border transition-all flex items-center justify-between group cursor-pointer ${activeWindow === 'global' ? 'border-amber-500 bg-amber-900/10' : 'border-white/5 bg-[#0a0a0a] hover:bg-white/5'}`}
              >
                 <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeWindow === 'global' ? 'text-amber-500' : 'text-slate-400 group-hover:text-white'}`}>Global</span>
                 <Activity size={10} className={activeWindow === 'global' ? 'text-amber-500' : 'text-slate-600'}/>
              </div>

              {Object.keys(project.localeData || {}).filter(k => k !== 'Global').map(key => (
                  <div 
                    key={key}
                    onClick={() => { setActiveLocale(key); setActiveWindow('local'); }}
                    className={`p-3 cursor-pointer transition-all border-l-2 flex items-center justify-between group relative overflow-hidden ${activeLocale === key ? 'bg-cyan-500/10 border-cyan-400' : 'border-white/5 bg-[#0b0c12] hover:bg-white/5'}`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest z-10 ${activeLocale === key ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{key}</span>
                    {activeLocale === key && <Globe size={12} className="text-cyan-400 z-10 animate-pulse"/>}
                  </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
            <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                Neural Params <div className="h-[1px] flex-1 bg-cyan-900/30"></div>
            </h2>
            <div className="space-y-4">
               {Object.keys(globalData).map(key => (
                <div key={key} className="space-y-1.5 group">
                  <div className="flex justify-between items-center">
                    <label className="text-[8px] text-slate-500 font-bold uppercase tracking-wider group-hover:text-cyan-200 transition-colors">{key}</label>
                    <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors"></div>
                  </div>
                  <input 
                    value={localData[key] || ''} 
                    onChange={(e) => {
                      const newData = {...project};
                      if(!newData.localeData[activeLocale]) newData.localeData[activeLocale] = {};
                      newData.localeData[activeLocale][key] = e.target.value;
                      setProject(newData);
                    }}
                    className="w-full bg-[#08090d] border border-white/10 text-white text-[11px] px-3 py-2.5 focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] outline-none transition-all font-mono rounded-sm"
                    placeholder={`Enter ${key}...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 3. DYNAMIC JSON AREA */}
        <section style={{ width: `${jsonWidth}%` }} className="bg-[#05060a] border-r border-white/5 flex flex-col relative shrink-0 z-10 transition-all duration-300">
           <div className={`h-9 flex items-center justify-between px-4 border-b border-white/5 transition-colors duration-300 ${activeWindow === 'global' ? 'bg-amber-900/10' : 'bg-cyan-900/10'}`}>
             <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${activeWindow === 'global' ? 'text-amber-500' : 'text-cyan-500'}`}>
               <Code size={12}/> {activeWindow === 'global' ? 'LESSON_STRUCTURE.JSON' : `LOCALE_${activeLocale.toUpperCase()}.JSON`}
             </span>
           </div>
           <textarea 
             key={activeWindow} 
             defaultValue={getJsonContent()}
             onBlur={handleJsonChange} 
             className="flex-1 bg-transparent p-6 text-[10px] font-mono text-cyan-100/60 outline-none resize-none leading-relaxed custom-scrollbar selection:bg-fuchsia-500/30"
             spellCheck="false"
           />
           <div onMouseDown={startResizing} className="absolute -right-1.5 top-0 w-3 h-full cursor-col-resize z-50 flex items-center justify-center hover:bg-cyan-500/10 group transition-colors">
              <div className="w-[1px] h-full bg-white/5 group-hover:bg-cyan-500/50 transition-colors"/>
           </div>
        </section>

        {/* 4. PREVIEW AREA */}
        <section className="flex-1 flex flex-col bg-black relative min-w-0 min-h-0">
           
           <div className="flex-1 flex flex-col min-h-0 relative">
              
              {/* TOP: GLOBAL */}
              {(viewMode === 'split' || (viewMode === 'single' && activeWindow === 'global')) && (
                <div 
                    onClick={() => setActiveWindow('global')}
                    className={`relative min-h-0 transition-all duration-300 group cursor-default
                    ${viewMode === 'split' ? 'flex-1' : 'h-full'}
                    ${activeWindow === 'global' 
                        ? 'border-2 border-amber-500 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]' 
                        : 'border-b border-white/5 hover:border-amber-500/30 opacity-60 hover:opacity-100'}`}
                >
                  <div className="absolute top-4 left-4 z-50 pointer-events-none">
                     <span className={`text-[9px] font-black uppercase px-3 py-1 tracking-widest transition-colors ${activeWindow === 'global' ? 'bg-amber-500 text-black' : 'bg-amber-900/50 text-amber-200 border border-amber-500/30'}`}>
                        GLOBAL NODE
                     </span>
                  </div>
                  <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                     <div className="min-h-full">
                        {TemplateDef && <TemplateDef.component data={currentSlide} locale="Global" localeData={globalData} hideHeader={true} />}
                     </div>
                  </div>
                </div>
              )}
              
              {/* SYNCED TAG */}
              {viewMode === 'split' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none">
                    <div className="bg-fuchsia-600 text-white text-[9px] font-black uppercase px-4 py-1 tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.5)] skew-x-[-10deg]">
                        <span className="skew-x-[10deg] block">SYNCED</span>
                    </div>
                </div>
              )}

              {/* BOTTOM: LOCAL */}
              {(viewMode === 'split' || (viewMode === 'single' && activeWindow === 'local')) && (
                <div 
                    onClick={() => setActiveWindow('local')}
                    className={`relative min-h-0 transition-all duration-300 group cursor-default
                    ${viewMode === 'split' ? 'flex-1' : 'h-full'}
                    ${activeWindow === 'local' 
                        ? 'border-2 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'hover:border-cyan-500/30 opacity-60 hover:opacity-100'}`}
                >
                    <div className="absolute top-4 left-4 z-50 pointer-events-none">
                        <span className={`text-[9px] font-black uppercase px-3 py-1 tracking-widest transition-colors ${activeWindow === 'local' ? 'bg-cyan-500 text-black' : 'bg-cyan-900/50 text-cyan-200 border border-cyan-500/30'}`}>
                            {activeLocale.toUpperCase()} NODE
                        </span>
                    </div>
                    <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        <div className="min-h-full">
                            {TemplateDef && <TemplateDef.component data={currentSlide} locale={activeLocale} localeData={localData} hideHeader={true} />}
                        </div>
                    </div>
                </div>
              )}
           </div>

           {/* 5. FOOTER */}
           <div className="h-16 bg-[#02040a] border-t border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSlideIndex(Math.max(0, slideIndex - 1))} 
                  disabled={slideIndex === 0}
                  className="w-10 h-10 bg-[#0b0c12] border border-white/5 flex items-center justify-center hover:bg-white/5 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16}/>
                </button>
                <button 
                  onClick={() => setSlideIndex(Math.min((project.slides?.length || 1) - 1, slideIndex + 1))}
                  disabled={slideIndex === (project.slides?.length || 1) - 1}
                  className="w-10 h-10 bg-[#0b0c12] border border-white/5 flex items-center justify-center hover:bg-white/5 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16}/>
                </button>
              </div>

              <div className="flex items-center gap-1.5 h-full px-8 border-l border-r border-white/5 mx-6 bg-[#05060a]/50 flex-1 justify-center">
                 {project.slides?.map((_, i) => (
                   <div 
                        key={i} 
                        className={`w-1.5 transition-all duration-300 transform -skew-x-[20deg] ${
                            i === slideIndex 
                            ? 'bg-fuchsia-500 h-8 shadow-[0_0_10px_#d946ef] scale-110' 
                            : i < slideIndex 
                            ? 'bg-fuchsia-900/40 h-4' 
                            : 'bg-white/5 h-3'
                        }`} 
                   />
                 ))}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-0.5">Current_Frame</span>
                    <span className="text-xl font-black text-cyan-400 font-mono tracking-tighter">
                        {String(slideIndex + 1).padStart(2, '0')} <span className="text-white/20 text-sm">/ {String(project.slides?.length || 0).padStart(2, '0')}</span>
                    </span>
                </div>
                
                <div className="h-8 w-[1px] bg-white/10"></div>

                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Active Context</span>
                    <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest cursor-pointer hover:text-cyan-400 transition-colors">
                        {activeWindow === 'global' ? 'GLOBAL' : activeLocale} <MousePointerClick size={10} className="text-slate-500" />
                    </div>
                </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default Editor;