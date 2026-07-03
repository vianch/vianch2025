"use client";

import { ReactElement, useEffect } from "react";

import { logger } from "@/lib/services/logger/logger.service";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProps): ReactElement => {
  useEffect(() => {
    logger.error("Unhandled client error", error, { page: "global-error" });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="container-xs container-padding-lg">
          <h1>Something went wrong</h1>
          <p>The error has been reported. Please try again.</p>
          <button className="button" onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
