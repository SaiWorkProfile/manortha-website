import React from "react";
import {
  MapPin,
  CheckCircle2,
  Download,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Building
} from "lucide-react";

const Customer: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Property Hero */}
      <div className="bg-manortha-black rounded-[40px] shadow-2xl border border-manortha-gold/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 bg-manortha-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="h-64 relative">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
            alt="Project"
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-manortha-black via-manortha-black/40 to-transparent" />
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center gap-3 bg-manortha-gold text-manortha-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={14} /> Registered Asset
            </div>
            <h2 className="text-5xl font-serif font-black text-white">
              Manortha Greens
            </h2>
            <p className="text-slate-400 flex items-center gap-2 font-bold uppercase tracking-widest text-xs mt-3">
              <MapPin size={16} className="text-manortha-gold" /> Unit A-101 •
              Private Luxury Villa
            </p>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 border-t border-white/5">
          <AssetStat label="Acquisition Date" value="12 Oct 2023" />
          <AssetStat label="Financial Progress" value="85%" color="text-manortha-gold" />
          <AssetStat label="Current Valuation" value="₹1.85 Cr" />
          <AssetStat label="Handover Est." value="Dec 2024" />
        </div>
      </div>

      {/* Construction + Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Construction */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-manortha-black flex items-center gap-3 mb-6">
              <Building className="text-manortha-gold" /> Construction Timeline
            </h3>

            {[
              { label: "Foundation & Plinth", date: "Completed Dec 2023", status: "done" },
              { label: "Brick Work & Plastering", date: "Completed Feb 2024", status: "done" },
              { label: "Electrical & Plumbing", date: "Ongoing - 70%", status: "active" },
              { label: "Architectural Finishing", date: "Aug 2024", status: "pending" }
            ].map((m, i) => (
              <div key={i} className="flex gap-4 mb-4">
                <div className="w-6 h-6 rounded-full bg-manortha-gold flex items-center justify-center">
                  {m.status === "done" && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <div>
                  <p className="font-bold">{m.label}</p>
                  <p className="text-xs text-slate-400">{m.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payments */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-manortha-black flex items-center gap-3 mb-6">
              <CreditCard className="text-manortha-gold" /> Installments
            </h3>

            {[
              { label: "Booking", amt: "₹15L", status: "PAID" },
              { label: "Foundation", amt: "₹35L", status: "PAID" },
              { label: "Finishing", amt: "₹25L", status: "PENDING" }
            ].map((p, i) => (
              <div key={i} className="flex justify-between mb-3">
                <span>{p.label}</span>
                <span>{p.amt}</span>
                <span>{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-manortha-black mb-4">
              Digital Vault
            </h3>
            {["Sale Agreement", "KHATA Certificate"].map((doc, i) => (
              <button key={i} className="w-full flex justify-between p-3 bg-slate-50 mb-2">
                {doc}
                <Download size={16} />
              </button>
            ))}
          </div>

          <div className="bg-manortha-black p-10 rounded-[40px] text-white mt-10">
            <button className="w-full bg-manortha-gold text-manortha-black py-4 rounded-2xl">
              <MessageCircle size={20} /> Contact RM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssetStat = ({
  label,
  value,
  color = "text-white"
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <div>
    <p className="text-xs uppercase text-slate-400">{label}</p>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Customer;
