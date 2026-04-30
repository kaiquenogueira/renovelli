import { motion } from "motion/react";

interface ChapterHeaderProps {
  numeral: string;
  label: string;
  title: string;
  lead?: string;
  /** Tag for the title element. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
}

/**
 * Editorial chapter header used across the page.
 * Combines a Roman numeral marker, a mono section label, a Fraunces title
 * with optional italic emphasis (wrap with <em> in markdown-like syntax),
 * and an optional lead paragraph.
 */
export function ChapterHeader({
  numeral,
  label,
  title,
  lead,
  as: Tag = "h2",
  align = "left",
}: ChapterHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} max-w-[760px] ${align === "center" ? "mx-auto" : ""}`}>
      {/* Chapter marker — Roman numeral + label */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="chapter-marker mb-8"
      >
        <span className="roman">{numeral}</span>
        <span>{label}</span>
      </motion.div>

      {/* Title — Fraunces editorial */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
      >
        <Tag
          className="section-heading text-[44px] md:text-[68px] lg:text-[88px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </motion.div>

      {/* Lead — Geist sans, restrained */}
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 max-w-[520px] text-[15px] leading-[1.7] text-[var(--color-text-muted)]"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
