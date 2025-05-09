import { FC } from "react";
import Link from "next/link";

/* Styles */
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <section className={styles.navbar}>
      <Link href="/">
        <img src="/images/logo-xs-contrast.png" alt="Logo" width={48} height={48} />
      </Link>

      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </div>
    </section>
  );
};

export default Navbar;
