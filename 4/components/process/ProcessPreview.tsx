import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  processSteps,
  type ProcessStepId,
} from "@/data/processSteps";
import DiscoveryPreview from "@/components/process/previews/DiscoveryPreview";
import PlanningPreview from "@/components/process/previews/PlanningPreview";
import DevelopmentPreview from "@/components/process/previews/DevelopmentPreview";
import ReviewPreview from "@/components/process/previews/ReviewPreview";
import LaunchPreview from "@/components/process/previews/LaunchPreview";

export function ProcessVisual({ stepId }: { stepId: ProcessStepId }) {
  switch (stepId) {
    case "discovery":
      return <DiscoveryPreview />;
    case "planning":
      return <PlanningPreview />;
    case "development":
      return <DevelopmentPreview />;
    case "review":
      return <ReviewPreview />;
    case "launch":
      return <LaunchPreview />;
    default:
      return <DiscoveryPreview />;
  }
}

export default function ProcessPreview({
  activeStep,
}: {
  activeStep: ProcessStepId;
}) {
  const reduceMotion = useReducedMotion();
  const step = processSteps.find((item) => item.id === activeStep) ?? processSteps[0];
  const Icon = step.icon;
  const featured = Boolean(step.featured);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={step.id}
        initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.985 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full overflow-hidden rounded-[28px] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-7 xl:rounded-[34px] xl:p-9 ${
          featured
            ? "border-black bg-black text-white"
            : "border-black/10 bg-white/90 text-black backdrop-blur-xl"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 ${
            featured
              ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]"
              : "bg-[linear-gradient(135deg,rgba(0,0,0,0.025),transparent_42%)]"
          }`}
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                  featured
                    ? "border-white/15 bg-white/10 text-white"
                    : "border-black/10 bg-black/[0.04] text-black"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      featured ? "text-white/45" : "text-black/35"
                    }`}
                  >
                    Step {step.number}
                  </span>
                  <span
                    className={`h-1 w-1 rounded-full ${
                      featured ? "bg-white/30" : "bg-black/25"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      featured ? "text-white/45" : "text-black/35"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] sm:text-3xl xl:text-[2.5rem]">
                  {step.title}
                </h3>
              </div>
            </div>

            <span
              className={`w-fit rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                featured
                  ? "border-white/15 bg-white/[0.06] text-white/65"
                  : "border-black/10 bg-black/[0.03] text-black/50"
              }`}
            >
              {step.duration}
            </span>
          </div>

          <p
            className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${
              featured ? "text-white/65" : "text-black/58"
            }`}
          >
            {step.description}
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {step.deliverables.map((deliverable) => (
              <div
                key={deliverable}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium ${
                  featured
                    ? "border-white/10 bg-white/[0.05] text-white/72"
                    : "border-black/10 bg-black/[0.025] text-black/65"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    featured ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  <Check className="h-3 w-3" />
                </span>
                <span>{deliverable}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <ProcessVisual stepId={step.id} />
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
