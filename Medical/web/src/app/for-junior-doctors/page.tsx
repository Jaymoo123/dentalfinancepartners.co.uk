import type { Metadata } from "next";
import { GraduationCap, CreditCard, MapPin, HelpCircle, Receipt, Briefcase } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountants for Junior Doctors | Locum Shifts, Student Loans & Tax",
  description:
    "Specialist accountants for UK junior doctors. Locum shift taxation, student loan repayments, moving between trusts, NHS pension, and expenses during training.",
  alternates: {
    canonical: `${siteConfig.url}/for-junior-doctors`,
    languages: {
      "en-GB": `${siteConfig.url}/for-junior-doctors`,
      "x-default": `${siteConfig.url}/for-junior-doctors`,
    },
  },
  openGraph: {
    title: "Accountants for Junior Doctors | Locum Shifts, Student Loans & Tax",
    description:
      "Locum shift taxation, student loan repayments, trust moves, NHS pension, and training expenses for UK junior doctors.",
    url: `${siteConfig.url}/for-junior-doctors`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for Junior Doctors | Locum Shifts, Student Loans & Tax")}`, width: 1200, height: 630, alt: "Accountants for Junior Doctors | Locum Shifts, Student Loans & Tax" }],
  },
};

const data: AudienceStage = {
  slug: "for-junior-doctors",
  role: "junior-doctors",
  displayRole: "Junior Doctors",
  displayRoleLower: "junior doctors",
  badge: "Foundation to registrar · Locum shifts · Student loans",
  heroHeading: "Financial guidance for junior doctors at every training stage",
  intro:
    "Junior doctors navigate a uniquely complex financial situation: rotating between trusts mid-year, managing student loan repayments that interact oddly with the tax system, picking up locum shifts on top of a main salary, and trying to understand an NHS pension scheme that nobody explains properly. Getting the basics right from foundation year sets good habits that matter more and more as income grows.",
  // Statutory figures only, each re-derived 2026-09-11 against
  // docs/medical/house_positions.md. All four figures that previously sat here
  // ("100% medical-only client base", "F1-ST8 all training grades", "24h
  // response guarantee", "£0 hidden fees") were a client claim, an unsourced
  // label, a response-time promise and a fee claim. None is in house_positions
  // and none republishes.
  stats: [
    // house_positions 22: Class 4 NIC 6% on profits over £12,570 for 2026/27.
    // Expressed as the rate, not the threshold: StatsCounter renders a bare
    // number with no thousands separator, so "£12570" would ship mis-set.
    { target: 6, suffix: "%", label: "Class 4 NIC over £12,570, 2026/27" },
    // house_positions 22: higher rate 40% above £50,270 for 2026/27.
    { target: 40, suffix: "%", label: "Higher rate above £50,270, 2026/27" },
    // house_positions 9: MTD for Income Tax, £50,000 from 6 April 2026, live.
    { target: 50, prefix: "£", suffix: "k", label: "MTD for Income Tax, live since April 2026" },
    // house_positions 2.C: lowest NHS pension member contribution tier for
    // 2026/27, on pensionable pay up to £13,259.
    { target: 5.2, decimals: 1, suffix: "%", label: "Lowest pension contribution tier, 2026/27" },
  ],
  concerns: [
    {
      icon: Receipt,
      title: "I did locum shifts on top of my main salary. Do I need to file a tax return?",
      body: "Yes, if your total income from all sources exceeds the higher-rate threshold, or if you have income outside PAYE (locum shifts paid to you directly, not via your Trust bank). Locum income paid directly to you is self-employment income and must be declared on self-assessment. Whether you need to file is identified, and the return handled.",
    },
    {
      icon: CreditCard,
      title: "How does my student loan repayment work with my salary?",
      body: "Repayment is 9% of income above the repayment threshold for your plan, and nothing at all below it. The threshold is different for each plan and is re-set every April, so a headline figure goes stale fast. If you earn above it in employment, repayments come out through PAYE. If you also have self-employment income from locum shifts, further repayments are collected through self-assessment. Run your own salary through the locum tax calculator rather than working from a remembered number.",
    },
    {
      icon: MapPin,
      title: "I moved trust mid-year. How does tax work?",
      body: "Moving between NHS trusts mid-year can result in two employers applying the wrong tax code, particularly if neither knows about the other's PAYE records. You may end up underpaying or overpaying tax on a cumulative basis. Your P60s and PAYE records are reviewed at year end and any overpaid tax reclaimed from HMRC.",
    },
    {
      icon: HelpCircle,
      title: "What is the NHS pension actually giving me?",
      body: "Junior doctors are enrolled in the 2015 NHS Pension Scheme, which is a career average revalued earnings (CARE) scheme. Your pension accrues at 1/54th of your pensionable pay each year, revalued annually by CPI plus 1.5%. Many junior doctors think the 2015 scheme is less valuable than the older sections. It is still an exceptionally good scheme, but understanding what you are accruing helps you plan supplementary saving.",
    },
    {
      icon: GraduationCap,
      title: "What expenses can I claim during training?",
      body: "BMA membership (if you are self-employed for locum work), GMC retention, MDU or MPS indemnity if paid personally, exam fees for postgraduate qualifications (GMC/MRCS/MRCP etc., subject to conditions), professional journals, and motor between separate clinical sites. What is claimable is read against your employment status and whether you are doing any self-employed work.",
    },
    {
      icon: Briefcase,
      title: "I am starting to do medico-legal or teaching work. What do I need to do?",
      body: "Income from expert witness work, medico-legal reports, or private teaching is self-employment income. You need to register with HMRC as self-employed, file a self-assessment return, and pay Class 4 NI. There is a small earnings threshold below which NI is not due, but the self-assessment requirement applies from the first pound of self-employed income. This is handled alongside your main salary return.",
    },
  ],
  services: [
    {
      title: "Self-assessment for junior doctors with locum income",
      body: "Return combining your NHS PAYE salary, locum income, and any other self-employed or investment income. Student loan repayment reconciled. Class 4 NI calculated correctly on self-employed income. Filed on time, no January panic.",
    },
    {
      title: "Tax code review and overpayment recovery",
      body: "Your PAYE records across all NHS employers are reviewed and your tax code checked, especially after a trust move or a change of grade. Where HMRC owes you a refund from overpaid PAYE tax, it is reclaimed.",
    },
    {
      title: "Student loan repayment review",
      body: "Your student loan plan type is checked, along with whether PAYE repayments are being applied correctly against your balance and whether any additional self-assessment repayments are calculated on the right income figure.",
    },
    {
      title: "Expense claim setup for locum and self-employed work",
      body: "For junior doctors doing self-employed work, a clear, HMRC-compliant expense framework is set up from the start. This covers professional registration, indemnity, CPD, exam fees (where qualifying), and motor between clinical sites.",
    },
    {
      title: "NHS pension understanding and modelling",
      body: "What you are accruing in the 2015 CARE scheme is set out plainly, your projected benefit is modelled at different retirement ages, and whether supplementary contributions (AVCs or a personal pension) make sense alongside the NHS scheme is worked through.",
    },
    {
      title: "Foundation to consultant financial planning",
      body: "Support runs from foundation year through specialist training, tracking the financial implications of grade changes, gap years, academic posts, and the transition to consultant grade where income complexity increases sharply.",
    },
  ],
  faqs: [
    {
      q: "I am a foundation doctor and only earn NHS salary. Do I need an accountant?",
      a: "If your only income is PAYE NHS salary and you have no self-employed income, investments above the savings threshold, or income over £100,000 (which triggers the personal allowance restriction), you do not strictly need to file a self-assessment. However, it is worth reviewing your P60s and tax code annually to check for overpayments, and it is useful to understand the student loan situation. Many junior doctors find it helpful to start the relationship early so the transition to consultant-grade complexity is smooth.",
    },
    {
      q: "My Trust offers bank locum shifts. Is that self-employment?",
      a: "Not necessarily. Bank shifts through your own Trust are usually processed through your existing employment contract via PAYE. However, bank shifts through an external locum agency, or direct agreements with other practices, are treated as self-employment. The distinction matters for NI, for whether you receive PAYE deductions, and for your self-assessment obligation. The nature of the arrangement is what settles it, so it is checked before it reaches your return.",
    },
    {
      q: "I am taking a year out for an academic fellowship. How does that affect my tax?",
      a: "The tax implications depend on your fellowship structure. An NHS academic clinical fellowship or a university-hosted fellowship may be treated differently: one may be employment, the other self-employment or a bursary. The interaction with NHS pension membership also differs. The correct treatment for your specific fellowship is worth settling before you start, so there are no surprises.",
    },
    {
      q: "I have a Plan 2 student loan. How much of my earnings are going to it?",
      a: "Plan 2 (post-September 2012 entry) takes 9p in every pound you earn above the Plan 2 repayment threshold, and nothing below it. The threshold moves each April, so the only figure worth acting on is the current one applied to your own salary: the locum tax calculator does that, and your payslip shows what is actually being deducted. As your salary grows through the training grades, repayments increase proportionally until your balance is cleared or written off 30 years after your first repayment due date.",
    },
    {
      q: "When should I start thinking about buying a property?",
      a: "Many junior doctors face mortgage challenges because their employment contracts are fixed-term and their income varies year to year with locum shifts and allowances. Specialist mortgage brokers who understand NHS employment can usually find suitable products. On the accounting side, clean SA302s and two years of accounts for any self-employed income can be produced where a lender asks for them, and the tax implications of ownership structures matter if you are buying with a partner.",
    },
  ],
  ctaTitle: "Get your junior doctor tax sorted",
  ctaBody:
    "30-minute call, free. It covers your current tax position, your locum income setup, and your student loan situation. No obligation.",
  calculatorTabs: ["locumtax"],
  // Literal /calculators/<slug> hrefs. The tabs above them render buttons, not
  // anchors, so this list is what keeps the crawl path (DISPOSITION_SLICE2 B.1).
  relatedCalculators: [
    {
      href: "/calculators/locum-tax-calculator",
      name: "Locum Doctor Tax Calculator",
      desc: "Work out the tax on locum shifts taken alongside your NHS salary, including the student loan repayment.",
    },
    {
      href: "/calculators/salaried-doctor-take-home",
      name: "Salaried Doctor Take-Home",
      desc: "See what a training grade salary leaves after tax, National Insurance, pension contributions and student loan.",
    },
  ],
  relatedGuides: [
    {
      href: "/medical-guides/medical-expenses-tax-treatment",
      title: "Medical Expenses: What Doctors Can Claim",
      body: "GMC, indemnity, BMA, exam fees, and motor during training. What is claimable and what is not.",
    },
    {
      href: "/medical-guides/locum-limited-company-vs-umbrella",
      title: "Locum Doctor: Ltd Company vs Umbrella vs Sole Trader",
      body: "When to go limited, when to stay self-employed, and how IR35 affects the decision.",
    },
    {
      href: "/medical-guides/nhs-pension-annual-allowance",
      title: "NHS Pension Annual Allowance Guide",
      body: "What you are accruing in the 2015 CARE scheme and how the annual allowance applies.",
    },
  ],
};

export default function ForJuniorDoctorsPage() {
  return <AudienceStageLayout data={data} />;
}
