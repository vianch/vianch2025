import type { MetadataRoute } from "next";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

const manifest = (): MetadataRoute.Manifest => ({
  name: "VIANCH — Photography & Software Engineering",
  short_name: "VIANCH",
  description: DefaultSeo.description,
  start_url: "/",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    {
      src: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
  ],
});

export default manifest;
