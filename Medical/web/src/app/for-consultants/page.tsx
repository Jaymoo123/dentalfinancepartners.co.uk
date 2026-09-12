import type { Metadata } from "next";
import { Briefcase, PiggyBank, Car, TrendingUp, ShieldCheck, BarChart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Medical Accountant for Hospital Consultants | NHS & Private Practice Tax",
  description:
    "Specialist medical accountant services for UK hospital consultants. NHS salary alongside private practice income, medico-legal work, NHS pension annual allowance, and consultant expense claims.",
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
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for Hospital Consultants | NHS & Private Practice Tax")}`, width: 1200, height: 630, alt: "Accountants for Hospital Consultants | NHS & Private Practice Tax" }],
  },
};

const data: AudienceStage = {
  slug: "for-consultants",
  role: "consultants",
  displayRole: "Hospital Consultants",
  displayRoleLower: "hospital consultants",
  badge: "NHS salary · Private practice · Medico-legal",
  heroHeading: "Medical accountant specialists for NHS and private hospital consultants",
  intro:
    "Hospital consultants routinely manage three or four separate income streams: NHS salary, private patient fees, insurance work, and medico-legal reporting. Each requires different tax treatment, different expense logic, and careful coordination to avoid double-counting or missing allowable deductions. A generalist accountant rarely has the exposure to handle all four correctly in a single return.",
  // Statutory figures only, each re-derived 2026-09-11 against
  // docs/medical/house_positions.md. The three figures that previously sat here
  // ("100% medical-only client base", "3-4 typical income streams managed",
  // "24h response guarantee") were two client claims and a response-time
  // promise: none is in house_positions and all three are barred, so they do
  // not republish.
  stats: [
    // house_positions 2.B: annual allowance £60,000 for 2026/27.
    { target: 60, prefix: "£", suffix: "k", label: "Annual allowance, 2026/27" },
    // house_positions 2.B: the taper floor is £10,000.
    { target: 10, prefix: "£", suffix: "k", label: "Minimum tapered allowance" },
    // house_positions 2.B: taper needs threshold income above £200,000.
    { target: 200, prefix: "£", suffix: "k", label: "Threshold income test, 2026/27" },
    // house_positions 6: VAT registration at £90,000 of taxable turnover only,
    // which is where medico-legal and cosmetic work matters for consultants.
    { target: 90, prefix: "£", suffix: "k", label: "VAT registration, taxable turnover" },
  ],
  concerns: [
    {
      icon: Briefcase,
      title: "How do I handle NHS salary alongside private income?",
      body: "Your Trust pays your NHS salary under PAYE. Private patient income sits outside PAYE and is returned on self-assessment. The interaction affects your tax code, your payments on account, and your NHS pension contribution calculation. Both streams are coordinated so neither is over- or under-taxed.",
    },
    {
      icon: TrendingUp,
      title: "Should I set up a private practice company?",
      body: "Whether a company helps depends on the mix of your income and on how much you draw versus leave in the company, not on hitting a particular level of private earnings. Corporation tax at 19% on profits up to £50,000 and 25% above £250,000, plus dividend tax at 10.75%, 35.75% or 39.35% for 2026/27, has to beat income tax and Class 4 on the same profit, and the dividend-rate rise on 6 April 2026 narrowed that gap. Private income through a company is also outside the NHS scheme, so the pension accrual you give up belongs in the comparison. The incorporation calculator models both routes on your own figures.",
    },
    {
      icon: PiggyBank,
      title: "Am I at risk of an NHS pension annual allowance charge?",
      body: "Consultants with high pensionable pay face tapered annual allowances that can fall to £10,000. The pension input grows with NHS pay growth, not just your contributions. Your threshold and adjusted income are calculated, the pension input is modelled from your NHSBSA data, and Scheme Pays or carry-forward is weighed before you face a charge.",
    },
    {
      icon: ShieldCheck,
      title: "Is my medico-legal income returned correctly?",
      body: "Expert witness fees, report writing, and medico-legal work are self-employed income, not employment income. They sit on self-assessment schedule D, attract Class 4 NI, and carry their own allowable expense profile (software, printer, proportion of professional indemnity). Generalist accountants often muddle this with employment income.",
    },
    {
      icon: Car,
      title: "What travel expenses can I claim?",
      body: "Travel from your NHS base to a private hospital is allowable. Travel from home to your NHS base is not (ordinary commuting). Travel to private patients' homes, medico-legal appointments, and CPD events is allowable. Your travel patterns are mapped and the correct mileage or actual costs claimed, depending on your vehicle use profile.",
    },
    {
      icon: BarChart,
      title: "How should I structure my private practice for exit?",
      body: "If you plan to wind down your private practice, the structure you choose now determines the tax treatment of any accumulated reserves, goodwill, and retirement date. Incorporation early gives you more options at exit. The planning works 3 to 5 years ahead, rather than taking structural decisions under time pressure.",
    },
  ],
  services: [
    {
      title: "Self-assessment combining NHS and private income",
      body: "A single, accurate return covering NHS PAYE income, private patient fees, medico-legal income, investment income, and all allowable expenses. The data is taken directly from your Trust's payroll and the NHSBSA rather than assembled by you.",
    },
    {
      title: "Private practice company setup and ongoing compliance",
      body: "Company incorporation, PSC payroll setup, dividend policy, company accounts, corporation tax return, and the annual income extraction model. The NHS pension interaction, where private income is taken through a company, is settled alongside it.",
    },
    {
      title: "NHS pension annual allowance modelling",
      body: "Annual calculation of your pension input amount from NHSBSA pension savings statements, comparison against your tapered or standard annual allowance, and advice on Scheme Pays elections or carry-forward claims where applicable.",
    },
    {
      title: "Consultant expense claim review",
      body: "Complete review of claimable expenses across both NHS and private practice: GMC retention, MDU/MPS/MDDUS, Royal College subscriptions, CPD, medical equipment, software, home consulting room, and motor. Prior years are reviewed alongside the current one and amendments filed where the gap is material.",
    },
    {
      title: "Medico-legal income handling",
      body: "Registration as self-employed for medico-legal work if not already done, correct return of expert witness and report-writing income, allowable expenses specific to that activity, and guidance on VAT registration if fees are approaching the threshold.",
    },
    {
      title: "Annual planning and retirement modelling",
      body: "Pre-retirement modelling covering: pension lump sum options, your position against the Lump Sum Allowance and the Lump Sum and Death Benefit Allowance that replaced the abolished lifetime allowance on 6 April 2024, optimal retirement date relative to the tax year, and whether partial retirement or phased wind-down of private work is beneficial.",
    },
  ],
  faqs: [
    {
      q: "My Trust issued a P60 but I also have private income. What do I need to do?",
      a: "You need to file a self-assessment tax return. Your P60 covers your NHS PAYE income, but private patient fees, medico-legal income, and any other self-employed income must be declared separately. If you have not been filing self-assessments while earning private income, the position can be regularised and any outstanding returns filed. HMRC charges automatic penalties for late filing, so it is important to address this promptly.",
    },
    {
      q: "Can I keep my NHS pension while running a private practice company?",
      a: "Yes. Membership of the NHS Pension Scheme is tied to your NHS employment contract, not to your personal tax arrangements. Operating a private practice company does not affect your NHS pension membership. However, private income paid through your company is not pensionable under the NHS scheme, which affects your pension growth and your annual allowance calculation. Whether a separate personal pension alongside the NHS scheme makes sense is worked through on your own figures.",
    },
    {
      q: "What is the pension input amount and how is it calculated for consultants?",
      a: "For the NHS Pension Scheme (a defined benefit scheme), the pension input amount is not simply your contributions. It is calculated as the increase in your pension entitlement over the pension input period, multiplied by a factor of 16, plus any pension lump sum accrual. For a consultant with increasing pensionable pay, this can grow significantly year on year without any action on your part. The NHSBSA issues Pension Savings Statements when your input exceeds the standard annual allowance.",
    },
    {
      q: "Is VAT registration required for private practice?",
      a: "Medical services provided by registered medical practitioners are VAT-exempt. This includes consultations, surgical procedures, and diagnostic services. Medico-legal reporting sits in a grey area: pure expert witness work is generally exempt, but some types of report-writing have been treated as taxable by HMRC. The answer turns on the specific composition of your medico-legal income.",
    },
    {
      q: "How do I switch from my existing accountant?",
      a: "Professional clearance is handled for you. Your existing accountant releases your records, your position is reviewed, and the work picks up from where you are rather than from scratch. Switching mid-year is straightforward and is no disruption to your compliance timeline. The transition is managed for you, not by you.",
    },
  ],
  ctaTitle: "Speak to a consultant specialist",
  ctaBody:
    "Send your position and we will match it to a regulated firm that works with consultants. The first call covers your income structure, your NHS pension position, and whether your private practice arrangement is tax-efficient. Scope and fees are agreed with that firm, and enquiring commits you to nothing.",
  calculatorTabs: ["annualallowance", "incorporation"],
  // Literal /calculators/<slug> hrefs. The tabs above them render buttons, not
  // anchors, and this route fails its link floor by one without BOTH of the
  // first two spelled out here (DISPOSITION_SLICE2 B.1).
  relatedCalculators: [
    {
      href: "/calculators/nhs-pension-annual-allowance",
      name: "NHS Pension Annual Allowance Calculator",
      desc: "Work out your tapered allowance and any charge on consultant-level pension growth, from your NHSBSA pension savings statement figures.",
    },
    {
      href: "/calculators/private-practice-incorporation",
      name: "Private Practice Incorporation Calculator",
      desc: "Compare sole trader against limited company take-home on private practice income, and what the company route costs in pension accrual.",
    },
    {
      href: "/calculators/consultant-private-vs-nhs",
      name: "Consultant Private versus NHS Income",
      desc: "Set private sessions against NHS pay to see what each marginal hour is worth after tax.",
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
