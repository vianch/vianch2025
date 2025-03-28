import { ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

/* API */
import { getPage } from "@/lib/api/gallery";

/* Components */
import HomePage from "./HomePage";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

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
  const pageData = await getPageData();

  if (!pageData) {
    const resolvedParent = await parent;
    return resolvedParent as Metadata;
  }

  const coverImage = pageData.collectionsCollection?.items[0]?.coverImage;

  return generateSeoMetadata({
    title: pageData.title,
    description: pageData.description,
    ogType: OgType.Website,
    twitterCard: TwitterCard.SummaryLargeImage,
    ogImage: coverImage && {
      url: coverImage.url,
      alt: pageData.title,
    },
    twitterImage: coverImage && {
      url: coverImage.url,
      alt: pageData.title,
    },
    canonicalUrl: "/",
  });
}

const Page = async (): Promise<ReactElement> => {
  const pageData = await getPageData();

  if (!pageData?.collectionsCollection?.total) {
    notFound();
  }

  return (
    <main className="container container-padding-lg">
      <HomePage collections={pageData.collectionsCollection.items ?? []} />
    </main>
  );
};

export default Page;
