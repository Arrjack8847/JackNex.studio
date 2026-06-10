import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";

const mobileMenuId = "mobile-navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      aria-label="Primary navigation"
    >
      <div className="flex w-full items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <a
          href="#top"
          className="text-[1.05rem] font-semibold tracking-tight text-black"
          onClick={closeMobileMenu}
        >
          JackNex <span className="font-light">Studio</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-black/70 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}

          <a
            href={siteConfig.contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border-b border-black pb-0.5 text-sm text-black transition-opacity hover:opacity-60"
          >
            Discuss Your Project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          id={mobileMenuId}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
          className="flex flex-col gap-2 border-b border-black/10 bg-white px-6 pb-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className="rounded-lg py-2 text-black/70 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}

          <a
            href={siteConfig.contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="mt-2 inline-flex w-fit items-center gap-1.5 border-b border-black pb-0.5 text-black"
          >
            Discuss Your Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
