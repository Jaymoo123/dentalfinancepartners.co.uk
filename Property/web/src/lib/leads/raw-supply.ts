/**
 * Raw Bulk Supply lane (DSA clause 3.6): leads still unverified 24h after
 * arrival, sold whole as a batch to ONE recipient, no acceptance step, no
 * credits. Owner decision 2026-08-19: 24h window (diverges from the published
 * 7-day wording; recorded owner-accepted risk).
 *
 * Safety order per lead at SEND time, not at listing time (the owner's tap can
 * come hours after the morning prompt, and a lead can verify, be claimed or
 * object in between):
 *   1. suppression re-check (fail-closed; DSA 3.5 covers Bulk Supply);
 *   2. conditional status flip new/nurturing -> forwarded (the latch: a lead
 *      that verified meanwhile is no longer new/nurturing, so it drops out,
 *      killing the double-sell; the same flip makes the promote latch inert);
 *   3. lead_supply insert (unique lead_id = supplied once, ever);
 *   4. only successful flips enter the ONE batch email.
 */
import { getResend, getFromAddress } from "@/lib/resend";
import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { isSuppressed } from "@/lib/leads/suppression";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { buildLeadHtml, buildLeadText, type LeadRecord } from "@/lib/leads/notify-email";
import { consentAllowsSharing } from "@/lib/leads/offer-send";
import { offerFromAddress } from "@/lib/leads/offer-release";
import { resolveLeadTo } from "@/lib/lead-routing";
import type { LeadBuyer } from "@/lib/leads/offer-config";

const RAW_WINDOW_HOURS = 24;

