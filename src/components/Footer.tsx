/**
 * Minimal site footer. Extracted from CTA component
 * to follow SRP — footer belongs to App-level layout, not a CTA section.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 text-center text-[10px] text-[var(--color-muted)] tracking-[1px] uppercase border-t border-[rgba(255,255,255,0.05)] py-8 mt-8 flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 mb-4">
        <p>contatorenovelli@gmail.com</p>
        <p>Rua Caminho do Pilar, 1758 Vila Scarpelli - Santo André 09190-000</p>
      </div>
      <div className="mb-4 flex flex-col gap-1 items-center">
        <p className="text-[10px] text-[var(--color-muted-dark)] uppercase">Especialista Responsável: Renato Renovelli</p>
        <p className="text-[10px] text-[var(--color-muted-dark)] uppercase">CNPJ 05.867.479/0001-81</p>
      </div>
      <div className="flex flex-col gap-1 opacity-50">
        <p className="text-[8px] tracking-[1px] uppercase">Última atualização: Abril 2026</p>
        <p className="text-[9px] tracking-[2px]">© {currentYear} Renovelli Estética Automotiva.</p>
      </div>
    </footer>
  );
}
