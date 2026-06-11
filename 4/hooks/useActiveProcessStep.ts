import { useEffect, useState } from "react";
import type { ProcessStepId } from "@/data/processSteps";

export function useActiveProcessStep(stepIds: readonly ProcessStepId[]) {
  const [activeStep, setActiveStep] = useState<ProcessStepId>(
    stepIds[0] ?? "discovery",
  );
  useEffect(() => {
    const visibleEntries = new Map<
      ProcessStepId,
      IntersectionObserverEntry
    >();
    const elements = stepIds
      .map((id) =>
        document.querySelector<HTMLElement>(`[data-process-step="${id}"]`),
      )
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute(
            "data-process-step",
          ) as ProcessStepId | null;

          if (!id) {
            return;
          }

          if (entry.isIntersecting) {
            visibleEntries.set(id, entry);
          } else {
            visibleEntries.delete(id);
          }
        });

        const viewportCenter = window.innerHeight / 2;
        const closestEntry = Array.from(visibleEntries.values()).sort(
          (first, second) => {
            const firstCenter =
              first.boundingClientRect.top + first.boundingClientRect.height / 2;
            const secondCenter =
              second.boundingClientRect.top + second.boundingClientRect.height / 2;

            return (
              Math.abs(firstCenter - viewportCenter) -
              Math.abs(secondCenter - viewportCenter)
            );
          },
        )[0];

        const nextStep = closestEntry?.target.getAttribute(
          "data-process-step",
        ) as ProcessStepId | null;

        if (nextStep) {
          setActiveStep(nextStep);
        }
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: "-15% 0px -30% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      visibleEntries.clear();
      observer.disconnect();
    };
  }, [stepIds]);

  return activeStep;
}
