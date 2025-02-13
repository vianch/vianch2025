import { FC } from "react";
import Head from "next/head";

/* Constants */
import { DefaultSeo, OgType, RobotsContent, TwitterCard } from "@/lib/constants/seo.constants";

/* Utils */
import { generateCanonicalUrl, generateStructuredData } from "@/lib/utils/seo.utils";

const SEO: FC<MetadataProps> = ({
  title,
  description = DefaultSeo.description,
  keywords = DefaultSeo.keywords,
  author = DefaultSeo.author,
  canonicalUrl,
  ogType = OgType.Website,
  ogImage,
  twitterCard = TwitterCard.Summary,
  twitterCreator = DefaultSeo.twitterHandle,
  twitterImage,
  noindex = false,
  nofollow = false,
  structuredData,
}) => {
  const pageTitle = title ? `${title} | ${DefaultSeo.title}` : DefaultSeo.title;
  const robots = noindex
    ? nofollow
      ? RobotsContent.NoFollowNoIndex
      : RobotsContent.FollowNoIndex
    : nofollow
      ? RobotsContent.NoFollowIndex
      : RobotsContent.FollowIndex;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={DefaultSeo.locale} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage.url} />
          <meta property="og:image:alt" content={ogImage.alt} />
          {ogImage.width && <meta property="og:image:width" content={String(ogImage.width)} />}
          {ogImage.height && <meta property="og:image:height" content={String(ogImage.height)} />}
          {ogImage.type && <meta property="og:image:type" content={ogImage.type} />}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitterCreator} />
      {twitterImage && (
        <>
          <meta name="twitter:image" content={twitterImage.url} />
          <meta name="twitter:image:alt" content={twitterImage.alt} />
        </>
      )}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={generateCanonicalUrl(canonicalUrl)} />}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEO;
