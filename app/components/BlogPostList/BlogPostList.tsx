import { ReactElement } from "react";

/* Styles */
import styles from "./BlogPostList.module.css";

type BlogPostListProps = {
  description?: string;
  posts: BlogPost[];
};

type ProjectItem = {
  title: string;
  url: string;
};

const BlogPostList = ({ posts, description }: BlogPostListProps): ReactElement => {
  if (!posts) {
    return <></>;
  }

  const projects: ProjectItem[] = [
    { title: "Snippets demo", url: "https://snippets.vianch.com/" },
    { title: "Snippets repo", url: "https://github.com/vianch/snippets" },
    { title: "Snake JS repo", url: "https://github.com/vianch/snake-js" },
    { title: "Snake JS demo", url: "https://snakejs.vianch.com/" },
    { title: "Config files", url: "https://github.com/vianch/config-files" },
    { title: "Smooth server", url: "https://github.com/vianch/smooth-server" },
    { title: "Charsay", url: "https://github.com/vianch/charsay" },
    { title: "Charsay npm", url: "https://www.npmjs.com/package/charsay" },
  ];

  return (
    <section className="container-xs container-padding-lg">
      <h1 className={`text-xl font-semibold ${styles.title}`}>VIANCH Blog</h1>

      {description && <p className={styles.description}>{description}</p>}

      <h2 className={`text-xl font-semibold ${styles.subtitle}`}>Projects</h2>

      <div className={`grid ${styles.grid}`}>
        {projects.map((project: ProjectItem, index: number) => (
          <a
            key={`${project.title}-${index}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`col-6 lg:col-4 ${styles.item}`}
            href={project.url}
          >
            {project.title}
          </a>
        ))}
      </div>

      <h2 className={`text-xl font-semibold ${styles.subtitle}`}>Posts</h2>

      <div className={styles.list}>
        {posts?.length > 0 &&
          posts
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .map((post, index) => (
              <a key={`${post.slug}-${index}`} href={`/blog/${post.slug}`} className={styles.item}>
                <span className={styles.date}>&lt;{post.publishedAt}&gt;</span>
                {post.title}
              </a>
            ))}
      </div>
    </section>
  );
};

export default BlogPostList;
