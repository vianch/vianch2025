import { ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

/* API */
import { getPage } from "@/lib/api/gallery";

/* Components */
import HomePage from "./HomePage";
import SEO from "./components/SEO/SEO";

/* Utils */
import { generateImageMetadata } from "@/lib/utils/seo.utils";

/* Constants */
import { DefaultSeo, OgType, TwitterCard } from "@/lib/constants/seo.constants";

// Fetch data once and reuse it
async function getPageData() {
  const pageResponse = await getPage({ slug: "home" });
  const pageData = pageResponse.items[0];

  if (!pageData) {
    return null;
  }

  return pageData;
}

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const resolvedParent = await parent;
  const pageData = await getPageData();

  if (!pageData) {
    return resolvedParent as Metadata;
  }

  const ogImage = pageData.collectionsCollection?.items[0]?.coverImage;
  const imageMetadata = ogImage ? generateImageMetadata(ogImage.url, pageData.title) : undefined;

  const metadata: Metadata = {
    metadataBase: new URL(DefaultSeo.siteUrl),
    title: DefaultSeo.title,
    description: pageData.description,
    keywords: DefaultSeo.keywords,
    authors: [{ name: DefaultSeo.author }],
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      type: OgType.Website,
      ...(imageMetadata && {
        images: [imageMetadata],
      }),
    },
    twitter: {
      card: TwitterCard.SummaryLargeImage,
      title: pageData.title,
      description: pageData.description,
      ...(imageMetadata && {
        images: [imageMetadata],
      }),
    },
  };

  return metadata;
}

const Page = async (): Promise<ReactElement> => {
  const pageData = await getPageData();

  if (!pageData?.collectionsCollection?.total) {
    notFound();
  }

  return (
    <main className="container container-padding-lg">
      <SEO
        title={pageData.title}
        description={pageData.description}
        ogType={OgType.Website}
        twitterCard={TwitterCard.SummaryLargeImage}
        ogImage={
          pageData.collectionsCollection?.items[0]?.coverImage && {
            url: pageData.collectionsCollection.items[0].coverImage.url,
            alt: pageData.title,
          }
        }
        twitterImage={
          pageData.collectionsCollection?.items[0]?.coverImage && {
            url: pageData.collectionsCollection.items[0].coverImage.url,
            alt: pageData.title,
          }
        }
        canonicalUrl="/"
      />
      <HomePage collections={pageData.collectionsCollection.items ?? []} />
    </main>
  );
};

export default Page;
