import type { PackagesConfig } from "@accounting-network/web-shared/pricing/types";
import { siteConfig } from "@/config/site";

export const packages: PackagesConfig = {
  consentText: `${siteConfig.leadConsentText} See our Privacy Policy.`,
  businessTypes: [
    { value: "individual_landlord", label: "Individual landlord" },
    { value: "portfolio_landlord", label: "Portfolio landlord (4 to 10 properties)" },
    { value: "large_portfolio", label: "Large portfolio (10+ properties)" },
    { value: "non_resident", label: "Non-resident landlord" },
    { value: "property_company", label: "Property company director" },
    { value: "other", label: "Other" },
  ],
  tiers: [
    {
      id: "landlord_sa",
      name: "Landlord Self Assessment",
      price: "£29",
      priceValue: 29,
      description: "Self assessment done properly for landlords with up to 3 properties.",
      features: [
        "Self assessment prepared and filed",
        "Property income schedules for up to 3 properties",
        "Mortgage interest relief handled correctly (Section 24)",
        "Expense and allowance review",
        "MTD-ready bookkeeping software",
        "Unlimited email support",
      ],
    },
    {
      id: "portfolio",
      name: "Portfolio Landlord",
      price: "£59",
      priceValue: 59,
      featured: true,
      description: "For portfolio and non-resident landlords with more moving parts.",
      features: [
        "Everything in Landlord Self Assessment",
        "Unlimited properties on your return",
        "Non-resident landlord returns (NRL scheme)",
        "Joint owner income splits handled",
        "Capital gains computation on one disposal per year",
        "Deadline reminders all year",
      ],
    },
    {
      id: "property_ltd",
      name: "Property Limited Company",
      price: "£99",
      priceValue: 99,
      description: "Full statutory compliance for a property company.",
      features: [
        "Year-end accounts and CT600 filed",
        "Confirmation statement filed",
        "ATED check and return where needed",
        "One director self assessment",
        "Dividend paperwork prepared",
        "Priority response",
      ],
    },
  ],
  addOnNote: "Extra self assessments for joint owners +£10 per month each.",
  qualifier: {
    label: "How many properties do you have?",
    options: [
      { value: "1-3", label: "1 to 3", recommend: "landlord_sa" },
      { value: "4-10", label: "4 to 10", recommend: "portfolio" },
      { value: "11+", label: "More than 10", recommend: "portfolio" },
      { value: "non_resident", label: "I live abroad", recommend: "portfolio" },
      { value: "company", label: "In a limited company", recommend: "property_ltd" },
    ],
  },
  advisory: {
    fromPrice: "from £495",
    blurb:
      "One-off planning and structural work for landlords, scoped and priced as a fixed quote before anything starts.",
    projectTypes: [
      "Incorporation review (Section 162)",
      "SDLT question on a purchase",
      "Capital gains and disposal planning",
      "Inheritance and gifting structure",
      "Non-resident landlord setup",
      "Something else",
    ],
  },
};
