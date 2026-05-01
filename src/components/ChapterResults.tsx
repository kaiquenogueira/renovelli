import { motion } from "motion/react";
import { ChapterHeader } from "./ChapterHeader";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const cases = [
  {
    code: "BR-001",
    car: "Audi A4",
    color: "Mythos Black",
    service: "Polimento técnico + Vitrificação cerâmica",
    duration: "3 dias · 14 horas-homem",
    before: "/images/before-after/audi-before.jpg",
    after: "/images/before-after/audi-after.jpg",
  },
  {
    code: "BR-002",
    car: "Painel Lateral",
    color: "Preto sólido",
    service: "Funilaria invisível + repintura OEM",
    duration: "5 dias · 22 horas-homem",
    before: "/images/before-after/oficina-before.jpg",
    after: "/images/before-after/oficina-after.jpg",
  },
  {
    code: "BR-003",
    car: "Capô — Ensaio macro",
    color: "Preto metálico",
    service: "Polimento de correção em 3 etapas",
    duration: "1 dia · 6 horas-homem",
    before: "/images/before-after/polimento-before.jpg",
    after: "/images/before-after/polimento-after.jpg",
  },
];

const galleryGrid: Array<{
  src: string;
  alt: string;
  span: string;
  caption?: string;
  hex?: boolean;
}> = [
  {
    src: "/images/instagram-hd/cliente-satisfeito-1.jpg",
    alt: "Fiat Coupe sob o túnel LED do atelier Renovelli",
    span: "col-span-2 row-span-2",
    caption: "Fiat Coupe · entrega",
  },
  {
    src: "/images/instagram-hd/polimento-vitri-showcase.jpg",
    alt: "Audi A4 — antes e depois da vitrificação",
    span: "col-span-2 row-span-1",
    caption: "Audi A4 · vitrificação",
  },
  {
    src: "/images/instagram/insta-13.jpg",
    alt: "Detalhe de pintura espelhada",
    span: "col-span-1 row-span-1",
    hex: true,
  },
  {
    src: "/images/instagram/insta-9.jpg",
    alt: "Reflexo do túnel LED no capô recém-vitrificado",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/instagram-hd/cliente-satisfeito-2.jpg",
    alt: "Cliente atendido — entrega final",
    span: "col-span-2 row-span-1",
    caption: "Cliente · entrega",
  },
  {
    src: "/images/instagram/insta-10.jpg",
    alt: "Pintura escura espelhando o atelier",
    span: "col-span-1 row-span-1",
    hex: true,
  },
  {
    src: "/images/instagram/insta-3.jpg",
    alt: "Detalhe técnico — correção de pintura",
    span: "col-span-1 row-span-1",
  },
];

export function ChapterResults() {
  return (
    <section id="results" className="relative z-20 py-32 md:py-48 px-6 md:px-[80px]">
      <div className="max-w-[1280px] mx-auto">
        <ChapterHeader
          numeral="III"
          label="O Resultado"
          title="O <em>antes</em> não some — fica documentado, lado a lado."
          lead="Cada veículo que sai do atelier é catalogado. Arraste a alça vertical para revelar o estado de chegada e o estado de entrega no mesmo enquadramento."
        />

        {/* ── Featured comparativos ── */}
        <div className="mt-24 md:mt-32 flex flex-col gap-32 md:gap-48">
          {cases.map((c, i) => (
            <motion.article
              key={c.code}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-8">
                <BeforeAfterSlider
                  before={c.before}
                  after={c.after}
                  altBefore={`${c.car} — antes`}
                  altAfter={`${c.car} — depois`}
                />
              </div>

              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="font-mono text-[11px] tracking-[2.5px] text-[var(--color-text-muted)]">
                  Caso · {c.code}
                </div>
                <h3
                  className="font-display text-[28px] md:text-[40px] font-light leading-[1.05] tracking-[-0.03em] text-[var(--color-text)]"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                >
                  {c.car}
                </h3>
                <div className="font-display italic text-[18px] md:text-[20px] text-[var(--color-brass)]">
                  {c.color}
                </div>
                <p className="text-[15px] leading-[1.7] text-[var(--color-text-muted)] max-w-[340px]">
                  {c.service}
                </p>
                <div className="font-mono text-[11px] tracking-[1.8px] uppercase text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3 mt-2">
                  {c.duration}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Galeria do atelier ── */}
        <div className="mt-32 md:mt-48">
          <div className="flex items-end justify-between mb-12 md:mb-16 gap-6 flex-wrap">
            <div>
              <div className="chapter-marker mb-4">
                <span className="roman">·</span>
                <span>Galeria do Atelier</span>
              </div>
              <h3
                className="font-display text-[32px] md:text-[44px] font-light leading-[1.05] tracking-[-0.03em] text-[var(--color-text)]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                Outras entregas <em className="font-display italic text-[var(--color-brass)]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}>recentes</em>.
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

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[230px] gap-3 md:gap-4">
            {galleryGrid.map((item, idx) => (
              <motion.div
                key={item.src + idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                className={`relative overflow-hidden group ${item.span} ${
                  item.hex ? "hex-clip-pointy" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.06] grayscale-[15%] group-hover:grayscale-0"
                />
                {!item.hex && (
                  <div className="absolute inset-0 border border-[var(--color-border-strong)] pointer-events-none" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/85 via-transparent to-transparent pointer-events-none" />
                {item.caption && (
                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                    <span className="font-mono text-[11px] tracking-[2px] uppercase text-[var(--color-text)]/85">
                      {item.caption}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
