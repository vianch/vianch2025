import type { MetadataRoute } from "next";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

const baseUrl = DefaultSeo.siteUrl.replace(/\/$/, "");

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // Keep API routes, internal tooling, and test pages out of the index.
    disallow: ["/api/", "/styleguide", "/monitoring", "/sentry-example-page"],
  },
  sitemap: `${baseUrl}/sitemap.xml`,
  host: baseUrl,
});

export default robots;
