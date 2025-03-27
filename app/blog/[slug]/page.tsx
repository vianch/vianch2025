import { ReactElement } from "react";
/* API */
import { getBlogPost } from "@/lib/api/blog";

/* Components */
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import BlogPost from "@/app/components/BlogPost/BlogPost";

type BlogPostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogPostSlugPage = async ({ params }: BlogPostSlugPageProps): Promise<ReactElement> => {
  const { slug } = await params;
  const postData = await getBlogPost({ slug });

  return (
    <section className="container-xs container-padding-lg">
      <Breadcrumbs path="blog" slug={slug} />
      <BlogPost post={postData?.items?.[0] ?? []} />
    </section>
  );
};

export default BlogPostSlugPage;
