import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-practice-buyers",
  title: "Accountants for Dental Practice Buyers UK",
  metaTitle: "Accountants for Dental Practice Buyers UK | Due Diligence",
  metaDescription:
    "Specialist financial due diligence and tax planning for UK dental practice buyers. Goodwill valuation, EBITDA review, NHS contract analysis, financing.",
  eyebrow: "For practice buyers",
  badge: "First-time buyers · Associate-to-principal · Multi-site acquirers",
  heroHeading: "Buy your dental practice with eyes open",
  intro:
    "Most first-time practice buyers find a practice they like, fall in love with the building, and skim the financial diligence. We are the second opinion that catches the things that turn into problems six months in. EBITDA normalisation, NHS contract review, associate agreement risk, goodwill split, tax structure.",
  stats: [
    { value: "60-80%", label: "Typical goodwill share of price" },
    { value: "24-month", label: "BADR + Section 162 lead time" },
    { value: "0.6-1.4x", label: "EBITDA multiple range" },
    { value: "Fixed", label: "Due diligence fee, no hourly bill" },
  ],
  concerns: [
    {
      title: "Are the seller's accounts telling the real story?",
      body: "Sellers normalise their accounts before listing. Sometimes the normalisation is reasonable; sometimes it is generous. We unwind the adjustments and rebuild the realistic post-acquisition P&L from the perspective of you as the new owner.",
    },
    {
      title: "What multiple should I be paying?",
      body: "EBITDA multiples in UK dental in 2025/26 range roughly 0.6x for NHS-heavy single-handed practices in low-demand regions to 1.4x+ for private-focused multi-surgery in prime locations. Corporate buyers benchmark differently again. We give you a defensible position.",
    },
    {
      title: "Is the NHS contract transferable and stable?",
      body: "NHS contract novation depends on the commissioner. Some contracts are clean novations; others require new contract negotiation that can change UDA value. We read the contract documentation and the recent commissioner correspondence before you complete.",
    },
    {
      title: "How should I finance this?",
      body: "Specialist dental lenders typically offer 70-90% loan-to-value on practice goodwill+assets, with 10-15 year terms. Some require a deposit you can fund personally. Others stretch on associate income. We model the cash flow against the loan repayment to confirm the deal services itself.",
    },
    {
      title: "Asset sale or share sale?",
      body: "Most UK dental sales settle as asset sales. The buyer takes goodwill plus specific assets; the seller's company is left behind. Share sales transfer the company as-is, including any hidden liabilities. We model both and tell you which the seller will accept.",
    },
    {
      title: "Should I incorporate before or after purchase?",
      body: "Depends on whether you are buying as an individual via asset sale (often yes, then incorporate later or simultaneously), via a newly-formed limited company (typical and straightforward), or by share sale (acquire the seller's existing company). We model each route.",
    },
  ],
  services: [
    {
      title: "Pre-offer financial due diligence",
      body: "We review the seller's last 3 years of accounts, latest management accounts, payroll, associate agreements and NHS contract documentation. We produce a normalised EBITDA and a recommended offer range with reasoning.",
    },
    {
      title: "NHS contract risk review",
      body: "We read the GDS/PDS/ODS contract, the most recent UDA reconciliation, and any variation letters. If the contract is moving in a way that changes value (reform proposals, commissioner reorganisation, performance band review), we flag it.",
    },
    {
      title: "Tax structure for the purchase",
      body: "Buying personally vs via a new Ltd vs via a partnership / LLP, asset sale vs share sale, SDLT planning on the premises if freehold, VAT recovery on capital expenditure. We model the tax cost of each route alongside the financial DD.",
    },
    {
      title: "Cash flow modelling against financing",
      body: "Projected P&L for the first three years under your ownership, loan repayment schedule, working capital requirement, downside scenarios (NHS contract reform, associate departure). Built so the lender's offer and your personal expectations both stand up.",
    },
    {
      title: "Post-completion accounts setup",
      body: "After completion we set up the bookkeeping system, payroll scheme, NHS Pension arrangements, and capital allowance claims including the Section 198 fixtures election. We then run management accounts monthly so you see how the practice is actually performing vs the projection.",
    },
  ],
  faqs: [
    {
      q: "How much should I budget for financial due diligence?",
      a: "Our fixed fee for buy-side financial DD on a typical single-practice acquisition starts at around £2,500-£4,000 depending on practice size, accounts quality, and NHS contract complexity. Multi-site acquisitions are scoped individually. The fee is fixed before we start; it does not run on hourly billing. Compared with the typical £400k-£1.5m+ deal value, that DD spend protects significantly more than it costs.",
    },
    {
      q: "What's a fair EBITDA multiple to pay in 2025/26?",
      a: "Range, not a single number. An NHS-heavy single-handed practice with strong staff and a stable contract in a normal-demand region might trade at 0.7-0.9x normalised EBITDA. A private-focused two-surgery practice in a high-demand region might trade at 1.1-1.4x. Corporate buyers paying for fit and consolidation can stretch above 1.4x. The right multiple depends on the practice characteristics, not a benchmark number; we calibrate per practice.",
    },
    {
      q: "How does the SDLT on the premises work?",
      a: "If you are buying the freehold of the practice premises alongside the practice, SDLT applies on the commercial-rate band: 0% up to £150,000, 2% on the £150,000-£250,000 slice, 5% above £250,000. If the practice is leasehold and you take an assignment, SDLT may apply on the lease premium. If you are buying the seller's existing Ltd company by share sale, only 0.5% stamp duty on shares applies, not SDLT, but the Ltd then continues to own the premises so you inherit the existing SDLT base cost.",
    },
    {
      q: "What happens to the seller's associates when I take over?",
      a: "Self-employed associates: their agreements transfer or get renegotiated; you can choose to keep them, vary their fee split, or notice them out (subject to their notice periods). Employed associates and other employees: TUPE transfer of undertaking applies if you are acquiring the business as a going concern, which protects their employment terms; you cannot reduce their terms or notice them without proper process for a defined period after completion.",
    },
    {
      q: "Do I need a separate solicitor as well as you?",
      a: "Yes. We handle the financial diligence and tax structure. A specialist dental solicitor handles the contract, legal due diligence, Companies House filings if you are buying a Ltd company, premises lease or freehold transfer, and the completion mechanics. We work alongside two or three solicitors regularly and can recommend introductions.",
    },
  ],
  ctaTitle: "Buy with proper due diligence, not just legal review",
  ctaBody:
    "30-minute scoping call about the practice you are looking at. We will tell you what we would dig into in DD and whether the asking price looks defensible.",
  relatedGuides: [
    {
      href: "/dental-guides/practice-purchase-financial-due-diligence",
      title: "Practice Purchase Financial Due Diligence",
      body: "Three-year accounts review, EBITDA normalisation, associate agreement risk, NHS contract review.",
    },
    {
      href: "/dental-guides/goodwill-valuation-and-sale-playbook",
      title: "Goodwill Valuation Playbook",
      body: "Methodology, regional multiples, BADR + Section 162 implications.",
    },
    {
      href: "/services/practice-valuation",
      title: "Practice Valuation Service",
      body: "Buy-side and sell-side valuation work, ongoing through-deal support.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-practice-buyers`,
    languages: {
      "en-GB": `${siteConfig.url}/for-practice-buyers`,
      "x-default": `${siteConfig.url}/for-practice-buyers`,
    },
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${siteConfig.url}/for-practice-buyers`,
    type: "website",
  },
};

export default function ForPracticeBuyersPage() {
  return <AudienceStageLayout data={data} />;
}
