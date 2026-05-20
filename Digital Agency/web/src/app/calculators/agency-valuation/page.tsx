import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Calculator } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { AgencyValuationCalculator } from "@/components/calculators/AgencyValuationCalculator";
import {
  calculate,
  formatGbpCompact,
  fromSearchParams,
  toSearchParams,
  typeLabel,
} from "@/lib/valuation";
import { JsonLd, buildWebApplication } from "@/lib/schema";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const inputs = fromSearchParams(sp);
  const r = calculate(inputs);
  const base = siteConfig.url.replace(/\/$/, "");
  const params = toSearchParams(inputs).toString();
  const pageUrl = `${base}/calculators/agency-valuation${params ? `?${params}` : ""}`;
  const ogUrl = `${base}/api/og/valuation?${params}`;

  const hasInputs = Object.keys(sp).length > 0;
  const title = hasInputs
    ? `${typeLabel(inputs.type)} valuation: ${formatGbpCompact(r.mid)} (${r.adjustedMultiple.toFixed(1)}× EBITDA)`
    : "Agency Valuation Calculator | What is My Agency Worth?";
  const description = hasInputs
    ? `Estimated valuation ${formatGbpCompact(r.low)}–${formatGbpCompact(r.high)} for a ${typeLabel(inputs.type).toLowerCase()} on ${formatGbpCompact(inputs.revenue)} revenue at ${inputs.ebitdaPct}% EBITDA. Built by Agency Founder Finance.`
    : "Free agency valuation calculator for UK founders. EBITDA × multiple model with retainer, concentration and key-person adjustments. Built by ICAEW accountants.";

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: "Agency valuation estimate" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default function AgencyValuationPage() {
  const webApp = buildWebApplication({
    name: "Agency Valuation Calculator",
    description:
      "Free UK agency valuation calculator. EBITDA × multiple model with adjustments for agency positioning, retainer revenue, client concentration and founder dependency. Inputs sync to the URL, shareable results render a branded valuation card on LinkedIn.",
    path: "/calculators/agency-valuation",
    applicationCategory: "FinanceApplication",
  });
  return (
    <>
      <JsonLd data={webApp} />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Agency Valuation" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Calculator className="h-3.5 w-3.5" />
              Free calculator · UK market multiples · Shareable result
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              What is your agency worth?
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              EBITDA × multiple model with adjustments for agency positioning, retainer revenue, client concentration and founder dependency. Your inputs sync to the URL, share the link and your exact run renders with a branded card.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<div className="h-96 animate-pulse rounded bg-slate-100" />}>
              <AgencyValuationCalculator />
            </Suspense>

            <div className="mt-12 bg-slate-900 p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Planning an actual exit?</h2>
              <p className="mt-3 text-base sm:text-lg text-slate-200">
                Sale-ready agencies are built years in advance. We help founders structure the business, model exit scenarios, and prepare for due diligence.
              </p>
              <Link href="/free-health-check" className="mt-6 inline-block bg-indigo-600 px-8 py-3 font-bold text-white border-b-4 border-indigo-800 hover:bg-indigo-700 transition-all">
                Run the health check
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
