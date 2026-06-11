"use client";

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";

/* Components */
import Loading from "../Loading/Loading";

/* Constants */
import { HeroImageConfig, LowQualityImageConfig } from "@/lib/constants/images.constants";
import { HeroRotationIntervalMs } from "@/lib/constants/ui.constants";

/* Utils */
import { getContentfulImage } from "@/lib/utils/images.utils";
import { getGalleryPath } from "@/lib/utils/url.utils";

/* Styles */
import styles from "./HomeHero.module.css";

type HomeHeroProps = {
  initialSlideIndex?: number;
  slides: HeroSlide[];
};

const HomeHero = ({ initialSlideIndex = 0, slides }: HomeHeroProps): ReactElement => {
  /* Seeded from the server-picked random index; clamped as a guard against out-of-range values */
  const [activeIndex, setActiveIndex] = useState(
    slides.length > 0 ? initialSlideIndex % slides.length : 0
  );
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  /* Advance to the next collection on a fixed interval */
  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const rotationTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, HeroRotationIntervalMs);

    return (): void => window.clearInterval(rotationTimer);
  }, [slides.length]);

  /* Preload the active and upcoming hero images so a crossfade never lands on a blank frame */
  useEffect(() => {
    [activeIndex, (activeIndex + 1) % slides.length].forEach((slideIndex) => {
      const slide = slides[slideIndex];

      if (!slide) {
        return;
      }

      const highQualityUrl = getContentfulImage(slide.imageUrl, HeroImageConfig);

      if (loadedImages[highQualityUrl]) {
        return;
      }

      const preloadedImage = new window.Image();

      preloadedImage.src = highQualityUrl;
      preloadedImage.onload = (): void => {
        setLoadedImages((currentImages) => ({ ...currentImages, [highQualityUrl]: true }));
      };
    });
  }, [activeIndex, slides, loadedImages]);

  const activeSlide = slides[activeIndex];

  if (!activeSlide) {
    return <section className={styles.hero} />;
  }

  const activeLink = activeSlide.slug ? getGalleryPath(activeSlide.slug) : null;
  const activeKey = activeSlide.slug || activeSlide.title;

  return (
    <section className={styles.hero}>
      {/* Image layers: one stacked slide per collection, crossfaded */}
      <div className={styles.imageWrapper}>
        {slides.map((slide, slideIndex) => {
          const lqipUrl = getContentfulImage(slide.imageUrl, LowQualityImageConfig);
          const highQualityUrl = getContentfulImage(slide.imageUrl, HeroImageConfig);
          const isActive = slideIndex === activeIndex;

          return (
            <div
              key={slide.slug || slide.title}
              className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
              aria-hidden={!isActive}
            >
              <img className={styles.imageLqip} src={lqipUrl} alt="" aria-hidden="true" />
              {Boolean(loadedImages[highQualityUrl]) && (
                <img className={styles.imageHq} src={highQualityUrl} alt={slide.title} />
              )}
            </div>
          );
        })}
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Text content — keyed by slide so the reveal animations replay on each rotation */}
      <div className={styles.content} key={activeKey}>
        <h1 className={styles.title}>{activeSlide.title}</h1>

        <div className={styles.meta}>
          <span className={styles.year}>{activeSlide.year}</span>
          <span className={styles.divider} />
          <p className={styles.description}>{activeSlide.description}</p>
        </div>

        {activeLink && (
          <Link href={activeLink} className={styles.heroLink}>
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
