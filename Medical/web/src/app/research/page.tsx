import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import snapshot from "@/data/nhs-aa-index.json";
import type { AaIndexSnapshot } from "@/lib/research/nhs-aa-index";

const data = snapshot as unknown as AaIndexSnapshot;

export const metadata: Metadata = {
  title: "Medical tax research and data | Medical Accountants UK",
  description:
    "Original, sourced data on NHS pensions, the annual allowance and doctors' tax, built from official open data. Free to read and cite with attribution.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/annual-allowance-pension-tax-index",
    title: "Annual Allowance Pension Tax Index",
    blurb:
      "How annual allowance pension tax has grown across UK registered pension schemes, with an NHS Pension Scheme lens on doctors, from HMRC and NHSBSA open data.",
    stat: "£350m",
    statLabel:
      "annual allowance charges settled via Scheme Pays in 2023/24 (all UK schemes, provisional)",
    updated: "Data to the 2023/24 tax year",
    highlights: [
      { value: "£350m", label: "Scheme Pays charges 2023/24 (all UK schemes, provisional)" },
      { value: "56,270", label: "SA peak individuals 2021/22 (all UK schemes)" },
      { value: "46,135", label: "NHS officer members over the allowance 2021/22 (England and Wales)" },
    ],
  },
];

// Suppress unused variable warning; headline is accessed via data.headline at runtime
void data.headline;

export default function ResearchIndexPage() {
  return (
    <>
      <section className="hero-brand py-12 sm:py-16">
        <div className="hero-inner">
          <div className={siteContainerLg}>
            <Breadcrumb
              variant="light"
              items={[{ label: "Home", href: "/" }, { label: "Research" }]}
            />
            <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Medical tax research and data
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/80">
              Original, sourced reads on NHS pensions, the annual allowance and doctors&rsquo; tax, built
              entirely from official open data. Free to read and cite with attribution.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--copper)] hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-[var(--copper)] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-[var(--navy)] group-hover:text-[var(--copper-strong)]">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{r.blurb}</p>

                {/* Small stat highlights row */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-4">
                  {r.highlights.map((h) => (
                    <div key={h.value} className="text-center">
                      <div className="text-sm font-bold text-[var(--copper)]">{h.value}</div>
                      <div className="mt-0.5 text-[10px] leading-tight text-[var(--muted)]">{h.label}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-[var(--muted)]">{r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
