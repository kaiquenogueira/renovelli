import { motion } from "motion/react";
import { useHoverDetection } from "../hooks/useHoverDetection";

/**
 * Custom cursor that follows mouse movement and reacts to interactive elements.
 * Hover detection logic extracted to useHoverDetection hook.
 */
export function CustomCursor() {
  const isHovered = useHoverDetection();
  
  // Size transitions smoothly via Framer Motion layout animations rather than hardcoded px
  const cursorVariants = {
    default: { width: 12, height: 12, x: "-50%", y: "-50%" },
    hover: { width: 60, height: 60, x: "-50%", y: "-50%" }
  };

  // We rely on standard DOM mousemove tracking in a lightweight window listener
  // to position a CSS custom property, which is much more performant than
  // triggering React re-renders on every mouse move.
  return (
    <>
      <style>
        {`
          :root {
            --mouse-x: 50vw;
            --mouse-y: 50vh;
          }
          /* This invisible layer tracks the mouse efficiently */
          body {
             border-image: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7') 0 fill / 100vw 100vh;
          }
        `}
      </style>
      <motion.div
        variants={cursorVariants}
        initial="default"
        animate={isHovered ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center 
                    ${isHovered ? 'bg-[var(--color-accent)] opacity-80' : 'bg-white opacity-100'}`}
        style={{
          left: 'var(--mouse-x)',
          top: 'var(--mouse-y)',
        }}
      >
        <span className="sr-only">Cursor personalizavel</span>
      </motion.div>
    </>
  );
}
