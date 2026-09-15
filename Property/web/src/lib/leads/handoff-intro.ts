/**
 * Warm handoff introduction: the one email that puts the enquirer and the partner
 * on the same thread.
 *
 * Why this exists: the partner firm calls people who agreed, at submit, that their
 * details "may be shared with a firm from our specialist partner network". That is
 * true, recorded per lead in `leads.consent_text`, and repeated on the thank-you
 * page. But it is read once, seconds after submitting, and the call comes days
 * later, so some enquirers ask the partner how he got their information. This email
 * closes that gap by naming the firm and the person before the phone rings.
 *
 * Three properties matter more than anything else here, in this order:
 *
 *  1. It cannot reach a real enquirer until someone deliberately arms it.
 *     `resolveMode()` defaults to "report", and `resolveRecipients()` refuses any
 *     address other than the operator's while unarmed. Two independent gates,
 *     because a single env var is one typo away from emailing customers.
 *
 *  2. It cannot be sent twice, to a lead or to a person, no matter how the
 *     tracker's dropdowns are toggled. `claimIntro()` takes a database claim first;
 *     the constraints in 20260915000000_lead_handoff_intros.sql are what enforce
 *     this, not the logic below.
 *
 *  3. The enquirer is CC'd, so the body carries no internal data. The existing
 *     partner email (offer-release -> buildLeadHtml) is a data dump with role,
 *     consent text and pricing: it can never be used here.
 */
import { adminSelect, adminInsert, adminUpdate, adminDelete } from "@/lib/supabase/admin";
import { getResend } from "@/lib/resend";
import { isSuppressed } from "./suppression";

export type HandoffMode = "report" | "redirect" | "live";

export type IntroLead = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  message: string | null;
  /** What they said they are, e.g. "landlord". The tracker calls this Type. */
  role: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
};

/**
 * Fields quoted back to the enquirer. Deliberately narrow: their own contact
 * details and their own words, nothing else.
 *
 * NOT quoted, and never to be added: source_url, visitor_id, session_id, lead id,
 * quality score, tier, price, status, or anything from `extras`. The enquirer is a
 * recipient of this email, and the partner is copied on it: an analytics field in
 * here is a tracking disclosure to a customer and a data leak to a third party.
 */
export const QUOTED_FIELDS = ["Name", "Email", "Phone", "Type", "Message"] as const;

/**
 * Everything the enquirer has told us SINCE the form, gathered for the quoted
 * block. This exists because the introduction replaces the forwarded lead
 * notification as how the partner firm receives an enquiry, and the notification
 * never carried any of it either: a preferred call time sitting in a contact
 * event is useless if the person making the call cannot see it.
 */
export type IntroContext = {
  /** Human label from the booking flow, e.g. "Tuesday 16 September, morning". */
  bookedSlot: string | null;
  /** Their own replies to the follow-ups, oldest first. */
  replies: { channel: string; body: string }[];
};

export const EMPTY_INTRO_CONTEXT: IntroContext = { bookedSlot: null, replies: [] };

/** How many replies to quote. Enough for a stated time, short of a transcript. */
const MAX_QUOTED_REPLIES = 2;

/**
 * Longest a cleaned reply may be and still be quoted.
 *
 * The point of quoting a reply is to carry a scheduling note ("mornings are best",
 * "call me after 2"). Anything much longer is a substantive email, and reading
 * real replies showed those are multi-paragraph accounts of someone's affairs that
 * swamp the introduction. Those are dropped rather than truncated: a half-quoted
 * enquiry is worse than none, and Umair can forward the thread.
 */
const MAX_REPLY_CHARS = 280;

/**
 * Where a reply stops being the person's own words.
 *
 * Email clients append the entire prior thread. Real replies were arriving with
 * "Hi Junayd," and our own nurture copy quoted back inside them, which in an email
 * signed by Umair reads as though nobody knows who is handling it.
 */
const QUOTE_MARKERS = [
  /^\s*On .*wrote:/mi,
  /^\s*-{2,}\s*Original Message/mi,
  /^\s*_{5,}/m,
  /^\s*From:\s/mi,
  /^\s*Sent:\s/mi,
  /^\s*>/m,
];

/** Sign-offs that add nothing to a scheduling note. */
const SIGNATURE_RE = /\b(sent from my (iphone|ipad|android|mobile|samsung)|get outlook for)\b[\s\S]*$/i;

