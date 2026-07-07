import { cache, ReactElement } from "react";
import { notFound } from "next/navigation";
import { gql } from "graphql-request";

// ISR: each post is rendered once, then served from cache with hourly background refresh.
export const revalidate = 3600;

/* Components */
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import BlogPost from "@/app/components/BlogPost/BlogPost";
import JsonLd from "@/app/components/JsonLd/JsonLd";
import { Metadata } from "next";

/* Constants */
import { DefaultSeo, OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Services */
import { fetchEntriesByQueryCached } from "@/lib/datalayer/contentful.service";
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

    // Redis read-through on top of ISR: 24h TTL keeps Contentful hits at ~1/day per post
    // and survives deployments. Key matches app/api/v1/blog/[slug] so both share one entry.
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

    const response = await fetchEntriesByQueryCached<BlogCollectionResponse>(
      `blog:v2:${slug}`,
      query,
      { slug }
    );

    return response?.blogCollection?.items?.[0] ?? null;
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
