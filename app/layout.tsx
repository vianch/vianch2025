import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

/* Components */
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import GoogleAnalytics from "./components/GoogleAnalytics/GoogleAnalytics";
import JsonLd from "./components/JsonLd/JsonLd";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

/* Utils */
import { buildSchemaGraph, getPersonNode, getWebSiteNode } from "@/lib/utils/structured-data.utils";

/* Styles */
import "@/theme/typography.css";
import "@/theme/reset.css";
import "@/theme/palette.css";
import "@/theme/layout.css";
import "@/theme/global.css";
import "@/theme/buttons.css";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DefaultSeo.siteUrl),
  title: {
    default: DefaultSeo.titleDefault,
    template: DefaultSeo.titleTemplate,
  },
  description: DefaultSeo.description,
  keywords: DefaultSeo.keywords,
  applicationName: DefaultSeo.title,
  authors: [{ name: DefaultSeo.author, url: DefaultSeo.siteUrl }],
  creator: DefaultSeo.author,
  publisher: DefaultSeo.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: DefaultSeo.locale,
    siteName: DefaultSeo.title,
    title: DefaultSeo.titleDefault,
    description: DefaultSeo.description,
    url: DefaultSeo.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: DefaultSeo.twitterHandle,
    creator: DefaultSeo.twitterHandle,
    title: DefaultSeo.titleDefault,
    description: DefaultSeo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in your env to verify Search Console.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

const siteSchema = buildSchemaGraph([getPersonNode(), getWebSiteNode()]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd data={siteSchema} />
        <Navbar />
        {children}
        <ScrollTop />
        <Footer />
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
