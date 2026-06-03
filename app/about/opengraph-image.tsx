import { ImageResponse } from "next/og";

/* Constants */
import { AboutOgImageAlt } from "@/lib/constants/about.constants";
import { DefaultSeo } from "@/lib/constants/seo.constants";
import { OgImageContentType, OgImageSize } from "@/lib/constants/ui.constants";

// Next.js reads `alt`, `size`, and `contentType` from this route to build the OG
// image metadata, so bind those names straight to the shared constants.
export { AboutOgImageAlt as alt, OgImageContentType as contentType, OgImageSize as size };

const OpenGraphImage = (): Response => {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#14213d",
          backgroundImage:
            "radial-gradient(900px 500px at 85% -10%, rgba(252,163,17,0.35), transparent 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: "#fca311",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 4, color: "#e5e5e5" }}>ABOUT · LONDON</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Victor Chavarro
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: 6,
              color: "#fca311",
              marginTop: 18,
            }}
          >
            VIANCH
          </div>
          <div style={{ fontSize: 38, color: "#e5e5e5", marginTop: 26 }}>
            Photographer &amp; Full-Stack Software Engineer
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#adb5bd" }}>
          {`${DefaultSeo.siteUrl.replace("https://", "")}/about`}
        </div>
      </div>
    ),
    {
      ...OgImageSize,
    }
  );
};

export default OpenGraphImage;
