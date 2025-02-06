import Script from "next/script";
import { FC } from "react";

const GoogleAnalytics: FC = () => {
  const gaMeasurementId = "G-MJV4RD2XK8";

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaMeasurementId}');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
