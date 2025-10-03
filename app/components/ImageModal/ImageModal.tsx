"use client";

import { FC, ReactElement, useEffect, useState } from "react";

/* Styles */
import styles from "./ImageModal.module.css";

/* Constants */
import { KeyNames } from "@/lib/constants/ui.constants";

/* Utils */
import { getContentfulImage } from "@/lib/utils/images.utils";
import { isClient } from "@/lib/utils/ui.utils";

type ImageModalProps = {
  isOpen: boolean;
  hideTitle?: boolean;
  hasNavigation?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onClose: () => void;
  image: {
    url: string;
    title: string;
    description?: string;
  };
  onPrev?: () => void;
  onNext?: () => void;
  imageConfig?: ImageConfig;
  preloadedImages?: Set<string>;
};

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  image,
  hideTitle = false,
  hasNavigation = false,
  isFirst = false,
  isLast = false,
  onClose,
  onPrev,
  onNext,
  imageConfig,
  preloadedImages,
}): ReactElement | null => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [showLowQuality, setShowLowQuality] = useState<boolean>(false);

  const defaultImageConfig: ImageConfig = {
    fit: "thumb",
    h: 1080,
    f: "center",
    q: 90,
  };

  const lowQualityConfig: ImageConfig = {
    fit: "thumb",
    h: 400,
    f: "center",
    q: 30,
  };

  const imageUrl = getContentfulImage(image.url, imageConfig ?? defaultImageConfig);
  const lowQualityImageUrl = getContentfulImage(image.url, lowQualityConfig);
  const isPreloaded = preloadedImages?.has(imageUrl) ?? false;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === KeyNames.Escape && isOpen) {
        onClose();
      }
    };

    const handleArrowKeys = (event: KeyboardEvent): void => {
      if (!hasNavigation) {
        return;
      }

      if (event.key === KeyNames.ArrowLeft && onPrev && !isFirst) {
        onPrev();
      } else if (event.key === KeyNames.ArrowRight && onNext && !isLast) {
        onNext();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("keydown", handleArrowKeys);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, [isOpen, onClose, hasNavigation, onPrev, onNext, isFirst, isLast]);

  useEffect(() => {
    // If image is already preloaded, skip loading state
    if (isPreloaded) {
      setIsImageLoading(false);
      setShowLowQuality(false);
    } else {
      setIsImageLoading(true);
      setShowLowQuality(true);

      // Preload low quality image first for faster initial display
      if (isClient()) {
        const lowQualityImg = new window.Image();
        lowQualityImg.src = lowQualityImageUrl;
      }
    }
  }, [image.url, isPreloaded, lowQualityImageUrl]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${isImageLoading ? styles.opening : styles.opened}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!isImageLoading && (
          <div className={styles.closeButton} onClick={onClose}>
            ×
          </div>
        )}

        {hasNavigation && onPrev && !isFirst && !isImageLoading && (
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(event) => {
              event?.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {hasNavigation && onNext && !isLast && !isImageLoading && (
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(event) => {
              event?.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        )}

        {isImageLoading && <div className={styles.loader} />}

        {/* Low quality placeholder image for progressive loading */}
        {showLowQuality && isImageLoading && (
          <img
            src={lowQualityImageUrl}
            alt=""
            className={`${styles.image} ${styles.lowQuality}`}
            style={{ filter: "blur(10px)", opacity: 0.7 }}
          />
        )}

        <img
          src={imageUrl}
          alt={image.title ?? "Image Modal"}
          width={1920}
          height={1080}
          className={styles.image}
          style={{ opacity: isImageLoading ? 0 : 1, transition: "opacity 0.3s ease-in-out" }}
          onLoad={() => {
            setIsImageLoading(false);
            setShowLowQuality(false);
          }}
        />
        <div className={styles.caption}>
          {!hideTitle && <h3 className={styles.title}>{image.title}</h3>}
          {image.description && <p className={styles.description}>{image.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
