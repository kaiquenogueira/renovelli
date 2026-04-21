import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";
import { AnimatedTitle } from "./AnimatedTitle";
import { SocialProof } from "./SocialProof";

/**
 * Optimized Call-To-Action section.
 * - Social proof and footer extracted to own components (SRP).
 * - CTA copy updated to use first-person, action-oriented text (CRO).
 */
export function CTA() {
  const WHATSAPP_LINK = "https://wa.me/5511947031845?text=Ol%C3%A1%2C%20queria%20saber%20mais%20sobre%20a%20avalia%C3%A7%C3%A3o%20gratuita";

  return (
    <section id="cta" className="py-40 px-4 md:px-[80px] bg-transparent relative z-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[var(--color-accent)] blur-[200px] opacity-[0.08] rounded-[100%] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="main-title-bg !text-[10vw]">AWAKEN</div>

          <p className="section-label">Evolução Imediata</p>

          <AnimatedTitle
            text="Está na hora de acordar o seu veículo."
            className="section-heading justify-center text-[56px] mb-8"
            delaySeconds={0.2}
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 mb-6">
            <Magnetic strength={0.2}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden cta-btn !py-[16px] !px-[40px] !text-[12px] bg-[var(--color-accent)] !text-white !border-[var(--color-accent)] hover:bg-white hover:!text-[var(--color-bg-dark)] hover:!border-white transition-all duration-500 inline-flex items-center gap-2 group"
              >
                {/* Looping pulse shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 2.5, repeatDelay: 1 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
                Quero Ver Meu Resultado
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors group p-4 border border-transparent hover:border-[var(--color-border)] rounded-full backdrop-blur-sm"
              >
                <div className="text-left cursor-pointer">
                  <p className="text-[10px] uppercase tracking-[2px] font-bold">Agendar Avaliação</p>
                  <p className="text-[10px] text-[var(--color-muted-dark)] capitalize group-hover:text-[var(--color-text-secondary)] transition-colors">Resposta em 5 minutos</p>
                </div>
              </a>
            </Magnetic>
          </div>

          <SocialProof />
        </motion.div>
      </div>
    </section>
  );
}
