import { motion } from "motion/react";
import { useScrollSequence } from "../hooks/useScrollSequence";
import { ScrollSection } from "./ScrollSection";
import { useRef } from "react";

/**
 * Hero section with cinematic scroll-bound text reveals.
 *
 * The video background is now global (GlobalVideoBackground), so this
 * component only manages the sticky R-EVOLVE title and the foreground
 * text sections that reveal as the user scrolls.
 */
export function HeroTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Still use scroll sequence for the scale of the title
  const { scale } = useScrollSequence(containerRef, 4, [1, 1.15]);

  return (
    <div ref={containerRef} className="relative">

      {/* ================= STICKY TITLE LAYER ================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
        <motion.h1
          className="main-title-bg"
          style={{ scale }}
        >
          R-EVOLVE
        </motion.h1>

        {/* Overlay gradients for text legibility on top of global video */}
        <div className="absolute inset-0 bg-[var(--color-bg-dark)]/30 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/60 to-transparent pointer-events-none" />
      </div>

      {/* ================= FOREGROUND TEXT LAYER ================= */}
      {/* pt-[100vh] ensures the first full viewport is ONLY the cinematic video.
          Text cards reveal as the user scrolls down. */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 mt-[-100vh] pb-[50vh]">

        <div className="pt-[100vh]">
          <ScrollSection
            label="Funilaria & Recuperação"
            title="Corrigimos qualquer dano estrutural, grandes amassados e imperfeições."
            titleClassName="justify-center font-display font-light text-[24px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.5px] md:tracking-[-1px] text-white"
          />
        </div>

        <div className="mt-[60vh]">
          <ScrollSection
            label="Martelinho de Ouro"
            title="Técnica minuciosa de desamassar sem danificar a pintura original do veículo."
            titleClassName="justify-center font-display font-light text-[24px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.5px] md:tracking-[-1px] text-white"
          />
        </div>

        <div className="mt-[60vh]">
          <ScrollSection
            label="Pintura Premium"
            title="Acabamento perfeito, reproduzindo a cor original com máximo brilho e durabilidade."
            titleClassName="justify-center font-display font-light text-[24px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.5px] md:tracking-[-1px] text-white"
          />
        </div>

        <div className="mt-[60vh]">
          <ScrollSection
            label="Higienização & Detalhamento"
            title="Transformamos seu carro numa verdadeira obra prima."
            titleClassName="justify-center font-display font-bold text-[28px] md:text-[48px] lg:text-[56px] leading-[1.1] tracking-[-1px] md:tracking-[-2px] text-[var(--color-accent)]"
            isAccent
          />
        </div>
      </div>
    </div>
  );
}
