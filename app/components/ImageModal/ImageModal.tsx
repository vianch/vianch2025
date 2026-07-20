"use client";

import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from "react";

/* Styles */
import styles from "./ImageModal.module.css";

/* Constants */
import { KeyNames } from "@/lib/constants/ui.constants";
import { LowQualityImageConfig, ModalImageConfig } from "@/lib/constants/images.constants";

/* Utils */
import { flipFrom, flipTo } from "@/lib/utils/flip.utils";
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
  index?: number;
  total?: number;
  getOriginRect?: (index: number) => DOMRect | null;
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
  index,
  total,
  getOriginRect,
  onPrev,
  onNext,
  imageConfig,
  preloadedImages,
}): ReactElement | null => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [showLowQuality, setShowLowQuality] = useState<boolean>(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const didOpenFlip = useRef<boolean>(false);
  const isClosing = useRef<boolean>(false);

  const imageUrl = getContentfulImage(image.url, imageConfig ?? ModalImageConfig);
  const lowQualityImageUrl = getContentfulImage(image.url, LowQualityImageConfig);
  const isPreloaded = preloadedImages?.has(imageUrl) ?? false;

  const originRectFor = (): DOMRect | null =>
    getOriginRect && index !== undefined ? getOriginRect(index) : null;

  // FLIP the image up from its clicked thumbnail. Runs once, on the first load.
  const runOpenFlip = (): void => {
    if (didOpenFlip.current || !imageRef.current) {
      return;
    }

    didOpenFlip.current = true;
    const origin = originRectFor();

    if (origin) {
      flipFrom(imageRef.current, origin);
    }
  };

  const handleClose = (): void => {
    if (isClosing.current) {
      return;
    }

    isClosing.current = true;
    const destination = originRectFor();

    if (imageRef.current && destination && !isImageLoading) {
      overlayRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 420,
        easing: "ease",
        fill: "both",
      });
      const collapse = flipTo(imageRef.current, destination);

      if (collapse) {
        collapse.onfinish = () => onClose();

        return;
      }
    }

    onClose();
  };

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent): void => {
      if (event.key === KeyNames.Escape && isOpen) {
        handleClose();
      }

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
      // Pad by the scrollbar width so hiding it doesn't reflow the page (jump/flicker).
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("keydown", handleKeys);

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeys);
    };
  }, [isOpen, hasNavigation, onPrev, onNext, isFirst, isLast]);

  // Render-time state adjustment: reset loading state when image changes
  const [prevImageUrl, setPrevImageUrl] = useState(image.url);
  if (image.url !== prevImageUrl) {
    setPrevImageUrl(image.url);
    if (isPreloaded) {
      setIsImageLoading(false);
      setShowLowQuality(false);
    } else {
      setIsImageLoading(true);
      setShowLowQuality(true);
    }
  }

  // Cached images may skip onLoad — measure on mount and morph if already ready.
  useLayoutEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setIsImageLoading(false);
      setShowLowQuality(false);
      runOpenFlip();
    }
  }, []);

  // Preload low quality image for progressive loading
  useEffect(() => {
    if (!isPreloaded && isClient()) {
      const lowQualityImage = new window.Image();
      lowQualityImage.src = lowQualityImageUrl;
    }
  }, [image.url, isPreloaded, lowQualityImageUrl]);

  if (!isOpen) return null;

  const hasCounter = index !== undefined && total !== undefined;
  const counter = hasCounter
    ? `${String((index ?? 0) + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
    : null;

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={handleClose}>
      <div className={styles.backdrop} aria-hidden="true" />

      <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {hasNavigation && onPrev && !isFirst && (
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {hasNavigation && onNext && !isLast && (
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <figure className={styles.stage} onClick={(event) => event.stopPropagation()}>
        {isImageLoading && (
          <div className={styles.loader} role="status" aria-label="Loading image">
            <svg className={styles.aperture} viewBox="0 0 24 24" aria-hidden="true">
              <g className={styles.blades}>
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <path
                    key={angle}
                    d="M16.6 12 L22 12 L17 20.66 Z"
                    transform={`rotate(${angle} 12 12)`}
                  />
                ))}
              </g>
            </svg>
          </div>
        )}

        {showLowQuality && isImageLoading && (
          <img src={lowQualityImageUrl} alt="" className={`${styles.image} ${styles.lowQuality}`} />
        )}

        <img
          ref={imageRef}
          src={imageUrl}
          alt={image.title ?? "Image Modal"}
          className={styles.image}
          style={{ opacity: isImageLoading ? 0 : 1 }}
          onLoad={() => {
            setIsImageLoading(false);
            setShowLowQuality(false);
            runOpenFlip();
          }}
        />
      </figure>

      {!isImageLoading && (
        <figcaption
          key={image.url}
          className={styles.meta}
          onClick={(event) => event.stopPropagation()}
        >
          {counter && <span className={styles.counter}>{counter}</span>}
          {!hideTitle && image.title && <h3 className={styles.title}>{image.title}</h3>}
          {image.description && <p className={styles.description}>{image.description}</p>}
        </figcaption>
      )}
    </div>
  );
};

export default ImageModal;
