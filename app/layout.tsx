import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

/* Components */
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import GoogleAnalytics from "./components/GoogleAnalytics/GoogleAnalytics";
import SEO from "./components/SEO/SEO";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

/* Styles */
import "@/theme/typography.css";
import "@/theme/reset.css";
import "@/theme/palette.css";
import "@/theme/layout.css";
import "@/theme/global.css";
import "@/theme/buttons.css";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DefaultSeo.siteUrl),
  title: DefaultSeo.title,
  description: DefaultSeo.description,
  keywords: DefaultSeo.keywords,
  authors: [{ name: DefaultSeo.author }],
  openGraph: {
    type: "website",
    locale: DefaultSeo.locale,
    siteName: DefaultSeo.title,
  },
  twitter: {
    card: "summary_large_image",
    creator: DefaultSeo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEO />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
