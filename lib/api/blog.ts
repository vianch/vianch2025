import { fetchApi } from "./client";

type GetBlogPostsParams = {
  page?: number;
  limit?: number;
};

export const getBlogPosts = async ({ page = 1, limit = 10 }: GetBlogPostsParams = {}): Promise<
  Collection<BlogPost>
> => fetchApi<Collection<BlogPost>>("blog", { page, limit });
