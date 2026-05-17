import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Italy? | Impatriati Regime Guide",
  description:
    "Specialist UK and Italy financial guidance for agency founders. Impatriati regime (50-70% income exemption), €200k flat-tax option, Italian entity setup. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/italy-relocation` },
};

const data: RelocationDestination = {
  slug: "italy-relocation",
  country: "Italy",
  shortName: "Italy",
  heroImage: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=2000&q=85",
  heroAlt: "Florence skyline with Duomo at golden hour",
  intro: "Specialist UK and Italy financial guidance for agency founders. From the impatriati regime (50% income exemption for relocators) to the €200k non-dom flat-tax option. We work with founders moving to Milan, Rome, Florence and beyond.",
  badges: ["Impatriati 50%", "€200k flat-tax option", "UK-Italy DTA", "EU resident"],
  stats: [
    { value: "50%", label: "Impatriati income exemption" },
    { value: "€200k", label: "Non-dom flat-tax option" },
    { value: "24%", label: "Italian corporate tax (IRES)" },
    { value: "5+5yr", label: "Impatriati duration (extendable)" },
  ],
  subcategories: [
    { icon: Plane, title: "UK tax on leaving", body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations." },
    { icon: Building2, title: "Italian residency routes", body: "Standard residency, Investor Visa, Self-Employment Visa, Digital Nomad Visa, EU Blue Card." },
    { icon: Receipt, title: "Italian tax regimes", body: "Standard progressive 23-43% + regional surcharge, impatriati 50% exemption (70% in southern regions), non-dom €200k flat-tax." },
    { icon: Globe2, title: "Cross-border operations", body: "Italian SRL setup, running UK Ltd from Italy, IVA (VAT), cross-border invoicing." },
    { icon: PiggyBank, title: "Personal finance", body: "UK pension drawdown as Italian resident, dividends from UK or Italian company, IMU property tax, IVAFE on foreign assets." },
    { icon: Home, title: "Practical relocation", body: "Codice Fiscale, AIRE registration (UK side), permesso di soggiorno, banking, healthcare (SSN), schools." },
  ],
  consultation: {
    title: "Book your Italy relocation consultation",
    instructionHint: "In the message field, mention your target Italian region (north vs south affects impatriati rate), target move date, and your current agency size.",
  },
  faqs: [
    {
      q: "How does the impatriati regime work?",
      a: "Italy's impatriati regime gives a 50% income tax exemption to people who relocate to Italy and become tax resident for at least 4 years. The exemption rises to 70% if you move to a southern region (Abruzzo, Molise, Campania, Apulia, Basilicata, Calabria, Sardinia, Sicily). The regime runs for 5 years, extendable to 10 under certain conditions (e.g. children, property purchase). For a UK founder earning £150k, the impatriati 50% exemption can mean an effective tax rate around 15-20%.",
    },
    {
      q: "What's the €200k flat-tax non-dom regime?",
      a: "Italy offers a non-dom flat-tax regime where high-net-worth individuals can pay a flat €200,000 per year on foreign-source income, regardless of amount. It runs for 15 years and is available to people who haven't been Italian tax resident for 9 of the last 10 years. Family members can be included for an additional €25,000 each per year. For founders with substantial foreign income, this caps Italian tax exposure significantly.",
    },
    {
      q: "Can I keep my UK Ltd while living in Italy?",
      a: "Possible but the management-and-control question matters. If you're tax resident in Italy as the controlling director, the UK Ltd may shift to Italian tax residency, triggering Italian corporate tax (IRES 24%) on its profits. For most long-term Italian residents, the cleaner path is setting up an Italian SRL for new business while either keeping the UK Ltd with UK-based management or winding it up. We model both.",
    },
    {
      q: "What about IVAFE on UK assets I keep?",
      a: "IVAFE is Italy's wealth tax on foreign financial assets, 0.2% per year on the value of foreign bank accounts, investments, and pension funds held by Italian tax residents. If you keep significant UK ISAs, brokerage accounts or pension funds while becoming Italian resident, IVAFE adds an annual cost. Property held abroad has a separate IVIE wealth tax (0.76%). We model exposure to both for clients with cross-border asset bases.",
    },
    {
      q: "Can you advise on Italian tax?",
      a: "We handle the UK side to ICAEW standards. For Italian personal tax, impatriati eligibility, SRL setup and local compliance we partner with Milan- or Rome-based specialists. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function ItalyRelocationPage() {
  return <RelocationLayout data={data} />;
}
