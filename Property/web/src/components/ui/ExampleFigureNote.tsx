/**
 * The fine print that marks a visual's numbers.
 *
 * This site gives tax information to UK landlords, and a figure set inside a
 * designed figure reads as a quoted rate or a promised outcome. The note is the
 * cheap disclaimer that keeps a number a number.
 *
 * **It goes on every visual carrying figures, including statutory ones.** This
 * was the owner's explicit decision. An earlier pass put it only on illustrative
 * figures (worked examples, specimen records, sample portfolios) and left the
 * statutory ones bare, on the reasoning that tax rates, MTD thresholds, filing
 * deadlines and statutory penalty amounts are facts rather than illustrations.
 * That reasoning was put to the owner and overruled: he wants the note
 * everywhere. Do not re-split it without asking him.
 *
 * The one place it is deliberately NOT used is `StatsCounter` (the 100+
 * landlords / 24hr / £2.4M+ proof strip). Those are the firm's own claims about
 * itself, not tax figures, and captioning them "example figures displayed" would
 * read as an admission that the proof points are invented. That is the opposite
 * of what this note is for. Flagged to the owner and awaiting his call.
 */
export function ExampleFigureNote({ className = "" }: { className?: string }) {
  // Rule Zero (c): slate-500, not the designer's slate-400. This renders at 11px
  // on white, so the 4.5:1 AA floor applies and slate-400 measures 2.63:1 against
  // it. Measured in the browser on /property-tax-rates, where Phase 5 gave this
  // component its first consumer: 2.63:1 -> 4.76:1.
  return (
    <p className={`text-[11px] leading-relaxed text-slate-500 ${className}`}>
      <span aria-hidden>*</span>
      <span className="sr-only">Note: </span>
      Example figures displayed
    </p>
  );
}
