import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function getSystemReducedMotionPreference() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion() {
  const framerPreference = useReducedMotion();
  const [systemPreference, setSystemPreference] = useState(
    getSystemReducedMotionPreference,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setSystemPreference(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return Boolean(framerPreference || systemPreference);
}
