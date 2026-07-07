"use client";

import { FC, useEffect, useState } from "react";

/* Constants */
import { EventNames } from "@/lib/constants/ui.constants";

/* Styles */
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener(EventNames.Scroll, handleScroll, { passive: true });

    return (): void => window.removeEventListener(EventNames.Scroll, handleScroll);
  }, []);

  return (
    <section className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <a href="/">
        <img src="/images/logo-xs-contrast.png" alt="Logo" width={48} height={48} />
      </a>

      <div className={styles.navLinks}>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
      </div>
    </section>
  );
};

export default Navbar;
