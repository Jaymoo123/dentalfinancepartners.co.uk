import { TOOLS, toolPath } from "./registry";

/**
 * The Calculators nav dropdown, derived from the tool registry.
 *
 * Deliberately NOT hand-listed in niche.config.json: the registry is the single
 * source of truth for the fleet ("adding a tool is one import + one array
 * entry"), and a duplicate list in JSON would silently drift the moment someone
 * adds a calculator. Adding a tool to the registry now puts it in the nav too.
 *
 * Server-side only by construction: importing the registry pulls in every tool's
 * compute function, so this must not be imported from a client component. The
 * layout calls buildPrimaryNav() and passes the plain result down as props.
 */
export type CalculatorNavGroup = {
  category: string;
  items: Array<{ label: string; href: string }>;
};

/**
 * Groups run most-searched first rather than alphabetically: a reader opening
 * this menu is far likelier to want income tax or stamp duty than a compliance
 * checker. Any category added to the registry but missing here still appears,
 * appended in registry order, so a new tool can never fall out of the nav.
 */
const CATEGORY_ORDER = [
  "Income tax",
  "Stamp duty",
  "Capital gains tax",
  "Incorporation",
  "Portfolio",
  "Compliance",
];

export function calculatorNavGroups(): CalculatorNavGroup[] {
  const byCategory = new Map<string, CalculatorNavGroup["items"]>();

  for (const tool of TOOLS) {
    const items = byCategory.get(tool.category) ?? [];
    // Their vendored stub of toolPath took a Tool; the real shared helper takes
    // a slug (packages/web-shared/tools/registry-helpers.ts:22). Same output.
    items.push({ label: tool.name, href: toolPath(tool.slug) });
    byCategory.set(tool.category, items);
  }

  const ranked = [...byCategory.keys()].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    // Unknown categories sort last, keeping their relative registry order.
    return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
  });

  return ranked.map((category) => ({ category, items: byCategory.get(category)! }));
}
