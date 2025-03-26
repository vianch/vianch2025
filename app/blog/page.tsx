import { ReactElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* Components */
import SEO from "@/app/components/SEO/SEO";

/* Constants */
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";
import { getBlogPosts } from "@/lib/api/blog";

/* Utils */
import { generateCommonMetadata } from "@/lib/utils/seo.utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCommonMetadata({
    title: "Blog",
    description:
      "Exploring web development and photography. I'm sharing insights on full-stack development, creative photography techniques, and my journey as a developer at TodayTix in London.",
  });
}

const BlogPage = async (): Promise<ReactElement> => {
  try {
    const posts = await getBlogPosts();

    if (!posts?.items) {
      notFound();
    }

    return (
      <>
        <SEO
          title="Blog"
          description="Exploring web development and photography. I'm sharing insights on full-stack development, creative photography techniques, and my journey as a developer at TodayTix in London."
          ogType={OgType.Blog}
          canonicalUrl="/blog"
        />

        <BlogPostList
          posts={posts.items}
          description="Exploring web development and photography. I'm sharing insights on full-stack development, creative photography techniques, and my journey as a developer at TodayTix in London."
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    notFound();
  }
};

export default BlogPage;
