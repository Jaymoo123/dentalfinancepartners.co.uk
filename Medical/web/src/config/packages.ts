import type { PackagesConfig } from "@accounting-network/web-shared/pricing/types";
import { siteConfig } from "./site";

export const packages: PackagesConfig = {
  consentText: siteConfig.leadConsentText,
  businessTypes: [
    { value: "locum", label: "Locum doctor" },
    { value: "salaried_gp", label: "Salaried GP" },
    { value: "consultant", label: "Hospital consultant" },
    { value: "gp_partner", label: "GP partner" },
    { value: "other", label: "Other" },
  ],
  tiers: [
    {
      id: "locum_sa",
      name: "Locum Self Assessment",
      price: "£29",
      priceValue: 29,
      description: "Self assessment for locum work, with every allowable expense claimed.",
      features: [
        "Self assessment prepared and filed",
        "Locum income schedules prepared",
        "Expense review (GMC, indemnity, exams, travel)",
        "Bookkeeping software included",
        "Unlimited email support",
      ],
    },
    {
      id: "locum_ltd",
      name: "Locum Limited Company",
      price: "£59",
      priceValue: 59,
      featured: true,
      description: "Full compliance for locums trading through a limited company.",
      features: [
        "Year-end accounts and CT600 filed",
        "Confirmation statement filed",
        "One director self assessment",
        "Dividend paperwork prepared",
        "Engagement records kept IR35-ready",
        "Bookkeeping software included",
        "Unlimited email support",
      ],
    },
    {
      id: "gp_consultant",
      name: "GP and Consultant",
      price: "£99",
      priceValue: 99,
      description: "For doctors with NHS, private and locum income streams to keep straight.",
      features: [
        "Self assessment across multiple income sources",
        "Private practice accounts prepared",
        "GP pension certificates prepared (Type 1 and Type 2)",
        "Bookkeeping software included",
        "Priority response",
      ],
    },
  ],
  advisory: {
    fromPrice: "from £395",
    blurb:
      "One-off planning and structural work for doctors, scoped and priced before anything starts. Pension advice itself is regulated; we prepare the figures and signpost an IFA where needed.",
    projectTypes: [
      "NHS pension annual allowance review",
      "Limited company setup",
      "Private practice incorporation",
      "Partnership changes",
      "Something else",
    ],
  },
};
