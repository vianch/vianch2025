"use client";

import Loading from "@components/Loading/Loading";
import { FC, ReactElement, useState, useEffect } from "react";

/* API */
import { getCollection } from "@/lib/api/gallery";

/* Components */
import Gallery from "../../components/Gallery/Gallery";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import InfiniteScroll from "@components/InfiniteScroll/InfiniteScroll";

interface GalleryClientProps {
  initialCollection: GalleryCollectionItem;
}

const GalleryClient: FC<GalleryClientProps> = ({ initialCollection }): ReactElement => {
  const [images, setImages] = useState<GalleryItem[]>(
    initialCollection?.gallery.imagesCollection.items
  );
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isFullWidth = !initialCollection?.overrideImageLinks;

  const calculateHasMore = (
    currentImages: GalleryItem[],
    collection: GalleryCollectionItem
  ): boolean => {
    const items = collection?.gallery.imagesCollection.items || [];
    const total = collection?.gallery.imagesCollection.total || 0;
    return currentImages.length + items.length < total;
  };

  const fetchNextPage = async () => {
    setIsLoading(true);
    const nextPage = await getCollection({ slug: initialCollection.slug, page: page + 1 });
    const nextCollection = nextPage.items[0];
    const newSetImages = [...images, ...nextCollection?.gallery.imagesCollection.items];

    setHasMore(calculateHasMore(images, nextCollection));
    setPage(page + 1);
    setImages(newSetImages);
    setIsLoading(false);
  };

  useEffect(() => {
    setHasMore(calculateHasMore(images, initialCollection));
  }, [initialCollection]);

  return (
    <main className={`${!isFullWidth ? "container container-padding-lg" : ""}`}>
      <HeroBanner
        heroImage={initialCollection.coverImage.url}
        title={initialCollection.title}
        year={initialCollection.year.toString()}
        description={initialCollection.description}
        variant="default"
      />

      <InfiniteScroll
        hasMore={hasMore}
        isLoading={isLoading}
        next={fetchNextPage}
        loader={<Loading />}
      >
        <Gallery
          images={images}
          hideTitle={!initialCollection.overrideImageLinks}
          overrideImageLinks={initialCollection.overrideImageLinks}
          fullWidth={isFullWidth}
        />
      </InfiniteScroll>
    </main>
  );
};

export default GalleryClient;
