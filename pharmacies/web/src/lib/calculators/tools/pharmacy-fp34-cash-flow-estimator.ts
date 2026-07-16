import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";

/**
 * FP34 cash-flow estimator.
 *
 * Illustrative model of the NHSBSA FP34 payment cycle (HP 7). The advance-on-account
 * percentage is a user input because NHSBSA does not publish a fixed percentage and
 * it varies by pharmacy and period. Payment lag is adjustable (default 2 months, HP 7).
 * No exact advance percentage or payment day is hardcoded.
 */
export const pharmacyFp34CashFlowEstimator: GenericTool = {
  kind: "generic",
  slug: "pharmacy-fp34-cash-flow-estimator",
  name: "NHS FP34 Cash Flow Estimator",
  category: "NHS Contract and Income",
  oneLiner:
    "Model the NHSBSA FP34 payment timeline for your pharmacy: see when advances and full settlements arrive each month and estimate the working-capital gap you need to bridge.",
  metaTitle: "NHS FP34 Cash Flow Calculator for Pharmacies | Pharmacy Tax",
  metaDescription:
    "Estimate the working-capital gap from the NHSBSA FP34 payment lag. Month-by-month receipt timeline based on items dispensed and advance-on-account percentage. Scenario tool.",
  intro:
    "Pharmacy income under the NHS contract is not collected at the counter. Prescriptions are submitted monthly on an FP34 and payment arrives roughly two months later, with an advance on account in the interim. Enter your volume, reimbursement value and advance terms to see the cash receipt timeline and how much working capital you need to bridge the gap.",
  embedHeight: 580,
  fields: [
    {
      id: "monthlyItems",
      label: "Monthly items dispensed",
      type: "number",
      default: 2_000,
      min: 1,
      step: 100,
      help: "Average number of prescription items dispensed per month. Your FP34 submission total.",
    },
    {
      id: "avgReimbursement",
      label: "Average reimbursement per item (£)",
      type: "currency",
      default: 10,
      min: 0,
      help: "Average Drug Tariff reimbursement value per item in pounds. This varies by product mix and is retrospectively adjusted by Category M clawbacks.",
    },
    {
      id: "advancePct",
      label: "Advance on account (%)",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 5,
      help: "The NHSBSA pays an advance on account of the expected settlement. The percentage varies by pharmacy. Enter the figure from your payment schedule or use 50% as an illustrative starting point.",
    },
    {
      id: "paymentLagMonths",
      label: "Payment lag (months)",
      type: "number",
      default: 2,
      min: 1,
      max: 6,
      step: 1,
      help: "Months between FP34 submission and full settlement. Two months is the typical NHSBSA cycle (HP 7). Adjust if your payment schedule differs.",
    },
  ],
  compute(v) {
    const monthlyItems = Math.max(0, Number(v.monthlyItems));
    const avgReimbursement = Math.max(0, Number(v.avgReimbursement));
    const advancePct = Math.min(100, Math.max(0, Number(v.advancePct))) / 100;
    const lag = Math.max(1, Math.round(Number(v.paymentLagMonths)));

    const monthlyClaimValue = monthlyItems * avgReimbursement;
    const advanceAmount = monthlyClaimValue * advancePct;
    const settlementAmount = monthlyClaimValue; // full settlement (advance already received)
    // Net cash received at settlement = full claim minus advance already paid
    const settlementNet = settlementAmount - advanceAmount;
    // Working-capital gap = cost of funding before advance is received
    // Illustrative: the gap is the portion of monthly costs not covered by the advance
    const workingCapitalGap = monthlyClaimValue - advanceAmount;

    // Build a 6-month illustrative timeline
    // Month 1: submit claim, receive advance for M1
    // Month lag+1: receive full settlement for M1 (net of advance)
    // Ongoing: each month receives advance (M) + settlement net (M-lag)
    const rows: { label: string; value: string; strong?: boolean }[] = [
      { label: "Monthly claim value (illustrative)", value: gbp(monthlyClaimValue) },
      { label: `Advance on account (${pct(advancePct * 100, 0)})`, value: gbp(advanceAmount) },
      {
        label: `Full settlement (arrives month +${lag})`,
        value: gbp(settlementAmount),
      },
      {
        label: "Working-capital gap to bridge",
        value: gbp(workingCapitalGap),
        strong: true,
      },
    ];

    // Month-by-month timeline rows (6 months)
    rows.push({ label: "--- Month-by-month receipt timeline ---", value: "" });
    for (let m = 1; m <= 6; m++) {
      // Advance for this month is always received in month m
      // Settlement for month (m - lag) arrives in month m if m > lag
      const settledMonth = m - lag;
      let desc: string;
      if (settledMonth <= 0) {
        // Still waiting for first full settlement
        desc = `Advance: ${gbp(advanceAmount)} (awaiting settlement for M${m - lag <= 0 ? m : settledMonth})`;
      } else {
        // Both advance (for Mm) and settlement (net, for M_settledMonth) arrive
        const totalCash = advanceAmount + settlementNet;
        desc = `${gbp(totalCash)} (advance M${m} + settlement net M${settledMonth})`;
      }
      rows.push({ label: `Month ${m}`, value: desc });
    }

    const steadyStateCash = advanceAmount + settlementNet; // = monthlyClaimValue (once in steady state)

    return {
      headline: {
        label: "Working-capital gap to bridge",
        value: gbp(workingCapitalGap),
        sub: `${gbp(monthlyClaimValue)} monthly claim value, ${pct(advancePct * 100, 0)} advance on account, ${lag}-month lag`,
        tone: workingCapitalGap > monthlyClaimValue * 0.6 ? "warn" : "default",
      },
      rows,
      note: `This is an illustrative model of the NHSBSA FP34 payment cycle (see nhsbsa.nhs.uk/submitting-prescriptions). The advance-on-account percentage and payment timing vary by pharmacy and period. Category M clawbacks and Drug Tariff adjustments can change the final settlement figure retrospectively. The working-capital gap shown is the portion of monthly claim value not covered by the advance while you wait for full settlement. Steady-state monthly cash receipts (advance plus prior settlement net) settle at ${gbp(steadyStateCash)}. Speak to us about structuring a cash-flow facility to cover the gap.`,
    };
  },
  explainer: {
    heading: "How the NHS FP34 payment cycle drives pharmacy cash flow",
    paragraphs: [
      "Unlike a retail shop where cash comes in at the till, a pharmacy's NHS dispensing income is reimbursed by the NHSBSA on a monthly submission cycle using the FP34 form. You dispense prescriptions throughout the month, submit them, and payment arrives roughly two months later. An advance on account is paid in the interim to help bridge the gap, but it does not cover the full amount.",
      "The working-capital impact is real and structurally baked into the model. In the first two months of a new pharmacy or a practice acquiring new volume, only the advance arrives. Once the cycle is established, each month brings an advance for the current month's expected claim plus the net settlement for a claim two months prior. The gap between the advance and the full claim value must be funded from working capital, a cash-flow facility, or the owner's reserves.",
      "Drug Tariff reimbursement rates and Category M pricing are set and retrospectively adjusted centrally, which means the actual settlement can differ from the submitted claim. This makes cash-flow modelling at a pharmacy a specialist discipline, not a simple projection. The figures above are illustrative starting points for planning conversations.",
    ],
  },
  faqs: [
    {
      question: "What is the FP34 and who processes it?",
      answer:
        "The FP34 is the monthly prescription submission form used by NHS pharmacies in England. It is processed by the NHS Business Services Authority (NHSBSA), which calculates the reimbursement based on the Drug Tariff prices for the dispensed items and pays the pharmacy accordingly. The payment cycle typically means cash arrives about two months after submission, with an advance in the interim.",
    },
    {
      question: "What is the advance on account and how is it set?",
      answer:
        "The NHSBSA pays an advance on account each month, based on an estimate of what the pharmacy will claim. The exact percentage varies by pharmacy and is set by the NHSBSA based on your submission history. It is not a fixed rate published centrally, which is why this calculator asks you to enter the percentage from your own payment schedule.",
    },
    {
      question: "How does the Drug Tariff affect my cash-flow estimate?",
      answer:
        "Drug Tariff prices and Category M reimbursement rates are set centrally and adjusted retrospectively. This means the actual settlement the NHSBSA pays can differ from the amount you expected when you submitted the claim. Clawbacks can reduce the settlement below the advance, requiring repayment in a subsequent month. Cash-flow planning should include a buffer for this variability.",
    },
  ],
};
