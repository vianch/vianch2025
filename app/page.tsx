/* Constants */
import { galleryImages } from "@/lib/constants/gallery.constants";

/* Components */
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";
import HeroBanner from "./components/HeroBanner/HeroBanner";

export default function Home() {
  return (
    <>
      <main className="container">
        <HeroBanner
          heroImage={galleryImages[0].src}
          title="Visual Japan"
          year="2024"
          description="Each shot tells a story, weaving moments of culture, emotion, and beauty, inviting viewers to connect with Japan’s soul through my lens."
        />
        <SectionTitle title="Gallery" description="A collection of my photos" />
        <Gallery images={galleryImages} />

        <SectionTitle title="More Photos" />
        <Gallery images={galleryImages} masonry />
      </main>
    </>
  );
}
