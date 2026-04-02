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
