import { cache, ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { gql } from "graphql-request";

// ISR: serve prerendered HTML from the edge cache (fast TTFB) and refresh in the
// background every hour. Contentful content changes rarely; hero randomness now
// rotates per revalidation instead of per request.
export const revalidate = 3600;

/* Components */
import HomePage from "./HomePage";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { logger } from "@/lib/services/logger/logger.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

// Deduplicate across generateMetadata and Page component via React.cache
const getPageData = cache(async () => {
  try {
    const limit = 20;
    const slug = "home";

    // No Redis here: the rendered HTML is cached by ISR; Redis (which uses no-store
    // fetches that would force this route dynamic) stays on the API routes only.
    const query = gql`
      query ($slug: String, $limit: Int) {
        pageCollection(where: { slug_contains: $slug }) {
          items {
            title
            slug
            description
            collectionsCollection(limit: 4) {
              total
              limit
              items {
                title
                slug
                subtitle
                year
                description
                overrideImageLinks
                coverImage {
                  url
                }
                gallery {
                  imagesCollection(limit: $limit) {
                    items {
                      title
                      description
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<PageCollectionResponse>(query, { slug, limit });

    return response?.pageCollection?.items?.[0] ?? null;
  } catch (error) {
    logger.error("Error fetching page data", error, { page: "home" });
    return null;
  }
});

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
    <main data-page="home">
      <HomePage collections={pageData.collectionsCollection.items ?? []} />
    </main>
  );
};

export default Page;
