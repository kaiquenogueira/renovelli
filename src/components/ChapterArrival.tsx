import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HexBadge } from "./HexBadge";

/**
 * Capítulo I — A Chegada.
 *
 * Single-viewport hero. Brand mark reveals on mount, then fades out as the
 * user starts to scroll. Once the hero leaves the viewport, Capítulo II
 * (O Ofício) begins naturally with no overlap.
 *
 * The previous version used a 200vh sticky + absolute manifesto, which
 * caused the sticky brand to share viewport space with the manifesto. This
 * version is plain document flow: a single h-screen section.
 */
export function ChapterArrival() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Brand fades + scales as the user scrolls through the hero.
  const brandScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 0.5, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 0.7, 0]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <motion.div
        style={{ opacity: frameOpacity }}
        className="absolute inset-0 w-full h-full flex flex-col pointer-events-none"
      >
        {/* ── Top frame: chapter marker + atelier facts ── */}
        <div className="relative z-20 flex items-start justify-between px-6 md:px-[80px] pt-28 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="chapter-marker"
          >
            <span className="roman">I</span>
            <span>A Chegada</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden md:flex flex-col items-end gap-1 mono-caption"
          >
            <span className="text-[var(--color-brass)]">23°39′40″ S · 46°31′12″ W</span>
            <span>Pinheirinho · Santo André · BR</span>
          </motion.div>
        </div>

        {/* ── Center brand mark ── */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div
            style={{ scale: brandScale, opacity: brandOpacity }}
            className="flex flex-col items-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
              className="font-display italic font-light text-[var(--color-text)] text-[18vw] md:text-[14vw] leading-[0.9] tracking-[-0.06em] text-center px-4 m-0"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
            >
              Renovelli
              <span className="sr-only">
                {" "}— Estética Automotiva Premium em Santo André (SP):
                polimento técnico, vitrificação cerâmica, funilaria OEM e
                Martelinho de Ouro.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex items-center gap-4 md:gap-8 mt-6 md:mt-8"
            >
              <span className="h-px w-12 md:w-24 bg-[var(--color-brass)]/40" />
              <span className="mono-caption text-[var(--color-text-muted)]">
                Estética Automotiva · est. 2014
              </span>
              <span className="h-px w-12 md:w-24 bg-[var(--color-brass)]/40" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom frame: philosophy + scroll cue ── */}
        <div className="relative z-20 flex items-end justify-between px-6 md:px-[80px] pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="max-w-[280px] md:max-w-[420px]"
          >
            <p
              className="font-display italic text-[20px] md:text-[28px] leading-[1.25] text-[var(--color-text)]/85 tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 72, "SOFT" 60' }}
            >
              A originalidade,
              <br />
              <span className="text-[var(--color-brass)]">intocada.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="hidden md:flex flex-col items-end gap-3"
          >
            <HexBadge size={28} led brass={false}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-led)" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </HexBadge>
            <span className="mono-caption">Role para entrar no atelier</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
