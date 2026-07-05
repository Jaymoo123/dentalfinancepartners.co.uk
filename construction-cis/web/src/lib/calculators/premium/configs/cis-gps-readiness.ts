/**
 * Tool 3: CIS Gross Payment Status readiness scorer (premium).
 *
 * Topic mapping: gross-payment-status. Blog categories: CIS Compliance, CIS Advanced.
 * Primary calculator: cis-gps-eligibility-checker (fleet, capless).
 *
 * Compute reuse: wraps the three-test scorer from the fleet tool BUT implements
 * the CORRECTED HP §2 turnover rule via gpsQualifiesOnTurnover() from cis-tax.ts.
 * This is the manager-ordered fix for defect #6 (brief §0 flag 1):
 *   Fleet tool: threshold = 30000 * partners (no whole-business cap)
 *   This scorer: EITHER route (per-head OR £100,000 whole-business) for
 *     partnerships and limited companies (HP §2 table: "£30,000 per partner OR £100,000 total")
 *
 * Golden delta pinned in premium-tools.test.ts:
 *   partnership, 5 partners, turnover=120000:
 *   - Fleet: threshold=150000, 120000<150000 -> FAIL (capless)
 *   - This scorer: 120000>=100000 whole-business -> PASS (correct HP §2 rule)
 *
 * Annual saving figure = turnover * 0.20 (the 20% no-longer-deducted, HP §1).
 * No chart (pass/fail scorecard; PremiumCalculator renders scenario/breakdown only).
 *
 * HP traces:
 *   GPS turnover table (£30k/£100k)    - HP §2
 *   Three qualifying tests              - HP §2
 *   April 2026 anti-fraud regime        - HP §3
 *   5-year reapplication ban            - HP §3
 *   £100k/year cash-flow cost @ £500k  - HP §3
 *   CIS 20% rate on labour base         - HP §1
 *
 * Tokens: var(--accent) = orange, var(--dark) = slate. No --gold, no --navy.
 */
import type { PremiumToolConfig } from "../types";
import { gpsQualifiesOnTurnover, GPS_WHOLE_BUSINESS_CAP, GPS_PER_HEAD, type EntityType } from "../../cis-tax";
import { gbp } from "../../format";

