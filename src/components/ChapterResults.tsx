import { motion } from "motion/react";
import { ChapterHeader } from "./ChapterHeader";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const cases = [
  {
    code: "BR-001",
    title: "Polimento Técnico & Ceramic Coating",
    car: "Audi A4",
    color: "Mythos Black Metálico",
    service: "Correção técnica de pintura em 3 etapas e selagem cerâmica nano-estruturada 9H com efeito hidrofóbico.",
    duration: "3 dias · 14 horas de bancada",
    before: "/images/before-after/audi-before.jpg",
    after: "/images/before-after/audi-after.jpg",
    tags: ["Vitrificação 9H", "Correção de Swirls", "Brilho Espelhado"],
  },
  {
    code: "BR-002",
    title: "Funilaria de Precisão & Pintura OEM",
    car: "Restauração de Painel & Lateral",
    color: "Preto Sólido Premium",
    service: "Reparo estrutural de chapa com colorimetria computadorizada. Granulagem e brilho idênticos à saída de fábrica.",
    duration: "4 dias · 18 horas de bancada",
    before: "/images/before-after/oficina-before.jpg",
    after: "/images/before-after/oficina-after.jpg",
    tags: ["Pintura OEM", "Colorimetria", "Sem Distorção"],
  },
  {
    code: "BR-003",
    title: "Recuperação de Verniz & Detalhamento",
    car: "Capô & Para-lama em Ensaio Técnico",
    color: "Reflexo Atelier LED",
    service: "Remoção de riscos médios e profundos preservando 100% da espessura de verniz original de fábrica.",
    duration: "2 dias · 10 horas de bancada",
    before: "/images/before-after/polimento-before.jpg",
    after: "/images/before-after/polimento-after.jpg",
    tags: ["Preservação de Verniz", "Spot Repair", "Túnel LED"],
  },
];

const galleryGrid = [
  {
    src: "/images/gallery/gal-1.jpg",
    alt: "Veículo sob o túnel de luz LED do atelier Renovelli",
    span: "col-span-1 md:col-span-2 row-span-2",
    tag: "Túnel LED",
    car: "Atelier Renovelli · Iluminação Técnica",
  },
  {
    src: "/images/gallery/gal-2.jpg",
    alt: "Gotas de água em superfície recém-vitrificada com efeito hidrofóbico 9H",
    span: "col-span-1 md:col-span-2 row-span-1",
    tag: "Ceramic Coating 9H",
    car: "Hidrofobia & Proteção Nano-Cerâmica",
  },
  {
    src: "/images/gallery/gal-3.jpg",
    alt: "Especialista executando polimento técnico com politriz rotativa",
    span: "col-span-1 row-span-1",
    tag: "Polimento Técnico",
    car: "Correção de Pintura em 3 Etapas",
  },
  {
    src: "/images/gallery/gal-4.jpg",
    alt: "Martelinho de ouro com painel refletor LED listrado",
    span: "col-span-1 row-span-1",
    tag: "Martelinho de Ouro",
    car: "PDR · Alinhamento sem Repintura",
  },
  {
    src: "/images/gallery/gal-5.jpg",
    alt: "Reflexo espelhado perfeito na curvatura da lataria",
    span: "col-span-1 md:col-span-2 row-span-1",
    tag: "Pintura de Fábrica",
    car: "Acabamento Espelhado OEM",
  },
  {
    src: "/images/gallery/gal-6.jpg",
    alt: "Roda forjada diamantada e pinça cerâmica de alta performance",
    span: "col-span-1 md:col-span-2 row-span-1",
    tag: "Reforma de Rodas",
    car: "Acabamento Diamantado & Proteção",
  },
];

export function ChapterResults() {
  return (
    <section id="results" className="relative z-20 py-28 md:py-44 px-6 md:px-[80px]">
      <div className="max-w-[1280px] mx-auto">
        <ChapterHeader
          numeral="III"
          label="O Resultado"
          title="O <em>antes</em> não some — fica documentado, lado a lado."
          lead="Cada veículo que sai do atelier é catalogado fotograficamente. Arraste a alça central para revelar o estado de chegada e o estado de entrega no mesmo enquadramento."
        />

        {/* ── Featured comparativos ── */}
        <div className="mt-20 md:mt-28 flex flex-col gap-28 md:gap-40">
          {cases.map((c, i) => (
            <motion.article
              key={c.code}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className={`atelier-card p-6 md:p-10 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Comparador interativo */}
              <div className="lg:col-span-8">
                <BeforeAfterSlider
                  before={c.before}
                  after={c.after}
                  altBefore={`${c.car} — Antes`}
                  altAfter={`${c.car} — Depois`}
                />
              </div>

              {/* Informações detalhadas do caso */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[2.5px] uppercase font-semibold text-[var(--color-brass)] bg-[var(--color-brass)]/10 px-3 py-1 rounded border border-[var(--color-brass)]/20">
                    Caso · {c.code}
                  </span>
                  <span className="font-mono text-[11px] tracking-[1.5px] uppercase text-[var(--color-text-muted)]">
                    {c.duration}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-display text-[26px] md:text-[34px] font-light leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] mb-1"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
                  >
                    {c.car}
                  </h3>
                  <div className="font-display italic text-[17px] md:text-[19px] text-[var(--color-brass-light)]">
                    {c.color}
                  </div>
                </div>

                <p className="text-[14.5px] leading-[1.7] text-[var(--color-text-muted)]">
                  {c.service}
                </p>

                {/* Tags de especialidade */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-border)]">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[1px] uppercase text-[var(--color-text-secondary)] bg-white/5 px-2.5 py-1 rounded border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Galeria do atelier ── */}
        <div className="mt-28 md:mt-40">
          <div className="flex items-end justify-between mb-10 md:mb-14 gap-6 flex-wrap">
            <div>
              <div className="chapter-marker mb-3">
                <span className="roman">·</span>
                <span>Galeria do Atelier</span>
              </div>
              <h3
                className="font-display text-[30px] md:text-[42px] font-light leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                Entregas recentes & <em className="font-display italic text-[var(--color-brass)]">bastidores</em>.
              </h3>
            </div>
            <a
              href="https://www.instagram.com/renovelli.estetica/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Ver no Instagram →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[250px] gap-4">
            {galleryGrid.map((item, idx) => (
              <motion.div
                key={item.src + idx}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className={`relative overflow-hidden rounded-xl border border-[var(--color-border)] group ${item.span} atelier-card !p-0`}
              >
                <picture>
                  <source srcSet={item.src.replace(/\.(jpe?g|png)$/i, ".avif")} type="image/avif" />
                  <source srcSet={item.src.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                </picture>
                
                {/* Degradê sofisticado de leitura */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

                {/* Tag no topo */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="font-mono text-[9.5px] tracking-[2px] uppercase font-semibold text-[var(--color-brass)] bg-black/70 px-2.5 py-1 rounded border border-[var(--color-border-accent)] backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                {/* Legenda na base */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <span className="font-sans text-[13px] md:text-[14px] font-medium text-white tracking-wide block drop-shadow-md">
                    {item.car}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

