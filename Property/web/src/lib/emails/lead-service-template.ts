/**
 * Service-email shell for lead-nurture follow-ups. Deliberately plain and
 * personal (not the marketing template) because these are SOLICITED service
 * messages about the enquirer's own enquiry: a real person following up to
 * arrange their review. Clean, few images, one clear action — which also lands
 * better in the inbox.
 *
 * House style: no em-dashes (commas, parentheses, full stops, middle dots).
 */

export interface LeadServiceEmail {
  /** Short preheader (inbox preview). */
  preheader: string;
  /** First-line greeting, e.g. "Hi Sarah,". */
  greeting: string;
  /** Body paragraphs, plain text (rendered as <p>). */
  paragraphs: string[];
  /** Primary call to action (book a time). */
  cta: { label: string; href: string };
  /** Optional secondary one-tap link (confirm). */
  secondary?: { label: string; href: string };
  /** Sign-off name/line. */
  signoff: string;
  /** Small print under the signature (reply / opt-out note). */
  footerNote: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderLeadServiceEmail(e: LeadServiceEmail): { html: string; text: string } {
  const paras = e.paragraphs.map((p) => `<p style="margin:0 0 14px;">${esc(p)}</p>`).join("");
  const secondary = e.secondary
    ? `<p style="margin:14px 0 0;font-size:14px;">Or ${esc(e.secondary.label)}: <a href="${e.secondary.href}" style="color:#047857;">confirm here</a>.</p>`
    : "";

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f6f7f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(e.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f8;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:32px;">
<tr><td>
<p style="margin:0 0 18px;font-weight:700;">${esc(e.greeting)}</p>
${paras}
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0;"><tr><td>
<a href="${e.cta.href}" style="display:inline-block;background:#047857;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:6px;">${esc(e.cta.label)}</a>
</td></tr></table>
${secondary}
<p style="margin:22px 0 0;">${esc(e.signoff)}</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 12px;">
<p style="margin:0;font-size:12px;color:#64748b;">${esc(e.footerNote)}</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const textLines = [
    e.greeting,
    "",
    ...e.paragraphs,
    "",
    `${e.cta.label}: ${e.cta.href}`,
    ...(e.secondary ? [`${e.secondary.label}: ${e.secondary.href}`] : []),
    "",
    e.signoff,
    "",
    e.footerNote,
  ];
  return { html, text: textLines.join("\n") };
}
