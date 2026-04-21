import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const SHOWCASE_IMAGES = [
  {
    src: "/images/instagram-hd/polimento-vitri-showcase.jpg",
    alt: "Audi A4 — Proteção de Pintura: Antes e Depois",
    label: "Proteção de Pintura",
    car: "Audi A4",
  },
  {
    src: "/images/instagram/insta-2.jpg",
    alt: "Citroën — Sem Vitrificação vs Com Vitrificação",
    label: "Vitrificação",
    car: "Citroën C4",
  },
];

/**
 * Before & After showcase — one highlighted image at a time
 * with dot navigation, consistent sizing, and smooth transitions.
 */
export function BeforeAfter() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    if (i !== active) setActive(i);
  }, [active]);

  const goNext = useCallback(() => {
    setActive((p) => (p + 1) % SHOWCASE_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setActive((p) => (p - 1 + SHOWCASE_IMAGES.length) % SHOWCASE_IMAGES.length);
  }, []);

  const current = SHOWCASE_IMAGES[active];

  return (
    <section className="py-32 px-4 md:px-[80px] bg-transparent relative z-20">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <p className="section-label">Comparativo</p>
          <h2 className="section-heading text-[40px] md:text-[56px] mb-6">
            O Antes e <span className="font-bold">Depois</span>
          </h2>
          <p className="text-[var(--color-muted)] text-sm tracking-[1px] uppercase">
            Resultados reais dos nossos serviços.
          </p>
        </div>

        {/* ── Image Showcase ──────────────────────────────────── */}
        <div className="relative group">
          {/* Fixed-ratio container for consistent sizing */}
          <div className="relative w-full aspect-video overflow-hidden border border-[var(--color-border)] shadow-[0_20px_50px_var(--color-border-accent)] bg-black">
            {/* ── Drag/Swipe Container ──────────────────────────── */}
            <motion.div 
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) goNext();
                if (info.offset.x > 50) goPrev();
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
              </AnimatePresence>
            </motion.div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Info overlay — bottom */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none"
              >
                <p className="text-[var(--color-accent)] text-[10px] uppercase tracking-[3px] font-bold mb-1">
                  {current.label}
                </p>
                <p className="text-white text-lg md:text-xl font-light tracking-wide">
                  {current.car}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* ── Arrow Navigation ─────────────────────────────── */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-200 cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100"
              aria-label="Anterior"
            >
              <svg width="20" height="20" className="md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-200 cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100"
              aria-label="Próximo"
            >
              <svg width="20" height="20" className="md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* ── Dot indicators ────────────────────────────────── */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {SHOWCASE_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer border ${
                  i === active
                    ? "w-8 bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]"
                    : "w-2 bg-white/10 border-white/20 hover:bg-white/30"
                }`}
                aria-label={`Ver ${SHOWCASE_IMAGES[i].car}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
