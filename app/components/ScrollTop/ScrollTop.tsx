"use client";

import { FC, useEffect, useRef, useState } from "react";

/* Constants */
import { EventNames } from "@/lib/constants/ui.constants";
/* Styles */
import styles from "./ScrollTop.module.css";

const ScrollTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleScroll = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsVisible(currentScrollY > viewportHeight);
      rafRef.current = null;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener(EventNames.Scroll, handleScroll);
    return () => {
      window.removeEventListener(EventNames.Scroll, handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button onClick={scrollToTop} className={styles.scrollTop} aria-label="Scroll to top">
      <span className={styles.caret} />
    </button>
  );
};

export default ScrollTop;
