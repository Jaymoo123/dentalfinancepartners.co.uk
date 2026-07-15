import Link from "next/link";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = siteConfig.footer;

  return (
    <footer className="border-t border-neutral-200 bg-[#fafaf9]">
      <div className={`${siteContainerLg} pb-10 pt-16 sm:pb-12 sm:pt-20`}>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div className="min-w-0">
            <div className="text-xl font-semibold tracking-tight text-neutral-900">{siteConfig.name}</div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">{siteConfig.description}</p>
            <p className="mt-6 text-sm">
              <Link
                href="/contact"
                className={`text-[#1a5c4a] underline underline-offset-2 hover:text-[#154a3b] ${focusRing}`}
              >
                Contact us
              </Link>
            </p>
          </div>

          <div className="min-w-0">
            <ul className="space-y-3">
              {links.slice(0, Math.ceil(links.length / 2)).map((item) => (
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

          <div className="min-w-0">
            <ul className="space-y-3">
              {links.slice(Math.ceil(links.length / 2)).map((item) => (
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
        </div>

        <div className="mt-16 space-y-3 border-t border-neutral-200 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-neutral-500">
            {siteConfig.company.legalDisclosure}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-500">
              &copy; {year} {siteConfig.company.legalName} t/a {siteConfig.company.tradingName}.
            </p>
            <p className="text-xs text-neutral-500">
              Specialist charity accountants. Editorial content only. Speak to us for advice specific to your
              organisation.
            </p>
          </div>
          <p className="text-xs text-neutral-500">
            <ConsentToggle className="underline hover:no-underline text-neutral-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
