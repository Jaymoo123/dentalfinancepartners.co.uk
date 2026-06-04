import type { Metadata } from "next";
import { MTDCheckerCalculator } from "@/components/calculators/MTDCheckerCalculator";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";

export const metadata: Metadata = {
  title: "Making Tax Digital (MTD) Checker",
  description:
    "Free checker: whether a UK landlord must comply with Making Tax Digital for Income Tax, and from when.",
  // Embed surface — do not index (the canonical, indexable version lives at
  // /calculators/mtd-checker).
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.propertytaxpartners.co.uk/calculators/mtd-checker" },
};

export default function MTDCheckerEmbedPage() {
  return (
    <div className="bg-white p-3 sm:p-4">
      <MTDCheckerCalculator variant="embed" />
      <div className="mt-3 text-center">
        <a
          href="https://www.propertytaxpartners.co.uk/calculators/mtd-checker?utm_source=partner-embed&utm_medium=iframe&utm_campaign=mtd-checker"
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
