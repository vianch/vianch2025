import { FC } from "react";

/* Styles */
import styles from "./Navbar.module.css";

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
