import { ReactElement } from "react";

/* Constants */
import { Disciplines } from "@/lib/constants/about.constants";

/* Components */
import Camera from "../../icons/Camera";
import Code from "../../icons/Code";
import Spark from "../../icons/Spark";

/* Styles */
import styles from "./DisciplineGrid.module.css";

/* Maps a discipline's iconKey to its icon (component-specific runtime lookup). */
const DisciplineIcons: Record<AboutIconKey, (props: Icon) => ReactElement> = {
  camera: Camera,
  code: Code,
  spark: Spark,
};

const DisciplineGrid = (): ReactElement => {
  return (
    <div className={styles.grid}>
      {Disciplines.map((discipline, index) => {
        const IconComponent = DisciplineIcons[discipline.iconKey];

        return (
          <article key={discipline.title} className={styles.card}>
            <span className={styles.index}>0{index + 1}</span>

            <span className={styles.icon}>
              <IconComponent className="" fill="currentColor" height="100%" width="100%" />
            </span>

            <h3 className={styles.title}>{discipline.title}</h3>
            <p className={styles.description}>{discipline.description}</p>

            <ul className={styles.tags}>
              {discipline.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
};

export default DisciplineGrid;
