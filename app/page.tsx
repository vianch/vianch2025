import Gallery from "./components/Gallery/Gallery";

/* Styles */
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="container">
      <h1 className={styles.title}>Photography</h1>

      <h2>Latest photos</h2>
      <Gallery />

      <h2>Portraits</h2>
      <Gallery />
    </main>
  );
}
