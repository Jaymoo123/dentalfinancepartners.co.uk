import Link from "next/link";
import { Home } from "lucide-react";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig, type NavItem } from "@/config/site";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";

type FooterColumn = { title: string; items: Array<{ label: string; href: string }> };

/**
 * Footer columns derived from the primary nav rather than hand-listed, so the
 * footer cannot drift from the header the way the old flat `footer_links` array
 * did (it had gone stale on Calculators, Blog, Incorporation, About, Contact).
 *
 * `nav` arrives as props from PageShell because the Calculators entry is built
 * server-side from the tool registry: importing that registry here would ship
 * every calculator's compute function to the client. Without it we still render,
 * just with a single "All calculators" link.
 */
function buildFooterColumns(nav: NavItem[]): FooterColumn[] {
  const find = (href: string) => nav.find((item) => item.href === href);
  // Keeps the self-referential child ("All services", "Landlord tax guide"):
  // the column headings are not links, so dropping it would leave the hub pages
  // with no footer entry at all.
  const childrenOf = (href: string) => find(href)?.children ?? [];

  const calculators = find("/calculators");
  // One lead calculator per category, in the nav's own most-searched order.
  // Listing all 16 would swamp the column; deriving the heads means a new
  // category shows up here automatically.
  const calcLeads = (calculators?.groups ?? []).map((group) => group.items[0]).filter(Boolean).slice(0, 5);

  return [
    { title: "Services", items: childrenOf("/services") },
    { title: "Resources", items: childrenOf("/landlord-tax") },
    {
      title: "Calculators",
      items: [...calcLeads, { label: "All calculators", href: "/calculators" }],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Locations", href: "/locations" },
        { label: "Book a consultation", href: "/book" },
      ],
    },
  ].filter((column) => column.items.length > 0);
}

export function SiteFooter({ nav }: { nav?: NavItem[] }) {
  const year = new Date().getFullYear();
  const columns = buildFooterColumns(nav ?? siteConfig.nav);
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white">
      <HeroBrickBackdrop />
      <div className={`${siteContainerLg} relative z-10 py-12 sm:py-16`}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16">
          <div className="min-w-0">
            {/* Light footer variant of the brand lockup */}
            <Link
              href="/"
              className={`group inline-flex items-center gap-2 leading-none ${focusRing} rounded-xl`}
            >
              <Home aria-hidden strokeWidth={2.25} className="h-6 w-6 shrink-0 text-emerald-400" />
              <span className="flex min-w-0 flex-col leading-none">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm sm:tracking-[0.2em]">
                  Property
                </span>
                <span aria-hidden className="mt-0.5 h-0.5 w-full bg-emerald-400 sm:mt-1" />
                <span className="pt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-white sm:pt-2 sm:text-xs sm:tracking-[0.38em]">
                  Accountants UK
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer" className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="min-w-0">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4">
                  {column.title}
                </p>
                {/* space-y-2 + py-0.5 rather than space-y-3 and no padding: the
                    gap between the links is unchanged at 12px, but each link's
                    hit area grows from 20px to 24px, which is the WCAG 2.5.8
                    minimum. The footer is the densest set of tap targets on the
                    site and every one of them was under it. */}
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`inline-flex items-center py-0.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors ${focusRing} rounded`}
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

        <div className="mt-10 pt-6 border-t border-white/10 space-y-4">
          {/* Legal/secondary row. `footer_links` is now scoped to exactly these:
              the primary link columns above come from the nav. */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.footer.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-xs font-semibold text-slate-400 hover:text-white transition-colors ${focusRing} rounded`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {/* Build credit, after sidekickaccounting.co.uk. Two departures from
                their version, both forced by this footer's dark ground:
                the gradient is on permanently (theirs reveals on hover, which
                on navy just read as a colour that never arrived), and the stops
                are lightened from #3e40d6/#f2772a to indigo-400/orange-400 so
                the text clears contrast at this size. Hover keeps their glow.
                ml-auto pushes it clear of the legal links so it reads as a
                credit rather than a fourth policy link. */}
            <li className="w-full pt-1 sm:ml-auto sm:w-auto sm:pt-0">
              <a
                href="https://www.doublewiredcreative.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Website design and build by Double Wired Creative"
                className={`bg-gradient-to-r from-[#818cf8] to-[#fb923c] bg-clip-text text-xs font-semibold text-transparent transition-all duration-200 hover:[text-shadow:0_0_6px_rgba(129,140,248,0.35),0_0_6px_rgba(251,146,60,0.35)] ${focusRing} rounded`}
              >
                Built by Double Wired Creative
              </a>
            </li>
          </ul>
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            {siteConfig.company.legalDisclosure}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-slate-400">
              © {year} {siteConfig.company.legalName} t/a {siteConfig.company.tradingName}.
            </p>
            {/* inline-block + py-1 lifts this from a 16px hit area to 24px. */}
            <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
