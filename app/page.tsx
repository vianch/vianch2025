"use client";

import { ReactElement, useEffect, useState } from "react";
import { notFound } from "next/navigation";

/* API */
import { getPage } from "@/lib/api/gallery";

/* Components */
import HeroBanner from "./components/HeroBanner/HeroBanner";
import Gallery from "./components/Gallery/Gallery";
import SectionTitle from "./components/SectionTitle/SectionTitle";

/* Utils */
import { getGalleryPath } from "@/lib/utils/url.utils";

export default function Page(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<GalleryCollectionItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageResponse = await getPage({ slug: "home" });
        const pageData = pageResponse.items[0];

        if (!pageData?.collectionsCollection?.total) {
          notFound();
        }

        setCollections(pageData.collectionsCollection.items);
      } catch (error) {
        console.error("Failed to fetch page data:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().then(() => null);
  }, []);

  const [head, ...tail] = collections;
  const heroBannerData = {
    heroImage: isLoading ? "" : head.coverImage.url,
    title: isLoading ? "" : head.title,
    year: isLoading ? "" : head.year.toString(),
    description: isLoading ? "" : head.description,
    link: isLoading ? "" : getGalleryPath(head.slug),
  };

  return (
    <main className="container container-padding-lg">
      <>
        <HeroBanner
          heroImage={heroBannerData.heroImage}
          title={heroBannerData.title}
          year={heroBannerData.year}
          description={heroBannerData.description}
          link={heroBannerData.link}
        />

        {/* TODO: add placeholder isLoading when is no data or  change to SSR*/}
        {!isLoading &&
          tail?.length > 0 &&
          tail.map((item, index) => (
            <div key={`${item.slug}-${index + 1}`}>
              <SectionTitle
                title={item.title}
                description={item.subtitle}
                link={!item?.overrideImageLinks ? getGalleryPath(item.slug) : null}
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
            </div>
          ))}
      </>
    </main>
  );
}
