import type { Metadata } from "next";
import { Calculator, FileText, Building2, Receipt, Shield, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "GP Accountant | NHS Pension & Tax for GP Partners & Salaried GPs",
  description:
    "Specialist GP accountant services for UK GP partners and salaried GPs. NHS pension annual allowance, GP partnership accounts, GP self-assessment, and medical expense claims. Medical-only focus.",
  alternates: {
    canonical: `${siteConfig.url}/for-gps`,
    languages: {
      "en-GB": `${siteConfig.url}/for-gps`,
      "x-default": `${siteConfig.url}/for-gps`,
    },
  },
  openGraph: {
    title: "Accountants for GP Partners & Salaried GPs",
    description:
      "NHS pension annual allowance, GP partnership accounts, mixed income tax, and medical expense claims. 100% medical focus.",
    url: `${siteConfig.url}/for-gps`,
    type: "website",
  },
};

const data: AudienceStage = {
  slug: "for-gps",
  role: "gps",
  displayRole: "GP Partners & Salaried GPs",
  badge: "GP practices · NHS pension · Self-assessment",
  heroHeading: "GP accountant specialists for partners and salaried GPs",
  intro:
    "GP finances sit at an unusual intersection of employment, self-employment, partnership income, NHS pension, and often private practice. Most generalist accountants handle the compliance but miss the nuances that matter: annual allowance modelling, correct treatment of NHS Pension growth as a pension input, and practice expense allocations that HMRC will not challenge. A specialist GP accountant understands these from day one.",
  stats: [
    { value: "100%", label: "Medical-only client base" },
    { value: "50+", label: "GP practices advised" },
    { value: "24h", label: "Response guarantee" },
    { value: "£60k", label: "2025/26 annual allowance" },
  ],
  concerns: [
    {
      icon: Calculator,
      title: "Am I facing an NHS pension annual allowance charge?",
      body: "The NHS Pension Scheme's defined benefit structure means pension input grows each year even if you make no additional contributions. For higher-earning GPs, the tapered annual allowance can bring the limit as low as £10,000. We model your pension input, adjusted income, and threshold income annually to catch charges before they crystallise.",
    },
    {
      icon: FileText,
      title: "How do I handle mixed NHS and private income?",
      body: "A salaried GP with additional private sessions, a locum shift here and there, and a share of partnership superannuation creates a genuinely complicated tax picture. We reconcile every income stream, ensure NHS superannuation is reported correctly, and check that private income is returned on self-assessment without duplication.",
    },
    {
      icon: Building2,
      title: "What does our partnership profit share look like on my return?",
      body: "GP partnership accounts require specific treatment: allocation of notional rent, reimbursed expenses, individual superannuation contributions, and profit shares that change throughout the year when partners join or leave. We prepare partnership accounts and individual returns in a coordinated way so nothing is counted twice or missed.",
    },
    {
      icon: Receipt,
      title: "What expenses can I actually claim?",
      body: "BMA membership, MDU/MPS/MDDUS indemnity, GMC retention, CPD and conference costs, home consulting room, professional journals, motor between surgeries. Many GPs we onboard are under-claiming. We review the last three years and file amendments where the gap is material.",
    },
    {
      icon: Shield,
      title: "Should my practice incorporate?",
      body: "Practice incorporation is sometimes the right move for GPs with significant private income outside the partnership and non-working spouse or adult children with pension headroom. It is rarely the right move for a standard salaried or partner GP earning only NHS income. We model the numbers before recommending any structural change.",
    },
    {
      icon: Users,
      title: "We have a new partner joining. What are the tax implications?",
      body: "Admitting a new partner mid-year creates a change-of-basis period, affects the partnership profit shares, and requires careful handling of the incoming partner's NHS pension membership and superannuation contributions. We coordinate across all partners to ensure the transition is handled correctly and files on time.",
    },
  ],
  services: [
    {
      title: "GP self-assessment and partnership tax returns",
      body: "All income streams returned correctly: NHS salary or partnership share, private sessions, locum shifts, rental income, investment income. GP self-assessment filed accurately and inside the deadline. We coordinate partner and practice returns where applicable.",
    },
    {
      title: "NHS pension annual allowance modelling",
      body: "We calculate your pension input amounts for the NHS Pension Scheme each year, model the tapered annual allowance against your adjusted income, and flag where Scheme Pays elections may reduce or defer a charge. Modelling is done before the charge crystallises, not after.",
    },
    {
      title: "GP partnership accounts preparation",
      body: "Accounts prepared to the standard required by NHS England for PCN and ICB reporting: income and expenditure, balance sheet, profit allocation, and notional rent treatment. Filed with Companies House or HMRC as appropriate for your practice structure.",
    },
    {
      title: "Medical expense claim review",
      body: "We review your current and prior year expense claims against HMRC's stated position on medical professional expenses. Where we find under-claimed amounts, we file amendments. Going forward, we provide a personalised expense guide for your specific role.",
    },
    {
      title: "Practice structure advice",
      body: "Analysis of whether incorporation, a limited liability partnership, or a different profit-sharing arrangement better suits your practice's composition, income mix, and medium-term plans. We model the tax cost of any structural change before you commit.",
    },
    {
      title: "GP tax planning and annual review",
      body: "A scheduled call each tax year covering: pension carry-forward headroom, salary and dividend optimisation where relevant, payments on account, upcoming changes to NHS pension regulations, and GP financial planning aligned to your specific practice situation and medium-term goals.",
    },
  ],
  faqs: [
    {
      q: "I received an NHS pension annual allowance charge. What should I do?",
      a: "First, verify the HMRC calculation: the NHSBSA issues Pension Savings Statements, but there are known errors in pension input amounts, particularly for members who changed scheme section or had mid-year changes to pensionable pay. If the charge is correct, assess whether a Scheme Pays election makes sense, which defers and capitalises the charge against your eventual pension benefits. We work through both steps for GP clients in this position.",
    },
    {
      q: "Can I claim for use of my home as a consulting room?",
      a: "If you genuinely use a room at home exclusively for NHS or private consulting, a proportion of household costs is allowable. The calculation involves floor area ratios and the proportion of time the room is used professionally. HMRC scrutinises home office claims for GPs, so the claim needs to be defensible. We document it correctly from the outset rather than risking an HMRC challenge later.",
    },
    {
      q: "My practice uses a different year-end to the tax year. Does that matter?",
      a: "From 2023/24 all self-employed income is taxed on a tax-year basis regardless of your accounting year-end, following HMRC's basis period reform. If your practice year-end is not 31 March or 5 April, there will be a transitional overlap profit adjustment that we handle in the transition year and going forward. It matters for your payments on account, so we model the cash flow implications alongside the tax position.",
    },
    {
      q: "As a salaried GP, do I need to file a self-assessment?",
      a: "If you have additional income beyond your salaried NHS pay (private sessions, locum shifts, BMA sessional work, rental income, investment income above the threshold), or if your total income exceeds £100,000 (which triggers the personal allowance taper), then yes. Many salaried GPs think their employer handles everything via PAYE, then face an unexpected self-assessment requirement. We identify this early and register you on time.",
    },
    {
      q: "How long does the onboarding process take?",
      a: "We handle professional clearance with your existing accountant and request the records we need. Most onboarding is complete within two to three weeks. We pick up from the current position rather than asking you to restart from scratch. You can switch mid-year without disruption to your filing timeline.",
    },
  ],
  ctaTitle: "Get your GP accounts done properly",
  ctaBody:
    "30-minute scoping call, free. We look at your current setup, check your NHS pension position, and flag any expense claims you may be missing. No obligation.",
  relatedCalculators: [
    {
      href: "/calculators/nhs-pension-annual-allowance",
      name: "NHS Pension Annual Allowance Calculator",
      desc: "Enter your threshold income and annual pension growth from your NHSBSA statement to see your tapered allowance and any potential charge. 2025/26 rates.",
    },
  ],
  relatedGuides: [
    {
      href: "/medical-guides/nhs-pension-annual-allowance",
      title: "NHS Pension Annual Allowance Guide",
      body: "How the annual allowance works for GPs, the tapered allowance, Scheme Pays elections, and carry-forward.",
    },
    {
      href: "/medical-guides/gp-partnership-accounts",
      title: "GP Partnership Accounts Guide",
      body: "What partnership accounts include, how profit shares work, and the basis period reform impact.",
    },
    {
      href: "/medical-guides/medical-expenses-tax-treatment",
      title: "Medical Expenses: What Doctors Can Claim",
      body: "Indemnity, GMC, BMA, CPD, motor, home consulting room. The full list and what HMRC accepts.",
    },
  ],
};

export default function ForGPsPage() {
  return <AudienceStageLayout data={data} />;
}
