import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { DEEP_SPACE_MODULE } from '../data/sample_space';
import { THEME, SUB_TOPIC_MAP } from '../theme';
import { 
  Sparkles, Target, ArrowLeft, Rocket, Lock, Archive, ChevronDown, Loader2 
} from 'lucide-react';

// Custom Saga Logo Component
const SagaLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-fuchsia-500">
    <path d="M4 19.5C4 18.6716 4.67157 18 5.5 18H18.5C19.3284 18 20 17.3284 20 16.5V6.5C20 5.67157 19.3284 5 18.5 5H5.5C4.67157 5 4 5.67157 4 6.5V19.5Z" stroke="currentColor" strokeWidth="2" />
    <path d="M4 8.5C4 8.5 7 9 9.5 7.5C12 6 12 4 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16.5C12 16.5 15 17 17.5 15.5C20 14 20 12 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 4V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LessonBuilder = () => {
  const navigate = useNavigate();
  
  // WIZARD STATE
  const [wizardGrade, setWizardGrade] = useState("Grade 2");
  const [wizardTopic, setWizardTopic] = useState("Addition & Subtraction");
  const [wizardSubTopic, setWizardSubTopic] = useState("Word Problems: Real World");
  const [wizardTheme, setWizardTheme] = useState("Deep Space");
  const [wizardChars, setWizardChars] = useState(["CLEO", "ARI"]);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- 1. SAMPLE PROJECT LOADER ---
  const loadSampleProject = () => {
    const newId = 'sample-' + Date.now();
    const newProject = {
      id: newId,
      title: "DEEP SPACE MISSION [SAMPLE]",
      slides: DEEP_SPACE_MODULE,
      localeData: { 
        "Global": { char1: "Cleo", char2: "Ari" },
        "India": { char1: "Cleo", char2: "Ari" }
      },
      createdAt: Date.now(),
      status: "SAMPLE"
    };
    StorageService.save(newProject);
    navigate(`/editor/${newId}`);
  };

  // --- 2. AI GENERATOR ---
  const generateLessonAI = async () => {
    setIsGenerating(true);
    const apiKey = ""; // <--- PASTE API KEY HERE

    if (!apiKey) {
      alert("⚠️ API KEY MISSING!\nPlease open 'src/pages/LessonBuilder.jsx' and add your Google Gemini API Key.");
      setIsGenerating(false);
      return;
    }

    const systemPrompt = `You are an expert Math Curriculum Designer. Output ONLY a valid JSON Array of lesson slides.
    Templates allowed: "readonly", "activity-conversation", "activity-mcq".
    Use placeholders for localization: {{location}}, {{currency}}, {{currency_name}}, {{price}}, {{char1}}, {{char2}}, {{item}}, {{opt1}}, {{opt2}}.`;

    const userQuery = `Create an engaging 10-slide lesson for ${wizardGrade} on ${wizardTopic} (${wizardSubTopic}). Theme: ${wizardTheme}. Characters: ${wizardChars.join(', ')}. Include 3 practice questions (MCQs).`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      const slides = JSON.parse(generatedText);

      const newId = 'ai-' + Date.now();
      const newProject = {
        id: newId,
        title: `${wizardTopic.toUpperCase()} [AI]`,
        slides: slides,
        localeData: { 
            "Global": { "char1": wizardChars[0], "char2": wizardChars[1] || "Bot" },
            "India": { "char1": "Arjun", "char2": "Aavya" } 
        },
        createdAt: Date.now(),
        status: "DRAFT"
      };
      
      StorageService.save(newProject);
      navigate(`/editor/${newId}`);

    } catch (e) {
      console.error(e);
      alert("AI Generation failed. Check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center bg-[#05070f] p-8 overflow-y-auto font-mono">
      
      {/* --- HEADER ACTIONS --- */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"><ArrowLeft size={16} /> Back to Home</button>
        <div className="flex gap-4">
             <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 px-4 py-2 rounded-sm uppercase text-[10px] font-black tracking-widest transition-all"><Archive size={16} /> Access Archives</button>
            <button onClick={loadSampleProject} className="flex items-center gap-2 bg-fuchsia-900/20 border border-fuchsia-500/50 text-fuchsia-400 hover:bg-fuchsia-900/40 px-4 py-2 rounded-sm uppercase text-[10px] font-black tracking-widest transition-all shadow-neon"><Rocket size={16} /> Load Sample</button>
        </div>
      </div>

      {/* --- WIZARD UI --- */}
      <div className="w-full max-w-6xl space-y-8 relative">
        <div className="text-center space-y-3 mb-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-cyan-500/30 bg-cyan-500/5 rounded-full mb-2">
            <SagaLogo />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80">CURRICULUM CO-PILOT</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-widest">Lesson Builder</h2>
          <p className="text-xs text-white/40 font-mono uppercase tracking-[0.3em]">Designing personalized learning pathways</p>
        </div>

        {/* ... Rest of layout is the same as previous response ... */}
        {/* Include the grid logic for educational goals and story settings here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`${THEME.panel} p-8 space-y-8 relative group`}>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40"></div>
            <div className="flex items-center gap-4 text-cyan-400 uppercase text-sm font-black tracking-[0.2em] border-b border-cyan-500/10 pb-4"><div className="bg-cyan-500/10 p-2 rounded-lg"><Target size={20}/></div> 1. Educational Goals</div>
            <div className="space-y-6 pt-2">
              <div className="space-y-2"><label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Target Grade Level</label><div className="grid grid-cols-5 gap-2">{["Gr 1", "Gr 2", "Gr 3", "Gr 4", "Gr 5"].map(grade => (<button key={grade} onClick={() => setWizardGrade(grade.replace('Gr ', 'Grade '))} className={`py-3 text-[10px] font-black border transition-all ${wizardGrade === grade.replace('Gr ', 'Grade ') ? 'bg-cyan-500 border-cyan-400 text-black shadow-neon' : 'border-white/10 text-white/30 hover:border-white/20'}`}>{grade}</button>))}</div></div>
              <div className="space-y-2"><label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Main Learning Topic</label><div className="relative group/select"><select value={wizardTopic} onChange={e => { setWizardTopic(e.target.value); setWizardSubTopic(SUB_TOPIC_MAP[e.target.value][0]); }} className={`w-full ${THEME.input} p-4 text-sm outline-none cursor-pointer appearance-none rounded-none border-cyan-500/20 group-hover/select:border-cyan-500/50 transition-all font-bold tracking-wide`}>{Object.keys(SUB_TOPIC_MAP).map(t => <option key={t}>{t}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" size={18} /></div></div>
              <div className="space-y-2"><label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Focus Area</label><div className="relative group/select"><select value={wizardSubTopic} onChange={e => setWizardSubTopic(e.target.value)} className={`w-full ${THEME.input} p-4 text-sm outline-none cursor-pointer appearance-none rounded-none border-cyan-500/20 group-hover/select:border-cyan-500/50 transition-all font-mono`}>{SUB_TOPIC_MAP[wizardTopic].map(st => <option key={st}>{st}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" size={18} /></div></div>
            </div>
          </div>
          <div className={`${THEME.panel} p-8 space-y-8 relative group`}>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-fuchsia-500/40"></div>
            <div className="flex items-center gap-4 text-fuchsia-500 uppercase text-sm font-black tracking-[0.2em] border-b border-fuchsia-500/10 pb-4"><div className="bg-fuchsia-500/10 p-2 rounded-lg"><Sparkles size={20}/></div> 2. Story Settings</div>
            <div className="space-y-8 pt-2">
              <div className="space-y-2"><label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Adventure Theme</label><div className="grid grid-cols-2 gap-3">{["Deep Space", "Cyberpunk City", "Enchanted Forest", "Ocean Depths"].map(theme => (<button key={theme} onClick={() => setWizardTheme(theme)} className={`p-4 text-[10px] font-black uppercase text-left border transition-all skew-x-[-10deg] ${wizardTheme === theme ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'bg-black/40 border-white/5 text-white/20 hover:border-white/10'}`}><span className="skew-x-[10deg] block tracking-[0.1em]">{theme}</span></button>))}</div></div>
              <div className="space-y-2"><label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Story Characters</label><div className="flex gap-2">{["CLEO", "ARI"].map(c => (<button key={c} onClick={() => setWizardChars(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} className={`flex-grow p-4 text-[10px] font-black border transition-all ${wizardChars.includes(c) ? 'bg-cyan-500 border-cyan-400 text-black shadow-neon' : 'border-white/5 text-white/20 hover:border-white/10'}`}>{c}</button>))}{["ARJUN", "AAVYA"].map(c => (<button key={c} disabled className="flex-grow p-4 text-[10px] font-black border border-white/5 text-white/10 flex flex-col items-center justify-center gap-1 cursor-not-allowed opacity-50"><span>{c}</span><Lock size={10} /></button>))}</div></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="w-full max-w-lg relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-sm blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${isGenerating ? 'animate-pulse opacity-80' : ''}`}></div>
            <button onClick={generateLessonAI} disabled={isGenerating} className={`relative w-full p-6 text-sm font-black uppercase tracking-[0.5em] skew-x-[-15deg] flex items-center justify-center gap-6 transition-all ${isGenerating ? 'bg-black text-white/40 border border-white/10' : 'bg-white text-black hover:bg-cyan-400 hover:scale-[1.02]'}`}><div className="skew-x-[15deg] flex items-center gap-4">{isGenerating ? (<><Loader2 className="animate-spin" size={24} /> Processing_Neural_Data...</>) : (<><Sparkles size={24} className="text-fuchsia-600" /> Create My Lesson</>)}</div></button>
          </div>
        </div>
        
        <div className="text-center pt-4"><button onClick={() => navigate('/editor/new')} className="text-[9px] font-black uppercase text-white/20 hover:text-cyan-500 transition-all border-b border-white/5 pb-1 tracking-[0.3em]">Manual Ingestion Mode</button></div>
      </div>
    </div>
  );
};

export default LessonBuilder;