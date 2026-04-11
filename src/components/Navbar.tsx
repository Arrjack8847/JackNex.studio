import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
        {/* Logo */}
        <a
          href="#"
          className="text-[1.05rem] font-semibold tracking-tight text-black"
        >
          JackNex <span className="font-light">Studio</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="text-sm text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
          >
            Book A Call ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-black/10 px-6 pb-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-black/70 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-black border-b border-black w-fit pb-0.5"
          >
            Book A Call ↗
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;