import { motion, useReducedMotion } from "framer-motion";
import type { ProcessStep, ProcessStepId } from "@/data/processSteps";

 type ProcessNavigationProps = {
  steps: ProcessStep[];
  activeStep: ProcessStepId;
  onSelect: (id: ProcessStepId) => void;
};

export default function ProcessNavigation({
  steps,
  activeStep,
  onSelect,
}: ProcessNavigationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <nav aria-label="Website project process" className="mt-8 space-y-2">
      {steps.map((step) => {
        const active = step.id === activeStep;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(step.id)}
            aria-current={active ? "step" : undefined}
            className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
              active ? "bg-black text-white" : "text-black/45 hover:bg-black/[0.04] hover:text-black"
            }`}
          >
            <span
              className={`w-8 shrink-0 text-xs font-semibold tracking-[0.16em] ${
                active ? "text-white/75" : "text-black/35"
              }`}
            >
              {step.number}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold tracking-tight">
                {step.title}
              </span>
              <span
                className={`mt-0.5 block text-[10px] uppercase tracking-[0.18em] ${
                  active ? "text-white/50" : "text-black/35"
                }`}
              >
                {step.label}
              </span>
            </span>

            <motion.span
              aria-hidden="true"
              className={`h-1.5 rounded-full ${active ? "bg-white" : "bg-black/20"}`}
              initial={false}
              animate={{ width: active ? 28 : 6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.3 }}
            />
          </button>
        );
      })}
    </nav>
  );
}
