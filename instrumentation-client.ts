// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Capture a sample of sessions, and every session that hits an error.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,

  integrations: [Sentry.replayIntegration()],

  // Setting this option to true will print useful information to the console while setting up Sentry.
  debug: false,
});

// Instruments App Router navigations for performance tracing.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
