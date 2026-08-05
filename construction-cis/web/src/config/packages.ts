import type { PackagesConfig } from "@accounting-network/web-shared/pricing/types";
import { siteConfig } from "./site";

export const packages: PackagesConfig = {
  consentText: siteConfig.leadConsentText,
  businessTypes: [
    { value: "subcontractor", label: "CIS subcontractor" },
    { value: "contractor", label: "Contractor" },
    { value: "sole_trader", label: "Sole trader" },
    { value: "ltd_co", label: "Limited company" },
    { value: "other", label: "Other" },
  ],
  tiers: [
    {
      id: "subbie",
      name: "Subcontractor",
      price: "£24",
      priceValue: 24,
      description: "Self assessment with your CIS refund claimed in full, filed fast.",
      features: [
        "Self assessment prepared and filed",
        "CIS refund claimed for you",
        "CIS deduction statements reconciled",
        "Expense review (tools, travel, PPE)",
        "Bookkeeping software included",
        "Unlimited email support",
      ],
    },
    {
      id: "contractor",
      name: "CIS Contractor",
      price: "£49",
      priceValue: 49,
      featured: true,
      description: "Monthly CIS run properly, with your own tax handled too.",
      features: [
        "Monthly CIS300 returns filed",
        "Subcontractor verification handled",
        "Deduction statements issued to your subbies",
        "Self assessment prepared and filed",
        "Bookkeeping software included",
        "Unlimited email support",
      ],
    },
    {
      id: "trade_ltd",
      name: "Trade Limited Company",
      price: "£79",
      priceValue: 79,
      description: "Full compliance for a trade limited company inside and outside CIS.",
      features: [
        "Year-end accounts and CT600 filed",
        "One director self assessment",
        "CIS deductions reclaimed through payroll",
        "VAT returns including domestic reverse charge",
        "Payroll for up to 3 people",
        "Priority response",
      ],
    },
  ],
  addOnNote: "Extra subcontractors on your CIS300 +£2 per month each.",
  advisory: {
    fromPrice: "from £395",
    blurb: "One-off planning and structural work for the trades, scoped and priced before anything starts.",
    projectTypes: [
      "Incorporation review",
      "Gross payment status application",
      "VAT domestic reverse charge setup",
      "Capital gains on a property sale",
      "Something else",
    ],
  },
};
