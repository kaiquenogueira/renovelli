import { Magnetic } from "./Magnetic";
import { useEffect, useState } from "react";

/**
 * Main navigation component.
 * Refactored to include scroll-based backdrop blur and transparent-to-solid transitions,
 * fixed anchor targets, and responsive CTA text based on CRO principles.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full flex justify-between items-center py-6 px-6 md:px-[60px] z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--color-bg-dark)]/80 backdrop-blur-md border-b border-[var(--color-border)]' : 'bg-transparent'}`}>
      <Magnetic strength={0.2}>
        <div style={{ fontFamily: 'var(--font-logo)' }} className="text-[28px] md:text-[34px] italic font-medium cursor-pointer text-[var(--color-accent)] drop-shadow-md" onClick={() => window.scrollTo(0, 0)}>
          Renovelli
        </div>
      </Magnetic>

      <div className="hidden md:flex gap-8 text-[12px] uppercase tracking-[2px] font-semibold items-center">
        <Magnetic strength={0.4}><a href="#hero" className="inline-block text-[#666666] hover:text-white transition-colors">Início</a></Magnetic>
        <Magnetic strength={0.4}><a href="#comparative" className="inline-block text-[#666666] hover:text-white transition-colors">Antes/Depois</a></Magnetic>
        <Magnetic strength={0.4}><a href="#services" className="inline-block text-[#666666] hover:text-white transition-colors">Serviços</a></Magnetic>
        <Magnetic strength={0.4}><a href="#gallery" className="inline-block text-[#666666] hover:text-white transition-colors">Galeria</a></Magnetic>
        <Magnetic strength={0.4}><a href="#faq" className="inline-block text-[#666666] hover:text-white transition-colors">FAQ</a></Magnetic>
      </div>

      <Magnetic strength={0.1}>
        <a href="#cta" className="cta-btn hidden md:block">
          Agendar Avaliação
        </a>
      </Magnetic>
    </nav>
  );
}
