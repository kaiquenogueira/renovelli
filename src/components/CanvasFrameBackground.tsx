import { useRef } from "react";
import { useCanvasFrameScrub } from "../hooks/useCanvasFrameScrub";
import type { ProgressListener } from "../hooks/useScrollProgress";

interface CanvasFrameBackgroundProps {
  subscribe: (listener: ProgressListener) => () => void;
}

/**
 * Mobile background: a <canvas> scrubbed through a JPG frame sequence.
 * The poster covers the canvas full-bleed until the first frame paints,
 * so there is never a blank gap while frames stream in.
 */
export function CanvasFrameBackground({ subscribe }: CanvasFrameBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hasPainted } = useCanvasFrameScrub({
    canvasRef,
    subscribe,
    enabled: true,
  });

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <picture>
        <source srcSet="/images/bg-video/poster.avif" type="image/avif" />
        <source srcSet="/images/bg-video/poster.webp" type="image/webp" />
        <img
          src="/images/bg-video/poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hasPainted ? 0 : 1 }}
        />
      </picture>
    </div>
  );
}
