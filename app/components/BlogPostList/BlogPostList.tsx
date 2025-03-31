"use client";

import { ReactElement, useEffect, useState } from "react";

/* Styles */
import styles from "./BlogPostList.module.css";

/* Components */
import DateHandler from "@/app/components/DateHandler/DateHandler";

/* API */
import { getBlogPosts } from "@/lib/api/blog";

type ProjectItem = {
  title: string;
  url: string;
};

const BlogPostList = (): ReactElement => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const posts = await getBlogPosts();
      setPosts(posts?.items);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <section className="container-xs container-padding-lg">
      <h1 className={`text-xl font-semibold ${styles.title}`}>VIANCH Blog</h1>

      <p className={styles.description}>
        Exploring web development and photography. I&apos;m sharing insights on full-stack
        development, creative photography techniques, and my journey as a developer at TodayTix in
        London.
      </p>

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

      <div className={`${styles.list} ${isLoading ? "" : styles.loaded}`}>
        {posts &&
          posts?.length > 0 &&
          posts?.map((post, index) => (
            <a
              key={`${post.slug}-${index}`}
              href={`/blog/${post.slug}`}
              className={`${styles.item} ${styles.post}`}
            >
              <DateHandler date={post.publishedAt} className={styles.date} />
              <p className={styles.name}>{post.title}</p>
            </a>
          ))}
      </div>
    </section>
  );
};

export default BlogPostList;
