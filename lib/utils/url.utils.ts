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
    "http://localhost:3000"
  );
};

export const getGalleryPath = (slug: string): string => {
  return `/gallery/${slug}`;
};
