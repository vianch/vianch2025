type GetCollectionParams = {
  slug: string;
  page?: number;
};

type HandleErrorResponseParams = {
  error: string;
  details: Record<string, unknown>;
  code: number;
};
