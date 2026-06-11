"use client";

import { ReactElement, useState, useEffect } from "react";
import Link from "next/link";

/* Components */
import Loading from "../Loading/Loading";

/* Constants */
import { HeroImageConfig, LowQualityImageConfig } from "@/lib/constants/images.constants";

/* Utils */
import { isClient } from "@/lib/utils/ui.utils";
import { getContentfulImage } from "@/lib/utils/images.utils";

/* Styles */
import styles from "./HomeHero.module.css";

type HomeHeroProps = {
  heroImage: string;
  link: string | null;
  title: string;
  year: string;
  description: string;
};

const HomeHero = ({ heroImage, title, year, description, link }: HomeHeroProps): ReactElement => {
  const [isHqLoaded, setIsHqLoaded] = useState(false);

  const lqipUrl = getContentfulImage(heroImage, LowQualityImageConfig);
  const hqUrl = getContentfulImage(heroImage, HeroImageConfig);

  useEffect(() => {
    if (isClient()) {
      const img = new window.Image();
      img.src = hqUrl;
      img.onload = (): void => setIsHqLoaded(true);
    }
  }, [hqUrl]);

  return (
    <section className={styles.hero}>
      {/* Image layers: LQIP + HQ */}
      <div className={styles.imageWrapper}>
        <img className={styles.imageLqip} src={lqipUrl} alt="" aria-hidden="true" />
        <img
          className={`${styles.imageHq} ${isHqLoaded ? styles.imageLoaded : ""}`}
          src={hqUrl}
          alt={title}
        />
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Text content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.divider} />
          <p className={styles.description}>{description}</p>
        </div>

        {link && (
          <Link href={link} className={styles.heroLink}>
            Explore Collection
            <span className={styles.heroLinkArrow}>&rarr;</span>
          </Link>
        )}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <Loading />
      </div>
    </section>
  );
};

export default HomeHero;
