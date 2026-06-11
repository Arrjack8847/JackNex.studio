import { useEffect, useMemo, useState } from "react";
import {
  animationConfig,
  type AnimationProfile,
} from "@/config/animation";

type ViewportState = {
  profile: AnimationProfile;
  hasFinePointer: boolean;
};

const defaultViewportState: ViewportState = {
  profile: "mobile",
  hasFinePointer: false,
};

function getViewportState(): ViewportState {
  if (typeof window === "undefined") {
    return defaultViewportState;
  }

  const width = window.innerWidth;
  const profile: AnimationProfile =
    width >= 1024 ? "desktop" : width >= 768 ? "tablet" : "mobile";
  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  return { profile, hasFinePointer };
}

export function useAnimationSettings() {
  const [viewport, setViewport] = useState<ViewportState>(
    defaultViewportState,
  );

  useEffect(() => {
    let frame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setViewport(getViewportState());
      });
    };

    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const tabletQuery = window.matchMedia("(min-width: 768px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const queries = [pointerQuery, tabletQuery, desktopQuery];

    setViewport(getViewportState());
    queries.forEach((query) =>
      query.addEventListener("change", scheduleUpdate),
    );
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      queries.forEach((query) =>
        query.removeEventListener("change", scheduleUpdate),
      );
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return useMemo(() => {
    const profileConfig = animationConfig[viewport.profile];

    return {
      ...profileConfig,
      profile: viewport.profile,
      hasFinePointer: viewport.hasFinePointer,
      enableCursorGlow:
        profileConfig.enableCursorGlow && viewport.hasFinePointer,
      enableParallax: profileConfig.enableParallax && viewport.hasFinePointer,
    };
  }, [viewport]);
}
