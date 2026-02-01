
import React, { useState, useEffect } from 'react';
import { getAIInsights } from '../services/gemini';
import { Loader2, Sparkles, AlertCircle, BrainCircuit, Zap, ChevronRight } from 'lucide-react';

const AIAssistant: React.FC<{ data: any }> = ({ data }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deepThink, setDeepThink] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getAIInsights(data, undefined, deepThink);
    setInsights(result || "Unable to generate insights.");
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [data, deepThink]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-manortha-black/5 p-4 rounded-3xl border border-manortha-black/10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl transition-all ${deepThink ? 'bg-manortha-black text-manortha-gold' : 'bg-white text-slate-400'}`}>
            {deepThink ? <BrainCircuit size={24} /> : <Zap size={24} />}
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-800">Intelligence Mode</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase">{deepThink ? 'Gemini 3 Pro Deep Reasoning' : 'Gemini 3 Flash Rapid Insights'}</p>
          </div>
        </div>
        <button 
          onClick={() => setDeepThink(!deepThink)}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            deepThink ? 'bg-manortha-gold text-manortha-black' : 'bg-manortha-black text-white'
          }`}
        >
          {deepThink ? 'Switch to Rapid' : 'Enable Deep Think'}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="relative">
            <Loader2 className="animate-spin text-manortha-gold" size={64} />
            {deepThink && <BrainCircuit className="absolute inset-0 m-auto text-manortha-black" size={24} />}
          </div>
          <p className="text-slate-500 font-black animate-pulse text-xs uppercase tracking-[0.4em]">
            {deepThink ? 'Synthesizing Multi-Dimensional Logic...' : 'Processing Market Signals...'}
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[32px] flex items-start gap-5 mb-8">
            <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-indigo-900 font-serif font-black text-lg mb-1">Strategic Audit</h4>
              <p className="text-sm text-indigo-700/70 font-medium leading-relaxed">
                Insights generated using {deepThink ? '32k token reasoning budget' : 'high-velocity triage'} across current inventory and lead data.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none px-4">
            <div className="whitespace-pre-wrap text-slate-700 leading-loose font-serif text-lg italic">
              {insights}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black italic uppercase tracking-widest">
              <AlertCircle size={14} />
              Verified by Manortha Intelligence (v2.1)
            </div>
            <button className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest group">
              Export Analysis <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
