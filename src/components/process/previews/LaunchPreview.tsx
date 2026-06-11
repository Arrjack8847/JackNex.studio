import { motion, useReducedMotion } from "framer-motion";
import { Check, ExternalLink, Rocket } from "lucide-react";

const deploymentSteps = [
  "Production build completed",
  "Domain and hosting connected",
  "Final website checks passed",
  "Post-launch guidance prepared",
];

export default function LaunchPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-[#f7f7f4] p-4 sm:p-5">
      <div className="relative rounded-[20px] bg-black p-5 text-white sm:p-6">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Deployment status</p>
            <p className="mt-2 text-xl font-bold tracking-tight">Your website is ready.</p>
          </div>
          <motion.div
            initial={reduceMotion ? false : { scale: 0.8, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 17 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black"
          >
            <Rocket className="h-5 w-5" />
          </motion.div>
        </div>

        <div className="relative mt-6 space-y-2.5">
          {deploymentSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: reduceMotion ? 0 : index * 0.09 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-xs font-medium text-white/78">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Status</p>
          <p className="mt-1 text-sm font-semibold text-black">Live and supported</p>
        </div>
        <ExternalLink className="h-4 w-4 text-black/55" />
      </div>
    </div>
  );
}
