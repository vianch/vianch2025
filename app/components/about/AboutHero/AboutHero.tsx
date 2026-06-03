"use client";

import { ReactElement, useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Constants */
import {
  ApertureCaption,
  HeroAlias,
  HeroEyebrow,
  HeroLead,
  HeroName,
  HeroPrimaryCtaLabel,
  HeroRolePrefix,
  HeroSecondaryCtaLabel,
  RoleIntervalMs,
  Roles,
  ScrollHintLabel,
} from "@/lib/constants/about.constants";
import { DefaultSeo } from "@/lib/constants/seo.constants";

/* Components */
import RichText from "../RichText/RichText";

/* Styles */
import styles from "./AboutHero.module.css";

const AboutHero = (): ReactElement => {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number>(0);
  const [roleIndex, setRoleIndex] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % Roles.length);
    }, RoleIntervalMs);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent): void => {
      cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const offsetX = ((event.clientX - bounds.left) / bounds.width) * 100;
        const offsetY = ((event.clientY - bounds.top) / bounds.height) * 100;

        hero.style.setProperty("--pointer-x", `${offsetX}%`);
        hero.style.setProperty("--pointer-y", `${offsetY}%`);
      });
    };

    hero.addEventListener("pointermove", handlePointerMove);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="about-hero-heading">
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {HeroEyebrow}
          </p>

          <h1 id="about-hero-heading" className={styles.name}>
            {HeroName}
            <span className={styles.alias}>{HeroAlias}</span>
          </h1>

          <p className={styles.roleLine} aria-live="polite">
            <span className={styles.rolePrefix}>{HeroRolePrefix}</span>
            <span key={roleIndex} className={styles.role}>
              {Roles[roleIndex]}
            </span>
          </p>

          <p className={styles.lead}>
            <RichText segments={HeroLead} />
          </p>

          <div className={styles.actions}>
            <Link href="/" className="button button-primary">
              {HeroPrimaryCtaLabel}
            </Link>
            <a href={`mailto:${DefaultSeo.email}`} className="button button-secondary">
              {HeroSecondaryCtaLabel}
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.aperture}>
            <svg viewBox="0 0 200 200" className={styles.apertureSvg}>
              <defs>
                <radialGradient id="apertureCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-orange)" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="var(--color-navy)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="var(--color-navy)" stopOpacity="1" />
                </radialGradient>
              </defs>

              <circle className={styles.apertureRing} cx="100" cy="100" r="92" />
              <circle className={styles.apertureRingInner} cx="100" cy="100" r="74" />

              <g className={styles.apertureBlades}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <polygon
                    key={index}
                    className={styles.blade}
                    points="100,100 100,28 168,64"
                    transform={`rotate(${index * 60} 100 100)`}
                  />
                ))}
              </g>

              <circle cx="100" cy="100" r="22" fill="url(#apertureCore)" />
            </svg>

            <span className={styles.apertureCaption}>{ApertureCaption}</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollDot} />
        {ScrollHintLabel}
      </div>
    </section>
  );
};

export default AboutHero;
