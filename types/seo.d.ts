import { OgTypeValues, TwitterCardValues } from "@/lib/constants/seo.constants";

declare global {
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
    ogType?: OgTypeValues;
    ogImage?: SeoImage;
    twitterCard?: TwitterCardValues;
    twitterCreator?: string;
    twitterImage?: SeoImage;
    noindex?: boolean;
    nofollow?: boolean;
    structuredData?: Record<string, unknown>;
  }

  interface MetadataProps extends SeoProps {
    children?: React.ReactNode;
  }
}
