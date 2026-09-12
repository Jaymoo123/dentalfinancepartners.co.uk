import type { ReactNode } from "react";

/**
 * One body section of a research page.
 *
 * Was defined four times, byte-identically, at the top of each
 * `/research/<slug>/page.tsx`. Lifted here so a chrome change is one edit, not
 * four. `scroll-mt-24` stays on the section itself: every heading here is an
 * in-page anchor target and the header is `sticky top-0`, so without it the
 * jump parks the heading underneath the header.
 */
export function ResearchSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

/**
 * A chart or a table, in the site's figure card.
 *
 * Was `not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6`, repeated
 * nine times across the four pages. `rounded-xl` plus the hairline ring is the
 * shipped recipe (Property's FigureCard); the card takes slate-50 against the
 * white body so it has an edge without a border.
 *
 * `caption` is a VISIBLE string, not `sr-only`: chart values are only reachable
 * to a screen reader through the adjacent table or this text, and sr-only text
 * is published, indexable text either way. No `role="img"` and no `aria-hidden`
 * is set here or in any chart component, deliberately (PHASE6_PLAN B7).
 */
export function FigureCard({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="not-prose mt-6 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 sm:p-6">
      {caption ? <p className="mb-3 text-xs text-neutral-600">{caption}</p> : null}
      {children}
    </div>
  );
}

/**
 * A scrollable data table. `overflow-x-auto` so a wide table scrolls inside its
 * own box instead of scrolling the page body.
 */
export function DataTableWrap({ children }: { children: ReactNode }) {
  return <div className="not-prose mt-4 overflow-x-auto">{children}</div>;
}
