import type { Metadata } from "next";
import { Briefcase, PiggyBank, Car, TrendingUp, ShieldCheck, BarChart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Medical Accountant for Hospital Consultants | NHS & Private Practice Tax",
  description:
    "Specialist medical accountant services for UK hospital consultants. NHS salary alongside private practice income, medico-legal work, NHS pension annual allowance, and consultant expense claims. 100% medical focus.",
  alternates: {
    canonical: `${siteConfig.url}/for-consultants`,
    languages: {
      "en-GB": `${siteConfig.url}/for-consultants`,
      "x-default": `${siteConfig.url}/for-consultants`,
    },
  },
  openGraph: {
    title: "Accountants for Hospital Consultants | NHS & Private Practice Tax",
    description:
      "NHS salary, private practice, medico-legal income, and NHS pension planning for UK hospital consultants. Specialist medical accountants.",
    url: `${siteConfig.url}/for-consultants`,
    type: "website",
  },
};

const data: AudienceStage = {
  slug: "for-consultants",
  role: "consultants",
  displayRole: "Hospital Consultants",
  badge: "NHS salary · Private practice · Medico-legal",
  heroHeading: "Medical accountant specialists for NHS and private hospital consultants",
  intro:
    "Hospital consultants routinely manage three or four separate income streams: NHS salary, private patient fees, insurance work, and medico-legal reporting. Each requires different tax treatment, different expense logic, and careful coordination to avoid double-counting or missing allowable deductions. A generalist accountant rarely has the exposure to handle all four correctly in a single return.",
  stats: [
    { value: "100%", label: "Medical-only client base" },
    { value: "3-4", label: "Typical income streams managed" },
    { value: "24h", label: "Response guarantee" },
    { value: "£10k", label: "Minimum tapered allowance (high earners)" },
  ],
  concerns: [
    {
      icon: Briefcase,
      title: "How do I handle NHS salary alongside private income?",
      body: "Your Trust pays your NHS salary under PAYE. Private patient income sits outside PAYE and is returned on self-assessment. The interaction affects your tax code, your payments on account, and your NHS pension contribution calculation. We coordinate both streams so neither is over- or under-taxed.",
    },
    {
      icon: TrendingUp,
      title: "Should I set up a private practice company?",
      body: "A limited company for your private practice can reduce your income tax and NI if you have consistent private earnings above roughly £80,000-£100,000, a non-working or lower-earning spouse, and flexibility over when you draw income. Below those thresholds, the administrative cost typically outweighs the benefit. We model both scenarios before you decide.",
    },
    {
      icon: PiggyBank,
      title: "Am I at risk of an NHS pension annual allowance charge?",
      body: "Consultants with high pensionable pay face tapered annual allowances that can fall to £10,000. The pension input grows with NHS pay growth, not just your contributions. We calculate your threshold and adjusted income, model the pension input from your NHSBSA data, and advise on Scheme Pays or carry-forward before you face a charge.",
    },
    {
      icon: ShieldCheck,
      title: "Is my medico-legal income returned correctly?",
      body: "Expert witness fees, report writing, and medico-legal work are self-employed income, not employment income. They sit on self-assessment schedule D, attract Class 4 NI, and carry their own allowable expense profile (software, printer, proportion of professional indemnity). Generalist accountants often muddle this with employment income.",
    },
    {
      icon: Car,
      title: "What travel expenses can I claim?",
      body: "Travel from your NHS base to a private hospital is allowable. Travel from home to your NHS base is not (ordinary commuting). Travel to private patients' homes, medico-legal appointments, and CPD events is allowable. We map your travel patterns and claim the correct mileage or actual costs depending on your vehicle use profile.",
    },
    {
      icon: BarChart,
      title: "How should I structure my private practice for exit?",
      body: "If you plan to wind down your private practice, the structure you choose now determines the tax treatment of any accumulated reserves, goodwill, and retirement date. Incorporation early gives you more options at exit. We help consultants plan 3-5 years ahead rather than making structural decisions under time pressure.",
    },
  ],
  services: [
    {
      title: "Self-assessment combining NHS and private income",
      body: "A single, accurate return covering NHS PAYE income, private patient fees, medico-legal income, investment income, and all allowable expenses. We liaise directly with your Trust's payroll and the NHSBSA to obtain the data we need without burdening you.",
    },
    {
      title: "Private practice company setup and ongoing compliance",
      body: "Company incorporation, PSC payroll setup, dividend policy, company accounts, corporation tax return, and the annual income extraction model. We also advise on how to structure the NHS pension interaction when you take private income through a company.",
    },
    {
      title: "NHS pension annual allowance modelling",
      body: "Annual calculation of your pension input amount from NHSBSA pension savings statements, comparison against your tapered or standard annual allowance, and advice on Scheme Pays elections or carry-forward claims where applicable.",
    },
    {
      title: "Consultant expense claim review",
      body: "Complete review of claimable expenses across both NHS and private practice: GMC retention, MDU/MPS/MDDUS, Royal College subscriptions, CPD, medical equipment, software, home consulting room, and motor. Typically recovers meaningful additional amounts for new clients.",
    },
    {
      title: "Medico-legal income handling",
      body: "Registration as self-employed for medico-legal work if not already done, correct return of expert witness and report-writing income, allowable expenses specific to that activity, and guidance on VAT registration if fees are approaching the threshold.",
    },
    {
      title: "Annual planning and retirement modelling",
      body: "Pre-retirement modelling covering: pension lump sum vs annuity comparisons, lifetime allowance position, optimal retirement date relative to the tax year, and whether partial retirement or phased wind-down of private work is beneficial.",
    },
  ],
  faqs: [
    {
      q: "My Trust issued a P60 but I also have private income. What do I need to do?",
      a: "You need to file a self-assessment tax return. Your P60 covers your NHS PAYE income, but private patient fees, medico-legal income, and any other self-employed income must be declared separately. If you have not been filing self-assessments while earning private income, we can regularise your position and file any outstanding returns. HMRC charges automatic penalties for late filing, so it is important to address this promptly.",
    },
    {
      q: "Can I keep my NHS pension while running a private practice company?",
      a: "Yes. Membership of the NHS Pension Scheme is tied to your NHS employment contract, not to your personal tax arrangements. Operating a private practice company does not affect your NHS pension membership. However, private income paid through your company is not pensionable under the NHS scheme, which affects your pension growth and your annual allowance calculation. We advise on whether a separate personal pension alongside the NHS scheme makes sense in your specific situation.",
    },
    {
      q: "What is the pension input amount and how is it calculated for consultants?",
      a: "For the NHS Pension Scheme (a defined benefit scheme), the pension input amount is not simply your contributions. It is calculated as the increase in your pension entitlement over the pension input period, multiplied by a factor of 16, plus any pension lump sum accrual. For a consultant with increasing pensionable pay, this can grow significantly year on year without any action on your part. The NHSBSA issues Pension Savings Statements when your input exceeds the standard annual allowance.",
    },
    {
      q: "Is VAT registration required for private practice?",
      a: "Medical services provided by registered medical practitioners are VAT-exempt. This includes consultations, surgical procedures, and diagnostic services. Medico-legal reporting sits in a grey area: pure expert witness work is generally exempt, but some types of report-writing have been treated as taxable by HMRC. We advise based on the specific composition of your medico-legal income.",
    },
    {
      q: "How do I switch from my existing accountant?",
      a: "We handle the professional clearance process. Your existing accountant releases your records to us, we review your position, and we pick up from where you are. Switching mid-year is straightforward and is no disruption to your compliance timeline. We manage the transition, not you.",
    },
  ],
  ctaTitle: "Speak to a consultant specialist",
  ctaBody:
    "30-minute call, free. We look at your income structure, NHS pension position, and whether your private practice arrangement is tax-efficient. No obligation.",
  relatedCalculators: [
    {
      href: "/calculators/nhs-pension-annual-allowance",
      name: "NHS Pension Annual Allowance Calculator",
      desc: "Calculate your tapered allowance and potential charge on consultant-level pension growth. Uses your NHSBSA pension savings statement figures. 2025/26 rates.",
    },
    {
      href: "/calculators/private-practice-incorporation",
      name: "Private Practice Incorporation Calculator",
      desc: "Compare sole trader vs limited company net take-home on your private practice income. Instant, no sign-up.",
    },
  ],
  relatedGuides: [
    {
      href: "/medical-guides/consultant-private-practice-tax",
      title: "Consultant Private Practice Tax Guide",
      body: "Private practice income, company structures, medico-legal treatment, and NHS pension interaction.",
    },
    {
      href: "/medical-guides/nhs-pension-annual-allowance",
      title: "NHS Pension Annual Allowance Guide",
      body: "Pension input amounts, tapered allowance, Scheme Pays elections, and carry-forward for high earners.",
    },
    {
      href: "/medical-guides/medical-expenses-tax-treatment",
      title: "Medical Expenses: What Doctors Can Claim",
      body: "GMC, MDU, CPD, motor, equipment, and home consulting room treatment for consultants.",
    },
  ],
};

export default function ForConsultantsPage() {
  return <AudienceStageLayout data={data} />;
}
