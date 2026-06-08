/**
 * Branded, email-client-safe shell for OUTBOUND MARKETING email (the nurture
 * drip). Distinct from the internal lead-notification template in
 * app/api/leads/notify (that one is a forward-ready data table to our own inbox;
 * this one is public-facing, on-brand, and legally a marketing message).
 *
 * Every marketing email MUST carry an unsubscribe link (PECR/UK GDPR), so
 * `unsubscribeUrl` is required, not optional. Copy rule: no em-dashes anywhere
 * in user-facing text (use commas, parentheses, full stops, middle dots).
 *
 * Inline styles only (email clients strip <style>/external CSS). Table layout,
 * light-only colour scheme, 600px card. Brand: Property Tax Partners, slate +
 * emerald to match the site.
 */

export interface MarketingEmail {
  /** Inbox-preview line (hidden in the body). Keep it short and specific. */
  preheader: string;
  /** The email's H1. */
  heading: string;
  /** Inner body HTML (already-escaped/authored paragraphs, <p>/<ul>/<h3> etc.). */
  bodyHtml: string;
  /** Plain-text body (mirror of bodyHtml for the text/plain part). */
  bodyText: string;
  /** Optional primary call to action. */
  cta?: { label: string; href: string };
  /** One-click unsubscribe URL (token-bearing). Required. */
  unsubscribeUrl: string;
}

const BRAND = "Property Tax Partners";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Render the {html, text} parts for one marketing email. */
export function renderMarketingEmail(e: MarketingEmail): { html: string; text: string } {
  const ctaBlock = e.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 4px;">
         <tr><td style="border-radius:10px;background:#059669;">
           <a href="${esc(e.cta.href)}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:10px;">${esc(e.cta.label)}</a>
         </td></tr>
       </table>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${esc(e.heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f1f5f9;">${esc(e.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#f1f5f9;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:22px 28px;">
                <a href="${esc(SITE)}" style="color:#ffffff;font-size:17px;font-weight:700;text-decoration:none;letter-spacing:0.2px;">${esc(BRAND)}</a>
                <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">Property tax updates for UK landlords</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px;">
                <h1 style="margin:0 0 14px;color:#0f172a;font-size:22px;line-height:1.3;font-weight:700;">${esc(e.heading)}</h1>
                <div style="color:#334155;font-size:15px;line-height:1.65;">${e.bodyHtml}</div>
                ${ctaBlock}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 26px;">
                <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">The ${esc(BRAND)} team</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;border-top:1px solid #e2e8f0;background:#ffffff;">
                <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;line-height:1.6;">
                  You are receiving this because you asked us to send you property tax updates at
                  <a href="${esc(SITE)}" style="color:#64748b;text-decoration:underline;">${esc(SITE.replace(/^https?:\/\//, ""))}</a>.
                  These updates are general information, not regulated tax advice.
                </p>
                <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                  <a href="${esc(e.unsubscribeUrl)}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a>
                  &nbsp;·&nbsp;
                  <a href="${esc(SITE)}/privacy-policy" style="color:#64748b;text-decoration:underline;">Privacy policy</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    BRAND,
    "Property tax updates for UK landlords",
    "",
    e.heading,
    "",
    e.bodyText,
    e.cta ? `\n${e.cta.label}: ${e.cta.href}` : "",
    "",
    `The ${BRAND} team`,
    "",
    `You are receiving this because you asked us to send you property tax updates at ${SITE}. These updates are general information, not regulated tax advice.`,
    `Unsubscribe: ${e.unsubscribeUrl}`,
    `Privacy policy: ${SITE}/privacy-policy`,
  ]
    .filter((l) => l !== "")
    .join("\n");

  return { html, text };
}
