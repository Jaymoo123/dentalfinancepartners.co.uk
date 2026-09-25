import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "./layout-utils";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-10">
      <div className={siteContainerLg}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-neutral-900">{siteConfig.name}</p>
          <ul className="flex flex-wrap gap-4 text-sm text-neutral-600">
            {siteConfig.footer.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#c9861b] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-xs text-neutral-400">{siteConfig.company.legalDisclosure}</p>
          {/* Phase 1 replaces this whole footer with packages/web-shared/design/chrome/SiteFooter.tsx,
              which takes a `consentToggle` node — delete src/components/analytics/ConsentToggle.tsx then.
              inline-block + py-1 lifts this from a 16px hit area to 24px. */}
          <ConsentToggle className="inline-block shrink-0 py-1 text-xs text-neutral-400 underline hover:text-neutral-700 hover:no-underline" />
        </div>
      </div>
    </footer>
  );
}
