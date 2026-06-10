import type { Metadata } from "next";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";

export const metadata: Metadata = {
  title: "Incorporation Cost Calculator",
  description:
    "Free calculator: the upfront CGT + SDLT cost of incorporating a rental property, and the break-even timeline.",
  // Embed surface — do not index (the canonical, indexable version lives at
  // /calculators/incorporation-cost-calculator).
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.propertytaxpartners.co.uk/calculators/incorporation-cost-calculator" },
};

export default function IncorporationCostEmbedPage() {
  return (
    <div className="bg-white p-3 sm:p-4">
      <IncorporationCostCalculator variant="embed" />
      <div className="mt-3 text-center">
        <a
          href="https://www.propertytaxpartners.co.uk/calculators/incorporation-cost-calculator?utm_source=partner-embed&utm_medium=iframe&utm_campaign=incorporation-cost-calculator"
          target="_blank"
          rel="noopener"
          className="text-xs text-slate-500 hover:text-emerald-700 transition-colors"
        >
          Powered by <span className="font-bold text-slate-700">Property Tax Partners</span> · specialist UK property accountants
        </a>
      </div>
      <EmbedAutoResize />
    </div>
  );
}
