import { fetchApi } from "./client";

type GetBlogPostsParams = {
  page?: number;
  limit?: number;
};

type GetBlogPostParams = {
  slug: string;
};

export const getBlogPosts = async ({
  page = 1,
  limit = 10,
}: GetBlogPostsParams = {}): Promise<BlogCollectionResponse> =>
  fetchApi<BlogCollectionResponse>("blog", { page, limit });

export const getBlogPost = async ({ slug }: GetBlogPostParams): Promise<Collection<BlogPost>> =>
  fetchApi<Collection<BlogPost>>(`blog/${slug}`);
