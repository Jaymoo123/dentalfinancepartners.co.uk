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
