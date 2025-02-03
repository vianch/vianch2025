import { fetchApi } from "./client";

/**
 * Fetches a gallery collection by slug
 * @param params - Collection parameters (slug and optional page number)
 * @returns Promise with the collection data
 */
export const getCollection = ({
  slug,
  page,
}: GetCollectionParams): Promise<Collection<GalleryCollectionItem>> =>
  fetchApi<Collection<GalleryCollectionItem>>(`collections/${slug}`, {
    ...(page && { page }),
  });

export const getPage = ({ slug }: GetCollectionParams): Promise<Collection<PageItem>> =>
  fetchApi<Collection<PageItem>>("pages", { slug });
