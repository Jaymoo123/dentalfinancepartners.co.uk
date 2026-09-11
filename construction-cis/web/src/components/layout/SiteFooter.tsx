import Link from "next/link";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/lib/nav";
import { UnionJack } from "@/components/brand/UnionJack";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";

type FooterColumn = { title: string; items: Array<{ label: string; href: string }> };

/** Legal/secondary row. Everything else in footer_links feeds the columns above. */
const LEGAL_HREFS = ["/privacy-policy", "/terms", "/cookie-policy"];

/**
 * Which column each destination belongs in. The LABELS are never retyped here:
 * every item's label comes from the nav or from `footer_links`, so renaming a
 * surface in niche.config.json renames it in the footer too. Only the grouping is
 * declared, because Trade's nav is flat (7 items, no children), so there are no
 * `children` arrays to derive the columns from the way Property does.
 *
 * Anything whose href resolves to neither source is dropped rather than rendered
 * with a placeholder label, so the footer cannot emit a dead or unlabelled link.
 */
const COLUMN_HREFS: Array<{ title: string; hrefs: string[] }> = [
  { title: "Services", hrefs: ["/services", "/cis-refund", "/gross-payment-status", "/for"] },
  { title: "Resources", hrefs: ["/blog", "/glossary", "/research"] },
  { title: "Company", hrefs: ["/about", "/contact", "/locations", "/book"] },
];

/**
 * Labels for routes that exist but appear in neither the nav nor footer_links.
 * Both are live pages (src/app/research/page.tsx, src/app/book/page.tsx).
 */
const EXTRA_LABELS: Record<string, string> = {
  "/research": "Research",
  "/book": "Book a consultation",
};

/**
 * Footer columns derived from the nav plus the calculator registry, never
 * hand-listed: the old flat `Math.ceil(length / 3)` split silently reordered every
 * column whenever the array changed length, and carried no headings at all.
 *
 * `nav` arrives as props from PageShell because the Calculators entry is built
 * server-side from the tool registry. Without it we still render, just with a
 * single "All calculators" link.
 */
function buildFooterColumns(nav: NavItem[]): FooterColumn[] {
  const labels = new Map<string, string>([
    ...siteConfig.footer.map((item) => [item.href, item.label] as const),
    // The nav wins on a shared href: it is the label the header shows.
    ...nav.map((item) => [item.href, item.label] as const),
    ...Object.entries(EXTRA_LABELS),
  ]);

  const columns: FooterColumn[] = COLUMN_HREFS.map(({ title, hrefs }) => ({
    title,
    items: hrefs
      .filter((href) => labels.has(href))
      .map((href) => ({ label: labels.get(href)!, href })),
  }));

  // One lead calculator per category, in the nav's own order. Listing all 12 would
  // swamp the column; deriving the heads means a new category shows up here
  // automatically.
  const calcLeads = (nav.find((item) => item.href === "/calculators")?.groups ?? [])
    .map((group) => group.items[0])
    .filter(Boolean)
    .slice(0, 5);

  columns.splice(2, 0, {
    title: "Calculators",
    items: [...calcLeads, { label: "All calculators", href: "/calculators" }],
  });

  return columns.filter((column) => column.items.length > 0);
}

export function SiteFooter({ nav }: { nav?: NavItem[] }) {
  const year = new Date().getFullYear();
  const columns = buildFooterColumns(nav ?? (siteConfig.nav as NavItem[]));
  const legal = siteConfig.footer.filter((item) => LEGAL_HREFS.includes(item.href));

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white">
      <TradeBackdrop />
      {/* Proudly British strip. Owner-visible brand asset, kept as the footer's top
          hairline row and restyled for the navy ground. */}
      <div className="relative z-10 border-b border-white/10">
        <div className={`${siteContainerLg} py-3`}>
          <div className="flex items-center gap-2.5">
            <UnionJack width={20} aria-label="Union Jack flag" />
            <p className="text-xs text-slate-400">
              Proudly British. Serving British construction businesses.
            </p>
          </div>
        </div>
      </div>
      <div className={`${siteContainerLg} relative z-10 py-12 sm:py-16`}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16">
          <div className="min-w-0">
            <BrandWordmarkHomeLink size="footer" tone="navy" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer" className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="min-w-0">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-400 sm:text-sm">
                  {column.title}
                </p>
                {/* space-y-2 + py-0.5 rather than space-y-3 and no padding: the gap
                    between links is unchanged at 12px, but each link's hit area
                    grows from 20px to 24px, the WCAG 2.5.8 minimum. */}
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`inline-flex items-center py-0.5 text-sm font-semibold text-slate-300 transition-colors hover:text-white ${focusRing} rounded`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 space-y-4 border-t border-white/10 pt-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-xs font-semibold text-slate-400 transition-colors hover:text-white ${focusRing} rounded`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            {siteConfig.company.legalDisclosure}
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            Specialist CIS accountants. Editorial content only. Book a call for advice specific to
            your situation.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-slate-400">
              &copy; {year} {siteConfig.company.legalName} t/a {siteConfig.company.tradingName}.
            </p>
            {/* inline-block + py-1 lifts this from a 16px hit area to 24px. The old
                text-neutral-400 on #fafaf9 measured 2.42, a live contrast failure. */}
            <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
