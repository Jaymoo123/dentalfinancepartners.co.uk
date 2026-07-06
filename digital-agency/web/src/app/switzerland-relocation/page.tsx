import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Switzerland? | Cantonal Tax Guide",
  description:
    "Specialist UK and Switzerland financial guidance for agency founders. Lump-sum taxation, cantonal variation, GmbH/AG setup, B/C permits. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/switzerland-relocation` },
};

const data: RelocationDestination = {
  slug: "switzerland-relocation",
  country: "Switzerland",
  shortName: "Switzerland",
  heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=2000&q=85",
  heroAlt: "Zurich skyline with lake and mountains",
  intro: "Specialist UK and Switzerland financial guidance for agency founders. Switzerland's federal + cantonal + municipal tax system means rates vary significantly by canton. We help founders model the canton choice that fits their situation, plus navigate the work-permit process.",
  badges: ["Lump-sum taxation", "Cantonal variation", "GmbH/AG setup", "Non-EU but bilateral"],
  stats: [
    { value: "11.9%", label: "Lowest cantonal corp tax (Zug)" },
    { value: "21.0%", label: "Average effective corp tax" },
    { value: "0%", label: "CGT on private wealth (most cantons)" },
    { value: "Bilateral", label: "UK-Swiss agreements (post-Brexit)" },
  ],
  subcategories: [
    { icon: Plane, title: "UK tax on leaving", body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations." },
    { icon: Building2, title: "Swiss residency & permits", body: "B permit (5-year, employment-tied), C permit (after 10 years), Self-Employed permit, EU/EFTA bilateral routes." },
    { icon: Receipt, title: "Swiss tax structure", body: "Federal + cantonal + municipal. Zug, Zurich, Geneva all very different. Lump-sum taxation option for non-employed wealthy individuals." },
    { icon: Globe2, title: "Cross-border operations", body: "Swiss GmbH or AG setup, running UK Ltd from Switzerland, VAT (MwSt), social security coordination." },
    { icon: PiggyBank, title: "Personal finance", body: "UK pension treatment, 2nd/3rd pillar Swiss pensions, no CGT on private wealth (most cantons), wealth tax exposure." },
    { icon: Home, title: "Practical relocation", body: "Work permit requirements, lump-sum eligibility, cantonal choice, banking, schools (English-speaking options), healthcare (compulsory)." },
  ],
  consultation: {
    title: "Book your Switzerland relocation consultation",
    instructionHint: "In the message field, mention your target canton (or top 3), target move date, permit route (employment / self-employed / lump-sum), and your current agency size.",
  },
  faqs: [
    {
      q: "Which canton is best for a UK agency founder?",
      a: "Depends on your situation. Zug has the lowest corporate tax (11.9% effective) and is famous for crypto/tech founders. Zurich offers world-class infrastructure with moderate rates. Geneva is French-speaking and a financial hub but higher tax. Schwyz and Nidwalden offer low personal income tax. We model 2-3 canton options with your actual numbers before you choose where to register.",
    },
    {
      q: "What's lump-sum taxation?",
      a: "Switzerland offers a lump-sum (forfait) taxation regime where non-Swiss-resident wealthy individuals (and their families) can negotiate a fixed annual tax based on their living expenses, rather than declared income. Available in most cantons (not Zurich, Basel, Schaffhausen). Minimum thresholds vary, typically CHF 400,000+ annual lump-sum. Best for founders with substantial passive income they don't want to declare in detail. Not available for those who plan to work in Switzerland.",
    },
    {
      q: "Can I run my UK Ltd from Switzerland?",
      a: "Possible but complex. If you (as controlling director) are tax resident in Switzerland, the UK Ltd may shift to Swiss tax residency, triggering Swiss corporate tax on profits. Often the cleaner path is setting up a Swiss GmbH (limited liability) or AG (joint stock company) for new business. We model both routes. Note: Switzerland is outside the EU but has bilateral agreements with the UK covering social security and various tax matters.",
    },
    {
      q: "What about Swiss wealth tax?",
      a: "Cantonal wealth tax applies to net wealth above thresholds varying by canton. Rates typically 0.1-1.0% on worldwide assets for residents. Some cantons (e.g. Zug) have low rates; others (Geneva, Vaud) higher. For UK founders with significant assets, this needs modelling before choosing canton.",
    },
    {
      q: "Can you advise on Swiss tax?",
      a: "We handle the UK side, applying UK tax law and current HMRC guidance. For Swiss federal/cantonal tax, permit applications, lump-sum negotiations and local compliance we partner with Swiss specialists in the canton you choose. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function SwitzerlandRelocationPage() {
  return <RelocationLayout data={data} />;
}
