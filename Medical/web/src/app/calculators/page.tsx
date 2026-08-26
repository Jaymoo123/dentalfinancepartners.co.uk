import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { allTools } from "@/lib/tools/registry";

// Retitled 2026-08-26. Two problems with the old meta. First, the description
// said "3 free calculators" while the registry has shipped TEN since before
// this pull, so the page understated itself by seven and named none of the
// seven. Second, neither title nor H1 carried the phrases the tool demand is
// actually expressed in ("NHS pension annual allowance calculator", "locum tax
// calculator", "tapered annual allowance calculator"), which is why this page
// registered zero head-family impressions in 90 days.
export const metadata: Metadata = {
  title: "NHS Pension Annual Allowance Calculator & Doctor Tax Calculators",
  description:
    "Ten free calculators for UK doctors: NHS Pension annual allowance and tapered allowance, Scheme Pays, tiered superannuation contributions, locum tax, GP partner drawings, salaried GP versus partner, and incorporation. 2026/27 rates, no sign-up.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "NHS Pension Annual Allowance Calculator & Doctor Tax Calculators",
    description:
      "Ten free calculators for UK doctors: annual allowance and taper, Scheme Pays, tiered superannuation, locum tax, GP partner drawings and incorporation. 2026/27 rates.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Medical Tax Calculators for UK Doctors")}`, width: 1200, height: 630, alt: "Medical Tax Calculators for UK Doctors" }],
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
              NHS Pension annual allowance calculator and medical tax calculators
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Ten free calculators for UK doctors, all on 2026/27 rates. Work out your NHS Pension annual allowance and
              whether the taper applies, model a Scheme Pays election, check your tiered superannuation contribution,
              estimate locum tax, plan GP partner drawings, compare salaried GP against partner, and test whether
              incorporating private practice is worth the pension accrual it costs. No email gate and no sign-up: every
              calculator gives you the figure on the page.
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
