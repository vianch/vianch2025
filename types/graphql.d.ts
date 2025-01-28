// graphql-request.d.ts
declare module "graphql-request" {
  // Required types from 'graphql-request' module
  export type Variables = Record<string, string | number | boolean | null | undefined>;

  export interface RequestOptions {
    method?: string;
    headers?: HeadersInit;
    credentials?: "include" | "same-origin" | "omit";
  }

  export interface GraphQLClientConfig {
    headers?: HeadersInit;
    method?: string;
    credentials?: "include" | "same-origin" | "omit";
  }

  // Main GraphQLClient class
  export class GraphQLClient {
    constructor(endpoint: string, options?: GraphQLClientConfig);
    request<T = unknown>(
      query: string,
      variables?: Variables,
      requestHeaders?: HeadersInit
    ): Promise<T>;

    setHeaders(headers: HeadersInit): GraphQLClient;
    setHeader(key: string, value: string): GraphQLClient;
  }

  // Request definition interface
  export interface RequestDefinition<T = unknown> {
    endpoint: string;
    query: string;
    variables?: Variables;
    requestHeaders?: HeadersInit;
    options?: RequestOptions;
    result?: T;
  }

  // Convenience function to make a GraphQL request without instantiating the client
  export function request<T = unknown>(
    endpoint: string,
    query: string,
    variables?: Variables,
    requestHeaders?: HeadersInit
  ): Promise<T>;

  export function gql(strings: TemplateStringsArray, ...values: unknown[]): string;
}
