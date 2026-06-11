import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects, type Project, type ProjectImage } from "@/config/site";
import { usePageVisible } from "@/hooks/use-page-visible";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

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
  const floatLaptop = prefersReducedMotion
    ? { y: 0, rotate: -3 }
    : { y: [0, -10, 0], rotate: [-3, -2, -3] };
  const floatPhone = prefersReducedMotion
    ? { y: 0, rotate: 5, scale: 1 }
    : { y: [0, -14, 0], rotate: [5, 6, 5], scale: [1, 1.02, 1] };

  return (
    <div className="relative flex items-center justify-center py-8 md:py-12">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        animate={floatLaptop}
        transition={{
          duration: prefersReducedMotion ? 0 : 7,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-[85%] max-w-[560px]"
      >
        <div className="rounded-[26px] bg-[#111111] p-3 shadow-[0_35px_80px_rgba(0,0,0,0.22)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-black">
            <motion.div
              key={`desktop-${desktopImage.src}-${currentIndex}`}
              initial={
                prefersReducedMotion ? false : { opacity: 0.25, scale: 1.03 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
              className="h-full w-full"
            >
              <ProjectPreviewImage
                image={desktopImage}
                sizes="(max-width: 1024px) 86vw, 560px"
                className="h-full w-full object-contain"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mx-auto h-3 w-[92%] rounded-b-[18px] bg-[#1a1a1a]" />
        <div className="mx-auto h-2 w-[28%] rounded-b-full bg-[#2a2a2a]" />
      </motion.div>

      <motion.div
        animate={floatPhone}
        transition={{
          duration: prefersReducedMotion ? 0 : 6.5,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[2%] right-[4%] z-20 w-[22%] min-w-[110px] max-w-[150px]"
      >
        <div className="rounded-[28px] bg-[#111111] p-2 shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
          <div className="relative aspect-[9/20] overflow-hidden rounded-[22px] bg-black">
            <motion.div
              key={`mobile-${mobileImage.src}-${currentIndex}`}
              initial={
                prefersReducedMotion ? false : { opacity: 0.25, scale: 1.03 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
              className="h-full w-full"
            >
              <ProjectPreviewImage
                image={mobileImage}
                sizes="150px"
                className="h-full w-full object-contain object-top"
              />
            </motion.div>
            <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/70" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const FeaturedWork = () => {
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
      id="work"
      className="relative scroll-mt-24 py-28"
      onPointerEnter={() => setIsInteracting(true)}
      onPointerLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={handleFocusOut}
      aria-labelledby="featured-work-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Portfolio
            </span>
          </div>
          <h2
            id="featured-work-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Featured Work
          </h2>
        </motion.div>

        <div className="space-y-10">
          {projects.map((project, projectIndex) => {
            const currentIndex = activeIndexes[projectIndex];
            const isReverse = projectIndex % 2 !== 0;

            return (
              <motion.article
                key={project.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : projectIndex * 0.1,
                }}
                className="glass-surface overflow-hidden rounded-[30px] border border-border/60"
              >
                <div
                  className={`grid items-center gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-2 lg:gap-14 ${
                    isReverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <ShowcaseMockup
                    project={project}
                    currentIndex={currentIndex}
                    prefersReducedMotion={Boolean(prefersReducedMotion)}
                  />

                  <div className="flex flex-col justify-center">
                    <span className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                      {project.category}
                    </span>

                    <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.description}
                    </p>

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
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        View Live Site
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
