"use client";

import { FC, useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";

/* Constants */
import { KeyNames } from "@/lib/constants/ui.constants";

/* Components */
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import ImageModal from "../ImageModal/ImageModal";

/* Styles */
import GalleryStyles from "./Gallery.module.css";
import MasonryGalleryStyles from "./MasonryGallery.module.css";

/* Utils */
import { isClient } from "@/lib/utils/ui.utils";
import { getContentfulImage } from "@/lib/utils/images.utils";
import { getGalleryPath } from "@/lib/utils/url.utils";

type GalleryProps = {
  images: GalleryItem[];
  overrideImageLinks?: string[];
  masonry?: boolean;
  fullWidth?: boolean;
  hideTitle?: boolean;
};

const Gallery: FC<GalleryProps> = ({
  images,
  overrideImageLinks,
  masonry = false,
  fullWidth = false,
  hideTitle = false,
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const styles = masonry ? MasonryGalleryStyles : GalleryStyles;

  useEffect(() => {
    if (isClient()) {
      images.forEach((image) => {
        const img = new window.Image();
        img.src = image.url;
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, image.url]));
        };
      });
    }
  }, [images]);

  const handleImageClick = (image: GalleryItem): void => {
    if (!image.link) {
      setSelectedImage(image);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, image: GalleryItem): void => {
    if (e.key === KeyNames.Enter) {
      handleImageClick(image);
    }
  };

  return (
    <>
      <section className={fullWidth ? styles.full : styles.gallery}>
        {images.map((image, index) => {
          const overrideLink = overrideImageLinks?.[index];
          const link = overrideLink ?? image.link;
          const hasLink = !!link;
          const isLoaded = loadedImages.has(image.url);
          const imageUrl = getContentfulImage(image.url, {
            fit: "thumb",
            h: 380,
            f: "center",
            q: 80,
          });

          if (!isLoaded) {
            return (
              <ImagePlaceholder
                key={`placeholder-${image.url}-${index}`}
                count={1}
                fullWidth={fullWidth}
              />
            );
          }

          const imageContent = (
            <>
              <Image
                className={styles.image}
                src={imageUrl}
                alt={image.title ?? "Gallery Image"}
                width={800}
                height={600}
                onClick={!hasLink ? () => handleImageClick(image) : undefined}
                onKeyDown={
                  hasLink
                    ? (e: KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, image)
                    : undefined
                }
                priority={index < 4}
              />

              <figcaption className={styles.caption}>
                {!hideTitle && <h3 className={styles.title}>{image.title}</h3>}

                {masonry && image?.description && (
                  <p className={styles.description}>{image.description}</p>
                )}
              </figcaption>
            </>
          );

          return (
            <figure key={`${image.url}-${index}`} className={styles.figure}>
              {hasLink ? (
                <Link href={getGalleryPath(link ?? "/")}>{imageContent}</Link>
              ) : (
                <>{imageContent}</>
              )}
            </figure>
          );
        })}
      </section>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </>
  );
};

export default Gallery;
