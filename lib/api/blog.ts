import { fetchApi } from "./client";

export const getBlogPosts = async (): Promise<Collection<BlogPost>> =>
  fetchApi<Collection<BlogPost>>("blog");

export const getBlogPost = async ({ slug }: GetBlogPostParams): Promise<Collection<BlogPost>> =>
  fetchApi<Collection<BlogPost>>(`blog/${slug}`);
