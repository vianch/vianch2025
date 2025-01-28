import { NextResponse } from "next/server";
import { gql } from "graphql-request";

/* Services */
import {
  fetchEntriesByQuery,
  handleContentfulError,
  handleContentfulResponse,
  throwJsonError,
} from "@/lib/contentful.service";

/* Constants */
import { ErrorTypes, ErrorMessages } from "@/lib/constants/contentful.constants";

/**
 * API route handler for fetching gallery collections from Contentful
 * @param request - Incoming HTTP request
 * @returns {Promise<NextResponse>} JSON response containing:
 *  - On success: Gallery collection data with 200 status
 *  - On error: Error details with appropriate status code (400, 404, or 500)
 *
 * Query Parameters:
 *  - slug: Collection identifier (required)
 *  - page: Page number for pagination (default: 1)
 *
 * Features:
 *  - Paginates results with 100 items per page
 *  - Includes cache control headers for optimization
 *  - Handles and standardizes error responses
 */
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const skip = (page - 1) * 100; // 100 items per page
    const variables = { slug, skip };

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Slug parameter is required",
        },
        {
          status: 400,
        }
      );
    }

    const query = gql`
      query ($slug: String!, $skip: Int) {
        galleryCollectionCollection(where: { slug_contains: $slug }) {
          total
          items {
            title
            slug
            subtitle
            description
            year
            coverImage {
              url
            }
            gallery {
              title
              imagesCollection(skip: $skip) {
                total
                skip
                limit
                items {
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
