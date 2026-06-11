import { motion, useReducedMotion } from "framer-motion";

 type ProcessProgressProps = {
  activeIndex: number;
  total: number;
};

export default function ProcessProgress({
  activeIndex,
  total,
}: ProcessProgressProps) {
  const reduceMotion = useReducedMotion();
  const safeTotal = Math.max(total, 1);
  const progress = Math.min((activeIndex + 1) / safeTotal, 1);

  return (
    <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
        <span>Progress</span>
        <span>
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-black/10">
        <motion.div
          className="h-full origin-left rounded-full bg-black"
          initial={false}
          animate={{ scaleX: progress }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>
    </div>
  );
}
