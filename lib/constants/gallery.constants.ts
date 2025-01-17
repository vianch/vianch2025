export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.ctfassets.net/livc321oumud/4gfCZuYjEato9tytfHaRg8/2208a701095ab45ac107809923959ed8/namba.jpg",
    alt: "Lorem ipsum dolor sit amet",
    title: "Mountains",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
  {
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    alt: "Lorem ipsum dolor sit amet",
    title: "Automobile",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "cityscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1466970601638-4e5fb6556584",
    alt: "Lorem ipsum dolor sit amet",
    title: "Mountains",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "nature",
  },
  {
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    alt: "Lorem ipsum dolor sit amet",
    title: "Mountains",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
  {
    src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    alt: "Lorem ipsum dolor sit amet",
    title: "Bicycle",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "nature",
  },
  {
    src: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf",
    alt: "Lorem ipsum dolor sit amet",
    title: "Office",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "cityscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1532103054090-3491f1a05d0d",
    alt: "Lorem ipsum dolor sit amet",
    title: "Office",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
  {
    src: "https://images.unsplash.com/photo-1599033153041-e88627ca70bb",
    alt: "Lorem ipsum dolor sit amet",
    title: "Cityscape",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
  {
    src: "https://images.unsplash.com/photo-1507097634215-e82e6b518529",
    alt: "Lorem ipsum dolor sit amet",
    title: "Cityscape",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "cityscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    alt: "Lorem ipsum dolor sit amet",
    title: "Mountains",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    alt: "Lorem ipsum dolor sit amet",
    title: "Mountains",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
  {
    src: "https://images.unsplash.com/photo-1494475673543-6a6a27143fc8",
    alt: "Lorem ipsum dolor sit amet",
    title: "Cityscape",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "japan",
  },
];

export type GalleryCollection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  coverImage: string;
  images: GalleryImage[];
};

export const galleryCollections: GalleryCollection[] = [
  {
    slug: "japan",
    title: "Visual Japan",
    subtitle: "A journey through Japanese culture and landscapes",
    description:
      "Each shot tells a story, weaving moments of culture, emotion, and beauty, inviting viewers to connect with Japan's soul through my lens.",
    year: "2024",
    coverImage: galleryImages[5].src,
    images: [...galleryImages, ...galleryImages, ...galleryImages],
  },
  {
    slug: "cityscapes",
    title: "Urban Perspectives",
    subtitle: "Modern architecture and city life",
    description:
      "Exploring the geometric patterns and human elements that make up our urban landscapes.",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1599033153041-e88627ca70bb",
    images: galleryImages.filter((img) => img.title === "Cityscape"),
  },
  {
    slug: "nature",
    title: "Natural Wonders",
    subtitle: "Mountains, forests, and landscapes",
    description: "Capturing the raw beauty and majesty of natural landscapes around the world.",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    images: galleryImages.filter((img) => img.title === "Mountains"),
  },
];
