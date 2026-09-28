import Link from "next/link";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

// ponytail: header CTA only (phase 0 scope); full mega-nav/mobile-drawer port
// deferred, add when the site needs more than a CTA at 1280 and hidden <1024.
export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className={`${siteContainerLg} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className={`text-lg font-semibold text-[#0f3a4a] ${focusRing}`}>
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium text-neutral-700 hover:text-[#0f3a4a] transition-colors ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          data-cta="header_contact"
          data-cta-placement="header"
          className={`hidden min-h-11 items-center justify-center bg-[#0f3a4a] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 xl:inline-flex ${focusRing}`}
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}
