import type { ReactNode } from "react";

import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";

/**
 * Headline stat tile.
 *
 * Lives in the BODY on a light ground, not in the dark hero. The values are
 * the citable part of a research page and were previously set in white on
 * navy at 3xl, which reads as decoration on the hero rather than as the
 * finding. `text-primary-800` on `slate-50` measures 6.99:1.
 */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <div className="text-3xl font-bold tabular-nums text-primary-800 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

/**
 * Page body section. Each one is a real full-bleed band with its own ground,
 * set by the caller. The previous version was a `border-t first:border-t-0`
 * divider inside one white slab, so the whole page read as a single surface
 * and the oscillation the rest of the site uses to separate ideas was absent.
 */
export function Section({
  id,
  title,
  tone = "white",
  children,
}: {
  id: string;
  title: string;
  /** Section ground. Alternate it down the page. */
  tone?: "white" | "slate";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${sectionY} ${tone === "slate" ? "bg-slate-50" : "bg-white"}`}
    >
      <div className={siteContainerLg}>
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
          <Prose>{children}</Prose>
        </div>
      </div>
    </section>
  );
}

/**
 * Wrapper for a chart or a data table.
 *
 * Charts sat bare on the section ground before, so a figure and the prose
 * around it were the same surface. The card tone OPPOSES its section, which is
 * what makes the figure read as a held object rather than more page.
 *
 * `source` is mandatory: every figure on these pages is re-derivable from a
 * named official release, and the note is what says so on the figure itself
 * rather than only in the methodology section at the bottom.
 */
export function FigureCard({
  tone = "white",
  source,
  children,
}: {
  /** Card surface. Pass the OPPOSITE of the section's `tone`. */
  tone?: "white" | "slate";
  /** Publisher(s) behind the figures shown, rendered as the figure's note. */
  source: string;
  children: ReactNode;
}) {
  return (
    <figure
      className={`not-prose mt-6 rounded-xl p-4 ring-1 ring-slate-200 sm:p-6 ${
        tone === "slate" ? "bg-slate-50" : "bg-white"
      }`}
    >
      {children}
      <figcaption className="mt-4">
        <ExampleFigureNote label={`Source: ${source}`} />
      </figcaption>
    </figure>
  );
}
