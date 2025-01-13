import { ReactElement } from "react";

/* Constants */
import { galleryImages } from "@/lib/constants/gallery.constants";

/* Components */
import Gallery from "../components/Gallery/Gallery";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import HeroBanner from "../components/HeroBanner/HeroBanner";

const GalleryPage = (): ReactElement => {
  return (
    <main className="container">
      <HeroBanner
        heroImage={galleryImages[0].src}
        title="Photography"
        year="2024"
        description="A curated collection of visual stories from around the world. Each gallery represents a unique journey and perspective."
      />

      <SectionTitle title="All Galleries" description="Browse through different collections" />
      <Gallery images={galleryImages} />
    </main>
  );
};

export default GalleryPage;
