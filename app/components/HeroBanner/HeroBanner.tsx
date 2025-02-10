"use client";

import { FC, useState, useEffect } from "react";

/* Components */
import HeroBannerPlaceholder from "../HeroBannerPlaceholder/HeroBannerPlaceholder";

/* Styles */
import defaultStyles from "./HeroBanner.module.css";
import secondaryStyles from "./HeroBannerSecondary.module.css";

/* Utils */
import { isClient } from "@/lib/utils/ui.utils";
import { getContentfulImage } from "@/lib/utils/images.utils";
import Link from "next/link";

type HeroBannerProps = {
  heroImage: string;
  title: string;
  year: string;
  description: string;
  variant?: "default" | "secondary";
  link?: string | null;
};

const HeroBanner: FC<HeroBannerProps> = ({
  heroImage,
  title,
  year,
  description,
  variant = "default",
  link = null,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const styles = variant === "default" ? defaultStyles : secondaryStyles;
  const hasLink = !!link;
  const imageUrl = getContentfulImage(heroImage, {
    fit: "thumb",
    w: 1920,
    f: "center",
    q: 90,
  });

  useEffect(() => {
    if (isClient()) {
      const img = new window.Image();
      img.src = imageUrl;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [heroImage]);

  if (!isImageLoaded) {
    return <HeroBannerPlaceholder variant={variant} />;
  }

  const mainContent = (
    <>
      <div className={styles.texts}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.description}>From: {year}</span>
        <p className={styles.description}>{description}</p>
      </div>

      <figure className={styles.figure}>
        <img src={imageUrl} alt={title ?? "Hero Banner"} className={styles.image} />
      </figure>
    </>
  );

  return (
    <section className={styles.banner}>
      {hasLink ? (
        <Link className={styles.figure} href={link}>
          {mainContent}
        </Link>
      ) : (
        mainContent
      )}
    </section>
  );
};

export default HeroBanner;
