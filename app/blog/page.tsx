import { ReactElement } from "react";
import type { Metadata } from "next";

/* Constants */
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata({
    title: "Blog",
    description: "VIANCH BLOG",
    ogType: OgType.Blog,
    canonicalUrl: "/blog",
  });
}

const BlogPage = async (): Promise<ReactElement> => {
  return <BlogPostList />;
};

export default BlogPage;
