/**
 * Property Tax Partners nurture engine composition.
 *
 * This file is the ONLY place where Property identity values appear in the
 * nurture stack. The shared engine itself contains no site literals (PF-07).
 *
 * EN-04 dormancy: CRON_SECRET is not set in the Property deployment by default.
 * Until CRON_SECRET is set:
 *   - Opt-ins are recorded in the subscribers table.
 *   - Zero emails leave. The cron job returns {sent:0} on every run.
 *
 * EN-06: from-identity, siteUrl, and replyTo come from env vars (requireEnv).
 * The engine refuses to operate if they are absent. No hardcoded fallbacks.
 *
 * Sequence content: the property_updates drip, ported verbatim from the old
 * lib/nurture/sequence.ts and expressed as NurtureStep[] using buildBody so
 * the shared engine can drive it. Delay mapping is after-previous-step (same
 * semantics as the old sequence.ts).
 *
 * Editorial rules (same as original):
 *  - General information, never regulated/specific tax advice.
 *  - Plain English. No em-dashes (commas, parentheses, full stops, middle dots).
 *  - Facts grounded in Finance Act 2026.
 */

import type { NurtureConfig, NurtureStep } from "@accounting-network/web-shared/nurture/config";
import { requireEnv } from "@accounting-network/web-shared/nurture/config";
import { getSiteUrl } from "./niche-loader";
import { renderMarketingEmail } from "@/lib/emails/template";

const BASE = getSiteUrl().replace(/\/$/, "");
const SEQUENCE_NAME = "property_updates";

// ── UTM helper ────────────────────────────────────────────────────────────────

function ctaHref(path: string, key: string): string {
  const u = new URL(BASE + path);
  u.searchParams.set("utm_source", "nurture");
  u.searchParams.set("utm_medium", "email");
  u.searchParams.set("utm_campaign", SEQUENCE_NAME);
  u.searchParams.set("utm_content", key);
  return u.toString();
}

// ── Step body builders ────────────────────────────────────────────────────────

function buildWelcomeBody(unsubscribeUrl: string) {
  const paragraphs = [
    "Thanks for subscribing. Over the next couple of weeks we will send a short series on the property tax changes that genuinely affect UK landlords.",
    "We will cover the finance cost tax reducer changing in 2027, whether moving a portfolio into a company is worth it, capital gains tax when you sell, and the 2026 allowance changes. Plain English, no jargon, and nothing you have to act on today.",
    "If your situation is more pressing, you can book a free, no-obligation review with a specialist at any time.",
  ];
  const bodyHtml = paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join("");
  const bodyText = paragraphs.join("\n\n");
  const { html, text } = renderMarketingEmail({
    preheader: "A short series on the changes that actually affect UK landlords.",
    heading: "Welcome. Here is what to expect",
    bodyHtml,
    bodyText,
    cta: { label: "Book a free review", href: ctaHref("/contact", "welcome") },
    unsubscribeUrl,
  });
  return { html, text, listUnsubscribeHeader: `<${unsubscribeUrl}>` };
}

function buildSection24Body(unsubscribeUrl: string) {
  const paragraphs = [
    "Since 2020, mortgage interest and other finance costs have not been deductible from your rental profit. Instead you get a basic-rate (20%) tax reducer, the change usually called Section 24.",
    "From April 2027, under Finance Act 2026, that reducer is set to rise to 22%. (Scotland sets its own income tax position, so the detail there can differ.) For a higher-rate landlord with a sizeable mortgage, that is a modest reduction in the tax due on finance costs, not a return to full relief.",
    "It is worth knowing where you stand before it changes. Our Section 24 calculator shows the effect on your own numbers in about a minute.",
  ];
  const bodyHtml = paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join("");
  const bodyText = paragraphs.join("\n\n");
  const { html, text } = renderMarketingEmail({
    preheader: "A small but real change for mortgaged landlords.",
    heading: "A small but real change for mortgaged landlords",
    bodyHtml,
    bodyText,
    cta: { label: "Try the Section 24 calculator", href: ctaHref("/calculators", "section24") },
    unsubscribeUrl,
  });
  return { html, text, listUnsubscribeHeader: `<${unsubscribeUrl}>` };
}

function buildIncorporationBody(unsubscribeUrl: string) {
  const paragraphs = [
    "It is the most common thing landlords ask us, and the honest answer is that it depends.",
    "A limited company gets full relief on mortgage interest and a lower headline rate on retained profit, which can suit landlords who are higher-rate taxpayers and reinvest rather than draw the income. Against that sit real costs: capital gains tax and stamp duty on transferring the properties in, mortgage availability and pricing, and the admin of running a company.",
    "For some portfolios it is clearly worth it, for others clearly not. The deciding factors are your tax band, how long you plan to hold, and whether you need the rental income to live on. A short review will tell you which side of the line you are on.",
  ];
  const bodyHtml = paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join("");
  const bodyText = paragraphs.join("\n\n");
  const { html, text } = renderMarketingEmail({
    preheader: "Incorporation is the most common question we get. Here is the honest answer.",
    heading: "Incorporation: the question worth getting right",
    bodyHtml,
    bodyText,
    cta: { label: "Get a free incorporation review", href: ctaHref("/contact", "incorporation") },
    unsubscribeUrl,
  });
  return { html, text, listUnsubscribeHeader: `<${unsubscribeUrl}>` };
}

