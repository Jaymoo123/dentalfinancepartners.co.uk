import type { Metadata } from "next";
import { FileText, PiggyBank, Receipt, ShieldAlert, Calculator, Building2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountants for Salaried GPs | Locum Income & Tax",
  description:
    "Accountants for salaried GPs with locum or out-of-hours income: self assessment registration, allowable expenses, NHS pension forms and the annual allowance.",
  alternates: {
    canonical: `${siteConfig.url}/for-salaried-gps`,
    languages: {
      "en-GB": `${siteConfig.url}/for-salaried-gps`,
      "x-default": `${siteConfig.url}/for-salaried-gps`,
    },
  },
  openGraph: {
    title: "Accountants for Salaried GPs | Locum Income & Tax",
    description:
      "Self assessment registration, allowable expenses, NHS pension forms and the annual allowance for salaried GPs taking locum or out-of-hours work.",
    url: `${siteConfig.url}/for-salaried-gps`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for Salaried GPs | Locum Income & Tax")}`, width: 1200, height: 630, alt: "Accountants for Salaried GPs | Locum Income & Tax" }],
  },
};

const data: AudienceStage = {
  slug: "for-salaried-gps",
  role: "salaried-gps",
  displayRole: "Salaried GPs",
  displayRoleLower: "salaried GPs",
  badge: "PAYE plus locum sessions · Type 2 form · Annual allowance",
  heroHeading: "Accountants for salaried GPs taking locum and out-of-hours work",
  intro:
    "You are employed by the practice, taxed under PAYE with Class 1 National Insurance at source, and an active member of the NHS Pension Scheme. Then the extra sessions start: a locum day at a neighbouring surgery, an out-of-hours shift, an occasional private clinic. That second income is self-employed, and nothing about it is handled for you. Four things decide what this costs you: whether you registered for self assessment in time, whether those sessions were pensioned inside the 10-week window, whether your Type 2 form reached PCSE, and whether pension growth across both roles is heading towards the £60,000 annual allowance. The deadlines below arrive in a fixed order, and missing the pension ones costs accrual that cannot be bought back.",
  // Statutory figures from docs/medical/_wave1/salaried-gps.json, sources
  // re-checked against docs/medical/house_positions.md §2.B, §2.C by the
  // wave's factual QA track, 2026-09-27.
  stats: [
    { target: 60, prefix: "£", suffix: "k", label: "Pension annual allowance, 2026/27" },
    { target: 10, suffix: " weeks", label: "Window to pension a locum session" },
    // Not a single number: StatsCounter animates a count-up, so a calendar
    // date renders verbatim via `value` instead (target 0, value carries the
    // figure, label carries the description), same fallback the row's own
    // sweep anticipated.
    { target: 0, value: "5 October", label: "Deadline to register for self assessment" },
    { target: 12.5, decimals: 1, suffix: "%", label: "Top NHS pension contribution tier, 2026/27" },
  ],
  concerns: [
    {
      icon: FileText,
      title: "When does locum work mean registering for self assessment?",
      body: "The first paid session outside your contract makes you a sole trader alongside your employment, and HMRC has to be told by 5 October following the end of the tax year the work started in. The bill surprises people: where the prior bill exceeds £1,000 and less than 80% of your tax was collected at source, payments on account begin at half the prior year's liability each. <a href=\"/blog/locum-doctor-self-assessment-filing-guide\">The locum filing guide</a> covers the return.",
    },
    {
      icon: PiggyBank,
      title: "Pension growth is measured across both roles, not one",
      body: "For 2026/27 the allowance stands at £60,000, and in a defined benefit scheme the measure is the pension input amount: the capitalised rise in the value of your benefits, not the contributions leaving your payslip. Salaried service and pensioned sessions feed one figure. Tapering starts once adjusted income passes £260,000 while threshold income also passes £200,000, and runs down to a £10,000 floor. Unused allowance from the previous three tax years carries forward, which usually absorbs a one-off spike.",
    },
    {
      icon: Receipt,
      title: "Expenses split in two, and the employment side is tighter",
      body: "Costs met against your salaried post face the strict employment test, while costs of the locum work come off that profit on the wholly and exclusively rule. Indemnity, the GMC retention fee and subscriptions on HMRC's approved List 3 are deductible. Travel between separate engagements in a day runs at 55p a mile up to 10,000 business miles in 2026/27 and 25p after that, but home to your first site is commuting and never qualifies.",
    },
    {
      icon: ShieldAlert,
      title: "Superannuating the sessions: Form A, Form B and a hard 10-week limit",
      body: "In England, freelance GP locum sessions are pensioned through the locum forms: Form A is approved by the practice, Form B then goes to PCSE, and contributions are paid over no later than the seventh of the following month. Any period that finished over 10 weeks earlier cannot be pensioned, and PCSE rejects the late form. That is accrual lost for good rather than a penalty. <a href=\"/blog/nhs-pension-for-locums-form-a-form-b\">The Form A and B walkthrough</a> has the sequence.",
    },
    {
      icon: Calculator,
      title: "The Type 2 form a salaried GP owes, and the tier it sets",
      body: "As a salaried GP you are a Type 2 medical practitioner, and the Type 2 self-assessment form records your total GP pay so the right tiered contribution is charged. The deadline is 28 February a year in arrears, so 2025/26 is due by 28 February 2027. Tiers sit on pensionable pay, not total taxable income, from 5.2% up to 12.5% on pay of £67,669 and above for 2026/27.",
    },
    {
      icon: Building2,
      title: "Would a company actually help with the side income?",
      body: "Rarely, and the pension answer arrives before the tax one. Income drawn from a company as dividends is not NHS-pensionable, so accrual on that work stops. Against that sits corporation tax of 19% on profits to £50,000 rising to 25% above £250,000, dividends taxed at 10.75%, 35.75% and 39.35% in 2026/27, and a second set of filings. <a href=\"/blog/locum-doctor-limited-company-pros-and-cons\">The company comparison</a> sets out the trade-offs.",
    },
  ],
  services: [
    {
      title: "Getting the second income on HMRC's record",
      body: "A specialist from the partner network confirms when the sessions began, checks whether the 5 October point has passed, registers the self-employment and sets up the records. Where a year has been missed, the position is quantified and the disclosure route chosen first.",
    },
    {
      title: "One return covering the salary and the sessions",
      body: "Both sides go on one return: employment income with tax already deducted, and locum profit carrying Class 4 National Insurance at 6% between £12,570 and £50,270 and 2% above. There is no Class 2, which stopped being a required payment on 6 April 2024. Each expense is tested against the rule for its own source.",
    },
    {
      title: "The pension paperwork checked end to end",
      body: "Form A and Form B submissions are traced against the sessions worked, the 10-week clock checked on each, and the Type 2 self-assessment reconciled so the tier charged matches the pay recorded. Where a session has fallen outside the window you are told plainly.",
    },
    {
      title: "The annual allowance position, and Scheme Pays if it bites",
      body: "Pension input across both roles is calculated, carry forward from the previous three years applied, and any charge quantified. Mandatory Scheme Pays runs where the charge exceeds £2,000 and NHS input alone exceeds £60,000, elected by 31 July in the following year, so 2026/27 runs to 31 July 2028.",
    },
  ],
  faqs: [
    {
      q: "I only did a handful of sessions. Do I still have to tell HMRC?",
      a: "Yes. Self-employed income is reportable however small the total, and the obligation is triggered by the work rather than by an earnings level. Notify HMRC by 5 October following the end of the tax year the sessions fell in, then file a return covering the salary and the locum profit. The tax on a few sessions is often modest; registering late attracts a penalty that can exceed it.",
    },
    {
      q: "Does locum work change the pension tier on my salary?",
      a: "Tiers are set on pensionable pay, not total taxable income, and your total GP pensionable pay across both roles sets the tier, not the salaried post alone. Pensioned sessions carry their own contribution through the Form B route. The Type 2 self-assessment then records your total GP pay, which is why filing it accurately matters.",
    },
    {
      q: "Can I claim the drive from home to a locum practice?",
      a: "No. Home to the first site of your working day is ordinary commuting, your own practice or a surgery you are covering. Journeys between separate engagements on the same day are allowable, at 55p a mile on the first 10,000 business miles of 2026/27 and 25p beyond. A log of dates, destinations and purpose makes the claim stand up.",
    },
    {
      q: "What happens if a session missed the 10-week window?",
      a: "The accrual is gone. A period of freelance locum work that finished over 10 weeks earlier cannot be pensioned at all, so there is no late route and no penalty to pay instead. The fix is process: Form A approved promptly, Form B submitted as each period ends, and a standing check on outstanding sessions so the rest of the year is protected.",
    },
    {
      q: "My sessions now outweigh the salaried post. What changes?",
      a: "Several things at once: IR35 starts to matter if a company is involved, VAT registration comes into view on taxable turnover, and the pension route shifts from the Type 2 form towards the freelance locum forms. At that point <a href=\"/for-locum-doctors\">accountants for locum doctors</a> is the closer fit, and the structure decision is worth modelling rather than drifting into.",
    },
  ],
  ctaTitle: "Talk to an accountant who works with salaried GPs",
  ctaBody:
    "A call with a regulated firm from our specialist partner network, covering your self assessment registration, whether your locum sessions are inside the 10-week pension window, and your Type 2 form and annual allowance position. Scope and fees are agreed with that firm, and enquiring commits you to nothing.",
  relatedGuides: [
    {
      href: "/blog/locum-doctor-self-assessment-filing-guide",
      title: "Locum Doctor Self Assessment Filing Guide",
      body: "Registering by 5 October, payments on account, and what goes on the return alongside your salaried income.",
    },
    {
      href: "/blog/nhs-pension-for-locums-form-a-form-b",
      title: "NHS Pension for Locums: Form A and Form B",
      body: "The 10-week deadline, the PCSE process, and what happens when a session misses the window.",
    },
    {
      href: "/blog/locum-doctor-limited-company-pros-and-cons",
      title: "Locum Doctor Limited Company: Pros and Cons",
      body: "What a company costs you in NHS pension accrual against what it saves in tax.",
    },
  ],
};

export default function ForSalariedGpsPage() {
  return <AudienceStageLayout data={data} />;
}
