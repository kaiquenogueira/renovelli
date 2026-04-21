import { AnimatedTitle } from "./AnimatedTitle";

interface ScrollSectionProps {
  label: string;
  title: string;
  /** Additional CSS classes for the AnimatedTitle */
  titleClassName?: string;
  /** Whether this is the final/accent section with special styling */
  isAccent?: boolean;
}

/**
 * Reusable scroll section layout for the hero foreground text.
 * Eliminates the repeated section markup in HeroTransformation (DRY).
 */
export function ScrollSection({
  label,
  title,
  titleClassName = "",
  isAccent = false,
}: ScrollSectionProps) {
  const containerClasses = isAccent
    ? "bg-[var(--color-bg-dark)]/80 backdrop-blur-md p-10 rounded-2xl border border-[var(--color-border-accent)] w-full shadow-[0_0_50px_rgba(255,78,0,0.1)]"
    : "bg-[var(--color-bg-dark)]/60 backdrop-blur-md p-10 rounded-2xl border border-[rgba(255,255,255,0.05)] w-full";

  return (
    <section className="h-[120vh] flex flex-col items-center justify-center text-center">
      <div className={containerClasses}>
        <p className="section-label">{label}</p>
        <AnimatedTitle
          text={title}
          className={titleClassName}
          delaySeconds={0.2}
        />
      </div>
    </section>
  );
}
