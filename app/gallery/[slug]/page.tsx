import { cache, ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { gql } from "graphql-request";

// ISR: each collection is rendered once, then served from cache with hourly background refresh.
export const revalidate = 3600;

/* Components */
import GalleryClient from "./GalleryClient";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { logger } from "@/lib/services/logger/logger.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Deduplicate across generateMetadata and Page component via React.cache
const getCollectionData = cache(async (slug: string) => {
  try {
    const pageNumber = 1;

    // No Redis here: ISR caches the rendered HTML; Redis stays on the API routes
    // that serve the client-side infinite scroll.
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

    return response?.galleryCollectionCollection?.items?.[0] ?? null;
  } catch (error) {
    logger.error("Error fetching collection data", error, { page: "gallery" });
    return null;
  }
});

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
