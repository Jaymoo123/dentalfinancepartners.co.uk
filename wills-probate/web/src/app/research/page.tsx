import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { fmtNumber, fmtWeeks, quarterLabel } from "@/lib/research/format";
import type { ProbateWaitTimesSnapshot, PensionsIhtSnapshot } from "@/lib/research/types";
import waitTimesSnapshot from "@/data/probate-wait-times.json";
import pensionsSnapshot from "@/data/pensions-iht-2027.json";

const waitTimes = waitTimesSnapshot as unknown as ProbateWaitTimesSnapshot;
const pensions = pensionsSnapshot as unknown as PensionsIhtSnapshot;

export const metadata: Metadata = {
  title: `Probate and inheritance tax research and data | ${siteConfig.name}`,
  description:
    "Original, sourced data on UK probate timeliness and the 2027 pensions inheritance tax change, built from official government statistics. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-probate-wait-times-index",
    title: "UK Probate Wait Times Index",
    blurb: `How long HM Courts and Tribunals Service takes to issue a grant of representation, split by digital and paper applications, every quarter since 2019. Digital applications now average ${fmtWeeks(waitTimes.headline.mean_weeks_digital)}, paper ${fmtWeeks(waitTimes.headline.mean_weeks_paper)}.`,
    stat: fmtWeeks(waitTimes.headline.mean_weeks_all),
    statLabel: `mean wait, ${quarterLabel(waitTimes.headline.latest_quarter)}`,
    updated: quarterLabel(waitTimes.meta.latest_period),
  },
  {
    href: "/research/pensions-inheritance-tax-2027",
    title: "Pensions into Inheritance Tax from April 2027: Impact Model",
    blurb: `From 6 April 2027 most unused pension funds count towards Inheritance Tax. HMRC expects ${fmtNumber(pensions.impact.newly_liable_pa)} newly liable estates a year and ${fmtNumber(pensions.impact.paying_more_pa)} paying more, with worked scenarios showing the effect on real estates.`,
    stat: fmtNumber(pensions.impact.newly_liable_pa),
    statLabel: "estates a year newly liable for IHT from 2027",
    updated: pensions.meta.generated_at,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research" }]} variant="light" />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Probate and inheritance tax research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on UK probate timeliness and inheritance tax policy, built entirely
            from official government statistics. Free to read and cite with attribution.
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
        </div>
      </section>
    </>
  );
}
