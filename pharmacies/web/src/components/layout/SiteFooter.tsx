import Link from "next/link";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-[#0f3a4a] text-white">
      <div className={`${siteContainerLg} py-12 sm:py-16`}>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div className="min-w-0">
            <div className="text-xl font-semibold text-white">{siteConfig.name}</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">Quick links</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {siteConfig.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors ${focusRing}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-white/50">
            {siteConfig.company.legalDisclosure}
          </p>
          <p className="mt-3 text-xs text-white/50">
            &copy; {year} {siteConfig.company.legalName} t/a {siteConfig.company.tradingName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
