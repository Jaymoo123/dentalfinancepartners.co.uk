import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

export const serviceTiers: ServiceTier[] = [
  {
    name: "DIY",
    description:
      "Use our free tools to model your own numbers. No sign-up, no email gate. Good for business owners who are comfortable with the maths and just need reliable 2026/27 figures.",
    features: [
      "17 free tax calculators:",
      "Salary vs dividend optimiser",
      "Take-home pay calculator",
      "Employer NI cost tool",
      "VAT scheme comparator",
      "BADR and CGT calculator",
      "378 plain-English guides covering every UK trading structure",
    ],
    cta: "Open the calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Assisted",
    description:
      "A short call to review your numbers, sense-check a decision, or answer a specific question. Fixed fee, no ongoing commitment.",
    features: [
      "One named accountant on the call",
      "Structured vs unincorporated comparison",
      "Director pay and dividend split review",
      "VAT scheme and threshold check",
      "R and D credit eligibility assessment",
      "Written summary of what was covered",
    ],
    cta: "Book a free call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Done for you",
    description:
      "Full year-round engagement. We handle every filing, answer questions as they arise, and plan your tax position before each year-end. One fixed fee, agreed up front.",
    features: [
      "Year-end accounts and CT600 corporation tax",
      "VAT returns and Making Tax Digital",
      "Monthly payroll and RTI submissions",
      "Director self assessment",
      "Ad-hoc questions with no hourly clock",
      "Annual planning conversation before year-end",
      "One named accountant throughout",
    ],
    cta: "Request a quote",
    ctaHref: "/contact",
  },
];

export const siteStats: StatItemConfig[] = [
  {
    icon: "🧮",
    value: "17",
    label: "Free tax calculators",
  },
  {
    icon: "📖",
    value: "378",
    label: "Plain-English guides",
  },
  {
    icon: "⚡",
    value: "24h",
    label: "Reply window",
  },
  {
    icon: "📋",
    value: "8",
    label: "Service lines covered",
  },
];