export function rawSources(): string[] {
  return (process.env.LEAD_RAW_SOURCES || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function rawPriceGbp(): number {
  // Number("") is 0, so an unset env var must be caught BEFORE the parse or
  // every raw lead silently prices at £0 instead of the £5 default.
  const raw = (process.env.LEAD_RAW_PRICE_GBP || "").trim();
  if (!raw) return 5;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : 5;
}

export type RawLeadListing = { id: string; source: string; created_at: string };

export type RawEligibility = {
  /** Eligible and not being nurtured: the default batch. */
  noNurture: RawLeadListing[];
  /** Eligible by age but mid-nurture: supplied only on explicit owner opt-in. */
  nurturing: RawLeadListing[];
};

/**
 * List leads eligible for the raw batch, split by active-nurture state so the
 * owner sees what a batch would liquidate before tapping.
 */
export async function eligibleRawLeads(): Promise<RawEligibility> {
  const empty: RawEligibility = { noNurture: [], nurturing: [] };
  const sources = rawSources();
  if (sources.length === 0) return empty;

  const cutoff = new Date(Date.now() - RAW_WINDOW_HOURS * 3600_000).toISOString();
  const res = await adminSelect<{
    id: string;
    source: string;
    created_at: string;
    consent_text: string | null;
  }>("leads", {
    select: "id,source,created_at,consent_text",
    status: "in.(new,nurturing)",
    is_test: "eq.false",
    created_at: `lt.${cutoff}`,
    source: `in.(${sources.join(",")})`,
    order: "created_at.asc",
    limit: "200",
  });
  if (!res.ok || res.data.length === 0) return empty;

  // The stored consent decides disclosability (leads collected under in-house
  // wording never enter a batch).
  let candidates = res.data.filter((l) => consentAllowsSharing(l.consent_text));
  if (candidates.length === 0) return empty;

  const ids = candidates.map((l) => l.id);
  const inList = `in.(${ids.join(",")})`;

  const [supplied, offered, nurture] = await Promise.all([
    adminSelect<{ lead_id: string }>("lead_supply", { select: "lead_id", lead_id: inList }),
    adminSelect<{ lead_id: string }>("lead_offers", { select: "lead_id", lead_id: inList }),
    adminSelect<{ lead_id: string }>("lead_nurture_state", {
      select: "lead_id",
      lead_id: inList,
      status: "eq.active",
    }),
  ]);
  // Fail closed on the exclusion reads: a lead we cannot prove unsold is not listed.
  if (!supplied.ok || !offered.ok || !nurture.ok) return empty;
  const excluded = new Set([
    ...supplied.data.map((r) => r.lead_id),
    ...offered.data.map((r) => r.lead_id),
  ]);
  const nurturingIds = new Set(nurture.data.map((r) => r.lead_id));
  candidates = candidates.filter((l) => !excluded.has(l.id));

  const out: RawEligibility = { noNurture: [], nurturing: [] };
  for (const lead of candidates) {
    // Objectors never appear even in the listing (fail-closed).
    if (await isSuppressed(lead.id)) continue;
    const listing: RawLeadListing = {
      id: lead.id,
      source: lead.source,
      created_at: lead.created_at,
    };
    (nurturingIds.has(lead.id) ? out.nurturing : out.noNurture).push(listing);
  }
  return out;
}

export type SupplyResult = {
  supplied: number;
  skipped: number;
  emailSent: boolean;
  buyerFirm?: string;
  reason?: string;
};

async function loadRawBuyer(): Promise<LeadBuyer | null> {
  const ref = (process.env.LEAD_RAW_BUYER_REF || "").trim();
  if (!ref) return null;
  const res = await adminSelect<LeadBuyer>("lead_buyers", {
    select: "id,ref,firm_name,contact_name,email,status,sources,min_tier,dsa_signed_at",
    ref: `eq.${ref}`,
    status: "eq.active",
    dsa_signed_at: "not.is.null",
    limit: "1",
  });
  return res.ok ? (res.data[0] ?? null) : null;
}

/**
 * Supply the given leads to the configured raw buyer as one batch email.
 * Re-qualifies every lead at send time; only leads whose status flip AND
 * supply insert both succeed are included.
 */
export async function supplyRawLeads(leadIds: string[]): Promise<SupplyResult> {
  const buyer = await loadRawBuyer();
  if (!buyer) {
    return { supplied: 0, skipped: leadIds.length, emailSent: false, reason: "no-raw-buyer" };
  }
  const price = rawPriceGbp();
  const nowIso = new Date().toISOString();
  const won: string[] = [];

  for (const leadId of leadIds) {
    if (await isSuppressed(leadId)) continue;
    const flip = await adminUpdate<{ id: string }>(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "forwarded" },
    );
    if (!flip.ok || flip.data.length === 0) continue;
    const ins = await adminInsert<{ id: string }>(
      "lead_supply",
      [{ lead_id: leadId, buyer_id: buyer.id, price_gbp: price, supplied_at: nowIso }],
      { onConflict: "lead_id", ignoreDuplicates: true },
    );
    if (!ins.ok || ins.data.length === 0) {
      console.error("[raw-supply] supply insert conflict after status flip", leadId);
      continue;
    }
    won.push(leadId);
  }

  if (won.length === 0) {
    return { supplied: 0, skipped: leadIds.length, emailSent: false, buyerFirm: buyer.firm_name };
  }

  // The buyer owns these relationships now: stop every nurture sequence, and
  // record the handoff (mirrors the claim route's halt semantics; NOT
  // stopNurture, which records an opt-out the enquirer never made).
  const wonList = `in.(${won.join(",")})`;
  await adminUpdate(
    "lead_nurture_state",
    { lead_id: wonList },
    { status: "stopped", next_action_at: null, updated_at: nowIso },
  ).catch(() => {});
  for (const leadId of won) {
    await recordLeadContactEvent(leadId, "handed_off", "system", {
      reason: "raw_supply",
      buyer_id: buyer.id,
    }).catch(() => {});
  }

  const leadsRes = await adminSelect<LeadRecord>("leads", {
    select:
      "id,created_at,submitted_at,full_name,email,phone,role,practice_name,message,source,source_url,status,consent_given,consent_text,extras",
    id: wonList,
    order: "created_at.asc",
  });
  const rows = leadsRes.ok ? leadsRes.data : [];

  const subject = `Raw lead batch: ${won.length} lead${won.length === 1 ? "" : "s"} (£${price} each, sold as seen)`;
  const intro =
    `As agreed, this batch contains ${won.length} unverified enquir${won.length === 1 ? "y" : "ies"} ` +
    `supplied as a whole at £${price} per lead, invoiced monthly. Raw leads are sold as seen; the credit policy does not apply.`;
  const html = `<p style="font-family:sans-serif;font-size:14px;line-height:1.6;">${intro}</p><hr>` +
    rows.map((r) => buildLeadHtml(r, { omitSourcePage: true })).join("<hr>");
  const text = [intro, "", ...rows.map((r) => buildLeadText(r, { omitSourcePage: true }))].join(
    "\n\n----------------\n\n",
  );

  let emailSent = false;
  try {
    const { error } = await getResend().emails.send({
      from: offerFromAddress(),
      to: buyer.email,
      subject,
      html,
      text,
    });
    if (error) console.error("[raw-supply] batch send error", error);
    else emailSent = true;
  } catch (err) {
    console.error("[raw-supply] batch send threw", err);
  }

  if (!emailSent) {
    // Supply rows are latched; the batch just needs manual delivery. Tell the
    // owner via the always-available email channel.
    try {
      await getResend().emails.send({
        from: getFromAddress(),
        to: resolveLeadTo(undefined),
        subject: `RAW BATCH EMAIL FAILED: ${won.length} leads latched for ${buyer.firm_name}`,
        text:
          `The raw batch email to ${buyer.firm_name} failed to send. The ${won.length} leads are ` +
          `recorded in lead_supply and will not be re-batched; forward them manually.\nLead ids:\n` +
          won.join("\n"),
      });
    } catch (err) {
      console.error("[raw-supply] owner failure alert threw", err);
    }
  }

  return {
    supplied: won.length,
    skipped: leadIds.length - won.length,
    emailSent,
    buyerFirm: buyer.firm_name,
  };
}
