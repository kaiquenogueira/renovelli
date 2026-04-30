import { motion, useTransform } from "motion/react";
import { useGlobalVideoScroll } from "../hooks/useGlobalVideoScroll";

/**
 * Full-page fixed video background controlled by scroll.
 *
 * Sits behind all content and scrubs from 0s to its full duration as the
 * user travels from top to bottom. Overlays modulate per chapter so the
 * video stays cinematic in the hero, recedes during dense content
 * sections (services / FAQ), and resurfaces softly at the CTA.
 */
export function GlobalVideoBackground() {
  const { videoRef, smoothProgress } = useGlobalVideoScroll();

  // Subtle zoom — the tunnel keeps "approaching" as the user descends.
  const scale = useTransform(smoothProgress, [0, 1], [1.02, 1.18]);

  // Scroll-mapped video presence (inverse of overlay darkness).
  // 0–18%   hero, video at full strength
  // 18–60%  services + results, video heavily dimmed (content first)
  // 60–82%  FAQ, slight presence
  // 82–100% CTA, video resurfaces toward the end
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.45, 0.65, 0.82, 1],
    [0.4, 0.55, 0.86, 0.88, 0.7, 0.5]
  );

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* ── Scrubbed video ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <video
          ref={videoRef}
          src="/images/bg-video/hero.mp4"
          poster="/images/bg-video/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          preload="auto"
        />
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
