import type { Metadata } from "next";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator",
  description:
    "Free SDLT (stamp duty) calculator for England & Northern Ireland, including the 5% additional-dwelling surcharge.",
  // Embed surface — do not index (the canonical, indexable version lives at
  // /calculators/stamp-duty-calculator).
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.propertytaxpartners.co.uk/calculators/stamp-duty-calculator" },
};

export default function StampDutyEmbedPage() {
  return (
    <div className="bg-white p-3 sm:p-4">
      <StampDutyCalculator variant="embed" />
      <div className="mt-3 text-center">
        <a
          href="https://www.propertytaxpartners.co.uk/calculators/stamp-duty-calculator?utm_source=partner-embed&utm_medium=iframe&utm_campaign=sdlt-calculator"
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
