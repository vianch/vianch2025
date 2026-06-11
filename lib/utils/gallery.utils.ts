export const getRandomIndex = (itemCount: number): number => {
  if (itemCount <= 1) {
    return 0;
  }

  return Math.floor(Math.random() * itemCount);
};

export const getHeroSlides = (collections: GalleryCollectionItem[]): HeroSlide[] => {
  return collections
    .map((collection) => {
      const galleryImages = collection.gallery?.imagesCollection?.items ?? [];
      const randomImage = galleryImages[getRandomIndex(galleryImages.length)];

      return {
        description: collection.description,
        imageUrl: randomImage?.url ?? collection.coverImage?.url ?? "",
        slug: collection.slug,
        title: collection.title,
        year: collection.year,
      };
    })
    .filter((slide) => Boolean(slide.imageUrl));
};

export const getMarqueeImages = (
  collections: GalleryCollectionItem[],
  maxPerCollection: number = 6
): MarqueeImage[] => {
  return collections.flatMap((collection) =>
    collection.gallery.imagesCollection.items.slice(0, maxPerCollection).map((image) => ({
      title: image.title,
      url: image.url,
    }))
  );
};
