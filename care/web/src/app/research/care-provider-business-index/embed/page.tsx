/**
 * Embeddable iframe view of the Care Provider Business Index.
 * Stripped-down layout (no nav/footer) for embedding on third-party sites.
 */
import snapshot from "@/data/uk-care-provider-business-index.json";

const { meta, quarters, sub_trades, headline } = snapshot;

function fmt(n: number): string {
  return n.toLocaleString("en-GB");
}

function fmtNet(n: number): string {
  return (n >= 0 ? "+" : "") + fmt(n);
}

type SubTradeKey = keyof typeof sub_trades;
const TRADE_KEYS = Object.keys(sub_trades) as SubTradeKey[];
const DISPLAY_QUARTERS = quarters.slice(-8).reverse();

export default function CareProviderIndexEmbed() {
  const latestQ = headline.latest_quarter;
  const latestNet = headline.latest_quarter_net_by_sub_trade as Record<string, number>;

  return (
    <div className="p-4 font-sans text-sm text-[var(--ink)]">
      <p className="mb-3 text-xs text-[var(--muted)] uppercase tracking-wide font-semibold">
        UK Care Provider Business Index
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
          <div className="text-xl font-bold text-[var(--brand-primary)]">
            {fmt(headline.care_company_count_proxy.count)}
          </div>
          <div className="text-xs text-[var(--muted)]">active care companies (all SICs)</div>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
          <div className="text-xl font-bold text-[var(--brand-primary)]">
            {fmtNet(latestNet.domiciliary ?? 0)}
          </div>
          <div className="text-xs text-[var(--muted)]">domiciliary net openings ({latestQ})</div>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
          <div className="text-xl font-bold text-[var(--brand-primary)]">
            {fmtNet(latestNet.residential_nursing ?? 0)}
          </div>
          <div className="text-xs text-[var(--muted)]">residential nursing net openings ({latestQ})</div>
        </div>
      </div>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
            <th className="py-1.5 pr-3 font-semibold">Quarter</th>
            {TRADE_KEYS.map((k) => (
              <th key={k} className="py-1.5 pr-3 text-right font-semibold">
                {sub_trades[k].label.split(" ")[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DISPLAY_QUARTERS.map((q) => {
            const idx = quarters.indexOf(q);
            return (
              <tr key={q} className="border-b border-[var(--border)]/50">
                <td className="py-1 pr-3 font-medium">{q}</td>
                {TRADE_KEYS.map((k) => {
                  const net = sub_trades[k].net_openings[idx] ?? 0;
                  return (
                    <td
                      key={k}
                      className={`py-1 pr-3 text-right tabular-nums ${net < 0 ? "text-red-600" : "text-green-700"}`}
                    >
                      {fmtNet(net)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-3 text-xs text-[var(--muted)]">
        Net openings = incorporations minus dissolutions per quarter. Source:{" "}
        <a href={meta.source_url} rel="noopener noreferrer" className="underline">
          Companies House
        </a>{" "}
        (OGL v3.0). Pull date: {meta.pull_date}.
      </p>
    </div>
  );
}
