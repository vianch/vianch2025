import { fetchApi } from "./client";

/**
 * Fetches a gallery collection by slug - Client-side only
 * @param params - Collection parameters (slug and optional page number)
 * @returns Promise with the collection data
 */
export const getCollection = ({
  slug,
  page,
}: GetCollectionParams): Promise<Collection<GalleryCollectionItem>> =>
  fetchApi<Collection<GalleryCollectionItem>>(`collections/${slug}/${page}`);

/**
 * Fetches a page by slug - Client-side only
 * @param params - Page parameters (slug)
 * @returns Promise with the page data
 */
export const getPage = ({ slug }: GetCollectionParams): Promise<Collection<PageItem>> =>
  fetchApi<Collection<PageItem>>("pages", { slug });
