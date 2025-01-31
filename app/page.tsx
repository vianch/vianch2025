/* Constants */
import { notFound } from "next/navigation";

/* Components */
import HeroBanner from "./components/HeroBanner/HeroBanner";
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";
import { getPage } from "@/lib/api/gallery";
import { Fragment } from "react";
import { getGalleryPath } from "@/lib/utils/url.utils";

export const Home = async () => {
  const pageResponse = await getPage({ slug: "home" });
  const initialPageData = pageResponse.items[0];

  if (!initialPageData || initialPageData?.collectionsCollection?.total === 0) {
    notFound();
  }

  const collections = initialPageData.collectionsCollection.items;
  const head = collections[0];

  return (
    <>
      <main className="container  container-padding-lg">
        <HeroBanner
          heroImage={head.coverImage.url}
          title={head.title}
          year={head.year.toString()}
          description={head.description}
          link={getGalleryPath(head.slug)}
        />

        {collections?.length > 0 &&
          collections.map((item: GalleryCollectionItem, index: number) => (
            <Fragment key={`${item.slug}-${index + 1}`}>
              <SectionTitle
                key={item.slug}
                title={item.title}
                description={item.subtitle}
                link={getGalleryPath(item.slug)}
              />

              <Gallery
                images={item.gallery.imagesCollection.items}
                overrideImageLinks={item.overrideImageLinks}
              />
            </Fragment>
          ))}
      </main>
    </>
  );
};

export default Home;
