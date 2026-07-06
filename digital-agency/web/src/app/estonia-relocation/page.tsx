import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Estonia? | e-Residency & Tax Guide",
  description:
    "Specialist UK and Estonia financial guidance for agency founders. e-Residency, 0% retained-profits tax, fully digital company setup, EU resident. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/estonia-relocation` },
};

const data: RelocationDestination = {
  slug: "estonia-relocation",
  country: "Estonia",
  shortName: "Estonia",
  heroImage: "https://images.unsplash.com/photo-1567363292502-37c1d77891fb?w=2000&q=85",
  heroAlt: "Tallinn old town with medieval walls at sunset",
  intro: "Specialist UK and Estonia financial guidance for agency founders. Estonia's e-Residency programme + 0% tax on retained profits make it uniquely attractive for digital agencies and tech-led founders wanting an EU base.",
  badges: ["e-Residency", "0% retained-profits CT", "Fully digital setup", "EU resident"],
  stats: [
    { value: "0%", label: "Tax on retained profits" },
    { value: "22%", label: "Tax on distributed dividends" },
    { value: "183", label: "Days for tax residency" },
    { value: "100%", label: "Online company management" },
  ],
  subcategories: [
    { icon: Plane, title: "UK tax on leaving", body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations." },
    { icon: Building2, title: "Estonian e-Residency & residency", body: "e-Residency for remote company management (no physical presence needed), Standard residency (183-day rule for tax residency), EU citizen rights." },
    { icon: Receipt, title: "Estonian tax structure", body: "0% corporate tax on retained earnings, 22% on distributed dividends, personal income tax 22% flat (with €7,848 tax-free allowance)." },
    { icon: Globe2, title: "Cross-border operations", body: "Estonian OÜ setup (digital, 1 day), running operations from anywhere, VAT registration, intra-EU trading." },
    { icon: PiggyBank, title: "Personal finance", body: "UK pension drawdown as Estonian resident, dividend distribution timing for tax optimisation, ISA treatment, Estonian II pillar pension." },
    { icon: Home, title: "Practical relocation", body: "e-Residency vs physical residency (different), residency permit if relocating, banking (Wise/Revolut + Estonian options), schools, healthcare." },
  ],
  consultation: {
    title: "Book your Estonia relocation consultation",
    instructionHint: "In the message field, clarify whether you're considering full physical relocation to Estonia OR remote management via e-Residency, your target date, and your current agency size.",
  },
  faqs: [
    {
      q: "What's the difference between e-Residency and tax residency?",
      a: "Crucial distinction. e-Residency is a digital identity that lets you remotely manage an Estonian company, it grants ZERO immigration rights, zero physical residency, zero tax residency. You're still tax resident wherever you physically live. Estonian tax residency requires physical presence in Estonia for 183+ days per year, plus other ties. Many UK founders use e-Residency to run an Estonian OÜ while living in the UK or elsewhere, which has tax implications HMRC will scrutinise. We help structure both routes properly.",
    },
    {
      q: "How does Estonia's 0% corporate tax really work?",
      a: "Estonia uniquely taxes corporate profits only when they're distributed as dividends, not when they're earned. Retain profits in the company and reinvest, no corporate tax. Distribute as dividends, 22% tax. For agency founders who want to build retained capital for acquisitions, R&D, or future expansion, this is materially better than the UK's 25% on profits regardless of distribution. The catch: when you do eventually take dividends, they're taxed at 22%.",
    },
    {
      q: "Can I run my UK clients through an Estonian OÜ while living in the UK?",
      a: "This is the classic e-Residency arbitrage attempt and it's risky. If you (as controlling director) are tax resident in the UK and the Estonian OÜ is managed from the UK, HMRC will argue the OÜ is UK-resident for corporation tax. You'd then pay UK corporation tax (25%) on the OÜ's profits, defeating the Estonian structure entirely. Some founders try anyway; HMRC has increasingly challenged this. We don't recommend it unless you have substance in Estonia (employees, office, real operations).",
    },
    {
      q: "What if I actually move to Estonia?",
      a: "Then the structure works as intended. You become Estonian tax resident (183+ days), your Estonian OÜ retains profits tax-free, you take dividends when needed (22% personal tax). Estonia has a treaty with the UK so double taxation is managed. The personal income tax is a flat 22% with a tax-free allowance, simpler than UK progressive bands. We model this for founders considering a genuine Estonia move.",
    },
    {
      q: "Can you advise on Estonian tax?",
      a: "We handle the UK side, applying UK tax law and current HMRC guidance. For Estonian e-Residency applications, OÜ setup, local compliance and Estonian tax filings we partner with Tallinn-based specialists. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function EstoniaRelocationPage() {
  return <RelocationLayout data={data} />;
}
