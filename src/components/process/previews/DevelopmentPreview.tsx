import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Code2, Monitor, Smartphone } from "lucide-react";

type PreviewMode = "wireframe" | "final";

export default function DevelopmentPreview() {
  const [mode, setMode] = useState<PreviewMode>("final");
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-3 sm:p-4">
      {/* Header */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Live build preview
          </p>

          <p className="mt-0.5 text-sm font-semibold text-white">
            From structure to final design
          </p>
        </div>

        <div className="flex w-fit rounded-full border border-white/10 bg-black/30 p-0.5">
          {(["wireframe", "final"] as PreviewMode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              aria-pressed={mode === item}
              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                mode === item
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                  scale: 0.985,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -8,
                  scale: 0.985,
                }
          }
          transition={{ duration: 0.32 }}
          className="grid gap-3 lg:grid-cols-[1fr_0.35fr]"
        >
          {/* Desktop preview */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-2">
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 h-4 flex-1 rounded-md bg-white/[0.07]" />
            </div>

            {mode === "wireframe" ? (
              <div className="space-y-2 p-3">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 rounded bg-white/20" />

                  <div className="flex gap-1.5">
                    <div className="h-2 w-10 rounded bg-white/10" />
                    <div className="h-2 w-10 rounded bg-white/10" />
                    <div className="h-2 w-10 rounded bg-white/10" />
                  </div>
                </div>

                <div className="grid min-h-[165px] grid-cols-[1fr_0.75fr] gap-2 rounded-lg border border-dashed border-white/20 p-3">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="h-4 w-24 rounded bg-white/15" />
                    <div className="h-7 w-[86%] rounded bg-white/20" />
                    <div className="h-7 w-[62%] rounded bg-white/20" />
                    <div className="h-3 w-[78%] rounded bg-white/10" />
                    <div className="h-7 w-24 rounded-full bg-white/25" />
                  </div>

                  <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.04]" />
                </div>
              </div>
            ) : (
              <div className="relative min-h-[215px] overflow-hidden bg-white p-3 text-black">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-black/[0.06] blur-2xl" />

                <div className="relative flex items-center justify-between text-[8px] font-semibold">
                  <span>JACKNEX STUDIO</span>

                  <span className="rounded-full bg-black px-2.5 py-1 text-white">
                    CONTACT
                  </span>
                </div>

                <div className="relative grid min-h-[170px] grid-cols-[1fr_0.8fr] items-center gap-3">
                  <div>
                    <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                      Creative development
                    </p>

                    <p className="mt-1.5 max-w-[10ch] text-[23px] font-bold leading-[0.9] tracking-[-0.05em]">
                      Ideas built into experiences.
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-black px-2.5 py-1 text-[7px] font-semibold text-white">
                        View work
                      </span>

                      <span className="text-[7px] text-black/45">
                        Scroll to explore
                      </span>
                    </div>
                  </div>

                  <div className="relative h-[135px] overflow-hidden rounded-xl bg-black">
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />

                    <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xl bg-white" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile preview */}
          <div className="flex min-h-[170px] items-center justify-center rounded-xl border border-white/10 bg-black/30 p-2">
            <div className="w-[84px] rounded-[18px] border-[3px] border-white/15 bg-[#111] p-1 shadow-[0_16px_35px_rgba(0,0,0,0.28)]">
              <div
                className={`aspect-[9/18] overflow-hidden rounded-[13px] ${
                  mode === "final" ? "bg-white" : "bg-white/[0.05]"
                }`}
              >
                {mode === "wireframe" ? (
                  <div className="space-y-1.5 p-1.5">
                    <div className="h-2 w-8 rounded bg-white/20" />
                    <div className="mt-5 h-3 w-[80%] rounded bg-white/20" />
                    <div className="h-3 w-[60%] rounded bg-white/20" />
                    <div className="h-12 rounded-lg border border-dashed border-white/15" />
                    <div className="h-4 w-12 rounded-full bg-white/20" />
                  </div>
                ) : (
                  <div className="flex h-full flex-col justify-between p-1.5 text-black">
                    <div className="flex items-center justify-between text-[4px] font-bold">
                      <span>JN</span>
                      <span>MENU</span>
                    </div>

                    <div>
                      <p className="text-[4px] uppercase tracking-[0.18em] text-black/40">
                        Web experiences
                      </p>

                      <p className="mt-1 text-[10px] font-bold leading-[0.9]">
                        Built to stand out.
                      </p>
                    </div>

                    <div className="h-14 rounded-md bg-black" />

                    <div className="rounded-full bg-black px-1.5 py-1 text-center text-[4px] font-semibold text-white">
                      START A PROJECT
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom tags */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/45">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1">
          <Monitor className="h-3 w-3" />
          Desktop
        </span>

        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1">
          <Smartphone className="h-3 w-3" />
          Mobile
        </span>

        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1">
          <Code2 className="h-3 w-3" />
          Responsive build
        </span>
      </div>
    </div>
  );
}