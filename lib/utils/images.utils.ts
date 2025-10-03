import { normalizeUrl } from "./url.utils";

/**
 * Normalizes Contentful URLs to use the Images API domain
 * Converts downloads.ctfassets.net to images.ctfassets.net for API optimization
 *
 * This is a safety fallback layer. All GraphQL queries use url(transform: { width: 1 })
 * to request images.ctfassets.net URLs from Contentful, but this ensures any edge cases
 * or cached data with downloads URLs are still handled correctly.
 *
 * @param url - The original Contentful URL
 * @returns Normalized URL using images.ctfassets.net
 */
const normalizeContentfulUrl = (url: string): string => {
  if (!url) return "";

  // Replace downloads.ctfassets.net with images.ctfassets.net
  // This ensures all images can use Contentful's Image API
  return url.replace("downloads.ctfassets.net", "images.ctfassets.net");
};

export const getContentfulImage = (imageUrl: string, config?: ImageConfig): string => {
  if (!imageUrl) return "";

  // Normalize URL with https protocol if needed
  let baseUrl = normalizeUrl(imageUrl);

  // Ensure we're using images.ctfassets.net for API optimization
  baseUrl = normalizeContentfulUrl(baseUrl);

  // If no config, return the base URL
  if (!config) return baseUrl;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (config.q !== undefined) {
    queryParams.append("q", config.q.toString());
  }

  if (config.f) {
    queryParams.append("f", config.f);
  }

  if (config.fit) {
    queryParams.append("fit", config.fit);
  }

  if (config.h !== undefined) {
    queryParams.append("h", config.h.toString());
  }

  if (config.w !== undefined) {
    queryParams.append("w", config.w.toString());
  }

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
