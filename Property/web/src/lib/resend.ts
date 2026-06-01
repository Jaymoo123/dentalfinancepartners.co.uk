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
// name matters more than the address.
export function getFromAddress(): string {
  const name = process.env.RESEND_FROM_NAME || "Property Tax Partners Leads";
  const email = process.env.RESEND_FROM_EMAIL || "leads@propertytaxpartners.co.uk";
  return `${name} <${email}>`;
}
