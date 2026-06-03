"use client";

import { ReactElement, useEffect, useRef, useState } from "react";

/* Constants */
import { CountDurationMs, Stats } from "@/lib/constants/about.constants";

/* Styles */
import styles from "./StatStrip.module.css";

const StatStrip = (): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const root = rootRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let start: number | null = null;

    if (!root || prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      // Skip the count-up: jump to final values on the next frame (deferred so we
      // don't call setState synchronously inside the effect).
      frame = requestAnimationFrame(() => setProgress(1));

      return () => cancelAnimationFrame(frame);
    }

    const animate = (timestamp: number): void => {
      if (start === null) {
        start = timestamp;
      }

      const elapsed = Math.min((timestamp - start) / CountDurationMs, 1);
      // easeOutCubic for a confident settle.
      const eased = 1 - Math.pow(1 - elapsed, 3);

      setProgress(eased);

      if (elapsed < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.strip}>
      {Stats.map((stat) => (
        <div key={stat.label} className={styles.item}>
          <span className={styles.value}>
            {Math.round(stat.value * progress)}
            <span className={styles.suffix}>{stat.suffix}</span>
          </span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatStrip;
