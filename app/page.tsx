import { ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { gql } from "graphql-request";

/* Components */
import HomePage from "./HomePage";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

// Fetch data once and reuse it
async function getPageData() {
  try {
    const limit = 20;
    const slug = "home";

    // Try to get data from cache first
    const cacheKey = `pages:v2:${slug}`;
    const cachedData = await redisService.get<PageCollectionResponse>(cacheKey);

    if (cachedData?.pageCollection?.items?.[0]) {
      return cachedData.pageCollection.items[0];
    }

    const { isAvailable } = redisService.getStatus();

    // If not in cache, fetch from Contentful
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
    const pageData = response?.pageCollection?.items?.[0];

    if (!pageData) {
      return null;
    }

    // Store in cache if Redis is available
    if (isAvailable) {
      await redisService.set(cacheKey, response);
    }

    return pageData;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
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
