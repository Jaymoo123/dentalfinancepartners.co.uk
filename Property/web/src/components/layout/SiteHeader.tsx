"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { btnPrimary, focusRing, siteContainerXl } from "@/components/ui/layout-utils";
import { type NavItem } from "@/config/site";
import { niche, getActiveCta, getActiveNav } from "@/config/niche-loader";

const activeCta = getActiveCta(niche);
const fallbackNav = getActiveNav(niche) as NavItem[];
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

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/** Every href a nav item covers, so "active" follows children and grouped items too. */
function itemHrefs(item: NavItem): string[] {
  return [
    item.href,
    ...(item.children?.map((c) => c.href) ?? []),
    ...(item.groups?.flatMap((g) => g.items.map((i) => i.href)) ?? []),
  ];
}

function hrefActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Desktop dropdown for a nav group.
 *
 * DELIBERATE DIVERGENCE from the designer's build, on accessibility grounds
 * rather than taste: their trigger is a <Link> that opens on hover only. At the
 * lg: breakpoint a tablet has no hover, so tapping "Services" navigates away and
 * the children are unreachable from the desktop layout entirely. Ours is a
 * click-toggled <button> that closes on Escape, on outside mousedown and on
 * route change. It also fixes their aria pairing: aria-expanded belongs on a
 * button, not on a link.
 *
 * Consequence: the trigger is NOT navigable, so every group needs a
 * self-referential first child in niche.config.json ("All services", "Landlord
 * tax guide") and the grouped panel needs its "View all calculators" footer link.
 */
function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const active = itemHrefs(item).some((h) => hrefActive(pathname, h));

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
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-bold transition-colors border-b-2 xl:px-4 ${focusRing} ${
          active || open
            ? "border-emerald-600 text-emerald-700"
            : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
        }`}
      >
        {item.label}
        <ChevronIcon className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open ? (
        item.groups?.length ? (
          // Grouped panel: the calculator fleet is too long for a single column
          // (it would run off the bottom of the viewport), so it splits into
          // category columns. max-h + scroll is the backstop if the fleet grows.
          <div
            id={menuId}
            className="absolute left-0 top-full z-50 max-h-[70vh] w-[38rem] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
          >
            <div className="columns-2 gap-6">
              {item.groups.map((group) => (
                <div key={group.category} className="mb-4 break-inside-avoid">
                  <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {group.category}
                  </p>
                  {group.items.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 ${focusRing}`}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <Link
              href={item.href}
              className={`mt-1 block border-t border-slate-100 px-2 pt-3 text-sm font-bold text-emerald-700 hover:text-emerald-800 ${focusRing}`}
              onClick={() => setOpen(false)}
            >
              View all calculators
            </Link>
          </div>
        ) : (
          <div
            id={menuId}
            className="absolute left-0 top-full z-50 w-64 rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`block px-4 py-2.5 text-sm font-semibold ${focusRing} ${
                  hrefActive(pathname, child.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                }`}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}

export function SiteHeader({ nav }: { nav?: NavItem[] } = {}) {
  // Falls back to the packages-filtered config nav so the header still renders
  // if a route mounts it without the server-built list (which is the only place
  // the Calculators `groups` come from).
  const navItems = nav ?? fallbackNav;
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
        className={`${siteContainerXl} flex min-h-[3.25rem] items-center justify-between gap-3 py-3 sm:min-h-16 sm:gap-4`}
      >
        <BrandWordmarkHomeLink />

        <nav
          aria-label="Primary"
          className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1"
        >
          {navItems.map((item) =>
            item.children?.length || item.groups?.length ? (
              <DesktopDropdown key={item.href} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-3 py-2 text-sm font-bold transition-colors border-b-2 xl:px-4 ${focusRing} ${
                  itemHrefs(item).some((h) => hrefActive(pathname, h))
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
              className={`hidden whitespace-nowrap px-3 py-2 text-sm font-bold transition-colors border-b-2 xl:inline-flex ${focusRing} ${
                hrefActive(pathname, activeCta.header_secondary.href)
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
            className={`${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm sm:inline-flex`}
          >
            {activeCta.header_primary.label}
          </Link>

          <button
            type="button"
            className={`flex h-12 w-12 touch-manipulation items-center justify-center border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300 lg:hidden ${focusRing}`}
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
          className="fixed inset-0 z-50 lg:hidden"
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
              {navItems.map((item) => {
                const active = hrefActive(pathname, item.href);
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block border-l-4 px-4 py-3.5 text-base font-bold ${focusRing} ${
                        active
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-transparent text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <div className="mb-1 ml-4 border-l border-slate-200">
                        {item.children
                          // The parent link already covers the section index.
                          .filter((child) => child.href !== item.href)
                          .map((child) => {
                            const childActive = hrefActive(pathname, child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2.5 text-sm font-semibold ${focusRing} ${
                                  childActive
                                    ? "text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                                onClick={() => setOpen(false)}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                      </div>
                    ) : null}
                    {item.groups?.length ? (
                      // Same fleet as the desktop panel, stacked. The category
                      // headers matter more here: the drawer scrolls, so an
                      // unbroken list of every tool would be a wall of text.
                      <div className="mb-1 ml-4 border-l border-slate-200">
                        {item.groups.map((group) => (
                          <div key={group.category} className="py-1">
                            <p className="px-4 pb-0.5 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              {group.category}
                            </p>
                            {group.items.map((child) => {
                              const childActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-4 py-2.5 text-sm font-semibold ${focusRing} ${
                                    childActive
                                      ? "text-emerald-700"
                                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                  }`}
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
