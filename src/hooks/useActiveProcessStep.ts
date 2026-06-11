import { useEffect, useState } from "react";
import type { ProcessStepId } from "@/data/processSteps";

const ACTIVATION_POINT = 0.38;

export function useActiveProcessStep(stepIds: readonly ProcessStepId[]) {
  const [activeStep, setActiveStep] = useState<ProcessStepId>(
    stepIds[0] ?? "discovery",
  );

  useEffect(() => {
    let frameId = 0;

    const getStepElements = () =>
      stepIds
        .map((id) =>
          document.querySelector<HTMLElement>(`[data-process-step="${id}"]`),
        )
        .filter((element): element is HTMLElement => Boolean(element));

    const updateActiveStep = () => {
      frameId = 0;

      const elements = getStepElements();

      if (elements.length === 0) {
        return;
      }

      const activationLine = window.innerHeight * ACTIVATION_POINT;
      let nextStep = elements[0].dataset.processStep as ProcessStepId;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        if (rect.top <= activationLine) {
          nextStep = element.dataset.processStep as ProcessStepId;
        } else {
          break;
        }
      }

      setActiveStep((currentStep) =>
        currentStep === nextStep ? currentStep : nextStep,
      );
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [stepIds]);

  return activeStep;
}
