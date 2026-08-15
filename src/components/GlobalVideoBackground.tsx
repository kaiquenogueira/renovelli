import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useDeviceCapabilities } from "../hooks/useDeviceCapabilities";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useVideoScrub } from "../hooks/useVideoScrub";
import { CanvasFrameBackground } from "./CanvasFrameBackground";

/**
 * Full-page fixed background scrubbed by page scroll.
 *
 * Bifurcates by device capability, not viewport width:
 *  • reduced-motion → static poster only (no rAF, no scrub)
 *  • coarse-pointer  → <canvas> JPG frame sequence (iOS-safe scrub)
 *  • desktop         → <video> currentTime scrub
 *
 * All three share one rAF progress source (useScrollProgress), so the
 * overlay choreography below stays in sync with whichever media path is
 * active. Overlays modulate per chapter so the background stays
 * cinematic in the hero, recedes during dense content (services / FAQ),
 * and resurfaces softly at the CTA.
 */
export function GlobalVideoBackground() {
  const { isCoarsePointer, prefersReducedMotion } = useDeviceCapabilities();
  const { progress, subscribe } = useScrollProgress(!prefersReducedMotion);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isDesktopVideo = !prefersReducedMotion && !isCoarsePointer;
  const isCanvas = !prefersReducedMotion && isCoarsePointer;

  useVideoScrub({ videoRef, subscribe, enabled: isDesktopVideo });

  // Subtle zoom — the tunnel keeps "approaching" as the user descends.
  // Reduced-motion pins progress at 0, so this resolves to a static 1.02.
  const scale = useTransform(progress, [0, 1], [1.02, 1.18]);

  // Scroll-mapped background presence (inverse of overlay darkness).
  // 0–15%   hero: cinematic atmospheric presence
  // 15–70%  services & results: deep dimming for peak text legibility
  // 70–85%  FAQ: clean high-contrast surface
  // 85–100% CTA: gentle atelier glow resurfacing
  const overlayOpacity = useTransform(
    progress,
    [0, 0.15, 0.35, 0.7, 0.85, 1],
    [0.45, 0.65, 0.90, 0.92, 0.85, 0.62]
  );

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* ── Scrubbed media ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        {isDesktopVideo && (
          <video
            ref={videoRef}
            src="/images/bg-video/hero.mp4"
            poster="/images/bg-video/poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
          />
        )}

        {isCanvas && <CanvasFrameBackground subscribe={subscribe} />}

        {prefersReducedMotion && (
          <picture>
            <source srcSet="/images/bg-video/poster.avif" type="image/avif" />
            <source srcSet="/images/bg-video/poster.webp" type="image/webp" />
            <img
              src="/images/bg-video/poster.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        )}
      </motion.div>

      {/* ── Overlay 1: scroll-reactive darkness ── */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-bg)] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Overlay 2: cool blue tint to push the LED-tunnel feel ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1218]/30 via-transparent to-[#0A0E14]/40 pointer-events-none mix-blend-overlay" />

      {/* ── Overlay 3: vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--color-bg) 95%)",
        }}
      />

      {/* ── Overlay 4: bottom blackout for legibility on long sections ── */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />

      {/* ── Overlay 5: very faint hex texture, multiplied ── */}
      <div className="hex-bg" />

      {/* ── Overlay 6: subtle film grain ── */}
      <div className="noise-overlay" />
    </div>
  );
}
