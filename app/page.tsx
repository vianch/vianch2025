/* Constants */
import { galleryImages } from "@/lib/constants/gallery.constants";

/* Components */
import HeroBanner from "./components/HeroBanner/HeroBanner";
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";

export default function Home() {
  return (
    <>
      <main className="container  container-padding-lg">
        <HeroBanner
          heroImage={galleryImages[0].image.url}
          title="Visual Japan"
          year="2024"
          description="Each shot tells a story, weaving moments of culture, emotion, and beauty, inviting viewers to connect with Japan’s soul through my lens."
        />

        <SectionTitle
          title="Latest photo collections"
          description="Browse through different collections"
          link="/gallery"
        />
        <Gallery images={galleryImages.slice(0, 8)} />

        <SectionTitle title="Portraits" link="/gallery" />
        <Gallery images={galleryImages.slice(0, 4)} />

        <SectionTitle title="Street photography" link="/gallery" />
        <Gallery images={galleryImages.slice(0, 4)} />

        <SectionTitle title="Cityscape" link="/gallery" />
        <Gallery images={galleryImages.slice(0, 4)} />

        <SectionTitle
          title="Latest playground projects"
          description="Fun short-term projects to learn"
          link="/playground"
        />
        <Gallery images={galleryImages.slice(0, 4)} />
      </main>
    </>
  );
}