/**
 * A greeting addressed to one of our own people, with or without punctuation.
 *
 * Real replies open "Hi Junayd" on its own line. The generic rule below
 * deliberately will not touch that, because without a comma it cannot tell where
 * the greeting ends, and "Hi Monday the 13th works for me" must keep its Monday.
 * This rule is safe precisely because it only fires on names that are ours, and
 * leaving them in puts the wrong person's name inside an email signed by Umair.
 *
 * Add a name here if the customer-facing voice ever changes again.
 */
const INTERNAL_GREETING_RE =
  /^(hi|hello|hey|dear|good (morning|afternoon|evening))\s+(junayd|umair)[,:]?\s*/i;

/**
 * A generic leading greeting, which may name anyone. Requires the comma or colon
 * that marks where the greeting stops, so it can never swallow real content.
 * Applied after whitespace is collapsed, so the class never spans a line break.
 */
const GREETING_RE = /^(hi|hello|hey|dear|good (morning|afternoon|evening))[^,]{0,40}[,:]\s*/i;

/**
 * Reduce a raw reply to the part worth putting in front of the enquirer and the
 * partner firm, or null if nothing useful survives.
 *
 * URLs are removed outright. A reply body is the one place a tracking parameter
 * can reach this email (a real reply contained "?utm_source=chatgpt.com"), and
 * this email is deliberately free of them.
 */
export function cleanReplyBody(raw: string): string | null {
  let body = raw ?? "";
  for (const marker of QUOTE_MARKERS) {
    const m = body.match(marker);
    if (m?.index !== undefined) body = body.slice(0, m.index);
  }
  body = body.replace(SIGNATURE_RE, " ");
  body = body.replace(/<?\bhttps?:\/\/\S+/gi, " ");
  body = body.replace(/<[^>]*>/g, " ");
  body = body.replace(/\s+/g, " ").trim();
  body = body.replace(INTERNAL_GREETING_RE, "").trim();
  body = body.replace(GREETING_RE, "").trim();
  if (!body) return null;
  if (body.length > MAX_REPLY_CHARS) return null;
  return body;
}

/**
 * Read the booking and the replies for one lead.
 *
 * `booked` events carry a human label in meta.start, written by the native
 * booking flow whose own comment says the window "tells them when the lead said
 * they would pick up" (lib/leads/booking.ts). `replied` events carry the raw text
 * in meta.body, which is where a time stated in free text ends up, since the
 * nurture copy invites exactly that ("tell me and we will work around it").
 *
 * Best-effort: a failed read returns an empty context so the introduction still
 * goes, just without the extra detail.
 */
export async function gatherIntroContext(leadId: string): Promise<IntroContext> {
  const res = await adminSelect<{
    event_type: string;
    channel: string | null;
    ts: string;
    meta: Record<string, unknown> | null;
  }>("lead_contact_events", {
    select: "event_type,channel,ts,meta",
    lead_id: `eq.${leadId}`,
    event_type: "in.(booked,replied)",
    order: "ts.asc",
  });
  if (!res.ok) {
    console.error("[handoff-intro] could not read contact events", leadId, res.status);
    return EMPTY_INTRO_CONTEXT;
  }

  // Latest booking wins: someone who rebooks means the newer slot.
  const booked = [...res.data].reverse().find((e) => e.event_type === "booked");
  const bookedSlot =
    booked && typeof booked.meta?.start === "string" ? String(booked.meta.start).trim() : null;

  const replies = res.data
    .filter((e) => e.event_type === "replied" && typeof e.meta?.body === "string")
    .map((e) => ({ channel: e.channel || "reply", body: cleanReplyBody(String(e.meta?.body)) }))
    .filter((r): r is { channel: string; body: string } => r.body !== null)
    .slice(-MAX_QUOTED_REPLIES);

  return { bookedSlot: bookedSlot || null, replies };
}

export type IntroOutcome =
  | { ok: true; mode: HandoffMode; providerId: string | null; degraded: boolean }
  | {
      ok: false;
      reason: string;
      /**
       * True when no retry will fix this and a person must act. The tracker row is
       * stamped so it is visible where the triager works, because a refusal nobody
       * sees is worse than the leak it prevented: everyone believes the partner
       * firm was emailed and the enquirer hears from no one.
       */
      needsHuman?: boolean;
    };

/* ------------------------------------------------------------------ *
 * Mode
 * ------------------------------------------------------------------ */

/**
 * Absent or unrecognised means "report", never "live". An operator who fat-fingers
 * the env var gets the safe mode, not the sending one.
 */
