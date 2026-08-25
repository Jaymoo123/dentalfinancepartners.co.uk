/**
 * Server-side Sentry, errors only. No client bundle impact: there is no
 * NEXT_PUBLIC_SENTRY_DSN and no client config on purpose - the money path
 * (lead capture, offers, claims, crons) is all server-side.
 *
 * DSN-gated: with SENTRY_DSN unset this whole file is a no-op, so the code
 * ships ahead of the account. captureConsoleIntegration turns every existing
 * `console.error` - including the central [admin] fail-loud log and the
 * [track] ingest logs - into an alertable issue with zero per-call-site edits.
 */
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (!process.env.SENTRY_DSN) return;
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0, // errors only; stays inside the 5k/mo free tier
    integrations: [
      Sentry.captureConsoleIntegration({ levels: ["error"] }),
    ],
  });
}

export const onRequestError = Sentry.captureRequestError;
