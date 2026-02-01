import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { getTemplate } from '../engine/registry';
import { ChevronLeft, ChevronRight, Zap, Code, Globe, Activity, Settings, Maximize2, LogOut, Save } from 'lucide-react';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [activeLocale, setActiveLocale] = useState("India");
  const [slideIndex, setSlideIndex] = useState(0); 
  const [jsonWidth, setJsonWidth] = useState(25);
  const [viewMode, setViewMode] = useState('split'); // 'split' or 'single'
  const isResizing = useRef(false);

  useEffect(() => {
    const data = StorageService.getById(id);
    if (!data) navigate('/dashboard');
    else setProject(data);
  }, [id, navigate]);

  const handleSave = () => { 
    if (project) {
      StorageService.save(project);
      // Optional: Add a visual indicator or toast here
    }
  };

  const handleSaveAndClose = () => {
    handleSave();
    navigate('/dashboard');
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

  if (!project) return <div className="bg-[#02040a] h-screen text-white flex items-center justify-center font-mono">LOADING_SYSTEM...</div>;

  const currentSlide = project.slides?.[slideIndex];
  // Robust template checker
  const templateType = currentSlide?.template || currentSlide?.type || 'readonly';
  const TemplateDef = getTemplate(templateType);
  const globalData = project.localeData?.["Global"] || {};
  const localData = project.localeData?.[activeLocale] || {};

  return (
    <div className="flex flex-col h-screen bg-[#02040a] text-slate-400 font-mono overflow-hidden">
      
      {/* 1. HEADER */}
      <header className="h-12 shrink-0 border-b border-white/5 px-4 flex items-center justify-between bg-[#05060a] z-50">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-fuchsia-900/20 rounded cursor-pointer hover:bg-white/10 transition-colors" onClick={handleSaveAndClose}>
             <ChevronLeft className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-sm font-black uppercase tracking-widest text-white">LOCENGINE <span className="text-fuchsia-500">V3.2.0</span></h1>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-[#0b0c12] border border-white/10 p-0.5 rounded-sm">
          <button 
            onClick={() => setViewMode('split')}
            className={`px-3 py-0.5 text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'split' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-600 hover:text-white'}`}
          >
            Dual Review
          </button>
          <button 
            onClick={() => setViewMode('single')}
            className={`px-3 py-0.5 text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'single' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-600 hover:text-white'}`}
          >
            Activity Node
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleSaveAndClose} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
            <LogOut size={12} /> Save & Exit
          </button>
          <button onClick={handleSave} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest skew-x-[-12deg] shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all">
            <span className="skew-x-[12deg]">DEPLOY_STAGE</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. SIDEBAR */}
        <aside className="w-64 bg-[#05060a] border-r border-white/5 flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-[9px] font-bold text-fuchsia-500 uppercase tracking-widest mb-3">Regional Nodes</h2>
            <div className="space-y-1">
              <div className="bg-cyan-400 p-2.5 shadow-[0_0_15px_rgba(34,211,238,0.2)] border-l-2 border-cyan-400 cursor-pointer">
                <span className="text-[10px] font-black text-black uppercase tracking-widest">INDIA</span>
              </div>
              <div className="p-2.5 border border-white/5 bg-[#0b0c12] hover:bg-white/5 cursor-pointer transition-colors">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SINGAPORE</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-4">Neural Params: {activeLocale}</h2>
            <div className="space-y-3">
               {Object.keys(globalData).map(key => (
                <div key={key} className="space-y-1">
                  <label className="text-[8px] text-slate-600 font-bold uppercase tracking-wider">{key}</label>
                  <input 
                    value={localData[key] || ''} 
                    onChange={(e) => {
                      const newData = {...project};
                      if(!newData.localeData[activeLocale]) newData.localeData[activeLocale] = {};
                      newData.localeData[activeLocale][key] = e.target.value;
                      setProject(newData);
                    }}
                    className="w-full bg-[#0b0c12] border border-white/10 text-white text-[10px] p-2 focus:border-cyan-500 focus:bg-[#0f111a] outline-none transition-all placeholder-slate-700 font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 3. JSON AREA */}
        <section style={{ width: `${jsonWidth}%` }} className="bg-[#05060a] border-r border-white/5 flex flex-col relative shrink-0">
           <div className="h-8 flex items-center justify-between px-3 border-b border-white/5 bg-[#0b0c12]">
             <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
               <Code size={10}/> Schema.json
             </span>
           </div>
           <textarea 
             value={JSON.stringify(project.slides, null, 2)}
             onChange={(e) => { try { setProject({ ...project, slides: JSON.parse(e.target.value) }); } catch(err) {} }}
             className="flex-1 bg-transparent p-4 text-[10px] font-mono text-cyan-100/70 outline-none resize-none leading-relaxed custom-scrollbar selection:bg-fuchsia-500/30"
             spellCheck="false"
           />
           <div onMouseDown={startResizing} className="absolute -right-1 top-0 w-2 h-full cursor-col-resize z-50 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
              <div className="w-[1px] h-full bg-white/10"/>
           </div>
        </section>

        {/* 4. PREVIEW AREA */}
        <section className="flex-1 flex flex-col bg-black relative min-w-0 min-h-0">
           
           {/* SPLIT / SINGLE VIEW CONTAINER */}
           <div className="flex-1 flex flex-col min-h-0">
              
              {/* TOP: GLOBAL (Hidden in Single Mode) */}
              {viewMode === 'split' && (
                <div className="flex-1 border-b border-white/10 relative overflow-hidden bg-[#0a0a0a]">
                  <div className="absolute top-4 left-4 z-50">
                     <span className="bg-amber-500 text-black text-[9px] font-black uppercase px-2 py-1 tracking-widest">GLOBAL_MASTER</span>
                  </div>
                  {TemplateDef && <TemplateDef.component data={currentSlide} locale="Global" localeData={globalData} hideHeader={true} />}
                </div>
              )}
              
              {/* BOTTOM: LOCAL (Full height in Single Mode) */}
              <div className={`relative overflow-hidden bg-[#0a0a0a] ${viewMode === 'split' ? 'flex-1 border-t-2 border-fuchsia-500/20' : 'h-full border-none'}`}>
                {viewMode === 'split' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 bg-fuchsia-600 text-white text-[9px] font-black uppercase px-4 py-1 tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                    LOCAL_INTERCEPT
                  </div>
                )}
                
                <div className="absolute top-4 left-4 z-50">
                   <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-1 tracking-widest">NODE_{activeLocale.toUpperCase()}</span>
                </div>
                {TemplateDef && <TemplateDef.component data={currentSlide} locale={activeLocale} localeData={localData} hideHeader={true} />}
              </div>
           </div>

           {/* 5. FOOTER */}
           <div className="h-14 bg-[#05060a] border-t border-white/5 flex items-center justify-between px-4 shrink-0 z-50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSlideIndex(Math.max(0, slideIndex - 1))} 
                  disabled={slideIndex === 0}
                  className="w-8 h-8 bg-[#0b0c12] border border-white/10 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-all text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14}/>
                </button>
                
                <div className="text-center">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">FRAME #{String(slideIndex + 1).padStart(2, '0')}</span>
                </div>

                <button 
                  onClick={() => setSlideIndex(Math.min((project.slides?.length || 1) - 1, slideIndex + 1))}
                  disabled={slideIndex === (project.slides?.length || 1) - 1}
                  className="w-8 h-8 bg-[#0b0c12] border border-white/10 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-all text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14}/>
                </button>
              </div>

              <div className="flex gap-1 opacity-40">
                 {Array.from({length: 12}).map((_, i) => (
                   <div key={i} className={`w-1 h-4 transform -skew-x-[20deg] ${i === (slideIndex % 12) ? 'bg-fuchsia-500 shadow-[0_0_8px_#d946ef]' : 'bg-white/10'}`} />
                 ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SYNC_READY</span>
                <button className="w-8 h-8 border border-white/10 flex items-center justify-center hover:text-cyan-400 transition-colors text-slate-500 bg-[#0b0c12]"><Maximize2 size={14}/></button>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default Editor;