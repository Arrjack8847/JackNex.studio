import { motion } from "framer-motion";
import { services } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const Stats = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="services"
      className="relative scroll-mt-24 py-24 sm:py-28"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-black" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55 sm:text-sm">
                What I Build
              </span>
            </div>
            <h2
              id="services-title"
              className="max-w-[11ch] text-3xl font-bold leading-[0.98] tracking-[-0.045em] text-black sm:text-4xl md:text-5xl"
            >
              Design, code, and motion in one workflow.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-black/55 sm:text-base">
            JackNex Studio is built for projects where the website itself should
            feel like part of the brand experience — not just a place to put
            information.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.08,
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.045)] backdrop-blur-xl sm:p-8"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] text-black/35">
                  {service.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-black/15 transition-transform duration-300 group-hover:scale-[1.8]" />
              </div>

              <h3 className="max-w-[13ch] text-2xl font-semibold leading-tight tracking-[-0.035em] text-black sm:text-3xl">
                {service.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base">
                {service.description}
              </p>

              <div className="mt-8 border-t border-black/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40 sm:text-[11px]">
                {service.detail}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
