import Link from "next/link";
import type { ReactNode } from "react";
import { EyebrowRule } from "./EyebrowRule";

/**
 * Body copy stack used by the topic and service pages.
 *
 * `onDark` is for navy sections. It lifts the text to slate-300 rather than
 * white: at this size a full-white paragraph under a white h2 flattens the
 * heading, and the two stop reading as a hierarchy. Default is the light-ground
 * behaviour, so existing usages are unchanged.
 */
export function Prose({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <div
      className={`mt-6 space-y-4 text-sm sm:text-base leading-relaxed ${
        onDark ? "text-slate-300" : "text-slate-700"
      }`}
    >
      {children}
    </div>
  );
}

/**
 * Small label that sits above a section heading.
 *
 * The mark carries the brand colour so the words do not have to: a brand
 * rule, then the label in restrained caps at semibold on a muted slate. The
 * older recipe (bold + widest tracking + saturated brand on the text itself)
 * shouted louder than the heading it was introducing.
 *
 * `onDark` is for navy sections, where the rule and text both lift a step.
 *
 * `className` is appended LAST, so a caller can override the text colour for a
 * ground the `onDark` branch was not tuned for. It exists because `onDark`
 * resolves to slate-300, which is tuned for navy: on a brand ground of around
 * L* 46 (hospitality's `#b0532f`) it measures 3.43 against the 4.5 text floor.
 * Omitted, the class string is byte-identical to what this component has always
 * emitted (hospitality R3 GAP 4 / R2 G4, 2026-09-29). The rule mark still
 * follows `onDark`; pass `onDark` with a `className` to lift both.
 */
export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${
        /* slate-600, not slate-500, on light grounds: this eyebrow renders on
           the LeadCTAPanel's tinted panel as well as on white, and slate-500
           measures 4.35 there against a 4.5 floor. slate-600 clears it on both.
           The onDark branch is untouched, because darkening a neutral for light
           grounds is what made four breadcrumbs worse on navy in an earlier
           phase of this programme. */
        onDark ? "text-slate-300" : "text-slate-600"
      }${className ? ` ${className}` : ""}`}
    >
      <EyebrowRule onDark={onDark} />
      {children}
    </p>
  );
}

/**
 * Brand in-body link, for cross-references inside prose.
 *
 * `onDark` lifts the brand from 700 to 400. The default sits at roughly 1.9:1
 * on the slate-900 bands, which is unreadable rather than merely low-contrast;
 * 400 clears AA. Pass it wherever the link is inside a `Prose onDark`.
 */
export function InlineLink({
  href,
  children,
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`font-semibold underline underline-offset-2 ${
        onDark ? "text-primary-400" : "text-primary-700"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Stack of titled cards. `tone` picks the card surface so a section can
 * alternate against a white or slate-50 background. `columns={2}` lays the
 * cards out two-up from `md` instead of one full-width column, which suits
 * an even card count; it stays single column below `md`.
 */
export function CardStack({
  items,
  tone = "slate",
  columns = 1,
  html = false,
}: {
  items: Array<{ title: string; body: string }>;
  tone?: "slate" | "white";
  columns?: 1 | 2;
  /** `body` is already-sanitised HTML (writer copy with inline links), not
   *  plain text. Every existing caller omits this and is unaffected. */
  html?: boolean;
}) {
  const surface = tone === "white" ? "bg-white" : "bg-slate-50";
  const layout =
    columns === 2 ? "grid gap-5 sm:gap-6 md:grid-cols-2" : "space-y-5 sm:space-y-6";
  const bodyClass = "mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700";
  return (
    <div className={`mt-8 sm:mt-10 ${layout}`}>
      {items.map((item) => (
        <div key={item.title} className={`rounded-xl ${surface} p-6 sm:p-8`}>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
          {html ? (
            <p className={bodyClass} dangerouslySetInnerHTML={{ __html: item.body }} />
          ) : (
            <p className={bodyClass}>{item.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}
