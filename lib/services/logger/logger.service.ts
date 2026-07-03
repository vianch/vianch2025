import * as Sentry from "@sentry/nextjs";

/**
 * Central logger: the only place the app talks to Sentry for errors.
 * Use logger.error(...) in every catch/error branch instead of calling
 * console.* or Sentry.captureException directly.
 *
 * Works on server, edge, and client — @sentry/nextjs resolves the right
 * SDK per bundle, so no client/server split is needed.
 */
export const logger = {
  error: (message: string, error: unknown, tags?: Record<string, string>): void => {
    console.error(message, error);
    Sentry.captureException(error, { extra: { message }, tags });
  },

  info: (message: string, ...details: unknown[]): void => {
    console.info(message, ...details);
  },

  warn: (message: string, tags?: Record<string, string>): void => {
    console.warn(message);
    Sentry.captureMessage(message, { level: "warning", tags });
  },
};
