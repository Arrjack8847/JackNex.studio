import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const SocialSidebar = () => {
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
        <div className="h-20 w-[1px] bg-black/20" />

        <motion.a
          href="https://www.instagram.com/jacknex.studio"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, x: 3 }}
          className="text-black/50 hover:text-black transition"
        >
          <Instagram className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, x: 3 }}
          className="text-black/50 hover:text-black transition"
        >
          <Facebook className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, x: 3 }}
          className="text-black/50 hover:text-black transition"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        <div className="h-20 w-[1px] bg-black/20" />
      </div>

      {/* ================= MOBILE (GLOW VERSION) ================= */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-4 rounded-full border border-black/10 bg-white/60 px-3 py-4 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] md:hidden"
      >
        {/* Instagram */}
        <motion.a
          href="https://www.instagram.com/jacknex.studio"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="relative text-black/60 transition active:text-black"
        >
          <span className="absolute inset-0 rounded-full blur-md opacity-0 transition group-hover:opacity-100" />
          <Instagram className="w-5 h-5" />
        </motion.a>

        {/* Facebook */}
        <motion.a
          href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="text-black/60 transition active:text-black"
        >
          <Facebook className="w-5 h-5" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="text-black/60 transition active:text-black"
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </>
  );
};

export default SocialSidebar;
