import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getCollection } from "@/lib/api/gallery";

/* Components */
import GalleryClient from "./GalleryClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const GallerySlugPage = async (props: PageProps): Promise<ReactElement> => {
  const { slug } = await props.params;

  const initialData = await getCollection({ slug, page: 1 });
  const initialCollection = initialData.items[0];

  if (!initialCollection) {
    notFound();
  }

  return <GalleryClient initialCollection={initialCollection} />;
};

export default GallerySlugPage;
