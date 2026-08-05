import type { PackagesConfig } from "@accounting-network/web-shared/pricing/types";
import { siteConfig } from "./site";

export const packages: PackagesConfig = {
  // Reuses the site's canonical lead-form consent text (see site.ts). PackagesSection
  // appends "See our Privacy Policy." itself, matching LeadForm's pattern.
  consentText: siteConfig.leadConsentText,
  businessTypes: [
    { value: "sole_practitioner", label: "Sole practitioner" },
    { value: "partner", label: "Partner" },
    { value: "firm_owner", label: "Firm owner or director" },
    { value: "cofa", label: "COFA" },
    { value: "other", label: "Other" },
  ],
  tiers: [
    {
      id: "sole_prac",
      name: "Sole Practitioner",
      price: "£49",
      priceValue: 49,
      description: "Statutory compliance for a sole practitioner, filed on time every time.",
      features: [
        "Annual accounts prepared and filed",
        "Self assessment prepared and filed",
        "Bookkeeping software included",
        "Deadline reminders all year",
        "Unlimited email support",
      ],
    },
    {
      id: "firm",
      name: "Firm Compliance",
      price: "£89",
      priceValue: 89,
      featured: true,
      description: "Full compliance for a small firm, company or partnership.",
      features: [
        "Year-end accounts and CT600 or partnership return",
        "Confirmation statement filed",
        "Two partner or director self assessments",
        "Quarterly VAT returns filed",
        "Bookkeeping software included",
        "Unlimited email support",
      ],
    },
    {
      id: "firm_sra",
      name: "Firm + SRA Support",
      price: "£149",
      priceValue: 149,
      description: "Compliance plus support on the SRA accounts side of the firm.",
      features: [
        "Everything in Firm Compliance",
        "Client account bookkeeping cross-checks against the SRA Accounts Rules",
        "Liaison with your reporting accountant for the accountant's report",
        "Payroll for up to 5 staff",
        "Priority response",
      ],
    },
  ],
  advisory: {
    fromPrice: "from £595",
    blurb:
      "One-off structural and transactional work for law firms, scoped and priced before anything starts.",
    projectTypes: [
      "Firm acquisition or merger support",
      "Incorporation to LLP or limited company",
      "SRA accountant's report scoping",
      "Partner admission or retirement",
      "Something else",
    ],
  },
};
