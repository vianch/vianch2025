// Gallery types are defined in contentful.d.ts (GalleryItem, GalleryCollectionItem)

interface HeroSlide {
  description: string;
  imageUrl: string;
  slug: string;
  title: string;
  year: number;
}

interface MarqueeImage {
  title: string;
  url: string;
}
