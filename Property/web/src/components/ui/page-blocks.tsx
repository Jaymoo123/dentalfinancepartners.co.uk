import Link from "next/link";
import type { ReactNode } from "react";
import { EyebrowRule } from "@/components/ui/EyebrowRule";

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
 * The mark carries the brand colour so the words do not have to: an emerald
 * rule, then the label in restrained caps at semibold on a muted slate. The
 * older recipe (bold + widest tracking + saturated emerald on the text itself)
 * shouted louder than the heading it was introducing.
 *
 * `onDark` is for navy sections, where the rule and text both lift a step.
 */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${
        onDark ? "text-slate-300" : "text-slate-500"
      }`}
    >
      <EyebrowRule onDark={onDark} />
      {children}
    </p>
  );
}

/**
 * Emerald in-body link, for cross-references inside prose.
 *
 * `onDark` lifts the emerald from 700 to 400. The default sits at roughly 1.9:1
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
        onDark ? "text-emerald-400" : "text-emerald-700"
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
}: {
  items: Array<{ title: string; body: string }>;
  tone?: "slate" | "white";
  columns?: 1 | 2;
}) {
  const surface = tone === "white" ? "bg-white" : "bg-slate-50";
  const layout =
    columns === 2 ? "grid gap-5 sm:gap-6 md:grid-cols-2" : "space-y-5 sm:space-y-6";
  return (
    <div className={`mt-8 sm:mt-10 ${layout}`}>
      {items.map((item) => (
        <div key={item.title} className={`rounded-xl ${surface} p-6 sm:p-8`}>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
