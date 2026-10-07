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
          gsap.set("[data-mobile-craft]", {
            autoAlpha: 0,
            y: 28,
          });

          gsap.set("[data-mobile-identity]", {
            autoAlpha: 0,
            y: 28,
          });

          const intro = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          intro
            .fromTo(
              "[data-mobile-status]",
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.35 },
            )
            .fromTo(
              "[data-mobile-kicker]",
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.35 },
              "-=0.18",
            )
            .fromTo(
              "[data-mobile-headline-line]",
              { autoAlpha: 0, yPercent: 55 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.58,
                stagger: 0.07,
              },
              "-=0.12",
            )
            .fromTo(
              "[data-mobile-portrait]",
              {
                autoAlpha: 0,
                scale: 0.92,
                rotate: 4,
              },
              {
                autoAlpha: 1,
                scale: 1,
                rotate: 1.25,
                duration: 0.6,
              },
              "-=0.3",
            )
            .fromTo(
              "[data-mobile-portrait-label]",
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.35 },
              "-=0.28",
            )
            .fromTo(
              "[data-mobile-support]",
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.42 },
              "-=0.3",
            )
            .fromTo(
              "[data-mobile-actions]",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.4 },
              "-=0.2",
            );

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          });

          story
            .to(
              ["[data-mobile-status]", "[data-mobile-kicker]"],
              {
                autoAlpha: 0,
                y: -18,
                duration: 0.7,
                ease: "none",
              },
              0.8,
            )
            .to(
              "[data-mobile-support]",
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.65,
                ease: "none",
              },
              0.9,
            )
            .to(
              "[data-mobile-portrait-label]",
              {
                autoAlpha: 0,
                y: -8,
                duration: 0.45,
                ease: "none",
              },
              0.92,
            )
            .to(
              "[data-mobile-actions]",
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.65,
                ease: "none",
                pointerEvents: "none",
              },
              0.95,
            )
            .to(
              "[data-mobile-headline]",
              {
                autoAlpha: 0.04,
                y: -48,
                scale: 0.95,
                duration: 1.05,
                ease: "power2.inOut",
              },
              1,
            )
            .to(
              "[data-mobile-portrait]",
              {
                left: "72%",
                top: "56%",
                scale: 1.05,
                rotate: 0,
                duration: 1.3,
                ease: "power2.inOut",
              },
              1.05,
            )
            .fromTo(
              "[data-mobile-craft]",
              {
                autoAlpha: 0,
                y: 24,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              2.05,
            )
            .fromTo(
              "[data-mobile-craft-word]",
              {
                autoAlpha: 0,
                y: 22,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.12,
                ease: "power3.out",
              },
              2.2,
            )
            .fromTo(
              "[data-mobile-craft-copy]",
              {
                autoAlpha: 0,
                y: 14,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
              },
              2.55,
            )
            .to(
              "[data-mobile-craft-word]",
              {
                autoAlpha: 0,
                y: -18,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.inOut",
              },
              4.05,
            )
            .to(
              "[data-mobile-craft-copy]",
              {
                autoAlpha: 0,
                y: -12,
                duration: 0.45,
                ease: "power2.inOut",
              },
              4.12,
            )
            .to(
              "[data-mobile-craft]",
              {
                autoAlpha: 0,
                duration: 0.45,
                ease: "none",
              },
              4.2,
            )
            .to(
              "[data-mobile-portrait]",
              {
                left: "50%",
                top: "55%",
                scale: 1.08,
                duration: 0.8,
                ease: "power2.inOut",
              },
              4.2,
            )
            .fromTo(
              "[data-mobile-identity]",
              {
                autoAlpha: 0,
                y: 28,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              4.85,
            )
            .to(
              "[data-mobile-headline]",
              {
                autoAlpha: 0.025,
                y: -62,
                duration: 0.7,
                ease: "none",
              },
              4.9,
            )
            .to(
              "[data-mobile-identity]",
              {
                autoAlpha: 0,
                y: -26,
                duration: 0.8,
                ease: "power2.inOut",
              },
              7.55,
            )
            .to(
              "[data-mobile-portrait]",
              {
                top: "38%",
                scale: 0.88,
                autoAlpha: 0,
                duration: 0.55,
                ease: "power2.inOut",
              },
              7.55,
            )
            .to(
              "[data-mobile-headline]",
              {
                autoAlpha: 0,
                y: -78,
                duration: 0.5,
                ease: "none",
              },
              7.6,
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

  const mobileStoryHeight = prefersReducedMotion
    ? "min-h-[100svh]"
    : "min-h-[250svh]";

  return (
    <section
      ref={sectionRef}
      id="top"
      className={`relative scroll-mt-24 overflow-clip text-black md:min-h-[100svh] ${mobileStoryHeight}`}
    >
      {/* Mobile sticky story */}
      <div className="sticky top-0 h-[100svh] overflow-hidden md:hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.038)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.038)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute -left-20 top-[20%] h-52 w-52 rounded-full bg-black/[0.022] blur-3xl" />
          <div className="absolute -right-24 top-[50%] h-60 w-60 rounded-full bg-black/[0.025] blur-3xl" />

          {heroParticles.map((particle) => (
            <motion.span
              key={`mobile-${particle.id}`}
              className="absolute block rounded-full bg-black/12"
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
                      x: [0, 4, -3, 0],
                      opacity: [0.06, 0.16, 0.06],
                    }
                  : { x: 0, y: 0, opacity: 0.08 }
              }
              transition={{
                duration: shouldAnimate ? 8 : 0,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* The headline stays in the composition and becomes the ghost layer. */}
        <div className="absolute inset-x-5 top-[24.5%] z-10">
          <div data-mobile-status className="mb-4 w-fit">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[8.5px] font-semibold uppercase tracking-[0.15em] text-black/55 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for projects
            </span>
          </div>

          <p
            data-mobile-kicker
            className="mb-2.5 text-[8.5px] font-semibold uppercase tracking-[0.3em] text-black/35"
          >
            JackNex Studio
          </p>

          <h1
            data-mobile-headline
            className="max-w-[8.6ch] text-[2.68rem] font-semibold leading-[0.9] tracking-[-0.064em] min-[390px]:text-[2.9rem]"
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
                className="block whitespace-nowrap font-serif text-[0.9em] font-normal italic tracking-[-0.04em]"
              >
                unforgettable.
              </span>
            </span>
          </h1>
        </div>

        {/* One shared portrait moves through all three scenes. */}
        <div
          data-mobile-portrait
          className="absolute left-[79%] top-[70%] z-30 w-[29%] max-w-[122px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_16px_34px_rgba(0,0,0,0.10)]">
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
          </div>
          <div
            data-mobile-portrait-label
            className="mt-2 flex items-center justify-between gap-2 px-1 text-[7.5px] font-semibold uppercase tracking-[0.15em] text-black/38"
          >
            <span>01</span>
            <span>Jack</span>
          </div>
        </div>

        {/* Scene 1 support copy. */}
        <div
          data-mobile-support
          className="absolute bottom-[18%] left-5 z-20 max-w-[46%]"
        >
          <p className="text-[11.5px] leading-[1.6] text-black/52">
            Cinematic, interactive websites built mobile-first.
          </p>
          <p className="mt-3 text-[8px] font-semibold uppercase leading-4 tracking-[0.14em] text-black/30">
            Mobile-first · Worldwide
          </p>
        </div>

        <div
          data-mobile-actions
          className="absolute inset-x-5 bottom-5 z-40 grid grid-cols-2 gap-2.5"
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
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/15 bg-white/80 px-4 text-[12px] font-semibold text-black backdrop-blur-md"
          >
            Start Project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Scene 2 grows around the same portrait. */}
        <div
          data-mobile-craft
          className="pointer-events-none absolute inset-x-5 bottom-[10%] top-[17%] z-20 opacity-0"
        >
          <p className="text-center text-[9px] font-semibold uppercase tracking-[0.28em] text-black/35">
            One connected workflow
          </p>

          <div
            data-mobile-craft-word
            className="absolute left-[2%] top-[13%] text-[2.48rem] font-semibold leading-none tracking-[-0.065em] min-[390px]:text-[2.62rem]"
          >
            DESIGN
          </div>

          <div
            data-mobile-craft-word
            className="absolute left-[3%] top-[34%] max-w-[53%] font-serif text-[1.72rem] font-normal italic leading-none tracking-[-0.04em] min-[390px]:text-[1.84rem]"
          >
            development
          </div>

          <div
            data-mobile-craft-word
            className="absolute left-[4%] top-[56%] text-[2.18rem] font-semibold leading-none tracking-[-0.065em] min-[390px]:text-[2.32rem]"
          >
            MOTION
          </div>

          <p
            data-mobile-craft-copy
            className="absolute inset-x-0 top-[72%] mx-auto max-w-[16.5rem] text-center text-[11.5px] leading-5 text-black/45"
          >
            Visual direction, code and interaction shaped as one experience.
          </p>
        </div>

        {/* Scene 3 turns the same portrait into the personal reveal. */}
        <div
          data-mobile-identity
          className="pointer-events-none absolute inset-x-5 top-[17%] z-20 text-center opacity-0"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-black/35">
            Behind the studio
          </p>

          <h2 className="mt-4 text-[4rem] font-semibold leading-none tracking-[-0.07em]">
            Jack
          </h2>

          <div className="mx-auto mt-[16.5rem] max-w-[18rem]">
            <p className="font-serif text-[1.25rem] italic text-black/65">
              Designer & Developer
            </p>
            <div className="mx-auto mt-4 h-px w-10 bg-black/15" />
            <p className="mt-4 text-[9px] font-semibold uppercase leading-5 tracking-[0.16em] text-black/38">
              JackNex Studio
              <br />
              Working with clients worldwide
            </p>
          </div>
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
