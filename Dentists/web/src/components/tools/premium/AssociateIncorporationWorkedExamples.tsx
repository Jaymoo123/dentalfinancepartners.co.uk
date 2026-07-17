/**
 * SSR worked-example block for the associate incorporation calculator.
 *
 * Server component (no "use client"): figures are computed at render time from
 * the same pure lib the interactive tool uses, so the static prose can never
 * drift from the calculator maths. Intended to sit in the hosting article
 * beneath the PremiumUpgrade island; not wired anywhere yet (deliberate
 * integration step, mirrors the no-registry-edit build rule).
 *
 * TOKEN DISCIPLINE: var(--gold), var(--navy), var(--border), var(--muted),
 * var(--ink) only. Dentists does not define --primary.
 */
import { calcAssociateIncorporation } from "@/lib/tools/compute/associate-incorporation";

function gbp(n: number): string {
  const abs = "£" + Math.abs(Math.round(n)).toLocaleString("en-GB");
  return n < 0 ? "-" + abs : abs;
}

const EXAMPLES = [
  {
    title: "Example 1: NHS-weighted associate",
    inputs: "£200,000 gross fees, 45% split, 8% lab, £4,000 expenses, 80% NHS",
    result: calcAssociateIncorporation(200000, 45, 8, 4000, 80, 0),
    commentary:
      "On full extraction at 2026/27 rates the company route is behind before the pension even enters the picture: the higher dividend rates and 15% employer NIC have eroded the old incorporation arithmetic. Adding the forgone employer-funded NHS Pension value turns a modest loss into a decisive one. This is the typical outcome for an NHS-weighted book of fees.",
  },
  {
    title: "Example 2: mostly private associate",
    inputs: "£350,000 gross fees, 50% split, 6% lab, £6,000 expenses, 30% NHS",
    result: calcAssociateIncorporation(350000, 50, 6, 6000, 30, 0),
    commentary:
      "With a mostly private book, far less of the income was pensionable in the first place, so the pension cost of incorporating shrinks. Even so, on full dividend extraction the company is still behind at 2026/27 rates. Where incorporation can still win is profit retention: money left in the company suffers only corporation tax, which this full-extraction comparison deliberately does not credit.",
  },
] as const;

export function AssociateIncorporationWorkedExamples() {
  return (
    <section aria-label="Worked examples">
      <h2 className="text-xl font-semibold text-[var(--ink)]">
        Two worked examples at 2026/27 rates
      </h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {EXAMPLES.map(({ title, inputs, result: r, commentary }) => (
          <div
            key={title}
            className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
          >
            <div className="h-1 bg-[var(--gold)]" />
            <div className="p-5 sm:p-6">
              <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{inputs}</p>
              <dl className="mt-4 space-y-1.5 text-sm">
                {[
                  ["Net fee income (both routes)", gbp(r.netFees)],
                  ["Sole trader net cash", gbp(r.soleTrader.net)],
                  ["Limited company net cash", gbp(r.ltd.net)],
                  ["Ltd tax saving before pension", gbp(r.taxSavingBeforePension)],
                  ["Estimated pensionable earnings", gbp(r.pensionableEarnings)],
                  ["NHS Pension employer value forgone (26.9%)", gbp(r.pensionEmployerValue)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-[var(--muted)]">{label}</dt>
                    <dd className="font-medium text-[var(--ink)]">{value}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 border-t border-[var(--border)] pt-2">
                  <dt className="font-semibold text-[var(--ink)]">
                    {r.ltdWins ? "Limited company ahead by" : "Sole trader ahead by"}
                  </dt>
                  <dd className="font-semibold text-[var(--navy)]">
                    {gbp(Math.abs(r.netPositionAfterPension))} a year
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{commentary}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Both examples assume full dividend extraction, a £12,570 director salary and complete
        loss of NHS Pension accrual on incorporation. The 26.9% employer-equivalent rate
        (20.6% employer contribution plus 6.3% administration levy) is an estimate; scheme
        rates and access rules depend on your arrangement. Estimates, not advice.
      </p>
    </section>
  );
}
