import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getBlogPost } from "@/lib/api/blog";

type BlogPostSlugPageProps = {
  params: {
    slug: string;
  };
};

const BlogPostSlugPage = async (props: BlogPostSlugPageProps): Promise<ReactElement> => {
  const { slug } = await props.params;
  const initialCollection = await getBlogPost({ slug });

  if (!initialCollection?.items) {
    notFound();
  }

  const { title, body, tags } = initialCollection.items[0];

  return (
    <section className="container-xs container-padding-lg">
      <h1>{title}</h1>
      <div>{tags.join(", ")}</div>
      <div>{body}</div>
    </section>
  );
};

export default BlogPostSlugPage;
