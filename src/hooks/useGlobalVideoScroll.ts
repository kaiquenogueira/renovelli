import { useRef, useEffect } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "motion/react";

/**
 * Binds video playback to entire page scroll progress.
 *
 * Spring smoothing gives the scrub a cinematic "weight" feel.
 * Fallback duration (56s) matches the 7-clip Túnel de Luz sequence.
 */
export function useGlobalVideoScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 1,
    stiffness: 28,
    damping: 32,
    restDelta: 0.0001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration || 56;
    const targetTime = duration * latest;

    if (Number.isFinite(targetTime) && !isNaN(targetTime)) {
      video.currentTime = Math.min(Math.max(targetTime, 0), duration - 0.05);
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return { videoRef, smoothProgress };
}
