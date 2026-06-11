
import {
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Check,
  ChevronDown,
  Clock3,
  PanelsTopLeft,
} from "lucide-react";

import { ProcessVisual } from "@/components/process/ProcessPreview";
import {
  processSteps,
  type ProcessStepId,
} from "@/data/processSteps";

export default function MobileProcessTimeline() {
  const reduceMotion = useReducedMotion();

  const [openStep, setOpenStep] =
    useState<ProcessStepId | null>("discovery");

  const [previewStep, setPreviewStep] =
    useState<ProcessStepId | null>(null);

  const stepRefs = useRef<
    Partial<Record<ProcessStepId, HTMLElement | null>>
  >({});

  const selectStep = (stepId: ProcessStepId) => {
    const isAlreadyOpen = openStep === stepId;

    if (isAlreadyOpen) {
      setOpenStep(null);
      setPreviewStep(null);
      return;
    }

    setOpenStep(stepId);
    setPreviewStep(null);

    window.setTimeout(() => {
      stepRefs.current[stepId]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, reduceMotion ? 0 : 80);
  };

  const togglePreview = (stepId: ProcessStepId) => {
    setPreviewStep((current) =>
      current === stepId ? null : stepId,
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl pl-8 sm:pl-12 lg:hidden">
      {/* Vertical timeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 left-[10px] top-7 w-px bg-black/10 sm:left-[15px]"
      />

      <div className="space-y-3 sm:space-y-4">
        {processSteps.map((step, index) => {
          const open = openStep === step.id;
          const featured = Boolean(step.featured);
          const highlighted = featured && open;
          const showPreview = previewStep === step.id;
          const Icon = step.icon;

          return (
            <motion.article
              key={step.id}
              ref={(element) => {
                stepRefs.current[step.id] = element;
              }}
              layout={!reduceMotion}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-25px",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.38,
                delay: reduceMotion ? 0 : index * 0.035,
              }}
              className="relative min-w-0 scroll-mt-24"
            >
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className={`absolute -left-8 top-5 z-10 flex h-[21px] w-[21px] items-center justify-center rounded-full border-[4px] border-[#f6f6f4] transition-all duration-300 sm:-left-12 sm:top-6 sm:h-[31px] sm:w-[31px] sm:border-[5px] ${
                  open
                    ? "bg-black shadow-[0_5px_16px_rgba(0,0,0,0.18)]"
                    : "bg-black/20"
                }`}
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    open
                      ? "h-2 w-2 bg-white"
                      : "h-1.5 w-1.5 bg-white/80"
                  }`}
                />
              </span>

              <motion.div
                layout={!reduceMotion}
                className={`min-w-0 overflow-hidden rounded-[20px] border transition-colors duration-300 sm:rounded-[24px] ${
                  highlighted
                    ? "border-black bg-black text-white shadow-[0_16px_40px_rgba(0,0,0,0.16)]"
                    : open
                      ? "border-black/15 bg-white text-black shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                      : "border-black/10 bg-white/85 text-black"
                }`}
              >
                {/* Step button */}
                <button
                  type="button"
                  onClick={() => selectStep(step.id)}
                  aria-expanded={open}
                  aria-controls={`mobile-process-${step.id}`}
                  className="flex min-h-[68px] w-full items-center gap-2.5 px-3.5 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset sm:min-h-[82px] sm:gap-3 sm:px-5 sm:py-4"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors sm:h-11 sm:w-11 ${
                      highlighted
                        ? "border-white/15 bg-white/10 text-white"
                        : open
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-black/[0.035] text-black/55"
                    }`}
                  >
                    <Icon
                      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-[8px] font-semibold uppercase tracking-[0.15em] sm:text-[10px] ${
                        highlighted
                          ? "text-white/45"
                          : "text-black/40"
                      }`}
                    >
                      {step.number} · {step.label}
                    </p>

                    <h3
                      className={`mt-1 text-sm font-bold leading-tight tracking-[-0.02em] sm:text-lg ${
                        highlighted
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <motion.span
                    aria-hidden="true"
                    animate={{
                      rotate: open ? 180 : 0,
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.24,
                            ease: "easeOut",
                          }
                    }
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border sm:h-9 sm:w-9 ${
                      highlighted
                        ? "border-white/15 bg-white/10 text-white/70"
                        : "border-black/10 bg-black/[0.025] text-black/50"
                    }`}
                  >
                    <ChevronDown
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </motion.span>
                </button>

                {/* Expanded information */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`mobile-process-${step.id}`}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              height: 0,
                              opacity: 0,
                            }
                      }
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              height: 0,
                              opacity: 0,
                            }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`border-t px-3.5 pb-4 pt-3.5 sm:px-5 sm:pb-5 sm:pt-5 ${
                          highlighted
                            ? "border-white/10"
                            : "border-black/10"
                        }`}
                      >
                        {/* Timeline */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`text-[8px] font-semibold uppercase tracking-[0.15em] sm:text-[10px] ${
                              highlighted
                                ? "text-white/45"
                                : "text-black/40"
                            }`}
                          >
                            Timeline
                          </span>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] sm:px-3 sm:text-[10px] ${
                              highlighted
                                ? "border-white/15 bg-white/[0.06] text-white/70"
                                : "border-black/10 bg-black/[0.025] text-black/60"
                            }`}
                          >
                            <Clock3
                              className="h-3 w-3"
                              aria-hidden="true"
                            />

                            {step.duration}
                          </span>
                        </div>

                        {/* Description */}
                        <p
                          className={`mt-3 text-[13px] leading-[1.6] sm:mt-4 sm:text-sm sm:leading-6 ${
                            highlighted
                              ? "text-white/65"
                              : "text-black/60"
                          }`}
                        >
                          {step.description}
                        </p>

                        {/* Deliverables */}
                        <div className="mt-4">
                          <p
                            className={`text-[8px] font-semibold uppercase tracking-[0.16em] sm:text-[10px] ${
                              highlighted
                                ? "text-white/40"
                                : "text-black/40"
                            }`}
                          >
                            You receive
                          </p>

                          <div className="mt-2.5 grid grid-cols-1 gap-2 min-[500px]:grid-cols-2">
                            {step.deliverables.map(
                              (deliverable) => (
                                <div
                                  key={deliverable}
                                  className={`flex min-w-0 items-start gap-2.5 rounded-xl border p-2.5 sm:p-3 ${
                                    highlighted
                                      ? "border-white/10 bg-white/[0.055]"
                                      : "border-black/10 bg-black/[0.02]"
                                  }`}
                                >
                                  <span
                                    className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                      highlighted
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                    }`}
                                  >
                                    <Check
                                      className="h-3 w-3"
                                      aria-hidden="true"
                                    />
                                  </span>

                                  <span
                                    className={`min-w-0 text-xs leading-5 ${
                                      highlighted
                                        ? "text-white/75"
                                        : "text-black/65"
                                    }`}
                                  >
                                    {deliverable}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Optional visual preview */}
                        <button
                          type="button"
                          onClick={() =>
                            togglePreview(step.id)
                          }
                          aria-expanded={showPreview}
                          aria-controls={`mobile-preview-${step.id}`}
                          className={`mt-4 flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition-colors ${
                            highlighted
                              ? "border-white/10 bg-white/[0.06] text-white/75 hover:bg-white/[0.1]"
                              : "border-black/10 bg-black/[0.025] text-black/65 hover:bg-black/[0.05]"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <PanelsTopLeft
                              className="h-4 w-4"
                              aria-hidden="true"
                            />

                            {showPreview
                              ? "Hide stage preview"
                              : "View stage preview"}
                          </span>

                          <motion.span
                            aria-hidden="true"
                            animate={{
                              rotate: showPreview ? 180 : 0,
                            }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.2,
                            }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {showPreview && (
                            <motion.div
                              id={`mobile-preview-${step.id}`}
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      height: 0,
                                      opacity: 0,
                                    }
                              }
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={
                                reduceMotion
                                  ? undefined
                                  : {
                                      height: 0,
                                      opacity: 0,
                                    }
                              }
                              transition={{
                                duration: reduceMotion
                                  ? 0
                                  : 0.28,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div
                                className={`mt-3 min-w-0 overflow-x-clip rounded-2xl border p-2 sm:p-3 ${
                                  highlighted
                                    ? "border-white/10 bg-white/[0.04]"
                                    : "border-black/10 bg-black/[0.015]"
                                }`}
                              >
                                <div className="min-w-0 max-w-full overflow-hidden">
                                  <ProcessVisual
                                    stepId={step.id}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}