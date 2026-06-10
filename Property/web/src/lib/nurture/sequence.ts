/**
 * The "property_updates" nurture sequence — the content of the drip.
 *
 * Editorial rules (these are MARKETING emails to opted-in landlords):
 *  - General information, never regulated/specific tax advice. Every email
 *    routes to a free, no-obligation review rather than telling the reader what
 *    to do. This keeps the faceless lead-gen model intact (we hand off to the
 *    partner firm, we do not advise).
 *  - Plain English. No em-dashes (commas, parentheses, full stops, middle dots).
 *  - Facts are grounded in the enacted position (Finance Act 2026): the finance
 *    cost reducer rising to 22% from April 2027, capital allowances (WDA 18% to
 *    14%, new 40% FYA), and AMAP mileage 45p to 55p from 6 April 2026.
 *
 * Each step's `delayDays` is measured from the PREVIOUS step's send (step 0 = 0,
 * sent immediately on opt-in as the welcome). The scheduler advances one step at
 * a time and stops after the last.
 */
import { renderMarketingEmail, type MarketingEmail } from "@/lib/emails/template";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");

export interface NurtureStep {
  /** Stable identifier for logs/debugging. */
  key: string;
  /** Days to wait after the previous step's send before this is due. */
  delayDays: number;
  subject: string;
  preheader: string;
  heading: string;
  /** Body sentences/blocks; each becomes a <p> in HTML and a line in text. */
  paragraphs: string[];
  cta: { label: string; path: string };
}

export const NURTURE_SEQUENCE_NAME = "property_updates";

export const NURTURE_SEQUENCE: NurtureStep[] = [
  {
    key: "welcome",
    delayDays: 0,
    subject: "You're in. The property tax updates worth reading",
    preheader: "A short series on the changes that actually affect UK landlords.",
    heading: "Welcome. Here is what to expect",
    paragraphs: [
      "Thanks for subscribing. Over the next couple of weeks we will send a short series on the property tax changes that genuinely affect UK landlords.",
      "We will cover the finance cost tax reducer changing in 2027, whether moving a portfolio into a company is worth it, capital gains tax when you sell, and the 2026 allowance changes. Plain English, no jargon, and nothing you have to act on today.",
      "If your situation is more pressing, you can book a free, no-obligation review with a specialist at any time.",
    ],
    cta: { label: "Book a free review", path: "/contact" },
  },
  {
    key: "section24",
    delayDays: 3,
    subject: "The finance cost tax reducer rises to 22% in April 2027",
    preheader: "A small but real change for mortgaged landlords.",
    heading: "A small but real change for mortgaged landlords",
    paragraphs: [
      "Since 2020, mortgage interest and other finance costs have not been deductible from your rental profit. Instead you get a basic-rate (20%) tax reducer, the change usually called Section 24.",
      "From April 2027, under Finance Act 2026, that reducer is set to rise to 22%. (Scotland sets its own income tax position, so the detail there can differ.) For a higher-rate landlord with a sizeable mortgage, that is a modest reduction in the tax due on finance costs, not a return to full relief.",
      "It is worth knowing where you stand before it changes. Our Section 24 calculator shows the effect on your own numbers in about a minute.",
    ],
    cta: { label: "Try the Section 24 calculator", path: "/calculators" },
  },
  {
    key: "incorporation",
    delayDays: 5,
    subject: "Should you move your portfolio into a company?",
    preheader: "Incorporation is the most common question we get. Here is the honest answer.",
    heading: "Incorporation: the question worth getting right",
    paragraphs: [
      "It is the most common thing landlords ask us, and the honest answer is that it depends.",
      "A limited company gets full relief on mortgage interest and a lower headline rate on retained profit, which can suit landlords who are higher-rate taxpayers and reinvest rather than draw the income. Against that sit real costs: capital gains tax and stamp duty on transferring the properties in, mortgage availability and pricing, and the admin of running a company.",
      "For some portfolios it is clearly worth it, for others clearly not. The deciding factors are your tax band, how long you plan to hold, and whether you need the rental income to live on. A short review will tell you which side of the line you are on.",
    ],
    cta: { label: "Get a free incorporation review", path: "/contact" },
  },
  {
    key: "cgt",
    delayDays: 6,
    subject: "Selling a rental: the CGT points landlords miss",
    preheader: "The 60-day deadline, the reliefs, and what you can deduct.",
    heading: "Capital gains tax when you sell a property",
    paragraphs: [
      "When you sell a rental at a profit, capital gains tax is due, and it has to be reported and paid within 60 days of completion. That deadline catches a lot of people out.",
      "A few things commonly get missed: the costs you can deduct (buying and selling costs, and capital improvements, but not ordinary repairs), Private Residence Relief if the property was ever your main home for a period, and the annual exempt amount, which is now small. If you owned the property jointly, each owner has their own allowance and their own gain.",
      "Getting the reliefs and the dates right can make a meaningful difference to the final bill.",
    ],
    cta: { label: "Ask about your sale", path: "/contact" },
  },
  {
    key: "allowances_mileage",
    delayDays: 7,
    subject: "Two 2026 changes if you do works or drive for your lettings",
    preheader: "Capital allowances and the mileage rate, updated for 2026.",
    heading: "Capital allowances and mileage, updated for 2026",
    paragraphs: [
      "Two practical updates from Finance Act 2026 to round off the series.",
      "First, the writing down allowance on the main pool falls from 18% to 14%, and there is a new 40% first-year allowance on qualifying spend. That changes the timing of larger works and what you can claim and when.",
      "Second, the approved mileage rate (AMAP) rises from 45p to 55p per mile for the first 10,000 business miles from 6 April 2026, which matters if you drive to inspect or manage your properties.",
      "Neither is dramatic on its own, but together they are easy to leave money on the table over. This is the last email in this short series. We will only be in touch again if we have something genuinely useful to share, and you can unsubscribe at any time.",
    ],
    cta: { label: "Book a free review", path: "/contact" },
  },
];

/** Absolute, UTM-tagged CTA link so email clicks are attributable in the dashboard. */
function ctaHref(step: NurtureStep): string {
  const u = new URL(SITE + step.cta.path);
  u.searchParams.set("utm_source", "nurture");
  u.searchParams.set("utm_medium", "email");
  u.searchParams.set("utm_campaign", NURTURE_SEQUENCE_NAME);
  u.searchParams.set("utm_content", step.key);
  return u.toString();
}

/** Build the renderable {subject, html, text} for one step + this subscriber's unsubscribe link. */
export function buildStepEmail(
  step: NurtureStep,
  unsubscribeUrl: string,
): { subject: string; html: string; text: string } {
  const bodyHtml = step.paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join("");
  const bodyText = step.paragraphs.join("\n\n");
  const email: MarketingEmail = {
    preheader: step.preheader,
    heading: step.heading,
    bodyHtml,
    bodyText,
    cta: { label: step.cta.label, href: ctaHref(step) },
    unsubscribeUrl,
  };
  const { html, text } = renderMarketingEmail(email);
  return { subject: step.subject, html, text };
}
