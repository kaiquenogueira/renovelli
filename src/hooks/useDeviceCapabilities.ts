import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const COARSE_QUERY = "(pointer: coarse), (max-width: 768px)";

interface DeviceCapabilities {
  /** Touch / small-viewport device — gets the canvas frame-sequence path. */
  isCoarsePointer: boolean;
  /** OS "reduce motion" preference — gets the static poster path. */
  prefersReducedMotion: boolean;
}

/**
 * Bifurcates the background by device *capability*, not viewport width.
 *
 * The combined `(pointer: coarse), (max-width: 768px)` query mirrors the
 * old inline detection in useGlobalVideoScroll: anything touch-driven or
 * phone-sized can't smooth-seek an inline <video>, so it takes the canvas
 * frame path. `useSmoothScroll` keeps its own narrower `(pointer: coarse)`
 * query on purpose — that decides Lenis, a different concern.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [isCoarsePointer, setIsCoarsePointer] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(COARSE_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(COARSE_QUERY);
    const onChange = () => setIsCoarsePointer(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return { isCoarsePointer, prefersReducedMotion };
}
