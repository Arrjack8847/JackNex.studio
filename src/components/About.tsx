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
    <section id="about" className="relative overflow-hidden py-28">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-4rem] top-16 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute right-[-4rem] bottom-10 h-72 w-72 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* left image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-border/60 bg-background shadow-[0_20px_80px_rgba(0,0,0,0.10)]"
            >
              {/* image */}
              <motion.img
  src="/hero-man.png"
  alt="Portrait"
  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
  animate={{ scale: [1, 1.03, 1] }}
  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
/>

              {/* overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(255,255,255,0.02))]" />

              {/* border light */}
              <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-white/10" />

              {/* bottom info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-md"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Developer • Designer
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  Building premium websites
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
                  Clean design, smooth motion, and modern experiences that help
                  brands look more professional online.
                </p>
              </motion.div>
            </motion.div>

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
              className="absolute -bottom-5 -right-3 rounded-2xl border border-border/60 bg-background/90 px-5 py-4 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.12)]"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Current Focus
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
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
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                About Me
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              I design and build
              <span className="block text-primary">
                modern digital experiences
              </span>
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              I’m a developer and designer focused on creating modern websites
              that look polished, feel smooth, and help brands present
              themselves with confidence online.
            </p>

            <p className="leading-relaxed text-muted-foreground">
              I care about clean layouts, strong visual direction, and user
              experiences that feel premium from the first scroll to the final
              click. My goal is to create websites that are not only beautiful,
              but also effective.
            </p>

            {/* stats */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-border/60 bg-secondary/40 px-5 py-4"
                >
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* skills */}
            <div className="pt-2">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Tools & Skills
              </p>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
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
