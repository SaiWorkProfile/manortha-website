
import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  ChevronRight, 
  UserPlus, 
  ShieldCheck, 
  BookOpen,
  PieChart as PieIcon,
  IndianRupee,
  Activity,
  PlayCircle
} from 'lucide-react';
import { MOCK_SUB_DEALERS } from '../constants';
import type { SubDealer } from '../types';
import LegacyMentorAI from './LegacyMentorAI';

const LegacyDashboard: React.FC = () => {
  const [subDealers, setSubDealers] = useState<SubDealer[]>(MOCK_SUB_DEALERS);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'NETWORK' | 'TRAINING'>('OVERVIEW');

  // Qualification tracker: 1 unit sold out of 3
  const unitsSold = 1;
  const progressPercent = (unitsSold / 3) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Exclusivity Banner */}
      <div className="bg-manortha-black rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl border border-manortha-gold/20">
        <div className="absolute top-0 right-0 p-32 bg-manortha-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-manortha-gold rounded-3xl flex items-center justify-center text-manortha-black shadow-xl">
              <MapPin size={36} />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-black tracking-tight">Pincode <span className="text-manortha-gold italic">560001</span></h2>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mt-2 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" /> Sole Territorial Authority
              </p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="text-center px-8 border-r border-white/10">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Direct Leads</p>
                <p className="text-2xl font-black text-white">42</p>
             </div>
             <div className="text-center px-8">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Override Share</p>
                <p className="text-2xl font-black text-manortha-gold">0.75%</p>
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-[20px] shadow-sm border border-slate-200 w-fit">
        {['OVERVIEW', 'NETWORK', 'TRAINING'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-manortha-black text-manortha-gold' : 'text-slate-400 hover:text-manortha-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Qualification Tracker */}
          <div className="lg:col-span-1 bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
             <h3 className="text-xl font-serif font-black text-manortha-black mb-8 flex items-center gap-3">
               <Trophy className="text-manortha-gold" size={24} /> Legacy Activation
             </h3>
             <div className="space-y-8">
                <div className="flex items-end justify-between">
                   <div>
                      <p className="text-3xl font-black text-manortha-black">{unitsSold}/3</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Units Sold for Bonus Lock</p>
                   </div>
                   <div className="text-right">
                      <p className="text-manortha-sunset font-black text-sm">2 Units Left</p>
                      <p className="text-[9px] text-slate-400 uppercase">Target: 3.5% Comm.</p>
                   </div>
                </div>
                <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                   <div className="h-full bg-manortha-gold shadow-lg" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-sm text-slate-500 leading-relaxed">
                   "Complete 3 sales within 90 days to unlock territorial override rights and office reimbursement."
                </div>
                <button className="w-full py-4 bg-manortha-black text-manortha-gold rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group">
                   Submit New Booking <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

          {/* Earnings Projection Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-manortha-black rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10">
                <div>
                   <h3 className="text-2xl font-serif font-black">Performance <span className="text-manortha-gold">Vault</span></h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Direct + Network Commissions</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                   <span className="text-[10px] font-black uppercase tracking-widest text-manortha-gold">FY 2024-25</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="space-y-1">
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Total Earnings</p>
                   <p className="text-3xl font-black text-white">₹5.25 L</p>
                   <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><TrendingUp size={12} /> +12%</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Pending Payouts</p>
                   <p className="text-3xl font-black text-manortha-gold">₹1.80 L</p>
                   <p className="text-[10px] text-slate-400 font-bold italic">Due 15th April</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Network Override</p>
                   <p className="text-3xl font-black text-white">₹42.2 K</p>
                   <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">From 3 Dealers</p>
                </div>
             </div>

             <div className="mt-12 pt-10 border-t border-white/5 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
                   <span>Projected Growth (Year 1)</span>
                   <span className="text-manortha-gold">₹18L - ₹25L Target</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-manortha-gold" style={{ width: '30%' }} />
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'NETWORK' && (
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
           <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <h3 className="text-2xl font-serif font-black text-manortha-black">Sub-Dealer Network</h3>
                 <p className="text-sm font-medium text-slate-500 mt-1">Manage 5-15 Channel Partners under your pincode authority</p>
              </div>
              <button className="px-8 py-4 bg-manortha-black text-manortha-gold rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                <UserPlus size={18} /> Onboard Channel Partner
              </button>
           </div>
           <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {subDealers.map(sd => (
                   <div key={sd.id} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-manortha-gold transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Activity size={48} />
                      </div>
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-black text-manortha-black text-xl shadow-sm">
                            {sd.name.charAt(0)}
                         </div>
                         <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                           sd.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                         }`}>
                           {sd.status}
                         </span>
                      </div>
                      <h4 className="text-lg font-bold text-manortha-black mb-1">{sd.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Pincode: {sd.pincode}</p>
                      
                      <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-6">
                         <div>
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Bookings</p>
                            <p className="text-lg font-black text-manortha-black">{sd.totalSales}</p>
                         </div>
                         <div>
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Revenue</p>
                            <p className="text-lg font-black text-manortha-gold">₹{(sd.totalRevenue/100000).toFixed(1)}L</p>
                         </div>
                      </div>
                      
                      <div className="mt-8 flex items-center justify-between">
                         <button className="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:underline">View Performance</button>
                         <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-manortha-black transition-colors">
                            <ChevronRight size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
                 
                 {/* Capacity Meter */}
                 <div className="p-8 bg-slate-50 rounded-[32px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Network Slot {subDealers.length + 1}/15</p>
                    <UserPlus size={32} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-400">Slots Available</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'TRAINING' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-500">
           {/* Answerable AI Mentor */}
           <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col min-h-[600px]">
              <div className="flex items-center gap-4 mb-8">
                 <div className="p-4 bg-manortha-black text-manortha-gold rounded-3xl shadow-xl">
                    <Zap size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif font-black text-manortha-black">Legacy Mentor AI</h3>
                    <p className="text-[10px] text-manortha-gold font-black uppercase tracking-[0.3em] mt-1">Answerable Strategic Database</p>
                 </div>
              </div>
              <div className="flex-1">
                 <LegacyMentorAI />
              </div>
           </div>

           {/* Manuals & Video Content */}
           <div className="space-y-8">
              <div className="bg-manortha-black text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group border border-manortha-gold/20">
                 <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-manortha-black via-manortha-black/40 to-transparent" />
                 </div>
                 <div className="relative z-10">
                    <span className="bg-manortha-gold text-manortha-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Exclusive Training</span>
                    <h3 className="text-3xl font-serif font-black mb-4 leading-tight">Mastering Pincode <br/> Monopoly</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm">Watch the 15-day Blueprint Masterclass. Learn from Founder Umrav Singh about territorial scaling.</p>
                    <button className="flex items-center gap-4 bg-white text-manortha-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-manortha-gold transition-all shadow-2xl">
                       <PlayCircle size={24} /> Watch Session 01
                    </button>
                 </div>
              </div>

              <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
                 <h3 className="text-xl font-serif font-black text-manortha-black mb-8">Resource Library</h3>
                 <div className="space-y-4">
                    {[
                      { title: 'Legacy Program Blueprint', type: 'PDF • 86 Pages', icon: BookOpen },
                      { title: 'RERA Compliance Reckoner', type: 'DIGITAL MANUAL', icon: ShieldCheck },
                      { title: 'Carpet Area vs Super Built-up', type: 'SALES GUIDE', icon: Activity },
                      { title: 'Quarterly Market Valuation', type: 'BANGALORE REPORT', icon: TrendingUp }
                    ].map((item, i) => (
                      <button key={i} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-manortha-gold/5 rounded-3xl border border-slate-100 hover:border-manortha-gold/20 transition-all group">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-manortha-gold transition-colors">
                               <item.icon size={24} />
                            </div>
                            <div className="text-left">
                               <p className="text-sm font-black text-manortha-black uppercase tracking-widest">{item.title}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{item.type}</p>
                            </div>
                         </div>
                         <ArrowRight size={18} className="text-slate-300 group-hover:text-manortha-gold group-hover:translate-x-2 transition-all" />
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LegacyDashboard;
