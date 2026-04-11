import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function GlobalBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const orbX1 = useTransform(smoothX, [0, 1600], [-80, 80]);
  const orbY1 = useTransform(smoothY, [0, 1000], [-60, 60]);

  const orbX2 = useTransform(smoothX, [0, 1600], [60, -60]);
  const orbY2 = useTransform(smoothY, [0, 1000], [40, -40]);

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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f6f6f4]">
      
      {/* background grid */}
      <div className="absolute inset-0 opacity-[0.6]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ✨ SMOOTH GLOWING CURSOR */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          background: useTransform([smoothX, smoothY], ([x, y]) => {
            const posX = Number(x);
            const posY = Number(y);

            return `
              radial-gradient(340px circle at ${posX}px ${posY}px, rgba(255,255,255,0.35), transparent 40%),
              radial-gradient(100px circle at ${posX}px ${posY}px, rgba(255,255,255,0.25), transparent 65%)
            `;
          }),
        }}
      />

      {/* floating blur orbs */}
      <motion.div
        className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-black/6 blur-3xl md:h-56 md:w-56"
        style={{ x: orbX1, y: orbY1 }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[10%] h-44 w-44 rounded-full bg-black/8 blur-3xl md:h-64 md:w-64"
        style={{ x: orbX2, y: orbY2 }}
      />
      <motion.div
        className="absolute right-[24%] top-[22%] h-28 w-28 rounded-full bg-black/5 blur-2xl md:h-40 md:w-40"
        animate={{
          y: [0, -20, 0],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute block rounded-full bg-black/60 blur-[1px]"
            style={{
              width: i % 3 === 0 ? 8 : 5,
              height: i % 3 === 0 ? 8 : 5,
              left: `${(i * 7 + 9) % 100}%`,
              top: `${(i * 11 + 13) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              opacity: [0.9, 1, 0.8],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* left-side background system */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[12%] top-[18%] h-[360px] w-[360px] rounded-full bg-black/5 blur-[10px]"
          animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-[40%] bg-black/10"
            style={{
              width: i % 2 === 0 ? 140 : 90,
              height: i % 2 === 0 ? 80 : 60,
              left: `${8 + i * 14}%`,
              top: `${12 + (i % 3) * 20}%`,
              transform: `rotate(${i * 22}deg)`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -50, 30, 0],
              opacity: [0.5, 0.1, 0.5],
              rotate: [i * 22, i * 22 + 10, i * 22],
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {[...Array(20)].map((_, i) => (
          <motion.span
            key={`particle-${i}`}
            className="absolute block rounded-full bg-black/20"
            style={{
              width: 4,
              height: 4,
              left: `${(i * 11 + 13) % 100}%`,
              top: `${(i * 17 + 7) % 100}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 15, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* right-side flow particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={`right-flow-${i}`}
            className="absolute block rounded-full bg-black/20"
            style={{
              width: 8,
              height: 8,
              left: `${(i * 11 + 13) % 100}%`,
              top: `${(i * 17 + 7) % 100}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -50, 30, 0],
              opacity: [0.15, 0.1, 0.15],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}