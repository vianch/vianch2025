import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

/* Styles */
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <section className={styles.navbar}>
      <Link href="/">
        <Image src="/images/logo-xs-contrast.png" alt="Logo" width={48} height={48} priority />
      </Link>
      <Link href="/about">About</Link>
      <Link href="/photography">Photography</Link>
      <Link href="/portfolio">Portfolio</Link>
    </section>
  );
};

export default Navbar;
