import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { scrutinyLevel } from "../charity-rules";

export const independentExaminationAuditChecker: GenericTool = {
  kind: "generic",
  slug: "independent-examination-vs-audit-checker",
  name: "Independent Examination vs Audit Checker",
  category: "Accounts & Scrutiny",
  oneLiner:
    "Check whether your charity needs an independent examination or a full statutory audit under the England and Wales thresholds.",
  metaTitle: "Charity Audit Threshold Checker | Independent Examination or Audit?",
  metaDescription:
    "Enter your charity's gross income and assets to see whether you need no external scrutiny, an independent examination, or a statutory audit under the Charities Act thresholds (England and Wales, 2026/27).",
  intro:
    "The Charities Act sets clear gates: independent examination once gross income passes £25,000, a qualified examiner and accruals accounts above £250,000, and a statutory audit above £1m income (or £250,000 income with assets over £3.26m). Enter your figures to see where your charity sits.",
  ctaLabel: "Speak to us about your independent examination",
  embedHeight: 680,
  fields: [
    {
      id: "income",
      label: "Gross annual income",
      type: "currency",
      default: 60000,
      step: 5000,
      help: "Total gross income for the financial year, before any expenditure.",
    },
    {
      id: "assets",
      label: "Gross assets at year end",
      type: "currency",
      default: 100000,
      step: 10000,
      help: "The aggregate value of assets before deducting liabilities. Only relevant once income exceeds £250,000.",
    },
    {
      id: "isCompany",
      label: "The charity is a charitable company",
      type: "toggle",
      default: false,
      help: "Charitable companies must always prepare accruals accounts, whatever their income.",
    },
    {
      id: "governingDocRequiresAudit",
      label: "Governing document or a funder requires an audit",
      type: "toggle",
      default: false,
      help: "A clause in your constitution, trust deed or a grant agreement can require an audit even below the statutory thresholds.",
    },
    {
      id: "scotland",
      label: "The charity is registered in Scotland (OSCR)",
      type: "toggle",
      default: false,
      advanced: true,
      help: "Scotland has its own regime and ALL Scottish charities need some external scrutiny. This checker covers England and Wales only.",
    },
  ],
  compute: (v) => {
    if (v.scotland) {
      return {
        headline: { label: "Scrutiny requirement", value: "Scotland: different rules", tone: "warn" },
        verdict: { text: "This checker covers England and Wales only", positive: false },
        note:
          "Scottish charities are regulated by OSCR and every Scottish charity needs external scrutiny of its accounts regardless of size, with thresholds that differ from England and Wales. Check the OSCR guidance rather than relying on this result.",
      };
    }
    const r = scrutinyLevel({
      income: Number(v.income),
      assets: Number(v.assets),
      isCompany: Boolean(v.isCompany),
      governingDocRequiresAudit: Boolean(v.governingDocRequiresAudit),
    });
    const levelLabel =
      r.level === "audit"
        ? "Statutory audit required"
        : r.level === "independent-examination"
          ? "Independent examination required"
          : "No external scrutiny required";
    return {
      headline: {
        label: "Your scrutiny requirement",
        value: levelLabel,
        tone: r.level === "audit" ? "warn" : r.level === "none" ? "good" : "default",
      },
      rows: [
        { label: "External scrutiny", value: levelLabel, strong: true },
        {
          label: "Accounts basis",
          value: r.accrualsRequired ? "Accruals accounts (Charities SORP)" : "Receipts and payments allowed",
        },
        {
          label: "Examiner qualification",
          value:
            r.level === "audit"
              ? "Registered auditor"
              : r.qualifiedExaminerRequired
                ? "Examiner must belong to a listed body (ICAEW, ACCA, AAT etc.)"
                : r.level === "independent-examination"
                  ? "Any suitably experienced independent person"
                  : "Not applicable",
        },
      ],
      note: r.reason,
    };
  },
  explainer: {
    heading: "Charity audit and independent examination thresholds explained",
    paragraphs: [
      "England and Wales charities face three levels of external scrutiny, driven mainly by gross income. Up to £25,000 the Charities Act requires no external scrutiny at all, although trustees must still prepare accounts and, if registered, file an annual return. Once gross income exceeds £25,000, the accounts must at least be independently examined.",
      "Independent examination is a lighter-touch review than an audit. Below £250,000 of income the examiner simply needs to be an independent person with the requisite ability and experience. Once income exceeds £250,000, two things change: the charity must prepare accruals accounts under the Charities SORP, and the independent examiner must be a member of one of the professional bodies listed in the Charities Act, such as ICAEW, ACCA or AAT.",
      "A full statutory audit by a registered auditor becomes compulsory when gross income exceeds £1m, or when income exceeds £250,000 and gross assets exceed £3.26m. On top of the statutory gates, your governing document or a funding agreement can require an audit at any size, so always check both before appointing an examiner.",
      "Scotland runs a separate regime under OSCR: every Scottish charity needs some form of external scrutiny regardless of income, and the detailed thresholds differ. This checker applies the England and Wales rules only.",
    ],
  },
  faqs: [
    {
      question: "What is the charity audit threshold in England and Wales?",
      answer:
        "A statutory audit is required when gross income exceeds £1m, or when gross income exceeds £250,000 and gross assets exceed £3.26m. Below those levels an independent examination normally suffices, provided nothing in your governing document requires an audit.",
    },
    {
      question: "Who can carry out an independent examination?",
      answer:
        "For charities with income of £250,000 or less, any independent person the trustees reasonably believe has the ability and experience to do it. Once income exceeds £250,000, the examiner must belong to one of the bodies listed in the Charities Act, which includes ICAEW, ACCA, AAT and several others.",
    },
    {
      question: "What is the difference between an audit and an independent examination?",
      answer:
        "An audit is a full assurance engagement carried out by a registered auditor, giving a positive opinion that the accounts are true and fair. An independent examination is a more limited review: the examiner checks the records and accounts and reports whether anything gives cause for concern. It is significantly cheaper and is what most small and medium charities need.",
    },
    {
      question: "Can my governing document force an audit even if we are small?",
      answer:
        "Yes. If your constitution, trust deed or articles require an audit, that requirement applies regardless of the statutory thresholds, although older documents can sometimes be amended. Grant funders can also impose audit conditions in their funding agreements.",
    },
    {
      question: "Do the same thresholds apply in Scotland?",
      answer:
        "No. Scottish charities answer to OSCR and all of them need external scrutiny of some form, however small. The income and asset thresholds also differ. If your charity is registered in Scotland (or cross-border), use the OSCR guidance, not the England and Wales figures in this checker.",
    },
    {
      question: "When do we have to prepare accruals accounts?",
      answer:
        "Non-company charities can prepare simpler receipts and payments accounts while gross income is £250,000 or below. Above that, accruals accounts following the Charities SORP are compulsory. Charitable companies must prepare accruals accounts whatever their income. For accounting periods beginning on or after 1 January 2026 the new SORP applies, with tiered reporting requirements.",
    },
  ],
};
