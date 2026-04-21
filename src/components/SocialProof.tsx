import { Star, ShieldCheck } from "lucide-react";

/**
 * Social proof and trust signals section.
 * Extracted from CTA to follow SRP — trust elements are reusable
 * and may appear in multiple locations (e.g., near forms, in sticky bars).
 */
export function SocialProof() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10">
      <div className="flex items-center gap-2 opacity-80">
        <div className="flex gap-1 text-[var(--color-accent)]">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
        </div>
        <span className="text-xs text-[var(--color-text-secondary)] font-medium tracking-tight">
          4.9/5 por 200+ clientes
        </span>
      </div>

      <div className="hidden sm:block w-[1px] h-4 bg-[var(--color-border)]" />

      <div className="flex items-center gap-2 opacity-80">
        <ShieldCheck size={16} className="text-[var(--color-accent)]" />
        <span className="text-xs text-[var(--color-text-secondary)] font-medium tracking-tight">
          Avaliação estrutural 100% gratuita
        </span>
      </div>
    </div>
  );
}
