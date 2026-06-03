import { ReactElement, ReactNode } from "react";

/* Components */
import Reveal from "@/app/components/Reveal/Reveal";

/* Styles */
import styles from "./AboutSection.module.css";

type AboutSectionProps = {
  children: ReactNode;
  description?: string;
  eyebrow: string;
  id: string;
  title: string;
};

const AboutSection = ({
  children,
  description,
  eyebrow,
  id,
  title,
}: AboutSectionProps): ReactElement => {
  const headingId = `${id}-heading`;

  return (
    <section className={styles.section} id={id} aria-labelledby={headingId}>
      <Reveal>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
      </Reveal>

      <Reveal delay={90}>{children}</Reveal>
    </section>
  );
};

export default AboutSection;
