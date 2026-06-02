import { DefaultSeo, Employer, KnowsAbout, SocialProfiles } from "@/lib/constants/seo.constants";

/* Utils */
import { generateCanonicalUrl } from "./seo.utils";

/**
 * Stable @id anchors so schema nodes can reference one another within a @graph.
 * Using fragment identifiers on the canonical domain is the schema.org convention
 * for linking the Person, WebSite, and page-level nodes into a single entity graph.
 */
const PersonId = `${DefaultSeo.siteUrl}/#person`;
const WebSiteId = `${DefaultSeo.siteUrl}/#website`;
const LogoUrl = `${DefaultSeo.siteUrl}/images/logo-sm.png`;

/**
 * Builds the Person node for Victor Chavarro (VIANCH).
 *
 * This is the single most important signal for entity disambiguation: it tells
 * Google authoritatively that VIANCH is a photographer and software engineer, and
 * the `sameAs` profiles anchor that identity to a verifiable web presence.
 *
 * @returns Schema.org Person node (without @context — designed to live in a @graph)
 */
export const getPersonNode = (): Record<string, unknown> => ({
  "@type": "Person",
  "@id": PersonId,
  name: DefaultSeo.author,
  alternateName: DefaultSeo.authorAlternateName,
  url: DefaultSeo.siteUrl,
  image: LogoUrl,
  email: `mailto:${DefaultSeo.email}`,
  jobTitle: [...DefaultSeo.jobTitles],
  description:
    "Victor Chavarro (VIANCH) is a London-based full-stack software engineer and photographer. " +
    "He is a Senior Software Engineer at TodayTix Group and the owner of vianch.com, where he " +
    "publishes his photography portfolio and engineering work.",
  disambiguatingDescription:
    "Victor Chavarro, known as VIANCH, is a London-based photographer and software engineer. " +
    "VIANCH is his personal brand for photography and web development work.",
  worksFor: {
    "@type": "Organization",
    name: Employer.name,
    url: Employer.url,
  },
  knowsAbout: [...KnowsAbout],
  address: {
    "@type": "PostalAddress",
    addressLocality: DefaultSeo.locality,
    addressRegion: DefaultSeo.region,
    addressCountry: DefaultSeo.country,
  },
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Photographer",
      occupationLocation: { "@type": "City", name: DefaultSeo.locality },
    },
    {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: { "@type": "City", name: DefaultSeo.locality },
    },
  ],
  sameAs: [...SocialProfiles],
});

/**
 * Builds the WebSite node for vianch.com, published by the Person above.
 * @returns Schema.org WebSite node (without @context)
 */
export const getWebSiteNode = (): Record<string, unknown> => ({
  "@type": "WebSite",
  "@id": WebSiteId,
  name: DefaultSeo.title,
  alternateName: "Victor Chavarro — Photography & Engineering",
  url: DefaultSeo.siteUrl,
  description: DefaultSeo.description,
  inLanguage: "en",
  publisher: { "@id": PersonId },
  about: { "@id": PersonId },
});

/**
 * Builds a ProfilePage node describing the /about page, whose main entity is the
 * Person. Signals to Google that this URL is the authoritative bio for VIANCH.
 * @returns Schema.org ProfilePage node (without @context)
 */
export const getProfilePageNode = (): Record<string, unknown> => ({
  "@type": "ProfilePage",
  "@id": `${generateCanonicalUrl("/about")}#profilepage`,
  url: generateCanonicalUrl("/about"),
  name: "About VIANCH — Victor Chavarro",
  description: "About Victor Chavarro (VIANCH): a London-based photographer and software engineer.",
  isPartOf: { "@id": WebSiteId },
  mainEntity: { "@id": PersonId },
});

/**
 * Builds a BreadcrumbList node from an ordered list of crumbs.
 * @param items - Ordered breadcrumb entries (top-level first)
 * @returns Schema.org BreadcrumbList node (without @context)
 */
export const getBreadcrumbNode = (
  items: { name: string; path: string }[]
): Record<string, unknown> => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: generateCanonicalUrl(item.path),
  })),
});

/**
 * Wraps schema nodes into a single JSON-LD graph document.
 * @param nodes - Schema.org nodes to include in the graph
 * @returns A JSON-LD document with a shared @context and @graph
 */
export const buildSchemaGraph = (nodes: Record<string, unknown>[]): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
