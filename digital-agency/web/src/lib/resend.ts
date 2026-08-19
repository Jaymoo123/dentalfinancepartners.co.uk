/**
 * Resend client + identity for HEALTH-CHECK delivery emails and the
 * lead-nurture engine (lib/leads/*, api/leads/*, api/cron/lead-*).
 *
 * The NEWSLETTER nurture engine is separate and deliberately does NOT use this
 * module: it has its own provider (lib/nurture-provider.ts) and its own
 * NURTURE_* identity env vars with no fallbacks (EN-06). The RESEND_FROM_* /
 * RESEND_REPLY_TO names below remain in service here.
 *
 * Fallback addresses derive from THIS site's own domain. A missing env var must
 * never send this brand's mail from another site's sending domain.
 */
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

let cached: Resend | null = null;

/** Bare sending domain: siteConfig.domain carries the www host used for URLs. */
const MAIL_DOMAIN = siteConfig.domain.replace(/^www\./, "");

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
  const name = process.env.RESEND_FROM_NAME || siteConfig.name;
  const email = process.env.RESEND_FROM_EMAIL || `leads@${MAIL_DOMAIN}`;
  return `${name} <${email}>`;
}

export function getReplyTo(): string {
  return process.env.RESEND_REPLY_TO || `hello@${MAIL_DOMAIN}`;
}
