"use client";

import { RefObject, useEffect, useRef, useState } from "react";

/**
 * Reveals an element the first time it scrolls into view. Falls back to visible
 * immediately when IntersectionObserver is unavailable (SSR / old browsers), so
 * content is never hidden if the observer can't run.
 */
const useRevealOnScroll = (): {
  isVisible: boolean;
  ref: RefObject<HTMLDivElement | null>;
} => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      // No observer support (or no node): reveal on the next tick rather than
      // synchronously inside the effect, so there is no cascading render.
      const fallback = window.setTimeout(() => setIsVisible(true), 0);

      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { isVisible, ref };
};

export default useRevealOnScroll;
