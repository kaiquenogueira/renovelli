import { useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import type { PointerEvent } from "react";
import type { MotionValue } from "motion/react";

interface MouseReflectionResult {
  /** Radial gradient glow that follows the mouse */
  backgroundGlow: MotionValue<string>;
  /** Horizontal sheen offset (moves in reverse for convex reflection) */
  sheenX: MotionValue<string>;
  /** Handler to attach to the container's onPointerMove */
  handlePointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  /** Handler to attach to the container's onPointerLeave */
  handlePointerLeave: () => void;
}

/**
 * Creates a mouse-reactive reflection/glow effect that simulates
 * a ceramic polish or wet paint reflection on the final car image.
 * 
 * Separated from HeroTransformation to follow SRP — visual effects
 * shouldn't be coupled to scroll sequencing or layout logic.
 */
export function useMouseReflection(): MouseReflectionResult {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gradientX = useTransform(smoothMouseX, [0, 1], ["0%", "100%"]);
  const gradientY = useTransform(smoothMouseY, [0, 1], ["0%", "100%"]);

  // Moving in reverse to simulate convex reflection
  const sheenX = useTransform(smoothMouseX, [0, 1], ["30%", "-30%"]);

  const backgroundGlow = useMotionTemplate`radial-gradient(circle 600px at ${gradientX} ${gradientY}, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return { backgroundGlow, sheenX, handlePointerMove, handlePointerLeave };
}
