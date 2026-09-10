/**
 * Server-side primary nav for Medical Accountants UK.
 *
 * SERVER ONLY BY CONSTRUCTION. This module imports the tool registry, and the
 * registry pulls in every calculator's compute function. Call buildPrimaryNav()
 * from the root layout (a server component) and pass the plain result down as a
 * prop; importing this file from a "use client" component would ship the whole
 * fleet's maths to every page.
 *
 * The header and the footer both consume the SAME returned array (the kit's
 * SiteFooter derives its columns from it), so the two cannot drift.
 */
import { niche } from "@/config/niche-loader";
import { getActiveNav, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import {
  buildPrimaryNav as attachCalculatorGroups,
  type CalculatorNavGroup,
  type NavItem,
} from "@accounting-network/web-shared/design/chrome/nav";
import { genericTools, toolPath } from "@/lib/tools/registry";

export type { CalculatorNavGroup, NavItem };

/**
 * Most-searched first, not alphabetical. A category present in the registry but
 * missing here still renders, appended in registry order, so a new calculator
 * can never fall out of the nav.
 */
const CATEGORY_ORDER = ["Income Tax", "NHS Pension", "Expenses", "Incorporation"];

/**
 * The Calculators panel, derived from the registry rather than hand-listed in
 * niche.config.json: a duplicate list in JSON drifts the moment someone adds a
 * tool. Premium tools are deliberately absent — they are client islands with no
 * route of their own (lib/tools/premium/registry.ts), so linking them would
 * publish hrefs that 404.
 */
export function calculatorNavGroups(): CalculatorNavGroup[] {
  const byCategory = new Map<string, CalculatorNavGroup["items"]>();

  for (const tool of genericTools()) {
    const items = byCategory.get(tool.category) ?? [];
    // "NHS Pension Annual Allowance Calculator" is too long for a menu row; the
    // panel heading already says Calculators.
    items.push({ label: tool.name.replace(/ Calculator$/, ""), href: toolPath(tool.slug) });
    byCategory.set(tool.category, items);
  }

  return [...byCategory.keys()]
    .sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      return (
        (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi)
      );
    })
    .map((category) => ({ category, items: byCategory.get(category)! }));
}

export function buildPrimaryNav(): NavItem[] {
  // getActiveNav only filters TOP-LEVEL hide_in_packages items. /free-practice-
  // health-check carries that flag and now lives one level down (Who we help),
  // so the same filter is applied to children here or the flag goes silently
  // inert the day the site is switched to packages mode.
  const packages = isPackagesMode(niche as never);
  const nav = (getActiveNav(niche as never) as NavItem[]).map((item) =>
    packages && item.children
      ? {
          ...item,
          children: item.children.filter(
            (child) => !(child as { hide_in_packages?: boolean }).hide_in_packages,
          ),
        }
      : item,
  );

  return attachCalculatorGroups(nav, calculatorNavGroups());
}
