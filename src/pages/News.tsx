import { Link } from "react-router-dom";

const news = [
  {
    title: "Manortha Launches Premium Villas in Bangalore",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200",
    desc: "A new benchmark in luxury residential living."
  },
  {
    title: "Green Building Initiative Award 2026",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
    desc: "Manortha recognized for sustainable construction practices."
  }
];

export default function News() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white pt-28 px-6 lg:px-24">
        
<Link
        to="/"
        className="inline-block mb-10 px-6 py-2 rounded-md font-bold 
                   bg-gradient-to-r from-orange-400 to-orange-600 
                   text-black shadow-lg hover:scale-105 transition"
      >
        Home
      </Link>
      <h1 className="text-4xl mb-10 text-manortha-gold">News</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {news.map((n, i) => (
          <div key={i} className="bg-black/60 rounded-xl overflow-hidden border border-white/10">
            <img src={n.image} className="h-56 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl text-orange-400">{n.title}</h2>
              <p className="text-slate-400 mt-2">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
