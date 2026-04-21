import { useRef, useState } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

/**
 * Wrapper that creates a magnetic pull effect on hover.
 * The child element follows the mouse within the container bounds,
 * springing back to center on mouse leave.
 */
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const boundingRect = ref.current?.getBoundingClientRect();
    if (!boundingRect) return;

    const { width, height, top, left } = boundingRect;
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="magnetic inline-block"
    >
      {children}
    </motion.div>
  );
}
