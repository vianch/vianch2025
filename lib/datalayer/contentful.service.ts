import { request } from "graphql-request";
import { NextResponse } from "next/server";

import {
  contentfulLocalEndpoints,
  CacheHeaders,
  ResponseHeaders,
  DefaultCacheConfig,
  CacheDurations,
} from "../constants/contentful.constants";

/**
 * Sets cache control headers for the response
 * @param cacheConfig - Cache configuration with max age and stale while revalidate values
 * @returns {Record<string, string>} Headers object with cache control settings
 */
export const setCacheControlHeaders = (
  cacheConfig: CacheControl = DefaultCacheConfig
): Record<string, string> => {
  const { maxCacheAge, maxStaleWhileRevalidateAge } = cacheConfig;

  return {
    [ResponseHeaders.CacheControl]: [
      CacheHeaders.Public,
      `${CacheHeaders.MaxAgeBrowser}=0`,
      `${CacheHeaders.MaxAgeCdn}=${maxCacheAge}`,
      `${CacheHeaders.StaleWhileRevalidate}=${maxStaleWhileRevalidateAge}`,
      CacheHeaders.MustRevalidate,
    ].join(", "),
    [ResponseHeaders.Pragma]: CacheHeaders.NoCache,
  };
};

/**
 * Handles an error response with the given error, details, and code
 * @param {Object} error - The error object
 * @param {Object} details - The details object
 * @param {number} code - The HTTP status code
 * @returns {NextResponse} JSON response with the error details
 */
export const handleErrorResponse = ({
  error,
  details,
  code,
}: HandleErrorResponseParams): NextResponse =>
  NextResponse.json(
    {
      success: false,
      error,
      details,
    },
    { status: code }
  );

/**
 * Handles and standardizes Contentful API errors
 * @param error - The error object thrown by the Contentful API or other sources
 * @returns {ContentfulErrorResponse} A standardized error response object containing:
 *  - status: HTTP status code
 *  - message: Human-readable error message
 *  - details: Additional error information
 */
export const handleContentfulError = (error: unknown): NextResponse => {
  if (error instanceof Error && "response" in error) {
    const graphQLError = error as GraphQLClientError;
    const statusCode = graphQLError.response?.status || 500;
    const message = graphQLError.response?.errors?.[0]?.message || "GraphQL Error";

    return handleErrorResponse({
      error: message,
      details: { errors: graphQLError },
      code: statusCode,
    });
  }

  if (error instanceof Error) {
    return handleErrorResponse({
      error: error.message,
      details: { error: String(error) },
      code: 500,
    });
  }

  return handleErrorResponse({
    error: "An unknown error occurred",
    details: { error: String(error) },
    code: 500,
  });
};

/**
 * Throws a JSON error response with the given error
 * @param error - The error object to be thrown
 * @returns {NextResponse} JSON response with the error details
 */
export const throwJsonError = (error: Error | ContentfulErrorResponse | unknown): NextResponse => {
  const handledError = handleContentfulError(error);

  return handledError;
};

/**
 * Determines cache duration based on collection properties
 * @param collection - The collection data
 * @returns {CacheControl} Cache configuration
 */
const determineCacheDuration = <T extends object>(collection: Collection<T>): CacheControl => {
  // If collection has many items, cache longer
  if (collection.total > 100) {
    return CacheDurations.Long;
  }

  // Default to medium cache duration
  return CacheDurations.Short;
};

/**
 * Formats a Contentful collection response with proper caching headers
 * @param {Collection<T>} collection - The collection of data to be returned
 * @returns {NextResponse} JSON response with cache control headers
 * @template T - The type of items in the collection
 */
export const handleContentfulResponse = <T extends object>(
  collection: Collection<T>
): NextResponse => {
  const cacheConfig = determineCacheDuration(collection);

  return NextResponse.json(collection, {
    status: 200,
    headers: setCacheControlHeaders(cacheConfig),
  });
};

/**
 * Sets the headers required for making requests to the Contentful API
 * @returns {Object} Headers object containing:
 *  - Authorization: Bearer token from CONTENTFUL_ACCESS_TOKEN
 *  - Content-Type: application/json
 */
export const setContentfulHeaders = () => ({
  Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
  "Cache-Control": `public, s-maxage=${process.env.CONTENTFUL_CACHE_CONTROL || 3600}`,
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
