import { ReactElement } from "react";
import { notFound } from "next/navigation";
import { gql } from "graphql-request";

/* Components */
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import BlogPost from "@/app/components/BlogPost/BlogPost";
import { Metadata } from "next";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Services */
import { fetchEntriesByQuery } from "@/lib/datalayer/contentful.service";
import { redisService } from "@/lib/datalayer/redis.service";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

type BlogPostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlogPostData({ params }: BlogPostSlugPageProps) {
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
    console.error("Error fetching blog post:", error);
    return null;
  }
}

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

  return (
    <section className="container-xs container-padding-lg">
      <Breadcrumbs path="blog" slug={postData.slug} />
      <BlogPost post={postData} />
    </section>
  );
};

export default BlogPostSlugPage;
