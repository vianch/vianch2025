import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getBlogPost } from "@/lib/api/blog";

/* Components */
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

type BlogPostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogPostSlugPage = async ({ params }: BlogPostSlugPageProps): Promise<ReactElement> => {
  const { slug } = await params;
  const initialCollection = await getBlogPost({ slug });

  if (!initialCollection?.items) {
    notFound();
  }

  const { title, body, tags } = initialCollection.items[0];

  return (
    <section className="container-xs container-padding-lg">
      <Breadcrumbs path="blog" slug={slug} />
      <h1>{title}</h1>
      <div>{tags.join(", ")}</div>
      <div>{body}</div>
    </section>
  );
};

export default BlogPostSlugPage;
