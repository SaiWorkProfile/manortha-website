import { Link } from "react-router-dom";

const articles = [
  {
    title: "Future of Luxury Housing in India",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    desc: "Exploring how technology and design are shaping premium living spaces."
  },
  {
    title: "Why Location Defines Property Value",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200",
    desc: "Understanding the importance of connectivity and lifestyle in real estate."
  }
];

export default function Articles() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white px-6 lg:px-24 py-16">

      <Link
        to="/"
        className="inline-block mb-10 px-6 py-2 rounded-md font-bold 
                   bg-gradient-to-r from-orange-400 to-orange-600 
                   text-black shadow-lg hover:scale-105 transition"
      >
        Home
      </Link>

      <h1 className="text-4xl mb-10 text-manortha-gold">Articles</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((a, i) => (
          <div key={i} className="bg-black/60 rounded-xl overflow-hidden border border-white/10">
            <img src={a.image} className="h-56 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl text-orange-400">{a.title}</h2>
              <p className="text-slate-400 mt-2">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
