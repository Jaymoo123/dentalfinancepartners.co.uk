import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Building2,
  ClipboardList,
  FileSpreadsheet,
  FlaskConical,
  Receipt,
  TrendingUp,
  Users,
} from "lucide-react";

/**
 * One service line: the practice's eight areas of work.
 *
 * Lifted out of /services because /locations/[slug] renders the same set (its
 * six-service grid was a hand-copied subset, which is exactly how two lists
 * drift). Copy is verbatim from the pre-port /services page; the only edit is
 * `&rsquo;` becoming a real apostrophe, since nothing here is injected as HTML
 * any more.
 *
 * `icon` lives here rather than at the call site so both consumers get the same
 * badge for the same subject. `calc` is the matched calculator: the tool that
 * answers "would this even be worth it for me" for that line.
 */
export type ServiceLine = {
  /** Display number, "01" through "08". Ordering is the trading year, not priority. */
  n: string;
  title: string;
  body: string;
  bullets: string[];
  icon: LucideIcon;
  calc: { slug: string; label: string };
};

export const SERVICE_LINES: ServiceLine[] = [
  {
    n: "01",
    title: "Year-end accounts & corporation tax",
    body: "Statutory accounts to FRS 102 / FRS 105, CT600 filings, marginal relief modelling between £50,000 and £250,000, group relief where it applies. Filed accurately, filed on time.",
    bullets: [
      "Statutory annual accounts",
      "Corporation tax computation and CT600",
      "Marginal relief planning",
      "Companies House filings",
    ],
    icon: FileSpreadsheet,
    calc: { slug: "associated-companies-ct", label: "Check your corporation tax limits" },
  },
  {
    n: "02",
    title: "Director pay and tax planning",
    body: "Optimal salary-and-dividend split for each director’s personal tax position, modelled annually and recalibrated when thresholds move. Pension contributions, BIK strategy, P11D where relevant.",
    bullets: [
      "Salary vs dividend optimisation",
      "Director SIPP contributions",
      "Self assessment for directors",
      "Tax-efficient extraction planning",
    ],
    icon: Banknote,
    calc: { slug: "salary-dividend-optimiser", label: "Model your salary and dividend split" },
  },
  {
    n: "03",
    title: "VAT and Making Tax Digital",
    body: "Registration timing against the £90,000 threshold, scheme selection (Standard, Flat Rate, Cash, Annual), partial-exemption handling, quarterly returns, MTD-compliant software setup.",
    bullets: [
      "VAT registration and scheme review",
      "Quarterly returns (MTD)",
      "Partial exemption and reverse-charge",
      "EORI and import VAT where relevant",
    ],
    icon: Receipt,
    calc: { slug: "vat-threshold-checker", label: "Check where you sit against the VAT threshold" },
  },
  {
    n: "04",
    title: "Payroll, PAYE and pensions",
    body: "Monthly payroll runs, RTI submissions, Employment Allowance claims (up to £10,500), salary-sacrifice schemes, workplace pension administration and auto-enrolment.",
    bullets: [
      "Monthly payroll and payslips",
      "RTI and FPS submissions",
      "P60s and P11Ds",
      "Auto-enrolment compliance",
    ],
    icon: Users,
    calc: { slug: "employer-ni-calculator", label: "Cost an employer NI bill" },
  },
  {
    n: "05",
    title: "R&D tax credits",
    body: "Merged-scheme claims under the post-April-2024 regime, qualifying-activity narrative written by qualified staff, costs eligibility review, ERIS where the loss-making intensive route applies.",
    bullets: [
      "Eligibility and scope assessment",
      "Technical narrative drafting",
      "Cost identification and apportionment",
      "Defence in the event of enquiry",
    ],
    icon: FlaskConical,
    calc: { slug: "rd-tax-credit-estimator", label: "Estimate an R&D claim" },
  },
  {
    n: "06",
    title: "Incorporation and structure",
    body: "When to move from sole trader to Ltd, the real cost of incorporation (SDLT, CGT where property is involved), holding-company design, alphabet shares, group restructures.",
    bullets: [
      "Sole-trader-to-Ltd modelling",
      "Holding-company design",
      "Share class engineering",
      "Group restructuring",
    ],
    icon: Building2,
    calc: { slug: "sole-trader-vs-ltd", label: "Compare sole trader against a limited company" },
  },
  {
    n: "07",
    title: "Self assessment and partnership returns",
    body: "SA100 for sole traders, partners and Ltd directors. Partnership SA800 returns. Capital gains where they arise. Making Tax Digital for ITSA from April 2026 onwards.",
    bullets: [
      "SA100 self assessment",
      "SA800 partnership returns",
      "Capital gains reporting",
      "MTD ITSA readiness",
    ],
    icon: ClipboardList,
    calc: { slug: "mtd-itsa-readiness", label: "Check your MTD for Income Tax start date" },
  },
  {
    n: "08",
    title: "Exit and capital gains planning",
    body: "Business Asset Disposal Relief (14% in 2025/26, 18% from 6 April 2026, £1M lifetime), holding-period management, share buy-back vs liquidation, earn-out structuring.",
    bullets: [
      "BADR eligibility and timing",
      "CGT modelling on disposal",
      "Share buy-backs and liquidation",
      "Earn-out structure review",
    ],
    icon: TrendingUp,
    calc: { slug: "badr-cgt-calculator", label: "Model BADR and CGT on a disposal" },
  },
];
