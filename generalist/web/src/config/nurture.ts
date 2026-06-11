/**
 * Generalist (Holloway Davies) nurture engine composition.
 *
 * This file is the ONLY place where generalist identity values appear.
 * The shared engine itself contains no site literals (PF-07).
 *
 * EN-04 dormancy: this site composes DORMANT. CRON_SECRET is not set
 * in the generalist deployment by default — see .env.local.example for
 * what arming would look like. Until CRON_SECRET is set:
 *   - Opt-ins are recorded in the subscribers table.
 *   - Zero emails leave. The cron job returns {sent:0} on every run.
 *
 * EN-06: from-identity, siteUrl, and replyTo come from env vars or from
 * the niche config. The engine refuses to operate if they are absent
 * (requireEnv throws). No hardcoded fallbacks.
 *
 * Sequence content: the generalist welcome series, ported from the old
 * welcome-series.ts and expressed as NurtureStep[] so the shared engine
 * can drive it.
 */

import type { NurtureConfig, NurtureStep } from "@accounting-network/web-shared/nurture/config";
import { requireEnv } from "@accounting-network/web-shared/nurture/config";
import { getSiteUrl } from "./niche-loader";

const BASE = getSiteUrl().replace(/\/$/, "");

// ── Sequence content (ported from generalist emails/content/welcome-series.ts) ──

