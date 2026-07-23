import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { Button } from "@/components/ui/Button";
import { Sparkline } from "@/components/estate/Sparkline";
import {
  assetsWithSeries,
  estateSites,
  estateTotals,
  monthLabel,
  snapshot,
  type EstateAsset,
} from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "Insights: the research behind the brands",
  description:
    "Proprietary indexes built from ONS, Companies House and other official data, published across the Ashfield network of specialist accounting sites.",
  alternates: { canonical: `${siteConfig.url}/insights` },
};

/* ---------- presentation helpers (server-only, data from snapshot) ---------- */

const ACRONYMS: Record<string, string> = {
  Nhs: "NHS",
  Uk: "UK",
  Sra: "SRA",
  Fsa: "FSA",
  Cqc: "CQC",
  Ppr: "PPR",
  Ch: "Companies House",
  Aa: "AA",
  Rd: "R&D",
  Cis: "CIS",
  Ir35: "IR35",
};

function cleanName(name: string): string {
  return name
    .split(" ")
    .map((w) => ACRONYMS[w] ?? w)
    .join(" ");
}

function brandName(brandId: string): string {
  return estateSites().find((s) => s.id === brandId)?.name ?? brandId;
}

/** Latest value formatted per unit. Snapshot units are machine keys, so we
 *  key off patterns: pct-ish units get %, income gets £, everything else is a
 *  grouped en-GB number. */
function fmtLatest(a: EstateAsset): string {
  if (a.latest === null) return "";
  const grouped = a.latest.toLocaleString("en-GB", { maximumFractionDigits: 1 });
  const u = a.unit ?? "";
  if (u.includes("pct")) return `${grouped}%`;
  if (u === "avg_net_income" || u === "amountAllM") return `£${grouped}${u === "amountAllM" ? "m" : ""}`;
  return grouped;
}

/** One-line finding derived from the series itself (the snapshot's machine
 *  finding strings are not broadsheet register). */
function findingLine(a: EstateAsset): string {
  const first = a.series[0];
  const last = a.series[a.series.length - 1];
  if (!first || !last || first.value === 0) return "";
  if ((a.unit ?? "").includes("pct")) {
    // Percentage-valued series: relative change of a percentage is confusing,
    // report the percentage-point difference instead.
    const diff = last.value - first.value;
    const dir = diff >= 0 ? "up" : "down";
    const mag = Math.abs(diff).toLocaleString("en-GB", { maximumFractionDigits: 1 });
    return `${fmtLatest(a)} in ${monthLabel(last.period)}, ${dir} ${mag} points since ${monthLabel(first.period)}.`;
  }
  const pct = ((last.value - first.value) / Math.abs(first.value)) * 100;
  const dir = pct >= 0 ? "up" : "down";
  const mag = Math.abs(pct).toLocaleString("en-GB", { maximumFractionDigits: 1 });
  return `${fmtLatest(a)} in ${monthLabel(last.period)}, ${dir} ${mag}% since ${monthLabel(first.period)}.`;
}

function isOgl(licence: string): boolean {
  return /open government licence|ogl/i.test(licence);
}

