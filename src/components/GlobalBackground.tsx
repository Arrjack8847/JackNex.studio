import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function GlobalBackground() {
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(800);
  const mouseY = useMotionValue(400);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.7 });

  const orbX1 = useTransform(smoothX, [0, 1600], [-50, 50]);
  const orbY1 = useTransform(smoothY, [0, 1000], [-35, 35]);

  const orbX2 = useTransform(smoothX, [0, 1600], [35, -35]);
  const orbY2 = useTransform(smoothY, [0, 1000], [25, -25]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [isMobile, mouseX, mouseY]);

  const mainParticles = useMemo(
    () => Array.from({ length: isMobile ? 16 : 32 }, (_, i) => i),
    [isMobile]
  );

  const leftParticles = useMemo(
    () => Array.from({ length: isMobile ? 8 : 16 }, (_, i) => i),
    [isMobile]
  );

  const rightParticles = useMemo(
    () => Array.from({ length: isMobile ? 6 : 12 }, (_, i) => i),
    [isMobile]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f6f6f4]">
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.45]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "34px 34px" : "48px 48px",
          }}
        />
      </div>

      {/* cursor glow desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            background: useTransform([smoothX, smoothY], ([x, y]) => {
              const posX = Number(x);
              const posY = Number(y);

              return `
                radial-gradient(260px circle at ${posX}px ${posY}px, rgba(255,255,255,0.28), transparent 42%),
                radial-gradient(90px circle at ${posX}px ${posY}px, rgba(255,255,255,0.20), transparent 68%)
              `;
            }),
          }}
        />
      )}

      {/* soft ambient glow for mobile */}
      {isMobile && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(220px circle at 50% 20%, rgba(255,255,255,0.18), transparent 60%)",
          }}
        />
      )}

      {/* floating blur orbs */}
      <motion.div
        className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-black/6 blur-3xl md:h-56 md:w-56"
        style={{ x: orbX1, y: orbY1 }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[10%] h-32 w-32 rounded-full bg-black/8 blur-3xl md:h-64 md:w-64"
        style={{ x: orbX2, y: orbY2 }}
      />
      <motion.div
        className="absolute right-[24%] top-[22%] h-20 w-20 rounded-full bg-black/5 blur-2xl md:h-40 md:w-40"
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: isMobile ? 10 : 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* main particles */}
      <div className="absolute inset-0">
        {mainParticles.map((i) => (
          <motion.span
            key={i}
            className="absolute block rounded-full bg-black/50 blur-[1px]"
            style={{
              width: isMobile ? (i % 3 === 0 ? 5 : 3) : i % 3 === 0 ? 7 : 4,
              height: isMobile ? (i % 3 === 0 ? 5 : 3) : i % 3 === 0 ? 7 : 4,
              left: `${(i * 7 + 9) % 100}%`,
              top: `${(i * 11 + 13) % 100}%`,
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, isMobile ? -10 : -16, 0],
              x: [0, isMobile ? 5 : 8, isMobile ? -5 : -8, 0],
              opacity: [0.65, 1, 0.7],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: isMobile ? 6 + (i % 4) : 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.12,
            }}
          />
        ))}
      </div>

      {/* left system */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[12%] top-[18%] h-[220px] w-[220px] rounded-full bg-black/5 blur-[10px] md:h-[360px] md:w-[360px]"
          animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {[...Array(isMobile ? 2 : 3)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-[40%] bg-black/10"
            style={{
              width: i % 2 === 0 ? (isMobile ? 90 : 140) : isMobile ? 60 : 90,
              height: i % 2 === 0 ? (isMobile ? 52 : 80) : isMobile ? 42 : 60,
              left: `${8 + i * 14}%`,
              top: `${12 + (i % 3) * 20}%`,
              transform: `rotate(${i * 22}deg)`,
            }}
            animate={{
              x: [0, isMobile ? 18 : 40, isMobile ? -10 : -20, 0],
              y: [0, isMobile ? -16 : -35, isMobile ? 10 : 20, 0],
              opacity: [0.35, 0.15, 0.35],
              rotate: [i * 22, i * 22 + 8, i * 22],
            }}
            transition={{
              duration: 12 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {leftParticles.map((i) => (
          <motion.span
            key={`particle-${i}`}
            className="absolute block rounded-full bg-black/20"
            style={{
              width: isMobile ? 3 : 4,
              height: isMobile ? 3 : 4,
              left: `${(i * 11 + 13) % 100}%`,
              top: `${(i * 17 + 7) % 100}%`,
              willChange: "transform, opacity",
            }}
            animate={{
              x: [0, isMobile ? 12 : 24, isMobile ? -8 : -16, 0],
              y: [0, isMobile ? -10 : -18, isMobile ? 8 : 14, 0],
              opacity: [0.12, 0.35, 0.12],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* right-side flow */}
      <div className="absolute inset-0">
        {rightParticles.map((i) => (
          <motion.span
            key={`right-flow-${i}`}
            className="absolute block rounded-full bg-black/20"
            style={{
              width: isMobile ? 5 : 7,
              height: isMobile ? 5 : 7,
              left: `${(i * 11 + 13) % 100}%`,
              top: `${(i * 17 + 7) % 100}%`,
              willChange: "transform, opacity",
            }}
            animate={{
              x: [0, isMobile ? 16 : 30, isMobile ? -10 : -18, 0],
              y: [0, isMobile ? -14 : -30, isMobile ? 8 : 16, 0],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}