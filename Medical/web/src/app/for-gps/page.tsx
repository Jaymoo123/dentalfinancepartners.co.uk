import type { Metadata } from "next";
import { Calculator, FileText, Building2, Receipt, Shield, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

// Retitled 2026-08-26. The corepage pack flagged this page's title AND H1 as
// carrying no head token, while 393 impressions of practice-ENTITY demand
// ("gp practice accountants" 277 @72.3, "accountants for gp practices" 78
// @65.7, "accounting for gp partners" 38 @42.1) were being caught by the
// homepage and a blog post instead. The homepage keeps the practitioner head
// ("gp accountants", "medical accountants"); this page takes the practice.
export const metadata: Metadata = {
  title: "GP Practice Accountants | Partnership Accounts & Partner Tax",
  description:
    "Accountants for GP practices and GP partners: partnership accounts, profit allocation, notional rent, superannuation certificates and self-assessment for partners and salaried GPs.",
  alternates: {
    canonical: `${siteConfig.url}/for-gps`,
    languages: {
      "en-GB": `${siteConfig.url}/for-gps`,
      "x-default": `${siteConfig.url}/for-gps`,
    },
  },
  openGraph: {
    title: "GP Practice Accountants | Accountants for GP Practices & Partners",
    description:
      "Partnership accounts, profit allocation, notional rent, PCSE reconciliation, superannuation certificates, NHS Pension annual allowance and partner self-assessment.",
    url: `${siteConfig.url}/for-gps`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("GP Practice Accountants")}`, width: 1200, height: 630, alt: "GP Practice Accountants" }],
  },
};

const data: AudienceStage = {
  slug: "for-gps",
  role: "gps",
  displayRole: "GP Practices, Partners & Salaried GPs",
  badge: "Partnership accounts · Profit allocation · Superannuation",
  heroHeading: "GP practice accountants for partnerships and their partners",
  intro:
    "A GP practice is two jobs of accounting stacked on top of each other. There is the partnership itself, whose income arrives as global sum weighted by Carr-Hill, QOF achievement, enhanced services, PCN and DES payments and reimbursements, and whose accounts have to carry notional rent, capital and current accounts and a profit allocation that changes whenever a partner joins or leaves. Then there is each partner individually, with a profit share, superannuation already deducted at source, and often locum, out-of-hours or private income alongside it. Accountants for GP practices have to make both sets of figures agree, which is where generalist practice accounting most often comes apart.",
  stats: [
    { value: "100%", label: "Medical work only" },
    { value: "1 day", label: "Reply to enquiries" },
    { value: "£60k", label: "Annual allowance, 2026/27" },
    { value: "£260k", label: "Adjusted income taper point, 2026/27" },
  ],
  concerns: [
    {
      icon: Building2,
      title: "Does our practice income reconcile to what PCSE says it paid us?",
      body: "Practice income does not arrive as one figure. Global sum is weighted by the Carr-Hill formula for the age, sex, morbidity and turnover profile of your list. QOF is paid partly in aspiration and settled on achievement. Enhanced services, PCN and DES payments, and reimbursements for premises, drugs and locum cover all land separately, some in arrears. The reconciliation between the PCSE statements and the practice ledger is where accountants for GP practices earn their keep, because a payment that was never chased is invisible in accounts that simply record what arrived.",
    },
    {
      icon: Users,
      title: "How should notional rent and the capital accounts be handled?",
      body: "Notional rent is reimbursement for premises the partnership occupies, and how it is treated depends on who owns the building and on what terms. Sitting alongside it, each partner has a capital account (their stake in the practice assets) and a current account (undrawn profit). Confusing the two is the commonest defect in GP practice accounts prepared by generalists, and it matters most at exactly the moment a partner joins, retires or asks what their share is actually worth.",
    },
    {
      icon: Calculator,
      title: "Am I facing an NHS pension annual allowance charge?",
      body: "The NHS Pension Scheme is defined benefit, so your pension input amount grows with pensionable pay even if you pay in nothing extra. The annual allowance is £60,000 for 2026/27, unchanged from 2025/26, and it tapers by £1 for every £2 of adjusted income above £260,000 where threshold income also exceeds £200,000, down to a floor of £10,000. Because the measure is capitalised growth rather than contributions paid, a good year for the practice can produce a charge with no warning. Pension input, threshold income and adjusted income are modelled annually, and carry-forward from the three previous tax years is checked before anyone reaches for Scheme Pays.",
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
      body: "BMA subscription and Royal College fees where they sit on HMRC's approved List 3, GMC retention, CPD and conference costs genuinely relevant to current practice, home consulting room on a defensible apportionment, professional journals, and motor between surgeries at 55p per mile for the first 10,000 business miles in 2026/27 (up from 45p on 6 April 2026) then 25p. Indemnity needs care: since April 2019 the Clinical Negligence Scheme for General Practice has covered NHS general practice clinical negligence in England at no subscription, so a GP's own MDU, MPS or MDDUS cost is now largely for private and non-clinical work. Prior years are reviewed and amendments filed where the gap is material.",
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
      body: "Full practice accounts: income and expenditure analysed by NHS income stream, balance sheet, partner capital and current accounts, notional rent treatment, and a profit allocation that handles mid-year changes in the partner mix. A GP partnership does not file at Companies House, so the outputs that matter are the partnership return to HMRC, the individual partner returns that must agree with it, and the superannuation certificates.",
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
      q: "What do GP practice accountants do that a general accountant does not?",
      a: "Three things. They read NHS income at source, so global sum, Carr-Hill weighting, QOF aspiration and achievement, enhanced services, PCN and DES income and reimbursements are analysed rather than lumped into one figure, and the PCSE statements are reconciled to the ledger. They handle the partnership mechanics: notional rent, capital versus current accounts, and a profit allocation that survives a partner joining or leaving mid-year. And they prepare the superannuation certificates and the individual partner returns as one coordinated piece of work with the practice accounts, so the same income cannot be counted twice or dropped between the two.",
    },
    {
      q: "Can you act for the practice and for the partners individually?",
      a: "Yes, and it is usually the point. The partnership return and every partner's self-assessment have to agree on the profit share, the superannuation deducted and the reimbursed expenses. When the practice uses one firm and the partners use several, the reconciliation is done by nobody and the errors surface at the worst time, typically when someone retires or buys in. Accounting for GP partners works best when the practice figures and the personal figures are prepared against each other.",
    },
    {
      q: "Our practice year end is not 5 April. Does basis period reform affect us?",
      a: "Yes. From 2023/24 self-employed and partnership profits are taxed on a tax-year basis regardless of the accounting date, so a practice with, say, a 30 June year end now has its profit apportioned across tax years, with transition profits and overlap relief handled in the transition year. The tax bill does not change in total but the timing does, which moves your payments on account. The cash flow effect is worth modelling before it arrives rather than after.",
    },
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
  ctaTitle: "Talk to a GP practice accountant",
  ctaBody:
    "A free 30-minute scoping call. Whether you are enquiring as a practice or as an individual partner or salaried GP, the call covers your current setup, your NHS Pension position, and any expense claims that look under-made. No obligation.",
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
