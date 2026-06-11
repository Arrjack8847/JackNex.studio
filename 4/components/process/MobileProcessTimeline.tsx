import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  processSteps,
  type ProcessStepId,
} from "@/data/processSteps";
import { ProcessVisual } from "@/components/process/ProcessPreview";

export default function MobileProcessTimeline() {
  const [openStep, setOpenStep] = useState<ProcessStepId>("discovery");
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative pl-8 lg:hidden">
      <div className="absolute bottom-7 left-[11px] top-7 w-px bg-black/12" />

      <div className="space-y-4">
        {processSteps.map((step) => {
          const open = openStep === step.id;
          const featured = Boolean(step.featured);
          const Icon = step.icon;

          return (
            <article key={step.id} className="relative">
              <span
                className={`absolute -left-8 top-6 z-10 flex h-[23px] w-[23px] items-center justify-center rounded-full border-4 border-white ${
                  open ? "bg-black" : "bg-black/20"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-white" : "bg-white/80"}`} />
              </span>

              <div
                className={`overflow-hidden rounded-[24px] border transition-colors ${
                  featured
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white/90 text-black"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenStep(step.id)}
                  aria-expanded={open}
                  aria-controls={`mobile-process-${step.id}`}
                  className="flex w-full items-center gap-3 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      featured
                        ? "border-white/15 bg-white/10"
                        : "border-black/10 bg-black/[0.04]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        featured ? "text-white/45" : "text-black/35"
                      }`}
                    >
                      {step.number} · {step.label}
                    </p>
                    <h3 className="mt-1 text-base font-bold tracking-tight">{step.title}</h3>
                  </div>

                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  >
                    <ChevronDown className={`h-5 w-5 ${featured ? "text-white/60" : "text-black/45"}`} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`mobile-process-${step.id}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`border-t p-5 pt-4 ${featured ? "border-white/10" : "border-black/10"}`}>
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                              featured ? "text-white/45" : "text-black/40"
                            }`}
                          >
                            Estimated phase
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                              featured
                                ? "border-white/15 text-white/65"
                                : "border-black/10 text-black/55"
                            }`}
                          >
                            {step.duration}
                          </span>
                        </div>

                        <p className={`mt-4 text-sm leading-6 ${featured ? "text-white/65" : "text-black/58"}`}>
                          {step.description}
                        </p>

                        <div className="mt-4 space-y-2">
                          {step.deliverables.map((deliverable) => (
                            <div key={deliverable} className="flex items-center gap-2 text-xs font-medium">
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                  featured ? "bg-white text-black" : "bg-black text-white"
                                }`}
                              >
                                <Check className="h-3 w-3" />
                              </span>
                              <span className={featured ? "text-white/75" : "text-black/65"}>{deliverable}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5">
                          <ProcessVisual stepId={step.id} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
