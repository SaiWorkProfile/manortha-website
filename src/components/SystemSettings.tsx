
import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, Zap, Cpu, History, Globe, RefreshCw, CheckCircle, ExternalLink, Activity } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSyncing(false);
  };

  return (
    <div className="space-y-8 animate-in slide-up duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
           <Cpu className="text-indigo-600 mb-4" size={32} />
           <h4 className="text-lg font-black text-slate-800 mb-2">AI Model Config</h4>
           <p className="text-xs text-slate-500 mb-6">Current: Gemini 3 Flash Preview (Multilingual v2.1)</p>
           <button className="text-[10px] font-black uppercase tracking-widest text-[#0A1629] bg-[#C5A059]/10 px-4 py-2 rounded-lg">Language Settings</button>
        </div>
        <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
           <Globe className="text-[#C5A059] mb-4" size={32} />
           <h4 className="text-lg font-black text-slate-800 mb-2">Web CMS Sync</h4>
           <p className="text-xs text-slate-500 mb-6">Connected to: www.manortha.com • Status: Active</p>
           <button onClick={handleManualSync} disabled={isSyncing} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white bg-[#0A1629] px-4 py-2 rounded-lg disabled:opacity-50">
             {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />} 
             Full Site Re-Sync
           </button>
        </div>
        <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
           <ShieldCheck className="text-emerald-500 mb-4" size={32} />
           <h4 className="text-lg font-black text-slate-800 mb-2">Global Security</h4>
           <p className="text-xs text-slate-500 mb-6">Role Enforcement: Strict • RERA Compliance: Active</p>
           <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">Generate Audit Report</button>
        </div>
      </div>

      <div className="bg-[#0A1629] text-white rounded-[32px] p-8 border border-[#C5A059]/30 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Activity size={32} className="text-[#C5A059]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-tight">Enterprise Data Mirroring</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Live Feed to Public Landmarks Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-emerald-400 font-black text-lg">99.98%</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Sync Uptime</p>
            </div>
            <div className="text-right border-l border-white/10 pl-6">
              <p className="text-white font-black text-lg">1,242 ms</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Average Latency</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><History className="text-slate-400" /> Administrative Audit Log</h3>
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">Today</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">Critical Only</span>
           </div>
        </div>
        <div className="p-0">
           <table className="w-full">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <tr>
                    <th className="px-8 py-4 text-left">Timestamp</th>
                    <th className="px-8 py-4 text-left">Actor</th>
                    <th className="px-8 py-4 text-left">Action</th>
                    <th className="px-8 py-4 text-left">Entity</th>
                    <th className="px-8 py-4 text-right">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 <AuditRow time="14:55:01" actor="CMS Sync Agent" action="Web Publish" entity="Manortha Greens A-102" status="SUCCESS" />
                 <AuditRow time="14:22:11" actor="System AI" action="Lead Scoring" entity="Batch: 42 Leads" status="SUCCESS" />
                 <AuditRow time="12:05:42" actor="Admin (S. Gupta)" action="Inventory Update" entity="Manortha Greens A-101" status="SUCCESS" />
                 <AuditRow time="10:15:22" actor="System AI (Hindi)" action="Strategy Gen" entity="Regional Report" status="SUCCESS" />
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

const AuditRow = ({ time, actor, action, entity, status }: any) => (
  <tr className="hover:bg-slate-50">
    <td className="px-8 py-4 text-[10px] font-bold text-slate-400">{time}</td>
    <td className="px-8 py-4 text-xs font-black text-slate-700">{actor}</td>
    <td className="px-8 py-4 text-xs font-bold text-slate-600">{action}</td>
    <td className="px-8 py-4 text-xs text-slate-500">{entity}</td>
    <td className="px-8 py-4 text-right"><span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-md text-[9px] font-black uppercase">{status}</span></td>
  </tr>
);

export default SystemSettings;
