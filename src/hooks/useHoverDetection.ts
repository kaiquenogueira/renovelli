import { useEffect, useState, useCallback } from "react";

/**
 * Detects hover state over interactive elements (links, buttons, magnetic elements)
 * using event delegation on the window. Returns a boolean hover state.
 * 
 * Separated from CustomCursor to follow SRP — cursor rendering
 * shouldn't be coupled to hover detection logic.
 */
export function useHoverDetection(): boolean {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName.toLowerCase() === "a" ||
      target.tagName.toLowerCase() === "button" ||
      target.closest("a") ||
      target.closest("button") ||
      target.classList.contains("magnetic") ||
      target.classList.contains("group")
    ) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseOver, handleMouseOut]);

  return isHovered;
}
