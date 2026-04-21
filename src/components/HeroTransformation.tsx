import { motion } from "motion/react";
import { useScrollSequence } from "../hooks/useScrollSequence";
import { useMouseReflection } from "../hooks/useMouseReflection";
import { ScrollSection } from "./ScrollSection";
import { useRef } from "react";

const SEQUENCE = [
  "/images/seq-1.png",
  "/images/seq-2.png",
  "/images/seq-3.png",
  "/images/seq-4.png"
];

/**
 * Hero section with a cinematic image transformation sequence.
 * 
 * Refactored:
 * - Scroll logic extracted to useScrollSequence hook.
 * - Mouse reflection logic extracted to useMouseReflection hook.
 * - Foreground text sections use reusable ScrollSection component.
 */
export function HeroTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Get scroll sequence math
  const { scale, opacities } = useScrollSequence(containerRef, SEQUENCE.length);

  // 2. Get mouse reflection visual effects
  const {
    backgroundGlow,
    sheenX,
    handlePointerMove,
    handlePointerLeave
  } = useMouseReflection();

  return (
    <div ref={containerRef} className="relative bg-[var(--color-bg-dark)]">

      {/* ================= BACKGROUND LAYER ================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--color-bg-dark)] z-0">

        <h1 className="main-title-bg z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !text-[15vw]">R-EVOLVE</h1>

        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Seq 0: Always at bottom */}
          <img src={SEQUENCE[0]} className="absolute inset-0 w-full h-full object-cover grayscale-[40%] opacity-50" alt="Renovelli - Estado inicial do processo de restauração automotiva" />

          {/* Seq 1, 2: Crossfades mapped to dynamic thresholds */}
          {opacities.slice(0, 2).map((opacity, idx) => (
            <motion.img
              key={`seq=${idx + 1}`}
              src={SEQUENCE[idx + 1]}
              style={{ opacity }}
              className="absolute inset-0 w-full h-full object-cover"
              alt={`Processo de restauração Renovelli - Etapa de detalhamento ${idx + 1}`}
            />
          ))}

          {/* Seq 3: Final image with reflection overlays */}
          <motion.div style={{ opacity: opacities[2] }} className="absolute inset-0 w-full h-full">
            <img src={SEQUENCE[3]} className="w-full h-full object-cover" alt="Resultado final premium Renovelli - Vitrificação e polimento de alto brilho" />

            {/* Ambient edge shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_var(--color-border-accent)] pointer-events-none mix-blend-multiply" />

            {/* Mouse Reactive Glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{ background: backgroundGlow }}
            />

            {/* Linear Sheen moving with mouse */}
            <motion.div
              className="absolute inset-0 w-[200%] -left-[50%] pointer-events-none mix-blend-soft-light opacity-80"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 55%, transparent 65%)",
                x: sheenX
              }}
            />
          </motion.div>
        </motion.div>

        {/* Global Dark Overlays for legibility */}
        <div className="absolute inset-0 bg-[var(--color-bg-dark)]/40 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/80 to-transparent pointer-events-none" />
      </div>

      {/* ================= FOREGROUND LAYER ================= */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 mt-[-100vh]">
        <ScrollSection
          label="Funilaria & Recuperação"
          title="Corrigimos qualquer dano estrutural, grandes amassados e imperfeições."
          titleClassName="justify-center font-display font-light text-[32px] md:text-[48px] leading-[1.1] tracking-[-1px] text-white"
        />

        <ScrollSection
          label="Martelinho de Ouro"
          title="Técnica minuciosa de desamassar sem danificar a pintura original do veículo."
          titleClassName="justify-center font-display font-light text-[32px] md:text-[48px] leading-[1.1] tracking-[-1px] text-white"
        />

        <ScrollSection
          label="Pintura Premium"
          title="Acabamento perfeito, reproduzindo a cor original com máximo brilho e durabilidade."
          titleClassName="justify-center font-display font-light text-[32px] md:text-[48px] leading-[1.1] tracking-[-1px] text-white"
        />

        <ScrollSection
          label="Higienização & Detalhamento"
          title="Transformamos seu carro numa verdadeira obra prima."
          titleClassName="justify-center font-display font-bold text-[36px] md:text-[56px] leading-[1.1] tracking-[-2px] text-[var(--color-accent)]"
          isAccent
        />
      </div>
    </div>
  );
}
