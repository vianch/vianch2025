"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* Components */
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";

/* Styles */
import GalleryStyles from "./Gallery.module.css";
import MasonryGalleryStyles from "./MasonryGallery.module.css";
import { isClient } from "@/utils/ui.utils";

type GalleryProps = {
  images: GalleryImage[];
  masonry?: boolean;
  fullWidth?: boolean;
};

const Gallery: FC<GalleryProps> = ({ images, masonry = false, fullWidth = false }) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const styles = masonry ? MasonryGalleryStyles : GalleryStyles;

  useEffect(() => {
    if (isClient()) {
      images.forEach((image) => {
        const img = new window.Image();
        img.src = image.src;
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, image.src]));
        };
      });
    }
  }, [images]);

  return (
    <section className={fullWidth ? styles.full : styles.gallery}>
      {images.map((image, index) => {
        const isLoaded = loadedImages.has(image.src);

        if (!isLoaded) {
          return (
            <ImagePlaceholder
              key={`placeholder-${image.src}-${index}`}
              count={1}
              fullWidth={fullWidth}
            />
          );
        }

        return (
          <figure key={`${image.src}-${index}`} className={styles.figure}>
            <Link href={`/gallery/${image.url}`}>
              <Image
                className={styles.image}
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                priority={index < 4}
              />
              <figcaption className={styles.caption}>
                <h3 className={styles.title}>{image.title}</h3>
                {masonry && image?.description && (
                  <p className={styles.description}>{image.description}</p>
                )}
              </figcaption>
            </Link>
          </figure>
        );
      })}
    </section>
  );
};

export default Gallery;
