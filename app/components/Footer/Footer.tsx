import { FC } from "react";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="text-xs">
          <Link href="/">
            <img
              src="/images/logo-xs-contrast.png"
              alt="VIANCH logo"
              width={24}
              height={24}
              className={styles.footerLogo}
            />
          </Link>
          <span>Coded with ♥ by @vianch</span>

          <Link className={styles.anchorItem} href="/about?contact=active">
            Contact
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
