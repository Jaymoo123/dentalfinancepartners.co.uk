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
  /**
   * Whose email this is. Omitted means Property Tax Partners signed by Umair,
   * who is the estate's customer-facing voice on lead follow-ups.
   *
   * It exists because one caller, the warm-handoff introduction, sends on behalf
   * of all 17 estate sites from this one app: a Dentists enquirer must not receive
   * a Property Tax Partners wordmark and footer. Without this the brand was
   * hardcoded in three places in the HTML and three more in the text part.
   */
  brand?: {
    /** Two-line wordmark in the header band, e.g. ["DENTAL FINANCE", "PARTNERS"]. */
    wordmark: [string, string];
    /** Display name in the signature block. */
    name: string;
    /** Bare domain, shown and linked in the signature. */
    domain: string;
    /** Person the email is signed by. */
    signerName: string;
    /** Contact address shown under the signature. Omit to hide the line. */
    contactEmail?: string;
  };
}

const DEFAULT_BRAND = {
  wordmark: ["PROPERTY TAX", "PARTNERS"] as [string, string],
  name: "Property Tax Partners",
  domain: "propertytaxpartners.co.uk",
  signerName: "Umair",
  contactEmail: "umair@propertytaxpartners.co.uk",
};

/**
 * Split a brand name into the two-line wordmark the header band expects, keeping
 * the last word on the second line ("Trade Tax Specialists" -> "TRADE TAX" /
 * "SPECIALISTS"). A single-word brand puts everything on the first line.
 */
export function wordmarkFor(name: string): [string, string] {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return [name.toUpperCase(), ""];
  const last = words.pop() as string;
  return [words.join(" ").toUpperCase(), last.toUpperCase()];
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Wordmark text only. Same escaping, but a literal non-breaking space is emitted
 * as the &nbsp; entity rather than a raw U+00A0 byte: the owner-approved design
 * golden asserts the entity, and some older clients mangle the raw character.
 */
function escWordmark(s: string): string {
  return esc(s).replace(/ /g, "&nbsp;");
}

/** System font stack (no web fonts). */
const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function renderLeadServiceEmail(e: LeadServiceEmail): { html: string; text: string } {
  const brand = e.brand ?? DEFAULT_BRAND;
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
<div style="font-family:${FONT};font-size:14px;font-weight:700;color:#0f172a;letter-spacing:0.22em;line-height:1.35;">${escWordmark(brand.wordmark[0])}</div>
${brand.wordmark[1] ? `<div style="display:inline-block;border-top:2px solid #059669;margin-top:5px;padding-top:5px;font-family:${FONT};font-size:14px;font-weight:700;color:#0f172a;letter-spacing:0.22em;line-height:1.35;">${escWordmark(brand.wordmark[1])}</div>` : ""}
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
<div style="font-size:16px;font-weight:600;color:#0f172a;line-height:1.5;">${esc(brand.signerName)}</div>
<div style="font-size:14px;font-weight:600;color:#059669;line-height:1.5;">${esc(brand.name)}</div>
<div style="font-size:13px;color:#64748b;line-height:1.6;"><a href="https://www.${esc(brand.domain)}" style="color:#64748b;text-decoration:none;">${esc(brand.domain)}</a></div>
${brand.contactEmail ? `<div style="font-size:13px;color:#64748b;line-height:1.6;">${esc(brand.contactEmail)}</div>` : ""}
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
    brand.signerName,
    brand.name,
    brand.domain,
    "",
    e.footerNote,
    ...(e.optOutUrl ? ["To opt out, just reply STOP."] : []),
  ];
  return { html, text: textLines.join("\n") };
}
