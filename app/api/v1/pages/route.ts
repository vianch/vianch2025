import { gql } from "graphql-request";

/* Services */
import {
  fetchEntriesByQuery,
  handleContentfulError,
  handleContentfulResponse,
  handleErrorResponse,
  throwJsonError,
} from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";

/* Constants */
import { ErrorMessages, ErrorTypes } from "@/lib/constants/contentful.constants";

export const GET = async (request: Request) => {
  try {
    const limit = 20;
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return handleErrorResponse({
        error: "Slug parameter is required",
        details: {},
        code: 400,
      });
    }

    // Try to get data from cache first
    const cacheKey = `pages:${slug}`;
    const cachedData = await redisService.get<PageCollectionResponse>(cacheKey);

    if (cachedData) {
      return handleContentfulResponse<PageItem>(cachedData.pageCollection);
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
    const page = response?.pageCollection;

    if (!page) {
      const notFoundError = handleContentfulError({
        name: ErrorTypes.NotFoundError,
        message: ErrorMessages.NotFoundError,
      });

      return throwJsonError(notFoundError);
    }

    // Store in cache if Redis is available
    if (isAvailable) {
      await redisService.set(cacheKey, response);
    }

    return handleContentfulResponse<PageItem>(page);
  } catch (error) {
    return throwJsonError(error);
  }
};
