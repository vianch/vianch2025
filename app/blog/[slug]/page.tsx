import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getBlogPost } from "@/lib/api/blog";

/* Components */
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import BlogPost from "@/app/components/BlogPost/BlogPost";
import { Metadata } from "next";

/* Constants */
import { OgType, TwitterCard } from "@/lib/constants/seo.constants";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

type BlogPostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlogPostData({ params }: BlogPostSlugPageProps) {
  const { slug } = await params;
  const postData = await getBlogPost({ slug });

  if (!postData?.items) {
    notFound();
  }

  return postData.items[0];
}

export async function generateMetadata({ params }: BlogPostSlugPageProps): Promise<Metadata> {
  const postData = await getBlogPostData({ params });

  return generateSeoMetadata({
    title: postData.title,
    description: postData.body,
    twitterCard: TwitterCard.SummaryLargeImage,
    ogType: OgType.Blog,
    ogImage: postData.featureImage && {
      url: postData.featureImage.url,
      alt: postData.title,
    },
    twitterImage: postData.featureImage && {
      url: postData.featureImage.url,
      alt: postData.title,
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
