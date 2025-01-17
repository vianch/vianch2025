import { FC } from "react";

/* Styles */
import styles from "./ImagePlaceholder.module.css";

type ImagePlaceholderProps = {
  count: number;
  fullWidth?: boolean;
};

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({ count, fullWidth = false }) => {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <section className={`${styles.gallery} ${fullWidth ? styles.full : ""}`}>
      {items.map((item) => (
        <figure key={item} className={styles.figure}>
          <div className={styles.placeholder} />
          <figcaption className={styles.caption}>
            <div className={`${styles.placeholder} ${styles.title}`} />
            <div className={`${styles.placeholder} ${styles.description}`} />
          </figcaption>
        </figure>
      ))}
    </section>
  );
};

export default ImagePlaceholder;
