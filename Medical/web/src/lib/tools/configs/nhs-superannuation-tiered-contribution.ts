import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import {
  calcNHSSuperTieredContribution,
  type MarginalBand,
} from "@/lib/tools/compute/nhs-superannuation-tiered-contribution";

const ROLE_PAY_HELP: Record<string, string> = {
  "salaried-gp":
    "Enter your NHS pensionable pay (your contracted salary, not total earnings). This appears on your NHSBSA statement.",
  "gp-partner":
    "Enter your superannuable profit as a GP partner. This is your net NHS income after practice expenses but before superannuation. You report this on Form B each July.",
  "gp-locum":
    "Enter your total superannuable earnings across all locum sessions in the year. You report these on Form A for each practice, then carry the total to Form B.",
  officer:
    "Enter your NHS pensionable pay as shown on your NHSBSA Pensions Annual Benefit Statement.",
};

export const nhsSuperannuationTieredContributionTool: GenericTool = {
  kind: "generic",
  slug: "nhs-superannuation-tiered-contribution",
  name: "NHS Superannuation Contribution Calculator",
  category: "NHS Pension",
  oneLiner:
    "Pensionable pay or GP superannuable profit in, your 2026/27 tiered NHS Pension employee contribution out, plus the 23.7% credited on your behalf and your net cost after tax relief.",
  embedHeight: 560,
  metaTitle: "NHS Superannuation Contribution Calculator 2026/27 | GP, Locum & Hospital Tiers",
  metaDescription:
    "Free NHS superannuation calculator for 2026/27. Enter NHS pensionable pay or GP superannuable profit to get your tiered employee contribution, the 23.7% credited on your behalf, and your net cost after tax relief. Covers salaried GPs, GP partners, locums and hospital doctors.",

  intro:
    "The NHS Pension Scheme charges a tiered employee contribution based on your total pensionable pay or superannuable profit for the year. This calculator applies the 2026/27 NHSBSA tier table, shows the deemed employer contribution (23.7%) credited on your behalf, and estimates your net cost after income-tax relief. GP partners and locums can use the result to complete Form A or Form B. It does not work out your Annual Allowance position: that test uses the pension input amount from your NHSBSA annual allowance statement, not these contributions.",

  fields: [
    {
      id: "role",
      label: "Your role",
      type: "select",
      default: "gp-partner",
      options: [
        { value: "salaried-gp", label: "Salaried GP" },
        { value: "gp-partner", label: "GP partner (self-employed)" },
        { value: "gp-locum", label: "GP locum" },
        { value: "officer", label: "Officer (hospital doctor / consultant)" },
      ],
      help: "GP partners and locums enter superannuable profit; salaried and hospital doctors enter NHS pensionable pay.",
    },
    {
      id: "pensionablePay",
      label: "Pensionable pay / superannuable profit (annual)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "GP partners and locums: superannuable profit, not gross turnover. Salaried and hospital doctors: NHS pensionable pay from your payslip or NHSBSA statement.",
    },
    {
      id: "incomeTaxBand",
      label: "Your marginal income tax rate",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
      help: "Used only for the net-of-relief line. Relief is given via self-assessment or PAYE, not deducted here.",
    },
  ],

  compute(values) {
    const pensionablePay = Number(values.pensionablePay);
    const role = String(values.role);
    const incomeTaxBand = String(values.incomeTaxBand) as MarginalBand;

    const r = calcNHSSuperTieredContribution({ pensionablePay, incomeTaxBand });

    const ratePct = `${(r.tierRate * 100).toFixed(1)}%`;

    const rows = [
      { label: "Applicable tier", value: r.tierLabel },
      {
        label: `Employee contribution (${ratePct} of ${gbp(pensionablePay)})`,
        value: gbp(r.employeeContribution),
        strong: true as const,
      },
      {
        label: `Deemed employer contribution (23.7% of ${gbp(pensionablePay)})`,
        value: gbp(r.deemedEmployerContribution),
      },
      {
        label: "Total contributions credited this year (not your pension input amount)",
        value: gbp(r.combinedPensionInput),
      },
      {
        label: `Net cost after ${Math.round(r.marginalRate * 100)}% income-tax relief`,
        value: gbp(r.netOfReliefCost),
      },
    ];

    const roleNote = ROLE_PAY_HELP[role] ?? ROLE_PAY_HELP["gp-partner"];

    return {
      headline: {
        label: "Employee contribution",
        value: gbp(r.employeeContribution),
        sub: `${r.tierLabel} · deemed employer ${gbp(r.deemedEmployerContribution)}`,
        tone: "good" as const,
      },
      rows,
      note:
        "2026/27 NHSBSA tiered contribution rates (England and Wales). The tier is set by your total pensionable pay for the year and the rate applies to the whole amount, not just the slice above each threshold. " +
        roleNote +
        " The deemed employer contribution (23.7%) is money credited on your behalf, not a figure you use for the Annual Allowance taper. Adjusted income is threshold income plus your pension input amount for the year across all registered schemes, which for the NHS scheme is the capitalised growth in your accrued benefits and reaches you on an NHSBSA annual allowance statement. Contributions paid in are not the same number. Use the NHS Pension Annual Allowance Calculator with your statement figure to test the taper. These are estimates, not advice.",
    };
  },

  explainer: {
    heading: "How NHS superannuation contributions are calculated",
    paragraphs: [
      "The NHS Pension Scheme uses a tiered contribution structure where the rate you pay depends on your total pensionable pay or superannuable profit for the year. Unlike income tax, the same rate applies to your whole pay, not just the slice above each threshold. For 2026/27, the tiers run from 5.2% on pay up to £13,259 through to 12.5% on pay of £67,669 and above. The NHSBSA reviews the thresholds each April alongside the pay uplift; the six contribution rates are unchanged from 2025/26, with only the pay-band thresholds uplifted by CPI.",
      "What counts as pensionable pay depends on your role. Salaried GPs and hospital doctors use their NHS pensionable pay (the contracted figure on payslips and the NHSBSA annual benefit statement). GP partners and locums pay contributions on superannuable profit, which is broadly net NHS income after practice expenses but before the superannuation deduction itself, not gross turnover or total drawings. Partners report this figure on Form B each July; locums declare per-session earnings on Form A for each practice and carry the total to Form B.",
      "Alongside your employee contribution, 23.7% of pensionable pay is credited on your behalf (the NHSBSA rate from 1 April 2024, unchanged for 2026/27), of which an employer bears 14.38% and 9.4% is funded centrally. It is real money towards your benefits, but it is not a figure you put into the Annual Allowance taper test. Adjusted income is threshold income plus your pension input amount for the year across every registered scheme you belong to, and for a defined-benefit scheme such as the NHS scheme the pension input amount is the capitalised growth in your accrued benefits, not the contributions paid in. NHSBSA sends that figure on an annual allowance statement. If threshold income exceeds £200,000 and adjusted income exceeds £260,000, the Annual Allowance tapers from £60,000 towards a £10,000 floor. Take your statement figure into the NHS Pension Annual Allowance Calculator to test it.",
      "The total credited figure shown by this tool is the employee plus deemed employer contributions added together. It is what goes into the scheme, and it is not your pension input amount. The pension input amount for Annual Allowance purposes is the capitalised growth in your defined-benefit entitlement, calculated by NHS Pensions using a standard multiplier (16x for the 2015 CARE scheme), and it can differ materially from the contributions paid. A large pay rise or a jump in pensionable service can produce a big input amount in a year when cash income barely moved, which is how doctors get caught unexpectedly. Always work from your NHSBSA pension savings statement before concluding anything about an Annual Allowance breach.",
      "Worked example: a GP partner with superannuable profit of £120,000 in 2026/27. £120,000 sits in the top tier (£67,669 and above), so the employee rate is 12.5% on the whole amount: £120,000 x 12.5% = £15,000. The deemed employer contribution credited on their behalf is £120,000 x 23.7% = £28,440, so £43,440 in total goes into the scheme for the year. As a higher-rate taxpayer the partner receives 40% income-tax relief on the £15,000 employee contribution via self-assessment, so the net cost is £15,000 x 60% = £9,000. None of these figures is the pension input amount for the Annual Allowance; that comes from the NHSBSA statement.",
      "Employee contributions attract income-tax relief at your marginal rate. GP partners and locums claim it through self-assessment; salaried doctors normally receive it automatically because NHS payroll deducts contributions under a net-pay arrangement before tax is calculated. Note also the cliff-edge effect of the stepped structure: because the rate applies to your whole pay, a small pay rise that pushes you over a tier threshold increases the rate on everything, not just the extra slice. Pay of £67,668 attracts 10.7% (£7,240 or so), while £67,669 attracts 12.5% (£8,459), a jump of over £1,200 for £1 of extra pay.",
    ],
  },

  faqs: [
    {
      question: "Does the tier rate apply to all my pay or just the part above the threshold?",
      answer:
        "All of it. NHS superannuation is a stepped charge, not a marginal one like income tax. Your total pensionable pay for the year determines a single tier, and that tier's rate applies to the whole amount. This is why crossing a tier threshold by even £1 can increase your annual contribution by a four-figure sum: the higher rate is charged on everything, not just the slice above the threshold.",
    },
    {
      question: "What figure do I enter as a GP partner or locum?",
      answer:
        "Your superannuable profit, not gross turnover or drawings. For partners this is broadly your net NHS income after practice expenses but before the superannuation deduction, reported on Form B each July. Locums declare superannuable earnings for each practice on Form A (usually 90% of the invoiced fee, with 10% treated as an expense allowance) and carry the annual total to Form B. If you also have non-NHS private income, exclude it; only NHS income is superannuable.",
    },
    {
      question: "What is the deemed employer contribution and why do I care?",
      answer:
        "It is the 23.7% of pensionable pay credited on your behalf (the NHSBSA rate from 1 April 2024), of which an employer bears 14.38% and 9.4% is funded centrally. You never see it in your pay, and it is worth knowing because it is a large part of what your NHS post is really worth. It is not, however, the figure HMRC's Annual Allowance taper test uses. That test compares threshold income with £200,000 and adjusted income with £260,000, and adjusted income is threshold income plus your pension input amount for the year, which for the NHS scheme is the capitalised growth in your accrued benefits shown on your NHSBSA annual allowance statement. Adding 23.7% of pay instead will give you the wrong answer in either direction.",
    },
    {
      question: "Is the combined figure my pension input amount for Annual Allowance purposes?",
      answer:
        "No. The combined figure here is just employee plus deemed employer contributions, which tells you what goes into the scheme, not what HMRC measures. For a defined-benefit scheme like the NHS Pension, the pension input amount is the capitalised growth in your accrued entitlement over the year, calculated by NHS Pensions using a 16x multiplier on the increase in annual pension, and it can be far higher or lower than the contributions paid. Request or check your NHSBSA pension savings statement for the real number, then use the NHS Pension Annual Allowance Calculator, before acting on any Annual Allowance concern.",
    },
    {
      question: "How do I get tax relief on my contributions?",
      answer:
        "At your marginal income-tax rate. Salaried GPs and hospital doctors get relief automatically: contributions are deducted under a net-pay arrangement before payroll calculates income tax. GP partners and locums pay contributions gross (deducted from drawings at source for partners, or paid over with Form B for locums) and claim the relief through self-assessment. A higher-rate taxpayer contributing £15,000 has a true net cost of £9,000 after 40% relief. No National Insurance is charged on employee pension contributions either, which adds a further saving for self-employed doctors paying Class 4 NI.",
    },
    {
      question: "Which tier table does this calculator use, and does it cover Scotland and Northern Ireland?",
      answer:
        "It uses the 2026/27 NHSBSA tier table for England and Wales, effective from 1 April 2026. The six rates (5.2% to 12.5%) are unchanged from 2025/26; only the pay-band thresholds were uplifted in line with CPI, apart from the Tier 1 upper limit which is frozen. Scotland (SPPA) and Northern Ireland (HSC) run their own schemes with similar but not identical tier tables, so if you are in either of those schemes treat the result as indicative and check the relevant administrator's published rates.",
    },
  ],

  related: [
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
    {
      label: "Locum Doctor Tax Calculator",
      href: "/calculators/locum-tax-calculator",
    },
  ],
};
