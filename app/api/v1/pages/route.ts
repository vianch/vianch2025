import { gql } from "graphql-request";

/* Services */
import {
  fetchEntriesByQuery,
  handleContentfulError,
  handleContentfulResponse,
  handleErrorResponse,
  throwJsonError,
} from "@/lib/datalayer/contentful.service";
import { ErrorMessages, ErrorTypes } from "@/lib/constants/contentful.constants";

export const GET = async (request: Request) => {
  try {
    const limit = 8;
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return handleErrorResponse({
        error: "Slug parameter is required",
        details: {},
        code: 400,
      });
    }

    const query = gql`
      query ($slug: String, $limit: Int) {
        pageCollection(where: { slug_contains: $slug }) {
          items {
            title
            slug
            description
            collectionsCollection(limit: $limit) {
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

    return handleContentfulResponse<PageItem>(page);
  } catch (error) {
    return throwJsonError(error);
  }
};
