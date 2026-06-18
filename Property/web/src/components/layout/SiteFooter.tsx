import Link from "next/link";
import { focusRing, siteContainer } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-4 border-emerald-600 bg-slate-900 text-white">
      <div className={`${siteContainer} py-12 sm:py-16`}>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div className="min-w-0">
            <div className="text-2xl font-bold text-white mb-2">{siteConfig.name}</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
          </div>
          
          <div className="min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {siteConfig.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-400 ${focusRing}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 space-y-4">
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            {siteConfig.company.legalDisclosure}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-slate-400">
              © {year} {siteConfig.company.legalName} t/a {siteConfig.company.tradingName}.
            </p>
            <ConsentToggle className="text-xs text-slate-400 underline hover:text-emerald-400 hover:no-underline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
