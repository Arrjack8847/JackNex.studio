import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects, type Project, type ProjectImage } from "@/config/site";
import { gsap } from "@/lib/gsap";
import { usePageVisible } from "@/hooks/use-page-visible";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import deviceMockup from "../../a3d6ea3a-85cb-470c-a14b-84ed186de83c-Photoroom.png";

const AUTOPLAY_MS = 3200;
const MANUAL_PAUSE_MS = 5000;

type ProjectPreviewImageProps = {
  image: ProjectImage;
  className: string;
  sizes: string;
};

function ProjectPreviewImage({
  image,
  className,
  sizes,
}: ProjectPreviewImageProps) {
  const srcSet = image.previewSrc
    ? `${image.previewSrc} 1200w, ${image.src} ${image.width}w`
    : undefined;

  return (
    <img
      src={image.previewSrc ?? image.src}
      srcSet={srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

type ShowcaseMockupProps = {
  project: Project;
  currentIndex: number;
  prefersReducedMotion: boolean;
};

function ShowcaseMockup({
  project,
  currentIndex,
  prefersReducedMotion,
}: ShowcaseMockupProps) {
  const desktopImage = project.desktopImages[currentIndex];
  const mobileImage = project.mobileImages[currentIndex];

  const floatMockup = prefersReducedMotion
    ? { y: 0, rotate: 0, scale: 1 }
    : { y: [0, -8, 0], rotate: [0, -0.35, 0], scale: [1, 1.006, 1] };

  return (
    <div className="relative flex min-h-[300px] items-center justify-center py-4 sm:min-h-[360px] md:min-h-[430px] md:py-8">
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[8%] h-[22%] rounded-[50%] bg-black/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[22%] top-[22%] h-44 w-44 rounded-full bg-primary/8 blur-3xl md:h-64 md:w-64" />

      <motion.div
        animate={floatMockup}
        transition={{
          duration: prefersReducedMotion ? 0 : 7.5,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 aspect-[3/2] w-full max-w-[690px] origin-center"
      >
        <img
          src={deviceMockup}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-contain"
        />

        <div
          className="absolute left-[15.4%] top-[12.2%] z-20 h-[58.8%] w-[59.7%] overflow-hidden bg-white"
          style={{
            clipPath: "polygon(0.8% 6%, 99.3% 0%, 93.4% 96.6%, 5.3% 100%)",
            transform: "rotate(-0.7deg) skewY(-0.2deg)",
            transformOrigin: "center center",
          }}
        >
          <motion.div
            key={`desktop-${desktopImage.src}-${currentIndex}`}
            initial={prefersReducedMotion ? false : { opacity: 0.35, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              ease: "easeOut",
            }}
            className="h-full w-full"
          >
            <ProjectPreviewImage
              image={desktopImage}
              sizes="(max-width: 1024px) 76vw, 520px"
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        </div>

        <div
          className="absolute left-[68.1%] top-[25.3%] z-20 h-[64.9%] w-[22.6%] overflow-hidden rounded-[13%] bg-white"
          style={{
            clipPath: "polygon(11% 0%, 94% 7%, 82% 100%, 0% 91%)",
            transform: "rotate(0.5deg)",
            transformOrigin: "center center",
          }}
        >
          <motion.div
            key={`mobile-${mobileImage.src}-${currentIndex}`}
            initial={prefersReducedMotion ? false : { opacity: 0.35, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              ease: "easeOut",
            }}
            className="h-full w-full"
          >
            <ProjectPreviewImage
              image={mobileImage}
              sizes="180px"
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[77.5%] top-[27.2%] z-30 h-[1.8%] w-[7.2%] rounded-full bg-black"
          style={{ transform: "rotate(4.5deg)" }}
        />

        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/8 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

const FeaturedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndexes, setActiveIndexes] = useState<number[]>(
    projects.map(() => 0),
  );
  const [isInteracting, setIsInteracting] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const manualPauseTimeoutRef = useRef<number | undefined>(undefined);
  const isPageVisible = usePageVisible();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAutoplay =
    isPageVisible && !prefersReducedMotion && !isInteracting && !isManuallyPaused;

  useEffect(() => {
    if (!shouldAutoplay) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndexes((prev) =>
        prev.map((value, projectIndex) => {
          const totalSlides = projects[projectIndex].desktopImages.length;
          return (value + 1) % totalSlides;
        }),
      );
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [shouldAutoplay]);

  useEffect(() => {
    return () => {
      if (manualPauseTimeoutRef.current) {
        window.clearTimeout(manualPauseTimeoutRef.current);
      }
    };
  }, []);

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
          gsap.fromTo(
            "[data-work-heading]",
            {
              autoAlpha: 0,
              y: 64,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "[data-work-heading]",
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );

          const firstProject = root.querySelector<HTMLElement>(
            '[data-work-project="0"]',
          );

          if (!firstProject) {
            return;
          }

          const firstProjectStory = gsap.timeline({
            scrollTrigger: {
              trigger: firstProject,
              start: "top 91%",
              end: "top 43%",
              scrub: 0.68,
              invalidateOnRefresh: true,
            },
          });

          firstProjectStory
            .fromTo(
              firstProject,
              {
                clipPath: "inset(7% 3% 7% 3% round 30px)",
                scale: 0.965,
                y: 58,
              },
              {
                clipPath: "inset(0% 0% 0% 0% round 30px)",
                scale: 1,
                y: 0,
                ease: "none",
              },
              0,
            )
            .fromTo(
              '[data-work-visual="0"]',
              {
                y: 44,
                scale: 0.94,
              },
              {
                y: 0,
                scale: 1,
                ease: "none",
              },
              0,
            )
            .fromTo(
              '[data-work-copy="0"]',
              {
                autoAlpha: 0.48,
                y: 54,
              },
              {
                autoAlpha: 1,
                y: 0,
                ease: "none",
              },
              0.1,
            );

          return () => {
            firstProjectStory.scrollTrigger?.kill();
            firstProjectStory.kill();
          };
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const pauseAfterManualInteraction = () => {
    setIsManuallyPaused(true);

    if (manualPauseTimeoutRef.current) {
      window.clearTimeout(manualPauseTimeoutRef.current);
    }

    manualPauseTimeoutRef.current = window.setTimeout(() => {
      setIsManuallyPaused(false);
    }, MANUAL_PAUSE_MS);
  };

  const handleFocusOut = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsInteracting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative scroll-mt-24 py-24 sm:py-28"
      onPointerEnter={() => setIsInteracting(true)}
      onPointerLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={handleFocusOut}
      aria-labelledby="featured-work-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div data-work-heading>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mb-14 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55 sm:text-sm">
                  Selected Work
                </span>
              </div>
              <h2
                id="featured-work-title"
                className="max-w-[12ch] text-3xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl"
              >
                Projects with a point of view.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              A selection of client work, interactive invitations, and
              conversion-focused builds — each designed around a different
              audience, mood, and purpose.
            </p>
          </motion.div>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {projects.map((project, projectIndex) => {
            const currentIndex = activeIndexes[projectIndex];
            const isReverse = projectIndex % 2 !== 0;

            return (
              <div
                key={project.title}
                data-work-project={String(projectIndex)}
              >
                <motion.article
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    delay: prefersReducedMotion ? 0 : projectIndex * 0.08,
                  }}
                  className="glass-surface overflow-hidden rounded-[30px] border border-border/60"
                >
                  <div
                    className={`grid items-center gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-2 lg:gap-14 ${
                      isReverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div data-work-visual={String(projectIndex)}>
                      <ShowcaseMockup
                        project={project}
                        currentIndex={currentIndex}
                        prefersReducedMotion={Boolean(prefersReducedMotion)}
                      />
                    </div>

                    <div
                      data-work-copy={String(projectIndex)}
                      className="flex flex-col justify-center"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-black/30">
                          {String(projectIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mb-4 text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                        {project.description}
                      </p>

                      <dl className="my-6 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-black/10 py-5 sm:grid-cols-3">
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                            Role
                          </dt>
                          <dd className="mt-1.5 text-xs font-medium text-black/70 sm:text-sm">
                            {project.role}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                            Focus
                          </dt>
                          <dd className="mt-1.5 text-xs font-medium text-black/70 sm:text-sm">
                            {project.focus}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                            Year
                          </dt>
                          <dd className="mt-1.5 text-xs font-medium text-black/70 sm:text-sm">
                            {project.year}
                          </dd>
                        </div>
                      </dl>

                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-black/60"
                        >
                          Visit Project
                          <ExternalLink
                            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>

                        <div
                          className="flex gap-1"
                          role="group"
                          aria-label={`${project.title} preview slides`}
                        >
                          {project.desktopImages.map((_, dotIndex) => {
                            const isActive = currentIndex === dotIndex;

                            return (
                              <button
                                key={`${project.title}-slide-${dotIndex}`}
                                type="button"
                                onClick={() => {
                                  setActiveIndexes((prev) =>
                                    prev.map((value, index) =>
                                      index === projectIndex ? dotIndex : value,
                                    ),
                                  );
                                  pauseAfterManualInteraction();
                                }}
                                className="flex h-11 w-11 items-center justify-center rounded-full"
                                aria-label={`Show ${project.title} slide ${
                                  dotIndex + 1
                                }`}
                                aria-current={isActive ? "true" : undefined}
                              >
                                <span
                                  className={`h-2.5 rounded-full transition-all duration-300 ${
                                    isActive
                                      ? "w-8 bg-primary"
                                      : "w-2.5 bg-primary/25 hover:bg-primary/45"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
