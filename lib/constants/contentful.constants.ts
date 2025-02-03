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
  maxCacheAge: 3600, // 1 hour
  maxStaleWhileRevalidateAge: 7200, // 2 hours
} as const;

export const CacheDurations = {
  Short: {
    maxCacheAge: 300, // 5 minutes
    maxStaleWhileRevalidateAge: 600, // 10 minutes
  },
  Medium: {
    maxCacheAge: 3600, // 1 hour
    maxStaleWhileRevalidateAge: 7200, // 2 hours
  },
  Long: {
    maxCacheAge: 86400, // 24 hours
    maxStaleWhileRevalidateAge: 172800, // 48 hours
  },
} as const;
