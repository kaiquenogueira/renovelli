import { motion } from "motion/react";
import { ChapterHeader } from "./ChapterHeader";

const WHATSAPP_LINK =
  "https://wa.me/5511947031845?text=Ol%C3%A1%2C%20queria%20saber%20mais%20sobre%20a%20avalia%C3%A7%C3%A3o%20gratuita";

const facts = [
  { label: "Endereço", value: "R. Caminho do Pilar, 1758\nVila Scarpelli · Santo André" },
  { label: "Horário", value: "Seg a Sex · 08:00 — 18:00\nSábado · 08:00 — 13:00" },
  { label: "Resposta", value: "Em média 5 min\nWhatsApp · 11 9 4703-1845" },
];

export function ChapterContact() {
  return (
    <section id="cta" className="relative z-20 py-32 md:py-48 px-6 md:px-[80px] overflow-hidden">
      {/* Brass glow well */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] bg-[var(--color-brass)] blur-[180px] opacity-[0.06] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <ChapterHeader
          numeral="IV"
          label="Sua Vez"
          title="Traga seu veículo. Devolveremos como <em>ele saiu de fábrica</em>."
          lead="A primeira conversa é uma avaliação técnica gratuita. Você fotografa, descreve e envia — devolvemos o diagnóstico e um cronograma realista."
          align="center"
        />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 md:gap-6 mt-16 max-w-[420px] sm:max-w-none mx-auto"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn justify-center w-full sm:w-auto !text-[11px] md:!text-[12px] !py-[15px] md:!py-[16px] !px-[24px] md:!px-[40px] !border-[var(--color-brass)] bg-[var(--color-brass)] !text-[var(--color-bg)] hover:!text-[var(--color-bg)]"
            style={{ background: "var(--color-brass)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Quero minha avaliação
          </a>

          <a
            href={`tel:+5511947031845`}
            className="font-mono text-[11px] tracking-[3px] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors px-4 py-3 border border-transparent hover:border-[var(--color-border)] text-center"
          >
            ou ligar · 11 9 4703-1845
          </a>
        </motion.div>

        {/* Atelier facts ribbon */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[var(--color-bg)] p-8 md:p-10 flex flex-col gap-3"
            >
              <span className="font-mono text-[9px] tracking-[3px] uppercase text-[var(--color-brass)]">
                {f.label}
              </span>
              <span
                className="font-display text-[18px] md:text-[20px] leading-[1.4] text-[var(--color-text)] whitespace-pre-line"
                style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}
              >
                {f.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Master line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center"
        >
          <span className="mono-caption">Especialista responsável</span>
          <div
            className="font-display italic text-[28px] md:text-[36px] font-light text-[var(--color-text)] leading-[1.1] tracking-[-0.02em]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
          >
            Renato Renovelli
          </div>
          <span className="mono-caption">10+ anos de ofício</span>
        </motion.div>
      </div>
    </section>
  );
}
