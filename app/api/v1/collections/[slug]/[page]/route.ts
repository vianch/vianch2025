import { gql } from "graphql-request";

/* Services */
import {
  fetchEntriesByQuery,
  handleContentfulError,
  handleContentfulResponse,
  throwJsonError,
} from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";

/* Constants */
import { ErrorTypes, ErrorMessages } from "@/lib/constants/contentful.constants";

export const GET = async (
  request: Request,
  context: { params: Promise<{ slug: string; page?: string }> }
) => {
  try {
    const { slug, page = "1" } = await context.params;
    const pageNumber = parseInt(page, 10);

    // Try to get data from cache first
    const cacheKey = `collections:${slug}:${pageNumber}`;
    const cachedData = await redisService.get<GalleryCollectionResponse>(cacheKey);

    if (cachedData) {
      return handleContentfulResponse<GalleryCollectionItem>(
        cachedData.galleryCollectionCollection
      );
    }

    const limit = 50;
    const skip = (pageNumber - 1) * limit;
    const variables = {
      slug,
      skip,
      limit,
      includeMetadata: pageNumber === 1,
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
    const collection = response?.galleryCollectionCollection;

    if (!collection) {
      const notFoundError = handleContentfulError({
        name: ErrorTypes.NotFoundError,
        message: ErrorMessages.NotFoundError,
      });

      return throwJsonError(notFoundError);
    }

    // Store in cache if Redis is available
    if (redisService.getStatus()) {
      await redisService.set(cacheKey, response);
    }

    return handleContentfulResponse<GalleryCollectionItem>(collection);
  } catch (error: unknown) {
    return throwJsonError(error);
  }
};
