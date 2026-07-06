import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Cyprus? | Specialist Guidance",
  description:
    "Specialist UK and Cyprus financial guidance for agency founders. Non-dom status, 60-day rule, 12.5% corporate tax, IP box regime. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/cyprus-relocation` },
};

const data: RelocationDestination = {
  slug: "cyprus-relocation",
  country: "Cyprus",
  shortName: "Cyprus",
  heroImage: "https://images.unsplash.com/photo-1602800458591-eddda28a498b?w=2000&q=85",
  heroAlt: "Cyprus coastal town at golden hour",
  intro: "Specialist UK and Cyprus financial guidance for agency founders. From the 60-day residency rule to Cyprus IP box and non-dom status. We work with founders who want EU residence with one of the most favourable tax regimes in Europe.",
  badges: ["60-day rule", "Non-dom 17 years", "EU resident", "IP box"],
  stats: [
    { value: "12.5%", label: "Cyprus corporate tax" },
    { value: "0%", label: "Dividend tax for non-doms" },
    { value: "60", label: "Days to qualify for residency" },
    { value: "17yr", label: "Non-dom duration" },
  ],
  subcategories: [
    {
      icon: Plane,
      title: "UK tax on leaving",
      body: "Statutory residence test, split-year treatment, exit charges, what happens to your UK obligations after you leave.",
    },
    {
      icon: Building2,
      title: "Cyprus residency & non-dom",
      body: "60-day rule vs 183-day rule, non-dom status (17 years), property purchase requirement, employment requirement.",
    },
    {
      icon: Receipt,
      title: "Cyprus corporate & IP box",
      body: "12.5% corporate tax (one of EU's lowest), IP box 80% deduction (effective 2.5% rate on qualifying IP income), substance requirements.",
    },
    {
      icon: Globe2,
      title: "Cross-border operations",
      body: "Cyprus entity for UK client work, VAT on cross-border services, transfer pricing for any UK-Cyprus group structure.",
    },
    {
      icon: PiggyBank,
      title: "Personal finance",
      body: "UK pension drawdown as Cyprus resident, dividends from UK or Cyprus company, UK property as non-resident, ISA treatment.",
    },
    {
      icon: Home,
      title: "Practical relocation",
      body: "Permanent residency permits, Cyprus passport scheme rules (now ended), property requirements, banking, schools.",
    },
  ],
  consultation: {
    title: "Book your Cyprus relocation consultation",
    instructionHint: "In the message field, mention your target move date, whether you're using the 60-day or 183-day rule, and your current agency size.",
  },
  faqs: [
    {
      q: "What's the 60-day rule?",
      a: "Cyprus offers a fast-track tax residency route for individuals who spend at least 60 days per year in Cyprus, are not tax resident anywhere else, and meet ties tests (Cyprus business activity, accommodation maintained, etc.). This is much faster than the standard 183-day test most countries use. It's why Cyprus is attractive to mobile founders who don't want to be locked into one country for half the year.",
    },
    {
      q: "How does Cyprus non-dom status work?",
      a: "Cyprus non-dom status applies for the first 17 years of Cyprus tax residency to individuals who weren't Cyprus-domiciled. Non-doms pay 0% on dividends, interest, and rental income (which would otherwise be taxed). Combined with the 60-day rule, this makes Cyprus one of the most tax-efficient EU jurisdictions for entrepreneurs who can structure income through dividends.",
    },
    {
      q: "What's the IP box regime?",
      a: "Cyprus IP box allows 80% deduction on qualifying IP income (software, patents, copyright protected software). Effective tax rate on qualifying IP income is 2.5%. There are substance requirements (development must happen in Cyprus or via outsourced developers under your direction). For tech-led agencies and SaaS founders, this can be transformative. We assess eligibility per client.",
    },
    {
      q: "Can I run a UK agency from Cyprus?",
      a: "Yes, but the structure matters. Running a UK Ltd from Cyprus may shift central management and control to Cyprus, triggering Cyprus corporate tax. The cleaner path is usually setting up a Cyprus entity for the post-relocation work while either keeping or winding up the UK Ltd. We model both with real numbers.",
    },
    {
      q: "Can you advise on Cyprus tax?",
      a: "We handle the UK side, applying UK tax law and current HMRC guidance. For Cyprus personal tax, non-dom registration, IP box and local compliance we partner with Limassol or Nicosia based specialists. You get one coordinated plan with us as primary contact and Cyprus specialists for local matters.",
    },
  ],
};

export default function CyprusRelocationPage() {
  return <RelocationLayout data={data} />;
}
