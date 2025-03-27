import { ReactElement } from "react";

import type { Metadata } from "next";

/* Components */
import SEO from "@/app/components/SEO/SEO";

/* Constants */
import { OgType } from "@/lib/constants/seo.constants";

/* Components */
import BlogPostList from "@/app/components/BlogPostList/BlogPostList";

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

const BlogPage = (): ReactElement => (
  <>
    <SEO
      title="Blog"
      description="Exploring web development and photography. I'm sharing insights on full-stack development, creative photography techniques, and my journey as a developer at TodayTix in London."
      ogType={OgType.Blog}
      canonicalUrl="/blog"
    />

    <BlogPostList description="Exploring web development and photography. I'm sharing insights on full-stack development, creative photography techniques, and my journey as a developer at TodayTix in London." />
  </>
);

export default BlogPage;
