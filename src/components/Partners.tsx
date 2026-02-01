
import React from 'react';
import { 
  Award, 
  Briefcase, 
  TrendingUp, 
  Star, 
  Trophy, 
  IndianRupee, 
  ChevronRight, 
  ArrowUpRight,
  Target,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

const Partners: React.FC<{ role: any }> = () => {
  const partners = [
    { name: 'Real Assets Co.', deals: 12, value: 42000000, rating: 4.8, type: 'Platinum', conversion: 24 },
    { name: 'Elite Homes', deals: 8, value: 28000000, rating: 4.5, type: 'Gold', conversion: 18 },
    { name: 'Pro Realty', deals: 5, value: 15000000, rating: 4.2, type: 'Silver', conversion: 12 },
    { name: 'Skyline Partners', deals: 4, value: 12000000, rating: 4.0, type: 'Silver', conversion: 10 },
  ];

  const commissionData = [
    { month: 'Jan', amount: 450000 },
    { month: 'Feb', amount: 520000 },
    { month: 'Mar', amount: 380000 },
    { month: 'Apr', amount: 850000 },
    { month: 'May', amount: 620000 },
    { month: 'Jun', amount: 940000 },
  ];

  const shareData = [
    { name: 'Plot Commissions', value: 35, fill: '#0A1629' },
    { name: 'Villa Commissions', value: 45, fill: '#C5A059' },
    { name: 'Apt Commissions', value: 20, fill: '#4F46E5' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-serif font-bold text-slate-800">Partner Ecosystem</h3>
          <p className="text-sm font-medium text-slate-500">Managing global legacy partnerships & commission structures</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
             <Briefcase size={16} /> Export Reports
           </button>
           <button className="bg-[#0A1629] text-[#C5A059] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
             <Trophy size={16} /> Onboard Elite Partner
           </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((partner, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#C5A059] transition-all">
            <div className={`absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${
              partner.type === 'Platinum' ? 'bg-indigo-600' : 'bg-[#C5A059]'
            }`}>
              <Award size={64} />
            </div>

            <div className="mb-6 relative z-10">
              <div className="flex justify-between items-start">
                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                  partner.type === 'Platinum' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                  partner.type === 'Gold' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                }`}>
                  {partner.type} Status
                </span>
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-black">{partner.rating}</span>
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold text-slate-800 mt-4 leading-none">{partner.name}</h4>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Authorized Legacy Partner</p>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.1em] mb-1">Bookings</p>
                <p className="text-lg font-black text-slate-800 leading-none">{partner.deals}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.1em] mb-1">Conv. Rate</p>
                <p className="text-lg font-black text-[#C5A059] leading-none">{partner.conversion}%</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
              <div>
                <p className="text-[8px] text-slate-400 font-black uppercase">Revenue Value</p>
                <p className="text-sm font-black text-slate-800">₹{(partner.value / 10000000).toFixed(2)} Cr</p>
              </div>
              <button className="w-10 h-10 bg-[#0A1629] text-white rounded-xl flex items-center justify-center hover:bg-[#C5A059] transition-all group-hover:scale-110">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Leaderboard */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-3">
              <Trophy className="text-[#C5A059]" size={24} />
              Leaderboard
            </h4>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Ranking</span>
          </div>
          
          <div className="space-y-4 flex-1">
            {partners.sort((a, b) => b.value - a.value).map((p, i) => (
              <div key={p.name} className={`flex items-center justify-between p-4 rounded-3xl border transition-all ${i === 0 ? 'bg-[#0A1629] border-[#0A1629] text-white shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-[#C5A059] text-[#0A1629]' : 'bg-white text-slate-400 border border-slate-200'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate max-w-[120px]">{p.name}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${i === 0 ? 'text-[#C5A059]' : 'text-slate-400'}`}>{p.deals} Bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black">₹{(p.value / 10000000).toFixed(2)}Cr</p>
                  <div className="flex items-center justify-end gap-1">
                    <TrendingUp size={10} className={i === 0 ? 'text-[#C5A059]' : 'text-emerald-500'} />
                    <span className="text-[8px] font-black uppercase tracking-tighter">Elite</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">
            View Expanded Rankings
          </button>
        </div>

        {/* Commission Tracking Visualizations */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-3">
                  <BarChart3 className="text-indigo-600" size={24} />
                  Commission Trends
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Payout Disbursements</p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-xl">
                    <IndianRupee size={12} className="text-indigo-600" />
                    <span className="text-xs font-black text-indigo-600">Total: 42.6L</span>
                 </div>
              </div>
            </div>
            
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commissionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={10} fontVariant="bold" tick={{ fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Bar dataKey="amount" fill="#0A1629" radius={[6, 6, 0, 0]} barSize={40}>
                    {commissionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === commissionData.length - 1 ? '#C5A059' : '#0A1629'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="h-24 w-24 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={shareData}
                      innerRadius={30}
                      outerRadius={45}
                      paddingAngle={5}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Category Split</h5>
                <div className="space-y-2">
                  {shareData.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-[10px] font-bold text-slate-600">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0A1629] to-[#1e293b] p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-white/10 rounded-bl-3xl">
                <Target size={20} className="text-[#C5A059]" />
              </div>
              <h5 className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] mb-4">Pipeline Goal</h5>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-3xl font-black">₹85.0L</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Current Quarter Payouts</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-sm">+22%</p>
                  <p className="text-[8px] text-slate-500 font-bold uppercase">vs Prev Q</p>
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#C5A059]" style={{ width: '72%' }} />
              </div>
              <p className="text-[9px] font-bold text-slate-400 mt-3 text-center">72% of Milestone Reached</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Pipeline Table */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
           <div>
              <h4 className="text-xl font-serif font-bold text-slate-800">Payout Pipeline</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time commission disbursement tracking</p>
           </div>
           <div className="flex gap-2">
              <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">Verified Units Only</span>
              <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">Historical Archives</button>
           </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { name: 'Elite Homes', unit: 'Villa A-102', status: 'Payment Received', amount: '₹4,50,000', release: 'Scheduled', date: 'Oct 28, 2023' },
              { name: 'Real Assets Co.', unit: 'Plot PL-43', status: 'Registry Done', amount: '₹1,25,000', release: 'Pending Approval', date: 'Oct 25, 2023' },
              { name: 'Pro Realty', unit: 'M. Greens B-204', status: 'Booking Advanced', amount: '₹2,10,000', release: 'Processing', date: 'Oct 24, 2023' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-slate-100 hover:border-indigo-100 transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                    <Briefcase size={24} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                       <span className="text-[#0A1629]">{item.unit}</span> • {item.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                   <div className="hidden md:block text-center">
                      <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Entry Date</p>
                      <p className="text-xs font-bold text-slate-700">{item.date}</p>
                   </div>
                   <div className="text-right">
                    <p className="text-xl font-black text-[#0A1629]">{item.amount}</p>
                    <div className="flex items-center justify-end gap-2 mt-1">
                       <div className={`w-1.5 h-1.5 rounded-full ${item.release === 'Scheduled' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                       <p className={`text-[10px] font-black uppercase tracking-tighter ${item.release === 'Scheduled' ? 'text-indigo-600' : 'text-amber-600'}`}>{item.release}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