export function resolveMode(): HandoffMode {
  const raw = (process.env.LEAD_HANDOFF_MODE || "").trim().toLowerCase();
  if (raw === "live") return "live";
  if (raw === "redirect") return "redirect";
  return "report";
}

/** Where redirected mail goes while testing. Also the only address allowed out. */
export function operatorEmail(): string {
  return (process.env.LEAD_HANDOFF_OPERATOR_EMAIL || "").trim();
}

export function partnerEmail(): string {
  return (process.env.LEAD_HANDOFF_PARTNER_EMAIL || "").trim();
}

export function partnerBcc(): string {
  return (process.env.LEAD_HANDOFF_BCC || "").trim();
}

/** Cap per cron pass. A bug should email a handful, never the whole tracker. */
export function maxPerRun(): number {
  const n = Number.parseInt(process.env.LEAD_HANDOFF_MAX_PER_RUN || "", 10);
  return Number.isFinite(n) && n > 0 ? n : 5;
}

/* ------------------------------------------------------------------ *
 * Brands
 *
 * Property's cron sends on behalf of every site, but each site's display name
 * lives in its own niche.config.json, which this app cannot read at runtime. So
 * the names are mirrored here. Source of truth is `<site>/niche.config.json`
 * (`display_name` / `domain`); if one is renamed there, change it here too.
 *
 * Keys are the `leads.source` values actually present in production.
 * ------------------------------------------------------------------ */

type Brand = { name: string; domain: string };

const BRANDS: Record<string, Brand> = {
  property: { name: "Property Tax Partners", domain: "www.propertytaxpartners.co.uk" },
  generalist: { name: "Holloway Davies", domain: "www.hollowaydavies.co.uk" },
  medical: { name: "Medical Accountants UK", domain: "www.medicalaccounts.co.uk" },
  solicitors: { name: "Accounts for Lawyers", domain: "www.accountsforlawyers.co.uk" },
  dentists: { name: "Dental Finance Partners", domain: "www.dentalfinancepartners.co.uk" },
  charities: { name: "Trustee Tax", domain: "www.trusteetax.co.uk" },
  "contractors-ir35": {
    name: "Contractor Tax Accountants",
    domain: "www.contractortaxaccountants.co.uk",
  },
  "construction-cis": { name: "Trade Tax Specialists", domain: "www.tradetaxspecialists.co.uk" },
  care: { name: "Care Home Tax", domain: "www.carehometax.co.uk" },
  pharmacies: { name: "Pharmacy Tax", domain: "www.pharmacytax.co.uk" },
  "startups-tech": { name: "Founder Tax Partners", domain: "www.foundertaxpartners.co.uk" },
  crypto: { name: "Crypto Tax Partners", domain: "www.cryptotaxpartners.co.uk" },
  "digital-agency": { name: "Agency Founder Finance", domain: "www.agencyfounderfinance.co.uk" },
  ecommerce: { name: "Ecommerce Finance", domain: "www.ecommercefinance.co.uk" },
  hospitality: { name: "Hospitality Tax", domain: "www.hospitalitytax.co.uk" },
};

/**
 * Domains actually verified for sending in the Resend account, checked 2026-09-15:
 * only propertytaxpartners.co.uk (and its inbound subdomain). dentalfinancepartners
 * .co.uk exists but is in "failed" state, and the other 15 sites have no sending
 * domain at all, which is why their nurture already goes out from the Property
 * domain today.
 *
 * Sending an introduction "from" an unverified domain would fail DMARC alignment
 * or bounce outright, and the enquirer would see a From address that has nothing
 * to do with either brand. So a site can only be introduced once its domain is
 * genuinely verified, and until then the run reports it and leaves it for a human.
 *
 * Add a domain here ONLY after confirming it is `verified` in Resend, not merely
 * added: `curl -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/domains`
 */
const VERIFIED_SENDING_DOMAINS = new Set<string>(["propertytaxpartners.co.uk"]);

export function sendingDomainVerified(domain: string): boolean {
  return VERIFIED_SENDING_DOMAINS.has(domain.replace(/^www\./, "").toLowerCase());
}

/**
 * `wills-probate` and `divorce-finances` are deliberately absent: their
 * niche.config.json still carries PLACEHOLDER display names. An unknown source
 * refuses to send rather than introducing someone to "PLACEHOLDER-DIVORCE-BRAND".
 */
