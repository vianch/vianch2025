import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* Constants */
import { galleryCollections } from "@/lib/constants/gallery.constants";

/* Components */
import Gallery from "../../components/Gallery/Gallery";
import HeroBanner from "../../components/HeroBanner/HeroBanner";

type GalleryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const GallerySlugPage = async ({ params }: GalleryPageProps): Promise<ReactElement> => {
  const { slug } = await params;
  const collection = galleryCollections.find((collection) => collection.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
    <main>
      <HeroBanner
        heroImage={collection.coverImage}
        title={collection.title}
        year={collection.year}
        description={collection.description}
        variant="secondary"
      />

      <Gallery images={collection.images} fullWidth />
    </main>
  );
};

export async function generateStaticParams() {
  return galleryCollections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default GallerySlugPage;
