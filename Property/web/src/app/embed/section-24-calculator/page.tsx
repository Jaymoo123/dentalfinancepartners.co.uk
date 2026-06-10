import type { Metadata } from "next";
import { Section24Calculator } from "@/components/calculators/Section24Calculator";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";

export const metadata: Metadata = {
  title: "Section 24 Tax Calculator",
  description:
    "Free Section 24 calculator: how much extra income tax the mortgage-interest restriction costs UK landlords.",
  // Embed surface — do not index (the canonical, indexable version lives at
  // /calculators/section-24-calculator).
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.propertytaxpartners.co.uk/calculators/section-24-calculator" },
};

export default function Section24EmbedPage() {
  return (
    <div className="bg-white p-3 sm:p-4">
      <Section24Calculator variant="embed" />
      <div className="mt-3 text-center">
        <a
          href="https://www.propertytaxpartners.co.uk/calculators/section-24-calculator?utm_source=partner-embed&utm_medium=iframe&utm_campaign=section-24-calculator"
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