function buildCgtBody(unsubscribeUrl: string) {
  const paragraphs = [
    "When you sell a rental at a profit, capital gains tax is due, and it has to be reported and paid within 60 days of completion. That deadline catches a lot of people out.",
    "A few things commonly get missed: the costs you can deduct (buying and selling costs, and capital improvements, but not ordinary repairs), Private Residence Relief if the property was ever your main home for a period, and the annual exempt amount, which is now small. If you owned the property jointly, each owner has their own allowance and their own gain.",
    "Getting the reliefs and the dates right can make a meaningful difference to the final bill.",
  ];
  const bodyHtml = paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join("");
  const bodyText = paragraphs.join("\n\n");
  const { html, text } = renderMarketingEmail({
    preheader: "The 60-day deadline, the reliefs, and what you can deduct.",
    heading: "Capital gains tax when you sell a property",
    bodyHtml,
    bodyText,
    cta: { label: "Ask about your sale", href: ctaHref("/contact", "cgt") },
    unsubscribeUrl,
  });
  return { html, text, listUnsubscribeHeader: `<${unsubscribeUrl}>` };
}

function buildAllowancesMileageBody(unsubscribeUrl: string) {
  const paragraphs = [
    "Two practical updates from Finance Act 2026 to round off the series.",
    "First, the writing down allowance on the main pool falls from 18% to 14%, and there is a new 40% first-year allowance on qualifying spend. That changes the timing of larger works and what you can claim and when.",
    "Second, the approved mileage rate (AMAP) rises from 45p to 55p per mile for the first 10,000 business miles from 6 April 2026, which matters if you drive to inspect or manage your properties.",
    "Neither is dramatic on its own, but together they are easy to leave money on the table over. This is the last email in this short series. We will only be in touch again if we have something genuinely useful to share, and you can unsubscribe at any time.",
  ];
  const bodyHtml = paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join("");
  const bodyText = paragraphs.join("\n\n");
  const { html, text } = renderMarketingEmail({
    preheader: "Capital allowances and the mileage rate, updated for 2026.",
    heading: "Capital allowances and mileage, updated for 2026",
    bodyHtml,
    bodyText,
    cta: { label: "Book a free review", href: ctaHref("/contact", "allowances_mileage") },
    unsubscribeUrl,
  });
  return { html, text, listUnsubscribeHeader: `<${unsubscribeUrl}>` };
}

// ── Sequence ──────────────────────────────────────────────────────────────────
//
// Delay mapping (old lib/nurture/sequence.ts delayDays -> engine after-previous-step):
//   step 0 welcome             delayDays 0  -> 0  (immediate on opt-in)
//   step 1 section24           delayDays 3  -> 3  (3d after welcome)
//   step 2 incorporation       delayDays 5  -> 5  (5d after section24 = cumulative day 8)
//   step 3 cgt                 delayDays 6  -> 6  (6d after incorporation = cumulative day 14)
//   step 4 allowances_mileage  delayDays 7  -> 7  (7d after cgt = cumulative day 21)
//
// The old sequence.ts already used after-previous-step semantics. No change needed.

const PROPERTY_STEPS: NurtureStep[] = [
  {
    key: "welcome",
    delayDays: 0,
    subject: "You're in. The property tax updates worth reading",
    buildBody: buildWelcomeBody,
  },
  {
    key: "section24",
    delayDays: 3,
    subject: "The finance cost tax reducer rises to 22% in April 2027",
    buildBody: buildSection24Body,
  },
  {
    key: "incorporation",
    delayDays: 5,
    subject: "Should you move your portfolio into a company?",
    buildBody: buildIncorporationBody,
  },
  {
    key: "cgt",
    delayDays: 6,
    subject: "Selling a rental: the CGT points landlords miss",
    buildBody: buildCgtBody,
  },
  {
    key: "allowances_mileage",
    delayDays: 7,
    subject: "Two 2026 changes if you do works or drive for your lettings",
    buildBody: buildAllowancesMileageBody,
  },
];

/**
 * Build the Property nurture NurtureConfig.
 *
 * EN-06: requireEnv throws if NURTURE_FROM_EMAIL, NURTURE_FROM_NAME, or
 * NURTURE_REPLY_TO are unset. The engine will not fall back to any default.
 *
 * Called at route-handler time, not module initialisation, so that env var
 * reads happen inside the request lifecycle (compatible with Next.js runtime).
 */
export function buildPropertyNurtureConfig(): NurtureConfig {
  const fromName = requireEnv("NURTURE_FROM_NAME");
  const fromEmail = requireEnv("NURTURE_FROM_EMAIL");
  const replyTo = requireEnv("NURTURE_REPLY_TO");
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  return {
    siteKey: "property",
    sequenceName: SEQUENCE_NAME,
    steps: PROPERTY_STEPS,
    fromAddress: `${fromName} <${fromEmail}>`,
    replyTo,
    // LD-09: must match the visible SubscribeForm label text byte-for-byte.
    defaultConsentText:
      "Yes, email me free property tax updates from Property Tax Partners. These are general information, not advice, and I can unsubscribe at any time. See our Privacy Policy.",
    siteUrl,
  };
}
