import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { useAnimationSettings } from "@/hooks/use-animation-settings";
import { usePageVisible } from "@/hooks/use-page-visible";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function createHeroParticles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `hero-particle-${index}`,
    left: (index * 13 + 17) % 100,
    top: (index * 19 + 11) % 100,
    size: index % 3 === 0 ? 6 : 4,
    delay: index * 0.12,
  }));
}

export default function Hero() {
  const settings = useAnimationSettings();
  const isPageVisible = usePageVisible();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = isPageVisible && !prefersReducedMotion;
  const shouldUseParallax = settings.enableParallax && !prefersReducedMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const imgX = useTransform(smoothX, [0, 1600], [-12, 12]);
  const imgY = useTransform(smoothY, [0, 1000], [-10, 10]);

  useEffect(() => {
    if (!shouldUseParallax || !isPageVisible) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [isPageVisible, mouseX, mouseY, shouldUseParallax]);

  const heroParticles = useMemo(
    () => createHeroParticles(settings.heroParticleCount),
    [settings.heroParticleCount],
  );
  const particleTravel = settings.profile === "mobile" ? 8 : 12;

  return (
    <section
      id="top"
      className="relative min-h-[100svh] scroll-mt-24 overflow-hidden text-black"
    >
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center px-5 pb-12 pt-28 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[680px]">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="mb-5 text-[10px] font-medium uppercase tracking-[0.42em] text-black/40 sm:text-xs"
            >
              JackNex Studio
            </motion.p>

            <motion.h1
  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
  className="max-w-[9ch] text-[3rem] font-semibold leading-[0.88] tracking-[-0.055em] sm:text-[4.2rem] md:text-[5.4rem] lg:text-[6.3rem] xl:text-[7rem]"
>
  I build websites that make brands look{" "}
  <span className="font-serif font-normal italic tracking-[-0.025em]">
    premium.
  </span>
</motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
              className="mt-7 max-w-[620px] text-sm leading-7 tracking-[-0.01em] text-black/55 sm:text-base md:text-lg md:leading-8"
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
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={siteConfig.contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm backdrop-blur-sm transition hover:scale-[1.03]"
              >
                {siteConfig.contact.whatsapp.label}
              </a>
            </div>
          </div>
        </div>

        <div className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh] lg:h-screen">
          <motion.img
            src="/hero-man.webp"
            alt="JackNex Studio designer and developer portrait"
            width={1280}
            height={739}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale gpu smooth-transform"
            style={shouldUseParallax ? { x: imgX, y: imgY } : undefined}
            animate={
              shouldAnimate
                ? {
                    y: [0, settings.profile === "mobile" ? -5 : -6, 0],
                    scale: [1, settings.profile === "mobile" ? 1.01 : 1.02, 1],
                  }
                : { y: 0, scale: 1 }
            }
            transition={{
              duration: shouldAnimate ? (settings.profile === "mobile" ? 8 : 10) : 0,
              repeat: shouldAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          <div className="pointer-events-none absolute inset-0 z-[2]">
            {heroParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute block rounded-full bg-black/20"
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
                        x: [0, 6, -4, 0],
                        opacity: [0.2, 0.4, 0.2],
                      }
                    : { x: 0, y: 0, opacity: 0.2 }
                }
                transition={{
                  duration: shouldAnimate ? 6 : 0,
                  repeat: shouldAnimate ? Infinity : 0,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
