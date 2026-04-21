import { useMemo } from "react";
import { useScroll, useTransform, useSpring } from "motion/react";
import type { RefObject } from "react";
import type { MotionValue } from "motion/react";

interface ScrollSequenceResult {
  /** Spring-smoothed scroll progress (0 → 1) for the container */
  cinematicScroll: MotionValue<number>;
  /** Opacity values for each crossfade layer (excluding the base image at index 0) */
  opacities: MotionValue<number>[];
  /** Scale transform driven by scroll */
  scale: MotionValue<number>;
}

/**
 * Data-driven scroll-based image sequence crossfader.
 * 
 * Automatically calculates evenly-distributed opacity thresholds
 * based on the number of images provided. Adding a new image
 * requires zero changes to the scroll math (OCP compliance).
 */
export function useScrollSequence(
  containerRef: RefObject<HTMLDivElement | null>,
  imageCount: number
): ScrollSequenceResult {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cinematicScroll = useSpring(scrollYProgress, {
    mass: 1,
    stiffness: 25,
    damping: 25,
    restDelta: 0.0001,
  });

  // Calculate evenly-spaced crossfade thresholds dynamically
  // For n images, we need (n-1) crossfade transitions
  const transitionCount = imageCount - 1;
  const thresholds = useMemo(() => {
    const margin = 0.05; // Small margin at start/end
    const usableRange = 1 - 2 * margin;
    const segmentSize = usableRange / transitionCount;

    return Array.from({ length: transitionCount }, (_, i) => ({
      start: margin + i * segmentSize,
      end: margin + (i + 1) * segmentSize,
    }));
  }, [transitionCount]);

  // Create opacity transforms for each crossfade layer
  const opacities = thresholds.map((threshold) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(cinematicScroll, [threshold.start, threshold.end], [0, 1])
  );

  const scale = useTransform(cinematicScroll, [0, 1], [1, 1.25]);

  return { cinematicScroll, opacities, scale };
}
