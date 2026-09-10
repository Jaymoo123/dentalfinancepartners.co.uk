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
import { getActiveNav } from "@accounting-network/web-shared/lib/niche-config";
import { niche } from "@/config/niche-loader";
import { allTools, toolPath } from "./tools/registry";

/**
 * Groups run biggest-fleet-first rather than in registry order, matching
 * Property: the footer's Calculators column takes the head of each group, so
 * the order decides which five tools the whole site links to from every page.
 * A category added to the registry but missing here still appears, appended in
 * registry order, so a new tool can never fall out of the nav.
 */
const CATEGORY_ORDER = [
  "Practice Finance",
  "LLP / Partnership",
  "SRA Compliance",
  "Income Tax",
  "Succession & Sale",
];

export function calculatorNavGroups(): CalculatorNavGroup[] {
  const byCategory = new Map<string, CalculatorNavGroup["items"]>();
  for (const tool of allTools()) {
    const items = byCategory.get(tool.category) ?? [];
    items.push({ label: tool.name, href: toolPath(tool.slug) });
    byCategory.set(tool.category, items);
  }
  const rank = (c: string) => {
    const i = CATEGORY_ORDER.indexOf(c);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return [...byCategory]
    .sort(([a], [b]) => rank(a) - rank(b))
    .map(([category, items]) => ({ category, items }));
}

export function buildPrimaryNav(): NavItem[] {
  return buildPrimaryNavFrom(getActiveNav(niche) as NavItem[], calculatorNavGroups());
}
