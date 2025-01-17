"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";

/* Components */
import HeroBannerPlaceholder from "../HeroBannerPlaceholder/HeroBannerPlaceholder";

/* Styles */
import defaultStyles from "./HeroBanner.module.css";
import secondaryStyles from "./HeroBannerSecondary.module.css";

/* Utils */
import { isClient } from "@/utils/ui.utils";

type HeroBannerProps = {
  heroImage: string;
  title: string;
  year: string;
  description: string;
  variant?: "default" | "secondary";
};

const HeroBanner: FC<HeroBannerProps> = ({
  heroImage,
  title,
  year,
  description,
  variant = "default",
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const styles = variant === "default" ? defaultStyles : secondaryStyles;

  useEffect(() => {
    if (isClient()) {
      const img = new window.Image();
      img.src = heroImage;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [heroImage]);

  if (!isImageLoaded) {
    return <HeroBannerPlaceholder variant={variant} />;
  }

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
