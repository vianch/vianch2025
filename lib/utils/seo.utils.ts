import { DefaultSeo } from "@/lib/constants/seo.constants";

/**
 * Generates a page title by combining the provided page title with the default site title
 * @param pageTitle - Optional specific page title
 * @returns Formatted page title string. If no pageTitle is provided, returns default site title
 * @example
 * generateTitle("About") // returns "About | My Site"
 * generateTitle() // returns "My Site"
 */
export const generateTitle = (pageTitle?: string): string => {
  if (!pageTitle) return DefaultSeo.title;
  return `${pageTitle} | ${DefaultSeo.title}`;
};

/**
 * Generates a canonical URL by combining the base site URL with the provided path
 * @param path - URL path to be appended to base URL
 * @returns Complete canonical URL string with cleaned path
 * @example
 * generateCanonicalUrl("/about") // returns "https://mysite.com/about"
 */
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = DefaultSeo.siteUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");
  return `${baseUrl}/${cleanPath}`;
};

/**
 * Generates structured data JSON-LD by combining provided data with schema.org context
 * @param data - Object containing structured data properties
 * @returns JSON string of structured data with schema.org context
 * @example
 * generateStructuredData({ "@type": "Article", headline: "My Post" })
 */
export const generateStructuredData = (data: Record<string, unknown>): string => {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...data,
  });
};

/**
 * Generates standard Open Graph image metadata for SEO
 * @param imageUrl - URL of the image to be used
 * @param alt - Alt text description of the image
 * @returns Object containing standard image metadata properties
 * @example
 * generateImageMetadata("https://mysite.com/image.jpg", "Description")
 */
export const generateImageMetadata = (imageUrl: string, alt: string) => ({
  url: imageUrl,
  alt,
  width: 1200,
  height: 630,
  type: "image/jpeg",
});
