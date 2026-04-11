import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";


export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const imgX = useTransform(smoothX, [0, 1600], [-20, 20]);
  const imgY = useTransform(smoothY, [0, 1000], [-15, 15]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

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
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-[8ch] text-[3rem] font-semibold leading-[0.9] tracking-[-0.06em] sm:text-[4.2rem] md:text-[5.4rem] lg:text-[6.3rem] xl:text-[7rem]"
            >
              I build websites that make brands look premium.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 max-w-[620px] text-sm leading-7 text-black/55 sm:text-base md:text-lg"
            >
              Clean, modern, conversion-focused websites for personal brands,
              businesses, and creative projects that want to stand out online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {/* VIEW WORK → Portfolio page */}
<a
  href="#work"
  className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.03]"
>
  View Work
  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
</a>

{/* BOOK A CALL → WhatsApp */}
<a
  href="https://wa.me/60175052024?text=Hi%20JackNex%20Studio%2C%20I%20want%20to%20build%20a%20website."
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-medium text-black backdrop-blur-sm transition hover:scale-[1.03] hover:bg-white"
>
  Book A Call
</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-black/45"
            >
              <span><strong className="text-black">10+</strong> Projects</span>
<span><strong className="text-black">Client-focused</strong> Design</span>
<span><strong className="text-black">Fast</strong> Delivery</span>
            </motion.div>
          </div>
        </div>
        {/* SOFT GLOW BEHIND SUBJECT */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="h-[300px] w-[300px] rounded-full bg-black/10 blur-[120px]" />
</div>
        {/* RIGHT */}
        <div className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh] lg:h-screen">
          <motion.img
            src="/hero-man.png"
            alt="JackNex Studio"
            className="absolute inset-0 h-full w-full object-cover object-center grayscale"
            style={{ x: imgX, y: imgY }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* PHOTO PARTICLES (CONNECTED EFFECT) */}
<div className="absolute inset-0 z-[2] pointer-events-none">
  {[...Array(10)].map((_, i) => (
    <motion.span
      key={`photo-particle-${i}`}
      className="absolute block rounded-full bg-black/20 blur-[0.5px]"
      style={{
        width: i % 3 === 0 ? 6 : 4,
        height: i % 3 === 0 ? 6 : 4,

        // spread more on edges, less center
        left: `${(i * 13 + 17) % 100}%`,
        top: `${(i * 19 + 11) % 100}%`,
      }}
      animate={{
        y: [0, -12, 0],
        x: [0, 8, -6, 0],
        opacity: [0.2, 0.45, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + (i % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      }}
    />
  ))}
</div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/15 to-transparent" />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-5 left-5 max-w-[250px] rounded-[24px] bg-white/45 p-4 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:p-5"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-black/35 sm:text-[11px]">
              Available for freelance
            </p>
            <p className="mt-3 text-sm leading-6 text-black/55 sm:text-base">
              Building clean websites with strong visual identity and better user experience.
            </p>
          </motion.div>

          <motion.div
            className="absolute right-[10%] top-[26%] hidden h-14 w-14 items-center justify-center rounded-full bg-white/50 text-black backdrop-blur-xl md:flex"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.div>
        </div>
      </div>
    </section>
  );
}