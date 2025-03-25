import { ReactElement } from "react";

/* Components */
import SEO from "@/app/components/SEO/SEO";

/* Constants */
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";
import { getBlogPosts } from "@/lib/api/blog";

const BlogPage = async (): Promise<ReactElement> => {
  const posts = await getBlogPosts();

  return (
    <>
      <SEO title="Blog" description="Blog" ogType={OgType.Blog} canonicalUrl="/blog" />

      <BlogPostList
        posts={posts?.items ?? []}
        description="Exploring web development and photography. I'm sharing insights on full-stack development, creative photography techniques, and my journey as a developer at TodayTix in London."
      />
    </>
  );
};

export default BlogPage;
