import Link from "next/link";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = siteConfig.footer;
  const colSize = Math.ceil(links.length / 3);
  const col1 = links.slice(0, colSize);
  const col2 = links.slice(colSize, colSize * 2);
  const col3 = links.slice(colSize * 2);

  return (
    <footer className="border-t border-neutral-200 bg-[#fafaf7]">
      <div className={`${siteContainerLg} pt-16 pb-10 sm:pt-20 sm:pb-12`}>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div className="min-w-0">
            <div className="font-mono text-xs uppercase tracking-widest text-teal-600">
              {siteConfig.legalName}
            </div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-neutral-900">
              {siteConfig.name}
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-sm text-neutral-500">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className={`text-teal-700 hover:text-teal-800 underline underline-offset-2 ${focusRing}`}
              >
                {siteConfig.contact.email}
              </a>
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

        <div className="mt-16 flex flex-col gap-2 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            &copy; {year} {siteConfig.legalName}. Registered in England and Wales.
          </p>
          <p className="text-xs text-neutral-500">
            Specialist contractor accountants. Editorial content only. Book a call for advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
