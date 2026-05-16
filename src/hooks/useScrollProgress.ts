import { useEffect, useMemo, useRef } from "react";
import { useMotionValue } from "motion/react";
import type { MotionValue } from "motion/react";

export type ProgressListener = (progress: number) => void;

interface ScrollProgressResult {
  /** Lerp-smoothed page progress (0 → 1) for declarative `useTransform`. */
  progress: MotionValue<number>;
  /** Register an imperative per-frame consumer; returns an unsubscribe. */
  subscribe: (listener: ProgressListener) => () => void;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/**
 * Single source of scroll progress for the cinematic background.
 *
 * Why one rAF reading `window.scrollY` directly: Lenis is built with
 * defaults (no wrapper/content overrides) so it drives the real document
 * scroll — `window.scrollY` is already the Lenis-smoothed value on
 * desktop, and native momentum on coarse-pointer (Lenis is skipped
 * there). Stacking motion's `useSpring` on top of that produced the
 * "video keeps drifting ~1s after you stop" feel. Here a single light
 * lerp (factor 0.2, snap when |diff| < 0.01) is the *only* smoothing on
 * top of Lenis, so the scrub tracks scroll tightly with no spring tail.
 *
 * The same lerped value feeds both the declarative overlay choreography
 * (via the `progress` MotionValue) and the imperative video/canvas scrub
 * (via `subscribe`) — one loop, everything in sync.
 */
export function useScrollProgress(active: boolean): ScrollProgressResult {
  const progress = useMotionValue(0);
  const listeners = useRef(new Set<ProgressListener>());

  const subscribe = useMemo(
    () => (listener: ProgressListener) => {
      listeners.current.add(listener);
      return () => {
        listeners.current.delete(listener);
      };
    },
    []
  );

  useEffect(() => {
    if (!active) {
      progress.set(0);
      return;
    }

    let raf = 0;
    let current = 0;

    const tick = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;

      const diff = raw - current;
      // Snap on the last sliver so there is no spring-like tail.
      current = Math.abs(diff) < 0.01 ? raw : current + diff * 0.2;

      progress.set(current);
      listeners.current.forEach((l) => l(current));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, progress]);

  return { progress, subscribe };
}
