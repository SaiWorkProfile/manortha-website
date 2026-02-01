import React, { useState } from "react";
import { Menu, X, MessageSquare, MapPin, FileText, Home } from "lucide-react";
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="bg-[#0b0f1a] text-white overflow-x-hidden font-serif">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-[#0b0f1a] to-transparent border-b border-white/10 px-6 lg:px-20 py-4 flex justify-between items-center">
        <Logo size="md" />

        <nav className="hidden lg:flex items-center gap-12 text-sm text-white/80">
          <button onClick={() => scrollTo("hero")}>Home</button>
          <button onClick={() => scrollTo("projects")}>Projects</button>
          <button onClick={() => scrollTo("about")}>About Us</button>
          <button onClick={() => scrollTo("contact")}>Contact Us</button>
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden lg:block bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-2 rounded-md text-black font-bold"
        >
          Get In Touch
        </button>

        <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {mobileMenu && (
        <div className="fixed top-[72px] inset-x-0 bg-black border-b z-40 lg:hidden">
          <div className="flex flex-col p-6 gap-6">
            <button onClick={() => scrollTo("hero")}>Home</button>
            <button onClick={() => scrollTo("projects")}>Projects</button>
            <button onClick={() => scrollTo("about")}>About Us</button>
            <button onClick={() => scrollTo("contact")}>Contact Us</button>
          </div>
        </div>
      )}

      <main className="pt-24">

        <Divider />

        {/* HERO */}
        <section id="hero" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2000"
              className="w-full h-full object-cover brightness-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 px-6 lg:px-24 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">
              Crafting Luxury <br /> Living Spaces
            </h1>
            <p className="mt-4 text-manortha-gold">From Vision to Reality</p>

            <button
              onClick={() => scrollTo("projects")}
              className="mt-8 bg-orange-500 text-black px-6 py-3 rounded font-bold"
            >
              Explore Projects
            </button>
          </div>
        </section>

        <Divider />

        {/* PROJECTS */}
        <section id="projects" className="py-20 px-6 lg:px-24">
          <h2 className="text-3xl mb-10">Our Latest Developments</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Elite Heights", loc: "Gurgaon | Ready to Move" },
              { title: "Urban Vista", loc: "Noida | Under Construction" },
              { title: "Palm Residences", loc: "Lucknow | Ready to Move" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => scrollTo("contact")}
                className="rounded-xl overflow-hidden border border-white/10 text-left hover:scale-[1.02] transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-black/70">
                  <h3>{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.loc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Divider />

        {/* ABOUT */}
        <section id="about" className="py-20 px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl mb-2">About Us</h2>
            <h3 className="text-manortha-gold text-xl mb-4">Welcome to Manortha</h3>
            <p className="text-slate-300 mb-6">
              We create luxury living spaces that combine innovative design,
              quality craftsmanship and prime locations.
            </p>

            <button
              onClick={() => scrollTo("contact")}
              className="bg-orange-500 text-black px-6 py-3 rounded font-bold"
            >
              Learn More
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
            className="rounded-xl"
          />
        </section>


        {/* OUR PROCESS */}
<section className="py-20 px-6 lg:px-24 text-white">
  {/* TOP GOLD LINE */}
  <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mb-12" />

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
    {/* LEFT TEXT */}
    <div>
      <h2 className="text-3xl font-serif text-[#d4a853] mb-2">Our Process</h2>
      <p className="text-slate-300 text-sm">Enquiry & Consultation</p>
      <p className="text-slate-400 text-xs">
        Seamless & Bespoke projects
      </p>
    </div>

    {/* STEPS */}
    <div className="lg:col-span-2 flex flex-col lg:flex-row items-center justify-between gap-8">
      
      <ProcessStep icon={<MessageSquare />} title="Enquiry &" subtitle="Consultation" />
      <ProcessLine />

      <ProcessStep icon={<MapPin />} title="Exploration" subtitle="& Site Visit" />
      <ProcessLine />

      <ProcessStep icon={<FileText />} title="Booking &" subtitle="Approval" />
      <ProcessLine />

      <ProcessStep icon={<Home />} title="Handover" subtitle="to Move-In" />
    </div>
  </div>

  {/* BOTTOM GOLD LINE */}
  <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mt-12" />
</section>



        {/* STATS */}
        <section className="py-16 px-6 lg:px-24 grid grid-cols-2 lg:grid-cols-4 text-center gap-10">
          <Stat value="15+" label="Years of Experience" />
          <Stat value="20+" label="Completed Projects" />
          <Stat value="2 Million+" label="Sq. Ft. Delivered" />
          <Stat value="2 Million+" label="Happy Clients" />
        </section>

        <Divider />

        {/* CONTACT */}
        <section id="contact" className="py-20 px-6 lg:px-24">
          <h2 className="text-3xl mb-6">Get In Touch</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              onLeadSubmit({
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
              });
              form.reset();
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <input name="name" placeholder="Name" className="input" />
            <input name="email" placeholder="Email" className="input" />
            <input name="phone" placeholder="Phone" className="input" />
            <textarea name="message" placeholder="Message" className="sm:col-span-3 input h-32" />

            <button className="sm:col-span-3 bg-orange-500 text-black py-3 font-bold">
              Send Message
            </button>
          </form>
        </section>

        <Divider />

        {/* FOOTER */}
        <footer className="bg-black text-white px-6 lg:px-24 pt-24 pb-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <Logo variant="light" size="md" />
              <p className="text-slate-400 text-sm mt-4">
                Crafting high-end living experiences since 2012.
              </p>
            </div>

            <div>
              <p className="text-manortha-gold text-xs mb-4">Quick Navigation</p>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollTo("projects")}>Residential Portfolio</button></li>
                <li><button>Commercial Landmarks</button></li>
                <li><button>Sustainability Report</button></li>
                <li><button onClick={() => setShowSecurityFlow(true)}>Channel Partner Portal</button></li>
              </ul>
            </div>

            <div>
              <p className="text-manortha-gold text-xs mb-4">Headquarters</p>
              <p className="text-sm">
                Suite 402, Prestige Tower<br />
                Richmond Road, Bangalore
              </p>
              <a className="inline-flex items-center gap-2 mt-3 text-manortha-gold">
                concierge@manortha.com <ArrowUpRight size={14} />
              </a>
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

const Divider = () => (
  <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4a853] to-transparent" />
);

const ProcessStep = ({ icon, title }: any) => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-manortha-gold text-xl">{icon}</div>
    <p>{title}</p>
  </div>
);

const ProcessLine = () => (
  <div className="hidden lg:block flex-1 h-[1px] bg-manortha-gold/50" />
);

const Stat = ({ value, label }: any) => (
  <div>
    <h3 className="text-4xl text-orange-400 font-bold">{value}</h3>
    <p className="text-slate-300">{label}</p>
  </div>
);

export default Website;
