import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: facts only from niche.config + rates_ledger; no invented figures.
// VAT threshold £90,000 (rates_ledger key vat_registration_threshold, 2024-04-01).
// MTD ITSA £50,000 from Apr 2026 (key mtd_itsa_threshold_from_apr_2026).
// Platform reporting in force from Jan 2024 (key platform_reporting_in_force).

export const serviceTiers: ServiceTier[] = [
  {
    name: "Side Hustle",
    description:
      "Sellers under the VAT threshold who need self assessment filed correctly, marketplace income declared, and the trading allowance applied where it helps.",
    features: [
      "Self assessment for online selling income",
      "Trading allowance and COGS analysis",
      "Platform-reporting letter response (HMRC)",
      "Side hustle vs sole trader status review",
      "Making Tax Digital readiness check",
      "Unlimited email support",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Growing Seller",
    description:
      "Sole traders and limited companies scaling past the VAT threshold who need VAT registration handled, settlement reconciliation, and quarterly compliance kept on track.",
    features: [
      "Everything in Side Hustle",
      "VAT registration and returns (£90,000 threshold)",
      "Settlement reconciliation across marketplaces",
      "Annual accounts and corporation tax return",
      "Sole trader vs Ltd structure review",
      "Quarterly management accounts",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Scale and Export",
    description:
      "Multi-platform or cross-border sellers with EU VAT exposure, FBA stock in overseas warehouses, or IOSS/OSS obligations who need cross-border VAT handled before HMRC or an EU tax authority raises it.",
    features: [
      "Everything in Growing Seller",
      "EU VAT registration and OSS/IOSS compliance",
      "Import and cross-border VAT advice",
      "FBA and 3PL stock-location tax review",
      "Inventory and COGS bookkeeping",
      "Priority response in platform-suspension or HMRC-letter situations",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: false,
  },
];
