import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Portugal? | Specialist Guidance",
  description:
    "Specialist UK and Portugal financial guidance for agency founders. NHR 2.0 (IFICI), statutory residence test, Portuguese entity options, UK Ltd from Portugal. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/portugal-relocation` },
};

const data: RelocationDestination = {
  slug: "portugal-relocation",
  country: "Portugal",
  shortName: "Portugal",
  heroImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=2000&q=85",
  heroAlt: "Lisbon skyline with Tagus river at sunset",
  intro: "Specialist UK and Portugal financial guidance for agency founders. From statutory residence test to running a UK Ltd from Lisbon. We work with founders considering the IFICI scheme (the successor to NHR) and the standard Portuguese resident route.",
  badges: ["IFICI / NHR 2.0", "UK-Portugal DTA", "EU resident"],
  stats: [
    { value: "20%", label: "IFICI flat tax (qualifying)" },
    { value: "21%", label: "Portuguese corporate tax" },
    { value: "183", label: "SRT day-count threshold" },
    { value: "12-18mo", label: "Recommended planning lead time" },
  ],
  subcategories: [
    {
      icon: Plane,
      title: "UK tax on leaving",
      body: "Statutory residence test, split-year treatment, deemed domicile, exit charges. When does HMRC stop being interested in you?",
    },
    {
      icon: Building2,
      title: "Portuguese tax residency",
      body: "Becoming Portuguese tax resident, NIF registration, IFICI qualifying activity check, standard resident route, Portuguese tax filings.",
    },
    {
      icon: Receipt,
      title: "Portuguese income & corporate tax",
      body: "21% national corporate tax, regional reductions, progressive personal tax 14.5-48%, IFICI 20% flat rate for qualifying activity.",
    },
    {
      icon: Globe2,
      title: "Cross-border operations",
      body: "Running a UK agency from Portugal, invoicing UK clients from Portugal, VAT on cross-border services, IR35 from abroad.",
    },
    {
      icon: PiggyBank,
      title: "Personal finance",
      body: "UK pensions when non-resident, ISAs after leaving, selling UK property, dividends from a UK company while in Portugal.",
    },
    {
      icon: Home,
      title: "Practical relocation",
      body: "D7 visa or D8 digital nomad visa, healthcare, schools, banking, property purchase. The non-tax decisions that still affect your finances.",
    },
  ],
  consultation: {
    title: "Book your Portugal relocation consultation",
    instructionHint: "In the message field, mention your target move date, whether you're targeting IFICI eligibility, and your current agency size.",
  },
  faqs: [
    {
      q: "Is NHR still available?",
      a: "The original NHR regime closed to new applicants from 1 January 2024. It was replaced by the IFICI (Incentivised Tax Status for Scientific Research and Innovation) scheme, which is narrower in scope. IFICI gives a 20% flat tax on qualifying employment and self-employment income for 10 years, but the qualifying activity tests are stricter. For most UK agency founders, IFICI is achievable but requires planning. We model both IFICI and standard Portuguese resident routes for clients.",
    },
    {
      q: "Can I run a UK Ltd from Portugal?",
      a: "Yes, but there are practical implications. The UK Ltd remains UK tax resident if managed and controlled from the UK, but if you (as sole director) are physically in Portugal, central management and control may shift to Portugal, triggering Portuguese corporate tax. We work with founders to structure either: (a) keep the UK Ltd with a UK-based director, or (b) set up a Portuguese entity. The right answer depends on your client base and exit timeline.",
    },
    {
      q: "How does the UK-Portugal double tax treaty work?",
      a: "The UK-Portugal DTA prevents the same income being taxed twice. Most income types have clear allocation: employment income is taxed where the work is performed, dividends have withholding rules with credit relief, and pension income is taxed in the country of residence. We coordinate with Portuguese tax specialists to ensure clean treatment on both sides.",
    },
    {
      q: "Will I save tax overall?",
      a: "Usually yes if IFICI applies, modestly if not. IFICI's 20% flat rate beats UK higher rate (40%) for qualifying income, and Portugal has no UK-equivalent dividend tax for non-doms in many situations. But you need to factor in the cost of becoming UK non-resident properly, Portuguese setup costs, and any UK tax that may still apply to UK-source income. We model it in pounds for every client.",
    },
    {
      q: "Can you advise on Portuguese tax?",
      a: "Our advice covers the UK side: statutory residence, UK entity decisions and UK tax on non-resident income. For Portuguese personal tax, IFICI qualification and local compliance we partner with Lisbon-based specialists. You get a coordinated plan with one point of contact (us) and specialist Portuguese input where the rules require it.",
    },
  ],
};

export default function PortugalRelocationPage() {
  return <RelocationLayout data={data} />;
}
