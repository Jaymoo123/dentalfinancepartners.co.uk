/**
 * Etched brickwork layer for hero sections. Sits on the right side and fades
 * out toward the middle so it never competes with hero copy. Hidden on mobile
 * (hero renders as a solid ground).
 *
 * `tone="navy"` — light mortar on a `bg-slate-900` parent. The original, still
 * used by the homepage hero, the closing lead panel, the testimonial band and
 * the footer.
 *
 * `tone="cream"` — navy mortar on a `heroCreamSurface` parent, for the Services
 * and Resources heroes. It carries its own colour, weight and mask: the point
 * of the cream hero is that the brickwork is legible architecture rather than a
 * whisper. The lines carry slightly more weight than the navy version and the
 * fade starts later, so the courses stay legible across more of the panel — but
 * the opacity is kept low: navy on cream is a far higher-contrast pairing than
 * slate on navy, and matching the navy figure here reads as overpowering
 * pipework rather than texture.
 *
 * Parent section must be `relative`; hero content should be `relative z-10`.
 */
export function HeroBrickBackdrop({ tone = "navy" }: { tone?: "navy" | "cream" }) {
  // %23 is a URL-encoded '#'. slate-300 on navy, slate-900 on cream.
  const cream = tone === "cream";
  const stroke = cream ? "%230f172a" : "%23cbd5e1";
  const width = cream ? "1.15" : "1";
  const mask = cream
    ? "linear-gradient(to left, black 45%, transparent 97%)"
    : "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='40'%3E%3Cg stroke='${stroke}' stroke-width='${width}' fill='none'%3E%3Cpath d='M0 0.5h96M0 20.5h96'/%3E%3Cpath d='M48.5 0v20M24.5 20v20M72.5 20v20'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "96px 40px",
        opacity: tone === "cream" ? 0.1 : 0.18,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
