"use client";

import { ReactElement, useState } from "react";

/* Constants */
import { AboutFaqs } from "@/lib/constants/seo.constants";

/* Styles */
import styles from "./AboutFaq.module.css";

const AboutFaq = (): ReactElement => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number): void => {
    setOpenIndex((previous) => (previous === index ? -1 : index));
  };

  return (
    <div className={styles.list}>
      {AboutFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={faq.question} className={styles.item} data-open={isOpen}>
            <h3 className={styles.questionHeading}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={styles.question}
                id={buttonId}
                onClick={() => toggle(index)}
                type="button"
              >
                <span>{faq.question}</span>
                <span className={styles.toggle} aria-hidden="true" />
              </button>
            </h3>

            <div aria-labelledby={buttonId} className={styles.panel} id={panelId} role="region">
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutFaq;
