
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, Sparkles, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const LegacyMentorAI: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', text: 'Welcome to the inner circle of Manortha Group. I am your Legacy Mentor. I have been trained on our 86-page Operational Blueprint. Ask me anything about your territory rights, RERA compliance, or commission growth.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the Manortha Legacy Program Mentor.
        Reference Database Context:
        - Legacy Partner = Territorial franchise owner with exclusive pincode rights.
        - One Pincode = One Partner philosophy.
        - Qualification = Sell 3 units within 90 days.
        - Direct Commission = 2.5% during qualification, 3.5% after activation.
        - Network Override = 0.5% to 1.0% on sub-dealer sales.
        - Pincode Monopoly = 100% of local leads directed to the partner.
        - Business Value = Transferable business asset (Family Legacy).
        - RERA Compliance = Non-negotiable. Carpet area must be used for pricing.
        - Terms: CLU (Change of Land Use), NOC (No Objection Certificate), FAR (Floor Area Ratio).
        
        Question: ${userText}`,
        config: {
          systemInstruction: `You are a high-level real estate business consultant. Your tone is authoritative, supportive, and exceptionally professional. You speak like a business partner to a CEO. Use Indian English and maintain the Manortha Group brand voice.`,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: 'My apologies, Partner. I encountered a minor data synchronization issue. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "How do I unlock the 3.5% commission?",
    "Explain FAR vs FSI for my clients.",
    "What are my rights in Pincode 560001?",
    "How to manage 15 sub-dealers?"
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-[32px] overflow-hidden border border-slate-200">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-manortha-black text-manortha-gold rounded-tr-none shadow-xl' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm font-medium'
            }`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-slate-200 p-4 rounded-3xl flex items-center gap-3">
                <Loader2 className="animate-spin text-manortha-gold" size={16} />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Consulting Blueprint...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex flex-wrap gap-2 mb-6">
           {suggestions.map((s, i) => (
             <button key={i} onClick={() => setInput(s)} className="px-4 py-2 bg-slate-50 hover:bg-manortha-gold/10 rounded-full border border-slate-100 text-[9px] font-black uppercase text-slate-500 hover:text-manortha-black transition-all">
                {s}
             </button>
           ))}
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query the Legacy Database..." 
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-manortha-gold transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-manortha-black text-manortha-gold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
           <Sparkles size={12} className="text-manortha-gold" /> Powered by Manortha Strategic Intelligence
        </div>
      </div>
    </div>
  );
};

export default LegacyMentorAI;
