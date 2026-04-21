import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  isLoading: boolean;
}

/**
 * Full-screen brand preloader overlay with curtain-reveal exit animation.
 * Uses a custom cubic-bezier easing for premium motion feel.
 */
export function Preloader({ isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-[var(--color-bg-dark)] flex items-center justify-center flex-col"
        >
          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: 'var(--font-logo)' }}
            className="text-[var(--color-accent)] text-[56px] md:text-[80px] italic font-medium overflow-hidden drop-shadow-lg"
          >
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="block"
            >
              Renovelli
            </motion.span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 tracking-[4px] text-xs font-bold uppercase mt-4"
          >
            Preparando sua experiência
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
