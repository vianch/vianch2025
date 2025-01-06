import Terminal from "./components/Terminal/Terminal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Terminal />
      </main>
    </div>
  );
}
