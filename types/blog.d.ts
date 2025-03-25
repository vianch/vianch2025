interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  featureImage: {
    url: string;
  };
  body: string;
  tags: string[];
}

interface BlogCollectionResponse {
  blogCollection: Collection<BlogPost>;
}
