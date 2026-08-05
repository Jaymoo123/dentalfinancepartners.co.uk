"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { btnPrimary, focusRing, siteContainer } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche, getActiveCta, getActiveNav } from "@/config/niche-loader";

type NavItem = (typeof siteConfig.nav)[number];

const activeCta = getActiveCta(niche);
const activeNav = getActiveNav(niche);
const ctaVariant = niche.cta.variant;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-slate-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function itemActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return (item.children ?? []).some(
    (c) => pathname === c.href || pathname.startsWith(`${c.href}/`),
  );
}

/** Desktop dropdown for a nav group. Click-toggled, closes on Escape / outside click / route change. */
function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = itemActive(pathname, item);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-bold transition-colors border-b-2 ${focusRing} ${
          active || open
            ? "border-emerald-600 text-emerald-700"
            : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
        }`}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
          {(item.children ?? []).map((child) => {
            const childActive = pathname === child.href || pathname.startsWith(`${child.href}/`);
            return (
              <Link
                key={child.href}
                href={child.href}
                className={`block px-4 py-2.5 text-sm font-semibold ${focusRing} ${
                  childActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm"
      style={{
        paddingTop: "max(0px, env(safe-area-inset-top))",
      }}
    >
      <div
        className={`${siteContainer} flex min-h-[3.25rem] items-center justify-between gap-3 py-3 sm:min-h-16 sm:gap-4`}
      >
        <BrandWordmarkHomeLink />

        <nav
          aria-label="Primary"
          className="hidden min-w-0 items-center gap-1 md:flex"
        >
          {activeNav.map((item) =>
            item.children?.length ? (
              <DesktopDropdown key={item.href} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-bold transition-colors border-b-2 ${focusRing} ${
                  itemActive(pathname, item)
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {activeCta.header_secondary ? (
            <Link
              href={activeCta.header_secondary.href}
              data-cta="header_contact"
              data-cta-placement="header"
              data-cta-goal={activeCta.header_secondary.href.startsWith("/contact") ? "form" : "pricing"}
              data-cta-variant={ctaVariant}
              className={`hidden px-3 py-2 text-sm font-bold transition-colors border-b-2 lg:inline-flex ${focusRing} ${
                pathname === activeCta.header_secondary.href ||
                pathname.startsWith(`${activeCta.header_secondary.href}/`)
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {activeCta.header_secondary.label}
            </Link>
          ) : null}
          <Link
            href={activeCta.header_primary.href}
            data-cta="header_book"
            data-cta-placement="header"
            data-cta-goal={activeCta.header_primary.href.startsWith("/contact") ? "form" : "pricing"}
            data-cta-variant={ctaVariant}
            className={`${btnPrimary} hidden min-h-10 min-w-0 px-6 py-2 text-sm sm:inline-flex`}
          >
            {activeCta.header_primary.label}
          </Link>

          <button
            type="button"
            className={`flex h-12 w-12 touch-manipulation items-center justify-center border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300 md:hidden ${focusRing}`}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            className="absolute right-0 top-0 flex h-[100dvh] w-[min(20rem,92vw)] flex-col border-l-4 border-emerald-600 bg-white shadow-2xl"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <p id={`${panelId}-title`} className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Menu
                </p>
                <button
                  type="button"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center border-2 border-slate-200 ${focusRing}`}
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <MenuIcon open />
                </button>
              </div>
              <BrandWordmarkHomeLink />
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {activeNav.map((item) => {
                if (item.children?.length) {
                  return (
                    <div key={item.href} className="mb-1">
                      <p className="px-4 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {item.label}
                      </p>
                      {item.children.map((child) => {
                        const childActive =
                          pathname === child.href || pathname.startsWith(`${child.href}/`);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block border-l-4 px-4 py-3 text-base font-bold ${focusRing} ${
                              childActive
                                ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                : "border-transparent text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-l-4 px-4 py-3.5 text-base font-bold ${focusRing} ${
                      active
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-transparent text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`border-l-4 px-4 py-3.5 text-base font-bold ${focusRing} ${
                  pathname === "/contact" || pathname.startsWith("/contact/")
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                    : "border-transparent text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                }`}
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="border-t border-slate-200 p-3">
              <Link
                href={activeCta.header_primary.href}
                data-cta="header_book_mobile"
                data-cta-placement="mobile_menu"
                data-cta-goal={activeCta.header_primary.href.startsWith("/contact") ? "form" : "pricing"}
                data-cta-variant={ctaVariant}
                className={`${btnPrimary} w-full`}
                onClick={() => setOpen(false)}
              >
                {activeCta.header_primary.label}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
