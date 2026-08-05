import type { PackagesConfig } from "@accounting-network/web-shared/pricing/types";
import { siteConfig } from "./site";

export const packages: PackagesConfig = {
  consentText: siteConfig.leadConsentText,
  businessTypes: [
    { value: "sole_trader", label: "Sole trader" },
    { value: "ltd_director", label: "Limited company director" },
    { value: "landlord", label: "Landlord" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" },
  ],
  tiers: [
    {
      id: "sole_trader",
      name: "Sole Trader",
      price: "£24",
      priceValue: 24,
      description:
        "Everything a sole trader needs to stay compliant, filed on time by a specialist.",
      features: [
        "Self assessment prepared and filed",
        "Bookkeeping software included",
        "Expense and allowance review",
        "HMRC correspondence handled",
        "Unlimited email support",
      ],
    },
    {
      id: "ltd_co",
      name: "Limited Company",
      price: "£49",
      priceValue: 49,
      featured: true,
      description: "Full statutory compliance for a limited company with one director.",
      features: [
        "Year-end accounts prepared and filed",
        "Corporation tax return (CT600)",
        "Confirmation statement filed",
        "One director self assessment",
        "Bookkeeping software included",
        "Deadline reminders all year",
        "Unlimited email support",
      ],
    },
    {
      id: "ltd_plus",
      name: "Limited Company Plus",
      price: "£89",
      priceValue: 89,
      description: "Compliance plus VAT and payroll handled for a growing company.",
      features: [
        "Everything in Limited Company",
        "Quarterly VAT returns filed",
        "Director payroll (up to 2 people)",
        "Quarterly bookkeeping review",
        "Priority response",
      ],
    },
  ],
  addOnNote: "Extra director self assessments +£10 per month each.",
  advisory: {
    fromPrice: "from £395",
    blurb:
      "One-off tax planning and structural work, scoped and priced before anything starts. Ideal when you need an answer or a change, not an ongoing service.",
    projectTypes: [
      "Company incorporation",
      "Tax review before year end",
      "Capital gains on a property or share sale",
      "Payroll or VAT registration and setup",
      "Something else",
    ],
  },
};
