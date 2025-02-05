import { ReactElement, Fragment } from "react";

/* Components */
import HeroBanner from "./components/HeroBanner/HeroBanner";
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";

/* Utils */
import { getGalleryPath } from "@/lib/utils/url.utils";

type HomePageProps = {
  collections: GalleryCollectionItem[];
};

const HomePage = ({ collections }: HomePageProps): ReactElement => {
  const [head, ...tail] = collections;

  return (
    <Fragment>
      <HeroBanner
        heroImage={head.coverImage.url}
        title={head.title}
        year={head.year.toString()}
        description={head.description}
        link={head?.slug ? getGalleryPath(head.slug) : null}
      />

      {tail?.length > 0 &&
        tail.map((item, index) => (
          <Fragment key={`${item.slug}-${index + 1}`}>
            <SectionTitle
              title={item.title}
              description={item.subtitle}
              link={item.slug ? getGalleryPath(item.slug) : null}
            />

            <Gallery
              images={item.gallery.imagesCollection.items.slice(
                0,
                !item?.overrideImageLinks ? 12 : 8
              )}
              overrideImageLinks={item?.overrideImageLinks}
              hideTitle
              masonry={!item?.overrideImageLinks}
            />
          </Fragment>
        ))}
    </Fragment>
  );
};

export default HomePage;
