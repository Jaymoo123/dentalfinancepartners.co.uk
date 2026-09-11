/**
 * Dentists' backdrop motif, this site's answer to Property's `HeroBrickBackdrop`
 * and to `GeneralistBackdrop` / `SolicitorsBackdrop`. It is the `.hero-brand`
 * treatment from `globals.css` (the 160deg navy gradient, the gold and white
 * radial drifts, and the 56px grid) lifted into a component so the design kit's
 * `backdrop` slots can take it.
 *
 * `tone="navy"` - the full treatment, ground included. The kit footer's own
 * ground is `bg-slate-900` (`chrome/SiteFooter.tsx:138`), which is a visibly
 * different colour from the brand navy the rest of the site uses, so this layer
 * paints the navy gradient over it at full opacity. DESIGN_DELTA section 3
 * sanctions navy as the dark ground; white measures 17.15 on navy against 17.85
 * on slate-900, so both clear, and the site should read as one colour.
 *
 * `tone="light"` - texture only, no ground paint: the grid at a low opacity and
 * the gold drift, for a light parent that owns its own background.
 *
 * The gold drift stays pinned to the top-right corner exactly as `.hero-brand`
 * has it, and that placement is load-bearing. Gold at 14% over the navy-soft end
 * of the ramp drops a `primary-400` graphic to 2.77 against its ground, under the
 * 3:1 floor. Over the navy-deep and navy ends, where the drift actually sits, the
 * same graphic measures 3.77 and 3.47. Do not move the drift down the gradient.
 *
 * Pure server component, no JS, every layer `aria-hidden`. Host contract, same as
 * the siblings: the parent must be `relative overflow-hidden` and its content
 * `relative z-10`, or the texture paints over the copy. The kit footer already
 * satisfies both.
 *
 * `.hero-brand` and `.hero-inner` have been DELETED from globals.css at the phase 6
 * close: this component replaced their last consumer. Nothing renders those classes.
 * (playbook T26).
 */

// 56px grid tile. `%23` is a URL-encoded '#'. The navy form is byte-identical to
// the one in `.hero-brand::after`; the light form swaps the white rule for the
// brand navy, because a white rule on a light ground is invisible.
const gridTile = (stroke: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cg fill='none' stroke='${stroke}' stroke-opacity='0.04'%3E%3Cpath d='M28 0v56M0 28h56'/%3E%3C/g%3E%3C/svg%3E")`;

export function DentistsBackdrop({ tone = "navy" }: { tone?: "navy" | "light" }) {
  const navy = tone === "navy";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {navy && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, var(--navy-deep) 0%, var(--navy) 38%, var(--navy-soft) 100%)",
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: navy
            ? "radial-gradient(ellipse 80% 55% at 100% 0%, var(--gold-soft), transparent 55%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(255, 255, 255, 0.06), transparent 50%)"
            : "radial-gradient(ellipse 80% 55% at 100% 0%, var(--gold-soft), transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: navy ? 0.4 : 0.25,
          backgroundImage: gridTile(navy ? "%23ffffff" : "%23001b3d"),
        }}
      />
    </div>
  );
}