export const cisGpsReadinessConfig: PremiumToolConfig = {
  id: "cis-gps-readiness-premium",
  topic: "gross-payment-status",
  title: "GPS Readiness Scorer",
  intro:
    "Gross payment status means you are paid in full with no 20% taken at source. You need all three tests. Here is where you stand, including what April 2026 means for keeping it once you have it.",
  fields: [
    {
      id: "entityType",
      label: "Business structure",
      type: "select",
      default: "sole_trader",
      options: [
        { value: "sole_trader", label: "Sole trader" },
        { value: "partnership", label: "Partnership" },
        { value: "limited", label: "Limited company" },
        { value: "closely_controlled", label: "Closely controlled company (5 or fewer controllers)" },
      ],
    },
    {
      id: "annualTurnover",
      label: "Annual net CIS turnover (last 12 months, excluding VAT and materials)",
      type: "currency",
      default: 35000,
      step: 1000,
      help: "Your net CIS turnover: total CIS receipts minus VAT and materials. This is the figure HMRC tests against the threshold.",
    },
    {
      id: "heads",
      label: "Number of partners or directors or controllers",
      type: "number",
      default: 1,
      min: 1,
      max: 20,
      help: "Drives the per-head route. For sole traders this is always 1. For partnerships and limited companies HMRC also tests a £100,000 whole-business threshold (HP §2).",
    },
    {
      id: "filedOnTime",
      label: "All tax returns filed on time for the past 12 months (SA, PAYE, VAT, CIS300)",
      type: "toggle",
      default: true,
    },
    {
      id: "noOverdueTax",
      label: "No overdue tax payments in the past 12 months",
      type: "toggle",
      default: true,
    },
  ],
  compute: ({ values }) => {
    const entityType = (values.entityType as EntityType | undefined) ?? "sole_trader";
    const turnover = Number.isFinite(Number(values.annualTurnover)) ? Number(values.annualTurnover) : 0;
    const heads = Math.max(1, Number.isFinite(Number(values.heads)) ? Number(values.heads) : 1);
    const filedOnTime = values.filedOnTime !== false;
    const noOverdueTax = values.noOverdueTax !== false;

    // Business test: assumed passed (using a CIS tool = UK construction + bank account)
    const passesBusinessTest = true;

    // Turnover test: CORRECTED HP §2 rule with whole-business cap for partnerships/limited
    const turnoverResult = gpsQualifiesOnTurnover({ entityType, heads, turnover });
    const passesTurnoverTest = turnoverResult.passes;

    // Compliance test
    const passesComplianceTest = filedOnTime && noOverdueTax;

    const allPass = passesBusinessTest && passesTurnoverTest && passesComplianceTest;

    // Build failure reasons
    const failures: string[] = [];
    if (!passesTurnoverTest) {
      const { perHeadThreshold } = turnoverResult;
      if (entityType === "sole_trader" || entityType === "closely_controlled") {
        failures.push(
          `Turnover test: your net CIS turnover (${gbp(turnover)}) is below the threshold for your structure (${gbp(perHeadThreshold)})`
        );
      } else {
        // partnership / limited: show both routes
        failures.push(
          `Turnover test: your net CIS turnover (${gbp(turnover)}) is below the per-head threshold (${gbp(perHeadThreshold)}) and below the £100,000 whole-business threshold`
        );
      }
    }
    if (!filedOnTime) failures.push("Compliance test: you have late returns in the past 12 months");
    if (!noOverdueTax) failures.push("Compliance test: you have overdue tax payments");

    // Annual cash-flow gain = turnover * 0.20 (HP §1)
    const annualGain = turnover * 0.20;

    // Threshold description for the turnover row
    let turnoverRowValue: string;
    if (passesTurnoverTest) {
      const routeLabel = turnoverResult.wholeBusinessRoute
        ? `Pass via £100,000 whole-business route (${gbp(turnover)} meets £${GPS_WHOLE_BUSINESS_CAP.toLocaleString("en-GB")})`
        : `Pass via per-head route (${gbp(turnover)} meets ${gbp(turnoverResult.perHeadThreshold)})`;
      turnoverRowValue = routeLabel;
    } else {
      const { perHeadThreshold } = turnoverResult;
      if (entityType === "partnership" || entityType === "limited") {
        turnoverRowValue = `Fail, ${gbp(Math.max(perHeadThreshold, GPS_WHOLE_BUSINESS_CAP) - turnover)} short of the lower qualifying threshold (${gbp(Math.min(perHeadThreshold, GPS_WHOLE_BUSINESS_CAP))})`;
      } else {
        turnoverRowValue = `Fail, ${gbp(perHeadThreshold - turnover)} short of ${gbp(perHeadThreshold)}`;
      }
    }

    const thresholdDisplay =
      entityType === "sole_trader"
        ? `${gbp(GPS_PER_HEAD)} (sole trader)`
        : entityType === "closely_controlled"
        ? `${gbp(GPS_PER_HEAD * heads)} (${heads} controller${heads !== 1 ? "s" : ""} x £${GPS_PER_HEAD.toLocaleString("en-GB")})`
        : `${gbp(GPS_PER_HEAD * heads)} per-head route OR ${gbp(GPS_WHOLE_BUSINESS_CAP)} whole-business route (HP §2)`;

    const note = allPass
      ? `This indicates you are likely to meet the GPS qualifying tests. HMRC carries out its own verification and the final decision rests with them. ` +
        `Apply through your HMRC Business Tax Account or through an agent. ` +
        `From 6 April 2026 (Finance Act 2026), GPS can be revoked immediately with no advance notice if HMRC finds supply-chain fraud connections on a "knew or should have known" standard. ` +
        `A 5-year reapplication ban applies. On £500,000 turnover, losing GPS costs roughly £100,000 a year in cash flow (HP §3).`
      : `To qualify you must pass all three tests. ${failures.join(". ")}. ` +
        `Once qualified, the April 2026 Finance Act 2026 provisions mean that keeping GPS requires ongoing due diligence: HMRC can revoke it immediately for supply-chain fraud connections, with a 5-year reapplication ban.`;

    return {
      headline: {
        label: allPass ? "Ready to apply for GPS" : "Not yet, here is the gap",
        value: allPass ? "Likely eligible" : `${failures.length} test${failures.length !== 1 ? "s" : ""} not met`,
        tone: allPass ? "good" : "warn",
        sub: allPass
          ? `Eliminating the 20% deduction could save you ${gbp(annualGain)} in annual cash flow`
          : failures[0],
      },
      rows: [],
      breakdown: [
        { label: "Business test (UK construction, bank account)", value: "Pass" },
        { label: `Turnover test (threshold: ${thresholdDisplay})`, value: turnoverRowValue },
        { label: "Compliance test (returns and payments)", value: passesComplianceTest ? "Pass" : "Fail" },
        { label: "GPS readiness verdict", value: allPass ? "Likely eligible" : "Not currently eligible", strong: true },
        { label: "Estimated annual cash-flow gain at 20% rate", value: gbp(annualGain) },
      ],
      note,
    };
  },
  explainer: {
    heading: "The three GPS qualifying tests and what April 2026 changed",
    paragraphs: [
      "The business test requires that you carry out construction operations in the UK and receive payments through a bank account. Most registered CIS subcontractors satisfy this automatically.",
      "The turnover test compares your net CIS turnover (total CIS receipts minus VAT and materials) over the last 12 months against the threshold for your business structure. For a sole trader the threshold is £30,000. For a partnership it is £30,000 per partner OR £100,000 for the partnership as a whole. For a limited company it is £30,000 per director OR £100,000 in total. For a closely controlled company it is £30,000 per controller. Net turnover is what matters: labour-only subcontractors find their net figure equals their gross CIS income, while those supplying significant materials may find their net turnover is considerably lower than their invoice total (HP §2).",
      "Finance Act 2026 (Royal Assent 18 March 2026, in force 6 April 2026) introduced a tougher GPS regime. HMRC can now revoke GPS immediately with no advance notice where a contractor knew or should have known about fraudulent connections in the supply chain. A five-year reapplication ban applies, and directors can face personal penalties. On £500,000 annual turnover, losing GPS costs roughly £100,000 a year in cash flow. Getting GPS is only half the task: keeping it now requires ongoing supply-chain due diligence (HP §3).",
    ],
  },
};
