"use client";

import Link from "next/link";
import { useState } from "react";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

// ponytail: the only thing missing was the mobile toggle itself (no full
// mega-nav needed at this site's nav depth); desktop/xl layout unchanged.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
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
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-12 w-12 items-center justify-center text-[#0f3a4a] lg:hidden ${focusRing}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-neutral-200 bg-white lg:hidden">
          <div className={`${siteContainerLg} flex flex-col py-2`}>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm font-medium text-neutral-700 hover:text-[#0f3a4a] ${focusRing}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-cta="header_contact_mobile"
              data-cta-placement="header_mobile_menu"
              onClick={() => setOpen(false)}
              className={`mt-2 mb-2 inline-flex min-h-11 items-center justify-center bg-[#0f3a4a] px-5 py-2.5 text-sm font-medium text-white ${focusRing}`}
            >
              Get in touch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