export function resolveBrand(source: string | null): Brand | null {
  const key = (source || "").trim().toLowerCase();
  if (!key) return null;
  const brand = BRANDS[key];
  if (!brand) return null;
  if (/placeholder/i.test(brand.name) || /placeholder/i.test(brand.domain)) return null;
  return brand;
}

/* ------------------------------------------------------------------ *
 * Recipients
 * ------------------------------------------------------------------ */

export type Recipients = { to: string; cc: string[]; bcc: string[] };

/**
 * To the enquirer, CC the partner, BCC the operator.
 *
 * The enquirer is in To (not CC) because the email is addressed to them: it opens
 * "Hi <name>". An introduction written to the partner ABOUT someone reads very
 * differently to the person copied in on it.
 *
 * BCC for the operator is what keeps him off the visible recipient list. Known
 * and accepted trade-off: BCC drops off the thread, so he sees the introduction
 * and not the replies.
 *
 * THE GATE: unless mode is "live", every recipient collapses to the operator, and
 * anything else throws. This is deliberately belt-and-braces with `resolveMode()`:
 * a mis-set env var still cannot put a customer's address in a To field.
 */
export function resolveRecipients(
  mode: HandoffMode,
  leadEmail: string,
  partner: string,
  bcc: string,
): Recipients {
  if (mode === "live") {
    return {
      to: leadEmail,
      cc: partner ? [partner] : [],
      bcc: bcc ? [bcc] : [],
    };
  }

  const op = operatorEmail();
  if (!op) {
    throw new Error(
      "LEAD_HANDOFF_OPERATOR_EMAIL must be set before an unarmed send: it is the only " +
        "address allowed to receive mail while mode is not 'live'",
    );
  }
  const redirected: Recipients = { to: op, cc: [], bcc: [] };
  assertUnarmedSendIsSafe(redirected, op);
  return redirected;
}

