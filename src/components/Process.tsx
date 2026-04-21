import { motion } from "motion/react";
import { Search, PenTool, PaintBucket, Sparkles, Circle, Hammer } from "lucide-react";
import { AnimatedTitle } from "./AnimatedTitle";
import { Magnetic } from "./Magnetic";

const services = [
  {
    icon: Sparkles,
    title: "Polimento e Vitrificação",
    description: "É o processo de correção de pintura e aplicação de proteção cerâmica para brilho extremo e durabilidade do verniz."
  },
  {
    icon: Circle,
    title: "Reforma de Rodas",
    description: "Restauração completa que significa devolver a textura original, pintura e o alinhamento estrutural das rodas."
  },
  {
    icon: PaintBucket,
    title: "Personalização",
    description: "Consiste em detalhes estéticos sob medida que tornam o veículo exclusivo com acabamentos de luxo."
  },
  {
    icon: PenTool,
    title: "Funilaria e Pintura",
    description: "É o serviço de reparação estrutural e pintura padrão de fábrica com precisão milimétrica."
  },
  {
    icon: Hammer,
    title: "Martelinho de Ouro",
    description: "Técnica de remoção de amassados sem pintura, o que preserva 100% da originalidade do veículo."
  },
  {
    icon: Search,
    title: "Restauração de Riscos",
    description: "Tratamento que consiste na correção localizada e eliminação de imperfeições profundas na pintura."
  }
];

export function Process() {
  return (
    <section id="services" className="py-32 px-4 md:px-[80px] bg-transparent relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-[800px] mx-auto">
          <p className="text-[12px] font-semibold text-[var(--color-accent)] tracking-[6px] uppercase mb-[20px]">Especialidades</p>
          <AnimatedTitle
            as="h2"
            text="O que faz a Renovelli ser Premium?"
            className="justify-center font-display text-[40px] md:text-[56px] font-bold tracking-[-2px] text-white mb-6 leading-[1.1]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group flex flex-col items-center text-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-[#050505] border border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-6 relative z-10 
                              transition-all duration-500 group-hover:border-[var(--color-accent)] group-hover:shadow-[0_0_20px_var(--color-accent-glow)] group-hover:scale-110">
                <service.icon className="w-6 h-6 text-[#666666] group-hover:text-[var(--color-accent)] transition-colors duration-500" />
              </div>

              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-[1px]">{service.title}</h3>
              <p className="text-[#666666] text-xs font-medium leading-relaxed max-w-[220px]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
