import { ReactElement } from "react";

/* Components */
import DateHandler from "@/app/components/DateHandler/DateHandler";
import MarkdownRenderer from "@/app/components/MarkdownRenderer/MarkdownRenderer";

/* Styles */
import styles from "./BlogPost.module.css";

type BlogPostProps = {
  post: BlogPost;
};

const BlogPost = ({ post }: BlogPostProps): ReactElement => {
  const { title, body, publishedAt } = post;

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <DateHandler date={publishedAt} className={styles.date} />
      <MarkdownRenderer content={body} className={styles.markdown} />
    </>
  );
};

export default BlogPost;
