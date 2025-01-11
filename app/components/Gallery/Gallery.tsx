import { FC } from "react";
import Image from "next/image";

/* Constants */
import { galleryImages } from "@/lib/constants/gallery.constants";

/* Styles */
import styles from "./Gallery.module.css";

const Gallery: FC = () => {
  return (
    <section className={styles.gallery}>
      {galleryImages.map((image, index) => (
        <figure className={styles.figure} key={`${image.src}-${index + 1}`}>
          <Image
            className={styles.image}
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
          />
          <figcaption className={styles.caption}>
            <h3 className={styles.title}>{image.title}</h3>
            <p className={styles.description}>{image.description}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
};

export default Gallery;
