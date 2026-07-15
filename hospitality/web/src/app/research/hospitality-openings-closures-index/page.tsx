import type { Metadata } from "next";
import type { ReactNode } from "react";

import snapshot from "@/data/uk-hospitality-openings-closures-index.json";

const { meta, quarters, sub_trades, headline } = snapshot;

const PAGE_PATH = "/research/hospitality-openings-closures-index";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hospitality.example.com";

function fmt(n: number): string {
  return n.toLocaleString("en-GB");
}

function fmtNet(n: number): string {
  return (n >= 0 ? "+" : "") + fmt(n);
}

export const metadata: Metadata = {
  title: "UK Hospitality Openings & Closures Index",
  description: `Quarterly tracker of UK hospitality company incorporations and dissolutions by sub-trade, built from Companies House data. ${fmt(headline.pub_count_proxy.count)} pub and bar companies currently active on the register.`,
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "UK Hospitality Openings & Closures Index",
    description: `Companies House data on UK restaurant, pub, hotel and takeaway openings and closures by quarter, from Q1 2021.`,
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "article",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: meta.title,
  description: meta.description,
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  dateModified: meta.generated_at,
  isAccessibleForFree: true,
  url: `${SITE_URL}${PAGE_PATH}`,
  variableMeasured: [
    "Quarterly hospitality company incorporations by sub-trade",
    "Quarterly hospitality company dissolutions by sub-trade",
    "Net openings per quarter per sub-trade",
    "Rolling 4-quarter average net openings",
    "Live pub and bar company count",
    "Live restaurant and cafe company count",
  ],
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0"
    >
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

type SubTradeKey = keyof typeof sub_trades;

const TRADE_KEYS = Object.keys(sub_trades) as SubTradeKey[];

// Show last 12 quarters in the detail tables (most recent first)
const DISPLAY_QUARTERS = quarters.slice(-12).reverse();

export default function HospitalityIndexPage() {
  const latestQ = headline.latest_quarter;
  const latestNet = headline.latest_quarter_net_by_sub_trade as Record<string, number>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              UK Hospitality Openings & Closures Index
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Quarterly tracker of UK hospitality company incorporations and
              dissolutions by sub-trade, built from Companies House data. Updated {meta.pull_date}.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              value={fmt(headline.pub_count_proxy.count)}
              label="pub and bar companies on the register (SIC 56301/56302)"
            />
            <Stat
              value={fmtNet(latestNet.restaurants_cafes ?? 0)}
              label={`restaurant and cafe net openings (${latestQ})`}
            />
            <Stat
              value={fmtNet(latestNet.pubs_bars ?? 0)}
              label={`pub and bar net openings (${latestQ})`}
            />
          </div>

          <Section id="pubs" title="How many pubs are in the UK?">
            <p>
              As at {headline.pub_count_proxy.as_of}, the Companies House register shows{" "}
              <strong>{fmt(headline.pub_count_proxy.count)}</strong> active companies with
              SIC code 56301 (public houses and bars) or 56302 (licensed clubs). This is the
              incorporated-business count: sole-trader and partnership pubs are not captured
              in Companies House data, so the true pub count across all business types is higher.
              The figure updates each quarter as new incorporations and dissolutions are filed.
            </p>
          </Section>

          <Section id="restaurants-count" title="How many restaurants are in the UK?">
            <p>
              As at {headline.restaurant_count_proxy.as_of}, the Companies House register shows{" "}
              <strong>{fmt(headline.restaurant_count_proxy.count)}</strong> active companies with
              SIC code 56101 (licensed restaurants), 56102 (unlicensed restaurants and cafes) or
              56103 (takeaway food shops and mobile food stands). This is the incorporated-business
              count: sole-trader and partnership restaurants and cafes are not captured in Companies
              House data, so the true count across all business types is higher. The figure updates
              each quarter as new incorporations and dissolutions are filed.
            </p>
          </Section>

          <Section id="overview" title={`Net openings by sub-trade (${latestQ})`}>
            <p>
              Net openings is incorporations minus dissolutions for the quarter. A positive
              number means more businesses registered than dissolved; negative means more
              dissolved than registered. Because dissolution filings lag actual closures by
              months, the rolling 4-quarter average (shown in the sub-trade tables below)
              gives a more stable signal.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Sub-trade</th>
                    <th className="py-2 pr-4 text-right font-semibold">Incorporations</th>
                    <th className="py-2 pr-4 text-right font-semibold">Dissolutions</th>
                    <th className="py-2 text-right font-semibold">Net openings</th>
                  </tr>
                </thead>
                <tbody>
                  {TRADE_KEYS.map((k) => {
                    const t = sub_trades[k];
                    const idx = quarters.indexOf(latestQ);
                    return (
                      <tr key={k} className="border-b border-[var(--border)]/60">
                        <td className="py-2 pr-4">{t.label}</td>
                        <td className="py-2 pr-4 text-right tabular-nums">
                          {fmt(t.incorporations[idx] ?? 0)}
                        </td>
                        <td className="py-2 pr-4 text-right tabular-nums">
                          {fmt(t.dissolutions[idx] ?? 0)}
                        </td>
                        <td className="py-2 text-right tabular-nums font-medium">
                          {fmtNet(t.net_openings[idx] ?? 0)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          {TRADE_KEYS.map((k) => {
            const t = sub_trades[k];
            return (
              <Section key={k} id={k} title={t.label}>
                <div className="overflow-x-auto">
                  <table className="mt-2 w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                        <th className="py-2 pr-4 font-semibold">Quarter</th>
                        <th className="py-2 pr-4 text-right font-semibold">Incorporations</th>
                        <th className="py-2 pr-4 text-right font-semibold">Dissolutions</th>
                        <th className="py-2 pr-4 text-right font-semibold">Net</th>
                        <th className="py-2 text-right font-semibold">4Q avg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DISPLAY_QUARTERS.map((q) => {
                        const idx = quarters.indexOf(q);
                        const avg = t.rolling_4q_avg_net[idx];
                        return (
                          <tr key={q} className="border-b border-[var(--border)]/60">
                            <td className="py-2 pr-4 font-medium">{q}</td>
                            <td className="py-2 pr-4 text-right tabular-nums">
                              {fmt(t.incorporations[idx] ?? 0)}
                            </td>
                            <td className="py-2 pr-4 text-right tabular-nums">
                              {fmt(t.dissolutions[idx] ?? 0)}
                            </td>
                            <td className="py-2 pr-4 text-right tabular-nums">
                              {fmtNet(t.net_openings[idx] ?? 0)}
                            </td>
                            <td className="py-2 text-right tabular-nums text-[var(--muted)]">
                              {avg !== null ? fmtNet(Math.round(avg)) : ""}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  SIC codes: {t.sic_codes.join(", ")}. 4Q avg = rolling 4-quarter average net openings.
                </p>
              </Section>
            );
          })}

          <Section id="methodology" title="Methodology and sources">
            <p>{meta.methodology}</p>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Caveats</h3>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              {meta.caveats.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Source</h3>
            <p className="text-sm">
              Data from the{" "}
              <a
                href={meta.source_url}
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] underline"
              >
                {meta.source}
              </a>
              , published under the{" "}
              <a
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] underline"
              >
                Open Government Licence v3.0
              </a>
              . Pull date: {meta.pull_date}. Refreshed quarterly.
            </p>
            <p className="text-sm">
              Embed this data on your own site:{" "}
              <a
                href={`${PAGE_PATH}/embed`}
                className="font-semibold text-[var(--brand-primary)] underline"
              >
                /research/hospitality-openings-closures-index/embed
              </a>
            </p>
          </Section>

          <div className="pb-16" />
        </div>
      </main>
    </>
  );
}
