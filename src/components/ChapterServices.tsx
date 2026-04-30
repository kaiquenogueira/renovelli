import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { ChapterHeader } from "./ChapterHeader";

const services = [
  {
    code: "01",
    title: "Polimento & Vitrificação",
    blurb:
      "Correção de pintura em três etapas e proteção nano-cerâmica. Brilho profundo, hidrofobia, durabilidade de até 3 anos.",
    detail: "3 etapas · ceramic 9H · 3 anos",
  },
  {
    code: "02",
    title: "Funilaria de Precisão",
    blurb:
      "Reparo estrutural com colorimetria computadorizada. A peça reparada se torna invisível ao olho — e ao espectrofotômetro.",
    detail: "OEM · colorimetria · 0,001 mm",
  },
  {
    code: "03",
    title: "Martelinho de Ouro",
    blurb:
      "Técnica artesanal de remoção de amassados sem repintura. Preserva 100% da pintura original e o valor de revenda.",
    detail: "PDR · sem massa · sem tinta",
  },
  {
    code: "04",
    title: "Pintura de Fábrica",
    blurb:
      "Reprodução do padrão de saída de fábrica em granulagem, brilho e tonalidade. Cabine pressurizada, secagem controlada.",
    detail: "padrão OEM · cabine UV",
  },
  {
    code: "05",
    title: "Reforma de Rodas",
    blurb:
      "Restauração estrutural e estética. Devolvemos textura, alinhamento e o acabamento de saída de loja.",
    detail: "alinhamento · pintura · diamantado",
  },
  {
    code: "06",
    title: "Restauração de Riscos",
    blurb:
      "Correção localizada de imperfeições profundas no verniz. Eliminamos sem precisar repintar a peça inteira.",
    detail: "spot repair · sem repintura",
  },
];

export function ChapterServices() {
  return (
    <section id="services" className="relative z-20 py-32 md:py-48 px-6 md:px-[80px]">
      <div className="max-w-[1280px] mx-auto">
        <ChapterHeader
          numeral="II"
          label="O Ofício"
          title="Seis disciplinas, <em>uma só obsessão</em>: a originalidade do veículo."
          lead="O atelier opera em torno de um princípio: cada milímetro de pintura, cada milímetro de chapa, é histórico. Devolvemos sem reescrever."
          align="left"
        />

        {/* Honeycomb grid */}
        <div className="honeycomb mt-24 md:mt-32">
          {services.map((s, i) => (
            <ServiceHex key={s.code} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceHexProps {
  service: (typeof services)[number];
  index: number;
  key?: React.Key;
}

function ServiceHex({ service, index }: ServiceHexProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="hex-cell relative"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.12 + Math.floor(index / 3) * 0.18,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "var(--hex-w)",
        height: "var(--hex-h)",
      }}
    >
      {/* Hex outline — fixed unit viewBox, stretches with the cell via preserveAspectRatio */}
      <svg
        viewBox="0 0 100 86.6"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <polygon
          points="25,0.6 75,0.6 99.4,43.3 75,86 25,86 0.6,43.3"
          fill="rgba(20, 24, 30, 0.6)"
          stroke={hovered ? "var(--color-led)" : "var(--color-border-strong)"}
          strokeWidth={hovered ? "0.6" : "0.4"}
          vectorEffect="non-scaling-stroke"
          style={{
            filter: hovered ? "drop-shadow(0 0 14px var(--color-led-glow))" : undefined,
            transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
        {/* Top-edge brass hairline */}
        <polyline
          points="25,0.6 75,0.6"
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
          opacity={hovered ? 0.9 : 0.45}
          style={{ transition: "opacity 0.5s" }}
        />
      </svg>

      {/* Content layer */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-10 py-8">
        <span className="font-mono text-[10px] tracking-[3px] text-[var(--color-brass)] mb-3">
          {service.code}
        </span>
        <h3
          className="font-display text-[18px] md:text-[20px] font-light leading-[1.2] tracking-[-0.01em] text-[var(--color-text)] mb-4"
          style={{ fontVariationSettings: '"opsz" 72, "SOFT" 50' }}
        >
          {service.title}
        </h3>
        <p className="text-[12px] md:text-[12.5px] leading-[1.65] text-[var(--color-text-muted)] mb-4 max-w-[230px]">
          {service.blurb}
        </p>
        <span className="font-mono text-[9.5px] tracking-[2px] uppercase text-[var(--color-brass-deep)] opacity-85">
          {service.detail}
        </span>
      </div>
    </motion.div>
  );
}
