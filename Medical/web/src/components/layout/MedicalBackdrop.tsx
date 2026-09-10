/**
 * ECG rhythm strip on chart paper. The brand backdrop layer for hero sections
 * and the footer. Sits on the right side and fades out toward the middle so it
 * never competes with copy. Hidden on mobile (hero renders as a solid ground).
 *
 * Geometry is Property's `HeroBrickBackdrop` EXACTLY (rollout appendix E): the
 * 55% width, `hidden sm:block`, the mask-to-transparent recipe and the opacity
 * recipe. Only the pattern itself differs.
 *
 * `tone="navy"` — copper-light trace on a `bg-slate-900` / `var(--navy)` parent.
 * `tone="cream"` — copper trace on a cream parent, lighter and fading later.
 *
 * Decorative only: `aria-hidden`, no role, no accessible name. A rhythm strip
 * carries no meaning for a non-visual reader.
 *
 * Parent section must be `relative overflow-hidden`; content `relative z-10`.
 *
 * ponytail: static SVG, no animated sweep, so no `prefers-reduced-motion` gate
 * is needed. Add one with the animation if a sweep is ever wanted.
 */
export function MedicalBackdrop({ tone = "navy" }: { tone?: "navy" | "cream" }) {
  // %23 is a URL-encoded '#'. Values pinned by docs/medical/DESIGN_DELTA.md §1
  // (backdrop motif): --copper-light #cd8e5a on navy, --brand-primary #b87333
  // on cream. They are literal here because a data URI cannot read a CSS var.
  const cream = tone === "cream";
  const stroke = cream ? "%23b87333" : "%23cd8e5a";
  const grid = cream ? "1.15" : "1";
  const gridBold = cream ? "1.725" : "1.5";
  const trace = cream ? "1.85" : "1.6";
  const mask = cream
    ? "linear-gradient(to left, black 45%, transparent 97%)"
    : "linear-gradient(to left, black 35%, transparent 92%)";
  // Chart paper: vertical rules at 34px pitch, every fifth at 1.5x. Trace: one
  // baseline plus 3 QRS complexes at irregular pitch, so it reads as a trace
  // and not as a repeat. Tile starts and ends on the baseline so it seams.
  const qrs = "q6 -7 12 0 h6 l4 7 l5 -38 l5 42 l4 -11 h6 q9 -9 18 0";
  const svg =
    `%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='120'%3E` +
    `%3Cg stroke='${stroke}' fill='none'%3E` +
    `%3Cg stroke-width='${grid}'%3E%3Cpath d='M34.5 0v120M68.5 0v120M102.5 0v120M136.5 0v120M204.5 0v120M238.5 0v120M272.5 0v120M306.5 0v120'/%3E%3C/g%3E` +
    `%3Cg stroke-width='${gridBold}'%3E%3Cpath d='M0.5 0v120M170.5 0v120'/%3E%3C/g%3E` +
    `%3Cpath stroke-width='${grid}' d='M0 60.5h340'/%3E` +
    `%3Cpath stroke-width='${trace}' stroke-linejoin='round' d='M0 60.5H20 ${qrs} H140 ${qrs} H250 ${qrs} H340'/%3E` +
    `%3C/g%3E%3C/svg%3E`;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        backgroundSize: "340px 120px",
        opacity: cream ? 0.1 : 0.18,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
