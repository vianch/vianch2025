import { FC } from "react";
import Image from "next/image";

/* Styles */
import styles from "./HeroBanner.module.css";

type HeroBannerProps = {
  heroImage: string;
  title: string;
  year: string;
  description: string;
};

const HeroBanner: FC<HeroBannerProps> = ({ heroImage, title, year, description }) => {
  return (
    <section className={styles.banner}>
      <div className={styles.texts}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.description}>From: {year}</span>
        <p className={styles.description}>{description}</p>
      </div>

      <figure className={styles.figure}>
        <Image src={heroImage} alt="Hero Banner" fill className={styles.image} priority />
      </figure>
    </section>
  );
};

export default HeroBanner;
