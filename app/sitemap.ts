import type { MetadataRoute } from "next";
import { gql } from "graphql-request";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";

// Regenerate at request time so new blog posts / collections appear automatically.
export const dynamic = "force-dynamic";

const baseUrl = DefaultSeo.siteUrl.replace(/\/$/, "");

/**
 * Fetches blog post slugs (and last-modified dates) for the sitemap.
 * Returns an empty list on failure so a CMS outage never breaks the build.
 */
const getBlogEntries = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const query = gql`
      query ($limit: Int) {
        blogCollection(limit: $limit, order: publishedAt_DESC) {
          items {
            slug
            publishedAt
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<BlogCollectionResponse>(query, { limit: 100 });
    const posts = response?.blogCollection?.items ?? [];

    return posts
      .filter((post) => Boolean(post?.slug))
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch (error) {
    console.error("Sitemap: failed to fetch blog entries:", error);
    return [];
  }
};

/**
 * Fetches gallery collection slugs for the sitemap.
 * Returns an empty list on failure so a CMS outage never breaks the build.
 */
const getGalleryEntries = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const query = gql`
      query ($limit: Int) {
        galleryCollectionCollection(limit: $limit) {
          items {
            slug
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<GalleryCollectionResponse>(query, { limit: 100 });
    const collections = response?.galleryCollectionCollection?.items ?? [];

    return collections
      .filter((collection) => Boolean(collection?.slug))
      .map((collection) => ({
        url: `${baseUrl}/gallery/${collection.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      }));
  } catch (error) {
    console.error("Sitemap: failed to fetch gallery entries:", error);
    return [];
  }
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const [blogEntries, galleryEntries] = await Promise.all([getBlogEntries(), getGalleryEntries()]);

  return [...staticRoutes, ...galleryEntries, ...blogEntries];
};

export default sitemap;
