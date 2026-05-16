import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ComparisonLayout, type Comparison } from "@/components/comparison/ComparisonLayout";

export const metadata: Metadata = {
  title: "Crunch Alternative for Agencies | Specialist Comparison",
  description:
    "Looking for a Crunch alternative for your UK agency? Honest comparison of online accounting platforms vs a specialist agency accountant. When each makes sense.",
  alternates: { canonical: `${siteConfig.url}/crunch-alternative` },
};

const data: Comparison = {
  slug: "crunch-alternative",
  competitorName: "Crunch",
  pageTitle: "Crunch alternative for UK agencies",
  intro: "If your agency has outgrown Crunch's online platform model, this is the honest comparison of what a specialist agency accountant offers instead. Both have their place; the right answer depends on the complexity of your agency.",
  honestyParagraph: "Crunch is a popular online accounting platform serving freelancers, contractors, and small limited companies. They've built a strong product and serve a real need at lower price points. We are a specialist firm working only with agency founders, focused on the strategic and tax decisions that come up as agencies scale. We're not Crunch's direct competitor at the entry level — we're where some Crunch customers go when they've outgrown the platform model.",
  comparisonTable: [
    { feature: "Pricing model", competitor: "From ~£44/mo fixed", us: "Fixed fee £1,200-£8,000/year by complexity" },
    { feature: "Online accounting software included", competitor: true, us: "We work with your existing Xero/QB/FreeAgent" },
    { feature: "Annual accounts + CT600", competitor: true, us: true },
    { feature: "Self-assessment", competitor: true, us: true },
    { feature: "VAT returns", competitor: true, us: true },
    { feature: "Payroll", competitor: "Add-on", us: "Add-on" },
    { feature: "Specialist agency focus", competitor: false, us: true },
    { feature: "Monthly management accounts (by client, project)", competitor: false, us: true },
    { feature: "R&D tax credit claim preparation", competitor: false, us: true },
    { feature: "IR35 advisory + SDS preparation", competitor: "Generic", us: "Agency-specific" },
    { feature: "Exit planning (BADR, MBO, earn-out)", competitor: false, us: true },
    { feature: "Multi-shareholder salary/dividend modelling", competitor: "Basic", us: "Annual, per-shareholder" },
    { feature: "Direct named accountant", competitor: "Shared team", us: "Same ICAEW accountant" },
    { feature: "Response time", competitor: "Standard SLA", us: "24 hours, usually same day" },
  ],
  whoIsRightFor: {
    competitor: {
      audience: "Solo founders and small limited companies prioritising platform convenience.",
      whenToChoose: [
        "Sole director with simple structure",
        "Revenue under £150k, low complexity",
        "You want everything in one online platform",
        "You don't need strategic advice or specialist tax work",
        "You're comfortable doing your own bookkeeping with their tools",
      ],
    },
    us: {
      audience: "Agency founders who need specialist advice that genuinely pays back the fee.",
      whenToChoose: [
        "Revenue £150k+ and growing",
        "Multiple shareholders, freelancers, or employees",
        "Custom tech / development work (R&D credit eligible)",
        "Planning exit, MBO, or significant equity event",
        "International element (UAE, US clients, cross-border)",
        "You want strategic advice, not just compliance",
      ],
    },
  },
  faqs: [
    {
      q: "Can I keep using Crunch's software with you as my accountant?",
      a: "Crunch's platform is bundled with their service — moving to us typically means switching to Xero, QuickBooks, or FreeAgent. We handle the migration. Most agencies find Xero a better long-term fit for management accounts and growth.",
    },
    {
      q: "What's the typical cost difference?",
      a: "Crunch's headline price is £44/mo plus add-ons (~£600-£1,000/year). Our fees start at £1,200/year for simple structures and rise to £8,000+ for complex multi-entity setups with R&D and exit planning. The right comparison isn't price — it's value per pound. If we save you £15k in tax through R&D credits alone, the £3k fee is paid back 5×.",
    },
    {
      q: "How easy is it to switch from Crunch?",
      a: "Straightforward. We handle the professional clearance, the authorisation codes (64-8 form), and the data export from Crunch's platform into Xero or your chosen software. Typical transition takes 2-3 weeks. We've moved many agency founders off Crunch as they've scaled.",
    },
    {
      q: "When does it make sense to switch?",
      a: "Three signals: (1) you're regularly hitting limits of what Crunch's platform handles (e.g. multi-shareholder extraction modelling, R&D claims, group structures), (2) you're spending more time managing your accounts than running your agency, or (3) you have a significant decision coming up (incorporation of a holding co, planning a sale, large hiring round) that needs specialist advice.",
    },
  ],
};

export default function CrunchAlternativePage() {
  return <ComparisonLayout data={data} />;
}
