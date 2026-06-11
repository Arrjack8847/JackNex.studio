import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const fields = [
  { label: "Project type", value: "Creative portfolio" },
  { label: "Main goal", value: "Showcase visual projects" },
  { label: "Style", value: "Modern and interactive" },
  { label: "Expected timeline", value: "3–4 weeks" },
];

export default function DiscoveryPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[24px] border border-black/10 bg-[#f7f7f4] p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
            New project brief
          </p>
          <p className="mt-1 text-sm font-semibold text-black">Discovery summary</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.07 }}
            className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/35">
              {field.label}
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-black">
              {field.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-dashed border-black/15 bg-white/60 px-4 py-3 text-xs text-black/55">
        <span className="h-2 w-2 rounded-full bg-black" />
        Clear requirements before design begins.
      </div>
    </div>
  );
}
