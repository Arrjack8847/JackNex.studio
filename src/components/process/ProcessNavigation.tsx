import { motion, useReducedMotion } from "framer-motion";
import type {
  ProcessStep,
  ProcessStepId,
} from "@/data/processSteps";

type ProcessNavigationProps = {
  steps: readonly ProcessStep[];
  activeStep: ProcessStepId;
  onSelect: (id: ProcessStepId) => void;
  compact?: boolean;
};

export default function ProcessNavigation({
  steps,
  activeStep,
  onSelect,
  compact = false,
}: ProcessNavigationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Website project process"
      className={compact ? "mt-3 space-y-1" : "mt-6 space-y-1.5"}
    >
      {steps.map((step) => {
        const active = step.id === activeStep;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(step.id)}
            aria-current={active ? "step" : undefined}
            className={`group relative flex w-full items-center overflow-hidden rounded-xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
              compact
                ? "min-h-[40px] gap-2 px-2.5 py-1.5"
                : "min-h-[50px] gap-3 px-3 py-2"
            } ${
              active
                ? "bg-black text-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                : "text-black/45 hover:bg-black/[0.04] hover:text-black"
            }`}
          >
            <span
              className={`shrink-0 font-semibold tracking-[0.16em] ${
                compact ? "w-6 text-[9px]" : "w-7 text-[10px]"
              } ${active ? "text-white/75" : "text-black/35"}`}
            >
              {step.number}
            </span>

            <span className="min-w-0 flex-1">
              <span
                className={`block truncate font-semibold tracking-tight ${
                  compact ? "text-xs" : "text-[13px]"
                }`}
              >
                {step.title}
              </span>

              <span
                className={`block uppercase tracking-[0.18em] ${
                  compact
                    ? "mt-px text-[7px]"
                    : "mt-0.5 text-[9px]"
                } ${active ? "text-white/50" : "text-black/35"}`}
              >
                {step.label}
              </span>
            </span>

            <motion.span
              aria-hidden="true"
              className={`shrink-0 rounded-full ${
                compact ? "h-1" : "h-1.5"
              } ${active ? "bg-white" : "bg-black/20"}`}
              initial={false}
              animate={{
                width: active
                  ? compact
                    ? 16
                    : 22
                  : compact
                    ? 4
                    : 5,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.3,
                      ease: "easeOut",
                    }
              }
            />
          </button>
        );
      })}
    </nav>
  );
}