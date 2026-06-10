import { motion } from "framer-motion";
import { portfolioStats } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const Stats = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-20" aria-label="Portfolio highlights">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="glass-surface rounded-2xl p-10 sm:p-14"
        >
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className="text-center"
              >
                <div className="mb-2 text-4xl font-extrabold text-gradient-cyan sm:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
