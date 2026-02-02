
import { Link } from "react-router-dom";
const blogs = [
  {
    title: "How to Choose Your Dream Home",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
    desc: "A practical guide to selecting the right property for your family."
  },
  {
    title: "Interior Trends for 2026",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
    desc: "Top luxury interior trends redefining modern living."
  }
];

export default function Blogs() {
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
      <h1 className="text-4xl mb-10 text-manortha-gold">Blogs</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((b, i) => (
          <div key={i} className="bg-black/60 rounded-xl overflow-hidden border border-white/10">
            <img src={b.image} className="h-56 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl text-orange-400">{b.title}</h2>
              <p className="text-slate-400 mt-2">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
