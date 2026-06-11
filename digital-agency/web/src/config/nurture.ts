/**
 * Agency Founder Finance nurture engine composition (GAP-5 adoption pattern,
 * mirroring generalist/web/src/config/nurture.ts).
 *
 * This file is the ONLY place where agency nurture identity values appear.
 * The shared engine itself contains no site literals (PF-07). The site key
 * is read from niche.config.json, never hardcoded.
 *
 * ARMING POSTURE — decided at deploy, NOT in code (manager/operator call):
 * the engine reads CRON_SECRET at runtime (EN-04). With CRON_SECRET unset:
 *   - Opt-ins are recorded in the subscribers table.
 *   - Zero emails leave. /api/nurture/send returns 401 on every cron tick.
 * The agency Vercel project historically carried the OLD fork's armed env
 * (CRON_SECRET set). Whether that carries over (stays armed) or is withheld
 * (goes dormant) is an operator decision at deploy time. This composition is
 * posture-neutral.
 *
 * EN-06: from-identity, replyTo come from NURTURE_* env vars; the engine
 * refuses to operate if they are absent (requireEnv throws). No fallbacks.
 * NOTE: the old fork read RESEND_FROM_EMAIL/NAME and RESEND_REPLY_TO. Those
 * env names remain in use by the health-check delivery emails (lib/resend.ts);
 * the nurture engine deliberately reads its own NURTURE_* names — see
 * .env.local.example for the old→new mapping.
 *
 * Sequence content: the agency welcome series, ported verbatim from the old
 * emails/content/welcome-series.ts and expressed as NurtureStep[].
 *
 * Cadence note: the old fork stored CUMULATIVE delays from confirmation
 * (0h, 48h, 120h, 216h, 336h = days 0, 2, 5, 9, 14). The shared engine's
 * NurtureStep.delayDays is days after the PREVIOUS step, so the equivalent
 * deltas are 0, 2, 3, 4, 5 — preserving the original day-0/2/5/9/14 schedule.
 */

import type { NurtureConfig, NurtureStep } from "@accounting-network/web-shared/nurture/config";
import { requireEnv } from "@accounting-network/web-shared/nurture/config";
import { niche } from "./niche-loader";
import { getSiteUrl } from "./niche-loader";
import { AGENCY_NEWSLETTER_CONSENT_TEXT } from "./nurture-consent";

const BASE = getSiteUrl().replace(/\/$/, "");

// ── Shared body helpers (generalist pattern: inline-styled paragraphs) ───────

function para(text: string): string {
  return `<p style="margin:0 0 14px;">${text}</p>`;
}

function footer(unsubUrl: string, sign: string): string {
  return [
    `<p style="margin:0;font-size:13px;color:#64748b;">${sign}</p>`,
    `<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${unsubUrl}" style="color:#64748b;">Unsubscribe</a></p>`,
  ].join("\n");
}

function cta(label: string, url: string): string {
  return `<p style="margin:0 0 14px;"><a href="${url.replace(/&/g, "&amp;")}">${label}</a></p>`;
}

function utm(path: string, content: string): string {
  return `${BASE}${path}?utm_source=nurture&utm_medium=email&utm_campaign=agency_welcome&utm_content=${content}`;
}

// ── Sequence content (ported from emails/content/welcome-series.ts) ──────────

