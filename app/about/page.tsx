import { ReactElement } from "react";
import type { Metadata } from "next";
import Link from "next/link";

/* Components */
import JsonLd from "../components/JsonLd/JsonLd";
import Reveal from "../components/Reveal/Reveal";
import SnipPet from "../components/SnipPet/SnipPet";
import AboutFaq from "../components/about/AboutFaq/AboutFaq";
import AboutHero from "../components/about/AboutHero/AboutHero";
import AboutSection from "../components/about/AboutSection/AboutSection";
import ContactStrip from "../components/about/ContactStrip/ContactStrip";
import DisciplineGrid from "../components/about/DisciplineGrid/DisciplineGrid";
import ProjectsGrid from "../components/about/ProjectsGrid/ProjectsGrid";
import RichText from "../components/about/RichText/RichText";
import StatStrip from "../components/about/StatStrip/StatStrip";
import TechStack from "../components/about/TechStack/TechStack";

/* Constants */
import {
  AboutFacts,
  AboutGlanceTitle,
  AboutMetaDescription,
  AboutSections,
  AboutStatus,
  CtaPrimaryLabel,
  CtaSecondaryLabel,
  CtaText,
  CtaTitleAccent,
  CtaTitleLead,
  StoryProse,
} from "@/lib/constants/about.constants";
import { AboutFaqs, AboutKeywords, DefaultSeo, OgType } from "@/lib/constants/seo.constants";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";
import {
  buildSchemaGraph,
  getBreadcrumbNode,
  getFaqNode,
  getPersonNode,
  getProfilePageNode,
} from "@/lib/utils/structured-data.utils";

/* Styles */
import styles from "./About.module.css";

export const metadata: Metadata = generateSeoMetadata({
  title: "About",
  description: AboutMetaDescription,
  keywords: AboutKeywords,
  canonicalUrl: "/about",
  ogType: OgType.Profile,
});

const aboutSchema = buildSchemaGraph([
  getPersonNode(),
  getProfilePageNode(),
  getFaqNode(AboutFaqs),
  getBreadcrumbNode([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
]);

const AboutPage = (): ReactElement => {
  return (
    <main className={styles.page}>
      <JsonLd data={aboutSchema} />

      <AboutHero />

      <div className="container">
        <Reveal className={styles.statsReveal}>
          <StatStrip />
        </Reveal>

        <AboutSection id="story" {...AboutSections.story}>
          <div className={styles.storyGrid}>
            <div className={styles.prose}>
              {StoryProse.map((paragraph, index) => (
                <p key={index}>
                  <RichText segments={paragraph} />
                </p>
              ))}
            </div>

            <aside className={styles.aside}>
              <div className={styles.asideCard}>
                <span className={styles.asideTitle}>{AboutGlanceTitle}</span>

                <dl className={styles.asideList}>
                  {AboutFacts.map((fact) => (
                    <div key={fact.label} className={styles.asideRow}>
                      <dt className={styles.asideLabel}>{fact.label}</dt>
                      <dd className={styles.asideValue}>{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <span className={styles.asideStatus}>
                  <span className={styles.asideStatusDot} aria-hidden="true" />
                  {AboutStatus}
                </span>
              </div>
            </aside>
          </div>
        </AboutSection>

        <AboutSection id="work" {...AboutSections.work}>
          <DisciplineGrid />
        </AboutSection>

        <AboutSection id="stack" {...AboutSections.stack}>
          <TechStack />
        </AboutSection>

        <AboutSection id="projects" {...AboutSections.projects}>
          <ProjectsGrid />
        </AboutSection>

        <AboutSection id="faq" {...AboutSections.faq}>
          <AboutFaq />
        </AboutSection>

        <AboutSection id="contact" {...AboutSections.contact}>
          <ContactStrip />
        </AboutSection>
      </div>

      <Reveal>
        <section className={styles.ctaBand} aria-labelledby="about-cta-heading">
          <div className={styles.ctaInner}>
            <h2 id="about-cta-heading" className={styles.ctaTitle}>
              {CtaTitleLead}
              <span>{CtaTitleAccent}</span>
            </h2>
            <p className={styles.ctaText}>{CtaText}</p>
            <div className={styles.ctaActions}>
              <a href={`mailto:${DefaultSeo.email}`} className="button button-tertiary">
                {CtaPrimaryLabel}
              </a>
              <Link href="/" className="button button-secondary">
                {CtaSecondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <SnipPet />
    </main>
  );
};

export default AboutPage;
