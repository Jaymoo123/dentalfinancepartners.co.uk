import type { Metadata } from "next";
import { PortfolioProfitabilityCalculator } from "@/components/calculators/PortfolioProfitabilityCalculator";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";

export const metadata: Metadata = {
  title: "Portfolio Profitability Calculator",
  description:
    "Free calculator: net profit and rental yield across every property in a UK landlord's portfolio.",
  // Embed surface — do not index (the canonical, indexable version lives at
  // /calculators/portfolio-profitability-calculator).
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.propertytaxpartners.co.uk/calculators/portfolio-profitability-calculator" },
};

export default function PortfolioProfitabilityEmbedPage() {
  return (
    <div className="bg-white p-3 sm:p-4">
      <PortfolioProfitabilityCalculator variant="embed" />
      <div className="mt-3 text-center">
        <a
          href="https://www.propertytaxpartners.co.uk/calculators/portfolio-profitability-calculator?utm_source=partner-embed&utm_medium=iframe&utm_campaign=portfolio-profitability-calculator"
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
