import Link from "next/link";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { focusRing, siteContainer } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--navy)] bg-[var(--navy)] text-slate-100">
      <div className={`${siteContainer} py-10 sm:py-14`}>
        {/* Sister Sites */}
        <div className="mb-10 pb-10 border-b border-white/20">
          <h2 className="text-lg font-semibold text-white mb-4">Our Specialist Accounting Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.dentalfinancepartners.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg bg-white/10 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 ${focusRing}`}
            >
              <h3 className="font-semibold text-white">Dental Finance Partners</h3>
              <p className="mt-1 text-sm text-white/70">Specialist accounting for dental practices</p>
            </a>
            <a
              href="https://www.propertytaxpartners.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg bg-white/10 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 ${focusRing}`}
            >
              <h3 className="font-semibold text-white">Property Tax Partners</h3>
              <p className="mt-1 text-sm text-white/70">Property investor &amp; landlord accounting</p>
            </a>
            <a
              href="https://www.accountsforlawyers.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg bg-white/10 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 ${focusRing}`}
            >
              <h3 className="font-semibold text-white">Accounts for Lawyers</h3>
              <p className="mt-1 text-sm text-white/70">Specialist accounting for solicitors &amp; law firms</p>
            </a>
          </div>
        </div>

        <div className="grid gap-10 min-[480px]:grid-cols-2 md:gap-12">
          <div className="min-w-0">
            <div className="inline-block rounded-lg bg-white px-4 py-2.5 shadow-sm sm:px-5 sm:py-3">
              <BrandWordmarkHomeLink size="footer" />
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">{siteConfig.description}</p>
          </div>
          <div className="flex flex-col gap-5 min-[480px]:items-end">
            <ul className="flex flex-col gap-1 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:justify-end min-[480px]:gap-x-5 min-[480px]:gap-y-2">
              {siteConfig.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex min-h-11 items-center text-sm font-medium text-slate-300 underline decoration-[var(--copper)] decoration-1 underline-offset-4 hover:text-[var(--copper)] ${focusRing} rounded`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs leading-relaxed text-slate-400 min-[480px]:text-right">
              © {year} {siteConfig.legalName}. Registered in England and Wales.
              <span className="mt-1 block text-slate-500">{siteConfig.domain}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
