import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import {
  checkColpCofa,
  type FirmType,
  type FirmSize,
  type Appointments,
  type PracticeArea,
} from "@/lib/tools/compute/colp-cofa-checker";

export const colpCofaCheckerTool: GenericTool = {
  kind: "generic",
  slug: "colp-cofa-checker",
  name: "COLP & COFA Compliance Checker",
  category: "SRA Compliance",
  oneLiner:
    "Personalised COLP and COFA duty matrix for SRA-regulated firms, including breach-reporting thresholds and accountant's report obligations.",
  embedHeight: 640,
  metaTitle: "COLP & COFA Compliance Checker | SRA Compliance Officer Duties Tool",
  metaDescription:
    "Free COLP/COFA checker for SRA-regulated law firms. Enter your firm type and appointments to get a personalised duty matrix, reportable vs recordable breach guidance and key SRA rule references.",
  intro:
    "Every SRA-authorised firm, from a sole practice to a 500-fee-earner ABS, must have an approved Compliance Officer for Legal Practice (COLP) and a Compliance Officer for Finance and Administration (COFA) at all times. Answer five questions about your firm and this checker builds a personalised obligations matrix: which appointments you still need, who can hold the roles, when a breach is reportable to the SRA rather than merely recordable, and whether the annual accountant's report applies to you.",
  ctaLabel: "Talk to a solicitor-specialist accountant",
  fields: [
    {
      id: "firmType",
      label: "Firm structure",
      type: "select",
      default: "llp",
      options: [
        { value: "sole", label: "Recognised sole practice" },
        { value: "partnership", label: "General partnership" },
        { value: "llp", label: "LLP" },
        { value: "company", label: "Limited company (recognised body)" },
        { value: "abs", label: "Alternative business structure (licensed body / ABS)" },
      ],
    },
    {
      id: "firmSize",
      label: "Number of solicitors / fee earners",
      type: "select",
      default: "2-10",
      options: [
        { value: "1", label: "Just me (sole practitioner)" },
        { value: "2-10", label: "2 to 10" },
        { value: "11-50", label: "11 to 50" },
        { value: "51+", label: "51 or more" },
      ],
    },
    {
      id: "appointments",
      label: "Current compliance officer appointments",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "Neither appointed yet" },
        { value: "colp-only", label: "COLP appointed, no COFA" },
        { value: "cofa-only", label: "COFA appointed, no COLP" },
        { value: "both", label: "Both COLP and COFA in place" },
      ],
    },
    {
      id: "holdsClientMoney",
      label: "Does the firm hold or receive client money?",
      type: "toggle",
      default: true,
    },
    {
      id: "practiceArea",
      label: "Main area of practice",
      type: "select",
      default: "conveyancing",
      options: [
        { value: "conveyancing", label: "Conveyancing (residential / commercial)" },
        { value: "private-client", label: "Private client (probate, trusts, estates)" },
        { value: "litigation", label: "Litigation / dispute resolution" },
        { value: "commercial", label: "Commercial / corporate" },
        { value: "mixed", label: "Mixed practice" },
      ],
    },
  ],
  compute(values) {
    const r = checkColpCofa({
      firmType: String(values.firmType) as FirmType,
      firmSize: String(values.firmSize) as FirmSize,
      appointments: String(values.appointments) as Appointments,
      holdsClientMoney: Boolean(values.holdsClientMoney),
      practiceArea: String(values.practiceArea) as PracticeArea,
    });

    return {
      headline: {
        label: "Compliance officer position",
        value: r.headlineValue,
        sub: r.headlineSub,
        tone: r.compliant ? ("good" as const) : ("warn" as const),
      },
      verdict: { text: r.verdictText, positive: r.compliant },
      rows: r.rows,
      note: r.note,
    };
  },
  explainer: {
    heading: "How the COLP/COFA framework works, with worked examples",
    paragraphs: [
      "The requirement to have compliance officers sits in rule 8.1 of the SRA Authorisation of Firms Rules: an authorised body must at all times have an individual approved by the SRA as its COLP and another (or the same individual) as its COFA. The duties of each officer are set out in paragraphs 9.1 and 9.2 of the SRA Code of Conduct for Firms. Broadly, the COLP owns compliance with the firm's authorisation terms and all regulatory arrangements except the Accounts Rules, which belong to the COFA. Both must take all reasonable steps to ensure compliance and to report serious breaches promptly.",
      "The reportable versus recordable distinction is the part firms most often get wrong. A serious breach must be reported to the SRA promptly (Code of Conduct for Firms, paragraph 3.9, reinforced by the officers' own duties in paragraphs 9.1 and 9.2). A breach that is not serious in isolation should still be recorded in the firm's breach register, because the SRA expects officers to monitor for patterns: five small reconciliation errors in a quarter can amount to a serious systemic breach even though no single error would. Seriousness is assessed on factors such as harm caused, intent or recklessness, whether it forms part of a pattern, and how quickly it was remedied.",
      "Worked example 1: a 4-partner conveyancing LLP holding client money, with no officers appointed. The matrix shows two outstanding appointments. The COLP must be a lawyer who is a manager or employee; the COFA need not be a lawyer, so many firms appoint their practice manager or finance director. Because the firm holds client money it must obtain an accountant's report within 6 months of its accounting period end (SRA Accounts Rules, rule 12.1), and with typical residential completion funds of £250,000 to £400,000 passing through the client account, its maximum balance will far exceed the £250,000 ceiling in rule 12.2, so the de minimis exemption is unavailable.",
      "Worked example 2: a sole practitioner doing litigation only, who never handles client money (damages are paid direct to clients and fees are billed in arrears). She is deemed to satisfy the approval requirement as COLP and COFA of her own recognised sole practice, so no separate approval application is normally needed. With no client money held there is no accountant's report to obtain under rule 12.1, but she should keep evidence of that position, and the COLP-side duties (supervision, conflicts, reporting serious conduct breaches) apply exactly as they would in a 50-partner firm.",
      "For firms that do hold client money but at low levels, rule 12.2 of the Accounts Rules removes the accountant's report obligation where the average client account balance over the reporting period was £10,000 or less and the maximum balance was £250,000 or less. A legal aid firm receiving only Legal Aid Agency money is also outside the client money regime for most practical purposes. If you are near these thresholds, measure them properly from your reconciliations rather than estimating.",
    ],
  },
  faqs: [
    {
      question: "Can the same person be both COLP and COFA?",
      answer:
        "Yes, provided they meet the eligibility conditions for both roles. In practice this is common in small firms: the sole practitioner or senior partner holds both. The COLP must be a lawyer and a manager or employee of the firm; the COFA must be a manager or employee but does not need to be legally qualified, which is why larger firms often split the roles between a senior solicitor and a finance director.",
    },
    {
      question: "What is the difference between a reportable and a recordable breach?",
      answer:
        "A serious breach must be reported promptly to the SRA under paragraph 3.9 of the Code of Conduct for Firms and the officers' duties in paragraphs 9.1 and 9.2. A non-serious breach is recordable: it goes in the firm's breach register and is reviewed for patterns. Seriousness turns on harm, intent, pattern and remediation. Repeated minor breaches can become serious in aggregate, so an accurate, honest register is itself a compliance control.",
    },
    {
      question: "Do sole practitioners really need a COLP and COFA?",
      answer:
        "Yes. The requirement in rule 8.1 of the SRA Authorisation of Firms Rules applies to every authorised body regardless of size. The concession for recognised sole practices is procedural: the sole practitioner is normally deemed approved to act as their own COLP and COFA, so no separate approval application is needed. The duties themselves are not reduced.",
    },
    {
      question: "Is the COFA personally liable if the firm breaches the Accounts Rules?",
      answer:
        "The COFA's duty under paragraph 9.2 of the Code of Conduct for Firms is to take all reasonable steps to ensure the firm complies with the Accounts Rules and to report serious breaches. An officer who has taken all reasonable steps is not automatically culpable for a breach caused by others, but a COFA who ignores warning signs, fails to run reconciliations or sits on a known shortfall can face personal regulatory action alongside the firm.",
    },
    {
      question: "Does my firm need an accountant's report?",
      answer:
        "If the firm held or received client money in the accounting period, rule 12.1 of the SRA Accounts Rules requires it to obtain an accountant's report within 6 months of the period end, and to deliver it to the SRA only if it is qualified. Rule 12.2 provides an exemption where the average client account balance did not exceed £10,000 and the maximum did not exceed £250,000. Firms holding no client money at all fall outside rule 12.1 but should retain evidence of that.",
    },
    {
      question: "What happens if we operate without an approved COLP or COFA?",
      answer:
        "Operating without the required officers is itself a breach of your terms of authorisation, and one the SRA treats seriously because the whole supervision model depends on the roles being filled. If an officer resigns or leaves, tell the SRA and nominate a replacement without delay; the firm must have both officers in place at all times, not merely most of the time.",
    },
  ],
  related: [
    { label: "SRA Client Account Reserve calculator", href: "/calculators/sra-client-account-reserve" },
  ],
};
