/**
 * The outcome card the token-gated flows use to say what just happened:
 * "link expired", "you are all set", "callback booked", "we saved that".
 *
 * There were eight near-copies of this across `/book`, `/complete`,
 * `BookingPicker` and `DetailsForm`, all `border-2` with square corners, and
 * they had already started to drift as each was touched. One component, so the
 * next edit cannot fork them again.
 *
 * `tone` is meaning, not decoration (DESIGN_SYSTEM §5 rule 3): `emerald` for a
 * good outcome the reader wanted, `slate` for a neutral dead end (no link, bad
 * link, expired link) where nobody has done anything wrong. There is no red
 * tone on purpose, because none of these states is the reader's fault.
 *
 * `ground` is the section the card sits on, because a card must not share its
 * section's ground or it has no edge (§4a rule 3). Default `white` puts the
 * card on `bg-slate-50`; pass `slate` on a `bg-slate-50` section.
 */
export function NoticeCard({
  tone = "slate",
  ground = "white",
  title,
  children,
}: {
  tone?: "slate" | "emerald";
  ground?: "white" | "slate";
  /** Optional bold lead line above the body. */
  title?: string;
  children: React.ReactNode;
}) {
  const surface =
    tone === "emerald"
      ? "bg-emerald-50 ring-emerald-600/40"
      : ground === "slate"
        ? "bg-white ring-slate-200/70"
        : "bg-slate-50 ring-slate-200/70";
  return (
    <div className={`rounded-xl p-6 text-center ring-1 sm:p-8 ${surface}`}>
      {title ? <p className="text-lg font-bold text-slate-900">{title}</p> : null}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </div>
  );
}
