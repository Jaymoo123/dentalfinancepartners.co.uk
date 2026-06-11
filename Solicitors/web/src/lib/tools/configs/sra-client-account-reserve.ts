import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcSraReserve, type Volume, type MatterType } from "@/lib/tools/compute/sra-client-account-reserve";

export const sraClientAccountReserveTool: GenericTool = {
  kind: "generic",
  slug: "sra-client-account-reserve",
  name: "SRA Client Account Reserve",
  category: "SRA Compliance",
  oneLiner:
    "Indicative client money exposure and prudent reserve sizing for SRA-regulated firms.",
  embedHeight: 480,
  metaTitle: "SRA Client Account Reserve Calculator | Law Firm Client Money Reserve",
  metaDescription:
    "Free SRA client account reserve calculator. Size your prudent operational buffer for SRA Accounts Rules compliance. Includes Rule 12.2 de minimis check.",
  intro:
    "Solicitors holding client money face reconciliation obligations under the SRA Accounts Rules. This tool sizes the prudent operational reserve you should maintain — covering shortfall remediation, residual balances and contingency — based on your open-matter profile.",
  fields: [
    {
      id: "openMatters",
      label: "Average number of open matters with client money",
      type: "number",
      default: 150,
      min: 0,
      max: 5000,
      step: 5,
    },
    {
      id: "volume",
      label: "Typical client money volume",
      type: "select",
      default: "high",
      options: [
        { value: "low", label: "Low (under £5,000 per matter typical)" },
        { value: "moderate", label: "Moderate (£5,000-£15,000 per matter)" },
        { value: "high", label: "High (£15,000-£50,000 per matter, conveyancing-typical)" },
        { value: "very-high", label: "Very high (£50,000+ per matter, high-value conveyancing or commercial)" },
      ],
    },
    {
      id: "matterType",
      label: "Primary matter type",
      type: "select",
      default: "conveyancing",
      options: [
        { value: "conveyancing", label: "Conveyancing (residential / commercial)" },
        { value: "litigation", label: "Litigation" },
        { value: "private-client", label: "Private client (probate, trust)" },
        { value: "commercial", label: "Commercial / corporate" },
        { value: "mixed", label: "Mixed" },
      ],
    },
  ],
  compute(values) {
    const openMatters = Number(values.openMatters);
    const volume = String(values.volume) as Volume;
    const matterType = String(values.matterType) as MatterType;
    const r = calcSraReserve({ openMatters, volume, matterType });

    const rows = [
      { label: "Peak client money exposure", value: gbp(Math.round(r.peakClientMoney)) },
      { label: "Suggested mid-point reserve", value: gbp(Math.round(r.suggestedReserve)), strong: true as const },
      { label: "Conservative (low)", value: gbp(Math.round(r.lowReserve)) },
      { label: "Prudent (high)", value: gbp(Math.round(r.highReserve)) },
    ];

    if (r.exemptionEligible) {
      rows.unshift({ label: "De minimis status", value: "Likely Rule 12.2 exempt" });
    }

    return {
      headline: {
        label: r.exemptionEligible ? "Likely de minimis exempt" : "Indicative client money reserve",
        value: `${gbp(Math.round(r.lowReserve))} to ${gbp(Math.round(r.highReserve))}`,
        sub: r.exemptionEligible
          ? "Peak client money suggests possible Rule 12.2 exemption — confirm with your accountant"
          : `Peak client money exposure: ~${gbp(Math.round(r.peakClientMoney))}`,
        tone: "default" as const,
      },
      rows,
      note: "Operational risk-management buffer only — not a regulatory requirement. The SRA Accounts Rules do not mandate a specific firm-side reserve. Discuss sizing with your COFA and specialist accountant.",
    };
  },
  explainer: {
    heading: "What this calculator estimates",
    paragraphs: [
      "The SRA Accounts Rules (2019) do not mandate firms to hold a specific reserve against client money. However, prudent practice requires a buffer to cover: shortfalls discovered at reconciliation that need to be funded from office account pending investigation, residual balances awaiting client return, and contingency for client money interest payments.",
      "The calculator estimates peak client money exposure (matters x average balance) then applies a risk factor by matter type. Conveyancing attracts the highest factor due to fraud risk, fund misdirection, and registration errors. The range reflects variation in firm controls and the precision of your input estimates.",
      "Rule 12.2 of the SRA Accounts Rules provides a de minimis exemption from the annual Accountant's Report obligation for firms where peak client money held is no more than £10,000 and average balance per client is no more than £250.",
    ],
  },
  faqs: [
    {
      question: "Is this the same as the SRA Accountant's Report?",
      answer:
        "No. The SRA Accountant's Report (formerly Annual Accountant's Report) is a regulatory compliance report prepared by a Reporting Accountant examining whether the firm has complied with the Accounts Rules. This calculator estimates a prudent operational reserve — a different concept from the compliance report.",
    },
    {
      question: "What does the COFA need to do with this figure?",
      answer:
        "The COFA (Compliance Officer for Finance and Administration) is responsible for compliance with the Accounts Rules. The reserve estimate from this tool is input to the COFA's risk assessment and operational buffer decision. It is not a substitute for the COFA's judgment based on the firm's actual reconciliation history and risk profile.",
    },
  ],
};
