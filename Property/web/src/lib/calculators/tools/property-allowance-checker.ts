import type { GenericTool } from "../types";
import { gbp } from "../format";

const RATES: Record<string, number> = { basic: 0.2, higher: 0.4, additional: 0.45 };
const PROPERTY_ALLOWANCE = 1_000;

export const propertyAllowanceChecker: GenericTool = {
  kind: "generic",
  slug: "property-allowance-checker",
  name: "Property Allowance Checker",
  category: "Income tax",
  oneLiner:
    "Whether your property income is covered by the £1,000 property allowance, or whether the allowance or actual expenses leave you with less tax.",
  metaTitle: "£1,000 Property Allowance Checker | UK Landlords (2026/27)",
  metaDescription:
    "Free property allowance checker. See whether your rental income is covered by the £1,000 property allowance, and whether the allowance or actual expenses give you the lower tax bill.",
  intro:
    "Check whether the £1,000 property allowance covers your rental income, or whether claiming it beats claiming your actual expenses.",
  ctaLabel: "Not sure what to declare? Ask us →",
  embedHeight: 640,
  fields: [
    { id: "grossIncome", label: "Gross property income", type: "currency", default: 2_500, step: 250 },
    {
      id: "expenses",
      label: "Actual allowable expenses",
      type: "currency",
      default: 600,
      step: 100,
      help: "Used only if you claim actual expenses instead of the £1,000 allowance.",
    },
    {
      id: "band",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute: (v) => {
    const rate = RATES[String(v.band)] ?? 0.4;
    const income = Number(v.grossIncome);
    const expenses = Number(v.expenses);

    if (income <= PROPERTY_ALLOWANCE) {
      return {
        headline: { label: "Tax on this property income", value: gbp(0), tone: "good" },
        verdict: { text: "Covered by the £1,000 allowance", positive: true },
        note: "Your gross property income is £1,000 or less, so it is covered by the property allowance. It is tax-free and you usually do not need to declare it.",
      };
    }

    const allowanceTaxable = income - PROPERTY_ALLOWANCE;
    const actualTaxable = Math.max(0, income - expenses);
    const allowanceTax = allowanceTaxable * rate;
    const actualTax = actualTaxable * rate;
    const useAllowance = allowanceTax <= actualTax;
    const best = Math.min(allowanceTax, actualTax);
    return {
      headline: {
        label: "Tax on your property income",
        value: gbp(best),
        sub: `Best method: ${useAllowance ? "£1,000 allowance" : "actual expenses"}`,
      },
      rows: [
        { label: "Using the £1,000 allowance", value: gbp(allowanceTax) },
        { label: "Using actual expenses", value: gbp(actualTax) },
        { label: "You would pay", value: gbp(best), strong: true },
      ],
      note: "You can deduct either the £1,000 property allowance or your actual expenses, not both. The allowance usually wins when your expenses are under £1,000. It cannot be used against income from a company you are connected with, or alongside rent-a-room relief on the same income.",
    };
  },
  explainer: {
    heading: "How the £1,000 property allowance works",
    paragraphs: [
      "The property allowance gives every individual £1,000 of tax-free property income a year. If your gross rental income for the year is £1,000 or less, it is exempt and you generally do not need to report it at all, which is useful for occasional or very small lettings.",
      "If you earn more than £1,000, you choose between two ways of working out the taxable amount. You can claim the £1,000 allowance and pay tax on the rest, or you can ignore the allowance and deduct your actual allowable expenses instead. You cannot do both, so the better option depends on whether your real expenses are above or below £1,000.",
      "For a landlord with meaningful costs, repairs, letting fees, insurance and the like, actual expenses usually beat the flat £1,000. For someone with very low costs, such as a driveway or storage let, the allowance is simpler and often gives the lower bill.",
      "There are some restrictions. The allowance cannot be used against income from a company you or a connected person controls, and not at the same time as rent-a-room relief on the same income. If in doubt, we can check what you need to declare.",
    ],
  },
  faqs: [
    {
      question: "Do I need to declare rental income under £1,000?",
      answer:
        "Generally no. If your gross property income for the year is £1,000 or less, the property allowance makes it tax-free and you usually do not need to report it. Above £1,000 you do need to declare it.",
    },
    {
      question: "Can I claim the £1,000 allowance and my expenses?",
      answer:
        "No. You claim either the £1,000 property allowance or your actual allowable expenses, whichever gives the lower taxable figure, but not both in the same year.",
    },
    {
      question: "When is the property allowance worth using?",
      answer:
        "When your actual allowable expenses are less than £1,000. If your real costs are higher, claiming actual expenses usually gives a lower tax bill than the flat allowance.",
    },
  ],
};
