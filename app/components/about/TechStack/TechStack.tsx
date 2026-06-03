import { ReactElement } from "react";

/* Constants */
import { TechStackItems } from "@/lib/constants/about.constants";

/* Styles */
import styles from "./TechStack.module.css";

const TechStack = (): ReactElement => {
  return (
    <ul className={styles.list}>
      {TechStackItems.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default TechStack;
