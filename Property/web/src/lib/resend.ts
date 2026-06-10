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

// From-address for internal lead notifications. The domain must be verified in
// the Resend account; since these emails only go to our own inbox the display
// name matters more than the address. The name is deliberately site-agnostic
// ("JM Lead Notification") because this one endpoint emails leads from every
// site — the originating site is carried by the dynamic subject line and the
// "Site" row in the email body, not the sender name.
export function getFromAddress(): string {
  const name = process.env.RESEND_FROM_NAME || "JM Lead Notification";
  const email = process.env.RESEND_FROM_EMAIL || "leads@propertytaxpartners.co.uk";
  return `${name} <${email}>`;
}
