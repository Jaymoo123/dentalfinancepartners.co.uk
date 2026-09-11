import Link from "next/link";
import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { toolPath } from "@/lib/calculators/registry";

/**
 * Early tool island (capture moment 1): a plain server-rendered card injected
 * after the first h2, linking to the category's best-fit free calculator.
 * Resolved via EARLY_TOOL_BY_CATEGORY in lib/intent/taxonomy.ts.
 *
 * ponytail: pure link card, no client JS and no new analytics events —
 * tool-page events fire on the calculator itself once the reader clicks through.
 */
export function ToolIsland({ tool }: { tool: GenericTool }) {
  return (
    <aside
      className="not-prose my-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
      aria-label={`Free calculator: ${tool.name}`}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
        Free calculator
      </p>
      <p className="mt-2 text-xl font-bold text-neutral-900">{tool.name}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{tool.oneLiner}</p>
      {/* Ground is --btn-ground (5.18 on the white label). It was bg-orange-600,
          which renders #f54900 as a utility and measures 3.60: below the 4.5
          text floor, on every mapped-category article.
          `text-white` only actually wins because globals.css now declares
          `.prose-blog a` inside @layer components (trap T30): while that rule was
          unlayered it beat this utility and painted the label #c2410c on #c2410c.
          `no-underline` is the same mechanism, for the decoration the prose rule
          still sets. Do NOT unlayer that block. */}
      <Link
        href={toolPath(tool.slug)}
        className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--btn-ground)] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        Run the numbers
      </Link>
    </aside>
  );
}
