import type { GenericTool } from "../types";
import { gbp } from "../format";
import { corporationTax } from "@/lib/corpTax";
import { computeDividendTax } from "@/lib/dividendTax";
import { employerNic } from "@/lib/employerNic";

/**
 * Salary vs dividend extraction from a property company, 2026/27 only.
 * Engines reused: corporationTax(), computeDividendTax(), employerNic().
 * The three income-tax band figures are redeclared from dividendTax.ts (the
 * source of truth for them in this codebase) because that file deliberately
 * keeps them private; the golden block pins them against drift.
 * ponytail: single tax year, no employee NIC, no Employment Allowance, no
 * best-mix solver — the two draw fields let the user compare mixes by hand.
 */
const PERSONAL_ALLOWANCE = 12_570; // per dividendTax.ts
const BASIC_RATE_TOP = 50_270;
const HIGHER_RATE_TOP = 125_140;

/** Banded income tax (20/40/45) on salary stacked on other income. PA taper above £100,000 ignored, flagged in the note. */
export function salaryIncomeTax(salary: number, otherIncome: number): number {
  const s = Math.max(0, salary);
  const other = Math.max(0, otherIncome);
  const tax = (total: number): number => {
    const taxable = Math.max(0, total - PERSONAL_ALLOWANCE);
    const basic = Math.min(taxable, BASIC_RATE_TOP - PERSONAL_ALLOWANCE);
    const higher = Math.min(Math.max(0, taxable - basic), HIGHER_RATE_TOP - BASIC_RATE_TOP);
    const additional = Math.max(0, taxable - basic - higher);
    return basic * 0.2 + higher * 0.4 + additional * 0.45;
  };
  // Salary is taxed as the slice above the other income.
  return tax(other + s) - tax(other);
}

