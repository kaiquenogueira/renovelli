import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

function swapExt(src: string, ext: string) {
  return src.replace(/\.(jpe?g|png)$/i, ext);
}

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  /** initial slider position 0..1, default 0.5 */
  initial?: number;
}

/**
 * Drag-to-reveal before/after comparator.
 * Perfectly aligned 16:10 comparison layer with touch/pointer support.
 */
export function BeforeAfterSlider({
  before,
  after,
  altBefore,
  altAfter,
  initial = 0.5,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const x = useMotionValue(initial);
  const clipPath = useTransform(x, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const handleLeft = useTransform(x, (v) => `${v * 100}%`);

  useEffect(() => {
    const updateWidth = () => setWidth(containerRef.current?.offsetWidth ?? 0);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0.02), 0.98);
      x.set(ratio);
    },
    [x]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setDragging(true);
      setHasInteracted(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragging) {
        updatePosition(e.clientX);
      }
    },
    [dragging, updatePosition]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore if not captured
      }
    },
    []
  );

  // Auto-tease animation on mount: slide handle gently to prompt interaction
  useEffect(() => {
    if (width === 0 || hasInteracted) return;
    const controls = animate(x, [initial, initial - 0.14, initial + 0.14, initial], {
      duration: 3.0,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.8,
    });
    return () => controls.stop();
  }, [width, initial, x, hasInteracted]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden rounded-sm border border-[var(--color-border-strong)] bg-[var(--color-bg)] cursor-ew-resize select-none touch-none shadow-2xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* AFTER (base layer) */}
      <picture>
        <source srcSet={swapExt(after, ".avif")} type="image/avif" />
        <source srcSet={swapExt(after, ".webp")} type="image/webp" />
        <img
          src={after}
          alt={altAfter}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </picture>

      {/* BEFORE (clipped overlay) */}
      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <picture>
          <source srcSet={swapExt(before, ".avif")} type="image/avif" />
          <source srcSet={swapExt(before, ".webp")} type="image/webp" />
          <img
            src={before}
            alt={altBefore}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
      </motion.div>

      {/* High-contrast luxury badges */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[2.5px] uppercase font-semibold text-[var(--color-text)] bg-black/75 px-3 py-1.5 rounded-sm border border-white/15 backdrop-blur-md shadow-lg">
          Antes
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[2.5px] uppercase font-semibold text-[var(--color-brass)] bg-black/75 px-3 py-1.5 rounded-sm border border-[var(--color-border-accent)] backdrop-blur-md shadow-lg">
          Depois · Renovelli
        </span>
      </div>

      {/* Drag instruction helper (fades on interaction) */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--color-text-secondary)]">
            ↔ Arraste para comparar
          </span>
        </motion.div>
      )}

      {/* Vertical divider + luxury handle */}
      <motion.div
        style={{ left: handleLeft }}
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-brass)] via-[var(--color-led)] to-[var(--color-brass)] z-20 pointer-events-none shadow-[0_0_12px_rgba(232,244,255,0.4)]"
      >
        {/* Handle grip bubble */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-[var(--color-bg)]/90 border border-[var(--color-brass)] flex items-center justify-center transition-transform duration-200 backdrop-blur-md shadow-[0_0_16px_var(--color-brass-glow)] ${
              dragging ? "scale-115 border-[var(--color-led)] shadow-[0_0_20px_var(--color-led-glow)]" : ""
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-brass)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-brass)]"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6, 0)" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

