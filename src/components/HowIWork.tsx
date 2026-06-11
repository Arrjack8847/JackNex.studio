import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ACTIVATION_POINT = 0.38;

export default function HowIWork() {
  const activeStep = useActiveProcessStep(processStepIds);
  const reduceMotion = usePrefersReducedMotion();

  const [compactDesktop, setCompactDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (max-height: 850px)",
    );

    const updateLayout = () => {
      setCompactDesktop(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

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

    const activationOffset = window.innerHeight * ACTIVATION_POINT;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      activationOffset;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-x-clip py-12 sm:py-16 lg:py-20"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-black/[0.025] blur-[120px] lg:h-[620px] lg:w-[620px] lg:blur-[170px]" />

        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <motion.header
          initial={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 22 }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : undefined
          }
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
          }}
          className={`mx-auto max-w-3xl text-center ${
            compactDesktop
              ? "mb-8"
              : "mb-8 sm:mb-10 lg:mb-12"
          }`}
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span
              className="h-[2px] w-7 bg-black"
              aria-hidden="true"
            />

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black sm:text-sm">
              My Process
            </span>

            <span
              className="h-[2px] w-7 bg-black"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-black sm:text-4xl md:text-5xl">
            From First Idea to
            <br className="hidden sm:block" /> Final Launch
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            A clear, collaborative process that keeps your project organized,
            creative and focused from the first discussion to delivery.
          </p>
        </motion.header>

        {/* Desktop process */}
        <div className="hidden items-start grid-cols-[0.76fr_1.24fr] gap-8 lg:grid xl:gap-10">
          {/* Left navigation */}
          <aside className="relative min-w-0 self-stretch">
            <div
              className={`sticky top-24 rounded-[28px] border border-black/10 bg-white/75 shadow-[0_18px_55px_rgba(0,0,0,0.05)] backdrop-blur-xl ${
                compactDesktop ? "p-3.5 xl:p-4" : "p-5 xl:p-6"
              }`}
            >
              <p
                className={`font-semibold uppercase tracking-[0.18em] text-black/40 ${
                  compactDesktop ? "text-[10px]" : "text-xs"
                }`}
              >
                How the project moves
              </p>

              <h3
                className={`max-w-[13ch] font-bold leading-[1.02] tracking-[-0.045em] text-black ${
                  compactDesktop
                    ? "mt-2 text-[1.65rem]"
                    : "mt-3 text-3xl xl:text-4xl"
                }`}
              >
                One connected journey, five focused stages.
              </h3>

              <p
                className={`text-black/55 ${
                  compactDesktop
                    ? "mt-2 text-xs leading-5"
                    : "mt-3 text-sm leading-6"
                }`}
              >
                Scroll through the process or choose a stage to see what
                happens and what you receive.
              </p>

              <div
                className={
                  compactDesktop
                    ? "-mt-1 origin-top scale-[0.90]"
                    : ""
                }
              >
                <ProcessNavigation
                  steps={processSteps}
                  activeStep={activeStep}
                  onSelect={scrollToStep}
                />
              </div>

              <div className={compactDesktop ? "-mt-5" : ""}>
                <ProcessProgress
                  activeIndex={activeIndex}
                  total={processSteps.length}
                />
              </div>
            </div>
          </aside>

          {/* Right active preview */}
          <div className="relative min-w-0">
            <div className="sticky top-24 z-10 flex h-[calc(100dvh-7rem)] items-start">
              <div
                className={
                  compactDesktop
                    ? "w-[108.7%] origin-top-left scale-[0.92]"
                    : "w-full"
                }
              >
                <ProcessPreview activeStep={activeStep} />
              </div>
            </div>

            {/* Invisible scroll activation areas */}
            <div
              aria-hidden="true"
              className="pointer-events-none relative z-0 -mt-[calc(100dvh-7rem)]"
            >
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  data-process-step={step.id}
                  className={
                    compactDesktop
                      ? "min-h-[68dvh]"
                      : "min-h-[72dvh]"
                  }
                />
              ))}

              <div
                className={
                  compactDesktop ? "h-[20dvh]" : "h-[24dvh]"
                }
              />
            </div>
          </div>
        </div>

        {/* Mobile and tablet timeline */}
        <div className="lg:hidden">
          <MobileProcessTimeline />
        </div>

        {/* Final CTA */}
        <motion.div
          initial={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : undefined
          }
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{
            once: true,
            margin: "-60px",
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
          }}
          className="mt-8 overflow-hidden rounded-[28px] border border-black/10 bg-white/85 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:mt-10 sm:p-6 lg:mt-12 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-7"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Every project is different
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-black sm:text-3xl">
              Have an idea you want to build?
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
              Tell me your goals, preferred style, required features and
              expected timeline. I will help you choose the right approach.
            </p>
          </div>

          <a
            href="#contact"
            className="group mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 lg:mt-0"
          >
            Discuss Your Project

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}