import { ReactElement } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gql } from "graphql-request";

/* Constants */
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

export const dynamic = "force-dynamic";

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
            body
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
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getDataBlogPosts();

  const description = !posts ? "VIANCH BLOG UNDER MAINTENANCE" : "VIANCH BLOG";

  return generateSeoMetadata({
    title: "Blog",
    description: description,
    ogType: OgType.Blog,
    canonicalUrl: "/blog",
  });
}

const BlogPage = async (): Promise<ReactElement> => {
  const posts = await getDataBlogPosts();

  if (!posts) {
    notFound();
  }

  return <BlogPostList posts={posts} />;
};

export default BlogPage;
