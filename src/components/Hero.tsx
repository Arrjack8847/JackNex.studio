import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const imgX = useTransform(smoothX, [0, 1600], [-12, 12]);
  const imgY = useTransform(smoothY, [0, 1000], [-10, 10]);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // mouse only (NO TOUCH)
  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen overflow-hidden text-black">
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-2">

        {/* LEFT */}
        <div className="flex items-center px-5 pb-12 pt-28 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[680px]">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-[10px] uppercase tracking-[0.45em] text-black/40 sm:text-xs"
            >
              JackNex Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[8ch] text-[3rem] font-semibold leading-[0.9] tracking-[-0.06em] sm:text-[4.2rem] md:text-[5.4rem] lg:text-[6.3rem] xl:text-[7rem]"
            >
              I build websites that make brands look premium.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 max-w-[620px] text-sm leading-7 text-black/55 sm:text-base md:text-lg"
            >
              Clean, modern, conversion-focused websites for personal brands,
              businesses, and creative projects that want to stand out online.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm text-white transition hover:scale-[1.03]"
              >
                View Work
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="https://wa.me/60175052024"
                target="_blank"
                className="inline-flex items-center rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm backdrop-blur-sm transition hover:scale-[1.03]"
              >
                Book A Call
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh] lg:h-screen">

          <motion.img
            src="/hero-man.webp"
            className="absolute inset-0 h-full w-full object-cover grayscale gpu"
            
            // desktop interaction
            style={!isMobile ? { x: imgX, y: imgY } : {}}

            // mobile = smooth floating only
            animate={{
  y: isMobile ? [0, -5, 0] : [0, -6, 0],
  scale: isMobile ? [1, 1.01, 1] : [1, 1.02, 1],
}}

            transition={{
  duration: isMobile ? 8 : 10,
  repeat: Infinity,
  ease: "easeInOut",
}}
          />

          {/* particles (reduced for mobile) */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {[...Array(isMobile ? 6 : 10)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute block rounded-full bg-black/20"
                style={{
                  width: isMobile ? 4 : 6,
                  height: isMobile ? 4 : 6,
                  left: `${(i * 13 + 17) % 100}%`,
                  top: `${(i * 19 + 11) % 100}%`,
                }}
                animate={{
                  y: [0, isMobile ? -8 : -12, 0],
                  x: [0, 6, -4, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}