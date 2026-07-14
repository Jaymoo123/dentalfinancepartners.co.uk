import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

/**
 * EMI vs unapproved vs growth shares comparison calculator.
 *
 * All rates are HP-anchored (docs/startups-tech/house_positions.md, 2026-07-14/15):
 *   HP12  — EMI: no income tax at grant or at exercise (when EX >= AMV).
 *   HP16  — s.431 election, 14 days, growth shares.
 *   HP17  — growth shares + unapproved: general ERS rules (IT + NIC where relevant).
 *   HP18  — BADR 18% from 6 Apr 2026; EMI qualifies on 2-year rule, no 5% test.
 *   HP19  — CGT main rates: 18% within basic band, 24% above.
 *   HP23  — employer NIC 15% above £5,000 secondary threshold.
 *   HP30  — income tax bands 2026/27 (basic 20% / higher 40% / additional 45%).
 *   HP31  — employee primary NIC: 8% PT £12,570 to UEL £50,270, 2% above UEL.
 *
 * ponytail:
 *   - Employer NIC on unapproved modelled as flat 15% of option gain (HP23). The £5,000
 *     secondary threshold is annual/per-employee and is not modelled per-grant; state this.
 *   - Unapproved column uses "exercise at exit / cashless" assumption (HP17): the full
 *     (EXIT - EX) gain is treated as an employment income charge at exercise; post-exercise
 *     CGT is nil. State this assumption in the note.
 *   - Employee NIC on unapproved computed from HP31 rates applied to the option gain as a
 *     standalone amount (ignores existing salary band consumption). Flag as estimate.
 *   - Growth shares: acquisitionValue defaults to 0 with a note; CGT uses standard 18%/24%
 *     (HP19), no auto-BADR (HP18 covers EMI shares specifically).
 */

// HP30: income tax bands 2026/27 rUK
const BAND_RATES: Record<string, number> = {
  "0.20": 0.20,
  "0.40": 0.40,
  "0.45": 0.45,
};

// HP18: BADR rate from 6 Apr 2026
const BADR_RATE = 0.18;

// HP19: CGT main rates (shares)
const CGT_BASIC = 0.18;
const CGT_HIGHER = 0.24;

// HP23: employer NIC rate (flat model, see ponytail note above)
const EMPLOYER_NIC_RATE = 0.15;

// HP31: employee primary Class 1 NIC
const EMP_NIC_PT = 12570;
const EMP_NIC_UEL = 50270;
const EMP_NIC_MAIN = 0.08;
const EMP_NIC_UPPER = 0.02;

/** Employee NIC on a standalone earnings amount (HP31). */
function employeeNicOnGain(gain: number): number {
  const main =
    Math.min(Math.max(gain - EMP_NIC_PT, 0), EMP_NIC_UEL - EMP_NIC_PT) * EMP_NIC_MAIN;
  const upper = Math.max(gain - EMP_NIC_UEL, 0) * EMP_NIC_UPPER;
  return main + upper;
}

/** CGT rate by salary band (proxy for basic/higher position). HP19. */
function cgtRate(band: number): number {
  return band <= 0.20 ? CGT_BASIC : CGT_HIGHER;
}

