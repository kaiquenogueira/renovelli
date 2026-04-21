import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { AnimatedTitle } from "./AnimatedTitle";

const faqs = [
  {
    question: "Qual a diferença entre polimento comum e restauração Renovelli?",
    answer: "O polimento comum foca apenas no brilho imediato, muitas vezes removendo camadas excessivas de verniz. A restauração Renovelli é um processo técnico de correção de pintura que elimina imperfeições (swirls e riscos) com precisão milimétrica, preservando a integridade estrutural do verniz e devolvendo a profundidade da cor original."
  },
  {
    question: "Quanto tempo dura a vitrificação automotiva premium?",
    answer: "A vitrificação (ceramic coating) aplicada pela Renovelli oferece proteção de 1 a 3 anos, dependendo do pacote escolhido e dos cuidados posteriores. Ela cria uma barreira nano-cerâmica de alta dureza que protege contra raios UV, fezes de pássaros, seiva de árvores e químicos leves, além de facilitar significativamente a limpeza do veículo."
  },
  {
    question: "Posso lavar o carro normalmente após o detalhamento?",
    answer: "Sim, porém recomendamos o uso de shampoos com pH neutro e a técnica de dois baldes para evitar novos riscos. Veículos vitrificados possuem propriedades hidrofóbicas que repelem água e sujeira, tornando a lavagem muito mais rápida e segura. Fornecemos um guia de manutenção completo para cada cliente."
  },
  {
    question: "O Martelinho de Ouro preserva a pintura original?",
    answer: "Sim, essa é a principal vantagem. O Martelinho de Ouro (Paintless Dent Repair - PDR) é uma técnica artesanal que remove amassados por meio de pressão e ferramentas especiais pela parte interna da peça, sem necessidade de massa ou repintura, mantendo 100% da originalidade e o valor de revenda do automóvel."
  },
  {
    question: "A Renovelli trabalha com pintura de fábrica?",
    answer: "Sim. Em nossos processos de funilaria e pintura, utilizamos tecnologia de colorimetria computadorizada para garantir que o tom e a granulagem da tinta sejam idênticos ao padrão original de fábrica (OEM), assegurando uma transição invisível entre as peças reparadas e as originais."
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Schema.org FAQPage data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-32 px-4 md:px-[80px] bg-transparent relative z-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] font-semibold text-[var(--color-accent)] tracking-[6px] uppercase mb-[20px]">Dúvidas Frequentes</p>
          <AnimatedTitle
            as="h2"
            text="Entenda nossos processos"
            className="justify-center font-display text-[40px] md:text-[56px] font-bold tracking-[-2px] text-white leading-[1.1]"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden glass-panel"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-[rgba(255,255,255,0.02)]"
              >
                <span className="text-sm md:text-base font-medium text-white pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
                  {activeIndex === index ? (
                    <Minus className="w-4 h-4 text-[var(--color-accent)]" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: activeIndex === index ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-[#888888] text-sm leading-relaxed border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
                  {faq.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
