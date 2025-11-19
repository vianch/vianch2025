import { ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { gql } from "graphql-request";

/* Components */
import GalleryClient from "./GalleryClient";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";

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
  try {
    const pageNumber = 1;

    // Try to get data from cache first
    const cacheKey = `collections:v2:${slug}:${pageNumber}`;
    const cachedData = await redisService.get<GalleryCollectionResponse>(cacheKey);

    if (cachedData?.galleryCollectionCollection?.items?.[0]) {
      return cachedData.galleryCollectionCollection.items[0];
    }

    const { isAvailable } = redisService.getStatus();
    const limit = 50;
    const skip = (pageNumber - 1) * limit;
    const variables = {
      slug,
      skip,
      limit,
      includeMetadata: true,
    };

    const query = gql`
      query ($slug: String!, $skip: Int, $limit: Int, $includeMetadata: Boolean = false) {
        galleryCollectionCollection(where: { slug_contains: $slug }) {
          total
          items {
            ... @include(if: $includeMetadata) {
              title
              slug
              subtitle
              description
              year
              overrideImageLinks
              coverImage {
                url
              }
            }
            gallery {
              title
              imagesCollection(skip: $skip, limit: $limit) {
                total
                skip
                limit
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
    `;

    const response = await fetchEntriesByQuery<GalleryCollectionResponse>(query, variables);
    const initialCollection = response?.galleryCollectionCollection?.items?.[0];

    if (!initialCollection) {
      return null;
    }

    // Store in cache if Redis is available
    if (isAvailable) {
      await redisService.set(cacheKey, response);
    }

    return initialCollection;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return null;
  }
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
