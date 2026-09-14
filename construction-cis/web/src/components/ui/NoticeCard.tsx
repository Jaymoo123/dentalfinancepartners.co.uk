/**
 * The outcome card the token-gated flows use to say what just happened:
 * "needs the personal link", "this link has expired", "you are all set",
 * "callback booked", "we saved that".
 *
 * There were six near-copies of this across /book, /complete, BookingPicker and
 * DetailsForm, all square-cornered `border` or `border-2` boxes, and they had
 * already drifted: /complete's "needs the personal link" card is a hand-copy of
 * /book's with a different border weight. One component, so the next edit cannot
 * fork them again (DESIGN_SYSTEM section 4d).
 *
 * `tone` is meaning, not decoration: `accent` for a good outcome the reader
 * wanted, `slate` for a neutral dead end (no link, bad link, expired link) where
 * nobody has done anything wrong. There is no red tone on purpose, because none
 * of these states is the reader's fault.
 *
 * Every consumer sits on a white section, so the slate tone takes --surface and
 * keeps an edge. No default title and no default body: this component publishes
 * nothing the calling route has not written.
 *
 * KIT DECLINE (2026-09-14 kit-adoption uplift), on colour, not on taste. The kit
 * twin is packages/web-shared/design/primitives/NoticeCard.tsx and it is the same
 * component in every respect but its neutral: its `slate` tone paints bg-slate-50
 * (#f8fafc) with ring-slate-200, where this one paints --surface (#fafaf9, the
 * warm stone-50 this site's sections are already built from) with ring-neutral-200.
 * Every one of the nine call sites sits on a warm ground, so the kit tone would
 * drop a cool-grey card onto a warm-grey section: 1.00:1 between slate-50 and
 * --surface, i.e. no edge gained, and a visible hue shift. Its `primary` tone is
 * a true match and could be adopted alone (bg-primary-50 = orange-50 #fff7ed =
 * --accent-whisper, the identical value), but splitting one tone off the kit and
 * keeping the other is drift with extra steps. Revisit if this site ever moves
 * its surface ramp from stone to slate.
 */
export function NoticeCard({
  tone = "slate",
  title,
  children,
}: {
  tone?: "slate" | "accent";
  /** Optional bold lead line above the body. */
  title?: string;
  children: React.ReactNode;
}) {
  const surface =
    tone === "accent"
      ? "bg-[var(--accent-whisper)] ring-[var(--btn-ground)]/30"
      : "bg-[var(--surface)] ring-neutral-200";
  return (
    <div className={`rounded-xl p-6 text-center ring-1 sm:p-8 ${surface}`}>
      {title ? <p className="text-lg font-bold text-slate-900">{title}</p> : null}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </div>
  );
}
