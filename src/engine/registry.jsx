import React from 'react';
import { MessageSquare, HelpCircle, FileText, Edit3 } from 'lucide-react';

// --- 1. DATA NORMALIZER (The Universal Adapter) ---
const normalizeData = (data) => {
  if (!data) return { type: 'readonly', title: "Error", body: "No Data" };

  // --- CASE A: CONVERSATION ---
  // Sub-case A1: Complex (uploaded files)
  if (data.conversation) {
    return {
      type: 'conversation',
      background: data.conversation.background,
      characters: data.conversation.characters || []
    };
  }
  // Sub-case A2: Legacy Simple (initialJson)
  if (data.template === 'activity-conversation' && data.content) {
     // If legacy data doesn't have characters array, mock it or adapt it
     return {
        type: 'conversation',
        background: data.content.background,
        characters: data.content.characters || [] // specific fallback if needed
     };
  }

  // --- CASE B: MCQ ---
  const isMcq = data.template === 'activity-mcq' || data.template === 'mcq' || data.mcq;
  
  if (isMcq) {
    // Sub-case B1: Complex "mcq" object (Uploaded files)
    if (data.mcq) {
      let qText = "Question Missing";
      if (data.mcq.question?.contents) {
        qText = data.mcq.question.contents.find(c => c.type === 'text')?.value || "";
      } else if (typeof data.mcq.question === 'string') {
        qText = data.mcq.question;
      }

      const opts = data.mcq.options?.map(opt => ({
        value: opt.contents?.find(c => c.type === 'text')?.value || opt.value || "Option"
      })) || [];

      return { type: 'mcq', question: qText, options: opts };
    }
    
    // Sub-case B2: Legacy "content" object (Simple JSON)
    if (data.content && data.content.options) {
      return {
        type: 'mcq',
        question: data.content.question || "Question?",
        options: data.content.options || []
      };
    }
  }

  // --- CASE C: FILL BLANKS ---
  if (data.fillBlanks) {
    return {
      type: 'fill-blanks',
      question: data.fillBlanks.question || "Complete the sentence:",
      answer: data.fillBlanks.sentence?.find(s => s.type === 'input')?.value || ""
    };
  }

  // --- CASE D: READONLY / FALLBACK ---
  return {
    type: 'readonly',
    title: data.content?.title || "SYSTEM_NODE",
    body: data.content?.body || "Awaiting content stream...",
    visual: data.content?.visual
  };
};

// --- UTILS ---
const localize = (text, localeData) => {
  if (typeof text !== 'string') return text || "";
  let res = text;
  Object.keys(localeData || {}).forEach(k => {
    res = res.replace(new RegExp(`{{${k}}}`, 'g'), localeData[k]);
  });
  return res;
};

// --- 2. CINEMATIC FRAME ---
const SlideWrapper = ({ children, background }) => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#02040a] group">
      {background ? (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-60 transition-opacity duration-700"
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : (
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      )}
      <div className="relative z-10 h-full w-full flex flex-col justify-end p-12 pb-16">
        {children}
      </div>
    </div>
  );
};

// --- 3. CONVERSATION VIEW ---
const ConversationView = ({ data, locale, localeData }) => {
  const norm = normalizeData(data);
  const bgImage = norm.background || "https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2000";

  return (
    <SlideWrapper background={bgImage}>
      <div className="flex justify-between items-end gap-16 w-full">
        {norm.characters.map((char, idx) => {
          const isLeft = idx === 0;
          const dialogueText = char.dialogues?.[0]?.value || "...";
          return (
            <div key={idx} className={`flex-1 flex flex-col gap-4 ${isLeft ? 'items-start' : 'items-end'}`}>
              <div className={`bg-black/95 p-6 max-w-lg shadow-2xl backdrop-blur-sm relative border-t border-white/10 ${isLeft ? 'border-l-4' : 'border-r-4'}`} style={{ borderColor: char.color || '#22d3ee' }}>
                <span className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: char.color || '#22d3ee' }}>{char.name}</span>
                <p className="text-xl font-medium text-white leading-relaxed font-sans">"{localize(dialogueText, localeData)}"</p>
              </div>
              <div className="w-24 h-24 border-4 border-white/10 bg-[#1a1a1a] shadow-lg overflow-hidden relative">
                 <img src={char.url && char.url.startsWith('http') ? char.url : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${char.name}`} alt={char.name} className="w-full h-full object-cover" />
              </div>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
};

// --- 4. MCQ VIEW ---
const McqView = ({ data, locale, localeData }) => {
  const norm = normalizeData(data);
  
  return (
    <SlideWrapper>
      <div className="w-full max-w-3xl mx-auto bg-black/90 border border-white/10 p-10 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-8">{localize(norm.question, localeData)}</h2>
        <div className="grid grid-cols-1 gap-4">
          {norm.options.map((opt, i) => (
            <div key={i} className="p-6 border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all cursor-pointer flex items-center gap-6 group">
              <span className="w-8 h-8 flex items-center justify-center bg-black text-cyan-500 font-mono text-sm border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-colors">{String.fromCharCode(65 + i)}</span>
              <span className="text-xl text-slate-300 group-hover:text-white font-medium">{localize(opt.value, localeData)}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};

// --- 5. FILL BLANKS VIEW ---
const FillBlanksView = ({ data, locale, localeData }) => {
  const norm = normalizeData(data);
  return (
    <SlideWrapper>
      <div className="w-full max-w-2xl mx-auto text-center space-y-12">
        <div className="bg-black/80 p-8 border border-white/10 backdrop-blur-md">
          <h2 className="text-4xl font-bold text-white leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: localize(norm.question, localeData) }} />
          <div className="relative max-w-md mx-auto">
            <input type="text" placeholder="ENTER_VALUE" className="w-full bg-black/50 border-b-4 border-cyan-500 text-5xl font-mono text-center text-cyan-400 focus:outline-none focus:border-fuchsia-500 py-4 transition-colors placeholder:text-white/10 placeholder:text-3xl"/>
            <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none"><Edit3 className="text-cyan-500 animate-pulse" /></div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

// --- 6. READ ONLY VIEW ---
const ReadOnlyView = ({ data, locale, localeData }) => {
  const norm = normalizeData(data);
  const bg = norm.visual || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000";
  return (
    <SlideWrapper background={bg}>
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-7xl font-black uppercase text-white mb-8 tracking-tight drop-shadow-2xl">{localize(norm.title, localeData)}</h1>
        <div className="inline-block bg-black/60 p-6 border-l-4 border-fuchsia-500 backdrop-blur-md">
          <p className="text-2xl text-slate-200 leading-relaxed font-light">{localize(norm.body, localeData)}</p>
        </div>
      </div>
    </SlideWrapper>
  );
};

// --- REGISTRY ---
export const TEMPLATE_REGISTRY = {
  'readonly': { component: ReadOnlyView },
  'activity-conversation': { component: ConversationView },
  'activity-mcq': { component: McqView },
  'activity-fill-blanks': { component: FillBlanksView },
  'default': { component: ReadOnlyView }
};

export const getTemplate = (type) => TEMPLATE_REGISTRY[type] || TEMPLATE_REGISTRY['default'];