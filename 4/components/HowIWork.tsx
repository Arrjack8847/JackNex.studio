import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MobileProcessTimeline from "@/components/process/MobileProcessTimeline";
import ProcessNavigation from "@/components/process/ProcessNavigation";
import ProcessPreview from "@/components/process/ProcessPreview";
import ProcessProgress from "@/components/process/ProcessProgress";
import {
  processStepIds,
  processSteps,
  type ProcessStepId,
} from "@/data/processSteps";
import { useActiveProcessStep } from "@/hooks/useActiveProcessStep";

export default function HowIWork() {
  const activeStep = useActiveProcessStep(processStepIds);
  const reduceMotion = useReducedMotion();
  const activeIndex = Math.max(
    processSteps.findIndex((step) => step.id === activeStep),
    0,
  );

  const scrollToStep = (id: ProcessStepId) => {
    const target = document.querySelector<HTMLElement>(
      `[data-process-step="${id}"]`,
    );

    if (!target) {
      return;
    }

    const offset = window.innerHeight * 0.18;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="process"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-black/[0.025] blur-[120px] lg:h-[620px] lg:w-[620px] lg:blur-[170px]" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-7 bg-black" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black sm:text-sm">
              My Process
            </span>
            <span className="h-[2px] w-7 bg-black" />
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-black sm:text-4xl md:text-5xl">
            From First Idea to
            <br className="hidden sm:block" /> Final Launch
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/58 sm:text-base">
            A clear, collaborative process that keeps your project organized,
            creative and focused from the first discussion to delivery.
          </p>
        </motion.header>

        <div className="hidden grid-cols-[0.76fr_1.24fr] gap-10 lg:grid xl:gap-16">
          <aside className="relative">
            <div className="sticky top-28 rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.05)] backdrop-blur-xl xl:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/38">
                How the project moves
              </p>
              <h3 className="mt-3 max-w-[12ch] text-3xl font-bold leading-[1.02] tracking-[-0.045em] text-black xl:text-4xl">
                One connected journey, five focused stages.
              </h3>
              <p className="mt-4 text-sm leading-6 text-black/52">
                Scroll through the process or choose a stage to see what happens
                and what you receive.
              </p>

              <ProcessNavigation
                steps={processSteps}
                activeStep={activeStep}
                onSelect={scrollToStep}
              />

              <ProcessProgress
                activeIndex={activeIndex}
                total={processSteps.length}
              />
            </div>
          </aside>

          <div className="relative">
            <div className="sticky top-24 z-10 flex h-[calc(100vh-7rem)] items-center">
              <ProcessPreview activeStep={activeStep} />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none relative z-0 -mt-[calc(100vh-7rem)]"
            >
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  data-process-step={step.id}
                  className="min-h-[72vh]"
                />
              ))}
              <div className="h-[24vh]" />
            </div>
          </div>
        </div>

        <MobileProcessTimeline />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-[28px] border border-black/10 bg-white/85 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:mt-16 sm:p-8 lg:mt-20 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/38">
              Every project is different
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-black sm:text-3xl">
              Have an idea you want to build?
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
              Tell me your goals, preferred style, required features and expected
              timeline. I will help you choose the right approach.
            </p>
          </div>

          <a
            href="#contact"
            className="group mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 lg:mt-0"
          >
            Discuss Your Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
