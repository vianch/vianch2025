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
import { ErrorMessages, ErrorTypes } from "@/lib/constants/contentful.constants";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Try to get data from cache first
    // Cache key version updated to v2 to invalidate old cached responses
    const cacheKey = `blog:v2:${page}:${limit}`;
    const cachedData = await redisService.get<BlogCollectionResponse>(cacheKey);

    if (cachedData) {
      return handleContentfulResponse<BlogPost>(cachedData.blogCollection);
    }

    const query = gql`
      query ($skip: Int, $limit: Int) {
        blogCollection(skip: $skip, limit: $limit, order: publishedAt_DESC) {
          total
          skip
          limit
          items {
            title
            slug
            publishedAt
            featureImage {
              url(transform: { width: 1 })
            }
            body
            tags
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<BlogCollectionResponse>(query, { skip, limit });

    if (!response?.blogCollection) {
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

    return handleContentfulResponse<BlogPost>(response?.blogCollection);
  } catch (error) {
    return throwJsonError(error);
  }
};
