import { motion } from "motion/react";
import { Sparkles, Wrench, Hammer, Palette, Disc, ShieldCheck } from "lucide-react";
import { ChapterHeader } from "./ChapterHeader";

const services = [
  {
    code: "01",
    title: "Polimento & Vitrificação",
    icon: Sparkles,
    blurb:
      "Correção técnica de pintura em 3 etapas e aplicação de proteção nano-cerâmica 9H. Brilho profundo com efeito espelhado, extrema hidrofobia e durabilidade de até 3 anos.",
    detail: "3 etapas · ceramic 9H · 3 anos de garantia",
    specs: ["Correção de Swirls", "Nano-cerâmica 9H", "Brilho Espelhado"],
  },
  {
    code: "02",
    title: "Funilaria de Precisão",
    icon: Wrench,
    blurb:
      "Reparo estrutural artesanal com colorimetria computadorizada. A peça restaurada se torna 100% invisível ao olho humano e à medição por espectrofotômetro.",
    detail: "padrão OEM · colorimetria · tolerância 0,001 mm",
    specs: ["Espectrofotômetro", "Solda Ponto OEM", "Alinhamento Laser"],
  },
  {
    code: "03",
    title: "Martelinho de Ouro",
    icon: Hammer,
    blurb:
      "Técnica de desamassamento sem repintura (PDR). Preserva a pintura original de fábrica intacta e o valor integral de revenda do seu veículo.",
    detail: "PDR · sem massa plástica · sem repintura",
    specs: ["100% Original", "Sem Repintura", "Rápida Liberação"],
  },
  {
    code: "04",
    title: "Pintura de Fábrica (OEM)",
    icon: Palette,
    blurb:
      "Reprodução fiel do padrão de saída de fábrica em granulagem, brilho e tonalidade. Executada em cabine pressurizada climatizada com secagem controlada.",
    detail: "padrão OEM · cabine pressurizada · verniz alto sólidos",
    specs: ["Cabine Pressurizada", "Verniz High Solid", "Curagem Térmica"],
  },
  {
    code: "05",
    title: "Reforma de Rodas",
    icon: Disc,
    blurb:
      "Restauração estrutural e estética de rodas esportivas e originais. Devolvemos textura de fábrica, alinhamento micrométrico e acabamento diamantado.",
    detail: "torno CNC · pintura epóxi · acabamento diamantado",
    specs: ["Torno Diamantado", "Pintura Eletrostática", "Balanceamento"],
  },
  {
    code: "06",
    title: "Restauração de Riscos",
    icon: ShieldCheck,
    blurb:
      "Correção localizada e cirúrgica de imperfeições profundas no verniz. Eliminamos riscos e marcas sem a necessidade de repintar a peça inteira.",
    detail: "spot repair de precisão · preservação de peça",
    specs: ["Spot Repair", "Sem Desmonte", "Preservação da Peça"],
  },
];

export function ChapterServices() {
  return (
    <section id="services" className="relative z-20 py-28 md:py-44 px-6 md:px-[80px]">
      <div className="max-w-[1280px] mx-auto">
        <ChapterHeader
          numeral="II"
          label="O Ofício"
          title="Seis disciplinas, <em>uma só obsessão</em>: a originalidade do veículo."
          lead="O atelier opera em torno de um princípio: cada milímetro de pintura e chapa carrega história e valor. Devolvemos o estado de fábrica sem reescrever a originalidade."
          align="left"
        />

        {/* Responsive luxury atelier card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.code}
                className="atelier-card rounded-xl p-8 md:p-9 flex flex-col justify-between relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 3) * 0.1,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                {/* Top bar: Code & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[12px] tracking-[3px] font-semibold text-[var(--color-brass)] bg-[var(--color-brass)]/10 px-3 py-1 rounded border border-[var(--color-brass)]/20">
                      {s.code}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-brass)] transition-colors duration-300 group-hover:border-[var(--color-brass)] group-hover:bg-[var(--color-brass)]/10">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-[22px] md:text-[25px] font-light leading-[1.2] text-[var(--color-text)] mb-3.5 tracking-[-0.01em]"
                    style={{ fontVariationSettings: '"opsz" 72, "SOFT" 40' }}
                  >
                    {s.title}
                  </h3>

                  {/* Description blurb */}
                  <p className="text-[14px] leading-[1.7] text-[var(--color-text-muted)] mb-6">
                    {s.blurb}
                  </p>
                </div>

                {/* Bottom spec pill & tags */}
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-[var(--color-brass-light)] mb-3 font-medium">
                    {s.detail}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.specs.map((spec) => (
                      <span
                        key={spec}
                        className="font-mono text-[9.5px] tracking-[0.8px] uppercase text-[var(--color-text-secondary)] bg-black/40 px-2 py-0.5 rounded border border-white/5"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