export const propertyCompanyExtractionCalculator: GenericTool = {
  kind: "generic",
  slug: "property-company-extraction-calculator",
  name: "Property Company Extraction Calculator",
  category: "Incorporation",
  oneLiner:
    "The tax cost of paying yourself from a property company: salary, dividends, or a mix, at 2026/27 rates.",
  metaTitle: "Property Company Extraction Calculator | Salary vs Dividends",
  metaDescription:
    "Work out the tax on taking money out of your property company in 2026/27: Corporation Tax, employer NIC, salary tax and dividend tax on your own mix.",
  intro:
    "Enter your company's profit and the salary and dividends you plan to draw, and see every layer of tax the mix triggers, company-side and personal.",
  ctaLabel: "Want the extraction plan done properly? Talk to us →",
  embedHeight: 780,
  fields: [
    {
      id: "companyProfit",
      label: "Company profit before extraction",
      type: "currency",
      default: 60_000,
      help: "Rental profit after allowable costs, before Corporation Tax and before any salary.",
    },
    {
      id: "salaryDrawn",
      label: "Salary drawn (gross)",
      type: "currency",
      default: 12_570,
      help: "Paid as a company expense before Corporation Tax. Employer NIC applies above £5,000.",
    },
    {
      id: "dividendDrawn",
      label: "Dividends drawn",
      type: "currency",
      default: 20_000,
      help: "Paid from post-tax company profit and taxed personally on top.",
    },
    {
      id: "otherPersonalIncome",
      label: "Your other personal income",
      type: "currency",
      default: 0,
      help: "Income outside the company (employment, pension, other rents). Sets your starting tax band.",
    },
  ],
  compute: (v) => {
    const profit = Math.max(0, Number(v.companyProfit) || 0);
    const salary = Math.max(0, Number(v.salaryDrawn) || 0);
    const dividends = Math.max(0, Number(v.dividendDrawn) || 0);
    const otherIncome = Math.max(0, Number(v.otherPersonalIncome) || 0);

    // Company side: salary and the employer NIC on it are both deductible
    // before Corporation Tax.
    const nic = employerNic(salary);
    const profitAfterSalaryAndNic = Math.max(0, profit - salary - nic);
    const ct = corporationTax(profitAfterSalaryAndNic);
    const availableForDividends = Math.max(0, profitAfterSalaryAndNic - ct);
    const overdrawn = dividends > availableForDividends;

    // Personal side: salary uses the bands first, dividends stack on top.
    const salaryTax = salaryIncomeTax(salary, otherIncome);
    const div = computeDividendTax({ otherIncome: otherIncome + salary, dividends });

    const totalCompanyTax = ct + nic;
    const totalPersonalTax = salaryTax + div.tax;
    const totalTax = totalCompanyTax + totalPersonalTax;
    const drawn = salary + dividends;
    const netInHand = drawn - totalPersonalTax;
    const effectiveRate = drawn > 0 ? (totalTax / drawn) * 100 : 0;

    return {
      headline: {
        label: "Net in your hand",
        value: gbp(netInHand),
        sub: `Total tax across all layers ${gbp(totalTax)} (${effectiveRate.toFixed(1)}% of the ${gbp(drawn)} drawn)`,
      },
      rows: [
        { label: "Employer NIC on the salary (15% above £5,000)", value: gbp(nic) },
        { label: "Corporation Tax after salary and NIC deducted", value: gbp(ct) },
        { label: "Company profit left for dividends", value: gbp(availableForDividends), strong: true },
        { label: "Income tax on the salary", value: gbp(salaryTax) },
        { label: "Dividend tax (10.75% / 35.75% / 39.35%)", value: gbp(div.tax) },
        { label: "Total tax, company and personal", value: gbp(totalTax), strong: true },
      ],
      note:
        (overdrawn
          ? `Warning: you are drawing ${gbp(dividends)} of dividends but the company only has ${gbp(availableForDividends)} of post-tax profit available on these figures. Dividends above distributable profit are unlawful. `
          : "") +
        "2026/27 rates. A salary up to the £12,570 personal allowance costs no income tax but does attract employer NIC above £5,000, and both the salary and that NIC reduce the Corporation Tax bill. Simplifications: employee NIC, the personal-allowance taper above £100,000 and the Employment Allowance (which most single-director companies cannot claim) are not modelled. Try different mixes in the two draw fields to compare routes.",
    };
  },
  explainer: {
    heading: "How money leaves a property company, and what each route costs",
    paragraphs: [
      "A property company's profit is not your money until you extract it, and each route is taxed differently. Salary is a company expense: it reduces the profit before Corporation Tax, but the company pays employer National Insurance at 15% on the amount above £5,000, and you pay income tax on it personally at 20%, 40% or 45% depending on where it lands in your bands.",
      "Dividends work the other way round. They come out of profit that has already suffered Corporation Tax (19% up to £50,000, 25% from £250,000, marginal relief between), and you then pay dividend tax personally at 10.75%, 35.75% or 39.35% for 2026/27, after the £500 dividend allowance. Dividends are treated as the top slice of your income, so salary and other income fill the bands first.",
      "The common pattern for a single-director property company is a salary around the personal allowance plus dividends for the rest, but the right mix depends on your other income, pension plans and whether the company needs to retain profit for the next purchase. This tool shows every layer for the mix you type in; it does not pick a mix for you, and it deliberately leaves out employee NIC and the personal-allowance taper, which can shift the answer at the margins.",
    ],
  },
  faqs: [
    {
      question: "Is it better to take salary or dividends from a property company?",
      answer:
        "Usually a mix. A salary up to the £12,570 personal allowance costs little tax and reduces Corporation Tax, though employer NIC applies above £5,000. Dividends avoid NIC entirely but are paid from post-Corporation-Tax profit and taxed again personally. Your other income decides where each pound lands, which is what this calculator shows.",
    },
    {
      question: "How much tax do I pay on dividends from my property company in 2026/27?",
      answer:
        "After the £500 dividend allowance: 10.75% in the basic-rate band, 35.75% in the higher-rate band and 39.35% above £125,140. Dividends stack on top of your salary and other income, so a higher-rate taxpayer pays 35.75% from the first taxable pound of dividend.",
    },
    {
      question: "Can I take more in dividends than the company has made?",
      answer:
        "No. Dividends can only lawfully be paid from accumulated distributable profits after Corporation Tax. Draw more and the excess is an unlawful distribution, usually treated as a director's loan with its own tax charge. The calculator warns you when your dividend figure exceeds the profit available on the numbers entered.",
    },
  ],
};
