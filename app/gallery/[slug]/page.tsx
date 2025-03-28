import { ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

/* API */
import { getCollection } from "@/lib/api/gallery";

/* Components */
import GalleryClient from "./GalleryClient";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Fetch data once and reuse it
async function getCollectionData(slug: string) {
  const initialData = await getCollection({ slug, page: 1 });
  const initialCollection = initialData.items[0];

  if (!initialCollection) {
    return null;
  }

  return initialCollection;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const initialCollection = await getCollectionData(slug);

  if (!initialCollection) {
    const resolvedParent = await parent;
    return resolvedParent as Metadata;
  }

  return generateSeoMetadata({
    title: initialCollection.title,
    description: initialCollection.description,
    ogType: OgType.Article,
    twitterCard: TwitterCard.SummaryLargeImage,
    ogImage: initialCollection.coverImage && {
      url: initialCollection.coverImage.url,
      alt: initialCollection.title,
    },
    twitterImage: initialCollection.coverImage && {
      url: initialCollection.coverImage.url,
      alt: initialCollection.title,
    },
    canonicalUrl: `/gallery/${slug}`,
  });
}

const GallerySlugPage = async (props: PageProps): Promise<ReactElement> => {
  const { slug } = await props.params;
  const initialCollection = await getCollectionData(slug);

  if (!initialCollection) {
    notFound();
  }

  return <GalleryClient initialCollection={initialCollection} />;
};

export default GallerySlugPage;
