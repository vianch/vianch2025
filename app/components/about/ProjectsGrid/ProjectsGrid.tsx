import { ReactElement } from "react";

/* Constants */
import { Projects } from "@/lib/constants/seo.constants";

/* Utils */
import { getHostname } from "@/lib/utils/url.utils";

/* Styles */
import styles from "./ProjectsGrid.module.css";

const ProjectsGrid = (): ReactElement => {
  return (
    <div className={styles.grid}>
      {Projects.map((project) => (
        <a
          key={project.url}
          className={styles.card}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.head}>
            <span className={styles.name}>{project.label}</span>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </div>

          <p className={styles.description}>{project.description}</p>

          <span className={styles.host}>{getHostname(project.url)}</span>
        </a>
      ))}
    </div>
  );
};

export default ProjectsGrid;
