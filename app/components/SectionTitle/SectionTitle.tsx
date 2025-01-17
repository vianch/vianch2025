import { FC } from "react";
import Link from "next/link";

/* Styles */
import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
  title: string;
  description?: string;
  link?: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ title, description = null, link = null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      {link && (
        <Link href={link} className={styles.link}>
          See All &rarr;
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
