import { FC } from "react";

/* Styles */
import styles from "./Navbar.module.css";

/* eslint-disable @next/next/no-html-link-for-pages --
 *
 * Navbar links use plain anchors (not next/link) on purpose: a full-page
 * navigation guarantees a fresh server render on every click. Client-side (SPA)
 * navigation between the dynamic home and the static routes was leaving the
 * destination blank in Safari and duplicated in some Chrome profiles; a real
 * navigation sidesteps that entirely.
 */

const Navbar: FC = () => {
  return (
    <section className={styles.navbar}>
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