function licenceShort(licence: string | null): string {
  if (!licence) return "";
  return isOgl(licence) ? "OGL v3.0" : licence.split(/[.(]|--/)[0].trim();
}

/** "Source · Licence" with parts dropped when absent. */
function provenance(a: EstateAsset): string {
  return [a.source, licenceShort(a.licence)].filter(Boolean).join(" · ");
}

/* ---------- page ---------- */

const FEATURED_IDS = [
  "dentists/nhs-dental-earnings-index",
  "contractors-ir35/uk-contractor-index",
  "ecommerce/online-seller-formation-seasonality",
];

export default function InsightsPage() {
  const withSeries = assetsWithSeries();
  const featured = FEATURED_IDS.map((id) => withSeries.find((a) => a.id === id)).filter(
    (a): a is EstateAsset => Boolean(a),
  );
  const rest = withSeries.filter((a) => !FEATURED_IDS.includes(a.id));
  const crossSectional = snapshot.assets.filter(
    (a) => a.series.length === 0 && a.report_url,
  );
  const totals = estateTotals();
  const anyOgl = snapshot.assets.some((a) => isOgl(a.licence ?? ""));

  return (
    <>
      {/* Hero: paper-3, ghost numeral, asymmetric */}
      <section className="relative overflow-hidden bg-paper-3 grain">
        <span
          aria-hidden="true"
          className="ghost-numeral absolute -top-10 right-[4vw] hidden text-[16rem] lg:block"
        >
          {totals.research_assets}
        </span>
        <div className="relative mx-auto max-w-[1200px] px-(--gutter) py-24 md:py-32">
          <SectionHeading eyebrow="Insights" as="h1">
            The research house behind the brands
          </SectionHeading>
          <p className="type-lead measure mt-6 text-ink-70">
            Every site in the Ashfield network is built on proprietary research:
            {" "}{totals.research_assets} indexes, league tables and density maps
            compiled from official data, ONS, Companies House, NHS and sector
            regulators. Each asset is published in full on the brand that owns
            it. This page is the index of the indexes.
          </p>
          <p className="type-caption mt-6 !text-ink-70">
            {totals.sites} live brands · {totals.research_assets} research assets ·
            snapshot generated {new Date(snapshot.meta.generated_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Featured: three wide cards, unequal split, py-8rem */}
      <section className="bg-paper py-32">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Featured series">
            Three series worth a minute
          </SectionHeading>
          <div className="mt-14 space-y-10">
            {featured.map((a, i) => (
              <article
                key={a.id}
                data-reveal
                style={{ "--i": Math.min(i, 4) } as React.CSSProperties}
                className="grid items-center gap-8 border border-hairline bg-paper p-8 md:grid-cols-12 md:p-10"
              >
                <div className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-7 md:order-2"}>
                  <p className="type-eyebrow">{brandName(a.brand)}</p>
                  <h3 className="type-h3 mt-3">
                    <a
                      href={a.report_url}
                      className="hover:text-navy"
                      rel="noopener"
                    >
                      {cleanName(a.name)}
                    </a>
                  </h3>
                  <p className="type-body mt-3 text-ink-70">{findingLine(a)}</p>
                  {provenance(a) ? (
                    <p className="type-caption mt-4 !text-ink-70">
                      Source: {provenance(a)}.
                    </p>
                  ) : null}
                </div>
                <div className={i % 2 === 0 ? "md:col-span-5" : "md:col-span-5 md:order-1"}>
                  <p className="type-stat nums-lining">{fmtLatest(a)}</p>
                  <div className="mt-4 max-w-[320px]">
                    <Sparkline series={a.series} width={320} height={56} />
                  </div>
                  <p className="type-caption mt-3">
                    <a href={a.report_url} rel="noopener" className="underline decoration-hairline-strong underline-offset-4 hover:text-navy">
                      Read the full report
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ruled list of the remaining series assets: paper-2, tight rows */}
      <section className="bg-paper-2 grain py-24">
        <div className="mx-auto max-w-[1360px] px-(--gutter)">
          <SectionHeading eyebrow="Live series">All tracked series</SectionHeading>
          <p className="type-caption measure mt-3 !text-ink-70">
            Latest value and direction only. The full charts, methodology and
            downloads live on each brand site.
          </p>
          <div className="mt-10">
            <HairlineRule strong />
            <ul>
              {rest.map((a) => (
                <li
                  key={a.id}
                  className="grid items-center gap-x-6 gap-y-2 border-b border-hairline py-5 md:grid-cols-12"
                >
                  <div className="md:col-span-5">
                    <a href={a.report_url} rel="noopener" className="type-body hover:text-navy">
                      {cleanName(a.name)}
                    </a>
                    <p className="type-caption mt-1">{brandName(a.brand)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="type-body nums-lining">{fmtLatest(a)}</span>
                  </div>
                  <div className="hidden md:col-span-2 md:block">
                    <Sparkline series={a.series} />
                  </div>
                  <div className="md:col-span-3">
                    <p className="type-caption">{provenance(a)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cross-sectional assets: plain ruled list, no sparklines */}
      <section className="bg-paper py-32">
        <div className="mx-auto max-w-[1200px] px-(--gutter) md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Cross-sectional">
              Maps, league tables and structures
            </SectionHeading>
            <p className="type-body mt-4 text-ink-70">
              Not everything is a time series. These assets are snapshots of a
              market's shape: density maps, payment-practice league tables and
              profession structures.
            </p>
          </div>
          <ul className="mt-10 md:col-span-8 md:mt-0">
            {crossSectional.map((a) => (
              <li key={a.id} className="border-b border-hairline py-4 first:border-t">
                <a href={a.report_url} rel="noopener" className="type-body hover:text-navy">
                  {cleanName(a.name)}
                </a>
                <p className="type-caption mt-1">
                  {[brandName(a.brand), provenance(a)].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Attribution + tight CTA band */}
      <section className="border-t border-hairline bg-paper-2 py-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-(--gutter) md:flex-row md:items-center md:justify-between">
          <div className="measure">
            {anyOgl ? (
              <p className="type-caption !text-ink-70">
                Contains public sector information licensed under the Open
                Government Licence v3.0. Assets marked otherwise are compiled
                under the terms stated on their report pages.
              </p>
            ) : null}
            <p className="type-caption mt-2 !text-ink-70">
              This research underpins the network's search authority. Firms
              renting a site take the asset with it.
            </p>
          </div>
          <Button href="/contact" size="lg">
            Talk to us about the data
          </Button>
        </div>
      </section>
    </>
  );
}
