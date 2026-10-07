import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap } from "@/lib/gsap";
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
  const sectionRef = useRef<HTMLElement>(null);
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

  useLayoutEffect(() => {
    const root = sectionRef.current;

    if (!root) {
      return;
    }

    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const intro = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          intro
            .fromTo(
              "[data-hero-intro-copy]",
              {
                autoAlpha: 0,
                y: 30,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.82,
              },
            )
            .fromTo(
              "[data-hero-intro-visual]",
              {
                autoAlpha: 0.76,
                clipPath: "inset(9% 5% 9% 5% round 30px)",
                scale: 1.045,
                y: 26,
              },
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                scale: 1,
                y: 0,
                duration: 1.05,
              },
              "-=0.42",
            );

          const scrollStory = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          scrollStory
            .to(
              "[data-hero-scroll-copy]",
              {
                yPercent: -9,
                scale: 0.985,
                autoAlpha: 0.22,
                ease: "none",
              },
              0,
            )
            .to(
              "[data-hero-scroll-visual]",
              {
                yPercent: -5,
                scale: 1.035,
                ease: "none",
              },
              0,
            )
            .to(
              "[data-hero-photo-shade]",
              {
                opacity: 0.52,
                ease: "none",
              },
              0.08,
            );

          return () => {
            intro.kill();
            scrollStory.scrollTrigger?.kill();
            scrollStory.kill();
          };
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const heroParticles = useMemo(
    () => createHeroParticles(settings.heroParticleCount),
    [settings.heroParticleCount],
  );
  const particleTravel = settings.profile === "mobile" ? 8 : 12;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] scroll-mt-24 overflow-hidden text-black"
    >
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <div
          data-hero-scroll-copy
          className="flex items-center px-5 pb-12 pt-28 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        >
          <div data-hero-intro-copy className="max-w-[720px]">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
              className="mb-7 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60 backdrop-blur-md sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Available for select projects
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/35 sm:text-[11px]">
                Design · Development · Motion
              </span>
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.05 }}
              className="mb-5 text-[10px] font-medium uppercase tracking-[0.42em] text-black/40 sm:text-xs"
            >
              JackNex Studio
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
              className="max-w-[10ch] text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.06em] sm:text-[4.4rem] md:text-[5.6rem] lg:text-[6.35rem] xl:text-[7.1rem]"
            >
              Websites built to feel{" "}
              <span className="font-serif font-normal italic tracking-[-0.025em]">
                unforgettable.
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.08 }}
              className="mt-7 max-w-[620px] text-sm leading-7 tracking-[-0.01em] text-black/55 sm:text-base md:text-lg md:leading-8"
            >
              I design and build cinematic, interactive, mobile-first websites
              for brands, businesses, and meaningful celebrations — combining
              premium visual direction with smooth, purposeful motion.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.03]"
              >
                Explore Selected Work
                <ArrowDown
                  className="h-4 w-4 transition group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={siteConfig.contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-medium backdrop-blur-sm transition hover:scale-[1.03]"
              >
                Start a Project
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-black/35"
            >
              <span>Mobile-first</span>
              <span>Performance-aware</span>
              <span>Built for real brands</span>
            </motion.div>
          </div>
        </div>

        <div
          data-hero-scroll-visual
          className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh] lg:h-screen"
        >
          <div
            data-hero-intro-visual
            className="absolute inset-0 overflow-hidden"
          >
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
                duration: shouldAnimate
                  ? settings.profile === "mobile"
                    ? 8
                    : 10
                  : 0,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            <div
              data-hero-photo-shade
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 lg:bg-gradient-to-r lg:from-[#f6f6f4]/20 lg:via-transparent lg:to-transparent"
            />

            <div className="pointer-events-none absolute inset-0 z-[2]">
              {heroParticles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="absolute block rounded-full bg-white/35 mix-blend-overlay"
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
                          opacity: [0.18, 0.48, 0.18],
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

            <div className="absolute bottom-5 left-5 z-10 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-md sm:bottom-7 sm:left-7">
              Jack · Designer & Developer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
