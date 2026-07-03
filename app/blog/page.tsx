import { ReactElement } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gql } from "graphql-request";

export const dynamic = "force-dynamic";

/* Constants */
import { BlogCopy } from "@/lib/constants/blog.constants";
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";
import JsonLd from "@/app/components/JsonLd/JsonLd";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";
import { logger } from "@/lib/services/logger/logger.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";
import {
  buildSchemaGraph,
  getBlogNode,
  getBreadcrumbNode,
} from "@/lib/utils/structured-data.utils";

async function getDataBlogPosts() {
  try {
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Try to get data from cache first
    const cacheKey = `blog:v2:${page}:${limit}`;
    const cachedData = await redisService.get<BlogCollectionResponse>(cacheKey);

    if (cachedData?.blogCollection?.items) {
      return cachedData.blogCollection.items;
    }

    const { isAvailable } = redisService.getStatus();

    const query = gql`
      query ($skip: Int, $limit: Int) {
        blogCollection(skip: $skip, limit: $limit, order: publishedAt_DESC) {
          total
          skip
          limit
          items {
            title
            slug
            publishedAt
            featureImage {
              url
            }
            tags
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<BlogCollectionResponse>(query, { skip, limit });

    if (!response?.blogCollection?.items) {
      return null;
    }

    // Store in cache if Redis is available
    if (isAvailable) {
      await redisService.set(cacheKey, response);
    }

    return response.blogCollection.items;
  } catch (error) {
    logger.error("Error fetching blog posts", error, { page: "blog" });
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata({
    title: BlogCopy.title,
    description: BlogCopy.description,
    ogType: OgType.Blog,
    canonicalUrl: "/blog",
  });
}

const BlogPage = async (): Promise<ReactElement> => {
  const posts = await getDataBlogPosts();

  if (!posts) {
    notFound();
  }

  const blogSchema = buildSchemaGraph([
    getBlogNode(posts),
    getBreadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={blogSchema} />
      <BlogPostList posts={posts} />
    </>
  );
};

export default BlogPage;
