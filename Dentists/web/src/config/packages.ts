import type { PackagesConfig } from "@accounting-network/web-shared/pricing/types";
import { siteConfig } from "./site";

export const packages: PackagesConfig = {
  consentText: `${siteConfig.leadConsentText}`,
  businessTypes: [
    { value: "associate", label: "Associate dentist" },
    { value: "practice_owner", label: "Practice owner" },
    { value: "hygienist", label: "Hygienist or therapist" },
    { value: "locum", label: "Locum dentist" },
    { value: "other", label: "Other" },
  ],
  tiers: [
    {
      id: "associate_sa",
      name: "Associate Self Assessment",
      price: "£29",
      priceValue: 29,
      description:
        "Self assessment done properly for associates, with dental-specific expenses claimed in full.",
      features: [
        "Self assessment prepared and filed",
        "Associate expense review (GDC, indemnity, courses)",
        "NHS pension contributions reflected correctly",
        "Bookkeeping software included",
        "Unlimited email support",
      ],
    },
    {
      id: "associate_ltd",
      name: "Associate Limited Company",
      price: "£59",
      priceValue: 59,
      featured: true,
      description: "Full compliance for associates trading through a limited company.",
      features: [
        "Year-end accounts and CT600 filed",
        "Confirmation statement filed",
        "One director self assessment",
        "Dividend paperwork prepared",
        "Bookkeeping software included",
        "Deadline reminders all year",
        "Unlimited email support",
      ],
    },
    {
      id: "practice",
      name: "Practice Compliance",
      price: "£119",
      priceValue: 119,
      description: "Statutory compliance for a practice, with payroll handled.",
      features: [
        "Practice accounts and CT600 filed",
        "Payroll for up to 5 staff",
        "Two director or partner self assessments",
        "Bookkeeping software included",
        "Priority response",
      ],
    },
  ],
  addOnNote: "Extra payroll employees +£5 per month each.",
  advisory: {
    fromPrice: "from £395",
    blurb:
      "One-off planning and structural work for dentists, scoped and priced before anything starts.",
    projectTypes: [
      "Practice purchase or sale support",
      "Incorporation review",
      "NHS pension annual allowance check",
      "Partnership changes",
      "Something else",
    ],
  },
};
