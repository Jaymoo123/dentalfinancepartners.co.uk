import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Greece? | Golden Visa & Tax",
  description:
    "Specialist UK and Greece financial guidance for agency founders. Greek Golden Visa, non-dom tax regime (€100k flat), corporate tax, UK Ltd from Athens. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/greece-relocation` },
};

const data: RelocationDestination = {
  slug: "greece-relocation",
  country: "Greece",
  shortName: "Greece",
  heroImage: "https://images.unsplash.com/photo-1503152394-c571994fd383?w=2000&q=85",
  heroAlt: "Athens cityscape with Acropolis at sunset",
  intro: "Specialist UK and Greece financial guidance for agency founders. From the Golden Visa investment route to the €100k flat-tax non-dom regime. We work with founders considering Athens, Thessaloniki or the islands.",
  badges: ["Golden Visa", "€100k flat-tax non-dom", "UK-Greece DTA", "EU resident"],
  stats: [
    { value: "€100k", label: "Annual non-dom flat tax" },
    { value: "22%", label: "Greek corporate tax" },
    { value: "15yr", label: "Non-dom regime duration" },
    { value: "€250k", label: "Golden Visa property threshold" },
  ],
  subcategories: [
    { icon: Plane, title: "UK tax on leaving", body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations." },
    { icon: Building2, title: "Greek residency routes", body: "Golden Visa property investment (€250k-€800k by area), Financially Independent Person visa, Digital Nomad visa." },
    { icon: Receipt, title: "Greek tax regimes", body: "Standard progressive 9-44%, non-dom €100k flat-tax option (15 years), corporate tax 22%, IP box for tech." },
    { icon: Globe2, title: "Cross-border operations", body: "Running UK Ltd from Greece, invoicing UK clients from Greek entity, VAT on cross-border services." },
    { icon: PiggyBank, title: "Personal finance", body: "UK pension drawdown as Greek resident, dividends from UK or Greek company, ISA treatment, Greek property tax." },
    { icon: Home, title: "Practical relocation", body: "AFM (tax number) registration, residency permits, banking, schools, cost of living vs UK." },
  ],
  consultation: {
    title: "Book your Greece relocation consultation",
    instructionHint: "In the message field, mention your target move date, whether you're considering the Golden Visa or non-dom flat-tax routes, and your current agency size.",
  },
  faqs: [
    {
      q: "How does the Greek €100k flat-tax regime work?",
      a: "Greece offers a non-dom regime where high-net-worth individuals can pay a flat €100,000 per year on foreign-source income, regardless of how much that foreign income is. It runs for 15 years and is available to people who haven't been Greek tax resident in 7 of the last 8 years. You also need to commit to investing €500,000 in Greece (property, business, or government bonds) within 3 years. For founders with significant foreign passive income, this caps your Greek tax exposure significantly.",
    },
    {
      q: "What's the Golden Visa about?",
      a: "Greece's Golden Visa grants residency in exchange for property investment. Thresholds depend on area: €800,000 in Athens centre, Thessaloniki, and high-demand islands; €400,000 in less dense areas; €250,000 in commercial property conversions. The visa is renewable, doesn't require physical presence, and after 7 years can lead to citizenship. For UK agency founders, it's a route to EU residency without committing to tax residency.",
    },
    {
      q: "Can I run my UK Ltd from Athens?",
      a: "Possible but the structure matters. If you (as controlling director) are physically in Greece and Greece becomes the centre of management and control, the UK Ltd may become Greek-tax-resident, triggering Greek corporate tax. For long-term Greek residence, the cleaner path is usually setting up a Greek entity (EE for partnerships, IKE for limited companies). We model both routes.",
    },
    {
      q: "What's the UK-Greece double tax treaty position?",
      a: "The UK-Greece DTA prevents the same income being taxed twice. Most income types have clear allocation rules: employment income is taxed where the work is performed; dividends and royalties have withholding rules with credit relief; pensions are taxed in country of residence. We coordinate cross-border tax positions for clients.",
    },
    {
      q: "Can you advise on Greek tax?",
      a: "We handle the UK side to ICAEW standards. For Greek tax, Golden Visa applications, non-dom regime registration and local compliance we partner with Athens-based specialists. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function GreeceRelocationPage() {
  return <RelocationLayout data={data} />;
}
