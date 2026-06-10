import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo } from "react";
import { useAnimationSettings } from "@/hooks/use-animation-settings";
import { usePageVisible } from "@/hooks/use-page-visible";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Particle = {
  id: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

function createParticles(count: number, prefix: string, offset: number) {
  return Array.from({ length: count }, (_, index): Particle => {
    const seed = index + offset;

    return {
      id: `${prefix}-${index}`,
      left: (seed * 17 + 9) % 100,
      top: (seed * 23 + 13) % 100,
      size: seed % 3 === 0 ? 6 : 4,
      duration: 7 + (seed % 5),
      delay: index * 0.14,
    };
  });
}

export default function GlobalBackground() {
  const settings = useAnimationSettings();
  const isPageVisible = usePageVisible();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = isPageVisible && !prefersReducedMotion;
  const shouldUseParallax = settings.enableParallax && !prefersReducedMotion;

  const mouseX = useMotionValue(800);
  const mouseY = useMotionValue(400);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.7 });

  const orbX1 = useTransform(smoothX, [0, 1600], [-50, 50]);
  const orbY1 = useTransform(smoothY, [0, 1000], [-35, 35]);
  const orbX2 = useTransform(smoothX, [0, 1600], [35, -35]);
  const orbY2 = useTransform(smoothY, [0, 1000], [25, -25]);
  const cursorBackground = useTransform([smoothX, smoothY], ([x, y]) => {
    const posX = Number(x);
    const posY = Number(y);

    return `
      radial-gradient(260px circle at ${posX}px ${posY}px, rgba(255,255,255,0.28), transparent 42%),
      radial-gradient(90px circle at ${posX}px ${posY}px, rgba(255,255,255,0.20), transparent 68%)
    `;
  });

  useEffect(() => {
    if (!shouldUseParallax || !isPageVisible) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [isPageVisible, mouseX, mouseY, shouldUseParallax]);

  const mainParticles = useMemo(
    () => createParticles(settings.particleCount, "main", 1),
    [settings.particleCount],
  );
  const leftParticles = useMemo(
    () => createParticles(settings.sideParticleCount, "left", 17),
    [settings.sideParticleCount],
  );
  const rightParticles = useMemo(
    () => createParticles(settings.sideParticleCount, "right", 31),
    [settings.sideParticleCount],
  );
  const floatingShapes = useMemo(
    () => Array.from({ length: settings.shapeCount }, (_, index) => index),
    [settings.shapeCount],
  );

  const isMobileProfile = settings.profile === "mobile";
  const particleTravel = isMobileProfile ? 8 : settings.profile === "tablet" ? 12 : 16;
  const sideTravel = isMobileProfile ? 10 : settings.profile === "tablet" ? 16 : 24;
  const loopTransition = (duration: number, delay = 0) =>
    shouldAnimate
      ? { duration, repeat: Infinity, ease: "easeInOut" as const, delay }
      : { duration: 0 };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f6f6f4]"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.45]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: `${settings.gridSize}px ${settings.gridSize}px`,
          }}
        />
      </div>

      {settings.enableCursorGlow && shouldAnimate && (
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ background: cursorBackground }}
        />
      )}

      {!settings.enableCursorGlow && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(220px circle at 50% 20%, rgba(255,255,255,0.18), transparent 60%)",
          }}
        />
      )}

      <motion.div
        className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-black/6 blur-3xl md:h-56 md:w-56"
        style={shouldUseParallax ? { x: orbX1, y: orbY1 } : undefined}
        animate={
          shouldUseParallax
            ? undefined
            : shouldAnimate
              ? { y: [0, -10, 0], x: [0, 6, 0] }
              : { x: 0, y: 0 }
        }
        transition={loopTransition(10)}
      />

      <motion.div
        className="absolute bottom-[8%] right-[10%] h-32 w-32 rounded-full bg-black/8 blur-3xl md:h-64 md:w-64"
        style={shouldUseParallax ? { x: orbX2, y: orbY2 } : undefined}
        animate={
          shouldUseParallax
            ? undefined
            : shouldAnimate
              ? { y: [0, 10, 0], x: [0, -6, 0] }
              : { x: 0, y: 0 }
        }
        transition={loopTransition(12)}
      />

      {settings.glowCount > 2 && (
        <motion.div
          className="absolute right-[24%] top-[22%] h-20 w-20 rounded-full bg-black/5 blur-2xl md:h-40 md:w-40"
          animate={
            shouldAnimate
              ? { y: [0, -12, 0], x: [0, 8, 0] }
              : { x: 0, y: 0 }
          }
          transition={loopTransition(9)}
        />
      )}

      <div className="absolute inset-0">
        {mainParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute block rounded-full bg-black/50 blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              willChange: shouldAnimate ? "transform, opacity" : "auto",
            }}
            animate={
              shouldAnimate
                ? {
                    y: [0, -particleTravel, 0],
                    x: [0, particleTravel / 2, -particleTravel / 2, 0],
                    opacity: [0.65, 1, 0.7],
                    scale: [1, 1.15, 1],
                  }
                : { x: 0, y: 0, opacity: 0.55, scale: 1 }
            }
            transition={loopTransition(particle.duration, particle.delay)}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[12%] top-[18%] h-[220px] w-[220px] rounded-full bg-black/5 blur-[10px] md:h-[360px] md:w-[360px]"
          animate={
            shouldAnimate
              ? { x: [0, 16, 0], y: [0, -12, 0] }
              : { x: 0, y: 0 }
          }
          transition={loopTransition(14)}
        />

        {floatingShapes.map((shapeIndex) => (
          <motion.div
            key={`shape-${shapeIndex}`}
            className="absolute rounded-[40%] bg-black/10"
            style={{
              width: shapeIndex % 2 === 0 ? 120 : 80,
              height: shapeIndex % 2 === 0 ? 68 : 52,
              left: `${8 + shapeIndex * 14}%`,
              top: `${12 + (shapeIndex % 3) * 20}%`,
              transform: `rotate(${shapeIndex * 22}deg)`,
            }}
            animate={
              shouldAnimate
                ? {
                    x: [0, sideTravel, -sideTravel / 2, 0],
                    y: [0, -sideTravel, sideTravel / 2, 0],
                    opacity: [0.35, 0.15, 0.35],
                    rotate: [
                      shapeIndex * 22,
                      shapeIndex * 22 + 8,
                      shapeIndex * 22,
                    ],
                  }
                : {
                    x: 0,
                    y: 0,
                    opacity: 0.24,
                    rotate: shapeIndex * 22,
                  }
            }
            transition={loopTransition(12 + shapeIndex * 1.5, shapeIndex * 0.3)}
          />
        ))}

        {leftParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute block rounded-full bg-black/20"
            style={{
              width: settings.profile === "mobile" ? 3 : 4,
              height: settings.profile === "mobile" ? 3 : 4,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              willChange: shouldAnimate ? "transform, opacity" : "auto",
            }}
            animate={
              shouldAnimate
                ? {
                    x: [0, sideTravel, -sideTravel / 2, 0],
                    y: [0, -sideTravel / 1.4, sideTravel / 2, 0],
                    opacity: [0.12, 0.35, 0.12],
                  }
                : { x: 0, y: 0, opacity: 0.16 }
            }
            transition={loopTransition(particle.duration + 3)}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {rightParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute block rounded-full bg-black/20"
            style={{
              width: settings.profile === "mobile" ? 5 : 7,
              height: settings.profile === "mobile" ? 5 : 7,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              willChange: shouldAnimate ? "transform, opacity" : "auto",
            }}
            animate={
              shouldAnimate
                ? {
                    x: [0, sideTravel * 1.2, -sideTravel / 1.4, 0],
                    y: [0, -sideTravel, sideTravel / 2, 0],
                    opacity: [0.12, 0.22, 0.12],
                  }
                : { x: 0, y: 0, opacity: 0.14 }
            }
            transition={loopTransition(particle.duration + 3)}
          />
        ))}
      </div>
    </div>
  );
}
