import type { Metadata } from "next";
import { Compass, FileQuestion, Lightbulb, PoundSterling, Receipt, Wallet } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountant for New Agency Founders | First Year & Pre-Incorporation",
  description:
    "Specialist accountants for new UK agency founders. From sole trader vs Ltd to first VAT registration, first dividend, first hire. Agency-only focus, fixed fees.",
  alternates: { canonical: `${siteConfig.url}/for-new-founders` },
};

const data: AudienceStage = {
  slug: "for-new-founders",
  stage: "new-founders",
  displayStage: "New founders",
  badge: "Pre-incorporation to first year trading",
  heroImage: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=2000&q=85",
  heroAlt: "Agency founder reviewing setup checklist on laptop",
  intro: "You're in the first 12 months of your agency. The structure decisions you make now compound for years. We help new agency founders get the foundations right without overpaying for unnecessary complexity.",
  stats: [
    { value: "£12,570", label: "Optimal first-year salary" },
    { value: "£90k", label: "VAT registration threshold" },
    { value: "£1,200+", label: "Typical first-year accountant fee" },
    { value: "3 months", label: "HMRC corp tax registration window" },
  ],
  concerns: [
    {
      icon: Compass,
      title: "Sole trader or limited company?",
      body: "Most agency founders should be limited from day one if profits exceed £30-40k per year. But it's not a one-size-fits-all decision. We model both with your actual numbers.",
    },
    {
      icon: Wallet,
      title: "How do I pay myself?",
      body: "Salary up to £12,570 (NI primary threshold) plus dividends from post-tax profits is the standard structure. We set this up properly with board minutes and dividend vouchers.",
    },
    {
      icon: Receipt,
      title: "When do I register for VAT?",
      body: "Compulsory at £90k turnover (rolling 12 months). Voluntary registration below that has trade-offs. We help you decide based on your client mix.",
    },
    {
      icon: PoundSterling,
      title: "What's the right software setup?",
      body: "Xero or FreeAgent for most agencies. We set up your chart of accounts properly from day one, fixing it later is expensive.",
    },
    {
      icon: FileQuestion,
      title: "What HMRC forms do I need to file?",
      body: "Corporation tax registration (3 months), annual confirmation statement, CT600, P60s if hiring, VAT returns once registered. We handle these so you can focus on clients.",
    },
    {
      icon: Lightbulb,
      title: "Am I missing tax-saving opportunities?",
      body: "Probably. Most new founders miss R&D credits, AIA on kit purchases, employer pension contributions, and proper expense tracking. We catch these in year one.",
    },
  ],
  services: [
    { title: "Sole trader vs limited company modelling", body: "We model both structures with your actual revenue, costs, and personal tax position. You see the £ difference, not just principles." },
    { title: "Incorporation handled end-to-end", body: "Company formation, Companies House registration, HMRC corporation tax registration, bank account introduction, accounting software setup." },
    { title: "First dividend mechanics", body: "Board minutes template, dividend voucher, accounting treatment, personal tax implications. Done properly so HMRC can't challenge it later." },
    { title: "VAT registration & scheme selection", body: "Voluntary vs compulsory, flat rate vs standard, cash accounting. We pick the right scheme for your business model and revenue trajectory." },
    { title: "Year-one tax return + accounts", body: "Statutory accounts, CT600 corporation tax return, personal SA100. Filed accurately and on time by specialist agency accountants." },
  ],
  faqs: [
    {
      q: "Should I incorporate before earning revenue?",
      a: "Usually not. There's no commercial benefit to having a Ltd with zero income, and you pay annual filing fees + accountancy costs. Wait until you have consistent monthly revenue or before you take on a significant first contract that needs a Ltd contracting party.",
    },
    {
      q: "What's the cheapest accountant fee in year one?",
      a: "Around £1,200-£1,500 per year for a simple limited company with annual accounts, CT600, personal self-assessment, and a quarterly check-in call. Below that you're usually getting compliance-only with no advice. We charge fixed fees and tell you exactly what's included.",
    },
    {
      q: "Do I need to register for VAT immediately?",
      a: "Compulsory once your taxable turnover exceeds £90,000 in any rolling 12-month period (threshold from 1 April 2024). Voluntary registration below that has benefits if your clients are VAT-registered businesses (they reclaim it, so it costs them nothing) and you have meaningful input VAT to reclaim.",
    },
    {
      q: "Can I use my personal bank account for the business?",
      a: "Technically yes if you're a sole trader. Strongly not recommended even then. If you incorporate, the company MUST have its own bank account, mixing personal and business money creates director's loan account issues that trigger S455 tax (33.75% rate). Open a Mettle, Starling, or Tide account day one.",
    },
    {
      q: "What happens if I get this wrong?",
      a: "Most year-one mistakes are recoverable but expensive. Common ones: missed R&D credits (£10k-£40k left on the table), incorrect dividend declarations (HMRC reclassifies as salary, triggering NI), VAT scheme errors (overpaying tax), and director's loan overdrafts (S455 tax). We catch these in the free health check before they compound.",
    },
  ],
  ctaTitle: "Get your first-year setup right",
};

export default function ForNewFoundersPage() {
  return <AudienceStageLayout data={data} />;
}
