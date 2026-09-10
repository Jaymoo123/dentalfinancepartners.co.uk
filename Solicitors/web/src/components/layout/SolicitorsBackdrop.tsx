/**
 * Ruled column-ledger layer, this site's answer to Property's
 * `HeroBrickBackdrop`. Same mechanism and same geometry, different subject:
 * an etched analysis-paper grid (evenly spaced column rules, a heavier
 * debit/credit fold, sparse horizontal rules that stop short of the edges,
 * and a few short tick entries), which is the ledger a law firm's client
 * account is reconciled on. Approved 2026-09-10, DESIGN_DELTA "backdrop
 * motif" row. Scales and gavels were rejected there: the wordmark already
 * carries the scales, and a gavel is American iconography.
 *
 * `tone="navy"` - rose-400 rules on a `bg-slate-900` parent (footer, navy
 * bands). rose-400 measures 6.63:1 on navy; the brand hex measures 3.06 and
 * must never be used there.
 *
 * `tone="cream"` - brand-hex rules on a `heroCreamSurface` parent. Lower
 * opacity and a later fade, exactly as Property's cream tone: a dark stroke on
 * cream is a far higher-contrast pairing than a light one on navy, so matching
 * the navy figure would read as pipework rather than texture.
 *
 * Pure server component, no JS, `aria-hidden`. Parent section must be
 * `relative overflow-hidden`; its content must be `relative z-10`.
 */
export function SolicitorsBackdrop({ tone = "navy" }: { tone?: "navy" | "cream" }) {
  // %23 is a URL-encoded '#'. rose-400 on navy, the brand crimson on cream.
  const cream = tone === "cream";
  const stroke = cream ? "%23c41e3a" : "%23fb7185";
  const width = cream ? "1.15" : "1";
  const heavy = cream ? "1.9" : "1.7";
  const tick = cream ? "1.75" : "1.5";
  const mask = cream
    ? "linear-gradient(to left, black 45%, transparent 97%)"
    : "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='204' height='120'%3E` +
          `%3Cg fill='none' stroke='${stroke}'%3E` +
          // Column rules, 34px pitch.
          `%3Cpath stroke-width='${width}' d='M16.5 0v120M50.5 0v120M152.5 0v120M186.5 0v120'/%3E` +
          // The debit/credit fold: two heavier rules bracketing the centre column.
          `%3Cpath stroke-width='${heavy}' d='M84.5 0v120M118.5 0v120'/%3E` +
          // Sparse horizontal rules, stopping short of the tile edges.
          `%3Cpath stroke-width='${width}' d='M10 30.5h184M10 90.5h184'/%3E` +
          // Tick entries: short, heavier marks sitting in the columns.
          `%3Cpath stroke-width='${tick}' d='M22 60.5h22M56 60.5h22M124 15.5h22M158 105.5h22'/%3E` +
          `%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "204px 120px",
        opacity: cream ? 0.1 : 0.18,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
