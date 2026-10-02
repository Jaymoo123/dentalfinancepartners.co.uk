"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg } from "./layout-utils";

// ponytail: the only thing missing was the mobile toggle itself (390px
// rendered page had zero nav); desktop layout unchanged.
const navLinks = [
  { label: "Services", href: "/services" },
  { label: "For you", href: "/for" },
  { label: "Calculators", href: "/calculators" },
  { label: "Research", href: "/research/care-provider-business-index" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-neutral-200 bg-white">
      <nav className={`${siteContainerLg} flex items-center justify-between gap-6 py-4`} aria-label="Primary">
        <Link href="/" className="text-base font-bold tracking-tight text-neutral-900">
          {siteConfig.name}
        </Link>
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[#7d6b9e] transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* The `hidden md:inline-flex` this used to carry lost the cascade race:
            btnPrimary already sets `inline-flex`, both land in the same layer,
            and the 2026-09-28 rendered read measured the button VISIBLE at 390.
            The width gate now lives on a wrapper that sets no display of its
            own, and it is lg (1024) per the parity brief. */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            data-cta="header_contact"
            data-cta-placement="header"
            className={`${btnPrimary} min-h-0 px-5 py-2.5 text-sm`}
          >
            Get in touch
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-12 w-12 items-center justify-center text-neutral-900 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className={`${siteContainerLg} flex flex-col py-2`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-neutral-600 hover:text-[#7d6b9e]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-cta="header_contact_mobile"
              data-cta-placement="header_mobile_menu"
              onClick={() => setOpen(false)}
              className={`${btnPrimary} mt-2 mb-2 min-h-0 px-5 py-2.5 text-sm`}
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
