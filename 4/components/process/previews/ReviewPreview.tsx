import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Gauge, Laptop, Smartphone, Tablet } from "lucide-react";

const checks = [
  { label: "Desktop layout", icon: Laptop },
  { label: "Tablet layout", icon: Tablet },
  { label: "Mobile layout", icon: Smartphone },
  { label: "Performance review", icon: Gauge },
];

export default function ReviewPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[24px] border border-black/10 bg-[#f7f7f4] p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Quality review</p>
          <p className="mt-1 text-sm font-semibold text-black">Responsive checks</p>
        </div>
        <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Testing</span>
      </div>

      <div className="space-y-3">
        {checks.map((check, index) => {
          const Icon = check.icon;

          return (
            <motion.div
              key={check.label}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_8px_22px_rgba(0,0,0,0.04)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05]">
                <Icon className="h-4 w-4 text-black/65" />
              </div>
              <span className="flex-1 text-sm font-semibold text-black">{check.label}</span>
              <motion.div
                initial={reduceMotion ? false : { scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 18, delay: reduceMotion ? 0 : 0.15 + index * 0.08 }}
              >
                <CheckCircle2 className="h-5 w-5 text-black" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-black p-4 text-white">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">Overall readiness</span>
          <span className="text-white/60">Ready for launch</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full origin-left rounded-full bg-white"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 }}
          />
        </div>
      </div>
    </div>
  );
}
