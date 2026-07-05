/**
 * Tool 4: SRA client-account reserve and interest planner.
 *
 * toolId: sra-client-account-premium
 * topic: sra-compliance
 *
 * Reuses calcSraReserve for the reserve sizing. The corrected Rule 12.2 exemption
 * test (HP §5.G) is computed INSIDE this premium compute() using the correct
 * averageBalance/maximumBalance inputs, bypassing the lib's old test entirely.
 *
 * FIGURES TRACED:
 * - calcSraReserve: indicative operational buffer (existing golden-tested lib).
 * - Rule 12.2 exemption: HP §5 / §5.G: average not exceeding £10,000 AND maximum
 *   not exceeding £250,000. "Do NOT use any £250 figure."
 * - Rule 12.1 trigger: holding any client money (HP §5.G).
 * - Rule 3.3 banking-facility prohibition; Rule 8.3 five-weekly reconciliation (HP §5).
 * - COFA responsibility (HP §1, §5).
 *
 * COMPLIANCE FRAMING (HP §5): this tool is framed as an OPERATIONAL PLANNING tool,
 * not a regulatory requirement. Do NOT give regulatory-defence or SRA-enforcement advice.
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcSraReserve, type Volume, type MatterType } from "@/lib/tools/compute/sra-client-account-reserve";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const sraClientAccountConfig: PremiumToolConfig = {
  id: "sra-client-account-premium",
  topic: "sra-compliance",
  title: "SRA client account reserve and interest planner",
  intro: "Size an indicative operational buffer for your client account from your matter mix and volume, and see whether small balances could fall inside the SRA accountant's-report exemption. This is an operational planning tool, not a regulatory requirement.",
  fields: [
    {
      id: "openMatters",
      label: "Open matters holding client money",
      type: "number",
      default: 150,
      min: 0,
      max: 5000,
      step: 10,
    },
    {
      id: "volume",
      label: "Typical balance per matter",
      type: "select",
      default: "moderate",
      options: [
        { value: "low", label: "Low (around £2,500)" },
        { value: "moderate", label: "Moderate (around £8,000)" },
        { value: "high", label: "High (around £25,000)" },
        { value: "very-high", label: "Very high (around £75,000)" },
      ],
    },
    {
      id: "matterType",
      label: "Main matter type",
      type: "select",
      default: "conveyancing",
      options: [
        { value: "conveyancing", label: "Conveyancing (residential or commercial)" },
        { value: "litigation", label: "Litigation" },
        { value: "private-client", label: "Private client (probate, trust)" },
        { value: "commercial", label: "Commercial or corporate" },
        { value: "mixed", label: "Mixed" },
      ],
    },
    {
      id: "averageBalance",
      label: "Average client-account balance in the period",
      type: "currency",
      default: 8000,
      min: 0,
      max: 10000000,
      step: 500,
      advanced: true,
      help: "Drives the Rule 12.2 exemption test: average not exceeding £10,000 (HP §5.G)",
    },
    {
      id: "maxBalance",
      label: "Maximum client-account balance in the period",
      type: "currency",
      default: 240000,
      min: 0,
      max: 100000000,
      step: 10000,
      advanced: true,
      help: "Drives the Rule 12.2 exemption test: maximum not exceeding £250,000 (HP §5.G)",
    },
  ],
  compute({ values }): PremiumResult {
    const openMatters = Math.max(0, Math.round(Number(values.openMatters) || 0));
    const volume = String(values.volume) as Volume;
    const matterType = String(values.matterType) as MatterType;
    const averageBalance = Number(values.averageBalance) || 0;
    const maxBalance = Number(values.maxBalance) || 0;

    const r = calcSraReserve({ openMatters, volume, matterType });

    // Corrected Rule 12.2 exemption test (HP §5.G):
    //   average client-account balance not exceeding £10,000
    //   AND maximum client-account balance not exceeding £250,000.
    // NEVER use £250 as a threshold. The correct maximum threshold is £250,000.
    const withinExemption = averageBalance <= 10000 && maxBalance <= 250000;

    const exemptionRow = withinExemption
      ? {
          label: "Accountant's report exemption (Rule 12.2)",
          value: "Likely within exemption",
          strong: true as const,
        }
      : {
          label: "Accountant's report exemption (Rule 12.2)",
          value: "Report likely required",
        };

    const chartData = [
      { name: "Peak client money", value: Math.round(r.peakClientMoney) },
      { name: "Suggested reserve", value: Math.round(r.suggestedReserve) },
    ];

    return {
      headline: {
        label: "Suggested operational reserve",
        value: gbp(r.suggestedReserve),
        sub: `range ${gbp(r.lowReserve)} to ${gbp(r.highReserve)} on an estimated ${gbp(r.peakClientMoney)} of client money`,
        tone: "warn",
      },
      breakdown: [
        { label: "Estimated peak client money", value: gbp(r.peakClientMoney) },
        { label: "Matter-type risk factor applied", value: String(matterType) },
        { label: "Suggested mid-point reserve", value: gbp(r.suggestedReserve), strong: true },
        { label: "Reserve range (low to high)", value: `${gbp(r.lowReserve)} to ${gbp(r.highReserve)}` },
        exemptionRow,
      ],
      chart: { data: chartData },
      note: "The SRA Accounts Rules do not mandate a firm-side reserve: this is an operational risk-sizing estimate only. Client money is not the firm's income. The Rule 3.3 banking-facility prohibition (every payment must relate to regulated services) and the Rule 8.3 five-weekly reconciliation (signed off by the COFA or a manager) are the real compliance controls. Reserve decisions belong to the firm's COFA and its specialist accountant. The Rule 12.2 accountant's-report exemption applies where the average client-account balance in the period did not exceed £10,000 AND the maximum did not exceed £250,000 (HP §5.G): both conditions must be met. A firm that holds NO client money at all during an accounting period does not meet the Rule 12.1 report trigger and needs no report. These are estimates, not regulatory advice.",
    };
  },
  chart: {
    kind: "bar",
    valueFormat: "currency",
    series: [
      { dataKey: "value", label: "Amount", color: "var(--primary)" },
    ],
  },
  explainer: {
    heading: "What this planner estimates",
    paragraphs: [
      "The SRA Accounts Rules 2019 do not require firms to hold a specific reserve against client money. However, a prudent operational buffer covers: shortfalls discovered at the five-weekly reconciliation (Rule 8.3) that need to be funded from the office account pending investigation, residual balances awaiting return to clients, and contingency for client-money interest payments (Rule 7). The planner estimates peak exposure (matters multiplied by the typical balance per volume band) and applies a risk factor by matter type. Conveyancing attracts the highest factor because of fraud risk, fund misdirection and Land Registry completion errors.",
      "The Rule 12.2 accountant's-report exemption is separate from the reserve question. A firm that held client money during the accounting period must obtain an accountant's report (Rule 12.1), UNLESS both conditions of the Rule 12.2 exemption are met: the average client-account balance in the period did not exceed £10,000 AND the maximum did not exceed £250,000 (HP §5.G). A firm that holds no client money at all does not meet the Rule 12.1 trigger and needs no report.",
      "The COFA (Compliance Officer for Finance and Administration) carries primary responsibility for SRA Accounts Rules compliance. Reserve sizing decisions should involve the COFA and the firm's specialist accountant, taking account of the firm's actual reconciliation history, matter profile and risk appetite.",
    ],
  },
};
