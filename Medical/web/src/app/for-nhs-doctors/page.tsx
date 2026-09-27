import type { Metadata } from "next";
import { PiggyBank, Briefcase, Receipt, ShieldAlert, BarChart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountants for NHS Doctors and GP Partners",
  description:
    "Accountants for NHS doctors and GP partners across the UK: pension annual allowance charges, private and locum income, expenses and self assessment.",
  alternates: {
    canonical: `${siteConfig.url}/for-nhs-doctors`,
    languages: {
      "en-GB": `${siteConfig.url}/for-nhs-doctors`,
      "x-default": `${siteConfig.url}/for-nhs-doctors`,
    },
  },
  openGraph: {
    title: "Accountants for NHS Doctors and GP Partners",
    description:
      "Pension annual allowance charges, private and locum income, expenses and self assessment for NHS doctors and GP partners.",
    url: `${siteConfig.url}/for-nhs-doctors`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for NHS Doctors and GP Partners")}`, width: 1200, height: 630, alt: "Accountants for NHS Doctors and GP Partners" }],
  },
};

const data: AudienceStage = {
  slug: "for-nhs-doctors",
  role: "nhs-doctors",
  displayRole: "NHS Doctors and GP Partners",
  displayRoleLower: "NHS doctors and GP partners",
  badge: "Pension annual allowance · Private and locum income · Partnership profit",
  heroHeading: "Accountants for NHS doctors and GP partners",
  intro:
    "As an NHS doctor, your money arrives from more than one place. A consultant post with private clinics on top. A partnership profit share that never matches your drawings. Salaried hours plus locum sessions at weekends. Or an ordinary payslip, until a pension savings statement asks for several thousand pounds you had not budgeted for. It is rarely one question, but how NHS pay, pension input, self-employed profit and a company, if there is one, sit together in one return. That needs someone who already knows why a Form B carries a ten-week clock.",
  // Statutory figures from docs/medical/_wave1/nhs-doctors.json, all single
  // numeric values, checked against docs/medical/house_positions.md §2.B, §8.
  stats: [
    { target: 60, prefix: "£", suffix: "k", label: "Pension annual allowance, 2026/27" },
    { target: 260, prefix: "£", suffix: "k", label: "Adjusted income where tapering starts" },
    { target: 10, suffix: " weeks", label: "Deadline to pension freelance locum work" },
    { target: 55, suffix: "p", label: "Mileage, first 10,000 business miles, 2026/27" },
  ],
  concerns: [
    {
      icon: PiggyBank,
      title: "Is a pension annual allowance charge coming, and is it right?",
      body: "The annual allowance is £60,000 for 2026/27, tapering where threshold income exceeds £200,000 and adjusted income exceeds £260,000, by £1 for every £2 above that, to a floor of £10,000. A defined benefit scheme measures the pension input amount, the capitalised growth in your benefits, not what your payslip deducted, so a promotion can create a charge while contributions look unchanged. Unused allowance carries forward three years, and NHSBSA statements are often late and revised, so the figure is checked before anything is paid. The <a href=\"/calculators/nhs-pension-scheme-pays\">Scheme Pays calculator</a> sets out the arithmetic.",
    },
    {
      icon: Briefcase,
      title: "Private or locum income on top of a payslip",
      body: "NHS pay has tax and Class 1 taken at source. Private clinics, medico-legal work, teaching and invoiced locum sessions do not, and they stack on your NHS band, taxed at your top marginal rate with Class 4 at 6% to £50,270 and 2% above. Only NHS work is pensionable, and for GPs only through the practitioner routes, so anything drawn from a company as dividends builds no NHS accrual, and a tax saving has to be set against that loss. Consultants start at <a href=\"/for-consultants\">hospital consultant accountants</a>.",
    },
    {
      icon: Receipt,
      title: "Which expenses and subscriptions actually come off",
      body: "Two rules run side by side. Against NHS salary: statutory registration fees, subscriptions to bodies on HMRC's approved List 3, where the British Medical Association entry restricts relief to 85%, and the flat rate for your occupational group. Against private or locum profit, on the wholly and exclusively test: indemnity for private and non-clinical cover, mileage between separate sites at the 2026/27 rates of 55p a mile to 10,000 business miles and 25p above that, CPD and equipment. Home to your first site is commuting.",
    },
    {
      icon: ShieldAlert,
      title: "Locum sessions, Forms A and B, and the certificates",
      body: "Pensioning NHS work outside a salaried post is administrative, and the deadline depends on your role. A freelance GP locum uses Form A, approved by the practice, then Form B to PCSE, and work that ended more than ten weeks ago cannot be pensioned at all. That is accrual lost outright, not a penalty you can settle. Partners file the Type 1 Annual Certificate and salaried or solo GPs the Type 2 self assessment, both by 28 February a year in arrears. Sessional doctors start at <a href=\"/for-locum-doctors\">accountants for locum doctors</a>.",
    },
    {
      icon: BarChart,
      title: "Partnership profit, drawings and a shifting profit share",
      body: "A GP partner is taxed on a share of partnership profit, not on what was drawn, so drawings and the January bill rarely match. The practice files an SA800 and each share flows to the partnership pages of a personal return with Class 4 on top. Shares move when a partner joins, leaves or goes part time, and practice income needs reconciling to what PCSE paid, notional rent included. Partner-level work sits on <a href=\"/for-gp-partners\">accountants for GP partners</a>.",
    },
  ],
  services: [
    {
      title: "One return across NHS pay, private work and partnership share",
      body: "Every source is mapped first: P60s and P45s from trust posts, the SA800 share, private and locum profit, dividends and savings. Your accountant prepares one self assessment return from that picture, with Class 4 and any student loan deduction checked against the payroll position.",
    },
    {
      title: "Annual allowance position checked, not accepted",
      body: "A specialist reviews the pension input amount on your statement, tests whether tapering bites, brings forward unused allowance and works out what is left. Where a charge stands, mandatory and voluntary Scheme Pays sit side by side with the election deadline and the extended limb for a statement revised on or after 2 May.",
    },
    {
      title: "Expense and subscription review, including earlier years",
      body: "Employment expenses and self-employed deductions are separated properly, the correct flat rate taken for your occupational group rather than a generic figure, and each subscription checked against List 3. Earlier returns are amended where an under-claim is material, with the evidence for each claim gathered first.",
    },
    {
      title: "Structure reviewed with the pension loss priced in",
      body: "Where private or locum income raises the question, sole trader, partnership and company are modelled at your own numbers: corporation tax, the 2026/27 dividend rates, the cost of running a company, and the NHS accrual given up on dividends. The deadlines that follow, the ten-week locum window included, are tracked from the start.",
    },
  ],
  faqs: [
    {
      q: "I am on a payslip and have never filed a tax return. Do I need one now?",
      a: "You do once income arrives that PAYE has not dealt with: private clinics, medico-legal reports, teaching, an invoiced locum session, or a share of partnership profit. Registration is due by 5 October after the tax year the income arose in, the return by the following 31 January. Budget for payments on account too: where the prior year's liability exceeds £1,000 and less than 80% was collected at source, half again falls due that January and half on 31 July. Doctors in training should read <a href=\"/for-junior-doctors\">accountants for junior doctors</a>.",
    },
    {
      q: "Why is there a pension charge when my contributions have not changed?",
      a: "Because the scheme measures growth in your benefits, not what you paid in. The pension input amount is the increase in the capitalised value of your accrued pension, so a pay uplift or a move up the scale can push it past the £60,000 allowance for 2026/27 while your contribution line looks identical. Above £200,000 threshold income and £260,000 adjusted income it tapers too, to a £10,000 floor.",
    },
    {
      q: "Does private work through a company count towards my NHS pension?",
      a: "No. Only NHS employment, or the practitioner routes for GPs, is pensionable. Money taken out of a company as dividends builds no NHS accrual whatever the company is, and for a hospital consultant private work is never pensionable however it is structured. So an incorporation comparison has to show the accrual given up next to the tax saved, at your own figures.",
    },
    {
      q: "I missed a Form B for a locum session. Can it be sorted later?",
      a: "Usually not. Freelance GP locum work that finished more than ten weeks earlier can no longer be pensioned, and forms arriving after that point are rejected. Unlike a late return this is not a penalty you can pay off: the accrual is gone. Form A needs practice approval before Form B goes in, so submit each period as it finishes rather than batching a quarter.",
    },
    {
      q: "Which page should I read next?",
      a: "Whichever matches your role. Consultants with private income have their own page, as do doctors in training, freelance locums, and GP practices and their partners. Sitting across two, a salaried GP taking locum sessions for instance, start with whichever income is causing the question and say so when you get in touch.",
    },
  ],
  ctaTitle: "Talk to an accountant about your NHS income",
  ctaBody:
    "A call with a regulated firm from our specialist partner network, covering how your NHS pay, pension input, private or locum profit and any company sit together, and whether an annual allowance charge is coming. Scope and fees are agreed with that firm, and enquiring commits you to nothing.",
  relatedCalculators: [
    {
      href: "/calculators/nhs-pension-scheme-pays",
      name: "NHS Pension Scheme Pays Calculator",
      desc: "Work out a Scheme Pays election against settling an annual allowance charge yourself.",
    },
  ],
};

export default function ForNhsDoctorsPage() {
  return <AudienceStageLayout data={data} />;
}
