import React, { useState } from 'react';
import type { UserRole, Lead } from '../types';
import { calculateLeadScores } from '../services/gemini';

import { 
  MessageSquare, 
  PhoneCall, 
  Sparkles,
  Loader2,
  ChevronRight,
  UserPlus,
  BrainCircuit,
  Zap
} from 'lucide-react';

interface LeadsProps {
  role: UserRole;
  leads: Lead[];
  onUpdate: (leads: Lead[]) => void;
}

const Leads: React.FC<LeadsProps> = ({ role, leads, onUpdate }) => {
  const [isScoring, setIsScoring] = useState(false);

  const handleScoreLeads = async () => {
    setIsScoring(true);
    const scoreMap = await calculateLeadScores(leads);
    const updatedLeads = leads
      .map(lead => {
        const result = scoreMap[lead.id];
        return {
          ...lead,
          score: result ? result.score : lead.score,
          scoreReason: result ? result.reason : lead.scoreReason
        };
      })
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    onUpdate(updatedLeads);
    setIsScoring(false);
  };

  const updateLeadStage = (leadId: string) => {
    const stages: Lead['stage'][] = ['New', 'Qualified', 'Site Visit', 'Booking', 'Registry'];
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const currentIdx = stages.indexOf(l.stage);
        const nextStage = stages[Math.min(currentIdx + 1, stages.length - 1)];
        if (nextStage === 'Qualified') sendWhatsApp(l.name, "Your profile is qualified for a site visit!");
        return { ...l, stage: nextStage };
      }
      return l;
    });
    onUpdate(updated);
  };

  const sendWhatsApp = (name: string, customMsg?: string) => {
    window.dispatchEvent(new CustomEvent('whatsapp-send', {
      detail: { target: name, message: customMsg }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white px-6 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <span className="text-2xl font-black text-[#0A1629]">{leads.length}</span>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Active Intelligence Queue
            </span>
          </div>

          <button
            onClick={handleScoreLeads}
            disabled={isScoring}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0A1629] text-[#C5A059] rounded-xl text-sm font-bold shadow-xl disabled:opacity-50"
          >
            {isScoring
              ? <Loader2 size={18} className="animate-spin" />
              : <BrainCircuit size={18} />
            }
            {isScoring ? 'Consulting Gemini Engine...' : 'Sync AI Lead Scores'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {leads.map(lead => (
          <div key={lead.id} className="bg-white rounded-[40px] shadow-sm border border-slate-200 p-1">
            <div className="p-8 pt-10">
              <h4 className="text-xl font-bold">{lead.name}</h4>
              <p className="text-xs text-slate-500">{lead.stage}</p>

              {lead.scoreReason && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border">
                  <p className="text-xs italic">"{lead.scoreReason}"</p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={() => sendWhatsApp(lead.name)} className="p-3 bg-emerald-50 rounded-xl">
                    <MessageSquare size={20} />
                  </button>
                  <button className="p-3 bg-indigo-50 rounded-xl">
                    <PhoneCall size={20} />
                  </button>
                </div>

                <button
                  onClick={() => updateLeadStage(lead.id)}
                  className="px-4 py-2 bg-[#0A1629] text-[#C5A059] rounded-xl text-xs font-black"
                >
                  Next Protocol <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <UserPlus size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">Add Manual Lead</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Incorporate Walk-in Context
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Leads;
