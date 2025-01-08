import { FC } from "react";

/* Styles */
import styles from "./Loading.module.css";

const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      Connecting to the server<span className={styles.dots}>...</span>
    </div>
  );
};

export default Loading;
