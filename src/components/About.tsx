import { motion } from "framer-motion";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Figma",
  "Framer Motion",
  "Supabase",
  "PostgreSQL",
  "UI/UX",
];

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "Modern", label: "Design Style" },
  { value: "Fast", label: "Delivery Focus" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5rem] top-10 h-44 w-44 rounded-full bg-primary/8 blur-[70px] sm:left-[-4rem] sm:top-16 sm:h-72 sm:w-72 sm:blur-[110px]" />
        <div className="absolute right-[-5rem] bottom-0 h-44 w-44 rounded-full bg-primary/6 blur-[75px] sm:right-[-4rem] sm:bottom-10 sm:h-72 sm:w-72 sm:blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* left image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border/60 bg-background shadow-[0_14px_40px_rgba(0,0,0,0.08)] sm:rounded-[30px] sm:shadow-[0_20px_80px_rgba(0,0,0,0.10)]"
            >
              {/* image */}
              <motion.img
                src="/hero-man.webp"
                alt="Portrait"
                className="h-full w-full object-cover grayscale gpu smooth-transform"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(255,255,255,0.02))]" />

              {/* border light */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10 sm:rounded-[30px]" />

              {/* bottom info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-[11px] sm:tracking-[0.18em]">
                  Developer • Designer
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white sm:text-2xl">
                  Building premium websites
                </h3>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
                  Clean design, smooth motion, and modern experiences that help
                  brands look more professional online.
                </p>
              </motion.div>
            </motion.div>

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
              className="absolute -bottom-4 right-1 rounded-2xl border border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.10)] sm:-bottom-5 sm:-right-3 sm:px-5 sm:py-4 sm:shadow-[0_12px_35px_rgba(0,0,0,0.12)]"
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.16em]">
                Current Focus
              </p>
              <p className="mt-1.5 text-xs font-semibold text-foreground sm:mt-2 sm:text-sm">
                Modern websites that convert
              </p>
            </motion.div>
          </motion.div>

          {/* right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-7 bg-primary sm:w-8" />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.18em]">
                About Me
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              I design and build
              <span className="block text-primary">
                modern digital experiences
              </span>
            </h2>

            <p className="text-sm leading-7 text-muted-foreground sm:text-lg sm:leading-relaxed">
              I’m a developer and designer focused on creating modern websites
              that look polished, feel smooth, and help brands present
              themselves with confidence online.
            </p>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-relaxed">
              I care about clean layouts, strong visual direction, and user
              experiences that feel premium from the first scroll to the final
              click. My goal is to create websites that are not only beautiful,
              but also effective.
            </p>

            {/* stats */}
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3 sm:gap-4 sm:pt-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-border/60 bg-secondary/40 px-4 py-4 sm:px-5"
                >
                  <div className="text-xl font-bold text-foreground sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* skills */}
            <div className="pt-1 sm:pt-2">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-sm sm:tracking-[0.18em]">
                Tools & Skills
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="rounded-full border border-border/60 bg-background px-3.5 py-2 text-xs font-medium text-foreground shadow-sm sm:px-4 sm:text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;