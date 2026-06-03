import { DefaultSeo } from "../constants/seo.constants";

export const normalizeUrl = (url: string): string => {
  if (!url) return "";

  return url.startsWith("//") ? `https:${url}` : url;
};

/**
 * @function getBaseUrl
 * @description Gets the appropriate base URL for the current environment
 * @returns {string} Base URL for API requests or site origin
 */
export const getBaseUrl = (): string => {
  // Client-side: Use current origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Server-side: Use environment variables with fallbacks
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
    DefaultSeo.siteUrl
  );
};

export const getGalleryPath = (slug: string): string => {
  return `/gallery/${slug}`;
};

/**
 * @function getHostname
 * @description Extracts the bare hostname (without a leading "www.") from a URL,
 * falling back to the original string if it cannot be parsed.
 * @param {string} url - Absolute URL to parse
 * @returns {string} Hostname without the "www." prefix, or the original input
 */
export const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};
