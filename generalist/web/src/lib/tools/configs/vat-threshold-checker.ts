import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import {
  checkVatThreshold,
  VAT_REG_THRESHOLD,
  VAT_DEREG_THRESHOLD,
} from "@/lib/tools/compute/vat-threshold";

export const vatThresholdTool: GenericTool = {
  kind: "generic",
  slug: "vat-threshold-checker",
  name: "VAT Registration Threshold Checker",
  category: "VAT",
  oneLiner:
    "Run your turnover through the rolling 12-month and 30-day tests against the £90,000 threshold. See if you must register, the month you breach, and your exact register-by date.",
  embedHeight: 560,
  metaTitle: "VAT Registration Threshold Checker | £90,000 Rolling Test UK",
  metaDescription:
    "Free UK VAT threshold checker. Rolling 12-month test and 30-day forward test against the £90,000 registration threshold, with your register-by date and effective date.",
  intro:
    "The VAT registration threshold is £90,000 of taxable turnover, and HMRC applies it on a rolling 12-month basis, not your accounting year. Miss the month you cross it and the late-registration bill lands on you, not your customers. Enter your figures below to run both statutory tests, see the month you breach (or are projected to breach), and get the exact date you must register by and the date VAT starts applying to your sales.",
  ctaLabel: "Talk to us about VAT registration",
  fields: [
    {
      id: "rolling12",
      label: "Taxable turnover, last 12 months",
      type: "currency",
      default: 78000,
      min: 0,
      max: 500000,
      step: 500,
      help: "Total VAT-taxable sales (standard, reduced and zero-rated) for the 12 full months just ended, excluding VAT. Do not include exempt or outside-scope income here, or enter it and use the exclusion field below.",
    },
    {
      id: "latestMonth",
      label: "Latest month's taxable turnover",
      type: "currency",
      default: 7500,
      min: 0,
      max: 100000,
      step: 100,
      help: "Your most recent full month. Used with the growth rate to project the rolling total forward and find the breach month.",
    },
    {
      id: "growthPct",
      label: "Expected monthly growth",
      type: "number",
      default: 2,
      min: -20,
      max: 50,
      step: 0.5,
      suffix: "%",
      help: "Month-on-month change in turnover. Leave at 0 if trading is flat.",
    },
    {
      id: "next30",
      label: "Expected taxable turnover in the next 30 days alone",
      type: "currency",
      default: 7500,
      min: 0,
      max: 1000000,
      step: 500,
      help: "The separate forward-look test: if you expect more than £90,000 of taxable turnover in the next 30 days by itself (a single large contract, for example), you must register immediately.",
      advanced: true,
    },
    {
      id: "exemptIncluded",
      label: "Exempt or outside-scope income included above",
      type: "currency",
      default: 0,
      min: 0,
      max: 500000,
      step: 500,
      help: "Rent from exempt property lettings, insurance, financial services, income from outside the UK VAT scope. These do not count towards the threshold and are stripped out before the test.",
      advanced: true,
    },
  ],
  compute(values) {
    const r = checkVatThreshold(
      Number(values.rolling12),
      Number(values.latestMonth),
      Number(values.growthPct),
      Number(values.next30),
      Number(values.exemptIncluded),
    );

    const mustRegister = r.breached || r.forwardBreached;
    const headline = mustRegister
      ? {
          label: "VAT registration",
          value: "Required now",
          sub: r.forwardBreached
            ? "30-day forward-look test breached"
            : "rolling 12-month turnover is over £90,000",
          tone: "warn" as const,
        }
      : r.breachMonthsAhead !== null
        ? {
            label: "VAT registration",
            value: `Projected ${r.breachMonthLabel}`,
            sub: "on current turnover and growth, the rolling 12-month test breaches then",
            tone: "warn" as const,
          }
        : {
            label: "VAT registration",
            value: "Not required",
            sub: "no breach projected within 36 months on these figures",
            tone: "good" as const,
          };

    const rows = [
      { label: "Taxable rolling 12-month turnover", value: gbp(r.taxableRolling), strong: true },
      {
        label: r.headroom >= 0 ? "Headroom to £90,000 threshold" : "Amount over £90,000 threshold",
        value: gbp(Math.abs(r.headroom)),
      },
      ...(r.breachMonthLabel
        ? [{ label: r.breached ? "Breach month" : "Projected breach month", value: r.breachMonthLabel }]
        : []),
      ...(r.registerByLabel
        ? [{ label: "Register with HMRC by", value: r.registerByLabel, strong: true }]
        : []),
      ...(r.effectiveFromLabel
        ? [{ label: "VAT effective from (first VAT period starts)", value: r.effectiveFromLabel }]
        : []),
    ];

    const note = mustRegister
      ? r.forwardBreached
        ? "The 30-day test makes registration effective from the date you first expected to exceed £90,000, not the end of the month. Register online now; charging VAT starts from the effective date even if your VAT number arrives later. Your first VAT period runs from the effective date to the end of your allocated return stagger."
        : "You must notify HMRC within 30 days of the end of the breach month. VAT applies from the effective date shown, even on invoices raised before your VAT number arrives (you reissue or adjust them once registered). Your first VAT period runs from the effective date to the end of your allocated return stagger."
      : r.breachMonthsAhead !== null
        ? "The projection assumes your growth rate holds. Check the rolling total at the end of every month from now on: the 30-day clock starts the moment a month-end total exceeds £90,000. If the breach is a one-off spike you expect to reverse, you can ask HMRC for an exception from registration."
        : `You are under the threshold, but voluntary registration can still pay: you reclaim input VAT on costs and look established to business customers. It costs you margin if your customers are consumers who cannot reclaim the VAT you would have to charge. Deregistration is available once taxable turnover falls below ${gbp(VAT_DEREG_THRESHOLD)}.`;

    return { headline, rows, note };
  },
  explainer: {
    heading: "How the two VAT registration tests work",
    paragraphs: [
      `There are two separate tests, and failing either one triggers compulsory registration. The rolling 12-month test: at the end of every calendar month, total your VAT-taxable turnover for the 12 months just ended. If it exceeds ${gbp(VAT_REG_THRESHOLD)} (the threshold since 1 April 2024), you must notify HMRC within 30 days of the end of that month, and you are registered from the first day of the second month after the breach. The 30-day forward test: if at any point you expect taxable turnover in the next 30 days alone to exceed ${gbp(VAT_REG_THRESHOLD)}, you must register before the end of that 30-day period, and registration takes effect from the date the expectation arose. Only taxable turnover counts: standard, reduced and zero-rated sales. Exempt supplies (residential rent, insurance, most financial services) and income outside the scope of UK VAT are excluded.`,
      "Worked example 1, the rolling test. A design consultancy totals its taxable sales at the end of July 2026 and the 12 months to 31 July come to £91,200. The breach month is July 2026. It must notify HMRC by 30 August 2026 (30 days after the month end) and it is registered for VAT from 1 September 2026, the first day of the second month after the breach. Every sale from 1 September carries VAT, and its first VAT return period starts on that date.",
      "Worked example 2, the 30-day forward test. A contractor trading at £4,000 a month signs a single £95,000 fit-out contract on 4 May 2026, payable within the month. From that date it expects more than £90,000 of taxable turnover in the next 30 days alone, so the forward test is failed immediately. It must register by 3 June 2026, and registration is effective from 4 May 2026, the day the expectation arose. There is no two-month grace here: the contract itself is invoiced with VAT.",
      "The checker projects your breach month by rolling your latest month forward at your growth rate while dropping the equivalent back-projected month off the other end of the window. Treat a projected date as an early-warning system, not a filing date: the statutory clock only starts when a real month-end total actually crosses the line, so keep totalling the trailing 12 months every month once you are within roughly £10,000 of the threshold.",
    ],
  },
  faqs: [
    {
      question: "What is the VAT registration threshold for 2026/27?",
      answer:
        "£90,000 of taxable turnover in any rolling 12-month period. It was raised from £85,000 on 1 April 2024 and has not changed since. The test is a rolling 12 months measured at each month end, not your accounting year or the tax year, which is the single most common way businesses miss a breach.",
    },
    {
      question: "What counts as taxable turnover for the threshold?",
      answer:
        "All standard-rated, reduced-rated and zero-rated sales, excluding VAT itself. Zero-rated sales count even though the rate is 0%. Exempt supplies (residential letting, insurance, most financial services), income outside the scope of UK VAT, and the sale of capital assets are excluded. If a chunk of your income is exempt, strip it out before testing, this checker has a field for exactly that.",
    },
    {
      question: "When am I actually registered after crossing the threshold?",
      answer:
        "Under the rolling 12-month test you must notify HMRC within 30 days of the end of the month you crossed, and registration takes effect from the first day of the second month after the breach. Breach in July, notify by 30 August, registered from 1 September. Under the 30-day forward test there is no grace period: registration is effective from the date you first expected to exceed £90,000 within 30 days.",
    },
    {
      question: "What happens if I register late?",
      answer:
        "HMRC backdates your registration to the date it should have started, and you owe the VAT on everything you sold from that date, whether or not you charged it to customers. On top sits a failure-to-notify penalty of up to 30% of the VAT due for careless lateness, and more if HMRC considers it deliberate. If you crossed the threshold months ago, register now and take advice on the disclosure, the penalty position improves sharply when you come forward unprompted.",
    },
    {
      question: "I went over the threshold temporarily. Do I still have to register?",
      answer:
        "You can ask HMRC for an exception from registration if you can evidence that the breach was a one-off and your taxable turnover for the next 12 months will stay below the deregistration threshold of £88,000. Write to HMRC within the same 30-day notification window with your figures and the reason for the spike. HMRC must agree; you cannot simply decide the exception applies yourself.",
    },
    {
      question: "Is registering voluntarily below the threshold ever worth it?",
      answer:
        "Often, yes. If your customers are VAT-registered businesses they reclaim the VAT you charge, so it costs them nothing, while you reclaim input VAT on your own costs, equipment and pre-registration purchases (up to 4 years back for goods still on hand, 6 months for services). If you sell to consumers, registration makes you 20% more expensive or cuts your margin, so most consumer-facing businesses wait until they must. Once registered, you can deregister if taxable turnover falls below £88,000.",
    },
  ],
  related: [
    { label: "VAT Scheme Comparator (Standard vs Flat Rate)", href: "/calculators/vat-scheme-comparator" },
  ],
};
