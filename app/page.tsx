/* Components */
import Gallery from "./components/Gallery/Gallery";

/* Constants */
import { galleryImages } from "@/lib/constants/gallery.constants";

/* Styles */
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="container">
      <h1 className={styles.title}>Photography</h1>

      <h2>Gallery</h2>
      <Gallery images={galleryImages} />

      <h2>More Photos</h2>
      <Gallery images={galleryImages} masonry />
    </main>
  );
}
