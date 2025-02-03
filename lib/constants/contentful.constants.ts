export const contentfulDefaultHost = "https://cdn.contentful.com";
export const contentfulGraphQlDefaultHost = "https://graphql.contentful.com";

export const contentfulLocalEndpoints = {
  graphQlContentfulEndpoint: (spaceId: string, environmentId: string) =>
    `${contentfulGraphQlDefaultHost}/content/v1/spaces/${spaceId}/environments/${environmentId}`,
};

export const ErrorTypes = {
  NotFoundError: "NotFoundError",
  BadRequestError: "BadRequestError",
  InternalServerError: "InternalServerError",
};

export const ErrorMessages = {
  NotFoundError: "Collection not found",
  BadRequestError: "Bad request",
  InternalServerError: "Internal server error",
};

export const CacheHeaders = {
  Public: "public",
  MaxAgeBrowser: "s-maxage",
  MaxAgeCdn: "max-age",
  StaleWhileRevalidate: "stale-while-revalidate",
  MustRevalidate: "must-revalidate",
  NoCache: "no-cache",
} as const;

export const ResponseHeaders = {
  CacheControl: "Cache-Control",
  Pragma: "Pragma",
} as const;

export const DefaultCacheConfig = {
  maxCacheAge: 0, // 1 hour
  maxStaleWhileRevalidateAge: 0, // 2 hours
} as const;
