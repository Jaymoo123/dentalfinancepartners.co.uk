import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { classifyVatDisbursement, type CostType } from "@/lib/tools/compute/vat-disbursements-classifier";

export const vatDisbursementsClassifierTool: GenericTool = {
  kind: "generic",
  slug: "vat-disbursements-classifier",
  name: "VAT on Disbursements Classifier",
  category: "Practice Finance",
  oneLiner:
    "Classify any solicitor cost as a true disbursement (outside VAT) or a recharge (VATable) using the HMRC agent/principal test.",
  embedHeight: 580,
  metaTitle: "VAT on Disbursements Classifier | Solicitor Disbursement or Recharge?",
  metaDescription:
    "Free tool for law firms. Select a cost type or answer four HMRC agent-test questions to classify any item as a true disbursement (outside VAT) or a recharge. Covers Brabners v HMRC implications.",
  intro:
    "Whether a cost you incur on a client's behalf is a true disbursement (outside the scope of VAT) or a recharged expense (VATable at 20%) depends on the HMRC agent/principal test. Select a common cost type for an instant verdict, or choose 'Other cost' to run the four-factor questionnaire.",
  ctaLabel: "Discuss your VAT position",
  fields: [
    {
      id: "costType",
      label: "Cost type",
      type: "select",
      default: "court-fees",
      options: [
        { value: "court-fees", label: "Court fees" },
        { value: "land-registry", label: "Land Registry search / registration fees" },
        { value: "local-auth-search", label: "Local authority searches (OS1/CON29)" },
        { value: "counsel-fees", label: "Counsel's fees (barrister)" },
        { value: "medical-records", label: "Medical records retrieval fees" },
        { value: "expert-reports", label: "Expert report fees" },
        { value: "stamp-duty", label: "Stamp duty land tax (SDLT)" },
        { value: "search-indemnity", label: "Search indemnity insurance" },
        { value: "custom", label: "Other cost (run the questionnaire)" },
      ],
      help: "Select a preset cost type for the orthodox HMRC treatment, or choose 'Other cost' to answer the four-factor test.",
    },
    {
      id: "firmActedAsAgent",
      label: "The firm contracted with the supplier as agent for the client",
      type: "toggle",
      default: false,
      help: "The client authorised the firm to incur this cost on their behalf. The supplier treats the client as the contracting party (or would if asked).",
    },
    {
      id: "clientConsumed",
      label: "The client (not the firm) consumed or received the supply",
      type: "toggle",
      default: false,
      help: "The benefit of the supply flows to the client. The firm does not use the output for its own business purposes.",
    },
    {
      id: "exactPassThrough",
      label: "The cost is passed on at the exact amount charged by the supplier",
      type: "toggle",
      default: false,
      help: "No mark-up, margin, or handling charge is included. The client pays exactly what the supplier invoiced.",
    },
    {
      id: "itemisedSeparately",
      label: "The cost is itemised separately on the client bill",
      type: "toggle",
      default: false,
      help: "It appears as a distinct line item, clearly identified as a third-party cost, on the VAT invoice or fee note.",
    },
  ],
  compute(values) {
    const costType = String(values.costType) as CostType;
    const r = classifyVatDisbursement({
      costType,
      firmActedAsAgent: Boolean(values.firmActedAsAgent),
      clientConsumed: Boolean(values.clientConsumed),
      exactPassThrough: Boolean(values.exactPassThrough),
      itemisedSeparately: Boolean(values.itemisedSeparately),
    });

    const rows = [
      { label: "VAT treatment", value: r.vatTreatment, strong: true as const },
      { label: "Billing guidance", value: r.billingGuidance },
    ];
    if (costType === "custom") {
      rows.unshift({ label: `HMRC factors met`, value: `${r.factorsMet} of ${r.factorsNeeded}` });
    }

    return {
      headline: {
        label: "Classification verdict",
        value: "",
        tone: r.positive ? ("good" as const) : ("warn" as const),
      },
      verdict: {
        text: r.verdictLabel,
        positive: r.positive,
      },
      rows,
      note: r.caveat ?? "This classification is based on the HMRC agent/principal test (VAT Notice 700 §25.1). It is a directional guide only. Your actual VAT position depends on the terms of your supplier contracts and the facts of each matter. Take specialist VAT advice for any material or recurring cost.",
    };
  },
  explainer: {
    heading: "How the HMRC agent/principal test works",
    paragraphs: [
      "HMRC distinguishes between two types of costs a solicitor passes to a client. A true disbursement is a cost incurred by the firm as the client's agent: the supply is made to the client, the firm pays on the client's behalf, and the amount is passed through at cost. Because the supply was to the client (not the firm), it is outside the scope of the firm's VAT return. The firm cannot reclaim input VAT on the cost, and the client does not pay VAT to the firm.",
      "A recharged expense (sometimes called an expense recharge or a disbursement that fails the agent test) is a cost the firm incurred as principal. The firm received the supply for its own business purposes, then billed the client for it. Because the firm made a supply to the client, that supply is VATable at the standard rate (currently 20%). The firm charges VAT on the recharge and can reclaim input VAT on the original cost.",
      "HMRC sets out four factors in VAT Notice 700 §25.1 that must ALL be satisfied for a cost to qualify as a true disbursement. Failing even one factor means the cost is treated as a recharge. The four factors are: (1) the firm acted as agent when incurring the cost; (2) the client actually received the supply; (3) the cost is passed on at exactly the amount charged by the supplier; and (4) the cost is shown separately on the VAT invoice.",
      "The decision in Brabners LLP v HMRC [2017] UKFTT 0666 (TC) clarified how this test applies to electronic search fees. Brabners subscribed to a data aggregator as principal, received the search data itself, then reported the results to the client. The First-tier Tribunal held that the supply was to Brabners (not to the client), so the fee was a recharge subject to VAT. The judgment applies to any situation where the firm holds its own contract with the supplier and processes the data before delivery, regardless of how the cost has historically been labelled on client bills.",
      "Worked example 1: court fee (true disbursement). A conveyancing firm pays a £455 Land Registry first registration fee on behalf of a client. The firm acts as the client's agent under a written authority in the retainer letter. The Land Registry invoices are addressed to the firm acting for the client. The £455 is passed on at exactly that amount and shown as a separate line on the client bill: 'Disbursement: Land Registry fee £455.00'. All four agent-test factors are met. No VAT is charged on the £455. The firm cannot reclaim input VAT (there is none to reclaim on a government fee). Net cost to client: £455.",
      "Worked example 2: electronic search fee (recharge, post-Brabners). The same firm uses a search aggregator to order a combined local authority/drainage/environmental search pack for £220 plus VAT. The firm holds an annual subscription to the aggregator as the named account holder. The aggregator delivers a data report to the firm, which the firm reviews and includes in its search report to the client. Applying Brabners: the supply is to the firm (factor 1 fails: the firm contracted as principal). The data output was processed by the firm before delivery (factor 2 is questionable). This cost fails the agent test and is a recharge. The firm charges the client £220 plus VAT at 20% (£44), total £264. The firm reclaims the £44 input VAT from the aggregator's invoice on its VAT return.",
    ],
  },
  faqs: [
    {
      question: "What does Brabners v HMRC mean for our electronic search fees?",
      answer:
        "If your firm subscribes directly to a search data provider (such as TM Group, Groundsure, or similar) as the contracting party, the First-tier Tribunal's decision in Brabners [2017] UKFTT 0666 (TC) is directly on point. The supply of the search data is to the firm as principal. When you pass that cost to the client, you are making a taxable supply and must charge VAT at 20%. You can reclaim the input VAT on your subscription cost. Postal or paper searches ordered individually by the firm as agent for a specific client are not affected in the same way, though you should still satisfy all four factors of the agent test for each transaction.",
    },
    {
      question: "Can we still treat counsel's fees as a disbursement after Brabners?",
      answer:
        "Yes, in most cases. Counsel's fees remain a true disbursement where the client retained the barrister directly through the firm acting as agent, the barrister's instruction is addressed to the client (or both parties), the fee is passed at the exact amount on counsel's fee note, and it is itemised separately. Brabners turned on the firm being the contracting principal and consuming the data output itself. A counsel instruction does not replicate that fact pattern unless the firm engages counsel for its own business purposes rather than for the specific client.",
    },
    {
      question: "If we charge VAT on a recharge, can the client reclaim it?",
      answer:
        "If the client is VAT-registered and uses the supply for taxable business purposes, they can reclaim the input VAT you charge. If the client is not VAT-registered (a private individual, a charity with no taxable supplies, or a business exempt from VAT), the VAT becomes an irrecoverable cost for them. This is why the distinction matters in consumer-facing work such as residential conveyancing: charging VAT on what clients have historically treated as a cost pass-through can generate complaints and price-comparison issues.",
    },
    {
      question: "What if we have historically treated a cost incorrectly?",
      answer:
        "If you have been treating a cost as a disbursement when it should have been a recharge, you may have an under-declared VAT liability. HMRC can generally assess back four years (or 20 years in cases of deliberate evasion). It is prudent to carry out an internal review, quantify the exposure, and take specialist VAT advice before deciding whether to make a voluntary disclosure. Voluntary disclosure typically results in reduced penalties compared with an unprompted HMRC assessment.",
    },
    {
      question: "Does this tool cover the Law Society's practice note on disbursements?",
      answer:
        "This tool applies the HMRC statutory test from VAT Notice 700 §25.1, which is the operative legal standard. The Law Society's practice note on VAT and disbursements is consistent with that test and was updated following Brabners to caution firms about electronic searches. The verdicts in this tool align with the Law Society guidance for the preset cost types. For any cost type not listed, the four-factor questionnaire applies the same agent-test logic.",
    },
    {
      question: "What records do we need to keep?",
      answer:
        "For each cost treated as a disbursement, retain the original supplier invoice or receipt showing the amount, evidence that the firm incurred the cost on the client's specific instructions (a retainer letter, written authority, or attendance note), and a copy of the client bill showing the cost itemised separately. HMRC may request these records during a VAT inspection to verify that the agent-test conditions were satisfied on a transaction-by-transaction basis.",
    },
  ],
  related: [
    {
      label: "SRA Client Account Reserve Calculator",
      href: "/calculators/sra-client-account-reserve",
    },
    {
      label: "Solicitor Take-Home Calculator",
      href: "/calculators/solicitor-take-home",
    },
  ],
};
