import { ImageResponse } from "next/og";

/* Constants */
import { DefaultSeo } from "@/lib/constants/seo.constants";

export const alt = "VIANCH — Victor Chavarro, Photographer & Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const OpenGraphImage = (): Response => {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: "-0.03em" }}>VIANCH</div>
        <div style={{ fontSize: 44, color: "#fca311", marginTop: 8 }}>Victor Chavarro</div>
        <div style={{ fontSize: 40, color: "#e5e5e5", marginTop: 28 }}>
          Photographer &amp; Software Engineer
        </div>
        <div style={{ fontSize: 28, color: "#adb5bd", marginTop: 48 }}>
          {`${DefaultSeo.siteUrl.replace("https://", "")} · London`}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
};

export default OpenGraphImage;
