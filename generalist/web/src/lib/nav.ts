/**
 * Primary nav, built server-side.
 *
 * The Calculators entry is derived from the tool registry, never hand-listed in
 * niche.config.json: the registry is the single source of truth for the fleet,
 * and a duplicate list in JSON drifts the moment someone adds a calculator.
 *
 * Server-side only by construction: importing the registry pulls in every
 * tool's compute function, so this must not be imported from a client
 * component. layout.tsx calls buildPrimaryNav() and passes the plain result
 * down to PageShell as props.
 */
import {
  buildPrimaryNav as buildPrimaryNavFrom,
  type CalculatorNavGroup,
  type NavItem,
} from "@accounting-network/web-shared/design/chrome/nav";
import { niche } from "@/config/niche-loader";
import { allTools, toolPath } from "./tools/registry";

/**
 * Categories in registry order (first appearance wins) rather than an explicit
 * ranking table: the registry array is already grouped and ordered by category,
 * so a second ordering constant would be a thing to keep in sync for no gain.
 * A new category therefore appears in the nav automatically, where its tools
 * sit in the registry.
 */
export function calculatorNavGroups(): CalculatorNavGroup[] {
  const byCategory = new Map<string, CalculatorNavGroup["items"]>();
  for (const tool of allTools()) {
    const items = byCategory.get(tool.category) ?? [];
    items.push({ label: tool.name, href: toolPath(tool.slug) });
    byCategory.set(tool.category, items);
  }
  return [...byCategory].map(([category, items]) => ({ category, items }));
}

export function buildPrimaryNav(): NavItem[] {
  return buildPrimaryNavFrom(niche.navigation as NavItem[], calculatorNavGroups());
}
