import { useState, useEffect, useCallback } from "react";

const HERO_IMAGES = [
  "/images/seq-1.jpg",
  "/images/seq-2.jpg",
  "/images/seq-3.jpg",
  "/images/seq-4.jpg",
];

/**
 * Asset-driven preloader that resolves when all critical hero images
 * are loaded, instead of using an arbitrary setTimeout.
 * 
 * Falls back to a max wait time to prevent infinite loading states.
 */
export function usePreloader(maxWaitMs = 4000): boolean {
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const imagePromises = HERO_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on failed images
          img.src = src;
        })
    );

    // Race between all images loaded and max wait timeout
    const timeoutId = setTimeout(finishLoading, maxWaitMs);

    Promise.all(imagePromises).then(() => {
      clearTimeout(timeoutId);
      // Small delay after load for the animation to breathe
      setTimeout(finishLoading, 300);
    });

    return () => clearTimeout(timeoutId);
  }, [maxWaitMs, finishLoading]);

  return isLoading;
}
