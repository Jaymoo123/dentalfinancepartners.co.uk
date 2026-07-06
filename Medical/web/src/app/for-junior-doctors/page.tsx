import type { Metadata } from "next";
import { GraduationCap, CreditCard, MapPin, HelpCircle, Receipt, Briefcase } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountants for Junior Doctors | Locum Shifts, Student Loans & Tax",
  description:
    "Specialist accountants for UK junior doctors. Locum shift taxation, student loan repayments, moving between trusts, NHS pension, and expenses during training. Medical-only.",
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
  },
};

const data: AudienceStage = {
  slug: "for-junior-doctors",
  role: "junior-doctors",
  displayRole: "Junior Doctors",
  badge: "Foundation to registrar · Locum shifts · Student loans",
  heroHeading: "Financial guidance for junior doctors at every training stage",
  intro:
    "Junior doctors navigate a uniquely complex financial situation: rotating between trusts mid-year, managing student loan repayments that interact oddly with the tax system, picking up locum shifts on top of a main salary, and trying to understand an NHS pension scheme that nobody explains properly. Getting the basics right from foundation year sets good habits that matter more and more as income grows.",
  stats: [
    { value: "100%", label: "Medical-only client base" },
    { value: "F1-ST8", label: "All training grades" },
    { value: "24h", label: "Response guarantee" },
    { value: "£0", label: "Hidden fees" },
  ],
  concerns: [
    {
      icon: Receipt,
      title: "I did locum shifts on top of my main salary. Do I need to file a tax return?",
      body: "Yes, if your total income from all sources exceeds the higher-rate threshold, or if you have income outside PAYE (locum shifts paid to you directly, not via your Trust bank). Locum income paid directly to you is self-employment income and must be declared on self-assessment. We identify whether you need to file and handle the return.",
    },
    {
      icon: CreditCard,
      title: "How does my student loan repayment work with my salary?",
      body: "Student loan repayments are calculated at 9% of income above the threshold for your plan (Plan 2 threshold is £27,295 for 2025/26). If you earn above that threshold in employment, repayments are deducted via PAYE. If you also have self-employment income from locum shifts, additional loan repayments are collected via self-assessment. Many junior doctors overpay because their employer takes deductions on the full salary before accounting for their loan balance.",
    },
    {
      icon: MapPin,
      title: "I moved trust mid-year. How does tax work?",
      body: "Moving between NHS trusts mid-year can result in two employers applying the wrong tax code, particularly if neither knows about the other's PAYE records. You may end up underpaying or overpaying tax on a cumulative basis. We review your P60s and PAYE records at year-end and claim any overpaid tax back from HMRC.",
    },
    {
      icon: HelpCircle,
      title: "What is the NHS pension actually giving me?",
      body: "Junior doctors are enrolled in the 2015 NHS Pension Scheme, which is a career average revalued earnings (CARE) scheme. Your pension accrues at 1/54th of your pensionable pay each year, revalued annually by CPI plus 1.5%. Many junior doctors think the 2015 scheme is less valuable than the older sections. It is still an exceptionally good scheme, but understanding what you are accruing helps you plan supplementary saving.",
    },
    {
      icon: GraduationCap,
      title: "What expenses can I claim during training?",
      body: "BMA membership (if you are self-employed for locum work), GMC retention, MDU or MPS indemnity if paid personally, exam fees for postgraduate qualifications (GMC/MRCS/MRCP etc., subject to conditions), professional journals, and motor between separate clinical sites. We review what is claimable based on your employment status and whether you are doing any self-employed work.",
    },
    {
      icon: Briefcase,
      title: "I am starting to do medico-legal or teaching work. What do I need to do?",
      body: "Income from expert witness work, medico-legal reports, or private teaching is self-employment income. You need to register with HMRC as self-employed, file a self-assessment return, and pay Class 4 NI. There is a small earnings threshold below which NI is not due, but the self-assessment requirement applies from the first pound of self-employed income. We handle this alongside your main salary return.",
    },
  ],
  services: [
    {
      title: "Self-assessment for junior doctors with locum income",
      body: "Return combining your NHS PAYE salary, locum income, and any other self-employed or investment income. Student loan repayment reconciled. Class 4 NI calculated correctly on self-employed income. Filed on time, no January panic.",
    },
    {
      title: "Tax code review and overpayment recovery",
      body: "We review your PAYE records across all NHS employers and check that your tax code is correct, especially after a trust move or change of grade. Where HMRC owes you a refund from overpaid PAYE tax, we claim it back.",
    },
    {
      title: "Student loan repayment review",
      body: "We check that your student loan plan type is correct, that repayments via PAYE are being correctly applied against your balance, and that any additional self-assessment repayments are calculated on the right income figure.",
    },
    {
      title: "Expense claim setup for locum and self-employed work",
      body: "For junior doctors doing self-employed work, we set up a clear, HMRC-compliant expense framework from the start. This covers professional registration, indemnity, CPD, exam fees (where qualifying), and motor between clinical sites.",
    },
    {
      title: "NHS pension understanding and modelling",
      body: "We explain clearly what you are accruing in the 2015 CARE scheme, model your projected benefit at different retirement ages, and advise on whether supplementary pension contributions (AVCs or personal pension) make sense alongside the NHS scheme.",
    },
    {
      title: "Foundation to consultant financial planning",
      body: "We support junior doctors from foundation year through specialist training, tracking the financial implications of grade changes, gap years, academic posts, and the transition to consultant grade where income complexity increases sharply.",
    },
  ],
  faqs: [
    {
      q: "I am a foundation doctor and only earn NHS salary. Do I need an accountant?",
      a: "If your only income is PAYE NHS salary and you have no self-employed income, investments above the savings threshold, or income over £100,000 (which triggers the personal allowance restriction), you do not strictly need to file a self-assessment. However, it is worth reviewing your P60s and tax code annually to check for overpayments, and it is useful to understand the student loan situation. Many junior doctors find it helpful to start the relationship early so the transition to consultant-grade complexity is smooth.",
    },
    {
      q: "My Trust offers bank locum shifts. Is that self-employment?",
      a: "Not necessarily. Bank shifts through your own Trust are usually processed through your existing employment contract via PAYE. However, bank shifts through an external locum agency, or direct agreements with other practices, are treated as self-employment. The distinction matters for NI, for whether you receive PAYE deductions, and for your self-assessment obligation. We check the nature of your arrangement and advise accordingly.",
    },
    {
      q: "I am taking a year out for an academic fellowship. How does that affect my tax?",
      a: "The tax implications depend on your fellowship structure. An NHS academic clinical fellowship or a university-hosted fellowship may be treated differently: one may be employment, the other self-employment or a bursary. The interaction with NHS pension membership also differs. We advise on the correct treatment for your specific fellowship before you start, so there are no surprises.",
    },
    {
      q: "I have a Plan 2 student loan. How much of my earnings are going to it?",
      a: "Plan 2 (post-September 2012 entry) repayments are 9% of income above £27,295 in 2025/26. On a Foundation Year 1 salary of around £36,000, that is roughly £780 per year in loan repayments via PAYE. As your salary grows through the training grades, repayments increase proportionally until your balance is cleared or written off 30 years after your first repayment due date.",
    },
    {
      q: "When should I start thinking about buying a property?",
      a: "Many junior doctors face mortgage challenges because their employment contracts are fixed-term and their income varies year to year with locum shifts and allowances. Specialist mortgage brokers who understand NHS employment can usually find suitable products. From our side, we can provide clean SA302s and two years of accounts for any self-employed income if needed, and we advise on the tax implications of ownership structures if you are buying with a partner.",
    },
  ],
  ctaTitle: "Get your junior doctor tax sorted",
  ctaBody:
    "30-minute call, free. We look at your current tax position, your locum income setup, and your student loan situation. No obligation.",
  relatedCalculators: [
    {
      href: "/calculators/locum-tax-calculator",
      name: "Locum Doctor Tax Calculator",
      desc: "Work out the tax on your locum shifts alongside your NHS salary. Includes student loan plan 2 repayment calculation. 2025/26 rates.",
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
