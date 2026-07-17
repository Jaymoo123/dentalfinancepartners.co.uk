/**
 * Service-email shell for Holloway Davies lead-nurture follow-ups.
 * Centred white card on a #f6f7f8 canvas, Holloway Davies header, quiet footer.
 *
 * Table-based with inline styles only, role="presentation", no images and no
 * web fonts (system stack). Renders consistently everywhere and lands as a
 * personal service message about the enquirer's own enquiry.
 *
 * House style: no em-dashes (commas, parentheses, full stops, middle dots).
 */

export interface LeadServiceEmail {
  preheader: string;
  greeting: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  signoff: string;
  footerNote: string;
  optOutUrl?: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function renderLeadServiceEmail(e: LeadServiceEmail): { html: string; text: string } {
  const paras = e.paragraphs
    .map((p) => `<p style="margin:0 0 16px 0;">${esc(p)}</p>`)
    .join("\n");

  const ctaHtml = e.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px 0;"><tr><td style="border-radius:6px;background-color:#1e3a5f;">
<a href="${e.cta.href}" style="display:inline-block;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;background-color:#1e3a5f;">${esc(e.cta.label)}</a>
</td></tr></table>
`
    : "";

  const secondaryHtml = e.secondary
    ? `<p style="margin:0 0 16px 0;font-size:14px;">Or ${esc(e.secondary.label)}: <a href="${e.secondary.href}" style="color:#1e3a5f;">confirm here</a>.</p>
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
<div style="font-family:${FONT};font-size:14px;font-weight:700;color:#0f172a;letter-spacing:0.22em;line-height:1.35;">HOLLOWAY&nbsp;DAVIES</div>
<div style="display:inline-block;border-top:2px solid #1e3a5f;margin-top:5px;padding-top:5px;font-family:${FONT};font-size:12px;color:#64748b;letter-spacing:0.12em;line-height:1.35;">ACCOUNTING&nbsp;&amp;&nbsp;TAX</div>
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
<td style="border-left:3px solid #1e3a5f;padding:2px 0 2px 14px;font-family:${FONT};">
<div style="font-size:16px;font-weight:600;color:#0f172a;line-height:1.5;">The team</div>
<div style="font-size:14px;font-weight:600;color:#1e3a5f;line-height:1.5;">Holloway Davies</div>
<div style="font-size:13px;color:#64748b;line-height:1.6;"><a href="https://www.hollowaydavies.co.uk" style="color:#64748b;text-decoration:none;">hollowaydavies.co.uk</a></div>
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
    "The team",
    "Holloway Davies",
    "hollowaydavies.co.uk",
    "",
    e.footerNote,
    ...(e.optOutUrl ? ["To opt out, just reply STOP."] : []),
  ];
  return { html, text: textLines.join("\n") };
}
