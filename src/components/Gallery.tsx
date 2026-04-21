import { motion } from "motion/react";
import { AnimatedTitle } from "./AnimatedTitle";
import { Magnetic } from "./Magnetic";

const galleryItems = [
  { id: 1, image: "/images/instagram-hd/cliente-satisfeito-1.jpg", span: "md:col-span-2 md:row-span-2" },
  { id: 2, image: "/images/instagram/insta-10.jpg", span: "md:col-span-1 md:row-span-1" },
  { id: 3, image: "/images/instagram/insta-9.jpg", span: "md:col-span-1 md:row-span-1" },
  { id: 4, image: "/images/instagram-hd/cliente-satisfeito-2.jpg", span: "md:col-span-2 md:row-span-1" },
  { id: 5, image: "/images/instagram/insta-13.jpg", span: "md:col-span-2 md:row-span-1" },
];

/**
 * Gallery section displaying offline-first local images.
 * Modified to support lazy loading for performance.
 */
export function Gallery() {
  return (
    <section className="py-32 px-4 md:px-[80px] bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label">Exclusividade</p>
            <AnimatedTitle
              as="h2"
              text="A Forma Perfeita"
              className="section-heading text-[40px] md:text-[56px] font-bold mb-4"
            />
            <p className="text-[var(--color-muted)] text-sm uppercase tracking-[1px] max-w-lg mt-4">
              Nosso portfólio de restaurações entregues. Cada veículo é tratado como uma obra única.
            </p>
          </div>
          <Magnetic strength={0.3}>
            <button className="cta-btn whitespace-nowrap">
              Ver Galeria Completa
            </button>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative overflow-hidden group cursor-pointer border border-[var(--color-border)] ${item.span}`}
            >
              <img
                src={item.image}
                alt={`Trabalho de restauração automotiva Renovelli - Exemplo de acabamento premium ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 group-hover:translate-x-[150%]" />
              <div className="absolute inset-0 bg-[var(--color-bg-dark)]/40 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
