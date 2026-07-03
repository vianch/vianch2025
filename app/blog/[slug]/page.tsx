import { cache, ReactElement } from "react";
import { notFound } from "next/navigation";
import { gql } from "graphql-request";

export const dynamic = "force-dynamic";

/* Components */
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import BlogPost from "@/app/components/BlogPost/BlogPost";
import JsonLd from "@/app/components/JsonLd/JsonLd";
import { Metadata } from "next";

/* Constants */
import { DefaultSeo, OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";
import { logger } from "@/lib/services/logger/logger.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";
import {
  buildSchemaGraph,
  getBlogPostingNode,
  getBreadcrumbNode,
} from "@/lib/utils/structured-data.utils";

type BlogPostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getBlogPostData = cache(async ({ params }: BlogPostSlugPageProps) => {
  try {
    const { slug } = await params;

    if (!slug) {
      return null;
    }

    // Try to get data from cache first
    const cacheKey = `blog:v2:${slug}`;
    const cachedData = await redisService.get<BlogCollectionResponse>(cacheKey);

    if (cachedData?.blogCollection?.items?.[0]) {
      return cachedData.blogCollection.items[0];
    }

    const { isAvailable } = redisService.getStatus();

    const query = gql`
      query ($slug: String!) {
        blogCollection(where: { slug: $slug }) {
          total
          items {
            title
            slug
            publishedAt
            featureImage {
              url
            }
            shortDescription
            body
            tags
          }
        }
      }
    `;

    const response = await fetchEntriesByQuery<BlogCollectionResponse>(query, { slug });

    if (!response?.blogCollection?.items?.[0]) {
      return null;
    }

    const postData = response.blogCollection.items[0];

    // Store in cache if Redis is available
    if (isAvailable) {
      await redisService.set(cacheKey, response);
    }

    return postData;
  } catch (error) {
    logger.error("Error fetching blog post", error, { page: "blog-post" });
    return null;
  }
});

export async function generateMetadata({ params }: BlogPostSlugPageProps): Promise<Metadata> {
  const postData = await getBlogPostData({ params });

  if (!postData) {
    return generateSeoMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      ogType: OgType.Blog,
      canonicalUrl: "/blog",
    });
  }

  return generateSeoMetadata({
    title: postData.title,
    description: postData.shortDescription,
    // Per-post keywords: post tags first, then the site-wide set.
    ...(postData.tags?.length > 0 && {
      keywords: `${postData.tags.join(", ")}, ${DefaultSeo.keywords}`,
    }),
    articlePublishedTime: postData.publishedAt,
    articleTags: postData.tags,
    twitterCard: TwitterCard.SummaryLargeImage,
    ogType: OgType.Blog,
    ogImage: postData?.featureImage && {
      url: postData?.featureImage?.url || "",
      alt: postData?.title || "",
    },
    twitterImage: postData?.featureImage && {
      url: postData?.featureImage?.url || "",
      alt: postData?.title || "",
    },
    canonicalUrl: `/blog/${postData.slug}`,
  });
}

const BlogPostSlugPage = async ({ params }: BlogPostSlugPageProps): Promise<ReactElement> => {
  const postData = await getBlogPostData({ params });

  if (!postData) {
    notFound();
  }

  const postSchema = buildSchemaGraph([
    getBlogPostingNode(postData),
    getBreadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: postData.title, path: `/blog/${postData.slug}` },
    ]),
  ]);

  return (
    <section className="container-xs container-padding-lg">
      <JsonLd data={postSchema} />
      <Breadcrumbs path="blog" slug={postData.slug} />
      <BlogPost post={postData} />
    </section>
  );
};

export default BlogPostSlugPage;