function buildWelcomeBody(unsubUrl: string) {
  const html = [
    `<p style="margin:0 0 14px;">Welcome to The Director's Brief.</p>`,
    `<p style="margin:0 0 14px;">You'll get one email a week, on a Thursday morning. Plain text, one tax or finance idea worth your time, no banner ads, no upsell.</p>`,
    `<p style="margin:0 0 14px;">Two things to do right now.</p>`,
    `<p style="margin:0 0 14px;">First, bookmark the 2025/26 UK tax rates page. It's the canonical reference we use internally for corporation tax, dividend tax, BADR, VAT, MTD ITSA dates, R&D rates, employer NI, everything. Updated when HMRC changes anything.</p>`,
    `<p style="margin:0 0 14px;">Second, if you run a limited company and pay yourself a mix of salary and dividends, run the salary-dividend optimiser with your numbers. Most directors set the split once and never revisit it; the wrong split typically costs £2,000 to £6,000 a year for a director on £40k to £80k of total extraction.</p>`,
    `<p style="margin:0 0 14px;">Next email: the R&D claim mistake most UK companies make, and why the line moved in 2024.</p>`,
    `<p style="margin:0 0 14px;"><a href="${BASE}/calculators/salary-dividend-optimiser?utm_source=nurture&amp;utm_medium=email&amp;utm_campaign=generalist_welcome&amp;utm_content=welcome">Open the salary-dividend optimiser</a></p>`,
    `<p style="margin:0;font-size:13px;color:#64748b;">Emma, Holloway Davies</p>`,
    `<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${unsubUrl}" style="color:#64748b;">Unsubscribe</a></p>`,
  ].join("\n");
  return {
    html,
    text: [
      "Welcome to The Director's Brief.",
      "",
      "You'll get one email a week, on a Thursday morning. Plain text, one tax or finance idea worth your time, no banner ads, no upsell.",
      "",
      "Two things to do right now.",
      "",
      "First, bookmark the 2025/26 UK tax rates page. It's the canonical reference we use internally for corporation tax, dividend tax, BADR, VAT, MTD ITSA dates, R&D rates, employer NI, everything. Updated when HMRC changes anything.",
      "",
      "Second, if you run a limited company and pay yourself a mix of salary and dividends, run the salary-dividend optimiser with your numbers. Most directors set the split once and never revisit it; the wrong split typically costs £2,000 to £6,000 a year for a director on £40k to £80k of total extraction.",
      "",
      "Next email: the R&D claim mistake most UK companies make, and why the line moved in 2024.",
      "",
      `Open the salary-dividend optimiser: ${BASE}/calculators/salary-dividend-optimiser?utm_source=nurture&utm_medium=email&utm_campaign=generalist_welcome&utm_content=welcome`,
      "",
      "Emma, Holloway Davies",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildRdBody(unsubUrl: string) {
  const html = [
    `<p style="margin:0 0 14px;">Quick one on R&D tax credits.</p>`,
    `<p style="margin:0 0 14px;">Companies that build something custom (software, AI tools, integrations, scientific processes, new manufacturing techniques, novel engineering) often assume the build itself is the R&D. It usually isn't.</p>`,
    `<p style="margin:0 0 14px;">HMRC pays for the resolution of scientific or technological uncertainty: the specific bits where a competent professional in the field couldn't have predicted the outcome by reading the documentation. The bespoke build for a client is rarely that. The new technique you had to invent to make it work might be.</p>`,
    `<p style="margin:0 0 14px;">The merged R&D scheme (accounting periods on or after 1 April 2024) tightened this further. Subcontractor R&D often shifts to the customer's claim, the headline rate dropped to 20%, and the Enhanced R&D Intensive Support scheme (ERIS) only applies to loss-making SMEs where R&D is at least 30% of total expenditure.</p>`,
    `<p style="margin:0 0 14px;">If you have claimed before and the numbers feel rough, it is worth a 20-minute conversation. If you have never claimed, the eligibility page below covers the qualifying activity tests by sector.</p>`,
    `<p style="margin:0 0 14px;"><a href="${BASE}/r-and-d-credits?utm_source=nurture&amp;utm_medium=email&amp;utm_campaign=generalist_welcome&amp;utm_content=rd_credits">R&D eligibility for UK companies</a></p>`,
    `<p style="margin:0;font-size:13px;color:#64748b;">Emma, Holloway Davies</p>`,
    `<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${unsubUrl}" style="color:#64748b;">Unsubscribe</a></p>`,
  ].join("\n");
  return {
    html,
    text: [
      "Quick one on R&D tax credits.",
      "",
      "Companies that build something custom (software, AI tools, integrations, scientific processes, new manufacturing techniques, novel engineering) often assume the build itself is the R&D. It usually isn't.",
      "",
      "HMRC pays for the resolution of scientific or technological uncertainty: the specific bits where a competent professional in the field couldn't have predicted the outcome by reading the documentation. The bespoke build for a client is rarely that. The new technique you had to invent to make it work might be.",
      "",
      "The merged R&D scheme (accounting periods on or after 1 April 2024) tightened this further. Subcontractor R&D often shifts to the customer's claim, the headline rate dropped to 20%, and the Enhanced R&D Intensive Support scheme (ERIS) only applies to loss-making SMEs where R&D is at least 30% of total expenditure.",
      "",
      "If you have claimed before and the numbers feel rough, it is worth a 20-minute conversation. If you have never claimed, the eligibility page below covers the qualifying activity tests by sector.",
      "",
      `R&D eligibility for UK companies: ${BASE}/r-and-d-credits?utm_source=nurture&utm_medium=email&utm_campaign=generalist_welcome&utm_content=rd_credits`,
      "",
      "Emma, Holloway Davies",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildPillarBody(unsubUrl: string) {
  const html = [
    `<p style="margin:0 0 14px;">If you only read one thing on the site this week.</p>`,
    `<p style="margin:0 0 14px;">We publish definitive pillar guides on the questions UK business owners ask most often. In rough order of who needs them:</p>`,
    `<ul style="margin:0 0 14px;padding-left:20px;color:#334155;font-size:15px;line-height:1.65;">`,
    `<li>If you are deciding how to structure: Limited Company vs Sole Trader.</li>`,
    `<li>If you are about to incorporate: How to Register a Limited Company UK.</li>`,
    `<li>If you are a limited company director and want to extract money efficiently: How to Pay Yourself From a Limited Company.</li>`,
    `<li>If corporation tax feels like a black box: How Does Corporation Tax Work.</li>`,
    `<li>If you are a contractor: IR35 Explained.</li>`,
    `<li>If MTD ITSA is on your radar (April 2026 for £50k+ self-employed and landlords): Making Tax Digital for Income Tax.</li>`,
    `<li>If R&D is part of your business model: R&D Tax Credits Explained.</li>`,
    `<li>If exit is anywhere on the horizon: Business Asset Disposal Relief Explained.</li>`,
    `<li>If you are filing self assessment: Self Assessment Tax Return Guide.</li>`,
    `</ul>`,
    `<p style="margin:0 0 14px;"><a href="${BASE}/fundamentals?utm_source=nurture&amp;utm_medium=email&amp;utm_campaign=generalist_welcome&amp;utm_content=pillars">Browse the pillar guides</a></p>`,
    `<p style="margin:0;font-size:13px;color:#64748b;">Emma, Holloway Davies</p>`,
    `<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${unsubUrl}" style="color:#64748b;">Unsubscribe</a></p>`,
  ].join("\n");
  return {
    html,
    text: [
      "If you only read one thing on the site this week.",
      "",
      "We publish definitive pillar guides on the questions UK business owners ask most often. In rough order of who needs them:",
      "- If you are deciding how to structure: Limited Company vs Sole Trader.",
      "- If you are about to incorporate: How to Register a Limited Company UK.",
      "- If you are a limited company director: How to Pay Yourself From a Limited Company.",
      "- If corporation tax feels like a black box: How Does Corporation Tax Work.",
      "- If you are a contractor: IR35 Explained.",
      "- If MTD ITSA is on your radar: Making Tax Digital for Income Tax.",
      "- If R&D is part of your business model: R&D Tax Credits Explained.",
      "- If exit is anywhere on the horizon: Business Asset Disposal Relief Explained.",
      "- If you are filing self assessment: Self Assessment Tax Return Guide.",
      "",
      `Browse the pillar guides: ${BASE}/fundamentals?utm_source=nurture&utm_medium=email&utm_campaign=generalist_welcome&utm_content=pillars`,
      "",
      "Emma, Holloway Davies",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildMtdBody(unsubUrl: string) {
  const html = [
    `<p style="margin:0 0 14px;">On MTD for Income Tax.</p>`,
    `<p style="margin:0 0 14px;">From 6 April 2026, Making Tax Digital for Income Tax Self Assessment (MTD ITSA) becomes mandatory for sole traders and landlords whose qualifying income is over £50,000 a year. From April 2027 it drops to £30,000. From April 2028, £20,000.</p>`,
    `<p style="margin:0 0 14px;">What that actually means: you replace one annual self assessment return with four quarterly digital updates plus a final declaration. You must use HMRC-recognised software (Xero, FreeAgent, QuickBooks, GoSimpleTax and others) that keeps digital records and sends the data straight to HMRC. Spreadsheets only work with bridging software.</p>`,
    `<p style="margin:0 0 14px;">If you cross the £50,000 threshold once in any tax year from 2024/25 onwards, you are in scope from the next April. So if your 2024/25 self assessment shows £52,000 of self-employment plus rental income combined, you are in scope from April 2026, no exceptions.</p>`,
    `<p style="margin:0 0 14px;">The pillar guide below covers the timeline, what counts as qualifying income, the software shortlist and the practical setup steps. Worth a read now, not in March 2026.</p>`,
    `<p style="margin:0 0 14px;"><a href="${BASE}/fundamentals/making-tax-digital-for-income-tax-guide?utm_source=nurture&amp;utm_medium=email&amp;utm_campaign=generalist_welcome&amp;utm_content=mtd_itsa">MTD for Income Tax pillar guide</a></p>`,
    `<p style="margin:0;font-size:13px;color:#64748b;">Emma, Holloway Davies</p>`,
    `<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${unsubUrl}" style="color:#64748b;">Unsubscribe</a></p>`,
  ].join("\n");
  return {
    html,
    text: [
      "On MTD for Income Tax.",
      "",
      "From 6 April 2026, Making Tax Digital for Income Tax Self Assessment (MTD ITSA) becomes mandatory for sole traders and landlords whose qualifying income is over £50,000 a year. From April 2027 it drops to £30,000. From April 2028, £20,000.",
      "",
      "What that actually means: you replace one annual self assessment return with four quarterly digital updates plus a final declaration. You must use HMRC-recognised software (Xero, FreeAgent, QuickBooks, GoSimpleTax and others) that keeps digital records and sends the data straight to HMRC. Spreadsheets only work with bridging software.",
      "",
      "If you cross the £50,000 threshold once in any tax year from 2024/25 onwards, you are in scope from the next April.",
      "",
      `MTD for Income Tax pillar guide: ${BASE}/fundamentals/making-tax-digital-for-income-tax-guide?utm_source=nurture&utm_medium=email&utm_campaign=generalist_welcome&utm_content=mtd_itsa`,
      "",
      "Emma, Holloway Davies",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

function buildFreeCallBody(unsubUrl: string) {
  const html = [
    `<p style="margin:0 0 14px;">One last thing before the regular emails start.</p>`,
    `<p style="margin:0 0 14px;">If anything in the last two weeks has made you wonder whether you have the structure right (sole trader vs limited company), the salary/dividend split right, an R&D claim worth pursuing, an MTD ITSA timeline to plan, or any other UK tax or accounting question, you can book a free 60-minute call.</p>`,
    `<p style="margin:0 0 14px;">It is on a video call, with an ICAEW qualified accountant on our team. You get a written summary by email afterwards with anything specific we would recommend. No sales pitch. About half the businesses we speak to we tell to stay with their current accountant and just change one thing.</p>`,
    `<p style="margin:0 0 14px;">From here, the emails drop to one a week, Thursday morning, The Director's Brief. You can unsubscribe any time using the link at the bottom of every email.</p>`,
    `<p style="margin:0 0 14px;"><a href="${BASE}/contact?utm_source=nurture&amp;utm_medium=email&amp;utm_campaign=generalist_welcome&amp;utm_content=free_call">Book a free call</a></p>`,
    `<p style="margin:0;font-size:13px;color:#64748b;">Emma, Holloway Davies</p>`,
    `<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${unsubUrl}" style="color:#64748b;">Unsubscribe</a></p>`,
  ].join("\n");
  return {
    html,
    text: [
      "One last thing before the regular emails start.",
      "",
      "If anything in the last two weeks has made you wonder whether you have the structure right (sole trader vs limited company), the salary/dividend split right, an R&D claim worth pursuing, an MTD ITSA timeline to plan, or any other UK tax or accounting question, you can book a free 60-minute call.",
      "",
      "It is on a video call, with an ICAEW qualified accountant on our team. You get a written summary by email afterwards with anything specific we would recommend. No sales pitch. About half the businesses we speak to we tell to stay with their current accountant and just change one thing.",
      "",
      "From here, the emails drop to one a week, Thursday morning, The Director's Brief. You can unsubscribe any time using the link at the bottom of every email.",
      "",
      `Book a free call: ${BASE}/contact?utm_source=nurture&utm_medium=email&utm_campaign=generalist_welcome&utm_content=free_call`,
      "",
      "Emma, Holloway Davies",
      "",
      `Unsubscribe: ${unsubUrl}`,
    ].join("\n"),
    listUnsubscribeHeader: `<${unsubUrl}>`,
  };
}

const GENERALIST_STEPS: NurtureStep[] = [
  {
    key: "welcome",
    delayDays: 0,
    subject: "You're in. What to expect from The Director's Brief.",
    buildBody: buildWelcomeBody,
  },
  {
    key: "rd_credits",
    delayDays: 2,
    subject: "The R&D claim mistake most UK companies make",
    buildBody: buildRdBody,
  },
  {
    key: "pillar_guides",
    delayDays: 5,
    subject: "Pillar guides: pick whichever is most relevant",
    buildBody: buildPillarBody,
  },
  {
    key: "mtd_itsa",
    delayDays: 9,
    subject: "MTD ITSA: what April 2026 actually requires",
    buildBody: buildMtdBody,
  },
  {
    key: "free_call",
    delayDays: 14,
    subject: "A free call: 60 minutes, your numbers, no sales pitch",
    buildBody: buildFreeCallBody,
  },
];

/**
 * Build the generalist NurtureConfig.
 *
 * EN-06: requireEnv throws if NURTURE_FROM_EMAIL, NURTURE_FROM_NAME, or
 * NURTURE_REPLY_TO are unset. The engine will not fall back to any default.
 * Set these in your deployment env (see .env.local.example).
 *
 * Called at route-handler time, not module initialisation, so that env var
 * reads happen inside the request lifecycle (compatible with Next.js runtime).
 */
export function buildGeneralistNurtureConfig(): NurtureConfig {
  const fromName = requireEnv("NURTURE_FROM_NAME");
  const fromEmail = requireEnv("NURTURE_FROM_EMAIL");
  const replyTo = requireEnv("NURTURE_REPLY_TO");
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  return {
    siteKey: "generalist",
    sequenceName: "generalist_welcome",
    steps: GENERALIST_STEPS,
    fromAddress: `${fromName} <${fromEmail}>`,
    replyTo,
    defaultConsentText:
      "I agree to receive accounting and tax updates by email from Holloway Davies.",
    siteUrl,
  };
}
