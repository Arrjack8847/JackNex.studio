import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const SocialSidebar = () => {
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
        
        <div className="h-20 w-[1px] bg-black/20" />

        <motion.a
          href="https://www.instagram.com/jacknex.studio"
          target="_blank"
          whileHover={{ scale: 1.15, x: 3 }}
          className="text-black/50 hover:text-black transition"
        >
          <Instagram className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
          target="_blank"
          whileHover={{ scale: 1.15, x: 3 }}
          className="text-black/50 hover:text-black transition"
        >
          <Facebook className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
          target="_blank"
          whileHover={{ scale: 1.15, x: 3 }}
          className="text-black/50 hover:text-black transition"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        <div className="h-20 w-[1px] bg-black/20" />
      </div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 left-1/2 z-50 flex w-[90%] max-w-sm -translate-x-1/2 items-center justify-between rounded-full border border-black/10 bg-white/60 px-6 py-3 backdrop-blur-xl md:hidden"
      >
        {/* Instagram */}
        <motion.a
          href="https://www.instagram.com/jacknex.studio"
          target="_blank"
          whileTap={{ scale: 0.9 }}
          className="text-black/60 active:text-black"
        >
          <Instagram className="w-5 h-5" />
        </motion.a>

        {/* Facebook */}
        <motion.a
          href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
          target="_blank"
          whileTap={{ scale: 0.9 }}
          className="text-black/60 active:text-black"
        >
          <Facebook className="w-5 h-5" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
          target="_blank"
          whileTap={{ scale: 0.9 }}
          className="text-black/60 active:text-black"
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </>
  );
};

export default SocialSidebar;