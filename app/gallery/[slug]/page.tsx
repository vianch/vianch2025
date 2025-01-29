import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getCollection } from "@/lib/api/gallery";

/* Components */
import GalleryClient from "./GalleryClient";

interface GallerySlugPageProps {
  params: {
    slug: string;
  };
}

const GallerySlugPage = async ({ params }: GallerySlugPageProps): Promise<ReactElement> => {
  const initialData = await getCollection({ slug: params.slug, page: 1 });
  const initialCollection = initialData.items[0];

  if (!initialCollection) {
    notFound();
  }

  return <GalleryClient initialCollection={initialCollection} />;
};

export default GallerySlugPage;
