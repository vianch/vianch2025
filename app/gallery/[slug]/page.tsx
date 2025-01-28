import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getCollection } from "@/lib/api/gallery";

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

  const response = await getCollection({ slug });
  const collection = response.items[0];
  console.log("collection", collection);

  if (!collection) {
    notFound();
  }

  return (
    <main>
      <HeroBanner
        heroImage={collection.coverImage.url}
        title={collection.title}
        year={collection.year.toString()}
        description={collection.description}
        variant="secondary"
      />

      <Gallery images={collection.gallery.imagesCollection.items} fullWidth />
    </main>
  );
};

export default GallerySlugPage;
