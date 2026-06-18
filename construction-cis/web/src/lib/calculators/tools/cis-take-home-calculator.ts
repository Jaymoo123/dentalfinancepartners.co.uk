import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";

export const cisTakeHomeCalculator: GenericTool = {
  kind: "generic",
  slug: "cis-take-home-calculator",
  name: "CIS Take-Home Pay Calculator",
  category: "CIS Basics",
  oneLiner:
    "See your net pay from a single invoice after CIS deduction, with a full breakdown of the labour base, deduction and annualised figures.",
  metaTitle: "CIS Take-Home Pay Calculator | Net Pay After CIS Deduction",
  metaDescription:
    "Free CIS take-home pay calculator. Enter your invoice amount, materials and deduction rate to see exactly how much you receive after CIS, plus an annualised view. Instant result.",
  intro:
    "Enter your invoice amount, the materials you supply and your CIS deduction rate to see exactly how much you take home from each payment.",
  ctaLabel: "Want to claim back overpaid CIS? Talk to us →",
  embedHeight: 620,
  fields: [
    {
      id: "grossInvoice",
      label: "Gross invoice amount",
      type: "currency",
      default: 2000,
      step: 100,
      help: "The total amount on your invoice before any CIS deduction.",
    },
    {
      id: "materials",
      label: "Materials you supply (excluded from CIS deduction base)",
      type: "currency",
      default: 400,
      step: 50,
      help: "Materials you personally purchase and include on the invoice. CIS deduction applies only to the labour element.",
    },
    {
      id: "rate",
      label: "Your CIS deduction rate",
      type: "select",
      default: "20",
      options: [
        { value: "0", label: "0% (Gross Payment Status)" },
        { value: "20", label: "20% (registered subcontractor)" },
        { value: "30", label: "30% (unregistered subcontractor)" },
      ],
    },
    {
      id: "frequency",
      label: "How often do you invoice at this amount?",
      type: "select",
      default: "weekly",
      options: [
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "oneoff", label: "One-off / single invoice" },
      ],
    },
  ],
  compute: (v) => {
    const gross = Number(v.grossInvoice);
    const materials = Number(v.materials);
    const rate = Number(v.rate) / 100;
    const freq = v.frequency as string;

    const deductionBase = Math.max(0, gross - materials);
    const cisDeducted = deductionBase * rate;
    const netReceived = gross - cisDeducted;

    const multiplier = freq === "weekly" ? 52 : freq === "monthly" ? 12 : 1;
    const annualGross = gross * multiplier;
    const annualDeducted = cisDeducted * multiplier;
    const annualNet = netReceived * multiplier;

    const rateLabel = rate === 0 ? "GPS (0%)" : rate === 0.2 ? "20%" : "30%";

    return {
      headline: {
        label: "Net received (after CIS deduction)",
        value: gbp(netReceived),
        sub:
          freq !== "oneoff"
            ? `${gbp(annualNet)} per year · ${gbp(annualDeducted)} deducted at source annually`
            : `CIS deducted: ${gbp(cisDeducted)} · Deduction rate: ${rateLabel}`,
      },
      rows: [
        { label: "Gross invoice", value: gbp(gross) },
        { label: "Materials (excluded from deduction base)", value: `−${gbp(materials)}` },
        { label: "CIS deduction base (labour)", value: gbp(deductionBase) },
        { label: `CIS deducted (${rateLabel})`, value: `−${gbp(cisDeducted)}`, strong: true },
        { label: "Net received from contractor", value: gbp(netReceived), strong: true },
        ...(freq !== "oneoff"
          ? [
              {
                label: `Annual gross (${freq === "weekly" ? "×52" : "×12"})`,
                value: gbp(annualGross),
              },
              { label: "Annual CIS deducted", value: gbp(annualDeducted) },
              { label: "Annual net received", value: gbp(annualNet), strong: true },
            ]
          : []),
      ],
      note: "Net received is the amount your contractor pays you. The CIS deducted is held by HMRC as an advance against your eventual Self Assessment tax bill. If your actual tax liability is lower than the amount deducted, HMRC will refund the difference after you file your return.",
    };
  },
  explainer: {
    heading: "How CIS affects your take-home pay",
    paragraphs: [
      "The CIS deduction does not apply to your full invoice amount. HMRC requires contractors to deduct only from the labour element of your payment. If you supply materials and include them on your invoice, those costs are stripped out first, leaving the labour component as the deduction base. This means a subcontractor supplying significant materials will have a smaller deduction base and a higher net receipt than someone billing purely for labour at the same invoice total.",
      "The rate applied to that labour base depends on your registration status. Subcontractors with Gross Payment Status (GPS) receive the full invoice with no deduction. Registered subcontractors without GPS are deducted at 20%. Unregistered subcontractors face a 30% rate, which HMRC applies as a penalty for operating outside the scheme. GPS is available to subcontractors who meet three qualifying tests covering business type, turnover and compliance record. Registering for CIS is free and immediately moves the rate from 30% to 20%.",
      "Whatever is deducted by your contractor is not lost income. It is paid to HMRC on your behalf as an advance payment against your Self Assessment tax liability for the year. When you file your return, HMRC sets your actual tax bill against the amounts already deducted and paid over. If the deductions exceed your liability, HMRC refunds the surplus. Sole traders and partners can offset CIS deductions against income tax and Class 4 National Insurance; limited companies offset them against corporation tax and PAYE.",
    ],
  },
  faqs: [
    {
      question: "Why is CIS deducted from labour but not materials?",
      answer:
        "Materials are a pass-through cost, not income. You spend the money buying materials and reclaim the cost through your invoice, so there is no profit element to tax. HMRC excludes them from the deduction base to avoid taxing a cost that simply flows through your business. Labour, by contrast, represents your earnings and is the element on which the advance tax deduction is calculated.",
    },
    {
      question: "How much more would I take home with Gross Payment Status?",
      answer:
        "With GPS your deduction rate drops to 0%, so your contractor pays the full invoice amount with no withholding. On a gross labour income of £40,000 per year, a 20% deduction withholds £8,000 that would otherwise stay in your business throughout the year. GPS improves cash flow significantly, particularly for businesses with regular VAT, material and wage outgoings to meet before the self-assessment refund arrives. GPS requires passing the three qualifying tests on business type, annual turnover and a clean tax compliance record.",
    },
    {
      question: "I am deducted at 30% — how do I get to 20%?",
      answer:
        "Register for CIS through HMRC, which is free and can be done online or by phone. Once registered, contractors are required to verify your status before making the first payment under CIS, and your deduction rate moves from 30% to 20% immediately from that point. Future payments will be deducted at the registered rate. Any 30% deductions already suffered before registration can still be credited against your tax bill when you file your Self Assessment return.",
    },
    {
      question: "Is the CIS deduction my final tax bill?",
      answer:
        "No. The CIS deduction is an advance payment, not a final settlement. Your actual tax liability is calculated when you file your Self Assessment return, which takes into account all your income, allowable expenses, personal allowance and any other reliefs. If the total CIS deducted during the year exceeds what you actually owe, HMRC will refund the difference. If your expenses are high or your income varies through the year, many subcontractors find they are owed a refund.",
    },
    {
      question: "Does my net received figure include VAT?",
      answer:
        "No. VAT is separate from CIS. If you are VAT-registered, you add VAT to your invoice and the contractor pays that amount to you in the normal way (or, under the Domestic Reverse Charge that applies to most CIS work, the contractor accounts for the VAT directly to HMRC rather than paying it to you). Either way, the CIS deduction calculation is based on the net invoice amount and does not affect how VAT is handled. The net received figure in this calculator shows only the labour payment after CIS withholding, excluding VAT entirely.",
    },
  ],
};