export const emiVsUnapprovedCalculator: GenericTool = {
  kind: "generic",
  slug: "emi-vs-unapproved-calculator",
  name: "EMI vs Unapproved Options Calculator 2026/27",
  category: "Share Schemes and EMI",
  oneLiner:
    "Compare the full tax take for EMI options, unapproved options and growth shares: employee income tax, CGT, NIC and the company employer NIC cost.",
  metaTitle: "EMI vs Unapproved Options Tax Calculator UK 2026/27",
  metaDescription:
    "Compare EMI vs unapproved share options and growth shares: employee CGT/income tax, employer NIC and total tax take at 2026/27 rates. Worked three-column comparison.",
  intro:
    "Enter the option terms and exit value. The tool compares the employee tax cost and the company National Insurance cost across EMI, unapproved options and growth shares at 2026/27 rates. All outputs are general guidance; speak to a specialist before granting or exercising options.",
  embedHeight: 560,
  fields: [
    {
      id: "amv",
      label: "Share value at grant (AMV, £)",
      type: "currency",
      default: 1,
      min: 0,
      help:
        "The agreed actual market value per share (or per the whole grant) at the date of grant. Used as the EMI base cost and the growth-share starting point.",
    },
    {
      id: "exercisePrice",
      label: "Exercise price (£)",
      type: "currency",
      default: 1,
      min: 0,
      help:
        "What the employee pays to exercise. For a clean EMI grant, this equals AMV. If below AMV, EMI still produces an income tax charge on the discount.",
    },
    {
      id: "exitValue",
      label: "Exit value (£)",
      type: "currency",
      default: 100000,
      min: 0,
      help:
        "Value of the shares at sale or exit. Unapproved column assumes exercise and sale happen together (cashless exercise). For EMI, this is the disposal proceeds.",
    },
    {
      id: "band",
      label: "Employee marginal income tax rate",
      type: "select",
      options: [
        { value: "0.20", label: "20% basic rate" },
        { value: "0.40", label: "40% higher rate" },
        { value: "0.45", label: "45% additional rate" },
      ],
      default: "0.40",
      help: "Sets the income tax rate on the unapproved exercise charge and the CGT band for growth shares.",
    },
    {
      id: "badr",
      label: "EMI shares held 2+ years at exit (BADR applies)",
      type: "toggle",
      default: true,
      help:
        "When on, the EMI CGT is charged at the 18% BADR rate. EMI shares qualify without the 5% personal-company test. Switch off to see standard CGT instead.",
    },
    {
      id: "growthAcquisitionValue",
      label: "Growth share acquisition value (£, optional)",
      type: "currency",
      default: 0,
      min: 0,
      advanced: true,
      help:
        "The amount paid for growth shares at acquisition (usually a low hope-value). Defaults to 0. A s.431 election within 14 days is needed to lock in this base cost.",
    },
  ],
  compute(v) {
    const amv = Math.max(0, Number(v.amv));
    const ex = Math.max(0, Number(v.exercisePrice));
    const exit = Math.max(0, Number(v.exitValue));
    const band = BAND_RATES[String(v.band)] ?? 0.40;
    const badrOn = Boolean(v.badr);
    const growthAcq = Math.max(0, Number(v.growthAcquisitionValue));

    // --- Column 1: EMI (HP12, HP18, HP19) ---
    // Income tax at exercise: only if EX < AMV (discount)
    const emiDiscountCharge = ex < amv ? (amv - ex) * band : 0;
    // CGT: on gain from EX to EXIT
    const emiGain = Math.max(0, exit - ex);
    let emiCgt: number;
    if (badrOn) {
      emiCgt = emiGain * BADR_RATE; // HP18: 18% with BADR (2-year EMI rule, no 5% test)
    } else {
      emiCgt = emiGain * cgtRate(band); // HP19: 18% basic / 24% higher+
    }
    const emiEmployeeTax = emiDiscountCharge + emiCgt;
    const emiEmployerNic = 0; // HP12: no earnings charge at exercise at AMV, so no employer NIC

    // --- Column 2: Unapproved options (HP17, HP23, HP30, HP31) ---
    // Assumption: exercise at exit (cashless). Full gain = employment income at exercise.
    const unapprovedGain = Math.max(0, exit - ex);
    const unapprovedIt = unapprovedGain * band; // HP30: IT at marginal band
    const unapprovedEmpNic = employeeNicOnGain(unapprovedGain); // HP31: standalone estimate
    const unapprovedEmployerNic = unapprovedGain * EMPLOYER_NIC_RATE; // HP23: flat 15%
    const unapprovedEmployeeTax = unapprovedIt + unapprovedEmpNic; // CGT nil (cashless)

    // --- Column 3: Growth shares with s.431 (HP16, HP17, HP19) ---
    // Income tax at acquisition (on unrestricted MV above amount paid, s.431 HP16)
    const growthItAtAcq = growthAcq > 0 ? growthAcq * band : 0;
    // CGT on exit above acquisition value: standard CGT, NO auto-BADR (HP18 is EMI-specific)
    const growthCgtGain = Math.max(0, exit - growthAcq);
    const growthCgt = growthCgtGain * cgtRate(band); // HP19: 18%/24%
    const growthEmployeeTax = growthItAtAcq + growthCgt;
    const growthEmployerNic = 0; // no exercise event, no earnings charge

    // --- Headline: EMI vs unapproved saving (employee only) ---
    const emiVsUnapprovedSaving = unapprovedEmployeeTax - emiEmployeeTax;

    // Discount note for EMI when EX < AMV
    const emiDiscountNote =
      ex < amv
        ? ` (includes £${Math.round(emiDiscountCharge).toLocaleString("en-GB")} income tax on the £${Math.round(amv - ex).toLocaleString("en-GB")} discount below AMV)`
        : "";

    const badrLabel = badrOn ? "18% BADR (2-yr rule)" : `${Math.round(cgtRate(band) * 100)}% CGT (no BADR)`;

    return {
      headline: {
        label: "EMI vs unapproved: employee tax saving",
        value: gbp(Math.max(0, emiVsUnapprovedSaving)),
        sub: `EMI employee tax ${gbp(emiEmployeeTax)} vs unapproved employee tax ${gbp(unapprovedEmployeeTax)} (income tax + est. employee NIC)`,
        tone: emiVsUnapprovedSaving > 0 ? "good" : "default",
      },
      rows: [
        // EMI column
        { label: "EMI: income tax at exercise", value: emiDiscountCharge > 0 ? gbp(emiDiscountCharge) + emiDiscountNote : "Nil (EX at AMV, HP12)" },
        { label: `EMI: CGT at sale (${badrLabel})`, value: gbp(emiCgt) },
        { label: "EMI: employer NIC cost to company", value: "Nil (no earnings charge, HP12)" },
        { label: "EMI: total employee tax", value: gbp(emiEmployeeTax), strong: true },
        // Unapproved column
        { label: `Unapproved: income tax at exercise (${Math.round(band * 100)}%)`, value: gbp(unapprovedIt) },
        { label: "Unapproved: employee NIC estimate", value: gbp(unapprovedEmpNic) },
        { label: "Unapproved: employer NIC cost to company (15%)", value: gbp(unapprovedEmployerNic) },
        { label: "Unapproved: total employee tax (inc. NIC)", value: gbp(unapprovedEmployeeTax), strong: true },
        // Growth shares column
        { label: "Growth shares: income tax at acquisition (s.431)", value: growthItAtAcq > 0 ? gbp(growthItAtAcq) : "Nil (zero acquisition value)" },
        { label: `Growth shares: CGT at exit (${Math.round(cgtRate(band) * 100)}%, no auto-BADR)`, value: gbp(growthCgt) },
        { label: "Growth shares: employer NIC cost to company", value: "Nil" },
        { label: "Growth shares: total employee tax", value: gbp(growthEmployeeTax), strong: true },
      ],
      note:
        "Unapproved column assumes exercise at exit (cashless); income tax applies on the full gain at exercise and post-exercise CGT is nil. " +
        "Employee NIC on unapproved options is an estimate based on the standalone gain: it ignores existing salary already occupying the NIC bands. " +
        `Employer NIC of ${gbp(unapprovedEmployerNic)} is modelled as a flat 15% of the option gain; the £5,000 secondary threshold is annual/per-employee, not per-grant, and is not deducted here. ` +
        "Growth shares require a s.431 election within 14 days of acquisition and an HMRC-agreed valuation. BADR is not automatically available on growth shares or unapproved options (BADR covers EMI shares specifically). " +
        "These figures are general guidance only; qualifying-company questions and actual grant structuring require specialist advice.",
    };
  },
  explainer: {
    heading: "EMI vs unapproved options vs growth shares: the tax difference explained",
    paragraphs: [
      "Enterprise Management Incentives (EMI) are the most tax-efficient option route for qualifying UK startups. There is no income tax at grant and no income tax at exercise provided the exercise price equals or exceeds the actual market value agreed with HMRC at grant. The gain from exercise price to exit is subject only to Capital Gains Tax, and if the shares are held for two years from grant, Business Asset Disposal Relief applies at 18% with no need to pass the 5% personal-company test. The company also pays no employer NIC on a clean EMI exercise, because there is no employment income charge.",
      "Unapproved options receive no HMRC approval. Under general employment-related-securities rules, the difference between market value and exercise price is charged to income tax and employee NIC at exercise, as employment income. The company also pays employer NIC at 15% on the same amount. For a higher-rate taxpayer this means a 40% income tax charge plus employee NIC versus an 18% CGT charge under EMI: a substantial difference on the same economic gain.",
      "Growth shares are shares rather than options, usually in a new class that only participates in exit proceeds above a hurdle. They are acquired up front at a low hope-value; with a section 431 election made within 14 days, the employee is taxed on the unrestricted market value at acquisition (often very low) and future growth to exit is CGT rather than income tax. Standard CGT rates apply (18%/24%), not the EMI-specific BADR treatment. Growth shares need an HMRC-agreed valuation and the s.431 election to work correctly.",
      "The calculator models the unapproved column under the cashless-exercise assumption (exercise and sale happen together). In practice, unapproved options exercised before exit would produce income tax at exercise on the then-market-value, with further CGT on any later gain. The headline comparison holds directionally but the exact split differs with timing.",
    ],
  },
  faqs: [
    {
      question: "What is the BADR rate on EMI gains from 6 April 2026?",
      answer:
        "18% on qualifying gains up to the £1m lifetime limit. EMI shares qualify for BADR under the two-year holding rule from grant without needing to pass the 5% personal-company test that applies to other shares.",
    },
    {
      question: "Do EMI options qualify for Business Asset Disposal Relief?",
      answer:
        "Yes, provided the shares are held for two years from the date of grant. The 5% personal-company test that normally applies to BADR is waived for EMI shares. The company and the options must still qualify under the EMI rules.",
    },
    {
      question: "What is the tax on unapproved options at exercise?",
      answer:
        "Income tax at the employee's marginal rate on the difference between market value and exercise price, plus employee NIC under the primary Class 1 rules (8% between £12,570 and £50,270, 2% above). The company also pays employer NIC at 15% on the same amount.",
    },
    {
      question: "What is employer NIC on unapproved options?",
      answer:
        "15% of the option gain (the amount charged to income tax at exercise). This is a company cost, not an employee cost. A clean EMI exercise at AMV is not earnings, so no employer NIC arises on EMI.",
    },
    {
      question: "What are growth shares and how are they taxed?",
      answer:
        "Growth shares are a new class of shares that only participate in exit proceeds above a hurdle value. With a section 431 election within 14 days of acquisition, income tax at acquisition is charged on the low hope-value; subsequent growth to exit is taxed as CGT at 18% or 24% depending on the taxpayer's rate band. BADR does not apply automatically to growth shares.",
    },
    {
      question: "What is a section 431 election?",
      answer:
        "A joint election under section 431 ITEPA 2003 on restricted securities (including growth shares). It must be made within 14 days of acquiring the shares. It elects for income tax at acquisition to be charged on the unrestricted market value, locking in CGT treatment for future growth. Missing the 14-day window is a classic funded-startup trap.",
    },
    {
      question: "Which is cheaper for the company, EMI or unapproved options?",
      answer:
        "EMI is almost always cheaper for the company. On a clean EMI exercise (exercise price at AMV), no employer NIC arises. On an unapproved option exercise, the company pays 15% employer NIC on the full gain. On a £100,000 gain that is £15,000 of company cash.",
    },
  ],
  related: [
    { label: "EMI scheme setup", href: "/services/emi-scheme-setup" },
    { label: "Share schemes", href: "/services/share-schemes" },
    { label: "For funded startups", href: "/for/funded-startups" },
    { label: "EMI qualifying company rules", href: "/blog/share-schemes-and-emi/emi-qualifying-company-rules" },
    { label: "EMI option valuation", href: "/blog/share-schemes-and-emi/emi-option-valuation" },
    { label: "EMI vs CSOP", href: "/blog/share-schemes-and-emi/emi-vs-csop" },
    { label: "Growth shares explained", href: "/blog/share-schemes-and-emi/growth-shares-explained" },
    { label: "Section 431 elections", href: "/blog/share-schemes-and-emi/section-431-elections" },
  ],
};
