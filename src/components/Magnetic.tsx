import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  key?: React.Key;
}

/**
 * Wrapper that creates a magnetic pull effect on hover.
 * Uses Framer Motion's useMotionValue and useSpring for 60fps+ performance
 * by bypassing React's render cycle during mouse movement.
 */
export function Magnetic({ children, strength = 0.5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values track the raw offset without triggering re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs add the "smooth attraction" and "snap back" physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();

    if (boundingRect) {
      const { width, height, left, top } = boundingRect;
      
      // Calculate center of the stable container
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Set the target position based on mouse distance and strength
      mouseX.set((clientX - centerX) * strength);
      mouseY.set((clientY - centerY) * strength);
    }
  };

  const handleMouseLeave = () => {
    // Reset position to center when mouse leaves the container
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic relative inline-block"
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}
