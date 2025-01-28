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
