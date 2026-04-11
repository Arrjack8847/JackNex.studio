import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const SocialSidebar = () => {
  return (
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
      
      {/* Top line */}
      <div className="h-20 w-[1px] bg-black/20" />

      {/* Instagram */}
      <motion.a
        href="https://www.instagram.com/jacknex.studio"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.15, x: 3 }}
        className="text-black/50 hover:text-black transition"
      >
        <Instagram className="w-4 h-4" />
      </motion.a>

      {/* Facebook */}
      <motion.a
        href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.15, x: 3 }}
        className="text-black/50 hover:text-black transition"
      >
        <Facebook className="w-4 h-4" />
      </motion.a>

      {/* LinkedIn */}
      <motion.a
        href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.15, x: 3 }}
        className="text-black/50 hover:text-black transition"
      >
        <Linkedin className="w-4 h-4" />
      </motion.a>

      {/* Bottom line */}
      <div className="h-20 w-[1px] bg-black/20" />
    </div>
  );
};

export default SocialSidebar;