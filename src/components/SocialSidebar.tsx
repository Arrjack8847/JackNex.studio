import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { socialLinks } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
} as const;

const SocialSidebar = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateMobileBar = () => {
      window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        const workSection = document.getElementById("work");

        if (!workSection) {
          setShowMobileBar(false);
          return;
        }

        const revealPoint = window.innerHeight * 0.88;
        const workTop = workSection.getBoundingClientRect().top;
        const viewportMiddle = window.innerHeight * 0.5;
        const projectCards = Array.from(
          workSection.querySelectorAll<HTMLElement>("[data-work-project]"),
        );
        const projectOwnsViewport = projectCards.some((card) => {
          const rect = card.getBoundingClientRect();
          return rect.top <= viewportMiddle && rect.bottom >= viewportMiddle;
        });

        setShowMobileBar(workTop <= revealPoint && !projectOwnsViewport);
      });
    };

    updateMobileBar();

    window.addEventListener("scroll", updateMobileBar, { passive: true });
    window.addEventListener("resize", updateMobileBar, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateMobileBar);
      window.removeEventListener("resize", updateMobileBar);
    };
  }, []);

  return (
    <>
      <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
        <div className="h-20 w-px bg-black/20" />

        {socialLinks.map((link) => {
          const Icon = socialIcons[link.label];

          return (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit JackNex Studio on ${link.label}`}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.15, x: 3 }}
              className="text-black/50 transition hover:text-black"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          );
        })}

        <div className="h-20 w-px bg-black/20" />
      </div>

      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 34, scale: 0.96 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 24, scale: 0.97 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-black/10 bg-white/70 px-2 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
          >
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.label];

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit JackNex Studio on ${link.label}`}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-black/60 transition active:text-black"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialSidebar;
