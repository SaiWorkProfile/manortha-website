import React from 'react';
import  { UserRole } from "../types";
import type { Lead, Property } from "../types";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

import {
  Users,
  Building2,
  DollarSign,
  Target,
  Bot,
  Layers,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  role: UserRole;
  leads: Lead[];
  properties: Property[];
}

const Dashboard: React.FC<DashboardProps> = ({ role, leads, properties }) => {
  const soldUnits = properties.filter(
    p => p.status === 'BOOKED' || p.status === 'REGISTERED'
  ).length;

  const totalRevenue = properties
    .filter(p => p.status === 'BOOKED' || p.status === 'REGISTERED')
    .reduce((acc, p) => acc + p.price, 0);

  const funnelStages = [
    { label: 'New Enquiries', count: leads.length, color: '#000000' },
    { label: 'Qualified', count: leads.filter(l => l.stage !== 'New').length, color: '#4F46E5' },
    { label: 'Site Visits', count: leads.filter(l => l.stage === 'Site Visit' || l.stage === 'Booking' || l.stage === 'Registry').length, color: '#D4AF37' },
    { label: 'Bookings', count: soldUnits, color: '#B83B1D' },
  ];

  const projectDistribution = [
    { name: 'M. Greens', value: properties.filter(p => p.project === 'Manortha Greens').length, color: '#D4AF37' },
    { name: 'Skyline', value: properties.filter(p => p.project === 'Skyline Residency').length, color: '#000000' },
    { name: 'Emerald', value: properties.filter(p => p.project === 'Emerald Plots').length, color: '#B83B1D' },
    { name: 'Business', value: properties.filter(p => p.project === 'Business Square').length, color: '#4F46E5' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Global Revenue" value={`₹${(totalRevenue / 10000000).toFixed(2)} Cr`} change="+12.5%" icon={DollarSign} color="bg-manortha-black" />
        <MetricCard label="Units Sold" value={`${soldUnits} Units`} change="+5.2%" icon={Building2} color="bg-manortha-sunset" />
        <MetricCard label="New Enquiries" value={leads.length.toString()} change="+18.4%" icon={Users} color="bg-manortha-gold" />
        <MetricCard
          label="Conversion Rate"
          value={`${leads.length ? ((soldUnits / leads.length) * 100).toFixed(1) : 0}%`}
          change="+2.1%"
          icon={Target}
          color="bg-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funnel */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
          <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
            <Layers size={24} className="text-manortha-gold" /> Sales Funnel Analysis
          </h3>

          <div className="space-y-4">
            {funnelStages.map((stage, i) => (
              <div key={stage.label} className="relative group">
                <div
                  className="h-16 rounded-2xl flex items-center px-6 text-white"
                  style={{
                    backgroundColor: stage.color,
                    width: `${100 - i * 10}%`,
                    marginLeft: `${i * 5}%`
                  }}
                >
                  <span className="text-xs font-black uppercase tracking-widest flex-1">{stage.label}</span>
                  <span className="text-2xl font-black">{stage.count}</span>
                  <ArrowRight className="ml-4 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
          <h3 className="font-serif text-2xl font-bold text-slate-800 mb-8">Inventory Mix</h3>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={projectDistribution} dataKey="value" innerRadius={60} outerRadius={80}>
                  {projectDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {(role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN || role === UserRole.MANAGEMENT) && (
        <div className="bg-manortha-black rounded-[40px] p-10 text-white flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-manortha-gold rounded-3xl flex items-center justify-center">
              <Bot size={40} />
            </div>
            <div>
              <h3 className="text-3xl font-serif font-bold">Manortha Strategic Advisor</h3>
              <p className="text-slate-400 text-xs uppercase tracking-widest">AI Sales Intelligence</p>
            </div>
          </div>
          <button className="px-10 py-5 bg-manortha-gold text-manortha-black rounded-2xl font-black text-xs uppercase tracking-widest">
            Ask Engine
          </button>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; change: string; icon: any; color: string }> =
({ label, value, change, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[40px] border border-slate-200">
    <div className="flex items-center justify-between mb-6">
      <div className={`${color} p-4 rounded-2xl text-white`}><Icon size={28} /></div>
      <div className="text-emerald-600 text-[10px] font-black bg-emerald-50 px-3 py-1.5 rounded-full">{change}</div>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-black text-manortha-black mt-2">{value}</h4>
  </div>
);

export default Dashboard;
