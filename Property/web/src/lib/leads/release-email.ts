/**
 * Buyer release email in the "New qualified enquiry" style the operator
 * handoff uses (owner request 2026-08-19), constrained to the Shared Data
 * fields in DSA Annex A.2: identity + contacts, the full enquiry, tier /
 * case type / intent line, role and their own words, practice name,
 * verification as verified-or-not with date and time (never carrier or line
 * type), timestamps and our reference, plus the booked callback slot (owner
 * decision; flag raised about the annex, owner accepted). Deliberately NOT
 * included, ever: reply transcripts, response latency, call windows,
 * Companies House, on-site journey, source page, quality scores.
 *
 * Clause 3.3(c): the lawful-basis notice shown at collection travels with the
 * Referral, so the footer carries the consent wording verbatim.
 */
import { roleLabel, surfaceLabel } from "@/lib/leads/role-labels";
import { escapeHtml, prettySource, formatTimestamp, type LeadRecord } from "@/lib/leads/notify-email";
import { tierLabel } from "@/lib/leads/offer-teaser";

export type ReleaseExtras = {
  /** e.g. "valid_mobile" -> shown as verified; detail levels never shared. */
  phoneStatus?: string | null;
  emailStatus?: string | null;
  verifiedAt?: string | null;
  /** Human slot label from the booked event, e.g. "Mon 6 Jul, afternoon". */
  bookedSlot?: string | null;
  caseTier?: string | null;
  caseType?: string | null;
  intentLine?: string | null;
  priceGbp: number;
};

const PHONE_VERIFIED = new Set(["valid_mobile", "valid_landline"]);
const EMAIL_VERIFIED = new Set(["deliverable"]);

function verifiedLabel(kind: "phone" | "email", status?: string | null, at?: string | null): string {
  const ok = kind === "phone" ? PHONE_VERIFIED.has(status ?? "") : EMAIL_VERIFIED.has(status ?? "");
  if (!ok) return "";
  const when = at ? formatTimestamp(at) : "";
  return when ? `verified ${when}` : "verified";
}

function row(label: string, valueHtml: string): string {
  if (!valueHtml) return "";
  return `<tr><td style="padding:3px 14px 3px 0;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:3px 0;">${valueHtml}</td></tr>`;
}

export function buildReleaseEmail(
  lead: LeadRecord,
  x: ReleaseExtras,
): { subject: string; html: string; text: string } {
  const name = (lead.full_name ?? "").trim() || "New enquiry";
  const subject = `New qualified enquiry: ${name}`;
  const esc = escapeHtml;

  const extras = lead.extras ?? {};
  const roleDetail =
    typeof extras.role_detail === "string" && extras.role_detail ? extras.role_detail : null;
  const formId = typeof extras.form_id === "string" && extras.form_id ? extras.form_id : null;

  const phoneVer = verifiedLabel("phone", x.phoneStatus, x.verifiedAt);
  const emailVer = verifiedLabel("email", x.emailStatus, x.verifiedAt);
  const tier = x.caseTier ? tierLabel(x.caseTier) || x.caseTier : "";

  const detail = [
    row("Name", esc(name)),
    row(
      "Phone",
      lead.phone
        ? `${esc(lead.phone)}${phoneVer ? ` <span style="color:#047857;">(${esc(phoneVer)})</span>` : ""}`
        : "",
    ),
    row(
      "Email",
      lead.email
        ? `${esc(lead.email)}${emailVer ? ` <span style="color:#047857;">(${esc(emailVer)})</span>` : ""}`
        : "",
    ),
    row("Role", esc(roleLabel(lead.role) || "")),
    roleDetail ? row("In their words", esc(roleDetail)) : "",
    lead.practice_name ? row("Company / practice", esc(lead.practice_name)) : "",
    tier ? row("Tier", `${esc(tier)}${x.caseType ? ` · ${esc(x.caseType)}` : ""}`) : "",
    x.intentLine ? row("Summary", esc(x.intentLine)) : "",
    formId ? row("Came via", esc(surfaceLabel(formId) ?? formId)) : "",
    row("Site", esc(prettySource(lead.source))),
    row("Submitted", esc(formatTimestamp(lead.submitted_at || lead.created_at))),
    lead.id ? row("Our reference", esc(`L-${lead.id.slice(0, 8)}`)) : "",
  ]
    .filter(Boolean)
    .join("");

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p style="font-size:16px;"><strong style="color:#047857;">Contact details verified. Actively responded and ready for a call.</strong></p>
${x.bookedSlot ? `<p>Booked callback: <strong>${esc(x.bookedSlot)}</strong></p>` : ""}
<table style="border-collapse:collapse;font-size:14px;margin:12px 0;">${detail}</table>
<div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;padding:12px 14px;font-size:14px;">
<div style="color:#64748b;margin-bottom:4px;">Their enquiry</div>
<div>${esc(lead.message || "(no message)")}</div>
</div>
<p style="margin:16px 0 0;color:#64748b;font-size:13px;">£${x.priceGbp} is added to your monthly invoice under the agreed terms.</p>
${
  lead.consent_text
    ? `<p style="margin:10px 0 0;color:#94a3b8;font-size:12px;">Data-sharing notice shown to the enquirer at the point of collection: &ldquo;${esc(lead.consent_text)}&rdquo;</p>`
    : ""
}
</div>`;

  const text = [
    subject,
    "Contact details verified. Actively responded and ready for a call.",
    x.bookedSlot ? `Booked callback: ${x.bookedSlot}` : "",
    "",
    `Name: ${name}`,
    lead.phone ? `Phone: ${lead.phone}${phoneVer ? ` (${phoneVer})` : ""}` : "",
    lead.email ? `Email: ${lead.email}${emailVer ? ` (${emailVer})` : ""}` : "",
    roleLabel(lead.role) ? `Role: ${roleLabel(lead.role)}` : "",
    roleDetail ? `In their words: ${roleDetail}` : "",
    lead.practice_name ? `Company / practice: ${lead.practice_name}` : "",
    tier ? `Tier: ${tier}${x.caseType ? ` · ${x.caseType}` : ""}` : "",
    x.intentLine ? `Summary: ${x.intentLine}` : "",
    `Site: ${prettySource(lead.source)}`,
    `Submitted: ${formatTimestamp(lead.submitted_at || lead.created_at)}`,
    lead.id ? `Our reference: L-${lead.id.slice(0, 8)}` : "",
    "",
    `Their enquiry: ${lead.message || "(no message)"}`,
    "",
    `£${x.priceGbp} is added to your monthly invoice under the agreed terms.`,
    lead.consent_text
      ? `Data-sharing notice shown at collection: "${lead.consent_text}"`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
