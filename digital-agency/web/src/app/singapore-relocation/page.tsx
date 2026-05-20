import type { Metadata } from "next";
import { Building2, Globe2, Home, PiggyBank, Plane, Receipt } from "lucide-react";
import { siteConfig } from "@/config/site";
import { RelocationLayout, type RelocationDestination } from "@/components/relocation/RelocationLayout";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Singapore? | Specialist Guidance",
  description:
    "Specialist UK and Singapore financial guidance for agency founders. Employment Pass, Tech.Pass, 17% corporate tax, no CGT, Singapore entity setup. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/singapore-relocation` },
};

const data: RelocationDestination = {
  slug: "singapore-relocation",
  country: "Singapore",
  shortName: "Singapore",
  heroImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=2000&q=85",
  heroAlt: "Singapore Marina Bay skyline at night",
  intro: "Specialist UK and Singapore financial guidance for agency founders. Asia's leading tech hub, with one of the world's most favourable corporate tax regimes and a deep talent pool for digital, AI, and SaaS agencies serving APAC.",
  badges: ["17% corp tax", "No CGT", "EP / Tech.Pass", "DTA with UK"],
  stats: [
    { value: "17%", label: "Singapore corporate tax" },
    { value: "0%", label: "Capital gains tax" },
    { value: "22%", label: "Top personal income tax" },
    { value: "183", label: "SRT day-count threshold" },
  ],
  subcategories: [
    {
      icon: Plane,
      title: "UK tax on leaving",
      body: "Statutory residence test, split-year treatment, exit charges, residual UK obligations and reporting after you leave.",
    },
    {
      icon: Building2,
      title: "Singapore residency & visas",
      body: "Employment Pass (EP), Tech.Pass for senior tech talent, Entrepreneur Pass (EntrePass) for founders, qualifying activity requirements.",
    },
    {
      icon: Receipt,
      title: "Singapore corporate & personal tax",
      body: "17% corporate tax (effective lower with reliefs for new companies), no CGT, progressive personal tax 0-22%, no inheritance tax.",
    },
    {
      icon: Globe2,
      title: "Cross-border operations",
      body: "Singapore Pte Ltd for APAC client work, running UK Ltd from Singapore, VAT/GST on cross-border services, IR35 from abroad.",
    },
    {
      icon: PiggyBank,
      title: "Personal finance",
      body: "UK pension drawdown as Singapore resident, dividends from UK or Singapore company, CPF (compulsory for residents), UK property as non-resident.",
    },
    {
      icon: Home,
      title: "Practical relocation",
      body: "Visa requirements, housing costs, schools (international vs local), healthcare insurance, banking, cost of living vs London.",
    },
  ],
  consultation: {
    title: "Book your Singapore relocation consultation",
    instructionHint: "In the message field, mention your target move date, visa route (EP, Tech.Pass, EntrePass), and your current agency size.",
  },
  faqs: [
    {
      q: "What visa do I need to relocate to Singapore?",
      a: "Three main routes for UK agency founders. Employment Pass (EP) requires a minimum monthly salary of S$5,500+ and is the most common route. Tech.Pass is for senior tech professionals, requiring evidence of significant track record. EntrePass is specifically for founders setting up new Singapore businesses and is the most demanding to qualify for. We can advise on the financial structuring side; visa applications are typically handled by immigration specialists.",
    },
    {
      q: "What's the effective Singapore corporate tax rate?",
      a: "Headline rate is 17%, but Singapore offers significant reliefs that reduce the effective rate for smaller companies. The Start-Up Tax Exemption (SUTE) provides full exemption on the first S$100,000 of chargeable income for the first 3 years for qualifying new companies. The Partial Tax Exemption (PTE) gives 75% exemption on the first S$10,000 and 50% on the next S$190,000. For a new Singapore agency in years 1-3, effective tax rates can be in single digits.",
    },
    {
      q: "Will I be double-taxed between UK and Singapore?",
      a: "The UK-Singapore double tax treaty prevents the same income being taxed twice. The treaty allocates taxing rights and provides for credit relief where both countries tax the same income. For UK pension income, the treaty grants taxing rights to the country of residence (Singapore for relocators). For UK dividends from a UK Ltd, there's withholding-tax-free treatment under the treaty with proper documentation. We coordinate cross-border tax positions for clients.",
    },
    {
      q: "Can I run my UK Ltd from Singapore?",
      a: "Possible but complex. The UK Ltd remains UK-registered, but if you (as controlling director) are tax resident in Singapore, central management and control may shift to Singapore, potentially triggering Singapore corporate tax. For most agency founders relocating long-term, the cleaner path is setting up a Singapore Pte Ltd for the post-relocation business while either keeping a UK Ltd with separate UK management or winding it up. We model both routes.",
    },
    {
      q: "Can you advise on Singapore tax?",
      a: "We handle the UK side to ICAEW standards. For Singapore corporate tax, GST registration, EP/Tech.Pass applications and local compliance we partner with Singapore-based specialists. You get one coordinated plan with us as primary contact.",
    },
  ],
};

export default function SingaporeRelocationPage() {
  return <RelocationLayout data={data} />;
}
