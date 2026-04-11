import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const SocialSidebar = () => {
  return (
    <div className="fixed left-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-4 sm:left-4 md:left-6 md:gap-6">
      <div className="h-12 w-[1px] bg-black/20 md:h-20" />

      <motion.a
        href="https://www.instagram.com/jacknex.studio"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, x: 3 }}
        whileTap={{ scale: 0.92 }}
        className="text-black/50 transition hover:text-black"
      >
        <Instagram className="h-4 w-4 md:h-5 md:w-5" />
      </motion.a>

      <motion.a
        href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, x: 3 }}
        whileTap={{ scale: 0.92 }}
        className="text-black/50 transition hover:text-black"
      >
        <Facebook className="h-4 w-4 md:h-5 md:w-5" />
      </motion.a>

      <motion.a
        href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, x: 3 }}
        whileTap={{ scale: 0.92 }}
        className="text-black/50 transition hover:text-black"
      >
        <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
      </motion.a>

      <div className="h-12 w-[1px] bg-black/20 md:h-20" />
    </div>
  );
};

export default SocialSidebar;
