import { Resend } from "resend";
import { siteConfig } from "@/config/site";

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
  const name = process.env.RESEND_FROM_NAME || "Care Home Tax";
  // Fallback derives from THIS site's domain: a missing env var must never
  // send this brand's mail from another site's sending domain.
  const email = process.env.RESEND_FROM_EMAIL || `leads@${siteConfig.domain}`;
  return `${name} <${email}>`;
}
