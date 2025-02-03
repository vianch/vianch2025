import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getPage } from "@/lib/api/gallery";

/* Components */
import HeroBanner from "./components/HeroBanner/HeroBanner";
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";
import { getGalleryPath } from "@/lib/utils/url.utils";

export default async function Page(): Promise<ReactElement> {
  let pageData;

  try {
    const pageResponse = await getPage({ slug: "home" });
    pageData = pageResponse.items[0];
  } catch (error) {
    pageData = {
      error,
      collectionsCollection: {
        total: 0,
        items: [],
      },
    };
  }

  if (!pageData?.collectionsCollection?.total) {
    notFound();
  }

  const collections = pageData.collectionsCollection.items;
  const [head, ...tail] = collections;

  return (
    <main className="container container-padding-lg">
      <HeroBanner
        heroImage={head.coverImage.url}
        title={head.title}
        year={head.year.toString()}
        description={head.description}
        link={getGalleryPath(head.slug)}
      />

      {tail?.length > 0 &&
        tail.map((item: GalleryCollectionItem, index: number) => (
          <div key={`${item.slug}-${index + 1}`}>
            <SectionTitle
              title={item.title}
              description={item.subtitle}
              link={!item?.overrideImageLinks ? getGalleryPath(item.slug) : null}
            />

            <Gallery
              images={item.gallery.imagesCollection.items}
              overrideImageLinks={item?.overrideImageLinks}
              hideTitle
            />
          </div>
        ))}
    </main>
  );
}
