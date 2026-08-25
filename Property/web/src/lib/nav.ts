import { type NavItem } from "@/config/site";
import { niche, getActiveNav } from "@/config/niche-loader";
import { calculatorNavGroups } from "@/lib/calculators/nav";

/**
 * Primary nav with the Calculators fleet attached.
 *
 * Called from the root layout (a server component) and passed down as plain
 * props, so the tool registry never reaches the client bundle — SiteHeader is
 * "use client", and importing the registry there would ship every calculator's
 * compute function to every page.
 *
 * Reads getActiveNav(niche) rather than siteConfig.nav so the packages-mode
 * `hide_in_packages` filter survives the move to a server-built nav.
 */
export function buildPrimaryNav(): NavItem[] {
  const groups = calculatorNavGroups();

  return (getActiveNav(niche) as NavItem[]).map((item) =>
    item.href === "/calculators" ? { ...item, groups } : item,
  );
}
