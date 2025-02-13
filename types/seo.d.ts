interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  type?: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: SeoImage;
  twitterCard?: "summary" | "summary_large_image";
  twitterCreator?: string;
  twitterImage?: SeoImage;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: Record<string, unknown>;
}

interface MetadataProps extends SeoProps {
  children?: React.ReactNode;
}
