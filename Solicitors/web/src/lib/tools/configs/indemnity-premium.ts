import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcIndemnityPremium, type PracticeArea, type ClaimsHistory } from "@/lib/tools/compute/indemnity-premium";

export const indemnityPremiumTool: GenericTool = {
  kind: "generic",
  slug: "indemnity-premium-estimator",
  name: "PII Premium Estimator",
  category: "Practice Finance",
  oneLiner:
    "Indicative annual PII premium by gross fees, practice area, claims history and cover level.",
  embedHeight: 500,
  metaTitle: "Solicitors PII Premium Estimator 2025/26 | Law Firm Indemnity Insurance Cost",
  metaDescription:
    "Free solicitors PII premium calculator. Estimate your annual professional indemnity insurance cost by practice area, claims history and cover level. UK 2025/26 market rates.",
  intro:
    "Professional indemnity insurance is a mandatory SRA requirement and a significant practice expense. This tool gives a directional range based on your gross fees, practice area, claims history and cover level — useful for budget planning and broker comparison.",
  fields: [
    {
      id: "grossFees",
      label: "Annual gross fee income",
      type: "currency",
      default: 2000000,
      min: 0,
      max: 50000000,
      step: 50000,
    },
    {
      id: "practiceArea",
      label: "Primary practice area",
      type: "select",
      default: "mixed",
      options: [
        { value: "conveyancing-heavy", label: "Conveyancing-heavy (50%+ conveyancing)" },
        { value: "mixed", label: "Mixed practice" },
        { value: "commercial", label: "Commercial / corporate" },
        { value: "private-client", label: "Private client (wills, probate, trusts)" },
        { value: "litigation", label: "Litigation (commercial or general)" },
        { value: "criminal", label: "Criminal law" },
      ],
    },
    {
      id: "claimsHistory",
      label: "Claims history (last 5 years)",
      type: "select",
      default: "none-5y",
      options: [
        { value: "none-5y", label: "No claims in 5 years" },
        { value: "minor-claim", label: "Minor claim (settled under £25k)" },
        { value: "moderate-claim", label: "Moderate claim (£25k-£250k)" },
        { value: "major-claim", label: "Major claim (£250k+)" },
      ],
    },
    {
      id: "feeEarnerCount",
      label: "Fee-earner count",
      type: "number",
      default: 10,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      id: "coverLevel",
      label: "Cover level",
      type: "select",
      default: "5",
      options: [
        { value: "2", label: "£2m (MTC minimum, unincorporated)" },
        { value: "3", label: "£3m (MTC minimum, incorporated)" },
        { value: "5", label: "£5m" },
        { value: "10", label: "£10m" },
        { value: "20", label: "£20m+" },
      ],
    },
  ],
  compute(values) {
    const grossFees = Number(values.grossFees);
    const practiceArea = String(values.practiceArea) as PracticeArea;
    const claimsHistory = String(values.claimsHistory) as ClaimsHistory;
    const feeEarnerCount = Number(values.feeEarnerCount);
    const coverLevel = parseInt(String(values.coverLevel), 10);
    const r = calcIndemnityPremium({ grossFees, practiceArea, claimsHistory, feeEarnerCount, coverLevel });
    return {
      headline: {
        label: "Indicative annual premium range",
        value: `${gbp(Math.round(r.low))} to ${gbp(Math.round(r.high))}`,
        sub: `Mid-point: ${gbp(Math.round(r.indicativePremium))} (tax-deductible trade expense)`,
        tone: "default" as const,
      },
      rows: [
        { label: "Low estimate", value: gbp(Math.round(r.low)) },
        { label: "Mid-point", value: gbp(Math.round(r.indicativePremium)), strong: true as const },
        { label: "High estimate", value: gbp(Math.round(r.high)) },
      ],
      note: "Indicative only. UK 2025/26 market rates. Actual premiums depend on underwriter appetite, AML controls, supervision quality, and the underwriter's book for your practice area. Specialist brokers with strong solicitor PII books typically deliver 10-25% better than generalists.",
    };
  },
  explainer: {
    heading: "How PII premiums are calculated",
    paragraphs: [
      "Solicitor PII premiums are expressed as a percentage of gross fee income ('premium rate'). The rate varies by practice area — conveyancing-heavy firms pay the highest rates because of fraud risk and high-value fund movements; commercial and private-client firms pay lower rates.",
      "Claims history is the single biggest rating factor after practice area. A single moderate claim (£25k-£250k) typically adds a 75% premium increase; a major claim can triple the base rate and remain on your claims record for seven or more years.",
      "The MTC (Minimum Terms and Conditions) set by the SRA require cover of at least £2m per claim for unincorporated firms and £3m for incorporated practices (solicitor companies and LLPs). Firms with larger client transactions should carry higher limits.",
    ],
  },
  faqs: [
    {
      question: "Is PII premium tax-deductible?",
      answer:
        "Yes. Professional indemnity insurance is an allowable trading expense for the firm and is fully deductible against profits. It is also exempt from VAT — there is no input VAT to reclaim, but you do not pay VAT on the premium either.",
    },
    {
      question: "How can I reduce my PII premium?",
      answer:
        "The most effective levers are: reducing conveyancing as a proportion of gross fees; maintaining a claims-free record (claims accumulate and drive up premiums for years); strengthening AML controls and file management; and using a specialist solicitor PII broker who places multiple law firm books with underwriters and understands the market.",
    },
    {
      question: "What is the run-off obligation when closing a practice?",
      answer:
        "When a solicitor practice closes, it must maintain run-off professional indemnity cover for six years after the date of closure. The run-off premium is typically 150-300% of the last in-practice premium. This is a material cash cost and should be factored into any succession or closure plan.",
    },
  ],
};
