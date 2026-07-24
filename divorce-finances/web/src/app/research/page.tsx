import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import cmsSnapshot from "@/data/uk-child-maintenance-tracker.json";
import frSnapshot from "@/data/uk-divorce-financial-remedy-index.json";

const fmtNumber = (n: number) => n.toLocaleString("en-GB");

export const metadata: Metadata = {
  title: `Divorce and family finance research and data | ${siteConfig.name}`,
  description:
    "Original, sourced data on divorce and the money side of separation in the UK, built from official government statistics. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-divorce-financial-remedy-index",
    title: "UK Divorce and Financial Remedy Index",
    blurb: `Divorce volumes, court timings and financial remedy trends across England and Wales, compiled from Ministry of Justice Family Court Statistics Quarterly. Divorces reaching a final order in 2025 took a mean of ${Math.round(
      frSnapshot.headline.mean_weeks_to_final_order,
    )} weeks from application.`,
    stat: fmtNumber(frSnapshot.headline.divorce_applications),
    statLabel: "divorce applications in 2025",
    updated: frSnapshot.meta.edition,
  },
  {
    href: "/research/uk-child-maintenance-tracker",
    title: "UK Child Maintenance Tracker",
    blurb: `Child Maintenance Service caseloads, Direct Pay and Collect and Pay money flows, compliance and arrears, compiled from official DWP quarterly statistics. £${cmsSnapshot.headline.cumulative_arrears_since_2012_gbp_m.toFixed(
      1,
    )}m of child maintenance has gone unpaid since the CMS began in 2012.`,
    stat: `£${cmsSnapshot.headline.cumulative_arrears_since_2012_gbp_m.toFixed(1)}m`,
    statLabel: "child maintenance unpaid since 2012",
    updated: cmsSnapshot.meta.edition,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research" }]} variant="light" />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Divorce and family finance research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on divorce and the money side of separation in the UK, built
            entirely from official government statistics. Free to read and cite with attribution.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-orange-500 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-orange-600 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-orange-600">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-neutral-400">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-neutral-500">
            Looking for guidance instead of data? See our{" "}
            <Link href="/blog" className="underline">
              guides
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
