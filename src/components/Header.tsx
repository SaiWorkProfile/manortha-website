import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-[#0b0f1a] to-transparent border-b border-white/10 px-6 lg:px-20 py-4 flex justify-between items-center">
        <Logo size="md" />

        <nav className="hidden lg:flex items-center gap-10 text-sm text-white/80">
          <Link to="/">Home</Link>
          <Link to="/#projects">Projects</Link>
          <Link to="/#about">About Us</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/news">News</Link>
          <Link to="/#contact">Contact Us</Link>
        </nav>

        <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {mobileMenu && (
        <div className="fixed top-[72px] inset-x-0 bg-black border-b z-40 lg:hidden">
          <div className="flex flex-col p-6 gap-6 text-white">
            <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link to="/#projects" onClick={() => setMobileMenu(false)}>Projects</Link>
            <Link to="/#about" onClick={() => setMobileMenu(false)}>About Us</Link>
            <Link to="/articles" onClick={() => setMobileMenu(false)}>Articles</Link>
            <Link to="/blogs" onClick={() => setMobileMenu(false)}>Blogs</Link>
            <Link to="/news" onClick={() => setMobileMenu(false)}>News</Link>
            <Link to="/#contact" onClick={() => setMobileMenu(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
