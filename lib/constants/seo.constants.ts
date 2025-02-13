export const DefaultSeo = {
  title: "VIANCH",
  description:
    "Explore VIANCH's photography portfolio featuring stunning collections of landscapes, portraits, and artistic photography.",
  keywords: "photography, portfolio, art, landscapes, portraits, VIANCH",
  author: "Victor Chavarro",
  siteUrl: "https://vianch.com",
  twitterHandle: "@vianch_tog",
  locale: "en_US",
} as const;

export const OgType = {
  Website: "website",
  Article: "article",
  Profile: "profile",
} as const;

export const TwitterCard = {
  Summary: "summary",
  SummaryLargeImage: "summary_large_image",
} as const;

export const RobotsContent = {
  FollowIndex: "follow, index",
  NoFollowNoIndex: "nofollow, noindex",
  NoFollowIndex: "nofollow, index",
  FollowNoIndex: "follow, noindex",
} as const;
