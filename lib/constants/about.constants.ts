import { DefaultSeo, Employer } from "@/lib/constants/seo.constants";

export const HeroEyebrow = `${DefaultSeo.locality} · Photographer & Software Engineer`;
export const HeroName = "Victor Chavarro";
export const HeroAlias = "VIANCH";
export const HeroRolePrefix = "I'm a";

/* Roles cycled under the name — the dual photographer/engineer identity. */
export const Roles = [
  "Photographer",
  "Full-Stack Software Engineer",
  "Senior Software Engineer",
  "Street & Travel Photographer",
  "AI-Assisted Engineering",
];

/* How long each role stays on screen before the next one cycles in. */
export const RoleIntervalMs = 2200;

export const HeroLead: AboutTextSegment[] = [
  {
    text: "I build software end to end and shoot the world through a lens. By day a Senior Software Engineer at ",
  },
  { external: true, href: Employer.url, text: Employer.name },
  { text: ". By instinct a street, cultural, and travel photographer." },
];

export const HeroPrimaryCtaLabel = "View Photography";
export const HeroSecondaryCtaLabel = "Get in touch";
export const ApertureCaption = "f / 1.4";
export const ScrollHintLabel = "Scroll";

export const AboutSections: Record<string, AboutSectionCopy> = {
  contact: {
    description: "The fastest ways to reach me or follow the work.",
    eyebrow: "Find me",
    title: "Let's connect",
  },
  faq: {
    description: "The quick answers to who VIANCH is and what I do.",
    eyebrow: "Good to know",
    title: "Frequently asked",
  },
  projects: {
    description: "Side projects and tools, free to explore and fork.",
    eyebrow: "Open source",
    title: "Things I've built in the open",
  },
  stack: {
    description: "The languages, frameworks, and platforms I reach for most.",
    eyebrow: "Toolkit",
    title: "Tech I work with",
  },
  story: {
    eyebrow: "The story",
    title: "Code by day, a camera by instinct",
  },
  work: {
    description:
      "Whether it's a frame or a function, the work is the same: notice what matters, then make it feel effortless.",
    eyebrow: "What I do",
    title: "Two crafts, one obsession with the details",
  },
};

export const StoryProse: AboutTextSegment[][] = [
  [
    {
      text: "I'm Victor, a full-stack engineer and photographer based in London, owner of ",
    },
    { href: "/", text: "vianch.com" },
    { text: ", and a Senior Software Engineer at " },
    { external: true, href: Employer.url, text: Employer.name },
    { text: "." },
  ],
  [
    { text: "At TodayTix I work across the stack. On the front end I build " },
    { bold: true, text: "Portal" },
    {
      text: ", our partner-facing Next.js, React, Tailwind and TypeScript app; on the back end I maintain ",
    },
    { bold: true, text: "Platform" },
    {
      text: ", the core commerce service that powers orders, payments, inventory, and ticketing across the group. I own my work end to end: scoping and managing my own tasks, issues, and stories, and staying accountable for everything I ship. Clean, scalable code and interfaces that feel obvious to use are non-negotiable for me.",
    },
  ],
  [
    {
      text: "My current focus is AI-assisted engineering, and I build the tooling as much as I use it. Together with my team I create and evolve a full agentic toolkit on Claude Code: a marketplace of plugins with 30+ specialized skills and agents, custom MCP servers (including a knowledge-graph “memory palace”), multi-agent orchestration, and automated pipelines for code review, PR triage, and AI supply-chain security.",
    },
  ],
  [
    {
      text: "When I'm not shipping code, I'm behind a camera. As VIANCH I shoot street, cultural, and travel photography. You can explore the collections across ",
    },
    { href: "/", text: "this site" },
    { text: "." },
  ],
];

export const AboutGlanceTitle = "At a glance";

export const AboutFacts: AboutFact[] = [
  { label: "Based", value: "London, England" },
  { label: "Now", value: "Senior Software Engineer, TodayTix Group" },
  { label: "Focus", value: "AI-assisted engineering" },
  { label: "Lens", value: "Street, cultural & travel" },
];

export const AboutStatus = "Building & shooting from London";

/* Each figure is grounded in real content elsewhere on the page/site. */
export const Stats: AboutStat[] = [
  { label: "Specialised AI skills & agents", suffix: "+", value: 30 },
  { label: "Core technologies", suffix: "", value: 12 },
  { label: "Open-source projects", suffix: "", value: 3 },
  { label: "Places to find me", suffix: "", value: 5 },
];

/* Duration of the count-up animation, in milliseconds. */
export const CountDurationMs = 1400;

export const Disciplines: AboutDiscipline[] = [
  {
    description:
      "Street, cultural, and travel photography. The world framed one fleeting moment at a time. The collections live across vianch.com.",
    iconKey: "camera",
    tags: ["Street", "Cultural", "Travel", "Editorial"],
    title: "Photography",
  },
  {
    description:
      "Senior Software Engineer at TodayTix Group. I build Portal, the partner-facing Next.js app, and maintain Platform, the commerce service behind orders, payments, inventory, and ticketing.",
    iconKey: "code",
    tags: ["TypeScript", "React", "Next.js", "Node.js", "GraphQL"],
    title: "Full-Stack Engineering",
  },
  {
    description:
      "I build the AI tooling as much as I use it: a full agentic toolkit on Claude Code with 30+ skills and agents, custom MCP servers, a knowledge-graph memory palace, and automated review pipelines.",
    iconKey: "spark",
    tags: ["Claude Code", "MCP", "Multi-agent", "Automation"],
    title: "AI-Assisted Engineering",
  },
];

export const TechStackItems = [
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "NestJS",
  "GraphQL",
  "Redis",
  "Groovy",
  "Tailwind CSS",
  "LLMs & MCP",
  "Datadog",
  "Vercel",
];

export const CtaTitleLead = "Let's build or shoot ";
export const CtaTitleAccent = "something good.";
export const CtaText =
  "Got a project, a frame, or just want to talk shop about engineering, photography, or AI tooling? My inbox is open.";
export const CtaPrimaryLabel = "Email me";
export const CtaSecondaryLabel = "View the portfolio";

export const AboutMetaDescription =
  "Meet Victor Chavarro (VIANCH), a London-based photographer and full-stack software engineer. " +
  "Senior Software Engineer at TodayTix Group, builder of AI-assisted engineering tooling, and the " +
  "photographer behind the street, cultural, and travel collections on vianch.com.";

export const AboutOgImageAlt = "About VIANCH. Victor Chavarro, Photographer & Software Engineer";
