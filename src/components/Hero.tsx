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
          gsap.set(
            [
              "[data-mobile-stage-craft]",
              "[data-mobile-stage-identity]",
              "[data-mobile-work-teaser]",
            ],
            { autoAlpha: 0 },
          );

          const intro = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          intro
            .fromTo(
              "[data-mobile-status]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.42 },
            )
            .fromTo(
              "[data-mobile-kicker]",
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.42 },
              "-=0.2",
            )
            .fromTo(
              "[data-mobile-headline-line]",
              { autoAlpha: 0, yPercent: 70 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.68,
                stagger: 0.08,
              },
              "-=0.18",
            )
            .fromTo(
              "[data-mobile-visual-row]",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.65 },
              "-=0.38",
            )
            .fromTo(
              "[data-mobile-actions]",
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              "-=0.32",
            );

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          });

          story
            .to(
              "[data-mobile-status]",
              {
                autoAlpha: 0,
                y: -18,
                duration: 0.18,
                ease: "none",
              },
              0,
            )
            .to(
              "[data-mobile-kicker]",
              {
                autoAlpha: 0,
                y: -18,
                duration: 0.2,
                ease: "none",
              },
              0.02,
            )
            .to(
              "[data-mobile-headline]",
              {
                autoAlpha: 0.08,
                y: -92,
                scale: 0.94,
                duration: 0.34,
                ease: "none",
              },
              0.06,
            )
            .to(
              "[data-mobile-support]",
              {
                autoAlpha: 0,
                y: 24,
                duration: 0.2,
                ease: "none",
              },
              0.08,
            )
            .to(
              "[data-mobile-actions]",
              {
                autoAlpha: 0,
                y: 24,
                duration: 0.2,
                ease: "none",
              },
              0.1,
            )
            .to(
              "[data-mobile-portrait]",
              {
                xPercent: 63,
                y: -58,
                scale: 1.18,
                rotate: 0,
                duration: 0.45,
                ease: "power2.inOut",
              },
              0.12,
            )
            .fromTo(
              "[data-mobile-stage-craft]",
              { autoAlpha: 0, y: 38, scale: 0.96 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.24,
                ease: "power2.out",
              },
              0.34,
            )
            .to(
              "[data-mobile-stage-craft]",
              {
                autoAlpha: 0,
                y: -32,
                duration: 0.2,
                ease: "none",
              },
              0.64,
            )
            .to(
              "[data-mobile-portrait]",
              {
                y: -84,
                scale: 1.06,
                duration: 0.26,
                ease: "power2.inOut",
              },
              0.64,
            )
            .fromTo(
              "[data-mobile-stage-identity]",
              { autoAlpha: 0, y: 34 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.24,
                ease: "power2.out",
              },
              0.68,
            )
            .to(
              "[data-mobile-stage-identity]",
              {
                autoAlpha: 0,
                y: -26,
                duration: 0.2,
                ease: "none",
              },
              0.96,
            )
            .to(
              "[data-mobile-portrait]",
              {
                y: -132,
                scale: 0.82,
                duration: 0.28,
                ease: "power2.inOut",
              },
              0.96,
            )
            .fromTo(
              "[data-mobile-work-teaser]",
              { autoAlpha: 0, y: 42 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                ease: "power3.out",
              },
              1.02,
            );

          return () => {
            intro.kill();
            story.scrollTrigger?.kill();
            story.kill();
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
      className="relative min-h-[230svh] scroll-mt-24 overflow-clip text-black md:min-h-[100svh]"
    >
      {/* Mobile sticky story */}
      <div className="sticky top-0 h-[100svh] overflow-hidden md:hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute -left-16 top-[18%] h-48 w-48 rounded-full bg-black/[0.025] blur-2xl" />
          <div className="absolute -right-20 top-[42%] h-64 w-64 rounded-full bg-black/[0.03] blur-3xl" />

          {heroParticles.map((particle) => (
            <motion.span
              key={`mobile-${particle.id}`}
              className="absolute block rounded-full bg-black/15"
              style={{
                width: Math.max(3, particle.size - 1),
                height: Math.max(3, particle.size - 1),
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={
                shouldAnimate
                  ? {
                      y: [0, -particleTravel, 0],
                      x: [0, 5, -3, 0],
                      opacity: [0.08, 0.22, 0.08],
                    }
                  : { x: 0, y: 0, opacity: 0.1 }
              }
              transition={{
                duration: shouldAnimate ? 7 : 0,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-24">
          <div data-mobile-status className="w-fit">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-black/55 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for select projects
            </span>
          </div>

          <p
            data-mobile-kicker
            className="mt-5 text-[9px] font-semibold uppercase tracking-[0.34em] text-black/35"
          >
            JackNex Studio
          </p>

          <h1
            data-mobile-headline
            className="mt-3 max-w-[9ch] text-[3.05rem] font-semibold leading-[0.88] tracking-[-0.065em] min-[390px]:text-[3.35rem]"
          >
            <span className="block overflow-hidden">
              <span data-mobile-headline-line className="block">
                Websites built
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-mobile-headline-line className="block">
                to feel
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-mobile-headline-line
                className="block font-serif font-normal italic tracking-[-0.03em]"
              >
                unforgettable.
              </span>
            </span>
          </h1>

          <div
            data-mobile-visual-row
            className="mt-5 flex min-h-0 items-end gap-4"
          >
            <div
              data-mobile-portrait
              className="relative z-20 w-[42%] shrink-0 rotate-[-2deg] overflow-hidden rounded-[24px] border border-black/10 bg-black shadow-[0_18px_45px_rgba(0,0,0,0.16)]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/hero-man.webp"
                  alt="Jack, designer and developer behind JackNex Studio"
                  width={1280}
                  height={739}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="absolute inset-x-2 bottom-2 rounded-xl border border-white/15 bg-black/45 px-2.5 py-2 backdrop-blur-md">
                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/60">
                  Jack
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-white">
                  Designer & Developer
                </p>
              </div>
            </div>

            <div
              data-mobile-support
              className="min-w-0 flex-1 pb-1"
            >
              <p className="text-[13px] leading-6 text-black/55">
                Cinematic, interactive, mobile-first websites for brands and
                meaningful celebrations.
              </p>
              <p className="mt-3 text-[9px] font-semibold uppercase leading-5 tracking-[0.14em] text-black/35">
                Mobile-first · Performance-aware · Worldwide
              </p>
            </div>
          </div>

          <div
            data-mobile-actions
            className="mt-auto grid grid-cols-2 gap-2.5 pt-5"
          >
            <a
              href="#work"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-black px-4 text-[12px] font-semibold text-white"
            >
              View Work
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/15 bg-white/75 px-4 text-[12px] font-semibold text-black backdrop-blur-md"
            >
              Start Project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div
            data-mobile-stage-craft
            className="pointer-events-none absolute inset-x-5 top-[22%] z-10 text-center"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/35">
              One connected workflow
            </p>
            <div className="mt-4 space-y-1 text-[2.55rem] font-semibold leading-[0.88] tracking-[-0.055em]">
              <div>DESIGN</div>
              <div className="font-serif font-normal italic">development</div>
              <div>MOTION</div>
            </div>
            <p className="mx-auto mt-5 max-w-[18rem] text-[12px] leading-5 text-black/45">
              Visual direction, code and interaction shaped as one experience.
            </p>
          </div>

          <div
            data-mobile-stage-identity
            className="pointer-events-none absolute inset-x-5 top-[20%] z-10 text-center"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/35">
              Behind the studio
            </p>
            <h2 className="mt-3 text-[4.2rem] font-semibold leading-none tracking-[-0.07em]">
              Jack
            </h2>
            <p className="mt-3 font-serif text-[1.45rem] italic text-black/65">
              Designer & Developer
            </p>
            <div className="mx-auto mt-5 h-px w-12 bg-black/20" />
            <p className="mt-5 text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-black/40">
              JackNex Studio
              <br />
              Working with clients worldwide
            </p>
          </div>

          <a
            data-mobile-work-teaser
            href="#work"
            className="absolute bottom-5 left-5 right-5 z-30 rounded-[24px] border border-black/10 bg-white/85 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  Next
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
                  Selected Work
                </h2>
                <p className="mt-1 text-[11px] text-black/50">
                  Real projects. Different moods. One point of view.
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Tablet / desktop hero preserved */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] max-w-[1600px] grid-cols-1 md:grid lg:grid-cols-2">
        <div className="flex items-center px-8 pb-12 pt-28 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[720px]">
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
              className="max-w-[10ch] text-[4.4rem] font-semibold leading-[0.88] tracking-[-0.06em] md:text-[5.6rem] lg:text-[6.35rem] xl:text-[7.1rem]"
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
              className="mt-7 max-w-[620px] text-base leading-7 tracking-[-0.01em] text-black/55 md:text-lg md:leading-8"
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
              <span>Working with clients worldwide</span>
            </motion.div>
          </div>
        </div>

        <div className="relative h-[80vh] w-full overflow-hidden lg:h-screen">
          <div className="absolute inset-0 overflow-hidden">
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
                      y: [0, -6, 0],
                      scale: [1, 1.02, 1],
                    }
                  : { y: 0, scale: 1 }
              }
              transition={{
                duration: shouldAnimate ? 10 : 0,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f6f6f4]/20 via-transparent to-transparent" />

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

            <div className="absolute bottom-7 left-7 z-10 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
              Jack · Designer & Developer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
