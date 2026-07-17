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
  const name = process.env.RESEND_FROM_NAME || "Dental Finance Partners";
  const email = process.env.RESEND_FROM_EMAIL || "leads@propertytaxpartners.co.uk";
  return `${name} <${email}>`;
}
