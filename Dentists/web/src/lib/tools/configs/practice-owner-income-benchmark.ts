import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcOwnerIncomeBenchmark } from "@/lib/tools/compute/practice-owner-income-benchmark";
import type { PracticeMix, OwnerRegion } from "@/lib/tools/compute/practice-owner-income-benchmark";

const MIX_LABELS: Record<PracticeMix, string> = {
  "mainly-nhs": "Mainly NHS (75%+ NHS turnover)",
  mixed: "Mixed NHS and private",
  "mainly-private": "Mainly private (75%+ private turnover)",
};

const REGION_LABELS: Record<OwnerRegion, string> = {
  england: "England",
  wales: "Wales",
  scotland: "Scotland",
  ni: "Northern Ireland",
};

export const practiceOwnerIncomeBenchmarkTool: GenericTool = {
  kind: "generic",
  slug: "practice-owner-income-benchmark",
  name: "Practice Owner Income Benchmark",
  category: "Practice accounting",
  oneLiner:
    "Benchmark your income as a dental practice owner against published UK earnings data, adjusted for NHS/private mix, region and practice size.",
  embedHeight: 560,
  metaTitle: "Dental Practice Owner Income Benchmark UK | How Much Do Practice Owners Earn?",
  metaDescription:
    "Benchmark dental practice owner income in the UK. Enter your NHS/private mix, turnover, region and practice size to see the earnings range for owners like you, based on published NHS earnings and expenses data.",
  intro:
    "Enter your practice profile: NHS/private mix, annual turnover, region, number of chairs and the share of clinical work delivered by associates. The calculator shows the benchmark taxable income range for practice owners with a similar profile, drawn from the published NHS dental earnings and expenses series. Add your own profit figure to see where you sit against the range and how your expense ratio compares.",
  fields: [
    {
      id: "mix",
      label: "Practice type",
      type: "select",
      default: "mixed",
      options: (Object.entries(MIX_LABELS) as [PracticeMix, string][]).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "england",
      options: (Object.entries(REGION_LABELS) as [OwnerRegion, string][]).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      id: "turnover",
      label: "Annual practice turnover (£)",
      type: "currency",
      default: 600000,
      min: 0,
      max: 10000000,
      step: 10000,
    },
    {
      id: "chairs",
      label: "Number of surgeries (chairs)",
      type: "number",
      default: 3,
      min: 1,
      max: 15,
      step: 1,
    },
    {
      id: "associatePct",
      label: "Clinical work delivered by associates",
      type: "number",
      default: 30,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
    },
    {
      id: "ownProfit",
      label: "Your own annual profit (£, optional)",
      type: "currency",
      default: 0,
      min: 0,
      max: 2000000,
      step: 5000,
      advanced: true,
      help: "Your taxable profit as owner (sole trader or partnership share). Leave at 0 to skip the comparison.",
    },
  ],
  compute(values) {
    const mix = String(values.mix) as PracticeMix;
    const region = String(values.region) as OwnerRegion;
    const turnover = Number(values.turnover);
    const chairs = Number(values.chairs);
    const associatePct = Number(values.associatePct);
    const ownProfit = Number(values.ownProfit);
    const r = calcOwnerIncomeBenchmark(mix, region, turnover, chairs, associatePct, ownProfit);

    const rows = [
      { label: "Benchmark midpoint", value: gbp(r.benchmarkMid) },
      {
        label: `Benchmark expense ratio (${MIX_LABELS[mix].split(" (")[0].toLowerCase()})`,
        value: pct(r.benchmarkExpenseRatio * 100, 0),
      },
      {
        label: "Implied practice profit at benchmark expense ratio",
        value: gbp(r.impliedProfitFromTurnover),
      },
    ];
    if (r.position !== "not-entered" && r.ownExpenseRatio !== null) {
      rows.push(
        {
          label: "Your position vs benchmark",
          value:
            r.position === "below"
              ? "below benchmark range"
              : r.position === "above"
              ? "above benchmark range"
              : "within benchmark range",
          strong: true,
        } as { label: string; value: string; strong: boolean },
        { label: "Your expense ratio (1 - profit / turnover)", value: pct(r.ownExpenseRatio * 100, 1) },
      );
    }

    return {
      headline: {
        label: "Owner income benchmark range",
        value: `${gbp(r.benchmarkLow)} to ${gbp(r.benchmarkHigh)}`,
        sub: "taxable income per practice owner, before tax",
        tone: r.position === "below" ? ("warn" as const) : ("good" as const),
      },
      rows,
      note: "Bands are structured from the published NHS dental earnings and expenses series for self-employed providing-performer dentists (taxable income, not drawings or dividends). Region and size adjustments are indicative. Implied practice profit is whole-practice, before associate pay is deducted, so it will normally exceed the per-owner benchmark.",
    };
  },
  explainer: {
    heading: "How the benchmark works, with worked examples",
    paragraphs: [
      "The starting point is the official dental earnings and expenses estimates published annually for the UK, which report average taxable income and expense ratios for self-employed dentists who hold a contract (providing-performers, broadly practice owners). The 2023/24 release put the average across all self-employed dentists (owners and associates together) in England at £78,200; owners sit above that combined figure, historically in the roughly £110,000 to £130,000 taxable-income range, with clear differences by NHS/private mix: mainly-NHS owners typically sit lower, and mixed and mainly-private owners higher, with wider spreads.",
      "The calculator takes the published band for your practice type, then applies three indicative adjustments: region (Wales and Scotland run slightly below the England basis, Northern Ireland lower again), practice size (a 1 to 2 chair practice trims the band by around 10%, a 5+ chair practice lifts it by around 10%), and associate delegation (once associates deliver more than half the clinical work, the owner's personal income band tapers by up to 15%, because the owner earns margin on associate work rather than full clinical fees).",
      "It also shows the benchmark expense-to-earnings ratio for your practice type, roughly 55% for mainly-NHS practices rising to around 68% for mainly-private, and the whole-practice profit your turnover would imply at that ratio. If you enter your own profit, the tool places you against the benchmark range and computes your actual expense ratio for comparison.",
      "Worked example 1: a mixed NHS and private practice in England turning over £750,000 with 4 chairs and 30% of clinical work delivered by associates. No adjustments apply (England basis, mid-size, delegation under 50%), so the owner benchmark range is the mixed-practice band of £110,000 to £140,000, midpoint £125,000. At the mixed-practice benchmark expense ratio of 62%, £750,000 of turnover implies whole-practice profit of £285,000. The gap between that and the per-owner range is normal: associate pay and any second owner's share come out of practice profit before the owner's own income.",
      "Worked example 2: a single-handed, mainly-NHS practice in Wales turning over £520,000 with 2 chairs and no associates, where the owner enters a profit of £95,000. The mainly-NHS band of £95,000 to £120,000 is adjusted by 0.95 for Wales and 0.90 for a small practice, giving a benchmark range of £81,225 to £102,600 with a midpoint of £91,913. The £95,000 profit sits within the range, close to the midpoint. However, the owner's actual expense ratio is 81.7% against a mainly-NHS benchmark of 55%, suggesting costs are running well above typical for the practice type and that a cost review could move income toward the top of the band.",
      "Treat the output as a triage, not a verdict. The published figures are averages of a wide distribution, they lag by around two years, and they measure taxable income for the self-employed, which is not directly comparable with salary plus dividends from a limited company. Sitting below the range is a prompt to look at fee levels, expense ratio and structure with a dental accountant, not proof that something is wrong.",
    ],
  },
  faqs: [
    {
      question: "How much does a dental practice owner make in the UK?",
      answer:
        "The official dental earnings and expenses estimates put average taxable income across all self-employed dentists in England at £78,200 for 2023/24; practice owners (providing-performer dentists) sit above that, historically in roughly the £110,000 to £130,000 range on average, before tax. The spread is wide: mainly-NHS owners of small practices can sit under £100,000, while owners of larger mixed or private practices commonly exceed £150,000. Mix, size, region and how much work associates deliver all shift the number materially.",
    },
    {
      question: "Is this the same as a practice owner's salary?",
      answer:
        "No. The benchmark is taxable income for a self-employed owner: practice profit share after deductible expenses, before income tax and National Insurance. It is not a salary, not drawings, and not directly comparable with the salary-plus-dividends package an owner takes from a limited company, where corporation tax and retained profit change the picture. If you run through a limited company, compare against your total pre-tax profit attributable to you rather than your salary alone.",
    },
    {
      question: "Why does NHS/private mix change the benchmark so much?",
      answer:
        "Private dentistry generally carries higher fees per hour of chair time but also higher expense ratios (materials, marketing, premises standards), while NHS work brings contract income certainty at lower per-item rates. The published series consistently shows mainly-NHS owners earning less on average than mixed-practice owners, with mainly-private owners spanning the widest range: highly profitable at scale, but thinner for small private squats still building a patient base.",
    },
    {
      question: "What is a good expense ratio for a dental practice?",
      answer:
        "The published series shows average expenses running at roughly half of gross earnings for self-employed dentists overall, with owner-operators higher: around 55% for mainly-NHS practices and up to about 68% for private-weighted practices. If your ratio is materially above the benchmark for your mix, the usual suspects are staffing costs, lab and materials pricing, and premises. A ratio well below benchmark is not automatically good either; underinvestment in staff and equipment shows up later in capacity and fee levels.",
    },
    {
      question: "Why does using more associates lower the owner benchmark?",
      answer:
        "When associates deliver most of the clinical work, the owner's income shifts from full clinical fees to a margin on associate work, typically the practice's share after the associate's percentage. That margin per hour is lower than personally delivered dentistry, so heavily delegated owners tend to show lower personal taxable income for the same practice turnover. The trade-off is capacity and saleability: associate-led practices scale further and are easier to exit.",
    },
    {
      question: "How current are the benchmark figures?",
      answer:
        "The official earnings and expenses estimates are published annually but lag roughly two years behind, so the latest release reflects a tax year some time ago. This tool's bands are structured from the most recent published series and should be read as indicative rather than exact. For a decision that turns on precise figures, such as a practice purchase or a partnership split, get the current release and practice-specific accounts reviewed by a specialist dental accountant.",
    },
  ],
};
