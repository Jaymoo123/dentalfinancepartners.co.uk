/**
 * Shared nurture engine — public API surface.
 *
 * Built in GAP-5 (phase-c-nurture). See packages/web-shared/nurture/ for
 * individual module docs. Compose with a per-site NurtureConfig to get a
 * fully parameterised subscribe/send/webhook/cron engine.
 *
 * Module layout:
 *   tokens.ts   — stateless HMAC double-opt-in tokens (lifted from generalist)
 *   config.ts   — NurtureConfig + NurtureStep interfaces
 *   admin.ts    — service-role Supabase REST helper
 *   send.ts     — claim-before-send idempotent step sender + EmailProvider
 *   subscribe.ts — subscribe/confirm/unsubscribe handler factories
 *   webhook.ts  — Svix-verified Resend events handler
 *   cron.ts     — cron batch runner
 */

export type { NurtureConfig, NurtureStep } from "./config";
export { requireEnv } from "./config";

export {
  mintNurtureToken,
  verifyNurtureToken,
  getNurtureTokenSecret,
} from "./tokens";
export type { NurtureTokenIntent, NurtureTokenVerifyResult } from "./tokens";

export { adminConfigured } from "./admin";
export type { AdminResult } from "./admin";

export type { NurtureSubscriber, EmailProvider } from "./send";
export { processStep, unsubscribeUrl } from "./send";

export type { SubscribeInput, SubscribeResult } from "./subscribe";
export {
  handleSubscribe,
  confirmSubscriber,
  unsubscribeByEmail,
} from "./subscribe";

export {
  verifyResendWebhook,
  handleResendEvent,
} from "./webhook";
export type { ResendEventPayload } from "./webhook";

export type { CronResult } from "./cron";
export { runNurtureCron } from "./cron";
