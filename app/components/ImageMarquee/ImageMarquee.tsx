"use client";

import { ReactElement, useState } from "react";
import { createPortal } from "react-dom";

/* Components */
import ImageModal from "../ImageModal/ImageModal";

/* Constants */
import { MediumQualityImageConfig, ModalImageConfig } from "@/lib/constants/images.constants";

/* Utils */
import { getContentfulImage } from "@/lib/utils/images.utils";
import { isClient } from "@/lib/utils/ui.utils";

/* Styles */
import styles from "./ImageMarquee.module.css";

type ImageMarqueeProps = {
  images: MarqueeImage[];
};

const ImageMarquee = ({ images }: ImageMarqueeProps): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<MarqueeImage | null>(null);

  // Duplicate images for seamless loop
  const duplicated = [...images, ...images];

  const handleImageClick = (image: MarqueeImage): void => {
    setSelectedImage(image);
  };

  return (
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {duplicated.map((image, index) => (
            <div
              key={`marquee-${index}`}
              className={styles.imageWrapper}
              onClick={() => handleImageClick(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleImageClick(image);
              }}
            >
              <img
                className={styles.image}
                src={getContentfulImage(image.url, MediumQualityImageConfig)}
                alt={image.title || "Gallery photo"}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage &&
        isClient() &&
        createPortal(
          <ImageModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            image={selectedImage}
            imageConfig={ModalImageConfig}
          />,
          document.body
        )}
    </section>
  );
};

export default ImageMarquee;
