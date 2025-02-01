"use client";

import { FC, ReactElement, useState } from "react";

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
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchNextPage = async () => {
    const nextPage = await getCollection({ slug: initialCollection.slug, page: page + 1 });
    const nextCollection = nextPage.items[0];
    const newSetImages = [...images, ...nextCollection?.gallery.imagesCollection.items];

    setHasMore(
      images.length + nextCollection?.gallery.imagesCollection.items.length <
        nextCollection?.gallery.imagesCollection.total
    );
    setPage(page + 1);
    setImages(newSetImages);
  };

  return (
    <main className="container container-padding-lg">
      <HeroBanner
        heroImage={initialCollection.coverImage.url}
        title={initialCollection.title}
        year={initialCollection.year.toString()}
        description={initialCollection.description}
        variant="default"
      />

      <InfiniteScroll hasMore={hasMore} next={fetchNextPage} loader={<></>}>
        <Gallery images={images} hideTitle />
      </InfiniteScroll>
    </main>
  );
};

export default GalleryClient;
