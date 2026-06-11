/**
 * Resend client + identity for HEALTH-CHECK delivery emails only.
 * The nurture engine has its own provider (lib/nurture-provider.ts) and its
 * own NURTURE_* identity env vars (EN-06, no fallbacks). The RESEND_FROM_* /
 * RESEND_REPLY_TO names below remain in service for health-check emails.
 */
import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  cached = new Resend(key);
  return cached;
}

export function getFromAddress(): string {
  const name = process.env.RESEND_FROM_NAME || "Agency Founder Finance";
  const email = process.env.RESEND_FROM_EMAIL || "hello@agencyfounderfinance.co.uk";
  return `${name} <${email}>`;
}

export function getReplyTo(): string {
  return process.env.RESEND_REPLY_TO || "hello@agencyfounderfinance.co.uk";
}
