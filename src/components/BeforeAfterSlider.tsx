import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

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
 * The "after" image is fully painted; the "before" image is clipped
 * by a horizontal inset that the user drags via a vertical handle.
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

  const x = useMotionValue(initial);
  const clipPath = useTransform(x, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const handleLeft = useTransform(x, (v) => `${v * 100}%`);

  useEffect(() => {
    const updateWidth = () => setWidth(containerRef.current?.offsetWidth ?? 0);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleStart = useCallback(() => setDragging(true), []);
  const handleEnd = useCallback(() => setDragging(false), []);

  const onPointerMove = useCallback(
    (clientX: number) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      x.set(ratio);
    },
    [dragging, x]
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => onPointerMove(e.clientX);
    const moveTouch = (e: TouchEvent) => {
      if (e.touches[0]) onPointerMove(e.touches[0].clientX);
    };
    const end = () => setDragging(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", moveTouch);
    window.addEventListener("touchend", end);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchmove", moveTouch);
      window.removeEventListener("touchend", end);
    };
  }, [dragging, onPointerMove]);

  // Auto-tease animation on mount: slide handle from 0.4 to 0.6 once
  useEffect(() => {
    if (width === 0) return;
    const controls = animate(x, [initial, initial - 0.12, initial + 0.12, initial], {
      duration: 3.2,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.6,
    });
    return () => controls.stop();
  }, [width, initial, x]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg)] cursor-ew-resize select-none"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* AFTER (base layer) */}
      <img
        src={after}
        alt={altAfter}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* BEFORE (clipped overlay) */}
      <motion.img
        src={before}
        alt={altBefore}
        draggable={false}
        style={{ clipPath }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Mono labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[3px] uppercase text-[var(--color-text)]/90 bg-[var(--color-bg)]/70 px-2 py-1 backdrop-blur-sm">
          Antes
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[3px] uppercase text-[var(--color-brass)] bg-[var(--color-bg)]/70 px-2 py-1 backdrop-blur-sm">
          Depois
        </span>
      </div>

      {/* Vertical divider + handle */}
      <motion.div
        style={{ left: handleLeft }}
        className="absolute top-0 bottom-0 w-px bg-[var(--color-led)] z-20 pointer-events-none"
        animate={{ opacity: dragging ? 1 : 0.85 }}
      >
        {/* Handle bubble */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative w-12 h-12 flex items-center justify-center"
            style={{ filter: "drop-shadow(0 0 12px var(--color-led-glow))" }}
          >
            <svg width="48" height="48" viewBox="0 0 100 115.47" className="absolute inset-0">
              <polygon
                points="50,2 96,28.86 96,86.6 50,113.46 4,86.6 4,28.86"
                fill="var(--color-bg)"
                stroke="var(--color-led)"
                strokeWidth="2"
              />
            </svg>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-led)"
              strokeWidth="2.2"
              className="relative z-10"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(0 0)" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
