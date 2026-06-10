import { motion } from "framer-motion";
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

      <motion.div
        initial={prefersReducedMotion ? false : { x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-black/10 bg-white/60 px-2 py-3 shadow-[0_0_20px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
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
              whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
              className="flex h-11 w-11 items-center justify-center rounded-full text-black/60 transition active:text-black"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </motion.a>
          );
        })}
      </motion.div>
    </>
  );
};

export default SocialSidebar;
