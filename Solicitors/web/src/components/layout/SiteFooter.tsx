import Link from "next/link";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { focusRing, siteContainer } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--navy)] bg-[var(--navy)] text-slate-100">
      <div className={`${siteContainer} py-10 sm:py-14`}>
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
