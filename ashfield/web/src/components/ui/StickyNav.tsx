import Link from "next/link";
import { siteConfig } from "@/config/site";

// Server component. Frost-on-scroll = .scrolled toggle from interactions.ts (rAF).
// Glass styles sit on .nav-inner, a CHILD of the sticky header (Safari compositing).
// Mobile menu = native <details> disclosure: accessible, zero extra JS. ponytail:
// upgrade to a focus-trapped dialog only if the disclosure tests poorly on devices.
export function StickyNav() {
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-(--gutter)">
          <Link
            href="/"
            className="font-display text-xl font-medium tracking-tight text-ink"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-70 transition-colors duration-[180ms] hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile disclosure */}
          <details className="relative lg:hidden">
            <summary
              className="flex cursor-pointer list-none items-center gap-2 py-1 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              Menu
              <span aria-hidden="true" className="rule-strong block w-4" />
            </summary>
            <nav
              aria-label="Main"
              className="absolute right-0 top-full z-50 mt-3 w-64 border border-hairline bg-white p-2 shadow-[0_1px_2px_#14161a0a,0_8px_24px_#14161a0f]"
            >
              <ul>
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2.5 text-sm text-ink hover:bg-paper-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
