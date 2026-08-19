/**
 * Fetch the body of a received (inbound) email from Resend.
 *
 * Resend's email.received webhook carries only metadata (no body, headers or
 * attachments), so the inbound route must pull the content by id from
 * GET /emails/receiving/{id}. Plain text is preferred; falls back to a crude
 * text rendering of the HTML part.
 *
 * Fail-soft: any error returns "" so a reply is still recorded as `replied`
 * (just without phone/opt-out extraction) rather than dropped.
 */
import { htmlToText } from "./email-parse";

export async function fetchReceivedEmailText(emailId: string): Promise<string> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "";
  try {
    const res = await fetch(
      `https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) {
      console.error("[leads/inbound] received-email fetch failed", res.status);
      return "";
    }
    const j = (await res.json()) as { text?: string | null; html?: string | null };
    if (typeof j.text === "string" && j.text.trim()) return j.text;
    if (typeof j.html === "string" && j.html.trim()) return htmlToText(j.html);
  } catch (err) {
    console.error("[leads/inbound] received-email fetch error", err);
  }
  return "";
}
