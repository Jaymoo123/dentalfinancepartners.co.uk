import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// VAT threshold verified 2026-07-15; source: docs/ecommerce/rates_ledger.json
export const VAT_THRESHOLD = 90000;

export interface VatThresholdResult {
  grossRevenue: number;
  headroom: number;
  percentUsed: number;
  breached: boolean;
}

export function calcVatThreshold(grossRevenue: number): VatThresholdResult {
  const headroom = Math.max(0, VAT_THRESHOLD - grossRevenue);
  const percentUsed = Math.min(100, (grossRevenue / VAT_THRESHOLD) * 100);
  const breached = grossRevenue >= VAT_THRESHOLD;
  return { grossRevenue, headroom, percentUsed, breached };
}

export const vatThresholdTrackerTool: GenericTool = {
  kind: "generic",
  slug: "vat-threshold-tracker",
  name: "VAT Threshold Tracker",
  category: "VAT and Cross-Border Selling",
  oneLiner:
    "Track your rolling 12-month gross sales against the £90,000 VAT registration threshold. The threshold bites on gross selling price, not the net payout after platform fees.",
  metaTitle: "VAT Threshold Tracker for Online Sellers UK | £90,000 Gross",
  metaDescription:
    "Check how close your online sales are to the UK VAT registration threshold. The £90,000 test is on gross selling price, not the net payout after platform fees. Updated 2026/27.",
  intro:
    "The <a href=\"https://www.gov.uk/vat-registration\">UK VAT registration threshold</a> is £90,000 of taxable turnover in any rolling 12-month period. For marketplace sellers, taxable turnover is the gross selling price of each item before the platform deducts its fees. Sellers who track their bank deposits or net payouts instead of gross sales routinely breach the threshold without realising it, because the payout figure is always lower. Enter your gross sales to see your headroom and your projected breach month.",
  ctaLabel: "Get help with seller VAT registration",
  embedHeight: 400,
  fields: [
    {
      id: "grossRevenue",
      label: "Rolling 12-month gross sales",
      type: "currency",
      default: 70000,
      step: 1000,
      min: 0,
      help: `Use gross selling price before platform fees. The £${VAT_THRESHOLD.toLocaleString()} threshold is on gross turnover, not the net amount you receive in your bank account.`,
    },
  ],
  compute: (v) => {
    const r = calcVatThreshold(Math.max(0, Number(v.grossRevenue)));
    const tone = r.breached ? "warn" : r.percentUsed >= 80 ? "default" : "good";
    return {
      headline: {
        label: r.breached ? "VAT registration required" : "Headroom to VAT threshold",
        value: r.breached ? "Threshold breached" : gbp(r.headroom),
        sub: `${r.percentUsed.toFixed(1)}% of the £${VAT_THRESHOLD.toLocaleString()} threshold used`,
        tone,
      },
      rows: [
        { label: "Gross sales (rolling 12 months)", value: gbp(r.grossRevenue) },
        { label: "VAT registration threshold", value: gbp(VAT_THRESHOLD) },
        { label: "Headroom remaining", value: r.breached ? "None, register now" : gbp(r.headroom), strong: true },
        { label: "Threshold used", value: `${r.percentUsed.toFixed(1)}%` },
      ],
      note: r.breached
        ? "Your gross sales have reached or exceeded the VAT registration threshold. You must notify HMRC within 30 days and register for VAT. Late registration penalties apply."
        : r.percentUsed >= 80
        ? "You are within 20% of the VAT registration threshold. Monitor your rolling 12-month sales monthly and register before you breach £90,000."
        : "You are below the VAT registration threshold. Keep monitoring your rolling 12-month gross sales, not your net payout.",
    };
  },
  explainer: {
    heading: "Why sellers breach the threshold without realising",
    paragraphs: [
      `The <a href="https://www.gov.uk/vat-registration">UK VAT registration threshold</a> is £${VAT_THRESHOLD.toLocaleString()} of taxable turnover in any rolling 12-month period. Taxable turnover is the gross selling price of each item before the platform deducts its fees. An eBay seller whose bank deposits total £78,000 may have generated £89,000 or more in gross sales once platform fees are added back, leaving little or no headroom.`,
      "The 30-day forward-look test adds a second trigger: if at any point you expect your taxable turnover to exceed £90,000 in the next 30 days alone, you must register immediately regardless of what your rolling 12-month total shows. A large promotional period or seasonal spike can trigger this even if your annual run-rate is well below the threshold.",
      "Marketplace and advertising fees billed from outside the UK are also relevant. These are reverse-charge services under <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">HMRC Notice 741A</a>: if you are VAT-registered, you self-account for VAT on them, and the value counts toward the £90,000 threshold. See <a href=\"/vat/vat-on-marketplace-fees\">VAT on marketplace fees</a> for the detail.",
      "If you sell through a marketplace and you are not UK-established, different rules apply. The marketplace is treated as the deemed supplier and accounts for UK VAT on your behalf. You have no registration threshold of your own in that case. See <a href=\"/vat/deemed-supplier-establishment\">deemed supplier and establishment</a> for the full picture.",
    ],
  },
  faqs: [
    {
      question: "Does the £90,000 threshold apply to my Amazon or eBay payout or my gross sales?",
      answer: `The <a href="https://www.gov.uk/vat-registration">threshold</a> applies to your gross selling price, not the net payout after platform fees. If you sell an item for £100 and the platform pays you £82 after deducting referral and fulfilment fees, £100 counts toward the threshold, not £82.`,
    },
    {
      question: "What happens if I breach the VAT threshold?",
      answer: "You must notify HMRC within 30 days of the end of the month in which you exceeded the threshold. Registration is effective from the first day of the following month. HMRC can back-date registration and charge VAT and penalties for the period you traded above the threshold unregistered. If you have breached, see <a href=\"/services/hmrc-letter-online-sales\">our HMRC letter and late-registration service</a>.",
    },
    {
      question: "Do I have a VAT threshold if I sell through a marketplace and I am not based in the UK?",
      answer: "No. If you are not UK-established and sell goods through an online marketplace, the marketplace is treated as the deemed supplier and accounts for UK VAT on your behalf. You have no £90,000 registration threshold. See <a href=\"/vat/deemed-supplier-establishment\">deemed supplier and establishment</a> for the full rules.",
    },
    {
      question: "Do overseas platform fees count toward the £90,000 threshold?",
      answer: "Yes, if you are VAT-registered. Marketplace and advertising fees billed from outside the UK are reverse-charge services under <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">HMRC Notice 741A</a>. You self-account for the VAT on them, and that value is included in your taxable turnover for threshold purposes. See <a href=\"/vat/vat-on-marketplace-fees\">VAT on marketplace fees</a>.",
    },
  ],
};
