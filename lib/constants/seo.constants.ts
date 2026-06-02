export const DefaultSeo = {
  author: "Victor Chavarro",
  authorAlternateName: "VIANCH",
  country: "GB",
  description:
    "VIANCH is Victor Chavarro — a London-based photographer and full-stack software engineer. Explore a photography portfolio of street, cultural, and travel collections alongside web development and software engineering work.",
  email: "hello@vianch.com",
  // Occupations asserted in structured data to disambiguate the VIANCH entity.
  jobTitles: [
    "Photographer",
    "Full-Stack Software Engineer",
    "Senior Software Engineer",
    "Web Developer",
    "Computer Science Engineer",
  ],
  keywords:
    "VIANCH, Victor Chavarro, photographer, photography portfolio, street photography, travel photography, cultural photography, software engineer, full-stack engineer, web developer, computer science engineer, London",
  locale: "en_US",
  locality: "London",
  region: "England",
  siteUrl: "https://vianch.com",
  // Shown when no page-specific title is set (home + fallbacks). Keep under ~60 chars.
  title: "VIANCH",
  titleDefault: "VIANCH — Victor Chavarro, Photographer & Software Engineer",
  titleTemplate: "%s | VIANCH",
  twitterHandle: "@vianch_tog",
} as const;

/**
 * Current employer, asserted as `worksFor` in the Person schema. Employment is a
 * strong entity signal Google uses to anchor a person to a verifiable organization.
 */
export const Employer = {
  name: "TodayTix Group",
  url: "https://www.todaytixgroup.com",
} as const;

/**
 * Authoritative external profiles for Victor Chavarro (VIANCH), emitted as the
 * `sameAs` array in the Person schema. These are the strongest signal Google uses
 * to anchor the entity and disambiguate it from unrelated identities sharing the
 * "VIANCH" name. Keep every URL live and consistent — a broken sameAs weakens trust.
 */
export const SocialProfiles = [
  "https://www.linkedin.com/in/vianch",
  "https://github.com/vianch",
  "https://www.instagram.com/_vianch",
  "https://x.com/vianch_tog",
  "https://www.behance.net/vianch",
  "https://www.behance.net/vianch_tog",
] as const;

/**
 * Labelled social links rendered visibly on the About page (one entry per platform).
 * The machine-readable `sameAs` set lives in SocialProfiles above.
 */
export const SocialLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/vianch" },
  { label: "GitHub", url: "https://github.com/vianch" },
  { label: "Instagram", url: "https://www.instagram.com/_vianch" },
  { label: "Behance", url: "https://www.behance.net/vianch" },
  { label: "X (Twitter)", url: "https://x.com/vianch_tog" },
] as const;

/**
 * Open-source projects and apps built by Victor, surfaced on the About page.
 * Reinforces the software-engineer identity and adds outbound authority links.
 */
export const Projects = [
  {
    description: "Personal code snippet system.",
    label: "Snippets",
    url: "https://snippets.vianch.com",
  },
  {
    description: "Terminal UI that reads your package.json and runs scripts interactively.",
    label: "paco",
    url: "https://github.com/vianch/paco",
  },
  {
    description: "Single-page interactive diagrams of how an app's packages talk to each other.",
    label: "workflow-docs",
    url: "https://github.com/vianch/workflow-docs",
  },
] as const;

/**
 * Topics Victor is known for, emitted as `knowsAbout` in the Person schema.
 * Reinforces the photographer + engineer identity for entity resolution.
 */
export const KnowsAbout = [
  "Photography",
  "Street Photography",
  "Travel Photography",
  "Cultural Photography",
  "Software Engineering",
  "Full-Stack Development",
  "Web Development",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "GraphQL",
  "AI-Assisted Engineering",
  "Model Context Protocol",
  "Computer Science",
] as const;

export const OgType = {
  Website: "website",
  Article: "article",
  Profile: "profile",
  Blog: "blog",
} as const;

export type OgTypeValues = (typeof OgType)[keyof typeof OgType];

export const TwitterCard = {
  Summary: "summary",
  SummaryLargeImage: "summary_large_image",
} as const;

export type TwitterCardValues = (typeof TwitterCard)[keyof typeof TwitterCard];

export const RobotsContent = {
  FollowIndex: "follow, index",
  NoFollowNoIndex: "nofollow, noindex",
  NoFollowIndex: "nofollow, index",
  FollowNoIndex: "follow, noindex",
} as const;
