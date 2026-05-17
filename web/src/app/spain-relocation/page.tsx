import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Spain? | Beckham Law Guide",
  description:
    "Specialist UK and Spain financial guidance for agency founders. Beckham Law (24% flat tax), Spanish entity setup, autonomos vs SL, UK Ltd from Spain. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/spain-relocation` },
};

const data: RelocationDestination = {
  slug: "spain-relocation",
  country: "Spain",
  shortName: "Spain",
  heroImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=2000&q=85",
  heroAlt: "Madrid skyline at dusk with Gran Via lights",
  intro: "Specialist UK and Spain financial guidance for agency founders. From the Beckham Law (24% flat rate for first-time relocators) to running a UK Ltd from Madrid or Barcelona. We model both Beckham and standard resident routes with real numbers.",
  badges: ["Beckham Law", "UK-Spain DTA", "EU resident"],
  stats: [
    { value: "24%", label: "Beckham Law flat tax (€600k cap)" },
    { value: "25%", label: "Spanish corporate tax" },
    { value: "6yr", label: "Beckham regime duration" },
    { value: "183", label: "SRT day-count threshold" },
  ],
  subcategories: [
    {
      icon: Plane,
      title: "UK tax on leaving",
      body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations after you leave.",
    },
    {
      icon: Building2,
      title: "Spanish residency & Beckham Law",
      body: "Régimen Especial para Trabajadores Desplazados eligibility (first-time relocators only), 6-year duration, €600k threshold for 24% rate.",
    },
    {
      icon: Receipt,
      title: "Spanish income & corporate tax",
      body: "Standard progressive personal tax 19-47% (varies by region), Beckham 24% flat to €600k then 47%, corporate tax 25%, wealth tax in some regions.",
    },
    {
      icon: Globe2,
      title: "Cross-border operations",
      body: "Autonomo (self-employed) vs SL (Spanish Ltd) decision, running UK Ltd from Spain, VAT on cross-border services, IR35 from abroad.",
    },
    {
      icon: PiggyBank,
      title: "Personal finance",
      body: "UK pension drawdown as Spanish resident, dividends from UK company while in Spain, UK property, ISA treatment, Spanish wealth tax exposure.",
    },
    {
      icon: Home,
      title: "Practical relocation",
      body: "NIE registration, residency permits, healthcare, schools, regional wealth tax considerations (Madrid vs Valencia vs Andalusia), banking.",
    },
  ],
  consultation: {
    title: "Book your Spain relocation consultation",
    instructionHint: "In the message field, mention your target move date, target region, whether you qualify for the Beckham Law (first-time Spanish relocation), and your current agency size.",
  },
  faqs: [
    {
      q: "What's the Beckham Law?",
      a: "The Beckham Law (officially Régimen Especial para Trabajadores Desplazados) lets new arrivals to Spain pay a flat 24% income tax on Spanish-source income up to €600,000 per year, instead of the progressive 19-47% rates that apply to standard residents. It runs for 6 tax years and is only available to people who haven't been Spanish tax resident in the previous 5 years. Income above €600k is taxed at 47%. For UK agency founders earning above £75k, this is usually a material saving versus the UK or versus the standard Spanish regime.",
    },
    {
      q: "Should I be autonomo or set up a Spanish SL?",
      a: "Depends on revenue level and client base. Autonomo (self-employed) is simpler with lower setup costs but higher personal tax exposure as income scales. An SL (Sociedad Limitada) introduces Spanish corporate tax (25%) but allows dividend extraction and is the cleaner structure for serious operations. For most agency founders earning above €50-80k, SL becomes more efficient. We model both with your specific numbers.",
    },
    {
      q: "Will Spanish wealth tax catch me?",
      a: "Spain has a wealth tax on worldwide assets above certain thresholds, which varies by autonomous region. Madrid has effectively abolished it (100% relief). Catalonia has full wealth tax. Andalusia recently abolished it. If you're relocating, the region you choose materially affects your wealth tax exposure. We flag this in initial planning. Note: the Beckham Law does NOT cover wealth tax, Beckham-regime taxpayers are still subject to Spanish wealth tax on Spanish assets only.",
    },
    {
      q: "Can I run my UK Ltd from Spain?",
      a: "Possible but complex. The UK Ltd remains UK-registered, but if you (as the controlling director) are tax resident in Spain, central management and control may shift to Spain, triggering Spanish corporate tax on UK Ltd profits. For most founders relocating long-term, the cleaner path is either: (a) appoint a UK-based director and step back from day-to-day, or (b) wind up the UK Ltd and set up a Spanish SL. We model both routes for clients.",
    },
    {
      q: "Can you advise on Spanish tax?",
      a: "We handle the UK side to ICAEW standards. For Spanish personal tax, Beckham Law application, wealth tax planning and local compliance we partner with Madrid- or Barcelona-based specialists. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function SpainRelocationPage() {
  return <RelocationLayout data={data} />;
}
