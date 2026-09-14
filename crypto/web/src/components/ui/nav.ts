/**
 * Primary nav, built server-side.
 *
 * SERVER-ONLY BY CONSTRUCTION: this imports the calculator registry, which
 * pulls in every tool's compute function. layout.tsx calls buildPrimaryNav()
 * and passes the plain result down to the client shell as a prop, so the
 * registry never reaches the client bundle. Never import this from a "use
 * client" module.
 *
 * Children are DERIVED from the data that generates the routes
 * (`cryptoServices` -> /services/[slug], `cryptoHubs` -> /for/[slug], the tool
 * registry -> /calculators/[slug]), never hand-listed, so the header and the
 * kit footer's columns cannot emit a link to a route that does not exist.
 *
 * Sibling sites keep this at src/lib/nav.ts. It lives under components/ only
 * because src/lib is not this work package's to touch.
 */
import {
  buildPrimaryNav as buildPrimaryNavFrom,
  type CalculatorNavGroup,
  type NavItem,
} from "@accounting-network/web-shared/design/chrome/nav";
import { niche } from "@/config/niche-loader";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { cryptoServices } from "@/data/crypto-services";
import { cryptoHubs } from "@/data/crypto-hubs";

/**
 * Categories in registry order (first appearance wins): the registry array is
 * already grouped and ordered, so a second ordering constant would be a thing
 * to keep in sync for no gain.
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
  // The self-referential hub link is kept first on purpose: the kit's footer
  // column headings are not links, so dropping it would leave /services and
  // /for with no footer entry at all.
  const withChildren = (niche.navigation as NavItem[]).map((item) => {
    if (item.href === "/services") {
      return {
        ...item,
        children: [
          { label: "All services", href: "/services" },
          ...cryptoServices.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
        ],
      };
    }
    if (item.href === "/for") {
      return {
        ...item,
        children: [
          { label: "Who we help", href: "/for" },
          ...cryptoHubs.map((h) => ({ label: h.title, href: `/for/${h.slug}` })),
        ],
      };
    }
    return item;
  });
  return buildPrimaryNavFrom(withChildren, calculatorNavGroups());
}
