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
  onClose: () => void;
  image: {
    url: string;
    title: string;
    description?: string;
  };
};

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onClose,
  image,
  hideTitle = false,
}): ReactElement | null => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const imageUrl = getContentfulImage(image.url, {
    fit: "thumb",
    h: 1080,
    f: "center",
    q: 90,
  });

  useEffect(() => {
    const handleEscapeKey = (e: globalThis.KeyboardEvent): void => {
      if (e.key === KeyNames.Escape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

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
