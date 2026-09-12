import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { classifyVatDisbursement, type CostType } from "@/lib/tools/compute/vat-disbursements-classifier";

export const vatDisbursementsClassifierTool: GenericTool = {
  kind: "generic",
  slug: "vat-disbursements-classifier",
  name: "VAT on Disbursements Classifier",
  category: "Practice Finance",
  oneLiner:
    "Classify any solicitor cost as a true disbursement (outside VAT) or a standard-rated recharge against the eight HMRC conditions in VAT Notice 700 section 25.1.1.",
  embedHeight: 580,
  metaTitle: "VAT on Disbursements Classifier | Solicitor Disbursement or Recharge?",
  metaDescription:
    "Free tool for law firms. Select a cost type or work through the eight HMRC conditions in VAT Notice 700 section 25.1.1 to classify any item as a true disbursement (outside VAT) or a standard-rated recharge. Covers Brabners v HMRC and counsel's fees.",
  intro:
    "Whether a cost you pay on a client's behalf is a true disbursement (outside the scope of VAT) or a recharged expense (standard-rated at 20%) depends on the eight conditions HMRC sets out in VAT Notice 700 section 25.1.1. All eight must be met. Select a common cost type for the orthodox position, or choose 'Other cost' to work through the eight conditions for your own case.",
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
      help: "Select a preset cost type for the orthodox HMRC treatment, or choose 'Other cost' to work through all eight conditions.",
    },
    {
      id: "firmActedAsAgent",
      label: "1. The firm acted as the client's agent when paying the third party",
      type: "toggle",
      default: false,
      help: "The firm paid in the client's name and on the client's behalf, rather than buying the supply for its own business.",
    },
    {
      id: "clientReceivedAndUsed",
      label: "2. The client received and used the goods or services",
      type: "toggle",
      default: false,
      help: "The benefit flows to the client. If the firm uses or interprets the output in its own advice, this condition fails (Brabners).",
    },
    {
      id: "clientResponsibleForPayment",
      label: "3. The client was responsible for paying the third party",
      type: "toggle",
      default: false,
      help: "The legal liability to pay sat with the client, not with the firm. A bank fee the firm's own bank charges the firm fails here.",
    },
    {
      id: "clientAuthorisedPayment",
      label: "4. The client authorised the firm to make the payment",
      type: "toggle",
      default: false,
      help: "Written authority in the retainer, a specific instruction or an attendance note recording it.",
    },
    {
      id: "clientKnewThirdPartySupply",
      label: "5. The client knew the goods or services would be supplied by a third party",
      type: "toggle",
      default: false,
      help: "The client was told, or clearly understood, that an outside supplier would provide this.",
    },
    {
      id: "itemisedSeparately",
      label: "6. The outlay is shown separately on the firm's invoice",
      type: "toggle",
      default: false,
      help: "It appears as a distinct line, clearly identified as a third-party cost, on the VAT invoice or fee note.",
    },
    {
      id: "exactPassThrough",
      label: "7. The firm recovers only the exact amount paid",
      type: "toggle",
      default: false,
      help: "No mark-up, margin or handling charge. The client pays exactly what the third party charged.",
    },
    {
      id: "clearlyAdditional",
      label: "8. The goods or services are clearly additional to the firm's own supply",
      type: "toggle",
      default: false,
      help: "The cost is not a component of the legal service the firm is itself supplying.",
    },
  ],
  compute(values) {
    const costType = String(values.costType) as CostType;
    const r = classifyVatDisbursement({
      costType,
      firmActedAsAgent: Boolean(values.firmActedAsAgent),
      clientReceivedAndUsed: Boolean(values.clientReceivedAndUsed),
      clientResponsibleForPayment: Boolean(values.clientResponsibleForPayment),
      clientAuthorisedPayment: Boolean(values.clientAuthorisedPayment),
      clientKnewThirdPartySupply: Boolean(values.clientKnewThirdPartySupply),
      itemisedSeparately: Boolean(values.itemisedSeparately),
      exactPassThrough: Boolean(values.exactPassThrough),
      clearlyAdditional: Boolean(values.clearlyAdditional),
    });

    const rows = [
      { label: "VAT treatment", value: r.vatTreatment, strong: true as const },
      { label: "Billing guidance", value: r.billingGuidance },
    ];
    if (costType === "custom") {
      rows.unshift({ label: `HMRC conditions met`, value: `${r.conditionsMet} of ${r.conditionsNeeded}` });
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
      note: r.caveat ?? "This classification applies the eight conditions in HMRC VAT Notice 700 section 25.1.1, all of which must be met. It is a directional guide only. Your actual VAT position depends on the terms of your supplier contracts and the facts of each matter. Take specialist VAT advice for any material or recurring cost.",
    };
  },
  explainer: {
    heading: "How the eight-condition disbursement test works",
    paragraphs: [
      "HMRC distinguishes between two types of costs a solicitor passes to a client. A true disbursement is a cost incurred by the firm as the client's agent: the supply is made to the client, the firm pays on the client's behalf, and the amount is passed through at cost. Because the supply was to the client (not the firm), it is outside the scope of the firm's VAT return. The firm cannot reclaim input VAT on the cost, and the client does not pay VAT to the firm.",
      "A recharged expense (sometimes called an expense recharge or a disbursement that fails the agent test) is a cost the firm incurred as principal. The firm received the supply for its own business purposes, then billed the client for it. Because the firm made a supply to the client, that supply is VATable at the standard rate (currently 20%). The firm charges VAT on the recharge and can reclaim input VAT on the original cost.",
      "HMRC sets out EIGHT conditions in VAT Notice 700 section 25.1.1, and every one of them must be satisfied before a payment qualifies as a true disbursement. Failing a single condition makes the payment part of the firm's own standard-rated supply. The eight are: (1) the firm acted as the client's agent when paying the third party; (2) the client received and used the goods or services; (3) the client was responsible for paying the third party; (4) the client authorised the firm to make the payment; (5) the client knew the supply would be made by a third party; (6) the outlay is shown separately on the firm's invoice; (7) the firm recovers only the exact amount paid; and (8) the goods or services are clearly additional to the firm's own supply.",
      "The decision in Brabners LLP v HMRC [2017] UKFTT 0666 (TC) settled how the test applies to property search fees. Brabners obtained electronic searches, used the results as part and parcel of its own service by interpreting them and reporting on them, then billed the fees as disbursements. The First-tier Tribunal held that the searches were a cost component of the firm's standard-rated supply, so VAT was due. What decides it is how the firm USES the result, not how the search was obtained: Revenue and Customs Brief 6 (2020) withdrew the informal postal-search concession from 1 December 2020 and put postal and electronic searches on the same functional test. A firm that merely passes an uninterpreted result to the client can still be a conduit; a firm that advises on it cannot.",
      "Worked example 1: a court issue fee (true disbursement). The client is liable for the fee, the firm pays it on the client's written authority in the retainer, the client knows the court is charging it, the amount is recovered exactly, it is shown as a separate line on the bill, and it is plainly additional to the firm's own legal service. All eight conditions are met, so no VAT is charged on the recharge and there is no input VAT to reclaim on a court fee.",
      "Worked example 2: a search fee the firm advises on (standard-rated recharge, per Brabners). The firm orders a search pack, reviews the results and reports on them in its own advice to the client. Conditions 2 and 8 fail: the firm, not the client, used the search result, and the search is not clearly additional to the legal service being supplied. The fee is a cost component of the firm's standard-rated supply, so the firm charges VAT at 20% on the recharge and reclaims the input VAT on the supplier's invoice. Counsel's fees are the other common trap: the default is that counsel supplies the FIRM, so the firm reclaims the input VAT and charges output VAT on its total fee with the counsel element inside it.",
    ],
  },
  faqs: [
    {
      question: "What does Brabners v HMRC mean for our electronic search fees?",
      answer:
        "If your firm uses the search result in its own advice, interpreting it and reporting on it to the client, the First-tier Tribunal's decision in Brabners [2017] UKFTT 0666 (TC) is directly on point: the search is part and parcel of the firm's own standard-rated supply. When you pass that cost to the client you are making a taxable supply and must charge VAT at 20%, and you reclaim the input VAT on the supplier's invoice. The postal-search concession was withdrawn from 1 December 2020 by Revenue and Customs Brief 6 (2020), so ordering by post no longer changes the answer. Only a result the firm passes through unused and uninterpreted can be a disbursement, and you must still satisfy all eight conditions in VAT Notice 700 section 25.1.1 for each transaction.",
    },
    {
      question: "Are counsel's fees a disbursement?",
      answer:
        "Usually not. In the normal case counsel supplies the FIRM, and the firm uses that work in making its own onward supply of legal services to the client. So the firm reclaims the input VAT on counsel's fee note and charges output VAT on its total fee with the counsel element inside it. Counsel's fee is a disbursement only in the narrower case where counsel acts as the client's agent, in the client's name and on the client's instruction, as in some direct-access arrangements. There is also a long-standing HMRC concession that lets a firm pass counsel's VAT-bearing fee note to the client and treat it as a disbursement, but only where the firm does not itself reclaim that input VAT. You cannot both treat counsel's fee as a disbursement and reclaim the VAT on it. Overseas counsel can engage the reverse charge, which is a separate point.",
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
        "This tool applies the HMRC test in VAT Notice 700 section 25.1.1, the eight conditions that must all be met, which is the operative standard. The Law Society's practice note on VAT and disbursements is consistent with that test and was updated following Brabners to caution firms about search fees. For any cost type not listed, the questionnaire applies the same eight conditions.",
    },
    {
      question: "What records do we need to keep?",
      answer:
        "For each cost treated as a disbursement, retain the original supplier invoice or receipt showing the amount, evidence that the firm paid on the client's specific authority (a retainer letter, written authority, or attendance note), and a copy of the client bill showing the cost itemised separately. HMRC may request these records during a VAT inspection to verify that all eight conditions were satisfied on a transaction-by-transaction basis.",
    },
  ],
  related: [
    {
      label: "SRA Client Account Reserve Calculator",
      href: "/calculators/sra-client-account-reserve",
    },
    {
      label: "Solicitor Take-Home Calculator",
      href: "/calculators/partnership-vs-llp-take-home",
    },
  ],
};
