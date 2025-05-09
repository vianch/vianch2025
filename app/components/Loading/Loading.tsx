import { FC } from "react";

/* Styles */
import styles from "./Loading.module.css";

const Loading: FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}>
        <span className={styles.dots}>...</span>
      </div>
    </div>
  );
};

export default Loading;
