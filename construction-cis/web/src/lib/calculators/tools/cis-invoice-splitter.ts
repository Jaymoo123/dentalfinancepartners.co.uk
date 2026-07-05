import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";
import { CIS_RATES, VAT_STANDARD } from "../cis-tax";

export const cisInvoiceSplitter: GenericTool = {
  kind: "generic",
  slug: "cis-invoice-splitter",
  name: "CIS Invoice Splitter",
  category: "CIS Basics",
  oneLiner:
    "Split a CIS invoice correctly: calculate the labour element, deduction base, CIS withheld, VAT position and net received from the contractor.",
  metaTitle: "CIS Invoice Splitter | Labour, Materials and VAT",
  metaDescription:
    "Work out how to split your CIS invoice correctly. Enter the total job value and materials to see your labour element, CIS deduction base, amount deducted and net received.",
  intro:
    "Getting your CIS invoice split right matters. The CIS deduction applies only to the labour element, not to materials. This calculator shows the correct split, the CIS deduction, your net received, and your VAT position.",
  ctaLabel: "Get your CIS invoicing and returns right →",
  embedHeight: 640,
  fields: [
    {
      id: "totalJobValue",
      label: "Total job value (what you are charging the contractor)",
      type: "currency",
      default: 3000,
      step: 100,
      help: "The total amount on your invoice before VAT.",
    },
    {
      id: "materialsSupplied",
      label: "Materials you are supplying (your actual cost)",
      type: "currency",
      default: 800,
      step: 50,
      help: "Materials you personally purchase for this job and include in the invoice. The contractor should not deduct CIS from this portion.",
    },
    {
      id: "cisStatus",
      label: "Your CIS deduction rate",
      type: "select",
      default: "registered",
      options: [
        { value: "gps", label: "0% — Gross Payment Status" },
        { value: "registered", label: "20% — Registered subcontractor" },
        { value: "unregistered", label: "30% — Unregistered subcontractor" },
      ],
    },
    {
      id: "vatRegistered",
      label: "I am VAT-registered",
      type: "toggle",
      default: false,
    },
    {
      id: "drcApplies",
      label:
        "Domestic Reverse Charge (DRC) applies (both parties VAT-registered and CIS-registered; customer not end user)",
      type: "toggle",
      default: false,
    },
  ],
  compute: (v) => {
    const total = Number(v.totalJobValue);
    const materials = Number(v.materialsSupplied);
    const status = v.cisStatus as string;
    const vatRegistered = Boolean(v.vatRegistered);
    const drc = Boolean(v.drcApplies);

    const rate = status === "gps" ? CIS_RATES.gps : status === "registered" ? CIS_RATES.registered : CIS_RATES.unregistered;
    const rateLabel = status === "gps" ? "0% (GPS)" : status === "registered" ? "20%" : "30%";

    const labour = Math.max(0, total - materials);
    const deductionBase = labour;
    const cisDeducted = deductionBase * rate;
    const netReceived = total - cisDeducted;

    const vatNote = !vatRegistered
      ? "Not VAT-registered, no VAT on this invoice"
      : drc
      ? "DRC applies: your contractor accounts for the VAT; you do not charge VAT on your invoice"
      : `VAT at 20%: add ${gbp(total * VAT_STANDARD)} to your invoice; contractor pays you ${gbp(total * (1 + VAT_STANDARD))} gross, deducts ${gbp(cisDeducted)} CIS from the ex-VAT labour element`;

    return {
      headline: {
        label: "Net received from contractor (ex-VAT)",
        value: gbp(netReceived),
        sub: `After ${rateLabel} CIS deduction on labour element of ${gbp(deductionBase)}`,
      },
      rows: [
        { label: "Total job value (ex-VAT)", value: gbp(total) },
        { label: "Materials you supply", value: gbp(materials) },
        { label: "Labour element (CIS deduction base)", value: gbp(labour), strong: true },
        { label: `CIS deduction (${rateLabel})`, value: `−${gbp(cisDeducted)}` },
        { label: "Net received from contractor (ex-VAT)", value: gbp(netReceived), strong: true },
        { label: "VAT position", value: vatNote },
      ],
      note: "The contractor must not apply CIS to your materials — only to the labour element. Keep receipts for all materials you supply. The contractor must issue you a written CIS payment and deduction statement within 14 days of this payment.",
    };
  },
  explainer: {
    heading: "How to split a CIS invoice correctly",
    paragraphs: [
      "The CIS deduction applies only to the labour element of your invoice. If the contractor applies the deduction to your full invoice total including materials, you are over-deducted on every job. On a single invoice with a significant materials component the difference can be hundreds of pounds withheld incorrectly. Separating labour and materials on your invoice is not just best practice: it is the mechanism HMRC's scheme relies on, and contractors are obliged to follow the split you declare.",
      "Materials you personally purchase and supply count as the excluded portion. Plant hire and subcontractor costs can also be excluded in certain circumstances, but the position is fact-specific and you should seek advice before relying on those exclusions. The key rule is that the excluded costs must be passed through at actual cost, with no mark-up for profit. If you inflate the materials figure to shrink the CIS deduction base, HMRC can challenge the split and impose penalties on both you and your contractor. Keep all materials receipts as evidence that the declared figure reflects genuine expenditure.",
      "VAT is a separate calculation and has no effect on how CIS is worked out. The deduction is always calculated on the net of VAT invoice value. Where both you and your contractor are VAT-registered and CIS-registered, and your contractor is not the end user of the work, the Domestic Reverse Charge (DRC) applies: you do not charge VAT on your invoice and your contractor accounts for it directly to HMRC. The DRC changes who handles the VAT but leaves the CIS deduction calculation unchanged. New-build housing, which is zero-rated for VAT, falls outside the DRC.",
    ],
  },
  faqs: [
    {
      question: "What happens if the contractor deducts CIS from the materials portion of my invoice?",
      answer:
        "This is an error. You are over-deducted and effectively lose money on every job. You can ask the contractor to correct the deduction, and the overclaimed amount can be identified and recovered either within their CIS300 return or at year-end through your Self Assessment. Keep your materials receipts as evidence of the correct split.",
    },
    {
      question: "Can I inflate my materials figure to reduce the CIS deduction base?",
      answer:
        "No. HMRC can challenge the materials figure if it does not reflect genuine costs. Overstating materials is considered falsification of a CIS return and can result in penalties for both you and your contractor. Materials must be the actual cost to you.",
    },
    {
      question: "When does the Domestic Reverse Charge apply?",
      answer:
        "The DRC applies when all of these are true: both you and your contractor are VAT-registered; both are CIS-registered; the service is a specified CIS construction service; the contractor is not the end user of the work (they will sell the services on); and the supply is standard-rated or reduced-rated for VAT. New-build housing (zero-rated) is excluded from the DRC.",
    },
    {
      question: "Does the DRC change my CIS deduction?",
      answer:
        "No. The CIS deduction calculation is entirely separate from VAT. The DRC only affects how VAT is accounted for. The CIS deduction is still calculated on the labour element of the net of VAT invoice value.",
    },
    {
      question: "What must be on my invoice for CIS purposes?",
      answer:
        "Your invoice should show the total job value, the materials element separately, the labour element, your UTR or company registration number, and your CIS registration status. The contractor uses this to calculate the deduction and prepare the CIS300 return.",
    },
  ],
};
