import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "motion/react";

/**
 * Binds video playback to entire page scroll progress.
 *
 * Desktop: spring-smoothed scroll position drives `video.currentTime`,
 * giving the cinematic "scrub-the-tunnel" feel.
 *
 * Mobile / coarse-pointer: seeking on every scroll tick stalls mobile
 * video decoders (each setter triggers a fresh frame decode). We let
 * the clip auto-loop at a slow rate instead — the overlays still react
 * to scroll, so the page keeps its rhythm without the jank.
 *
 * Fallback duration (56s) matches the 7-clip Túnel de Luz sequence.
 */
export function useGlobalVideoScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
  });

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 1,
    stiffness: 28,
    damping: 32,
    restDelta: 0.0001,
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (isMobile) return;
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

    if (isMobile) {
      video.loop = true;
      video.muted = true;
      video.playbackRate = 0.6;
      const tryPlay = () => {
        video.play().catch(() => {});
      };
      if (video.readyState >= 2) tryPlay();
      else video.addEventListener("loadeddata", tryPlay, { once: true });
      return () => video.removeEventListener("loadeddata", tryPlay);
    }

    video.pause();
    video.currentTime = 0;
  }, [isMobile]);

  return { videoRef, smoothProgress };
}
