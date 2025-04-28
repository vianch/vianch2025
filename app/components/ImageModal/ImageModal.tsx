"use client";

import { FC, ReactElement, useEffect, useState } from "react";

/* Styles */
import styles from "./ImageModal.module.css";

/* Constants */
import { KeyNames } from "@/lib/constants/ui.constants";

/* Utils */
import { getContentfulImage } from "@/lib/utils/images.utils";

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
}): ReactElement | null => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const imageUrl = getContentfulImage(image.url, {
    fit: "thumb",
    h: 1080,
    f: "center",
    q: 90,
  });

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
    setIsImageLoading(true);
  }, [image.url]);

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

        <img
          src={imageUrl}
          alt={image.title ?? "Image Modal"}
          width={1920}
          height={1080}
          className={styles.image}
          onLoad={() => setIsImageLoading(false)}
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
