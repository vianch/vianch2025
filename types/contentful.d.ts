interface CacheControl {
  maxCacheAge: number;
  maxStaleWhileRevalidateAge: number;
}

interface ContentfulQueryEntries
  extends Record<string, string | number | boolean | null | undefined> {
  content_type?: string;
  include?: LevelsInResponse | number | undefined;
  locale?: Locales | string | undefined;
  skip?: number;
  limit?: number;
  trim?: number;
  order?: string;
  query?: string;
  location?: string;
  locationId?: number;
  select?: string;
  variables?: Record<string, string | number | undefined>;
}

type EntriesByQuery<T> = T;

type EntriesResponseType<ContentType> = {
  items: ContentType[] | Partial<ContentType>[];
  total: number;
  skip: number;
  limit: number;
  page: number;
};

interface ContentfulErrorResponse {
  status: number;
  message: string;
  details?: Record<string, unknown>;
}

interface GraphQLClientError extends Error {
  response?: {
    status?: number;
    errors?: Array<{ message: string }>;
  };
}

interface ContentfulImage {
  url: string;
  title?: string;
  description?: string;
}

interface GalleryItem {
  title: string;
  description: string;
  url: string;
  image: ContentfulImage;
}

interface Collection<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

interface GalleryCollectionItem {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  year: number;
  coverImage: ContentfulImage;
  gallery: {
    total: number;
    skip: number;
    limit: number;
    items: GalleryItem[];
  };
}

interface GalleryCollectionResponse {
  galleryCollectionCollection: Collection<GalleryCollectionItem>;
}

type ContentfulVariables = {
  slug?: string;
  skip?: number;
  [key: string]: string | number | undefined;
};
