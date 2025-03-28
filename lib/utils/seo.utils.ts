import { DefaultSeo, OgType, RobotsContent, TwitterCard } from "@/lib/constants/seo.constants";
import type { Metadata } from "next";

/* Utils */
import { getBaseUrl } from "./url.utils";

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

/**
 * Generates common metadata configuration for pages
 * @param params Configuration parameters for metadata generation
 * @returns Metadata object with common configuration
 */
export const generateCommonMetadata = ({
  title = DefaultSeo.title,
  description = DefaultSeo.description,
  ogType = "website",
  imageMetadata,
}: {
  title?: string;
  description?: string;
  ogType?: "website" | "article";
  imageMetadata?: ReturnType<typeof generateImageMetadata>;
}): Metadata => ({
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  keywords: DefaultSeo.keywords,
  authors: [{ name: DefaultSeo.author }],
  openGraph: {
    title,
    description,
    type: ogType,
    ...(imageMetadata && {
      images: [imageMetadata],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(imageMetadata && {
      images: [imageMetadata],
    }),
  },
});

/**
 * Converts OgType to compatible Next.js Metadata OpenGraph type
 * @param type - OgType string value
 * @returns Compatible OpenGraph type for Next.js Metadata API
 */
const getOpenGraphType = (type: string): "website" | "article" | "profile" => {
  switch (type) {
    case OgType.Article:
      return "article";
    case OgType.Profile:
      return "profile";
    case OgType.Blog:
      return "article"; // Map blog to article as it's the closest equivalent
    case OgType.Website:
    default:
      return "website";
  }
};

/**
 * Generates metadata configuration for Next.js Metadata API
 * @param props - Metadata properties for SEO configuration
 * @returns Metadata object compatible with Next.js Metadata API
 */
export const generateMetadata = (props: SeoProps): Metadata => {
  const {
    title,
    description = DefaultSeo.description,
    keywords = DefaultSeo.keywords,
    author = DefaultSeo.author,
    canonicalUrl,
    ogType = OgType.Website,
    ogImage,
    twitterCard = TwitterCard.Summary,
    twitterCreator = DefaultSeo.twitterHandle,
    twitterImage,
    noindex = false,
    nofollow = false,
    structuredData,
  } = props;

  const pageTitle = title ? `${title} | ${DefaultSeo.title}` : DefaultSeo.title;
  const robots = noindex
    ? nofollow
      ? RobotsContent.NoFollowNoIndex
      : RobotsContent.FollowNoIndex
    : nofollow
      ? RobotsContent.NoFollowIndex
      : RobotsContent.FollowIndex;

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords,
    authors: [{ name: author }],
    robots,
    openGraph: {
      title: pageTitle,
      description,
      type: getOpenGraphType(ogType),
      locale: DefaultSeo.locale,
      ...(ogImage && {
        images: [
          {
            url: ogImage.url,
            alt: ogImage.alt,
            ...(ogImage.width && { width: Number(ogImage.width) }),
            ...(ogImage.height && { height: Number(ogImage.height) }),
            ...(ogImage.type && { type: ogImage.type }),
          },
        ],
      }),
    },
    twitter: {
      card: twitterCard,
      title: pageTitle,
      description,
      creator: twitterCreator,
      ...(twitterImage && {
        images: [
          {
            url: twitterImage.url,
            alt: twitterImage.alt,
          },
        ],
      }),
    },
    ...(canonicalUrl && {
      alternates: {
        canonical: generateCanonicalUrl(canonicalUrl),
      },
    }),
  };

  // Add structured data if provided
  if (structuredData) {
    // Create JSON-LD structured data
    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      ...structuredData,
    });

    // Add to metadata
    metadata.other = {
      "application/ld+json": jsonLd,
    };
  }

  return metadata;
};
