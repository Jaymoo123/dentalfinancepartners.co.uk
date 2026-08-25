/**
 * Primary-nav item shared by PageShell, SiteHeader and SiteFooter. Same shape
 * as Property's `@/config/site` `NavItem` (T4: declared locally rather than
 * imported, since that module lives outside web-shared).
 *
 * `children` turns it into a flat dropdown in SiteHeader; `groups` turns it
 * into a wider, category-grouped panel (used by Calculators, where a flat
 * list of the whole fleet would run off the bottom of the screen). Set one
 * or the other, not both.
 */
export type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
  groups?: Array<{ category: string; items: Array<{ label: string; href: string }> }>;
};

/** Same shape as Property's `@/lib/calculators/nav` `CalculatorNavGroup`. */
export type CalculatorNavGroup = {
  category: string;
  items: Array<{ label: string; href: string }>;
};

/**
 * Primary nav with the Calculators fleet attached.
 *
 * Property's original read two module-level singletons: `getActiveNav(niche)`
 * from `@/config/niche-loader` (the packages-mode-filtered nav list) and
 * `calculatorNavGroups()` from `@/lib/calculators/nav` (itself backed by the
 * per-site tool registry, which must never reach a client bundle). Both are
 * per-site by definition, so per T4 this is now a pure function taking their
 * outputs as arguments instead of reading either module.
 *
 * The caller keeps the same server-side-only discipline Property's comment
 * described: compute `nav` and `calculatorGroups` in a server component or
 * server module, then pass the plain result down as props, so the tool
 * registry's compute functions never ship to the client.
 */
export function buildPrimaryNav(nav: NavItem[], calculatorGroups: CalculatorNavGroup[]): NavItem[] {
  return nav.map((item) => (item.href === "/calculators" ? { ...item, groups: calculatorGroups } : item));
}
