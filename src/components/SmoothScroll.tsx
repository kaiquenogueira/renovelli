import type { ReactNode } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

/**
 * Wrapper component that initializes Lenis smooth scrolling.
 * Delegates all logic to the useSmoothScroll hook.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
