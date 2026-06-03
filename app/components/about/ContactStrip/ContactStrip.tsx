import { ReactElement } from "react";

/* Constants */
import { DefaultSeo, SocialLinks } from "@/lib/constants/seo.constants";

/* Components */
import Behance from "../../icons/Behance";
import GitHub from "../../icons/GitHub";
import Instagram from "../../icons/Instagram";
import LinkedIn from "../../icons/LinkedIn";
import Mail from "../../icons/Mail";
import XTwitter from "../../icons/XTwitter";

/* Styles */
import styles from "./ContactStrip.module.css";

/* Maps a SocialLinks label to its brand icon (component-specific runtime lookup). */
const SocialIcons: Record<string, (props: Icon) => ReactElement> = {
  Behance,
  GitHub,
  Instagram,
  LinkedIn,
  "X (Twitter)": XTwitter,
};

const ContactStrip = (): ReactElement => {
  return (
    <ul className={styles.list}>
      <li>
        <a className={styles.link} href={`mailto:${DefaultSeo.email}`}>
          <span className={styles.icon}>
            <Mail className="" fill="currentColor" height="100%" width="100%" />
          </span>
          <span className={styles.text}>
            <span className={styles.label}>Email</span>
            <span className={styles.detail}>{DefaultSeo.email}</span>
          </span>
        </a>
      </li>

      {SocialLinks.map((social) => {
        const IconComponent = SocialIcons[social.label];

        return (
          <li key={social.url}>
            <a className={styles.link} href={social.url} target="_blank" rel="noopener noreferrer">
              <span className={styles.icon}>
                {IconComponent ? (
                  <IconComponent className="" fill="currentColor" height="100%" width="100%" />
                ) : null}
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{social.label}</span>
                <span className={styles.detail}>
                  {social.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactStrip;
