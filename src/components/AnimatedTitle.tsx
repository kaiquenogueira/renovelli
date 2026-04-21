import { motion } from "motion/react";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  /** Delay in seconds before the animation starts. Explicit naming avoids confusion. */
  delaySeconds?: number;
  /** The HTML tag to render the title as. Defaults to 'div'. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p";
}

/**
 * Awwwards-style typography reveal using masked translated spans.
 * Each word slides up from below with a slight rotation and blur,
 * creating a premium "camera focus" entrance effect.
 */
export function AnimatedTitle({ text, className = "", delaySeconds = 0, as: Tag = "div" }: AnimatedTitleProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delaySeconds,
      },
    },
  };

  const child = {
    visible: {
      y: "0%",
      rotateZ: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
    hidden: {
      y: "115%",
      rotateZ: 3,
      opacity: 0,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.div
      as={Tag}
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", margin: "-0.2em", padding: "0.2em" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.25em", paddingBottom: "0.1em" }}>
          <motion.span style={{ display: "inline-block", transformOrigin: "bottom left" }} variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
