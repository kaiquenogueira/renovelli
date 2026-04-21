import { Magnetic } from "./Magnetic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Main navigation component.
 * Refactored to include scroll-based backdrop blur and transparent-to-solid transitions,
 * fixed anchor targets, and responsive CTA text based on CRO principles.
 * Added premium mobile navigation overlay.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinks = [
    { name: "Início", href: "#hero" },
    { name: "Antes/Depois", href: "#comparative" },
    { name: "Preços/FAQ", href: "#faq" },
    { name: "Galeria", href: "#gallery" },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full flex justify-between items-center py-6 px-6 md:px-[60px] z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-[var(--color-bg-dark)]/80 backdrop-blur-md border-b border-[var(--color-border)]' : 'bg-transparent'}`}>
        <Magnetic strength={0.2}>
          <div style={{ fontFamily: 'var(--font-logo)' }} className="text-[28px] md:text-[34px] italic font-medium cursor-pointer text-[var(--color-accent)] drop-shadow-md z-[60]" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>
            Renovelli
          </div>
        </Magnetic>

        <div className="hidden md:flex gap-8 text-[12px] uppercase tracking-[2px] font-semibold items-center">
          {menuLinks.map((link) => (
            <Magnetic key={link.href} strength={0.4}>
              <a href={link.href} className="inline-block text-[#666666] hover:text-white transition-colors">
                {link.name}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Magnetic strength={0.1}>
            <a href="#cta" className="cta-btn hidden md:block">
              Agendar Avaliação
            </a>
          </Magnetic>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60] cursor-pointer"
            aria-label="Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[var(--color-accent)]" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-4 h-0.5 bg-[var(--color-accent)] self-end" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 12 }}
              className="w-3 h-0.5 bg-[var(--color-accent)] self-end" 
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[var(--color-bg-dark)] z-[45] flex flex-col items-center justify-center pt-24"
          >
            <div className="flex flex-col gap-8 items-center">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display font-light text-white hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                href="#cta"
                onClick={() => setIsOpen(false)}
                className="mt-8 cta-btn !text-lg !px-10 !py-4"
              >
                Agendar Avaliação
              </motion.a>
            </div>

            {/* Background decoration for the menu */}
            <div className="absolute bottom-10 left-10 opacity-10 font-logo italic text-6xl rotate-[-15deg] pointer-events-none">
              Renovelli
            </div>
            <div className="absolute top-40 right-[-20%] opacity-5 font-display font-black text-[30vw] uppercase pointer-events-none">
              Premium
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
