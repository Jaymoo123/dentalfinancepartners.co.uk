import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";
import { CIS_RATES } from "../cis-tax";

export const cisDeductionCalculator: GenericTool = {
  kind: "generic",
  slug: "cis-deduction-calculator",
  name: "CIS Deduction Calculator",
  category: "CIS Compliance",
  oneLiner:
    "Work out the CIS deduction, net payment to your subcontractor, and HMRC remittance for any CIS payment.",
  metaTitle: "CIS Deduction Calculator | What to Withhold and Pay HMRC",
  metaDescription:
    "Calculate the correct CIS deduction for a subcontractor payment. Enter the gross payment, materials and subcontractor status to get the deduction amount, net to pay and HMRC remittance.",
  intro:
    "Contractors must calculate and deduct the correct amount of CIS from each subcontractor payment before paying HMRC by the 22nd of the following tax month. This calculator works out the deduction, the net to pay your subcontractor, and the amount you remit to HMRC.",
  ctaLabel: "Get help with your CIS contractor returns →",
  embedHeight: 640,
  fields: [
    {
      id: "grossPayment",
      label: "Gross payment to subcontractor",
      type: "currency",
      default: 5000,
      step: 100,
      help: "The total amount due to the subcontractor for the job, before any CIS deduction.",
    },
    {
      id: "materials",
      label: "Materials cost (subcontractor-supplied materials on this payment)",
      type: "currency",
      default: 1200,
      step: 100,
      help: "Materials the subcontractor has supplied. These are excluded from the CIS deduction base. You must be satisfied the amount is genuine.",
    },
    {
      id: "status",
      label: "Subcontractor CIS status (from HMRC verification)",
      type: "select",
      default: "registered",
      options: [
        { value: "gps", label: "Gross Payment Status — deduct 0%" },
        { value: "registered", label: "Registered subcontractor — deduct 20%" },
        { value: "unregistered", label: "Unregistered / not verified — deduct 30%" },
      ],
    },
    {
      id: "drc",
      label: "Domestic Reverse Charge (DRC) applies to this supply",
      type: "toggle",
      default: false,
      help: "Tick if you are accounting for VAT under the Construction Industry VAT Domestic Reverse Charge. The CIS calculation is unchanged but VAT is handled separately.",
    },
  ],
  compute: (v) => {
    const gross = Number(v.grossPayment);
    const materials = Number(v.materials);
    const status = v.status as string;
    const drc = Boolean(v.drc);

    const rate = status === "gps" ? CIS_RATES.gps : status === "registered" ? CIS_RATES.registered : CIS_RATES.unregistered;
    const rateLabel =
      status === "gps" ? "0% (GPS)" : status === "registered" ? "20%" : "30%";

    const deductionBase = Math.max(0, gross - materials);
    const cisDeducted = deductionBase * rate;
    const netToPay = gross - cisDeducted;

    return {
      headline: {
        label: "Net to pay subcontractor",
        value: gbp(netToPay),
        sub: `CIS deducted: ${gbp(cisDeducted)} (remit to HMRC by 22nd of following tax month)`,
      },
      rows: [
        { label: "Gross payment", value: gbp(gross) },
        { label: "Less materials (excluded from deduction base)", value: `−${gbp(materials)}` },
        { label: "CIS deduction base (labour)", value: gbp(deductionBase) },
        { label: "CIS deduction rate", value: rateLabel },
        { label: "CIS deducted", value: gbp(cisDeducted), strong: true },
        { label: "Net payment to subcontractor", value: gbp(netToPay), strong: true },
        { label: "HMRC remittance (CIS300 + payment)", value: gbp(cisDeducted), strong: true },
        ...(drc
          ? [{ label: "VAT note", value: "DRC applies — you account for VAT separately" }]
          : []),
      ],
      note:
        status === "unregistered"
          ? "This subcontractor is unregistered or could not be verified. The 30% rate applies. You must verify subcontractors with HMRC before making the first payment — failure to do so does not reduce your liability."
          : "You must issue a written CIS payment and deduction statement to the subcontractor within 14 days of making this payment. File your CIS300 monthly return and pay the deducted amount to HMRC by the 22nd of the following tax month (19th for cheque).",
    };
  },
  explainer: {
    heading: "How to calculate CIS deductions as a contractor",
    paragraphs: [
      "Before making the first payment to any subcontractor, you must verify their CIS status with HMRC. The verification result tells you which rate to apply: 0% for a subcontractor with Gross Payment Status, 20% for a registered subcontractor, or 30% if they cannot be verified or are not registered under CIS. You are liable for any deduction shortfall regardless of what the subcontractor tells you about their status, so HMRC verification is not optional.",
      "The deduction is calculated on the labour element of the payment only. Materials that the subcontractor has genuinely supplied and recharged to you are excluded from the deduction base. You must be satisfied the materials amount is real and not inflated. The deduction base is therefore the gross payment less any verified materials cost, and the CIS amount is that base multiplied by the applicable rate.",
      "Once you have made a payment you have two reporting and payment obligations. File your CIS300 monthly return by the 19th of the month following the tax month in which the payment was made, and pay the deducted amount to HMRC by the 22nd (or 19th if paying by cheque). You must also issue a written payment and deduction statement to the subcontractor within 14 days of making the payment, showing the gross amount, materials, deduction base, rate and amount deducted.",
    ],
  },
  faqs: [
    {
      question: "Do I need to verify a subcontractor every time I pay them?",
      answer:
        "No. Once you have verified a subcontractor with HMRC you do not need to re-verify them for each subsequent payment on the same engagement. You should re-verify if there is a break in work between you and that subcontractor, or if HMRC instructs you to. You must, however, verify before making the first payment on any new engagement.",
    },
    {
      question: "What if I pay a subcontractor without verifying them?",
      answer:
        "If you cannot verify, you must deduct at the 30% unregistered rate. Paying without verification and deducting at only 20% exposes you to penalties for the shortfall and can jeopardise your own Gross Payment Status under the compliance rules introduced in April 2026. The obligation to deduct and remit the correct amount sits with you as the contractor.",
    },
    {
      question: "When do I pay the CIS I have deducted to HMRC?",
      answer:
        "By the 22nd of the month following the tax month in which the payment was made (19th if paying by cheque). This follows the same payment cycle as PAYE. For example, a payment made in the tax month ending 5 May must be remitted to HMRC by 22 May.",
    },
    {
      question: "What is a CIS payment and deduction statement?",
      answer:
        "A written statement you must issue to the subcontractor within 14 days of each payment where you have made a CIS deduction. It must show the gross amount of the payment, any materials excluded from the deduction base, the deduction base (labour element), the rate applied, and the amount deducted. Failing to issue it is a separate offence from any error in the deduction itself.",
    },
    {
      question: "Does the Domestic Reverse Charge change my CIS deduction?",
      answer:
        "No. The CIS deduction is calculated on the net-of-VAT value of the labour element, and the Domestic Reverse Charge has no effect on that calculation. The DRC only changes how VAT is accounted for: instead of the subcontractor charging you VAT, you account for it directly to HMRC. The two obligations are entirely separate.",
    },
  ],
};
