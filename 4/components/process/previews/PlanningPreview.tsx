import { motion, useReducedMotion } from "framer-motion";
import { FileText, Home, LayoutGrid, Mail, UserRound } from "lucide-react";

const childNodes = [
  { label: "About", icon: UserRound },
  { label: "Projects", icon: LayoutGrid },
  { label: "Process", icon: FileText },
  { label: "Contact", icon: Mail },
];

export default function PlanningPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-[#f7f7f4] p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Website map
          </p>
          <p className="mt-1 text-sm font-semibold text-black">Planned page structure</p>
        </div>
        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/45">
          Organized
        </span>
      </div>

      <div className="relative mx-auto max-w-xl py-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 mx-auto flex w-fit items-center gap-3 rounded-2xl bg-black px-5 py-3 text-white shadow-[0_12px_34px_rgba(0,0,0,0.16)]"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-semibold">Home</span>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="mx-auto h-8 w-px origin-top bg-black/20"
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.12 }}
        />

        <motion.div
          aria-hidden="true"
          className="mx-auto h-px w-[76%] origin-center bg-black/20"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.22 }}
        />

        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
          {childNodes.map((node, index) => {
            const Icon = node.icon;

            return (
              <motion.div
                key={node.label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.28 + index * 0.06 }}
                className="relative rounded-2xl border border-black/10 bg-white p-3 text-center shadow-[0_8px_22px_rgba(0,0,0,0.04)]"
              >
                <span className="absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-black/20" />
                <Icon className="mx-auto h-4 w-4 text-black/60" />
                <p className="mt-2 text-xs font-semibold text-black">{node.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
