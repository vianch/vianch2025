import { ReactElement } from "react";
import Link from "next/link";

/* Styles */
import styles from "./NotFound.module.css";

const NotFound = (): ReactElement => {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className={styles.homeLink}>
        Back to homepage
      </Link>
    </main>
  );
};

export default NotFound;
