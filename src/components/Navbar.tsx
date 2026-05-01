import { Magnetic } from "./Magnetic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const menuLinks = [
  { name: "I · Chegada", short: "Chegada", href: "#hero" },
  { name: "II · Ofício", short: "Ofício", href: "#services" },
  { name: "III · Resultado", short: "Resultado", href: "#results" },
  { name: "IV · Contato", short: "Contato", href: "#cta" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full flex justify-between items-center py-5 px-6 md:px-[60px] z-50 transition-colors duration-500 ${
          scrolled || isOpen
            ? "bg-[var(--color-bg)]/95 md:bg-[var(--color-bg)]/80 md:backdrop-blur-md border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <Magnetic strength={0.2}>
          <div
            className="font-display italic text-[26px] md:text-[30px] font-light cursor-pointer text-[var(--color-text)] z-[60]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
            onClick={() => {
              window.scrollTo(0, 0);
              setIsOpen(false);
            }}
          >
            Renovelli
          </div>
        </Magnetic>

        <div className="hidden md:flex gap-7 items-center">
          {menuLinks.map((link) => (
            <Magnetic key={link.href} strength={0.3}>
              <a
                href={link.href}
                className="font-mono text-[11px] tracking-[2.5px] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Magnetic strength={0.1}>
            <a href="#cta" className="cta-btn hidden md:inline-flex">
              Avaliação Gratuita
            </a>
          </Magnetic>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60] cursor-pointer"
            aria-label="Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-[var(--color-brass)]"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-4 h-px bg-[var(--color-brass)] self-end"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 12 }}
              className="w-3 h-px bg-[var(--color-brass)] self-end"
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--color-bg)] z-[45] flex flex-col items-center justify-center px-6 overflow-hidden"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setIsOpen(false)}
                  className="font-display italic text-[40px] font-light text-[var(--color-text)] hover:text-[var(--color-brass)] transition-colors"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
                >
                  {link.short}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                href="#cta"
                onClick={() => setIsOpen(false)}
                className="mt-10 cta-btn justify-center !text-[11px] !py-[15px] !px-[28px] !tracking-[1.5px]"
              >
                Avaliação Gratuita
              </motion.a>
            </div>

            {/* Decorative hex motif */}
            <svg
              className="absolute bottom-10 right-[-10%] opacity-[0.04] pointer-events-none"
              width="500"
              height="600"
              viewBox="0 0 100 115.47"
              fill="none"
              stroke="var(--color-brass)"
              strokeWidth="0.4"
            >
              <polygon points="50,2 96,28.86 96,86.6 50,113.46 4,86.6 4,28.86" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
