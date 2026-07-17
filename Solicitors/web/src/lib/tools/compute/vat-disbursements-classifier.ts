/**
 * VAT on Disbursements Classifier — pure compute (no React/window/fetch).
 *
 * LEGAL BASIS:
 * - HMRC VAT Notice 700 §25.1 (agent vs principal / disbursement vs recharge).
 * - Brabners LLP v HMRC [2017] UKFTT 0666 (TC): electronic search fee treated
 *   as recharge because Brabners contracted as principal and consumed the data
 *   directly; the supply was to the firm, not the client. Binding for identical
 *   fact patterns; persuasive where facts are analogous.
 * - Law Society Practice Note on VAT and disbursements (updated post-Brabners).
 * - HMRC VAT Manual VATSC70020 (disbursements: agent test).
 *
 * AGENT TEST (all 4 factors must be satisfied for true disbursement):
 *   1. The firm acted as agent — the client authorised the firm to incur the
 *      cost on their behalf and the supplier contracted with the client (or
 *      would treat the client as the contracting party).
 *   2. The client actually consumed / received the supply (not the firm).
 *   3. The firm passed the cost on at exactly the amount charged by the supplier
 *      (no mark-up or margin).
 *   4. The cost is shown separately on the firm's VAT invoice / client bill and
 *      identifiable as a third-party cost.
 *
 * PRESET TREATMENTS (orthodox HMRC position unless flagged as contested):
 *   - court-fees: true disbursement (firm acts as agent, exact pass-through)
 *   - land-registry: true disbursement
 *   - local-auth-search: CONTESTED — paper/postal = disbursement; electronic =
 *       recharge post-Brabners if firm subscribed as principal to a data provider
 *   - counsel-fees: true disbursement (client retained counsel, firm arranged)
 *   - medical-records: true disbursement if supplier invoices the firm as agent
 *       for the client; recharge if firm holds own contract with records provider
 *   - expert-reports: usually disbursement; recharge if firm is party to retainer
 *   - stamp-duty: disbursement (HMRC/SDLT is paid direct; firm is collecting agent)
 *   - search-indemnity: typically disbursement (passed directly at cost)
 *   - custom: full 4-factor questionnaire used
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
  /** Did the firm contract with the supplier as agent for the client? */
  firmActedAsAgent: boolean;
  /** Did the client (not the firm) consume the supply? */
  clientConsumed: boolean;
  /** Is the cost passed to the client at the exact amount charged by the supplier? */
  exactPassThrough: boolean;
  /** Is the cost itemised separately on the client bill? */
  itemisedSeparately: boolean;
};

export type VatDisbursementsResult = {
  verdict: "disbursement" | "recharge" | "contested";
  verdictLabel: string;
  positive: boolean;
  vatTreatment: string;
  billingGuidance: string;
  caveat: string | null;
  factorsMet: number;
  factorsNeeded: number;
};

// Preset overrides — apply before evaluating questionnaire answers
// positive = true means disbursement (outside VAT); false = recharge; null = use questionnaire
const PRESETS: Record<CostType, { verdict: "disbursement" | "recharge" | "contested" | null; note: string | null }> = {
  "court-fees": {
    verdict: "disbursement",
    note: null,
  },
  "land-registry": {
    verdict: "disbursement",
    note: null,
  },
  "local-auth-search": {
    // ponytail: split verdict here — paper = disbursement, electronic = contested/recharge post-Brabners
    // We cannot distinguish paper vs electronic from a single select, so return contested with a clear note.
    verdict: "contested",
    note:
      "Paper/postal local authority searches are orthodox disbursements. Electronic searches obtained via a data aggregator (e.g. TM Group, Groundsure) are treated as recharged services under Brabners v HMRC [2017] UKFTT 0666: the firm is the contracting party and the data is consumed by the firm before being reported to the client. VAT is chargeable on the full recharge amount.",
  },
  "counsel-fees": {
    verdict: "disbursement",
    note: null,
  },
  "medical-records": {
    verdict: "contested",
    note:
      "Where the firm holds a direct contract with a medical records retrieval provider, the supply is made to the firm (principal) and the cost is a recharge, so VAT applies. Where the medical provider invoices the client directly and the firm pays as agent, it is a true disbursement. Check your supplier contract.",
  },
  "expert-reports": {
    verdict: "contested",
    note:
      "If the client retained the expert directly (firm arranged on the client's behalf), this is a disbursement. If the firm is the named party to the instruction letter or retainer, the supply is to the firm and the recharge to the client is VATable.",
  },
  "stamp-duty": {
    verdict: "disbursement",
    note: null,
  },
  "search-indemnity": {
    verdict: "disbursement",
    note: null,
  },
  custom: {
    verdict: null,
    note: null,
  },
};

const VERDICT_LABELS: Record<"disbursement" | "recharge" | "contested", string> = {
  disbursement: "True disbursement: outside scope of VAT",
  recharge: "Recharge: VATable at firm's standard rate",
  contested: "Contested: fact-specific, review contract",
};

const VAT_TREATMENT: Record<"disbursement" | "recharge" | "contested", string> = {
  disbursement:
    "Do not charge VAT on this item. Show it separately on the VAT invoice as a disbursement. The amount must match the supplier's invoice exactly. The firm cannot reclaim input VAT on this cost.",
  recharge:
    "Charge VAT at the standard rate (20%) on this item. The firm can reclaim input VAT on the original supplier cost. Show the net recharge plus VAT on the fee note.",
  contested:
    "VAT treatment depends on the specific contract with the supplier. Review the supplier invoice and your retainer terms before deciding. Seek advice from your VAT-registered accountant.",
};

const BILLING_GUIDANCE: Record<"disbursement" | "recharge" | "contested", string> = {
  disbursement:
    "On the client bill: show as a separate line 'Disbursement: [description], [amount]'. Do not include in the VAT calculation. Retain the supplier's invoice as evidence.",
  recharge:
    "On the client bill: show as 'Expenses/Recharge: [description], [net] + VAT at 20%'. Include in the VAT return as a taxable supply at the standard rate.",
  contested:
    "Seek written advice before billing. If uncertain, the safer default is to treat as a recharge and charge VAT, since underdeclaring VAT carries greater risk than overdeclaring.",
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
      factorsMet: 4,
      factorsNeeded: 4,
    };
  }

  // Custom / questionnaire path: count HMRC agent-test factors
  const factors = [
    input.firmActedAsAgent,
    input.clientConsumed,
    input.exactPassThrough,
    input.itemisedSeparately,
  ];
  const factorsMet = factors.filter(Boolean).length;
  const allMet = factorsMet === 4;

  const verdict = allMet ? "disbursement" : "recharge";

  return {
    verdict,
    verdictLabel: VERDICT_LABELS[verdict],
    positive: allMet,
    vatTreatment: VAT_TREATMENT[verdict],
    billingGuidance: BILLING_GUIDANCE[verdict],
    caveat:
      factorsMet === 3
        ? "Three of the four HMRC agent-test factors are met. A single failing factor means this is treated as a recharge. Review the failing condition, it may be correctable by adjusting how the cost is contracted or billed."
        : null,
    factorsMet,
    factorsNeeded: 4,
  };
}
