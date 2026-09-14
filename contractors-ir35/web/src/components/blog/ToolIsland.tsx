import Link from "next/link";
import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { toolPath } from "@/lib/calculators/registry";
import { btnPrimary } from "@/components/ui/layout-utils";

/**
 * Early tool island (capture moment 1): a plain server-rendered card injected
 * after the first h2, linking to the category's best-fit free calculator.
 * Resolved via earlyToolForBlogSlug() in lib/intent/taxonomy.ts.
 *
 * ponytail: pure link card, no client JS and no new analytics events --
 * tool-page events fire on the calculator itself once the reader clicks through.
 */
export function ToolIsland({ tool }: { tool: GenericTool }) {
  return (
    <aside
      className="not-prose my-10 rounded-lg border border-cyan-200 bg-cyan-50 p-6 sm:p-8"
      aria-label={`Free calculator: ${tool.name}`}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
        Free calculator
      </p>
      <p className="mt-2 text-xl font-bold text-neutral-900">{tool.name}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{tool.oneLiner}</p>
      <Link
        href={toolPath(tool.slug)}
        className={`mt-4 ${btnPrimary}`}
      >
        Run the numbers
      </Link>
    </aside>
  );
}
