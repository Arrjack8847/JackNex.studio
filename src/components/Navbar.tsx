
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";

const mobileMenuId = "mobile-navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Telegram is currently null in site.ts.
  // Until you add Telegram, the navbar will use WhatsApp.
  const primaryContact =
    siteConfig.contact.telegram ?? siteConfig.contact.whatsapp;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={
        prefersReducedMotion
          ? false
          : {
              y: -70,
              opacity: 0,
            }
      }
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut",
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-black/10 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-4 sm:px-6 md:px-10 md:py-5 lg:px-16">
        {/* Logo */}
        <a
          href="#top"
          onClick={closeMobileMenu}
          className="group relative z-10 inline-flex items-center text-[1.05rem] font-semibold tracking-tight text-black"
          aria-label="JackNex Studio home"
        >
          <span>JackNex</span>

          <span className="ml-1 font-light text-black/65 transition-colors duration-300 group-hover:text-black">
            Studio
          </span>

          <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          <div className="flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative py-2 text-sm font-medium text-black/60 transition-colors duration-300 hover:text-black"
              >
                {link.label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href={primaryContact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
            aria-label={primaryContact.label}
          >
            Discuss Your Project

            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen((open) => !open);
          }}
          className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-black/10 bg-white/70 transition-colors hover:bg-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
        >
          <span
            className={`block h-[1.5px] w-5 bg-black transition-all duration-300 ${
              mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />

          <span
            className={`block h-[1.5px] w-5 bg-black transition-all duration-300 ${
              mobileOpen
                ? "scale-x-0 opacity-0"
                : "scale-x-100 opacity-100"
            }`}
          />

          <span
            className={`block h-[1.5px] w-5 bg-black transition-all duration-300 ${
              mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={mobileMenuId}
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    height: 0,
                  }
            }
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    height: 0,
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-t border-black/10 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-5 pb-7 pt-4 sm:px-6">
              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -12,
                          }
                    }
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      delay: prefersReducedMotion
                        ? 0
                        : index * 0.05,
                    }}
                    className="flex min-h-12 items-center justify-between border-b border-black/10 py-3 text-lg font-medium text-black/75 transition-colors hover:text-black"
                  >
                    <span>{link.label}</span>

                    <span
                      className="text-xs font-normal text-black/35"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                ))}
              </div>

              <motion.a
                href={primaryContact.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  delay: prefersReducedMotion
                    ? 0
                    : navLinks.length * 0.05,
                }}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-all hover:bg-black/85"
                aria-label={primaryContact.label}
              >
                Discuss Your Project

                <ArrowUpRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </motion.a>

              <p className="mt-4 text-center text-xs leading-relaxed text-black/40">
                Web design, development and creative digital experiences.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

