import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// ponytail: pure arithmetic, no separate compute/ file — split out only if another tool needs it
function calcRunway(v: {
  cashAtBank: number;
  monthlyOverheads: number;
  monthlyBillings: number;
  wipDays: number;
  debtorDays: number;
}) {
  const lockupDays = v.wipDays + v.debtorDays;
  const dailyBillings = (v.monthlyBillings * 12) / 365;
  const lockupValue = lockupDays * dailyBillings;
  // Gross runway: months the bank balance covers overheads if collections stopped today.
  const grossRunwayMonths = v.monthlyOverheads > 0 ? v.cashAtBank / v.monthlyOverheads : Infinity;
  // Net monthly position at current billing and collection rates.
  const netMonthly = v.monthlyBillings - v.monthlyOverheads;
  const released = (days: number) => Math.min(days, lockupDays) * dailyBillings;
  return {
    lockupDays,
    dailyBillings,
    lockupValue,
    grossRunwayMonths,
    netMonthly,
    released10: released(10),
    released20: released(20),
    released30: released(30),
  };
}

export const practiceCashflowRunwayTool: GenericTool = {
  kind: "generic",
  slug: "practice-cashflow-runway",
  name: "Practice Cashflow Runway Estimator",
  category: "Practice Finance",
  oneLiner:
    "Months of runway from cash, overheads and billings, plus the cash your lockup would release if you cut WIP and debtor days.",
  embedHeight: 560,
  metaTitle: "Law Firm Cashflow Runway Calculator | Lockup & WIP Days for Solicitors",
  metaDescription:
    "Free cashflow runway calculator for law firms. Enter cash at bank, monthly overheads, billings, WIP days and debtor days to see months of runway and the cash released by cutting lockup by 10, 20 or 30 days.",
  intro:
    "Lockup, the value tied up in unbilled WIP and unpaid bills, is the quiet cash drain in most law firms. This tool takes five figures every practice manager already knows and turns them into two numbers that matter: how many months of overheads your bank balance covers, and how much cash a 10, 20 or 30 day cut in lockup would put back in the account.",
  ctaLabel: "Talk to a solicitor accountant",
  fields: [
    {
      id: "cashAtBank",
      label: "Cash at bank (office account)",
      type: "currency",
      default: 90000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "Office account only. Client account money is not the firm's cash and never counts towards runway.",
    },
    {
      id: "monthlyOverheads",
      label: "Monthly overheads",
      type: "currency",
      default: 45000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "Salaries, rent, PII, practising certificates, software and all other fixed monthly outgoings.",
    },
    {
      id: "monthlyBillings",
      label: "Average monthly billings",
      type: "currency",
      default: 60000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "Fees billed per month (excluding VAT and disbursements), averaged over the last 6 to 12 months.",
    },
    {
      id: "wipDays",
      label: "WIP days",
      type: "number",
      default: 60,
      min: 0,
      max: 365,
      step: 5,
      help: "Average days from work being done to the bill going out. Unbilled WIP value ÷ daily billings if you know your WIP figure.",
    },
    {
      id: "debtorDays",
      label: "Debtor days",
      type: "number",
      default: 45,
      min: 0,
      max: 365,
      step: 5,
      help: "Average days from bill delivered to cash received.",
    },
  ],
  compute(values) {
    const cashAtBank = Number(values.cashAtBank);
    const monthlyOverheads = Number(values.monthlyOverheads);
    const monthlyBillings = Number(values.monthlyBillings);
    const wipDays = Number(values.wipDays);
    const debtorDays = Number(values.debtorDays);
    const r = calcRunway({ cashAtBank, monthlyOverheads, monthlyBillings, wipDays, debtorDays });

    const runwayText =
      monthlyOverheads <= 0
        ? "N/A"
        : `${r.grossRunwayMonths.toFixed(1)} months`;
    const tone: "default" | "warn" | "good" =
      monthlyOverheads <= 0 ? "default" : r.grossRunwayMonths < 3 ? "warn" : r.grossRunwayMonths >= 6 ? "good" : "default";

    const rows = [
      { label: "Total lockup (WIP days + debtor days)", value: `${r.lockupDays} days` },
      { label: "Estimated cash tied up in lockup", value: gbp(Math.round(r.lockupValue)), strong: true as const },
      {
        label: "Net monthly position (billings − overheads)",
        value: `${r.netMonthly < 0 ? "−" : ""}${gbp(Math.abs(Math.round(r.netMonthly)))}`,
      },
      { label: "Cash released by cutting lockup 10 days", value: gbp(Math.round(r.released10)) },
      { label: "Cash released by cutting lockup 20 days", value: gbp(Math.round(r.released20)) },
      { label: "Cash released by cutting lockup 30 days", value: gbp(Math.round(r.released30)) },
    ];

    return {
      headline: {
        label: "Months of overheads covered by cash at bank",
        value: runwayText,
        sub: `Lockup of ${r.lockupDays} days is holding roughly ${gbp(Math.round(r.lockupValue))} outside the bank account.`,
        tone,
      },
      rows,
      note:
        "Runway here is gross: cash at bank ÷ monthly overheads, the months you could pay the bills if collections stopped tomorrow. Lockup reduction is a one-off cash release (days cut × daily billings), not a recurring gain. If your firm uses VAT cash accounting, remember roughly a sixth of each collected bill is VAT due to HMRC in the following quarter, so cash released from debtors is not all yours to spend. Directional estimate only, not advice.",
    };
  },
  explainer: {
    heading: "How the runway and lockup figures are calculated",
    paragraphs: [
      "Runway is the simplest solvency test there is: cash at bank divided by monthly overheads. It answers the question every managing partner asks in a bad month, how long could we pay salaries, rent and PII if the money stopped arriving? Under 3 months is thin for a law firm, where a single delayed completion or a slow-paying commercial client can knock a month's collections sideways. Six months or more gives you room to absorb a bad quarter, fund a lateral hire, or ride out a PII premium jump.",
      "Lockup is WIP days plus debtor days: the total time between doing the work and banking the fee. The cash tied up in lockup is lockup days multiplied by daily billings (annual billings ÷ 365). Cutting lockup releases that cash once, as a one-off catch-up, because bills that would have been paid in 100 days now arrive in 70. The sensitivity rows show exactly what 10, 20 and 30 day reductions are worth to your firm at its current billing rate.",
      "Worked example 1, a four-partner commercial firm: £120,000 cash at bank, £75,000 monthly overheads, £110,000 monthly billings, 55 WIP days and 60 debtor days. Runway is 120,000 ÷ 75,000 = 1.6 months, uncomfortably tight for a firm of that size. Daily billings are 110,000 × 12 ÷ 365 = £3,616, so 115 days of lockup is holding about £415,900 outside the bank. Cutting lockup by just 20 days, mostly by moving to monthly interim billing, would release roughly £72,300, taking runway from 1.6 months to about 2.6 and covering nearly a month of overheads without billing a penny more.",
      "Worked example 2, a sole practitioner in private client work: £40,000 cash at bank, £9,500 monthly overheads, £14,000 monthly billings, 40 WIP days and 30 debtor days. Runway is 40,000 ÷ 9,500 = 4.2 months, a reasonable buffer. Daily billings are £460, so 70 days of lockup holds about £32,200. A 10 day reduction releases around £4,600; worthwhile, but for this firm the bigger lever is that billings exceed overheads by £4,500 a month, so runway is growing anyway. The tool flags which lever matters most for your numbers.",
      "One timing point for firms on VAT cash accounting: you account for output VAT when the client pays, not when you bill. That means cash released from a debtor push arrives gross, and around one sixth of it (the VAT element at 20%) becomes payable to HMRC in the following quarter's return. Firms on standard invoice accounting have the opposite problem, VAT falls due on billing even if the client has not paid, which makes long debtor days doubly expensive. Either way, treat the released-cash figures above as pre-VAT.",
    ],
  },
  faqs: [
    {
      question: "What counts as lockup in a law firm?",
      answer:
        "Lockup is the combined value of unbilled work in progress and unpaid bills, usually expressed in days: WIP days plus debtor days. UK law firm benchmarking surveys typically put median total lockup at around 120 to 130 days, meaning the average firm waits over four months between doing work and banking the fee. Anything under 90 days is strong; over 150 days is a warning sign.",
    },
    {
      question: "Why does the calculator use cash ÷ overheads rather than cash ÷ net burn?",
      answer:
        "Cash divided by overheads is the stress-test view: how long the firm survives if collections stop entirely. That is the number a bank or the SRA would look at when assessing financial stability. The net monthly position row shows the other view, whether billings currently exceed overheads. If that row is positive, your runway is growing month on month; if negative, the gross runway figure is the countdown that matters.",
    },
    {
      question: "Is cutting lockup really a one-off gain, not a recurring one?",
      answer:
        "Yes. Reducing lockup from 100 days to 70 pulls 30 days of billings forward into the bank account, once. After the catch-up period, monthly cash receipts return to matching monthly billings. The gain is permanent in the sense that the cash stays released for as long as lockup stays down, but it does not repeat each month. It is best thought of as an interest-free loan you have stopped making to your clients.",
    },
    {
      question: "What are the fastest ways for a solicitor practice to reduce lockup?",
      answer:
        "The biggest levers in practice: bill monthly on the file rather than at matter end (attacks WIP days), take money on account and top it up at defined stages, deliver bills electronically with card or bank-transfer payment links (attacks debtor days), and run a weekly aged-debt review with a named person chasing anything over 30 days. Fee earners who record time daily also bill faster, because month-end WIP write-offs shrink when the narrative is fresh.",
    },
    {
      question: "How does VAT affect the cash these figures show?",
      answer:
        "Bills and collections here are best entered excluding VAT, and the released-cash figures are pre-VAT. If you enter VAT-inclusive figures, remember about one sixth of any cash collected is output VAT owed to HMRC. On cash accounting that VAT falls due after the client pays; on invoice accounting it falls due when you bill, which means long debtor days force you to fund HMRC before the client has funded you.",
    },
    {
      question: "Should client account balances be included in cash at bank?",
      answer:
        "No, never. Client money held under the SRA Accounts Rules belongs to clients and cannot fund the practice; using it as working capital is a serious breach. Only office account balances, and any undrawn office overdraft you would genuinely use, belong in a runway calculation.",
    },
  ],
  related: [
    { label: "Law Firm Valuation Calculator", href: "/calculators/law-firm-valuation" },
    { label: "SRA Client Account Reserve Calculator", href: "/calculators/sra-client-account-reserve" },
  ],
};
