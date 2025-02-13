import { ReactElement } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

/* API */
import { getCollection } from "@/lib/api/gallery";

/* Components */
import GalleryClient from "./GalleryClient";
import SEO from "@/app/components/SEO/SEO";

/* Utils */
import { generateImageMetadata } from "@/lib/utils/seo.utils";

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
  parent: Promise<Metadata>
): Promise<Metadata> {
  const { slug } = await params;
  const [parentMetadata, initialCollection] = await Promise.all([parent, getCollectionData(slug)]);

  if (!initialCollection) {
    return parentMetadata;
  }

  const imageMetadata = initialCollection.coverImage
    ? generateImageMetadata(initialCollection.coverImage.url, initialCollection.title)
    : undefined;

  return {
    title: initialCollection.title,
    description: initialCollection.description,
    openGraph: {
      title: initialCollection.title,
      description: initialCollection.description,
      type: OgType.Article,
      ...(imageMetadata && {
        images: [imageMetadata],
      }),
    },
    twitter: {
      card: TwitterCard.SummaryLargeImage,
      title: initialCollection.title,
      description: initialCollection.description,
      ...(imageMetadata && {
        images: [imageMetadata],
      }),
    },
  };
}

const GallerySlugPage = async (props: PageProps): Promise<ReactElement> => {
  const { slug } = await props.params;
  const initialCollection = await getCollectionData(slug);

  if (!initialCollection) {
    notFound();
  }

  return (
    <>
      <SEO
        title={initialCollection.title}
        description={initialCollection.description}
        ogType={OgType.Article}
        twitterCard={TwitterCard.SummaryLargeImage}
        ogImage={
          initialCollection.coverImage && {
            url: initialCollection.coverImage.url,
            alt: initialCollection.title,
          }
        }
        twitterImage={
          initialCollection.coverImage && {
            url: initialCollection.coverImage.url,
            alt: initialCollection.title,
          }
        }
        canonicalUrl={`/gallery/${slug}`}
      />
      <GalleryClient initialCollection={initialCollection} />
    </>
  );
};

export default GallerySlugPage;
