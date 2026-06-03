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
  { label: "Behance", url: "https://www.behance.net/vianch_tog" },
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

/**
 * About-page FAQ. This is the single source of truth shared by the visible
 * accordion (app/components/about/AboutFaq) and the FAQPage JSON-LD node
 * (structured-data.utils). Google requires the visible copy and the schema to
 * match, so both must read from here — never duplicate the text.
 *
 * The questions are written around the queries that disambiguate the VIANCH
 * entity ("who is vianch", "what does victor chavarro do", "is vianch a
 * photographer") to strengthen positioning for the brand in search.
 */
export const AboutFaqs = [
  {
    answer:
      "VIANCH is the personal brand of Victor Chavarro, a London-based photographer and " +
      "full-stack software engineer. Under VIANCH he publishes a photography portfolio of street, " +
      "cultural, and travel work alongside his web development and software engineering projects.",
    question: "Who is VIANCH?",
  },
  {
    answer:
      "Victor Chavarro is a Senior Software Engineer at TodayTix Group, where he builds across the " +
      "stack, from the partner-facing Portal app to the Platform commerce service. Outside of " +
      "engineering he works as a photographer, shooting street, cultural, and travel photography.",
    question: "What does Victor Chavarro do?",
  },
  {
    answer:
      "Yes. VIANCH shoots street, cultural, and travel photography, and the collections are published " +
      "across vianch.com. Photography and software engineering are the two crafts at the centre of the " +
      "VIANCH brand.",
    question: "Is VIANCH a photographer?",
  },
  {
    answer:
      "Victor specialises in AI-assisted engineering. With his team he builds a full agentic toolkit on " +
      "Claude Code: a marketplace of 30+ specialised skills and agents, custom MCP servers including a " +
      "knowledge-graph memory palace, multi-agent orchestration, and automated pipelines for code review, " +
      "PR triage, and AI supply-chain security.",
    question: "What does Victor build with AI?",
  },
  {
    answer:
      "VIANCH is based in London, England. You can reach Victor by email at hello@vianch.com or through " +
      "the social profiles linked on this page, including LinkedIn, GitHub, Instagram, and Behance.",
    question: "Where is VIANCH based and how can I get in touch?",
  },
] as const;

/**
 * Page-specific keyword set for the About page, layered on top of the site-wide
 * DefaultSeo.keywords. Reinforces the bio/profile intent of this URL.
 */
export const AboutKeywords =
  "VIANCH, Victor Chavarro, about VIANCH, who is VIANCH, Victor Chavarro photographer, " +
  "Victor Chavarro software engineer, London photographer, full-stack engineer London, " +
  "senior software engineer, TodayTix Group engineer, AI-assisted engineering, Claude Code, " +
  "street photography, travel photography, portfolio";

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
