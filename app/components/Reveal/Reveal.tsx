"use client";

import { ReactElement, ReactNode } from "react";

/* Hooks */
import useRevealOnScroll from "./useRevealOnScroll";

/* Styles */
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Wraps content in a scroll-triggered fade-and-rise reveal. Honors
 * prefers-reduced-motion (the animation is opted-in via the stylesheet) and
 * stays accessible since it only animates transform/opacity.
 */
const Reveal = ({ children, className = "", delay = 0 }: RevealProps): ReactElement => {
  const { isVisible, ref } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className}`}
      data-revealed={isVisible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
