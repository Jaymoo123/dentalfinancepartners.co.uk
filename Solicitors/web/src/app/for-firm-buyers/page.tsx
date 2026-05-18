import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-firm-buyers",
  title: "Accountants for UK Law Firm Buyers and Acquirers",
  metaTitle: "Accountants for Law Firm Buyers UK | Due Diligence + Tax Structure",
  metaDescription:
    "Specialist accountants for UK law firm buyers. Financial due diligence, WIP valuation, SRA novation, goodwill structure, acquisition financing.",
  eyebrow: "For firm buyers + acquirers",
  badge: "First-time buyers · Multi-acquirer aggregators · Internal succession",
  heroHeading: "Acquisition support for buying a UK law firm",
  intro:
    "Buying a law firm is structurally different from buying most businesses. WIP is its own asset class. Client matters need novation with client consent. SRA notification and (in some cases) consent matter. PII continuity must hold. We've seen these come up wrong and we know what 'good' looks like.",
  stats: [
    { value: "WIP", label: "Treated as separate asset" },
    { value: "SRA", label: "Notification required" },
    { value: "PII", label: "Continuity critical" },
    { value: "6.5%", label: "Goodwill amortisation post-2019" },
  ],
  concerns: [
    {
      title: "What's a fair multiple for this firm?",
      body: "Highly dependent on practice area and region. High-street general practice in soft regional markets: 0.8-1.2x normalised profit. Mid-market LLP: 1.2-2x. Specialist firms (PI, niche commercial litigation, prestige private client): 2-3x+. Conveyancing-heavy firms have been depressed by post-2022 market conditions. We model against comparables.",
    },
    {
      title: "How do I value the WIP I'm buying?",
      body: "WIP is recognised on an earnings basis (FRS 102 / FRS 105) at the recoverable amount. Aged WIP (over 6 months) is typically written down or excluded from the deal. Litigation WIP is discounted more aggressively than conveyancing WIP because conversion is slower. We work the WIP schedule with the seller's accountant and the deal lawyer.",
    },
    {
      title: "What financial due diligence should I do?",
      body: "Three years of statutory accounts plus management accounts year-to-date. WIP schedule with aging analysis. Client matter ledger sample for high-value accounts. Office and client account reconciliation evidence (last 12 months). PII renewal documents and any claims history. Partner drawings vs allocated profit reconciliation. Property lease and any other commitments.",
    },
    {
      title: "Do I need SRA consent to buy a law firm?",
      body: "Notification is required for material changes in ownership / management; consent depends on whether the entity itself changes (ABS application) or just shareholders/members. Asset purchases of an LLP's trade typically require client matter consent and PII continuity rather than SRA consent. Share purchases of an incorporated firm may require an ABS licence application. We co-ordinate with the regulatory law firm on the transaction.",
    },
    {
      title: "How do I handle client matter novation?",
      body: "Each client matter needs client consent for transfer to the new firm. Bulk novation letters are typical for residential conveyancing and other high-volume practices; bespoke client communications for complex matters. The SRA Accounts Rules require client money for transferred matters to be held in the new firm's client account from completion. Practical execution takes 3-8 weeks post-completion.",
    },
    {
      title: "What does the goodwill amortisation save me in tax?",
      body: "For goodwill acquired post-1 April 2019, tax relief at 6.5% per year over a notional 15-year amortisation period. On £500k of goodwill that's £32,500/year of corporation tax-deductible amortisation. Pre-2019 acquisitions had different rules; goodwill bought 8 July 2015 to 31 March 2019 generally has no tax relief. We confirm the acquisition date carries through correctly.",
    },
  ],
  services: [
    {
      title: "Pre-offer financial due diligence",
      body: "3-year normalised profit and WIP analysis. Identifying add-backs (one-off costs, owner-manager salary normalisation, related-party transactions). Output is a recommended bid range and the key questions to put to the seller's accountant.",
    },
    {
      title: "Acquisition tax structure",
      body: "Asset purchase vs share purchase modelling. Goodwill amortisation timing. Section 162 incorporation if buying via a new vehicle. SDLT analysis on any property transfer. Deal-finance structuring.",
    },
    {
      title: "SRA notification + ABS application support",
      body: "Co-ordination with the regulatory solicitor on the SRA-side filings. ABS licence application if the deal structure requires it. New COFA / COLP appointments managed alongside the financial integration.",
    },
    {
      title: "Post-completion integration",
      body: "First 90 days: client matter migration, PII continuity confirmation, client account transition, payroll merger, accounting system consolidation. The list grows but the framework is the same — get the basics right and the rest follows.",
    },
    {
      title: "Acquisition financing co-ordination",
      body: "We work with the legal-sector lending team at most UK clearing banks. Vendor financing structures (deferred consideration, earn-outs) modelled and documented.",
    },
  ],
  faqs: [
    {
      q: "How long does a law firm acquisition typically take?",
      a: "Heads of terms to completion: 12-20 weeks for a clean deal. Add weeks for any complication: ABS application, contested WIP valuation, PII renewal mid-deal, SDLT on property, multi-partner sellers requiring individual sign-off. The accountancy work concentrates in the 6-week financial due diligence window and the post-completion integration first 90 days.",
    },
    {
      q: "Do I buy assets or shares?",
      a: "For LLPs and partnerships, it's typically an asset purchase (you buy the goodwill, WIP, equipment, and the client book transfers via novation). For incorporated firms (Ltd or PLC), share purchase is possible if you also acquire the SRA-regulated entity. Asset purchases give cleaner liability separation; share purchases give the seller a cleaner BADR position. We model both before recommending.",
    },
    {
      q: "What's the typical earn-out structure?",
      a: "Common structures: 50-70% cash at completion, 30-50% deferred over 2-3 years tied to revenue retention or partner stay. The deferred element accommodates the buyer's risk on whether the client base stays. Earn-outs are tax-efficient for the seller (capital treatment if structured correctly) and risk-mitigating for the buyer.",
    },
    {
      q: "How long should pre-acquisition due diligence take?",
      a: "Financial DD: 3-6 weeks once the data room is open. Legal DD runs in parallel. Regulatory DD (SRA history, PII claims, AML compliance) is critical for law firm acquisitions and adds another 1-2 weeks. We aim for a unified DD report within 6 weeks of data room access.",
    },
    {
      q: "What's the post-completion checklist?",
      a: "Inside 90 days: SRA notification filed, client matter novation completed, PII continuity confirmed for the acquired matters, client account transition with full reconciliation, payroll merger with HMRC notification, VAT registration consolidation if same entity, accounting system data migration. We project-manage the financial side; the regulatory solicitor handles the SRA side.",
    },
  ],
  ctaTitle: "Get your acquisition onto specialist hands",
  ctaBody:
    "30-minute scoping call. We confirm scope (DD, structuring, integration) and quote a fixed engagement fee.",
  relatedGuides: [
    {
      href: "/services/practice-valuation",
      title: "Practice valuation service",
      body: "Pre-acquisition valuation modelling and post-acquisition tax planning.",
    },
    {
      href: "/solicitor-guides/post-merger-integration",
      title: "Post-merger integration pillar guide",
      body: "Full playbook for the first 90 days after completion.",
    },
    {
      href: "/calculators/law-firm-valuation",
      title: "Law firm valuation calculator",
      body: "Indicative valuation on the firm you're considering buying.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-firm-buyers`,
    languages: { "en-GB": `${siteConfig.url}/for-firm-buyers`, "x-default": `${siteConfig.url}/for-firm-buyers` },
  },
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: `${siteConfig.url}/for-firm-buyers`, type: "website" },
};

export default function ForFirmBuyersPage() {
  return <AudienceStageLayout data={data} />;
}
