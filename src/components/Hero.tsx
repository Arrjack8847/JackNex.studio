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

type HeroParticle = {
  id: string;
  left: number;
  top: number;
  size: number;
  delay: number;
};

function createHeroParticles(count: number): HeroParticle[] {
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

  const shouldUseParallax =
    settings.enableParallax &&
    isPageVisible &&
    !prefersReducedMotion;

  const mouseX = useMotionValue(800);
  const mouseY = useMotionValue(500);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const imageX = useTransform(smoothX, [0, 1600], [-12, 12]);
  const imageY = useTransform(smoothY, [0, 1000], [-10, 10]);

  useEffect(() => {
    if (!shouldUseParallax) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, shouldUseParallax]);

  const heroParticles = useMemo(
    () => createHeroParticles(settings.heroParticleCount),
    [settings.heroParticleCount],
  );

  const isMobileProfile = settings.profile === "mobile";
  const particleTravel = isMobileProfile ? 8 : 12;

  return (
    <section
      id="top"
      className="font-inter relative min-h-[100svh] scroll-mt-24 overflow-hidden bg-[#f4f3ef] text-black"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-white/70 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[35%] h-[320px] w-[320px] rounded-full bg-black/[0.025] blur-[100px]"
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        {/* Text section */}
        <div className="flex items-center px-5 pb-14 pt-28 sm:px-8 sm:pb-16 md:px-12 lg:px-16 lg:py-24 xl:px-20">
          <div className="w-full max-w-[720px]">
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6 flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 bg-black/30 sm:w-10"
              />

              <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-black/45 sm:text-xs">
                JackNex Studio
              </p>
            </motion.div>

            <motion.h1
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 32,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-space-grotesk max-w-[10ch] text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.065em] sm:text-[4.3rem] md:text-[5.4rem] lg:text-[5.8rem] xl:text-[7rem]"
            >
              I build websites that make brands look{" "}
              <span className="font-instrument-serif inline-block font-normal italic tracking-[-0.035em]">
                premium.
              </span>
            </motion.h1>

            <motion.p
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-[610px] text-sm leading-7 tracking-[-0.01em] text-black/55 sm:text-base md:text-lg md:leading-8"
            >
              Clean, modern, conversion-focused websites for personal brands,
              businesses, and creative projects that want to stand out online.
            </motion.p>

            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                delay: prefersReducedMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#work"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition duration-300 hover:scale-[1.03] hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                View Work

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href={siteConfig.contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 bg-white/50 px-6 py-3 text-sm font-medium backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-black/30 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {siteConfig.contact.whatsapp.label}
              </a>
            </motion.div>

            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 0.45,
              }}
              className="mt-12 flex items-center gap-5 text-[10px] font-medium uppercase tracking-[0.25em] text-black/35 sm:text-[11px]"
            >
              <span>Web Design</span>

              <span className="h-1 w-1 rounded-full bg-black/30" />

              <span>Development</span>

              <span className="hidden h-1 w-1 rounded-full bg-black/30 sm:block" />

              <span className="hidden sm:inline">Creative Direction</span>
            </motion.div>
          </div>
        </div>

        {/* Image section */}
        <div className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh] lg:h-screen">
          <motion.div
            className="absolute -inset-4"
            style={
              shouldUseParallax
                ? {
                    x: imageX,
                    y: imageY,
                  }
                : undefined
            }
          >
            <motion.img
              src="/hero-man.webp"
              alt="JackNex Studio designer and developer portrait"
              width={1280}
              height={739}
              loading="eager"
              decoding="async"
              draggable={false}
              className="h-full w-full select-none object-cover grayscale"
              animate={
                shouldAnimate
                  ? {
                      scale: [
                        1.02,
                        isMobileProfile ? 1.03 : 1.045,
                        1.02,
                      ],
                    }
                  : {
                      scale: 1.02,
                    }
              }
              transition={{
                duration: shouldAnimate
                  ? isMobileProfile
                    ? 8
                    : 10
                  : 0,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#f4f3ef]/25 via-transparent to-transparent lg:from-[#f4f3ef]/15"
          />

          {/* Particles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2]"
          >
            {heroParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute block rounded-full bg-black/20"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  willChange: shouldAnimate
                    ? "transform, opacity"
                    : "auto",
                }}
                animate={
                  shouldAnimate
                    ? {
                        y: [0, -particleTravel, 0],
                        x: [0, 6, -4, 0],
                        opacity: [0.18, 0.42, 0.18],
                      }
                    : {
                        x: 0,
                        y: 0,
                        opacity: 0.2,
                      }
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

          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              delay: prefersReducedMotion ? 0 : 0.5,
            }}
            className="absolute bottom-5 left-5 z-[3] rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md sm:bottom-8 sm:left-8"
          >
            Designer × Developer
          </motion.div>
        </div>
      </div>
    </section>
  );
}