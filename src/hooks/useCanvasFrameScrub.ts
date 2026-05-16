import { useEffect, useState } from "react";
import type { RefObject } from "react";
import type { ProgressListener } from "./useScrollProgress";

// Must match scripts/extract-frames.mjs output (frame-0001.jpg … frame-0240.jpg).
export const FRAME_COUNT = 240;
const FRAME_BASE = "/images/bg-video/frames/frame-";
const SOURCE_W = 1280;
const SOURCE_H = 720;

const frameUrl = (i: number) =>
  `${FRAME_BASE}${String(i + 1).padStart(4, "0")}.jpg`;

interface CanvasFrameScrubOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  subscribe: (listener: ProgressListener) => () => void;
  enabled: boolean;
}

/**
 * Mobile scrub: paints a pre-decoded JPG sequence onto a <canvas>,
 * indexed by shared scroll progress. iOS Safari won't smooth-seek an
 * inline <video> by `currentTime`; a frame sequence on canvas is the
 * proven workaround (GPU compositing, no decoder seek).
 *
 * Frames stream in parallel; while a target frame is still loading we
 * fall back to the nearest lower loaded frame (ultimately frame 0), so
 * scrubbing works against a partially-loaded set with no blank gaps.
 * A poster covers everything until the first paint.
 *
 * Returns `hasPainted` so the host can fade out the poster once the
 * first real frame is on screen.
 */
export function useCanvasFrameScrub({
  canvasRef,
  subscribe,
  enabled,
}: CanvasFrameScrubOptions): { hasPainted: boolean } {
  const [hasPainted, setHasPainted] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);

    let lastDrawnIndex = -1;
    let painted = false;
    let progress = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    const draw = (index: number) => {
      const img = images[index];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / SOURCE_W, ch / SOURCE_H);
      const dw = SOURCE_W * scale;
      const dh = SOURCE_H * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawnIndex = index;
      if (!painted) {
        painted = true;
        setHasPainted(true);
      }
    };

    // Nearest loaded frame at or below the target (then frame 0).
    const resolveIndex = (target: number) => {
      for (let i = target; i >= 0; i--) {
        if (loaded[i]) return i;
      }
      return loaded[0] ? 0 : -1;
    };

    const paint = () => {
      const target = Math.round(progress * (FRAME_COUNT - 1));
      const index = resolveIndex(target);
      if (index >= 0 && index !== lastDrawnIndex) draw(index);
    };

    resizeCanvas();

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeCanvas();
        lastDrawnIndex = -1;
        paint();
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded[i] = true;
        images[i] = img;
        // First frame in, or this is the frame we currently want.
        if (lastDrawnIndex === -1 || i <= Math.round(progress * (FRAME_COUNT - 1))) {
          paint();
        }
      };
      img.onerror = () => {
        loaded[i] = false;
      };
      img.src = frameUrl(i);
    }

    const unsubscribe = subscribe((p) => {
      progress = p;
      paint();
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [canvasRef, subscribe, enabled]);

  return { hasPainted };
}
