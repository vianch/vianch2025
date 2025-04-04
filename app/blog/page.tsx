import { ReactElement } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Constants */
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

/* API */
import { getBlogPosts } from "@/lib/api/blog";

export const dynamic = "force-dynamic";

async function getDataBlogPosts() {
  try {
    const posts = await getBlogPosts();
    return posts?.items ?? null;
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
