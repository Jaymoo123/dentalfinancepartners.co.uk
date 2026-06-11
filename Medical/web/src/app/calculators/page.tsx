import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { allTools } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Free Medical Tax Calculators | NHS Pension, Locum Tax & Incorporation",
  description:
    "3 free calculators for UK doctors: NHS pension annual allowance and tapered allowance, locum doctor tax calculator, private practice incorporation comparison. Current 2025/26 and 2026/27 tax rates. Instant results.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free Medical Tax Calculators for UK Doctors",
    description:
      "Calculate NHS pension allowance, locum tax, and incorporation savings. 2025/26 and 2026/27 rates.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
};

export default function CalculatorsIndexPage() {
  const calculators = allTools();

  return (
    <>
      <section className="bg-[var(--navy)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[var(--copper)] px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Calculator className="h-3.5 w-3.5" />
              Free tools
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Medical tax calculators for UK doctors
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Free calculators built by specialist medical accountants. Work out your NHS pension annual allowance,
              locum tax liability, and private practice incorporation savings. No email gate, no sign-up.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="group block bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 rounded-xl hover:bg-white hover:border-[var(--copper)] hover:shadow-md transition-all"
                data-cta={`calculator-gallery-${c.slug}`}
              >
                <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-[var(--copper)] to-[var(--navy)] rounded-lg shadow-sm">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-[var(--ink)] group-hover:text-[var(--copper)] transition-colors">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{c.oneLiner}</p>
                <div className="mt-5 flex items-center text-[var(--copper)] font-semibold text-sm">
                  Open calculator
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
