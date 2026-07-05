/**
 * Tool 5: NHS UDA contract value and real-terms planner.
 *
 * toolId: uda-nhs-premium
 * topic: nhs (also mapped from uda-calc via resources.ts for defensive completeness)
 *
 * Direct reuse of calcUdaValue. Shows effective UDA value, regional benchmark
 * position and real-terms erosion since the contract was signed.
 *
 * FIGURES TRACED:
 * - calcUdaValue: benchmark ranges England £25-35, Wales £25-38, NI £21-32
 *   (indicative 2025/26 NHS dental contract data); CPI proxy 2.5% per year.
 * - HP §3: always say "there is no national UDA value, only your contract's";
 *   patient charges count towards, not on top of, the contract value.
 * - HP §3.A: year-end reconciliation rule -- deliver 96-100% and a 4% shortfall
 *   carries forward; below 96% the commissioner claws back the overpayment.
 * - HP §3: Scotland uses the item-of-service SDR, not UDAs (stated in note).
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcUdaValue, type UdaRegion } from "@/lib/tools/compute/uda-value";

function fmt2dp(n: number): string {
  return "£" + n.toFixed(2);
}

function pctFmt(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export const udaNhsConfig: PremiumToolConfig = {
  id: "uda-nhs-premium",
  topic: "nhs",
  title: "NHS UDA contract value and real-terms planner",
  intro: "Work out the effective value of your NHS contract per Unit of Dental Activity, see where it sits against the regional benchmark, and see how much its real value has been eroded by inflation since the contract was last signed or restructured.",
  fields: [
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "england",
      options: [
        { value: "england", label: "England" },
        { value: "wales", label: "Wales" },
        { value: "ni", label: "Northern Ireland" },
      ],
    },
    {
      id: "udas",
      label: "Annual UDA target",
      type: "number",
      default: 12000,
      min: 0,
      max: 100000,
      step: 100,
    },
    {
      id: "contractValue",
      label: "Annual contract value",
      type: "currency",
      default: 336000,
      min: 0,
      max: 5000000,
      step: 1000,
    },
    {
      id: "yearSigned",
      label: "Year the contract was last signed or restructured",
      type: "number",
      default: 2019,
      min: 2006,
      max: 2026,
      step: 1,
    },
  ],
  compute({ values }): PremiumResult {
    const region = String(values.region) as UdaRegion;
    const udas = Number(values.udas) || 0;
    const contractValue = Number(values.contractValue) || 0;
    const yearSigned = Number(values.yearSigned) || 2019;

    const result = calcUdaValue(region, udas, contractValue, yearSigned);

    const positionLabel =
      result.positionVsBenchmark === "below"
        ? `below benchmark (£${result.benchmarkLow} to £${result.benchmarkHigh})`
        : result.positionVsBenchmark === "above"
        ? `above benchmark (£${result.benchmarkLow} to £${result.benchmarkHigh})`
        : `within benchmark (£${result.benchmarkLow} to £${result.benchmarkHigh})`;

    const tone = result.positionVsBenchmark === "below" ? "warn" : "good";

    return {
      headline: {
        label: "Your effective UDA value",
        value: fmt2dp(result.effectiveUda),
        sub: `£${result.benchmarkLow} to £${result.benchmarkHigh} regional benchmark · ${positionLabel}`,
        tone,
      },
      breakdown: [
        { label: "Effective UDA value", value: fmt2dp(result.effectiveUda), strong: true },
        { label: "Regional benchmark range", value: `£${result.benchmarkLow} to £${result.benchmarkHigh}` },
        { label: "Position vs benchmark", value: result.positionVsBenchmark },
        { label: "Years since signed or restructured", value: String(result.yearsSinceSigned) },
        { label: "Cumulative inflation since signing (CPI proxy)", value: pctFmt(result.cumulativeCpi) },
        { label: "Real value per UDA in 2026 pounds", value: fmt2dp(result.realValuePerUda) },
      ],
      chart: {
        data: [
          { name: "Your UDA value", value: parseFloat(result.effectiveUda.toFixed(2)) },
          { name: "Real value today", value: parseFloat(result.realValuePerUda.toFixed(2)) },
          { name: "Benchmark low", value: result.benchmarkLow },
          { name: "Benchmark high", value: result.benchmarkHigh },
        ],
      },
      note: "There is no national UDA value: only your contract's. Patient charges count towards the contract value, not on top of it (HP §3). The benchmark ranges are indicative; actual commissioner rates vary. The 2.5% CPI proxy is deliberately conservative: real erosion has been greater in several years. The tool does not model year-end reconciliation: deliver 96% to 100% of target and a 4% shortfall carries forward; below 96% the commissioner claws back the overpayment (HP §3.A). Scotland uses the item-of-service SDR, not UDAs, so this tool does not apply there (HP §3). These are estimates, not advice for your practice.",
    };
  },
  chart: {
    kind: "bar",
    valueFormat: "currency",
    series: [
      { dataKey: "value", label: "Value (£)", color: "var(--gold)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "Your NHS contract pays a fixed annual amount for delivering a set number of Units of Dental Activity. The effective UDA value is simply your annual contract value divided by your UDA target. There is no single national rate: NHS England, NHS Wales and Health and Social Care in Northern Ireland each commission contracts individually, and the rate per UDA has historically varied widely between practices, commissioners and contract periods.",
      "The regional benchmark ranges shown are indicative 2025/26 figures based on NHS dental contract data. An effective UDA value below the benchmark range does not necessarily mean your practice is poorly run: older contracts signed before significant dental inflation can be structurally underfunded regardless of performance. The real-value calculation converts your current UDA rate back to its purchasing-power equivalent at the year the contract was signed, using a 2.5% annual CPI proxy (conservative: actual NHS dental cost inflation has been higher in several recent years).",
      "The year-end reconciliation rule is critical for contract management: delivering between 96% and 100% of your UDA target means the 4% shortfall carries forward to the following year. Delivering below 96% triggers a clawback of the proportionate overpayment (HP §3.A). At very high UDA targets, the risk of a shortfall in a disrupted year is a significant cash-flow consideration.",
    ],
  },
};
