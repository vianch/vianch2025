/* Constants */
import { galleryImages } from "@/lib/constants/gallery.constants";

/* Components */
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

        <h1>welcome</h1>
      </main>
    </>
  );
}
