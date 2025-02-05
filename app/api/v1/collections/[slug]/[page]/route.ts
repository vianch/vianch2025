import { gql } from "graphql-request";

/* Services */
import {
  fetchEntriesByQuery,
  handleContentfulError,
  handleContentfulResponse,
  throwJsonError,
} from "@/lib/datalayer/contentful.service";

/* Constants */
import { ErrorTypes, ErrorMessages } from "@/lib/constants/contentful.constants";

/**
 * API route handler for fetching gallery collections from Contentful
 * @param request - Incoming HTTP request
 * @param context - Route context containing params
 * @returns {Promise<NextResponse>} JSON response containing:
 *  - On success: Gallery collection data with 200 status
 *  - On error: Error details with appropriate status code (400, 404, or 500)
 *
 * Path Parameters:
 *  - slug: Collection identifier (required)
 *  - page: Page number for pagination (required)
 *
 * Features:
 *  - Paginates results with 50 items per page
 *  - Includes cache control headers for optimization
 *  - Handles and standardizes error responses
 */
export const GET = async (
  request: Request,
  context: { params: Promise<{ slug: string; page?: string }> }
) => {
  try {
    const limit = 50;
    const { slug, page } = await context.params;
    const pageNumber = parseInt(page ?? "1", 10);
    const skip = (pageNumber - 1) * limit;
    const variables = { slug, skip, limit };

    const query = gql`
      query ($slug: String!, $skip: Int, $limit: Int) {
        galleryCollectionCollection(where: { slug_contains: $slug }) {
          total
          items {
            title
            slug
            subtitle
            description
            year
            overrideImageLinks
            coverImage {
              url
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

    return handleContentfulResponse<GalleryCollectionItem>(collection);
  } catch (error: unknown) {
    return throwJsonError(error);
  }
};
