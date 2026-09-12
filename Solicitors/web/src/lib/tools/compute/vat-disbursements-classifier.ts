/**
 * VAT on Disbursements Classifier — pure compute (no React/window/fetch).
 *
 * LEGAL BASIS:
 * - HMRC VAT Notice 700 §25.1.1: EIGHT conditions, ALL of which must be met
 *   before a payment can be treated as a disbursement outside the scope of VAT.
 *   (HP §6. Do NOT describe this as a four-factor test.)
 * - HMRC VAT manual VTAXPER37000 to VTAXPER40000 (agency and disbursements).
 * - Brabners LLP v HMRC [2017] UKFTT 0666 (TC): electronic search fee treated
 *   as part of the firm's own standard-rated supply because the firm used and
 *   interpreted the search result in its advice. Revenue and Customs Brief 6
 *   (2020) withdrew the postal-search concession from 1 December 2020, so the
 *   postal/electronic distinction no longer decides it (HP §6.A).
 * - Counsel's fees: the DEFAULT is a supply TO THE FIRM, not a disbursement
 *   (HP §6.B). The disbursement route is the narrow agency exception.
 *
 * THE EIGHT CONDITIONS (VAT Notice 700 §25.1.1):
 *   1. The firm acted as the client's agent when paying the third party.
 *   2. The client received and used the goods or services.
 *   3. The client was responsible for paying the third party.
 *   4. The client authorised the firm to make the payment.
 *   5. The client knew the goods or services would be supplied by a third party.
 *   6. The outlay is shown separately on the firm's invoice.
 *   7. The firm recovers only the exact amount paid to the third party.
 *   8. The goods or services are clearly additional to the firm's own supply.
 */

export type CostType =
  | "court-fees"
  | "land-registry"
  | "local-auth-search"
  | "counsel-fees"
  | "medical-records"
  | "expert-reports"
  | "stamp-duty"
  | "search-indemnity"
  | "custom";

export type VatDisbursementsInput = {
  costType: CostType;
  /** 1. Did the firm act as the client's agent when paying the third party? */
  firmActedAsAgent: boolean;
  /** 2. Did the client (not the firm) receive and use the supply? */
  clientReceivedAndUsed: boolean;
  /** 3. Was the client responsible for paying the third party? */
  clientResponsibleForPayment: boolean;
  /** 4. Did the client authorise the firm to make the payment? */
  clientAuthorisedPayment: boolean;
  /** 5. Did the client know a third party would make the supply? */
  clientKnewThirdPartySupply: boolean;
  /** 6. Is the outlay shown separately on the firm's invoice? */
  itemisedSeparately: boolean;
  /** 7. Does the firm recover only the exact amount paid? */
  exactPassThrough: boolean;
  /** 8. Is the supply clearly additional to the firm's own supply? */
  clearlyAdditional: boolean;
};

export type VatDisbursementsResult = {
  verdict: "disbursement" | "recharge" | "contested";
  verdictLabel: string;
  positive: boolean;
  vatTreatment: string;
  billingGuidance: string;
  caveat: string | null;
  conditionsMet: number;
  conditionsNeeded: number;
};

export const CONDITIONS_NEEDED = 8;

// Preset treatments. A preset with a note carries the hedge the orthodox
// position requires; never return an unqualified "true disbursement" for a
// cost type whose treatment turns on the facts.
const PRESETS: Record<CostType, { verdict: "disbursement" | "recharge" | "contested" | null; note: string | null }> = {
  "court-fees": {
    verdict: "disbursement",
    note:
      "Court and tribunal fees are the clean case: the fee is payable by the client, the firm is a pure conduit, and the amount is passed through exactly. Keep the authority to pay and the itemised bill line as evidence that all eight conditions in VAT Notice 700 §25.1.1 were met.",
  },
  "land-registry": {
    // HP §6.A: a flat "true disbursement" for Land Registry fees is the
    // pre-Brabners error, because search fees and registration fees are not
    // the same animal. Registration fees pass through; search fees turn on use.
    verdict: "contested",
    note:
      "Land Registry fees split two ways. A registration fee the client is liable for, paid by the firm as a conduit and passed on exactly, is a disbursement. A SEARCH fee is different: under Brabners LLP v HMRC [2017] UKFTT 0666 (TC) and Revenue and Customs Brief 6 (2020), if the firm uses or interprets the search result in its own advice, the fee is part of the firm's standard-rated supply and VAT is due on the recharge. The postal-search concession ended on 1 December 2020, so post versus electronic no longer decides it. Classify registration and search lines separately.",
  },
  "local-auth-search": {
    verdict: "contested",
    note:
      "Under Brabners LLP v HMRC [2017] UKFTT 0666 (TC) the test is how the firm USES the search result, not how it was obtained. If the firm interprets the result and reports on it to the client, the fee is a cost component of the firm's own standard-rated supply and VAT is chargeable on the full recharge. Only a result passed to the client unused and uninterpreted, meeting all eight conditions, can be a disbursement. Revenue and Customs Brief 6 (2020) withdrew the postal-search concession from 1 December 2020.",
  },
  "counsel-fees": {
    // HP §6.B: the DEFAULT is a supply to the firm. Returning a bare
    // "true disbursement" here was the defect this preset used to carry.
    verdict: "contested",
    note:
      "The default position is that counsel's fee is a supply TO THE FIRM, which the firm uses in making its own onward supply to the client: recover the input VAT on counsel's fee note and charge output VAT on your total fee, counsel's element included. Counsel's fee is a disbursement only in the narrower case where counsel acts as the CLIENT's agent, in the client's name and on the client's instruction (some direct-access arrangements). HMRC's long-standing concession lets a firm pass counsel's VAT-bearing fee note to the client as a disbursement, but only where the firm does not itself reclaim that input VAT. You cannot do both.",
  },
  "medical-records": {
    verdict: "contested",
    note:
      "Where the firm holds a direct contract with a medical records retrieval provider, the supply is made to the firm as principal and the cost is a standard-rated recharge. Where the provider supplies the client and the firm pays as the client's agent, it can be a disbursement if all eight conditions are met. Check your supplier contract.",
  },
  "expert-reports": {
    verdict: "contested",
    note:
      "If the client retained the expert directly and the firm merely arranged and paid on the client's behalf, this can be a disbursement. If the firm is the named party to the instruction letter or retainer, the supply is to the firm and the recharge to the client is standard-rated.",
  },
  "stamp-duty": {
    verdict: "disbursement",
    note:
      "SDLT, LBTT and LTT are taxes the client is liable for, paid over by the firm as a conduit. Show the exact amount separately on the bill and keep the client's authority to pay.",
  },
  "search-indemnity": {
    verdict: "contested",
    note:
      "A search indemnity policy taken out in the client's name and passed on at cost can be a disbursement. Where the firm holds the policy or block cover in its own name, the supply is to the firm and the recharge is standard-rated. Check whose name is on the policy.",
  },
  custom: {
    verdict: null,
    note: null,
  },
};

