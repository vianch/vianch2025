import { request } from "graphql-request";
import { NextResponse } from "next/server";

import { contentfulLocalEndpoints } from "./constants/contentful.constants";

/**
 * Handles and standardizes Contentful API errors
 * @param error - The error object thrown by the Contentful API or other sources
 * @returns {ContentfulErrorResponse} A standardized error response object containing:
 *  - status: HTTP status code
 *  - message: Human-readable error message
 *  - details: Additional error information
 */
export const handleContentfulError = (error: unknown): ContentfulErrorResponse => {
  if (error instanceof Error && "response" in error) {
    const graphQLError = error as GraphQLClientError;
    const statusCode = graphQLError.response?.status || 500;
    const message = graphQLError.response?.errors?.[0]?.message || "GraphQL Error";

    return {
      status: statusCode,
      message,
      details: { errors: graphQLError.response?.errors },
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
      details: { error: error.message },
    };
  }

  return {
    status: 500,
    message: "An unknown error occurred",
    details: { error: String(error) },
  };
};

export const throwJsonError = (error: Error | ContentfulErrorResponse | unknown) => {
  const handledError = handleContentfulError(error);

  return NextResponse.json(
    {
      success: false,
      error: handledError.message,
      details: handledError.details,
    },
    {
      status: handledError.status,
    }
  );
};

/**
 * Formats a Contentful collection response with proper caching headers
 * @param {Collection<T>} collection - The collection of data to be returned
 * @returns {NextResponse} JSON response with cache control headers
 * @template T - The type of items in the collection
 */
export const handleContentfulResponse = <T>(collection: Collection<T>): NextResponse =>
  NextResponse.json(collection, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });

/**
 * Sets the headers required for making requests to the Contentful API
 * @returns {Object} Headers object containing:
 *  - Authorization: Bearer token from CONTENTFUL_ACCESS_TOKEN
 *  - Content-Type: application/json
 */
export const setContentfulHeaders = () => ({
  Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
});

/**
 * Fetches entries from Contentful using a GraphQL query
 * @param query - GraphQL query string
 * @param config - Query variables and other configuration options
 * @returns {Promise<EntriesByQuery<ContentType>>} Query results typed to the specified ContentType
 * @throws {ContentfulErrorResponse} Standardized error if the query fails
 */
export const fetchEntriesByQuery = async <ContentType>(
  query: string,
  config: ContentfulQueryEntries
): Promise<EntriesByQuery<ContentType>> => {
  try {
    const headers = setContentfulHeaders();

    return request<EntriesByQuery<ContentType>>(
      contentfulLocalEndpoints.graphQlContentfulEndpoint(
        process.env.CONTENTFUL_SPACE_ID ?? "",
        process.env.CONTENTFUL_ENVIRONMENT_ID ?? ""
      ),
      query,
      config,
      headers
    );
  } catch (error) {
    const handledError = handleContentfulError(error);
    throw handledError;
  }
};