/** Final assertion immediately before handing anything to the mail provider. */
export function assertUnarmedSendIsSafe(r: Recipients, op: string): void {
  const all = [r.to, ...r.cc, ...r.bcc].filter(Boolean).map((a) => a.trim().toLowerCase());
  const bad = all.filter((a) => a !== op.trim().toLowerCase());
  if (bad.length) {
    throw new Error(
      `refusing to send while unarmed: ${bad.length} recipient(s) are not the operator address`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * Copy
 * ------------------------------------------------------------------ */

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Titles people actually put in the name field. Measured across all 308 leads on
 * 2026-09-15: 19 of them start with one, which without this produced "Hi Mr," and
 * "are you able to get Mr booked in".
 */
const NAME_TITLES = new Set([
  "mr", "mrs", "ms", "miss", "mx", "dr", "prof", "professor", "sir", "dame",
  "rev", "reverend", "fr", "lord", "lady", "capt", "major", "sgt",
]);

/**
 * Capitalise one name part, preserving internal hyphens and apostrophes:
 * "anne-marie" -> "Anne-Marie", "o'brien" -> "O'Brien", "JOHN" -> "John".
 *
 * ALL CAPS matters: 9 leads arrive shouting, and "Hi JOHN," reads like a scam.
 */
function capitalisePart(part: string): string {
  return part
    .split(/([-'’])/)
    .map((seg) =>
      /^[-'’]$/.test(seg) ? seg : seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase(),
    )
    .join("");
}

/**
 * The name to greet someone by, or null to greet them without one.
 *
 * Returning null is a perfectly good outcome and is used often: 42 of 308 leads
 * have no name at all, and several more carry something that is not a name. A
 * wrong-looking greeting on an introduction to a partner firm is worse than a
 * plain "Hello,", so anything doubtful falls back rather than guessing.
 *
 * Rejects, all seen in live data: empty, whitespace, digits, phone numbers,
 * email addresses, symbols, and single initials ("J Smith" greets no one, because
 * "Hi J," is worse than "Hello,").
 */
export function firstNameOf(fullName: string | null): string | null {
  const cleaned = (fullName || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return null;
  if (cleaned.includes("@")) return null;

  let tokens = cleaned.split(" ");

  // Drop leading titles, including "Dr." with the full stop.
  while (tokens.length > 1 && NAME_TITLES.has(tokens[0].replace(/\.$/, "").toLowerCase())) {
    tokens = tokens.slice(1);
  }

  const first = tokens[0] ?? "";
  // A title with nothing after it ("Dr") is not a name: the loop above leaves it
  // alone because it only strips a title when something follows it.
  if (NAME_TITLES.has(first.replace(/\.$/, "").toLowerCase())) return null;
  // Letters only, plus the joiners real names use. No digits, no symbols.
  if (!/^[\p{L}]([\p{L}'’-]*[\p{L}])?$/u.test(first)) return null;
  // A single initial is not a greeting.
  if ([...first].length < 2) return null;

  return capitalisePart(first);
}

/**
 * Possessive form for the subject line: "Sarah's enquiry", "James' enquiry".
 */
export function possessive(name: string): string {
  return /s$/i.test(name) ? `${name}'` : `${name}'s`;
}

/**
 * The introduction, shaped as a reply to the enquiry the person actually sent.
 *
 * It quotes their enquiry back below the signature, the way a real reply does.
 * Two reasons, and the second is the whole point of this feature:
 *
 *  1. Omar opens one email and has the enquiry in front of him, rather than a
 *     bare introduction plus a separate lead notification to go and find.
 *  2. The enquirer sees their own words and their own disclosure wording. When
 *     someone asks "how did you get my information", the answer is already in
 *     the email they were sent, quoted from what they agreed to at submit.
 *
 * The disclosure is the exact `consent_text` stored on their lead row, so it is
 * what THAT person saw, not what we believe the current wording to be. Aswatax is
 * named underneath it. Naming the firm here is safe and deliberate: it is
 * post-submit, which is the established pattern for naming the partner, and the
 * pre-submit consent wording is not touched (it is live estate-wide, legally
 * settled, and was reverted once already for tanking conversion).
 *
 * TWO CLAIMS ABOUT A THIRD PARTY LIVE IN THIS EMAIL. Both are narrow on purpose,
 * and the distinction between them is the point:
 *
 *  - "Omar is a Chartered Tax Adviser" is about one named individual, and is
 *    documented in the Aswatax referral pack (legal/aswatax/).
 *  - "the firm is registered with the Chartered Institute of Taxation" is about
 *    Aswatax Ltd (12923632), asserted by the owner on 2026-09-15.
 *
 * What is deliberately NOT said is that the team hold the CTA qualification. An
 * earlier draft implied it; the owner confirmed that is not the claim. Do not let
 * these drift back together: different assertions, different evidence, and a
 * customer reads the result.
 *
 * No "specialist property tax advisers" either: this email goes out for every
 * site, so a dental or charity enquirer must not be told they are being passed to
 * property specialists.
 *
 * Plain by design: no card, no wordmark, no buttons, no colour. This is a person
 * introducing two people, and a marketing shell is what made the first draft read
 * as fake. No em-dashes (house style).
 */

/** Newline, named so the escaping survives being edited by tooling. */
const NL = String.fromCharCode(10);

/** Lead-supplied values are untrusted: escape before embedding in HTML. */
function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Submission date, UK format, matching how the tracker renders it. */
function ukDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

export function buildIntroEmail(
  lead: IntroLead,
  brand: Brand,
  context: IntroContext = EMPTY_INTRO_CONTEXT,
) {
  const first = firstNameOf(lead.full_name);
  const greeting = first ? `Hi ${first},` : "Hello,";
  const who = first ?? "them";
  const subject = first ? `${possessive(first)} enquiry` : "Your enquiry";
  const bareDomain = brand.domain.replace(/^www\./, "");

  const paragraphs = [
    `Thank you for submitting your enquiry with us. My name is Umair, from ${brand.name}.`,
    "For large and complex tax and advisory work such as yours, we partner with Omar and the team at Aswatax. Omar is a Chartered Tax Adviser and the firm is registered with the Chartered Institute of Taxation.",
    // "as soon as possible" contradicts a slot the enquirer already picked, and
    // they read this email too. So when there IS a booking, name it.
    //
    // Deliberately driven by the structured booking only. A time mentioned inside
    // a free-text reply is NOT parsed: "afternoons after 2 except Thursday" is not
    // something to be confidently wrong about in front of a customer and a partner
    // firm. Those replies are quoted verbatim below instead, where Omar reads them
    // and "as soon as possible" still reads as "promptly" rather than as a clash.
    context.bookedSlot
      ? `@Omar are you able to get ${who} booked in for ${context.bookedSlot}, as they requested.`
      : `@Omar are you able to get ${who} booked in as soon as possible to discuss their enquiry.`,
  ];

  // Their own contact details and their own words. Nothing else: see QUOTED_FIELDS.
  const quoted: [string, string][] = ([
    ["Name", (lead.full_name || "").trim()],
    ["Email", (lead.email || "").trim()],
    ["Phone", (lead.phone || "").trim()],
    ["Type", (lead.role || "").trim()],
    // The call window they chose, so the person ringing knows when to ring.
    ["Preferred call time", (context.bookedSlot || "").trim()],
    ["Message", (lead.message || "").trim()],
    // Anything they said afterwards, which is where a time given in free text
    // lives: the follow-ups invite exactly that, and it was previously visible
    // to nobody making the call.
    ...context.replies.map(
      (r, i) =>
        [
          context.replies.length > 1 ? `Their reply ${i + 1} (${r.channel})` : `Their reply (${r.channel})`,
          r.body,
        ] as [string, string],
    ),
  ] as [string, string][]).filter(([, v]) => v);

  const submitted = ukDate(lead.created_at);
  const quoteHeading = submitted
    ? `Enquiry submitted on ${submitted} via ${bareDomain}`
    : `Enquiry submitted via ${bareDomain}`;

  // Post-submit, so the firm can be named: for this lead it really is Aswatax.
  // Deliberately NOT the pre-submit notice, which stays vague because a lead may
  // instead go to Sidekick for compliance work or to the buyer pool, and a notice
  // promising one named firm would be wrong for those. See the module comment.
  const disclosureLines = [
    "To answer your enquiry, your details have been shared with our partner firm Aswatax, a firm of Chartered Tax Advisers registered with the Chartered Institute of Taxation.",
  ];

  const P = 'style="margin:0 0 15px 0;"';
  const MUTE = "color:#6b6b6b;";
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"></head>
<body style="margin:0;padding:18px;background-color:#ffffff;">
<div style="max-width:600px;margin:0 auto;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#1a1a1a;">
<p ${P}>${esc(greeting)}</p>
${paragraphs.map((t) => `<p ${P}>${esc(t)}</p>`).join(NL)}
<p ${P}>Kind regards,</p>
<p style="margin:0;">Umair</p>
<p style="margin:0;${MUTE}">${esc(brand.name)}</p>
<p style="margin:0 0 24px 0;"><a href="https://${esc(brand.domain)}" style="${MUTE}text-decoration:none;">${esc(bareDomain)}</a></p>
<div style="border-left:2px solid #d9d9d9;padding:2px 0 2px 14px;font-size:14px;line-height:1.5;${MUTE}">
<p style="margin:0 0 12px 0;">${esc(quoteHeading)}</p>
${quoted
  .map(
    ([k, v]) =>
      `<p style="margin:0 0 8px 0;"><strong style="font-weight:600;">${esc(k)}:</strong> ${esc(v).replace(new RegExp(NL, "g"), "<br>")}</p>`,
  )
  .join(NL)}
<p style="margin:14px 0 0 0;font-size:13px;">${disclosureLines.map(esc).join("<br>")}</p>
</div>
</div>
</body></html>`;

  const text = [
    greeting,
    "",
    ...paragraphs.flatMap((t) => [t, ""]),
    "Kind regards,",
    "Umair",
    brand.name,
    bareDomain,
    "",
    "----",
    quoteHeading,
    "",
    ...quoted.map(([k, v]) => `${k}: ${v}`),
    "",
    ...disclosureLines,
  ].join(NL);

  return { subject, html, text };
}

/**
 * Last line of defence, run on the rendered email immediately before it is sent.
 *
 * cleanReplyBody() removes quoted threads, signatures and URLs from replies, but
 * it is a set of rules written against the reply shapes present on 2026-09-15.
 * Someone will eventually reply in a shape nobody anticipated, and this email is
 * read by a customer and copied to a third party, so "the cleaner probably caught
 * it" is not good enough.
 *
 * This checks the finished text rather than its inputs, and FAILS CLOSED: a hit
 * means the introduction is not sent and the run reports it, so a human deals with
 * that one lead by hand. Nothing leaks quietly.
 *
 * Returns the reason to refuse, or null to proceed.
 */
export function leakedContentReason(
  text: string,
  html: string,
  lead: IntroLead,
  brand: Brand,
): string | null {
  const checks: [string, RegExp][] = [
    // Analytics and internal identifiers: this email carries none, ever.
    ["a tracking parameter", /[?&]utm_|utm_source|utm_medium|utm_campaign|gclid=|fbclid=/i],
    ["an internal identifier", /visitor_id|session_id|lead_id/i],
    // A reply that still carries the thread an email client appended.
    ["a quoted email thread", /^\s*On .{0,80}wrote:/mi],
    ["a quoted email header", /^\s*(From|Sent|To|Subject):\s/mi],
    ["an email client signature", /sent from my (iphone|ipad|android|mobile|samsung)/i],
  ];
  for (const [label, re] of checks) {
    if (re.test(text) || re.test(html)) return `refused to send: the email contains ${label}`;
  }

  // The lead's own id must never be visible to them or to the partner firm.
  if (lead.id && (text.includes(lead.id) || html.includes(lead.id))) {
    return "refused to send: the email contains the internal lead id";
  }

  // Anyone who is not the customer-facing voice must not appear. Historic replies
  // open "Hi Junayd", and this email is signed by Umair.
  for (const name of ["Junayd"]) {
    // NB the doubled backslashes: in a template literal "\b" is a backspace
    // character, which would silently disable this check.
    if (new RegExp(`\\b${name}\\b`, "i").test(text)) {
      return `refused to send: the email names ${name}, who is not the sender`;
    }
  }

  // Any link other than the sending brand's own domain in the signature.
  const links = text.match(/https?:\/\/\S+/gi) ?? [];
  const allowed = brand.domain.replace(/^www\./, "").toLowerCase();
  for (const link of links) {
    if (!link.toLowerCase().includes(allowed)) {
      return "refused to send: the email contains a link we did not put there";
    }
  }

  return null;
}

/* ------------------------------------------------------------------ *
 * Claim, send, settle
 * ------------------------------------------------------------------ */

/**
 * Take the database claim BEFORE sending.
 *
 * A crash between claim and send leaves an orphan claim, which costs one missed
 * introduction that a human can spot in the report. Claiming afterwards would risk
 * sending the same person a second copy, which is the failure this whole module is
 * built to prevent. 409 means a constraint refused it: either this lead already has
 * an introduction, or this person does under a different lead.
 */
export async function claimIntro(
  lead: IntroLead,
  mode: HandoffMode,
): Promise<{ claimed: boolean; reason?: string }> {
  if (!lead.email) return { claimed: false, reason: "no email address" };
  const res = await adminInsert<{ lead_id: string }>("lead_handoff_intros", [
    {
      lead_id: lead.id,
      email_norm: normaliseEmail(lead.email),
      partner_ref: "aswatax",
      mode,
      claimed_at: new Date().toISOString(),
    },
  ]);
  if (res.ok && res.data.length > 0) return { claimed: true };
  if (res.status === 409) {
    return { claimed: false, reason: "already introduced (this lead or this person)" };
  }
  return { claimed: false, reason: `claim failed (${res.status}): ${res.error ?? "unknown"}` };
}

/**
 * Read-only: is this lead, or this person, already claimed?
 *
 * Used by report mode, which must never take a claim but must still tell the
 * truth. Without it a dry run says "would introduce" for leads the watermark has
 * already blocked, which is exactly backwards for a report whose whole job is to
 * let someone decide whether arming is safe.
 */
export async function alreadyClaimed(lead: IntroLead): Promise<boolean> {
  const byId = await adminSelect<{ lead_id: string }>("lead_handoff_intros", {
    select: "lead_id",
    lead_id: `eq.${lead.id}`,
    limit: "1",
  });
  if (byId.ok && byId.data.length > 0) return true;
  if (!lead.email) return false;
  const byPerson = await adminSelect<{ lead_id: string }>("lead_handoff_intros", {
    select: "lead_id",
    email_norm: `eq.${normaliseEmail(lead.email)}`,
    limit: "1",
  });
  return byPerson.ok && byPerson.data.length > 0;
}

/** Release a claim so a transient send failure retries next pass. */
export async function releaseClaim(leadId: string): Promise<void> {
  await adminDelete("lead_handoff_intros", { lead_id: `eq.${leadId}` }).catch(() => {});
}

/**
 * Stamp the claim with when it went and which message it was.
 *
 * An UPDATE, not an upsert: the claim row already exists (we took it before
 * sending), and an upsert payload without the NOT NULL columns is rejected, which
 * is how the first version of this silently recorded nothing. The claim itself is
 * what blocks a resend, so a failure here costs only the audit trail, but it is
 * logged rather than swallowed because a missing sent_at is how you lose the
 * ability to answer "when were they introduced".
 */
export async function markIntroSent(
  leadId: string,
  providerId: string | null,
  mode: HandoffMode,
): Promise<void> {
  const res = await adminUpdate(
    "lead_handoff_intros",
    { lead_id: `eq.${leadId}` },
    { sent_at: new Date().toISOString(), provider_id: providerId, mode },
  );
  if (!res.ok || res.data.length === 0) {
    console.error("[handoff-intro] could not stamp sent_at", leadId, res.status, res.error);
  }
}

/**
 * Reasons an otherwise-eligible lead must not be introduced. Each returns a string
 * so the caller can report it; none of them are guessed around.
 */
export async function introBlockedReason(lead: IntroLead): Promise<string | null> {
  if (!lead.email) return "lead has no email address";
  const brand = resolveBrand(lead.source);
  if (!brand) return `no brand configured for source "${lead.source ?? ""}"`;
  if (!sendingDomainVerified(brand.domain)) {
    return `${brand.domain} is not a verified sending domain, so ${brand.name} cannot send this yet`;
  }
  if (lead.source === "test" && resolveMode() === "live") return "test lead, refusing live send";

  // An enquirer who objected must never be introduced, whatever the tracker says.
  // isSuppressed() is the same check the raw-supply path runs before sharing, and
  // it fails CLOSED: an unreadable events table suppresses rather than shares.
  if (await isSuppressed(lead.id)) return "lead is suppressed (opted out or objected)";

  return null;
}

/**
 * Build and send one introduction. Assumes the caller has already claimed.
 */
export async function sendIntro(lead: IntroLead, mode: HandoffMode): Promise<IntroOutcome> {
  const brand = resolveBrand(lead.source);
  if (!brand) return { ok: false, reason: `no brand for source "${lead.source ?? ""}"` };
  if (!lead.email) return { ok: false, reason: "no email address" };
  if (!sendingDomainVerified(brand.domain)) {
    return { ok: false, reason: `${brand.domain} is not a verified sending domain` };
  }

  const partner = partnerEmail();
  if (mode === "live" && !partner) {
    return { ok: false, reason: "LEAD_HANDOFF_PARTNER_EMAIL is not set" };
  }

  const recipients = resolveRecipients(mode, lead.email, partner, partnerBcc());
  if (mode !== "live") assertUnarmedSendIsSafe(recipients, operatorEmail());

  // Best-effort: a failed read still sends the introduction, just without the
  // booking and replies. Losing the extras is better than losing the handoff.
  const context = await gatherIntroContext(lead.id);
  let { subject, html, text } = buildIntroEmail(lead, brand, context);

  // DEGRADE BEFORE REFUSING. The quoted replies are the only part built from text
  // we did not write, so they are the likely source of anything the cleaner missed.
  // Dropping them costs a scheduling note; refusing costs the whole introduction,
  // and a lead nobody is looking at is worse than a lead introduced without its
  // reply quoted.
  let degraded = false;
  if (leakedContentReason(text, html, lead, brand) && context.replies.length > 0) {
    ({ subject, html, text } = buildIntroEmail(lead, brand, {
      bookedSlot: context.bookedSlot,
      replies: [],
    }));
    degraded = true;
  }
  const fromAddress = process.env.LEAD_HANDOFF_FROM || `leads@${brand.domain.replace(/^www\./, "")}`;
  const replyTo = process.env.LEAD_HANDOFF_REPLY_TO || fromAddress;

  // Only now fail closed, on an email that is already stripped back to parts we
  // assembled ourselves plus the enquirer's own words. Reaching here means
  // something is wrong that dropping the replies did not fix, so it needs a human.
  const leak = leakedContentReason(text, html, lead, brand);
  if (leak) return { ok: false, reason: leak, needsHuman: true };

  const subjectPrefixed = mode === "live" ? subject : `[${mode.toUpperCase()}] ${subject}`;

  try {
    const { data, error } = await getResend().emails.send({
      from: `Umair at ${brand.name} <${fromAddress}>`,
      to: recipients.to,
      ...(recipients.cc.length ? { cc: recipients.cc } : {}),
      ...(recipients.bcc.length ? { bcc: recipients.bcc } : {}),
      replyTo,
      subject: subjectPrefixed,
      html,
      text,
    });
    if (error) return { ok: false, reason: `resend: ${error.message ?? String(error)}` };
    return { ok: true, mode, providerId: data?.id ?? null, degraded };
  } catch (err) {
    return { ok: false, reason: `send threw: ${(err as Error).message}` };
  }
}
