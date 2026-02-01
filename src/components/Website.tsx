import React, { useState } from "react";
import { ChevronRight, Mic, Lock, Menu, X, Star } from "lucide-react";
import Logo from "./Logo";
import LiveConcierge from "./LiveConcierge";
import SecurityFlow from "./SecurityFlow";
import type { Lead } from "../types";
import { InstagramIcon, FacebookIcon, LinkedinIcon, ArrowUpRight } from "lucide-react";



interface WebsiteProps {
  onLeadSubmit: (lead: Partial<Lead>) => void;
}

const Website: React.FC<WebsiteProps> = ({ onLeadSubmit }) => {
  const [showLiveAgent, setShowLiveAgent] = useState(false);
  const [showSecurityFlow, setShowSecurityFlow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: pos, behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden font-sans">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-manortha-gold/20 px-6 lg:px-20 py-4 flex justify-between items-center">
        <Logo size="md" />

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
          <button onClick={() => scrollToSection("portfolio")}>The Portfolio</button>
          <button onClick={() => scrollToSection("testimonials")}>Voices</button>
          <button onClick={() => setShowLiveAgent(true)} className="flex items-center gap-2">
            <Mic size={14} /> Live Tour
          </button>
          <button onClick={() => setShowSecurityFlow(true)} className="flex items-center gap-2">
            <Lock size={14} /> Portal Access
          </button>
        </nav>

        {/* MOBILE MENU */}
        <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {mobileMenu && (
        <div className="fixed top-[72px] inset-x-0 bg-white border-b z-40 lg:hidden">
          <div className="flex flex-col text-sm font-bold uppercase tracking-widest p-6 gap-6">
            <button onClick={() => scrollToSection("portfolio")}>The Portfolio</button>
            <button onClick={() => scrollToSection("testimonials")}>Voices</button>
            <button onClick={() => setShowLiveAgent(true)}>Live Tour</button>
            <button onClick={() => setShowSecurityFlow(true)}>Portal Access</button>
          </div>
        </div>
      )}

      <main className="pt-24">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
              className="w-full h-full object-cover brightness-[0.55]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 px-6 lg:px-24 max-w-4xl">
            <h1 className="text-white font-serif text-4xl sm:text-5xl lg:text-7xl leading-tight">
              Building <span className="italic text-manortha-gold">Legacies</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl text-sm sm:text-base">
              Experience the intersection of architectural grandeur and natural serenity in Bangalore's most exclusive enclaves.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="bg-manortha-gold text-black px-8 py-4 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2"
              >
                Explore Our Portfolio <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setShowLiveAgent(true)}
                className="border border-white/40 text-white px-8 py-4 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 backdrop-blur"
              >
                Virtual Web Tour <Mic size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-24 px-6 lg:px-24 bg-white text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-manortha-gold font-bold">
            Our Architectural Landmarks
          </p>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl">
            Curated Spaces for <span className="italic">Discerning Living</span>
          </h2>

          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-sm">
            From sustainable gated villa communities to high-rise suites in Bangalore's primary business districts.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Manortha Greens", "Skyline Residency", "Emerald Plots"].map((title, i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-xl border">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="font-serif text-xl">{title}</h3>
                  <p className="mt-2 text-[11px] tracking-widest uppercase text-manortha-gold">
                    Premium Living
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
<section id="testimonials" className="py-32 px-6 lg:px-24 bg-white text-center">
  <p className="text-[10px] tracking-[0.3em] uppercase text-manortha-gold font-bold">
    Resident Experiences
  </p>

  <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl">
    Voices of the <span className="italic">Legacy</span>
  </h2>

  <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
    {[
      {
        name: "Dr. Vikram Sethi",
        role: "Proprietor, Sethi Clinic",
        project: "Resident, Manortha Greens",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text:
          "The attention to detail in the villa architecture is unparalleled. Manortha provided a sanctuary that perfectly balances my professional life with serene living.",
      },
      {
        name: "Ananya Deshmukh",
        role: "Senior Architect",
        project: "Resident, Skyline Residency",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text:
          "As an architect, I am incredibly critical of structural integrity and aesthetic flow. Skyline Residency exceeded my expectations in both sustainability and urban design.",
      },
      {
        name: "Rajesh Iyer",
        role: "Investor",
        project: "Resident, Emerald Plots",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        text:
          "Manortha's transparency during the registration process was refreshing. Their appreciation value projections have already proven accurate within just 8 months.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-slate-50 rounded-3xl p-10 shadow border text-left relative"
      >
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={14}
              className="text-manortha-gold fill-manortha-gold"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="italic text-slate-600 leading-relaxed">
          “{item.text}”
        </p>

        {/* Read Story (TOP) */}
        <button className="mt-4 text-manortha-gold text-xs font-bold tracking-widest uppercase flex items-center gap-1 hover:underline">
          Read the full story →
        </button>

        <hr className="my-6 border-slate-200" />

        {/* Footer */}
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-sm">{item.name}</p>
            <p className="text-manortha-gold text-[10px] uppercase tracking-widest">
              {item.role}
            </p>
            <p className="text-xs text-slate-400">{item.project}</p>

            {/* Read Story (BOTTOM – THIS WAS MISSING) */}
            <button className="mt-2 text-manortha-gold text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 hover:underline">
              Read the full story →
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* CONTACT */}
        <section className="py-24 px-6 lg:px-24 bg-white text-center">
          <div className="max-w-4xl mx-auto border border-manortha-gold p-12">
            <h2 className="font-serif text-4xl mb-10">Begin Your Journey</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLeadSubmit({ name: "Lead" });
                setShowSecurityFlow(true);
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <input placeholder="Full Name" className="border-b p-3 outline-none" />
              <input placeholder="Mobile Number" className="border-b p-3 outline-none" />
              <button className="sm:col-span-2 bg-black text-manortha-gold py-4 uppercase tracking-widest font-bold">
                Secure Consultation Request
              </button>
            </form>
          </div>
        </section>
{/* FOOTER */}
<footer className="bg-black text-white px-6 lg:px-24 pt-24 pb-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

    {/* LEFT */}
    <div className="space-y-6">
      {/* ONLY LOGO COMPONENT */}
      <Logo variant="light" size="md" />

      <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
        Crafting high-end living experiences across Bangalore's most
        sought-after coordinates since 2012.
      </p>

      {/* SOCIAL ICONS */}
      <div className="flex gap-4">
        <a
          href="https://instagram.com"
          target="_blank"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-manortha-gold hover:text-black transition"
        >
          <InstagramIcon size={18} />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-manortha-gold hover:text-black transition"
        >
          <FacebookIcon size={18} />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-manortha-gold hover:text-black transition"
        >
          <LinkedinIcon size={18} />
        </a>
      </div>
    </div>

    {/* CENTER */}
    <div>
      <p className="text-manortha-gold text-xs font-bold tracking-widest uppercase mb-6">
        Quick Navigation
      </p>
      <ul className="space-y-4 text-sm">
        <li>
          <button onClick={() => scrollToSection("portfolio")} className="hover:text-manortha-gold">
            Residential Portfolio
          </button>
        </li>
        <li>
          <button className="hover:text-manortha-gold">
            Commercial Landmarks
          </button>
        </li>
        <li>
          <button className="hover:text-manortha-gold">
            Sustainability Report
          </button>
        </li>
        <li>
          <button onClick={() => setShowSecurityFlow(true)} className="hover:text-manortha-gold">
            Channel Partner Portal
          </button>
        </li>
      </ul>
    </div>

    {/* RIGHT */}
    <div>
      <p className="text-manortha-gold text-xs font-bold tracking-widest uppercase mb-6">
        Headquarters
      </p>
      <p className="text-sm leading-relaxed">
        Suite 402, Prestige Tower<br />
        Richmond Road, Bangalore<br />
        Karnataka 560025
      </p>

      <a
        href="mailto:concierge@manortha.com"
        className="inline-flex items-center gap-2 mt-4 text-manortha-gold hover:underline"
      >
        concierge@manortha.com <ArrowUpRight size={14} />
      </a>
    </div>
  </div>

  {/* BOTTOM BAR */}
  <div className="mt-20 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
    <p>© 2024 MANORTHA GROUP PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
    <div className="flex gap-6">
      <button className="hover:text-manortha-gold">Privacy Policy</button>
      <button className="hover:text-manortha-gold">Terms of Service</button>
      <button className="hover:text-manortha-gold">RERA Compliance</button>
    </div>
  </div>
</footer>



      </main>

      {showLiveAgent && <LiveConcierge onClose={() => setShowLiveAgent(false)} />}
      {showSecurityFlow && (
        <SecurityFlow
          type="LOGIN"
          identifier={null}
          onVerified={() => setShowSecurityFlow(false)}
          onCancel={() => setShowSecurityFlow(false)}
        />
      )}
    </div>
  );
};

export default Website;
