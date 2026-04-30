import type { ReactNode } from "react";

interface HexBadgeProps {
  size?: number;
  children: ReactNode;
  /** When true the badge glows with the LED tunnel cyan-white tone. */
  led?: boolean;
  /** Brass outline (default true). */
  brass?: boolean;
  className?: string;
}

/**
 * A hexagonal SVG badge — the LED-tunnel motif distilled into a small
 * inline element. Used for icons in service cards, navigation accents,
 * and chapter dividers.
 */
export function HexBadge({
  size = 56,
  children,
  led = false,
  brass = true,
  className = "",
}: HexBadgeProps) {
  const stroke = led ? "var(--color-led)" : brass ? "var(--color-brass)" : "var(--color-text-muted)";
  const filter = led ? "drop-shadow(0 0 6px var(--color-led-glow))" : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size * 1.1547 }}
    >
      <svg
        viewBox="0 0 100 115.47"
        width={size}
        height={size * 1.1547}
        className="absolute inset-0"
        style={{ filter }}
        aria-hidden="true"
      >
        <polygon
          points="50,2 96,28.86 96,86.6 50,113.46 4,86.6 4,28.86"
          fill="transparent"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
      </svg>
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
