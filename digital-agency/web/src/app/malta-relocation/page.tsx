import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Malta? | Tax Structure Guide",
  description:
    "Specialist UK and Malta financial guidance for agency founders. Malta refund system (effective 5% corporate tax), residency programmes, English-speaking EU jurisdiction. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/malta-relocation` },
};

const data: RelocationDestination = {
  slug: "malta-relocation",
  country: "Malta",
  shortName: "Malta",
  heroImage: "https://images.unsplash.com/photo-1577345664253-6e6cef8b35b6?w=2000&q=85",
  heroAlt: "Valletta harbour and skyline at sunset",
  intro: "Specialist UK and Malta financial guidance for agency founders. Malta is one of the EU's most attractive corporate tax jurisdictions for UK founders, with an English-speaking environment, a sophisticated refund system, and multiple residency programmes.",
  badges: ["6/7 refund (effective 5% CT)", "Non-dom remittance basis", "English-speaking", "EU resident"],
  stats: [
    { value: "5%", label: "Effective corporate tax (post-refund)" },
    { value: "0%", label: "Tax on foreign income not remitted" },
    { value: "35%", label: "Headline corporate rate (before refund)" },
    { value: "183", label: "Days for tax residency" },
  ],
  subcategories: [
    { icon: Plane, title: "UK tax on leaving", body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations." },
    { icon: Building2, title: "Malta residency routes", body: "Global Residence Programme, Malta Permanent Residence, Highly Qualified Persons rules, Nomad Residence Permit." },
    { icon: Receipt, title: "Malta tax structure", body: "35% headline corporate tax but 6/7 refund system reduces effective rate to 5%. Non-dom remittance basis for personal tax." },
    { icon: Globe2, title: "Cross-border operations", body: "Maltese holding company structures, dual-company setups, VAT registration, English-language compliance." },
    { icon: PiggyBank, title: "Personal finance", body: "UK pension drawdown as Malta resident, dividends via refund system, foreign income remittance planning, capital gains." },
    { icon: Home, title: "Practical relocation", body: "Residency permit, property purchase requirements (varies by programme), healthcare, English-speaking schools, banking." },
  ],
  consultation: {
    title: "Book your Malta relocation consultation",
    instructionHint: "In the message field, mention your target move date, residency programme (GRP, MPRP, Nomad), and your current agency size.",
  },
  faqs: [
    {
      q: "How does the Malta 6/7 refund system work?",
      a: "Malta's headline corporate tax is 35%, but shareholders can claim a refund of 6/7 of the tax paid on most active trading income, bringing the effective rate to roughly 5%. The refund mechanism requires careful structuring (often a two-company setup: a trading company and a holding company that receives the refund). It's been EU-approved and stable for years. For UK agency founders moving substantial trading activity to Malta, this is materially more efficient than the UK 25% corporate rate.",
    },
    {
      q: "What's the non-dom remittance basis?",
      a: "Maltese tax residents who are non-domiciled are taxed only on Malta-source income and on foreign income remitted to Malta. Foreign capital gains are exempt regardless of remittance. There's a minimum annual tax of €5,000 if foreign income exceeds €35,000. For founders with substantial passive income held outside Malta, this is one of the more attractive non-dom regimes in the EU.",
    },
    {
      q: "Can I run my UK Ltd from Valletta?",
      a: "Possible but management and control matters. If you're Malta-resident as controlling director, the UK Ltd may shift to Malta tax residency, which actually benefits you (5% effective rate vs 25% in UK). However, HMRC will challenge the move-of-management if not properly structured. For long-term Malta-based founders, setting up a fresh Malta company is usually cleaner than migrating an existing UK Ltd. We model both with real numbers.",
    },
    {
      q: "Is Malta still on the EU grey list?",
      a: "Malta has had periods on EU and OECD watchlists but is currently in compliance with EU tax cooperation standards. The 6/7 refund system has been EU-approved and is not under active challenge. We monitor regulatory developments and flag any client structures that could be affected.",
    },
    {
      q: "Can you advise on Malta tax?",
      a: "We handle the UK side to ICAEW standards. For Malta personal tax, corporate refund applications, residency programme applications and local compliance we partner with Valletta-based specialists. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function MaltaRelocationPage() {
  return <RelocationLayout data={data} />;
}
