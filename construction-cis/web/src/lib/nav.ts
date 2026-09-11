import { niche } from "@/config/niche-loader";
import { getActiveNav } from "@accounting-network/web-shared/lib/niche-config";
import { TOOLS, toolPath } from "@/lib/calculators/registry";

/**
 * Nav shape for the chrome. The shared NicheConfig navigation type carries
 * `children` but not `groups`, and the Calculators fleet is grouped by category,
 * so the superset lives here rather than in niche.config.json.
 */
export type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
  groups?: Array<{ category: string; items: Array<{ label: string; href: string }> }>;
};

/**
 * Category order for the Calculators dropdown: refunds first because that is the
 * site's lead intent, then compliance, then the explainers. A category added to
 * the registry but missing here still appears, appended in registry order, so a
 * new tool can never fall out of the nav.
 */
const CATEGORY_ORDER = ["CIS Refunds", "CIS Compliance", "CIS Basics", "CIS Comparisons"];

export function calculatorNavGroups(): NonNullable<NavItem["groups"]> {
  const byCategory = new Map<string, Array<{ label: string; href: string }>>();

  for (const tool of TOOLS) {
    const items = byCategory.get(tool.category) ?? [];
    items.push({ label: tool.name, href: toolPath(tool.slug) });
    byCategory.set(tool.category, items);
  }

  const ranked = [...byCategory.keys()].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    return (
      (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi)
    );
  });

  return ranked.map((category) => ({ category, items: byCategory.get(category)! }));
}

/**
 * Primary nav with the Calculators fleet attached.
 *
 * Called from the root layout (a server component) and passed down as plain
 * props, so the tool registry never reaches the client bundle: SiteHeader is
 * "use client", and importing the registry there would ship every calculator's
 * compute function to every page.
 *
 * Reads getActiveNav(niche) rather than siteConfig.nav so the packages-mode
 * `hide_in_packages` filter survives the move to a server-built nav.
 */
export function buildPrimaryNav(): NavItem[] {
  const groups = calculatorNavGroups();

  // The desktop trigger is a button, not a link, so /calculators itself must stay
  // reachable: the grouped panel carries a "View all calculators" footer link to
  // item.href, and the drawer renders item.href as its parent link.
  return (getActiveNav(niche) as NavItem[]).map((item) =>
    item.href === "/calculators" ? { ...item, groups } : item,
  );
}
