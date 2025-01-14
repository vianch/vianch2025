import { FC } from "react";
import Image from "next/image";

/* Styles */
import GalleryStyles from "./Gallery.module.css";
import MasonryGalleryStyles from "./MasonryGallery.module.css";

type GalleryProps = {
  images: GalleryImage[];
  masonry?: boolean;
  fullWidth?: boolean;
};

const Gallery: FC<GalleryProps> = ({ images, masonry = false, fullWidth = false }) => {
  const styles = masonry ? MasonryGalleryStyles : GalleryStyles;

  return (
    <section className={fullWidth ? styles.full : styles.gallery}>
      {images.map((image, index) => (
        <figure key={`${image.src}-${index}`} className={styles.figure}>
          <Image
            className={styles.image}
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
          />
          <figcaption className={styles.caption}>
            <h3 className={styles.title}>{image.title}</h3>
            {masonry && image?.description && (
              <p className={styles.description}>{image.description}</p>
            )}
          </figcaption>
        </figure>
      ))}
    </section>
  );
};

export default Gallery;
