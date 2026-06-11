import { ReactElement, Fragment } from "react";

/* Components */
import HomeHero from "./components/HomeHero/HomeHero";
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";
import ImageMarquee from "./components/ImageMarquee/ImageMarquee";

/* Utils */
import { getGalleryPath } from "@/lib/utils/url.utils";
import { getMarqueeImages } from "@/lib/utils/gallery.utils";

type HomePageProps = {
  collections: GalleryCollectionItem[];
};

const HomePage = ({ collections }: HomePageProps): ReactElement => {
  const [hero, ...tail] = collections;
  const marqueeImages = getMarqueeImages(collections);

  return (
    <>
      {/* Full-screen immersive hero */}
      <HomeHero
        heroImage={hero.coverImage.url}
        title={hero.title}
        year={hero.year.toString()}
        description={hero.description}
        link={hero.slug ? getGalleryPath(hero.slug) : null}
      />

      {/* Marquee right under the hero */}
      {marqueeImages.length > 4 && <ImageMarquee images={marqueeImages} />}

      {/* Collection sections */}
      <div className="container">
        {tail?.length > 0 &&
          tail.map((item, index) => {
            const imageLimit = !item?.overrideImageLinks ? 20 : 8;
            const galleryImages = item.gallery.imagesCollection.items.slice(0, imageLimit);

            return (
              <Fragment key={`${item.slug}-${index + 1}`}>
                <SectionTitle
                  title={item.title}
                  description={item.subtitle}
                  link={item.slug ? getGalleryPath(item.slug) : null}
                />

                <Gallery
                  images={galleryImages}
                  overrideImageLinks={item?.overrideImageLinks}
                  hideTitle={!item?.overrideImageLinks}
                  masonry={!item?.overrideImageLinks}
                />
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
