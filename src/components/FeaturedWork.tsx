import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Elegant Star Wedding Platform",
    category: "Full-Stack Web App",
    tags: ["React", "TypeScript", "Supabase"],
    description:
      "A modern wedding platform for browsing designs, placing orders, and managing bookings.",
    desktopImages: [
      "/projects/project2/project1.webp",
      "/projects/project2/project2.webp",
      "/projects/project2/project3.webp",
    ],
    mobileImages: [
      "/projects/project2/pproject1.webp",
      "/projects/project2/pproject2.webp",
      "/projects/project2/pproject3.webp",
    ],
    link: "https://final-elegent-star.vercel.app/", // replace later
  },
  {
    title: "Power House Gym Website",
    category: "Fitness Website",
    tags: ["React", "Tailwind", "Responsive"],
    description:
      "A bold gym website designed to attract members and showcase training programs.",
    desktopImages: [
      "/projects/project1/project1.webp",
      "/projects/project1/project2.webp",
      "/projects/project1/project3.webp",
    ],
    mobileImages: [
      "/projects/project1/pproject1.webp",
      "/projects/project1/pproject2.webp",
      "/projects/project1/pproject3.webp",
    ],
    link: "https://power-house-coral.vercel.app/",
  },

  {
  title: "Cinematic Wedding Invitation Website",
  category: "Wedding Website",
  tags: ["React", "Framer Motion", "Responsive"],
  description:
    "A cinematic wedding invitation website designed to turn a love story into an interactive digital experience. Featuring smooth animations, elegant UI, and fully optimized mobile design.",
  desktopImages: [
    "/projects/project3/project1.webp",
    "/projects/project3/project2.webp",
    "/projects/project3/project3.webp",
  ],
  mobileImages: [
    "/projects/project3/pproject1.webp",
    "/projects/project3/pproject2.webp",
    "/projects/project3/pproject3.webp",
  ],
  link: "https://wedding-invation1.vercel.app/",
}
];

const AUTOPLAY_MS = 3200;

function ShowcaseMockup({
  desktopImage,
  mobileImage,
  index,
}: {
  desktopImage: string;
  mobileImage: string;
  index: number;
}) {
  return (
    <div className="relative flex items-center justify-center py-8 md:py-12">
      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* laptop */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-3, -2, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[85%] max-w-[560px]"
      >
        <div className="rounded-[26px] bg-[#111111] p-3 shadow-[0_35px_80px_rgba(0,0,0,0.22)]">
          <div className="relative overflow-hidden rounded-[18px] bg-black aspect-[16/10]">
            <motion.img
              key={`desktop-${desktopImage}-${index}`}
              src={desktopImage}
              alt="Desktop project preview"
              initial={{ opacity: 0.25, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </div>

        {/* laptop base */}
        <div className="mx-auto h-3 w-[92%] rounded-b-[18px] bg-[#1a1a1a]" />
        <div className="mx-auto h-2 w-[28%] rounded-b-full bg-[#2a2a2a]" />
      </motion.div>

      {/* phone */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [5, 6, 5], scale: [1, 1.02, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[2%] right-[4%] z-20 w-[22%] min-w-[110px] max-w-[150px]"
        
      >
        <div className="rounded-[28px] bg-[#111111] p-2 shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
          <div className="relative overflow-hidden rounded-[22px] bg-black aspect-[9/20]">
            <motion.img
              key={`mobile-${mobileImage}-${index}`}
              src={mobileImage}
              alt="Mobile project preview"
              initial={{ opacity: 0.25, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full w-full object-contain object-top"
            />
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
    projects.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndexes((prev) =>
        prev.map((value, projectIndex) => {
          const totalSlides = projects[projectIndex].desktopImages.length;
          return (value + 1) % totalSlides;
        })
      );
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="work" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Featured Work
          </h2>
        </motion.div>

        <div className="space-y-10">
          {projects.map((project, i) => {
            const currentIndex = activeIndexes[i];
            const isReverse = i % 2 !== 0;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-surface rounded-[30px] border border-border/60 overflow-hidden"
              >
                <div
                  className={`grid items-center gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-2 lg:gap-14 ${
                    isReverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <ShowcaseMockup
                    desktopImage={project.desktopImages[currentIndex]}
                    mobileImage={project.mobileImages[currentIndex]}
                    index={currentIndex}
                  />

                  <div className="flex flex-col justify-center">
                    <span className="mb-3 text-xs font-medium text-primary uppercase tracking-[0.22em]">
                      {project.category}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a
  href={project.link}
  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
>
  View Live Site
  <ExternalLink className="w-4 h-4" />
</a>

                      <div className="flex gap-2">
                        {project.desktopImages.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            type="button"
                            onClick={() =>
                              setActiveIndexes((prev) =>
                                prev.map((value, idx) =>
                                  idx === i ? dotIndex : value
                                )
                              )
                            }
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              currentIndex === dotIndex
                                ? "w-8 bg-primary"
                                : "w-2.5 bg-primary/25 hover:bg-primary/45"
                            }`}
                            aria-label={`Go to slide ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
