/**
 * Editorial footer — colophon style.
 * Lists the atelier's facts as if printed at the back of a hand-bound book.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-[var(--color-border)] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-[80px] py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* Wordmark */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <div
            className="font-display italic text-[40px] md:text-[48px] font-light text-[var(--color-text)] leading-[0.9] tracking-[-0.04em]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
          >
            Renovelli
          </div>
          <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--color-text-muted)] mt-2">
            Estética Automotiva · Atelier
          </p>
          <p className="font-display italic text-[14px] text-[var(--color-text-muted)] mt-4 max-w-[280px] leading-[1.5]">
            “Restaurar é, sobretudo, preservar.”
          </p>
        </div>

        {/* Atelier facts */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-[var(--color-brass)] mb-2">
            Atelier
          </span>
          <p className="text-[12px] leading-[1.7] text-[var(--color-text-muted)]">
            R. Caminho do Pilar, 1758
            <br />
            Vila Scarpelli · Santo André
            <br />
            CEP 09190-000 · SP · BR
          </p>
        </div>

        {/* Contact */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-[var(--color-brass)] mb-2">
            Contato
          </span>
          <a
            href="https://wa.me/5511947031845"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] leading-[1.7] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            WhatsApp · 11 9 4703-1845
          </a>
          <a
            href="mailto:contatorenovelli@gmail.com"
            className="text-[12px] leading-[1.7] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            contatorenovelli@gmail.com
          </a>
          <a
            href="https://www.instagram.com/renovelli.estetica/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] leading-[1.7] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            @renovelli.estetica
          </a>
        </div>

        {/* Colophon */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-[var(--color-brass)] mb-2">
            Colofão
          </span>
          <p className="text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
            Especialista responsável
            <br />
            <span className="font-display italic text-[var(--color-text)] text-[14px]"
                  style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80' }}>
              Renato Renovelli
            </span>
          </p>
          <p className="text-[10px] leading-[1.7] text-[var(--color-text-dim)] font-mono tracking-[1px] mt-2">
            CNPJ 05.867.479/0001-81
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-[80px] py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="font-mono text-[9px] tracking-[2px] uppercase text-[var(--color-text-dim)]">
            © {currentYear} Renovelli Estética Automotiva. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[9px] tracking-[2px] uppercase text-[var(--color-text-dim)]">
            Composto em <span className="text-[var(--color-text-muted)]">Fraunces</span> &{" "}
            <span className="text-[var(--color-text-muted)]">Geist</span> · Santo André, BR
          </p>
        </div>
      </div>
    </footer>
  );
}
