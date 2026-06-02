import type { MetadataRoute } from "next";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

const baseUrl = DefaultSeo.siteUrl.replace(/\/$/, "");

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // Keep API routes and the internal component showcase out of the index.
    disallow: ["/api/", "/styleguide"],
  },
  sitemap: `${baseUrl}/sitemap.xml`,
  host: baseUrl,
});

export default robots;
