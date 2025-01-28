import { normalizeUrl } from "./url.utils";

export const getContentfulImage = (imageUrl: string, config?: ImageConfig): string => {
  if (!imageUrl) return "";

  // Normalize URL with https protocol if needed
  const baseUrl = normalizeUrl(imageUrl);

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

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