function buildWelcomeBody(unsubUrl: string) {
  const ctaUrl = utm("/calculators/salary-dividend-optimiser", "welcome");
  const html = [
    para("Welcome to the Tax Brief."),
    para(
      "You'll get one email a week, on a Thursday morning. Plain text, one tax or finance idea worth your time, no banner ads, no upsell.",
    ),
    para("Two things to do right now."),
    para(
      "First, bookmark the 2025/26 UK tax rates page. It's the canonical reference we use internally for corporation tax, dividend tax, BADR, VAT, MTD ITSA dates, R&D rates, everything. Updated when HMRC changes anything.",
    ),
    para(
      "Second, run the salary–dividend optimiser with your numbers. Most founders pay themselves the wrong way (too much salary or too much dividend) and the difference is usually £2,000 to £6,000 a year.",
    ),
    para("Next email Friday-ish: the one R&D mistake almost every digital agency makes."),
    cta("Open the salary–dividend optimiser", ctaUrl),
    footer(unsubUrl, "James, Agency Founder Finance"),
  ].join("\n");
  return {
    html,
    text: [
      "Welcome to the Tax Brief.",
      "",
      "You'll get one email a week, on a Thursday morning. Plain text, one tax or finance idea worth your time, no banner ads, no upsell.",
      "",
      "Two things to do right now.",
      "",
      "First, bookmark the 2025/26 UK tax rates page. It's the canonical reference we use internally for corporation tax, dividend tax, BADR, VAT, MTD ITSA dates, R&D rates, everything. Updated when HMRC changes anything.",
      "",
      "Second, run the salary–dividend optimiser with your numbers. Most founders pay themselves the wrong way (too much salary or too much dividend) and the difference is usually £2,000 to £6,000 a year.",
      "",
      "Next email Friday-ish: the one R&D mistake almost every digital agency makes.",
      "",
      `Open the salary–dividend optimiser: ${ctaUrl}`,
      "",
      "James, Agency Founder Finance",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildRdBody(unsubUrl: string) {
  const ctaUrl = utm("/r-and-d-credits", "rd_credits");
  const html = [
    para("Quick one on R&D."),
    para(
      "Agencies that build software-adjacent things, like AI tooling, custom integrations, scraping or automations, often assume the build itself is the R&D. It isn't.",
    ),
    para(
      "HMRC pays for the resolution of <em>scientific or technological uncertainty</em>, the bits where a competent professional in the field couldn't have predicted the outcome. The bespoke build for a client usually isn't that. The new method you had to invent to make it work might be.",
    ),
    para(
      "The merged R&D scheme (accounting periods on/after 1 April 2024) tightened this further. Subcontractor R&D shifts to the customer's claim in many cases, the headline rate dropped, and ERIS only applies to loss-making R&D-intensive SMEs (30%+ of total expenditure on R&D).",
    ),
    para(
      "If you've claimed before and the numbers feel rough, it's worth a 20-minute conversation. If you've never claimed, the eligibility checklist is below.",
    ),
    cta("R&D eligibility checklist", ctaUrl),
    footer(unsubUrl, "James"),
  ].join("\n");
  return {
    html,
    text: [
      "Quick one on R&D.",
      "",
      "Agencies that build software-adjacent things, like AI tooling, custom integrations, scraping or automations, often assume the build itself is the R&D. It isn't.",
      "",
      "HMRC pays for the resolution of scientific or technological uncertainty, the bits where a competent professional in the field couldn't have predicted the outcome. The bespoke build for a client usually isn't that. The new method you had to invent to make it work might be.",
      "",
      "The merged R&D scheme (accounting periods on/after 1 April 2024) tightened this further. Subcontractor R&D shifts to the customer's claim in many cases, the headline rate dropped, and ERIS only applies to loss-making R&D-intensive SMEs (30%+ of total expenditure on R&D).",
      "",
      "If you've claimed before and the numbers feel rough, it's worth a 20-minute conversation. If you've never claimed, the eligibility checklist is below.",
      "",
      `R&D eligibility checklist: ${ctaUrl}`,
      "",
      "James",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildPillarBody(unsubUrl: string) {
  const ctaUrl = utm("/fundamentals", "pillars");
  const html = [
    para("If you only read one thing on the site this week."),
    para(
      "We have nine pillar guides. Each is the long version of a question agency founders ask all the time. In rough order of who needs them:",
    ),
    `<ul style="margin:0 0 14px;padding-left:20px;color:#334155;font-size:15px;line-height:1.65;">`,
    `<li>If you're just starting: Agency Finance Fundamentals, then Incorporating Your Agency.</li>`,
    `<li>If you're paying yourself and not sure if it's right: Paying Yourself as an Agency Founder.</li>`,
    `<li>If you're hiring contractors or being one: IR35 for Agencies.</li>`,
    `<li>If MTD ITSA is on your radar: Making Tax Digital for Agency Founders.</li>`,
    `<li>If you're thinking about international clients, a UAE move, or a digital nomad year: International Agency Operations.</li>`,
    `<li>If exit is anywhere on the horizon: Selling Your Agency.</li>`,
    `<li>If you're shopping for an accountant: Choosing an Agency Accountant.</li>`,
    `<li>If you need the full picture: Agency Tax &amp; Compliance, the complete guide.</li>`,
    `</ul>`,
    cta("Browse pillar guides", ctaUrl),
    footer(unsubUrl, "James"),
  ].join("\n");
  return {
    html,
    text: [
      "If you only read one thing on the site this week.",
      "",
      "We have nine pillar guides. Each is the long version of a question agency founders ask all the time. In rough order of who needs them:",
      "- If you're just starting: Agency Finance Fundamentals, then Incorporating Your Agency.",
      "- If you're paying yourself and not sure if it's right: Paying Yourself as an Agency Founder.",
      "- If you're hiring contractors or being one: IR35 for Agencies.",
      "- If MTD ITSA is on your radar: Making Tax Digital for Agency Founders.",
      "- If you're thinking about international clients, a UAE move, or a digital nomad year: International Agency Operations.",
      "- If exit is anywhere on the horizon: Selling Your Agency.",
      "- If you're shopping for an accountant: Choosing an Agency Accountant.",
      "- If you need the full picture: Agency Tax & Compliance, the complete guide.",
      "",
      `Browse pillar guides: ${ctaUrl}`,
      "",
      "James",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildDubaiBody(unsubUrl: string) {
  const ctaUrl = utm("/dubai-relocation", "dubai");
  const html = [
    para("On Dubai."),
    para(
      "Every quarter we get a wave of agency founders asking about a UAE move. The LinkedIn version is: 0% personal income tax, golden visa, palm trees. The real version is more nuanced.",
    ),
    para(
      "You need to actually break UK tax residence (Statutory Residence Test, 16/46/91-day limits depending on your ties). You need to set up a UAE entity that holds up if HMRC ever asks. You need to manage UK client contracts so they don't drag you into UK source income. Most importantly, you need to plan it as a multi-year programme, not a quarter.",
    ),
    para(
      "Our Dubai relocation page is the most detailed UK→UAE resource we know of for agency founders specifically. If a move is on your one-to-three year horizon, this is where to start.",
    ),
    para(
      "If a move isn't on your radar but you're curious about the other low-tax routes (Portugal NHR 2.0, Cyprus non-dom, Spain Beckham Law, Singapore, Malta, Italy impatriate, Estonia, Greece, Switzerland), there's a page for each.",
    ),
    cta("Dubai relocation for UK agency founders", ctaUrl),
    footer(unsubUrl, "James"),
  ].join("\n");
  return {
    html,
    text: [
      "On Dubai.",
      "",
      "Every quarter we get a wave of agency founders asking about a UAE move. The LinkedIn version is: 0% personal income tax, golden visa, palm trees. The real version is more nuanced.",
      "",
      "You need to actually break UK tax residence (Statutory Residence Test, 16/46/91-day limits depending on your ties). You need to set up a UAE entity that holds up if HMRC ever asks. You need to manage UK client contracts so they don't drag you into UK source income. Most importantly, you need to plan it as a multi-year programme, not a quarter.",
      "",
      "Our Dubai relocation page is the most detailed UK-to-UAE resource we know of for agency founders specifically. If a move is on your one-to-three year horizon, this is where to start.",
      "",
      "If a move isn't on your radar but you're curious about the other low-tax routes (Portugal NHR 2.0, Cyprus non-dom, Spain Beckham Law, Singapore, Malta, Italy impatriate, Estonia, Greece, Switzerland), there's a page for each.",
      "",
      `Dubai relocation for UK agency founders: ${ctaUrl}`,
      "",
      "James",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildHealthCheckBody(unsubUrl: string) {
  const ctaUrl = utm("/free-health-check", "health_check");
  const html = [
    para("One last thing."),
    para(
      "If anything in the last two weeks has made you wonder whether you've got the structure right, the salary/dividend split right, the R&D claim right, or the exit clock running, you can book a free agency finance health check.",
    ),
    para(
      "It's 60 minutes, on a call, with a qualified accountant on the team. You get a written summary by email afterwards with anything specific we'd recommend. No sales pitch. About half the founders we speak to we tell to stay with their current accountant and just change one thing.",
    ),
    para(
      "The emails will now drop to one a week (Thursday morning), the regular Tax Brief. You can unsubscribe any time using the link at the bottom of every email.",
    ),
    cta("Claim a free health check", ctaUrl),
    footer(unsubUrl, "James"),
  ].join("\n");
  return {
    html,
    text: [
      "One last thing.",
      "",
      "If anything in the last two weeks has made you wonder whether you've got the structure right, the salary/dividend split right, the R&D claim right, or the exit clock running, you can book a free agency finance health check.",
      "",
      "It's 60 minutes, on a call, with a qualified accountant on the team. You get a written summary by email afterwards with anything specific we'd recommend. No sales pitch. About half the founders we speak to we tell to stay with their current accountant and just change one thing.",
      "",
      "The emails will now drop to one a week (Thursday morning), the regular Tax Brief. You can unsubscribe any time using the link at the bottom of every email.",
      "",
      `Claim a free health check: ${ctaUrl}`,
      "",
      "James",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

const AGENCY_STEPS: NurtureStep[] = [
  {
    key: "welcome",
    delayDays: 0,
    subject: "You're in. What to expect from the Tax Brief.",
    buildBody: buildWelcomeBody,
  },
  {
    key: "rd_credits",
    delayDays: 2, // day 2 from confirm (old fork: 48h)
    subject: "The R&D claim mistake almost every digital agency makes",
    buildBody: buildRdBody,
  },
  {
    key: "pillar_guides",
    delayDays: 3, // day 5 from confirm (old fork: 120h)
    subject: "Pillar guides: pick whichever is most relevant",
    buildBody: buildPillarBody,
  },
  {
    key: "dubai_relocation",
    delayDays: 4, // day 9 from confirm (old fork: 216h)
    subject: "If a Dubai move is on your mind",
    buildBody: buildDubaiBody,
  },
  {
    key: "free_health_check",
    delayDays: 5, // day 14 from confirm (old fork: 336h)
    subject: "Free agency finance health check, your slot",
    buildBody: buildHealthCheckBody,
  },
];

/**
 * Build the agency NurtureConfig.
 *
 * EN-06: requireEnv throws if NURTURE_FROM_EMAIL, NURTURE_FROM_NAME, or
 * NURTURE_REPLY_TO are unset. The engine will not fall back to any default
 * (the old fork fell back to hello@agencyfounderfinance.co.uk — removed).
 *
 * Called at route-handler time, not module initialisation, so env var reads
 * happen inside the request lifecycle.
 */
export function buildAgencyNurtureConfig(): NurtureConfig {
  const fromName = requireEnv("NURTURE_FROM_NAME");
  const fromEmail = requireEnv("NURTURE_FROM_EMAIL");
  const replyTo = requireEnv("NURTURE_REPLY_TO");
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  return {
    siteKey: niche.content_strategy.site_key,
    sequenceName: "agency_welcome",
    steps: AGENCY_STEPS,
    fromAddress: `${fromName} <${fromEmail}>`,
    replyTo,
    defaultConsentText: AGENCY_NEWSLETTER_CONSENT_TEXT,
    siteUrl,
  };
}
