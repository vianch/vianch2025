import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

/* Components */
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
