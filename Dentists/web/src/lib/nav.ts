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
import { siteConfig } from "@/config/site";
import { allTools, toolPath } from "./tools/registry";

/**
 * Categories in registry order (first appearance wins) rather than an explicit
 * ranking table: the registry array is already grouped and ordered by category,
 * so a second ordering constant would be a thing to keep in sync for no gain.
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

/**
 * Children for the two hub entries. Dentists' niche.navigation is entirely
 * flat, and the kit footer derives its Services and Resources columns from
 * nav[].children, dropping any column with zero items. Without these the
 * footer silently renders two columns instead of four.
 *
 * The self-referential first child is deliberate: the kit's column headings are
 * not links, so dropping it would leave the hub itself with no footer entry.
 *
 * ponytail: hand-listed labels rather than a data-model change. Neither
 * ServiceSubPage nor GuideFrontmatter carries a short nav-label field, and the
 * `title` fields are long SEO titles that read badly as nav labels. Adding a
 * field would touch 11 content files for nothing. The guard test in
 * src/tests/nav-derivation.test.ts is what stops these drifting.
 */
export const SERVICE_NAV_CHILDREN: NavItem["children"] = [
  { label: "All services", href: "/services" },
  { label: "Dental accountants", href: "/services/dental-accountants" },
  { label: "Practice accounting", href: "/services/practice-accounting" },
  { label: "Associate tax", href: "/services/associate-tax" },
  { label: "Practice valuation", href: "/services/practice-valuation" },
  { label: "Locum dentist tax", href: "/services/locum-dentist-tax" },
];

export const GUIDE_NAV_CHILDREN: NavItem["children"] = [
  { label: "All guides", href: "/dental-guides" },
  { label: "Associate tax survival guide", href: "/dental-guides/associate-tax-survival-guide" },
  {
    label: "Goodwill valuation and sale",
    href: "/dental-guides/goodwill-valuation-and-sale-playbook",
  },
  { label: "NHS contract essentials", href: "/dental-guides/nhs-contract-essentials-for-dentists" },
  {
    label: "NHS pension essentials",
    href: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
  },
  {
    label: "Profit extraction: partnership vs ltd",
    href: "/dental-guides/practice-profit-extraction-partnership-vs-ltd",
  },
  {
    label: "Practice purchase due diligence",
    href: "/dental-guides/practice-purchase-financial-due-diligence",
  },
];

const CHILDREN_BY_HREF: Record<string, NavItem["children"]> = {
  "/services": SERVICE_NAV_CHILDREN,
  "/dental-guides": GUIDE_NAV_CHILDREN,
};

export function buildPrimaryNav(): NavItem[] {
  // siteConfig.nav, not niche.navigation: it is the variant-filtered list the
  // site renders today (hide_in_packages drops out in packages mode).
  const nav = siteConfig.nav.map((item) => {
    const children = CHILDREN_BY_HREF[item.href];
    return children ? { label: item.label, href: item.href, children } : { label: item.label, href: item.href };
  });
  return buildPrimaryNavFrom(nav, calculatorNavGroups());
}
