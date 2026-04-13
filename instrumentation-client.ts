import posthog from "posthog-js";
import * as Sentry from "@sentry/nextjs";

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  enabled: Boolean(sentryDsn),
  dsn: sentryDsn,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.1,
  replaysSessionSampleRate: process.env.NODE_ENV === "development" ? 0.2 : 0.05,
  replaysOnErrorSampleRate: 1,
  enableLogs: true,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],
});

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;

if (posthogToken) {
  posthog.init(posthogToken, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-01-30",
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
