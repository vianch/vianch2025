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

export const GET = async (request: Request, context: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return handleErrorResponse({
        error: "Slug parameter is required",
        details: {},
        code: 400,
      });
    }

    // Try to get data from cache first
    const cacheKey = `blog:${slug}`;
    const cachedData = await redisService.get<BlogCollectionResponse>(cacheKey);

    if (cachedData) {
      return handleContentfulResponse<BlogPost>(cachedData.blogCollection);
    }

    const query = gql`
      query ($slug: String!) {
        blogCollection(where: { slug: $slug }) {
          total
          items {
            title
            slug
            publishedAt
            featureImage {
              url
            }
            shortDescription
            body
            tags
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<BlogCollectionResponse>(query, { slug });

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

    return handleContentfulResponse<BlogPost>(response.blogCollection);
  } catch (error) {
    return throwJsonError(error);
  }
};
