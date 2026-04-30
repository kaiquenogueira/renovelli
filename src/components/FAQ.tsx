import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { ChapterHeader } from "./ChapterHeader";

const faqs = [
  {
    question: "Qual a diferença entre o polimento comum e a restauração Renovelli?",
    answer:
      "O polimento comum foca apenas no brilho imediato e muitas vezes remove camadas excessivas de verniz. A restauração Renovelli é um processo técnico de correção de pintura em três etapas, que elimina swirls e riscos com precisão milimétrica preservando a integridade estrutural do verniz e devolvendo a profundidade original da cor.",
  },
  {
    question: "Quanto tempo dura a vitrificação automotiva premium?",
    answer:
      "A vitrificação aplicada pela Renovelli oferece proteção de 1 a 3 anos, dependendo do pacote escolhido e da manutenção. A camada nano-cerâmica de alta dureza protege contra raios UV, fezes de pássaros, seiva, e químicos leves, e torna a lavagem do veículo significativamente mais rápida.",
  },
  {
    question: "Posso lavar o carro normalmente após o detalhamento?",
    answer:
      "Sim. Recomendamos shampoo de pH neutro e a técnica de dois baldes para evitar novos riscos. Veículos vitrificados ficam hidrofóbicos e expulsam água e sujeira, simplificando a manutenção. Você sai do atelier com um guia escrito de cuidados.",
  },
  {
    question: "O Martelinho de Ouro preserva a pintura original?",
    answer:
      "Sim — essa é a vantagem principal. O Martelinho de Ouro (Paintless Dent Repair) remove amassados por pressão a partir do interior da peça, sem massa e sem repintura. Mantém 100% da originalidade e o valor de revenda do automóvel.",
  },
  {
    question: "A Renovelli trabalha com pintura de fábrica (OEM)?",
    answer:
      "Sim. Em funilaria e pintura, usamos colorimetria computadorizada para garantir que tom e granulagem sejam idênticos ao padrão original de fábrica, com transição invisível entre peça reparada e peça intacta.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section id="faq" className="relative z-20 py-32 md:py-40 px-6 md:px-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1100px] mx-auto">
        <ChapterHeader
          numeral="·"
          label="Dúvidas Frequentes"
          title="Antes de marcar a avaliação."
          align="left"
        />

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left index column */}
          <div className="md:col-span-3 md:sticky md:top-32 md:self-start">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-[var(--color-text-dim)] mb-3">
              Índice
            </div>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`text-left font-mono text-[10.5px] tracking-[1.5px] uppercase py-2 border-l-2 pl-3 transition-all duration-300 ${
                    activeIndex === i
                      ? "border-[var(--color-brass)] text-[var(--color-text)]"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)]"
                  }`}
                >
                  <span className="text-[var(--color-brass)] mr-2">0{i + 1}</span>
                  {faq.question.split(" ").slice(0, 4).join(" ")}…
                </button>
              ))}
            </div>
          </div>

          {/* Right list */}
          <div className="md:col-span-9 flex flex-col">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="border-b border-[var(--color-border)]"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-7 text-left group"
                >
                  <div className="flex items-baseline gap-5 pr-6">
                    <span className="font-mono text-[10px] tracking-[2px] text-[var(--color-brass)] flex-shrink-0 w-6">
                      0{i + 1}
                    </span>
                    <span
                      className="font-display text-[18px] md:text-[22px] font-light leading-[1.3] text-[var(--color-text)] tracking-[-0.01em]"
                      style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {activeIndex === i ? (
                      <Minus className="w-4 h-4 text-[var(--color-brass)]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === i ? "auto" : 0,
                    opacity: activeIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pl-11 pr-6 text-[14px] leading-[1.75] text-[var(--color-text-muted)] max-w-[680px]">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
