import Link from "next/link";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { UnionJack } from "@/components/brand/UnionJack";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = siteConfig.footer;
  const colSize = Math.ceil(links.length / 3);
  const col1 = links.slice(0, colSize);
  const col2 = links.slice(colSize, colSize * 2);
  const col3 = links.slice(colSize * 2);

  return (
    <footer className="border-t border-neutral-200 bg-[#fafaf9]">
      {/* Proudly British strip */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className={`${siteContainerLg} py-3`}>
          <div className="flex items-center gap-2.5">
            <UnionJack width={20} aria-label="Union Jack flag" />
            <p className="text-xs text-neutral-500">
              Proudly British. Serving British construction businesses.
            </p>
          </div>
        </div>
      </div>
      <div className={`${siteContainerLg} pt-16 pb-10 sm:pt-20 sm:pb-12`}>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div className="min-w-0">
            <div className="font-mono text-xs uppercase tracking-widest text-orange-600">
              {siteConfig.company.legalName}
            </div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-neutral-900">
              {siteConfig.name}
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-sm text-neutral-500">
              <Link
                href="/contact"
                className={`text-orange-600 hover:text-orange-700 underline underline-offset-2 ${focusRing}`}
              >
                Contact us
              </Link>
            </p>
          </div>

          {[col1, col2, col3].map((col, i) => (
            <div key={i} className="min-w-0">
              <ul className="space-y-3">
                {col.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm text-neutral-600 transition-colors hover:text-neutral-900 ${focusRing}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-6 space-y-4">
          <p className="max-w-3xl text-xs leading-relaxed text-neutral-500">
            {siteConfig.company.legalDisclosure}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-500">
              &copy; {year} {siteConfig.company.legalName} t/a {siteConfig.company.tradingName}.
            </p>
            <p className="text-xs text-neutral-500">
              Specialist CIS accountants. Editorial content only. Book a call for advice specific to your situation.
            </p>
          </div>
          <p className="text-xs text-neutral-400">
            <ConsentToggle className="underline hover:no-underline text-neutral-400 hover:text-neutral-600" />
          </p>
        </div>
      </div>
    </footer>
  );
}
