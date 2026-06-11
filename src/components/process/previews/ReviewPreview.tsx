import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Gauge,
  Laptop,
  Smartphone,
  Tablet,
} from "lucide-react";

const checks = [
  { label: "Desktop layout", icon: Laptop },
  { label: "Tablet layout", icon: Tablet },
  { label: "Mobile layout", icon: Smartphone },
  { label: "Performance review", icon: Gauge },
];

export default function ReviewPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[22px] border border-black/10 bg-[#f7f7f4] p-3 sm:p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Quality review
          </p>

          <p className="mt-0.5 text-sm font-semibold text-black">
            Responsive checks
          </p>
        </div>

        <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
          Testing
        </span>
      </div>

      {/* Review checks */}
      <div className="space-y-2">
        {checks.map((check, index) => {
          const Icon = check.icon;

          return (
            <motion.div
              key={check.label}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -12,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.35,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
              className="flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
                <Icon
                  className="h-3.5 w-3.5 text-black/65"
                  aria-hidden="true"
                />
              </div>

              <span className="min-w-0 flex-1 text-sm font-semibold text-black">
                {check.label}
              </span>

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        scale: 0,
                        rotate: -30,
                      }
                }
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                  delay: reduceMotion ? 0 : 0.15 + index * 0.08,
                }}
              >
                <CheckCircle2
                  className="h-4.5 w-4.5 text-black"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Readiness progress */}
      <div className="mt-3 rounded-xl bg-black p-3 text-white">
        <div className="flex items-center justify-between gap-3 text-[11px]">
          <span className="font-semibold">Overall readiness</span>

          <span className="text-right text-white/60">
            Ready for launch
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full origin-left rounded-full bg-white"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.2,
            }}
          />
        </div>
      </div>
    </div>
  );
}