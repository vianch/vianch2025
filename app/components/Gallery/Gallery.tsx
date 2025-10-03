"use client";

import { FC, useState, useEffect, KeyboardEvent } from "react";
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
  const [preloadedModalImages, setPreloadedModalImages] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const styles = masonry ? MasonryGalleryStyles : GalleryStyles;

  // Calculate columns for desktop
  const desktopColumns = images.length < 10 ? images.length : 6;
  const thumbImageConfig: ImageConfig = {
    fit: "thumb",
    h: 451,
    f: "center",
    q: 90,
  };

  const modalImageConfig: ImageConfig = {
    fit: "thumb",
    h: 1080,
    f: "center",
    q: 90,
  };

  // Preload adjacent modal images when an image is selected
  useEffect(() => {
    if (selectedImageIndex === null || !isClient()) {
      return;
    }

    const preloadImage = (index: number): void => {
      if (index < 0 || index >= images.length || images[index].link) {
        return;
      }

      const imageUrl = getContentfulImage(images[index].url, modalImageConfig);

      if (!preloadedModalImages.has(imageUrl)) {
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => {
          setPreloadedModalImages((prev) => new Set([...prev, imageUrl]));
        };
      }
    };

    // Preload current image
    preloadImage(selectedImageIndex);

    // Find and preload next non-linked image
    let nextIndex = selectedImageIndex + 1;
    while (nextIndex < images.length && images[nextIndex].link) {
      nextIndex++;
    }
    if (nextIndex < images.length) {
      preloadImage(nextIndex);
    }

    // Find and preload previous non-linked image
    let prevIndex = selectedImageIndex - 1;
    while (prevIndex >= 0 && images[prevIndex].link) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      preloadImage(prevIndex);
    }
  }, [selectedImageIndex, images, preloadedModalImages, modalImageConfig]);

  useEffect(() => {
    if (isClient()) {
      images.forEach((image) => {
        const img = new window.Image();
        const imageUrl = getContentfulImage(image.url, thumbImageConfig);

        img.src = imageUrl;
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, image.url]));
        };
      });
    }
  }, [images]);

  const handleImageClick = (image: GalleryItem, index: number): void => {
    if (!image.link) {
      setSelectedImage(image);
      setSelectedImageIndex(index);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    image: GalleryItem,
    index: number
  ): void => {
    if (event.key === KeyNames.Enter) {
      handleImageClick(image, index);
    }
  };

  const handlePrevImage = (): void => {
    if (selectedImageIndex === null) {
      return;
    }

    const prevIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
    let newIndex = prevIndex;

    while (images[newIndex].link) {
      newIndex = newIndex === 0 ? images.length - 1 : newIndex - 1;
      if (newIndex === prevIndex) break;
    }

    if (!images[newIndex].link) {
      setSelectedImage(images[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextImage = (): void => {
    if (selectedImageIndex === null) {
      return;
    }

    const nextIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
    let newIndex = nextIndex;

    while (images[newIndex].link) {
      newIndex = newIndex === images.length - 1 ? 0 : newIndex + 1;
      if (newIndex === nextIndex) break;
    }

    if (!images[newIndex].link) {
      setSelectedImage(images[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const getFirstNonLinkedImageIndex = (): number => {
    return images.findIndex((image) => !image.link);
  };

  const getLastNonLinkedImageIndex = (): number => {
    for (let i = images.length - 1; i >= 0; --i) {
      if (!images[i].link) {
        return i;
      }
    }

    return -1;
  };

  return (
    <>
      <section
        className={fullWidth ? styles.full : styles.gallery}
        style={fullWidth ? ({ "--desktop-columns": desktopColumns } as React.CSSProperties) : {}}
      >
        {images.map((image, index) => {
          const overrideLink = overrideImageLinks?.[index];
          const link = overrideLink ?? image.link;
          const hasLink = !!link;
          const isLoaded = loadedImages.has(image.url);
          const imageUrl = getContentfulImage(image.url, thumbImageConfig);

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
              <img
                className={styles.image}
                src={imageUrl}
                alt={image.title ?? "Gallery Image"}
                width={800}
                height={600}
                onClick={!hasLink ? () => handleImageClick(image, index) : undefined}
                onKeyDown={
                  hasLink
                    ? (e: KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, image, index)
                    : undefined
                }
              />

              <figcaption className={styles.caption}>
                {!hideTitle && <h3 className={styles.title}>{hasLink ? link : image.title}</h3>}

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
          onClose={() => {
            setSelectedImage(null);
            setSelectedImageIndex(null);
          }}
          image={selectedImage}
          hideTitle={hideTitle}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasNavigation={images.filter((img) => !img.link).length > 1}
          isFirst={selectedImageIndex === getFirstNonLinkedImageIndex()}
          isLast={selectedImageIndex === getLastNonLinkedImageIndex()}
          imageConfig={modalImageConfig}
          preloadedImages={preloadedModalImages}
        />
      )}
    </>
  );
};

export default Gallery;