const VERDICT_LABELS: Record<"disbursement" | "recharge" | "contested", string> = {
  disbursement: "True disbursement: outside scope of VAT",
  recharge: "Recharge: VATable at the firm's standard rate",
  contested: "Fact-specific: check the conditions against this matter",
};

const VAT_TREATMENT: Record<"disbursement" | "recharge" | "contested", string> = {
  disbursement:
    "Do not charge VAT on this item. Show it separately on the VAT invoice as a disbursement. The amount must match the third party's charge exactly. The firm cannot reclaim input VAT on this cost.",
  recharge:
    "Charge VAT at the standard rate (20%) on this item. The firm can reclaim input VAT on the original supplier cost. Show the net recharge plus VAT on the fee note.",
  contested:
    "The treatment turns on the facts of the matter and the terms of the supplier contract. Work through all eight conditions in VAT Notice 700 §25.1.1 for this specific cost before billing.",
};

const BILLING_GUIDANCE: Record<"disbursement" | "recharge" | "contested", string> = {
  disbursement:
    "On the client bill: show as a separate line 'Disbursement: [description], [amount]'. Do not include it in the VAT calculation. Retain the third party's invoice as evidence.",
  recharge:
    "On the client bill: show as 'Expenses/Recharge: [description], [net] + VAT at 20%'. Include it in the VAT return as a standard-rated supply.",
  contested:
    "Decide the treatment on the facts before billing. Where it is genuinely finely balanced, the lower-risk default is to treat the cost as a recharge and charge VAT, because under-declaring output VAT carries the greater exposure.",
};

export function classifyVatDisbursement(input: VatDisbursementsInput): VatDisbursementsResult {
  const preset = PRESETS[input.costType];

  if (preset.verdict !== null) {
    const v = preset.verdict;
    return {
      verdict: v,
      verdictLabel: VERDICT_LABELS[v],
      positive: v === "disbursement",
      vatTreatment: VAT_TREATMENT[v],
      billingGuidance: BILLING_GUIDANCE[v],
      caveat: preset.note,
      conditionsMet: v === "disbursement" ? CONDITIONS_NEEDED : 0,
      conditionsNeeded: CONDITIONS_NEEDED,
    };
  }

  // Custom / questionnaire path: all eight VAT Notice 700 §25.1.1 conditions.
  const conditions = [
    input.firmActedAsAgent,
    input.clientReceivedAndUsed,
    input.clientResponsibleForPayment,
    input.clientAuthorisedPayment,
    input.clientKnewThirdPartySupply,
    input.itemisedSeparately,
    input.exactPassThrough,
    input.clearlyAdditional,
  ];
  const conditionsMet = conditions.filter(Boolean).length;
  const allMet = conditionsMet === CONDITIONS_NEEDED;

  const verdict = allMet ? "disbursement" : "recharge";

  return {
    verdict,
    verdictLabel: VERDICT_LABELS[verdict],
    positive: allMet,
    vatTreatment: VAT_TREATMENT[verdict],
    billingGuidance: BILLING_GUIDANCE[verdict],
    caveat:
      conditionsMet === CONDITIONS_NEEDED - 1
        ? "Seven of the eight conditions in VAT Notice 700 §25.1.1 are met. A single failing condition makes the payment part of the firm's own standard-rated supply. Review the failing condition: it is sometimes correctable by changing how the cost is contracted, authorised or billed."
        : null,
    conditionsMet,
    conditionsNeeded: CONDITIONS_NEEDED,
  };
}
