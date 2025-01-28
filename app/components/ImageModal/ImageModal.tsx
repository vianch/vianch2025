"use client";

import { FC, ReactElement, useEffect } from "react";
import Image from "next/image";

/* Styles */
import styles from "./ImageModal.module.css";

/* Constants */
import { KeyNames } from "@/lib/constants/ui.constants";

/* Utils */
import { getContentfulImage } from "@/utils/images.utils";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: {
    url: string;
    title: string;
    description?: string;
  };
};

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, image }): ReactElement | null => {
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

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <Image
          src={imageUrl}
          alt={image.title}
          width={1920}
          height={1080}
          className={styles.image}
        />
        <div className={styles.caption}>
          <h3 className={styles.title}>{image.title}</h3>
          {image.description && <p className={styles.description}>{image.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
