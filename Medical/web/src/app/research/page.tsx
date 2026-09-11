import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { siteConfig } from "@/config/site";

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

export default function ResearchIndexPage() {
  return (
    <>
      {/* `relative overflow-hidden` on the section and `relative z-10` on the
          content are the MedicalBackdrop host contract. */}
      <section className="relative overflow-hidden bg-slate-900 py-10 sm:py-12 lg:py-14">
        <MedicalBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              variant="light"
              items={[{ label: "Home", href: "/" }, { label: "Research" }]}
            />
            <Eyebrow onDark>Open data</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              Medical tax research and data
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg">
              Original, sourced reads on NHS pensions, the annual allowance and doctors&rsquo; tax,
              built entirely from official open data. Free to read and cite with attribution.
            </p>
          </div>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition hover:ring-[var(--brand-primary)] sm:p-8"
              >
                {/* 3xl/4xl, so the 3:1 large-text floor applies; --copper-strong
                    measures 4.91 on white and clears the 4.5 floor regardless. */}
                <div className="text-3xl font-bold text-[var(--copper-strong)] sm:text-4xl">
                  {r.stat}
                </div>
                <div className="mt-1 text-sm text-slate-600">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-[var(--copper-deep)]">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-700">{r.blurb}</p>

                {/* Highlight figures are text-sm font-bold, so the 4.5 floor
                    applies at small size: --copper-deep (7.32 on white), not
                    --copper (3.79) and not --copper-strong (4.91, no headroom). */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 pt-4">
                  {r.highlights.map((h) => (
                    <div key={h.value} className="text-center">
                      <div className="text-sm font-bold text-[var(--copper-deep)]">{h.value}</div>
                      <div className="mt-0.5 text-[10px] leading-tight text-slate-600">
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-slate-600">{r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
