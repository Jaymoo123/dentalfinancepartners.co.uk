/**
 * Service-email shell for lead-nurture follow-ups, rendered to the owner-approved
 * branded design (source of truth: docs/property/email-previews/*.html):
 * a centred white card on a #f6f7f8 canvas, PROPERTY TAX / PARTNERS wordmark
 * header band, 16px/1.6 body, green-accented signature block, quiet footer.
 *
 * Table-based with inline styles only, role="presentation", no images and no
 * web fonts (system stack), so it renders consistently everywhere and still
 * lands as a personal service message about the enquirer's own enquiry.
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
  /** Optional primary call to action (a button). Omit entirely for a reply-only email. */
  cta?: { label: string; href: string };
  /** Optional secondary one-tap link (confirm). */
  secondary?: { label: string; href: string };
  /** Sign-off name/line. */
  signoff: string;
  /** Small print under the signature (why they are receiving this). */
  footerNote: string;
  /**
   * When set, the email is opt-out-eligible: a "reply STOP" line is shown in the
   * footer and the caller adds the List-Unsubscribe header. Kept as a URL because
   * the machine one-click header (built by the caller) points at it; the visible
   * footer no longer renders it as a link (reply-based opt-out instead).
   */
  optOutUrl?: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** System font stack (no web fonts). */
const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function renderLeadServiceEmail(e: LeadServiceEmail): { html: string; text: string } {
  const paras = e.paragraphs
    .map((p) => `<p style="margin:0 0 16px 0;">${esc(p)}</p>`)
    .join("\n");

  const ctaHtml = e.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px 0;"><tr><td style="border-radius:6px;background-color:#059669;">
<a href="${e.cta.href}" style="display:inline-block;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;background-color:#059669;">${esc(e.cta.label)}</a>
</td></tr></table>
`
    : "";

  const secondaryHtml = e.secondary
    ? `<p style="margin:0 0 16px 0;font-size:14px;">Or ${esc(e.secondary.label)}: <a href="${e.secondary.href}" style="color:#059669;">confirm here</a>.</p>
`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background-color:#f6f7f8;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(e.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f7f8;">
<tr>
<td align="center" style="padding:24px 12px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
<tr>
<td style="padding:26px 28px 18px 28px;border-bottom:1px solid #e5e7eb;">
<div style="font-family:${FONT};font-size:14px;font-weight:700;color:#0f172a;letter-spacing:0.22em;line-height:1.35;">PROPERTY&nbsp;TAX</div>
<div style="display:inline-block;border-top:2px solid #059669;margin-top:5px;padding-top:5px;font-family:${FONT};font-size:14px;font-weight:700;color:#0f172a;letter-spacing:0.22em;line-height:1.35;">PARTNERS</div>
</td>
</tr>
<tr>
<td style="padding:26px 28px 6px 28px;font-family:${FONT};font-size:16px;line-height:1.6;color:#334155;">
<p style="margin:0 0 16px 0;">${esc(e.greeting)}</p>
${paras}
${ctaHtml}${secondaryHtml}<p style="margin:0 0 8px 0;">${esc(e.signoff)}</p>
</td>
</tr>
<tr>
<td style="padding:8px 28px 26px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="border-left:3px solid #059669;padding:2px 0 2px 14px;font-family:${FONT};">
<div style="font-size:16px;font-weight:600;color:#0f172a;line-height:1.5;">Junayd</div>
<div style="font-size:14px;font-weight:600;color:#059669;line-height:1.5;">Property Tax Partners</div>
<div style="font-size:13px;color:#64748b;line-height:1.6;"><a href="https://www.propertytaxpartners.co.uk" style="color:#64748b;text-decoration:none;">propertytaxpartners.co.uk</a></div>
<div style="font-size:13px;color:#64748b;line-height:1.6;">junayd@propertytaxpartners.co.uk</div>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 28px 24px 28px;">
<div style="border-top:1px solid #e5e7eb;padding-top:14px;font-family:${FONT};font-size:12px;line-height:1.6;color:#64748b;">${esc(e.footerNote)}${e.optOutUrl ? "<br>To opt out, just reply STOP." : ""}</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body></html>`;

  const actionLines = [
    ...(e.cta ? [`${e.cta.label}: ${e.cta.href}`] : []),
    ...(e.secondary ? [`${e.secondary.label}: ${e.secondary.href}`] : []),
  ];
  const textLines = [
    e.greeting,
    "",
    ...e.paragraphs,
    ...(actionLines.length > 0 ? ["", ...actionLines] : []),
    "",
    e.signoff,
    "",
    "Junayd",
    "Property Tax Partners",
    "propertytaxpartners.co.uk",
    "",
    e.footerNote,
    ...(e.optOutUrl ? ["To opt out, just reply STOP."] : []),
  ];
  return { html, text: textLines.join("\n") };
}
