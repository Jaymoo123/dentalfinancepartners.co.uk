import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-partners",
  title: "Accountants for UK Solicitor Partners and LLP Members",
  metaTitle: "Accountants for UK Solicitor Partners | LLP + Partnership Tax",
  metaDescription:
    "Specialist accountants for UK solicitor partners. LLP profit allocation, FA 2014 Salaried Member audit, partner self-assessment, BADR pre-sale planning.",
  eyebrow: "For partners and LLP members",
  badge: "Equity partners · Fixed-share · Salaried · Senior associates approaching equity",
  heroHeading: "Tax and structural work for solicitor partners",
  intro:
    "Equity partners. Fixed-share members. Salaried partners on the FA 2014 border. The work splits between annual SA filing, quarterly drawings reconciliation, and the structural decisions that recur once or twice a partnership lifetime. We do all three.",
  stats: [
    { value: "FA 2014", label: "Salaried Member audit" },
    { value: "5+ wk", label: "Reconciliation rhythm" },
    { value: "£1m", label: "BADR lifetime limit" },
    { value: "14%→18%", label: "BADR rate change Apr 2026" },
  ],
  concerns: [
    {
      title: "Am I really a partner for tax, or a deemed employee?",
      body: "The FA 2014 Salaried Member Rules apply Conditions A (disguised salary ≥80% of reward), B (limited LLP influence), and C (capital contribution <25% of disguised salary). If all three are met, PAYE applies on your drawings. Most fixed-share partners pass; some don't. We audit quarterly so the position never drifts.",
    },
    {
      title: "How much should I contribute as partner capital?",
      body: "Driven by the LLP agreement, the bank funding, and the FA 2014 audit. Going under 25% of your disguised salary triggers Condition C; going over substantially ties up cash that may earn more elsewhere. We help calibrate to the FA 2014 line and the firm's working capital needs.",
    },
    {
      title: "I'm thinking about exit in 3-5 years. What now?",
      body: "BADR pre-sale planning starts 24 months out. The rate rises from 14% to 18% on 6 April 2026 — a £40,000 swing per £1m of qualifying gain. If your exit horizon spans that date, the timing decision matters. We model both sides.",
    },
    {
      title: "Can I take a personal pension contribution out of my profit share?",
      body: "Yes, and the relief comes at your marginal rate via self-assessment. Personal pension contributions for partners are not 'employer contributions' (the firm doesn't pay them — you do, personally). Annual allowance applies, tapered for high earners. We sequence contributions for the optimum claim.",
    },
    {
      title: "How does my share of profit interact with property income?",
      body: "Property income (Section 24 mortgage interest restriction etc.) reports separately on your self-assessment but the rates interact: a high partnership profit share pushes property income further into higher / additional rate. We handle both on one return with the interactions modelled.",
    },
    {
      title: "We're admitting a new equity partner. Tax position?",
      body: "Admitting a new equity partner triggers a capital allocation, a profit-share reallocation, and (for the new partner) a likely qualifying loan interest relief claim. The LLP agreement governs the mechanics; we handle the tax flow-through for all existing partners.",
    },
  ],
  services: [
    {
      title: "Partner self-assessment + quarterly drawings reconciliation",
      body: "Annual SA filing with your share of partnership profit, plus quarterly reconciliation of drawings against allocated profit so you see your tax-liability accrual as the year progresses. Tracks personal pension contributions, qualifying loan interest, charitable gift aid, and any other reliefs.",
    },
    {
      title: "FA 2014 Salaried Member quarterly audit",
      body: "Each salaried or fixed-share partner reviewed against Conditions A, B, and C. Output is a quarterly memo confirming partner-tax treatment continues, or flagging the trigger requiring PAYE switch. Catches drift early.",
    },
    {
      title: "Pre-sale planning + BADR timing",
      body: "18-24 month engagement for partners approaching exit. Confirms BADR eligibility, models the rate-change timing (14% in 2025/26 vs 18% from 6 April 2026), and co-ordinates with the firm's overall sale planning.",
    },
    {
      title: "Personal pension contribution timing",
      body: "Annual allowance modelling including the high-earner taper. Optimum contribution timing across the year. Carry-forward of unused allowance from the three prior years.",
    },
    {
      title: "Partner capital buy-in financing",
      body: "Qualifying loan interest relief documentation. Bank financing co-ordination for new partners buying in. Existing partners' capital account reconciliation when the partnership reorganises.",
    },
  ],
  faqs: [
    {
      q: "Do I need a separate accountant from the firm's accountant?",
      a: "Often yes. The firm's accountant prepares the LLP accounts and the SA800 partnership return. Your personal self-assessment, FA 2014 audit, pension contribution timing, and pre-sale planning are personal-to-you work that's best handled by an accountant on your engagement, not the firm's. Some firms' accountants handle both; many don't, or do it as an afterthought.",
    },
    {
      q: "What's the FA 2014 Salaried Member audit?",
      a: "The Finance Act 2014 introduced rules deeming a member of an LLP as an employee for tax purposes if all three conditions are met: Condition A — disguised salary is at least 80% of total reward; Condition B — limited rights to influence the LLP's affairs; Condition C — capital contribution less than 25% of disguised salary. If all three apply, PAYE runs on drawings. We audit quarterly because the position can drift as your role, bonuses, and capital evolve.",
    },
    {
      q: "How does BADR work for a partner share sale?",
      a: "Partners selling their interest in an unincorporated firm (partnership or LLP) qualify for Business Asset Disposal Relief if conditions are met: 2 years of qualifying interest, active engagement in the firm, and the gain falls within the £1m lifetime limit. BADR rate is 14% in 2025/26, rising to 18% from 6 April 2026. The 4 percentage point increase is £40,000 per £1m of gain.",
    },
    {
      q: "Can I take dividends from the LLP?",
      a: "No. LLPs distribute via partner drawings against allocated profit share, not dividends. Dividends exist only in companies (Ltd / Plc). If your firm is incorporated rather than an LLP, then yes, share dividends are an extraction route — but most law firms remain LLP or partnership structured.",
    },
    {
      q: "I've just been promoted to salaried partner. What changes?",
      a: "Tax treatment is the main change. If you pass the FA 2014 three-condition test as a partner, you become self-employed for tax — Class 4 NI on profit instead of Class 1 employee NI, no employer pension contributions (you make personal contributions instead), full self-assessment filing. If you fail any one condition, PAYE may still apply. The newly-appointed-partner audit is its own quick engagement.",
    },
  ],
  ctaTitle: "Get your partner-side tax onto specialist hands",
  ctaBody:
    "30-minute scoping call. We confirm scope (FA 2014 audit, SA filing, pre-sale planning) and quote a fixed annual fee.",
  relatedGuides: [
    {
      href: "/solicitor-guides/partnership-vs-llp-for-solicitors",
      title: "Partnership vs LLP for Solicitors",
      body: "Structural comparison, FA 2014 mechanics, conversion economics.",
    },
    {
      href: "/solicitor-guides/fee-share-vs-equity-partner",
      title: "Fee-share vs Equity Partner",
      body: "Pros, cons, and the tax position of each.",
    },
    {
      href: "/calculators/llp-profit-share-allocation",
      title: "LLP Profit Share Calculator",
      body: "Model partner allocation methodologies against your firm's profit.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-partners`,
    languages: { "en-GB": `${siteConfig.url}/for-partners`, "x-default": `${siteConfig.url}/for-partners` },
  },
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: `${siteConfig.url}/for-partners`, type: "website" },
};

export default function ForPartnersPage() {
  return <AudienceStageLayout data={data} />;
}
