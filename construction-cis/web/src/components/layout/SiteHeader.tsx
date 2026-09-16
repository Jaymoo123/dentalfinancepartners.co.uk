"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { btnPrimary, btnPrimaryBase, focusRing, siteContainerXl } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import type { NavItem } from "@/lib/nav";
import { getActiveCta, getActiveNav } from "@accounting-network/web-shared/lib/niche-config";

const activeCta = getActiveCta(niche);
const fallbackNav = getActiveNav(niche) as NavItem[];
const ctaVariant = niche.cta.variant;

/**
 * The header_secondary CTA renders the same label and href as a top-level nav item
 * can (today: "Contact" -> /contact), but only from xl: up, while the nav itself
 * starts at lg:. Hide the nav copy at xl: only, where the CTA takes over, so the
 * two can never double up. CSS visibility, not a per-breakpoint nav config fork.
 *
 * On this site the branch is dormant: cta.variants.leadgen declares no
 * header_secondary, so neither the CTA nor the xl:hidden guard renders today
 * (rendered-DOM verified, TD-23). The guard is in place for the day it flips.
 */
const secondaryCtaHref = activeCta.header_secondary?.href;

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
    <svg
      className={`h-4 w-4 ${className}`}
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
 * Active state for an item INSIDE a dropdown or drawer: an exact match, never a
 * prefix one. Prefix is right for a top-level trigger ("Calculators" reads as
 * active anywhere under /calculators) and wrong for the children, where any two
 * children whose hrefs share a prefix would light up together.
 */
function childActive(pathname: string, href: string): boolean {
  return pathname === href;
}

/**
 * Desktop dropdown for a nav group.
 *
 * A click-toggled <button>, NOT a hover <Link>: at the lg: breakpoint a tablet has
 * no hover, so a hover-only trigger leaves the children unreachable from the
 * desktop layout entirely. Closes on Escape, on outside mousedown and on route
 * change, and aria-expanded sits on a button where it belongs.
 *
 * Consequence: the trigger is not navigable, so the grouped panel carries a "View
 * all calculators" link back to item.href.
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
        className={`flex items-center gap-1 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-bold transition-colors xl:px-4 ${focusRing} ${
          active || open
            ? "border-primary-600 text-primary-700"
            : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
        }`}
      >
        {item.label}
        <ChevronIcon className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open ? (
        item.groups?.length ? (
          // Grouped panel: the calculator fleet is too long for a single column,
          // so it splits into category columns. max-h + scroll is the backstop if
          // the fleet grows.
          <div
            id={menuId}
            className="absolute left-0 top-full z-50 max-h-[70vh] w-[38rem] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
          >
            <div className="columns-2 gap-6">
              {item.groups.map((group) => (
                <div key={group.category} className="mb-4 break-inside-avoid">
                  <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {group.category}
                  </p>
                  {group.items.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block rounded-lg px-2 py-1.5 text-sm font-semibold ${focusRing} ${
                        childActive(pathname, child.href)
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-primary-700"
                      }`}
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
              className={`mt-1 block border-t border-slate-100 px-2 pt-3 text-sm font-bold text-primary-700 hover:text-primary-800 ${focusRing}`}
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
                  childActive(pathname, child.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-primary-700"
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
  // Falls back to the packages-filtered config nav so the header still renders if a
  // route mounts it without the server-built list (the only place the Calculators
  // `groups` come from).
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
      style={{ paddingTop: "max(0px, env(safe-area-inset-top))" }}
    >
      <div
        className={`${siteContainerXl} flex min-h-[3.25rem] items-center justify-between gap-3 py-3 sm:min-h-16 sm:gap-4`}
      >
        <BrandWordmarkHomeLink />

        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
          {navItems.map((item) =>
            item.children?.length || item.groups?.length ? (
              <DesktopDropdown key={item.href} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-bold transition-colors xl:px-4 ${focusRing} ${
                  item.href === secondaryCtaHref ? "xl:hidden" : ""
                } ${
                  itemHrefs(item).some((h) => hrefActive(pathname, h))
                    ? "border-primary-600 text-primary-700"
                    : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
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
              className={`hidden whitespace-nowrap border-b-2 px-3 py-2 text-sm font-bold transition-colors xl:inline-flex ${focusRing} ${
                hrefActive(pathname, activeCta.header_secondary.href)
                  ? "border-primary-600 text-primary-700"
                  : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
              data-cta="header_nav_secondary"
              data-cta-goal="contact"
              data-cta-placement="header"
              data-cta-variant={ctaVariant}
            >
              {activeCta.header_secondary.label}
            </Link>
          ) : null}
          {/* `lg:`, NOT `sm:`. The burger runs until `lg:`, so at `sm:` this put a
              ~180px button and a 48px burger next to a wordmark whose own cap lifts
              to max-w-none at exactly the same breakpoint, and between 640 and
              1023px the three fought for the bar. The CTA now appears only where
              the desktop nav does; below that it lives at the foot of the drawer,
              which is what the burger is for.

              TRAP 22: the id, placement and goal below are Trade's own and stay
              byte-identical (header_nav_primary | header | contact on all 246
              routes, docs/construction-cis/_port/cta_baseline.json). Property
              renders header_book | header | form for the same button; adopting
              those strings would split this site's live funnel history at cutover.
              The breakpoint move is CSS only and does not change the snapshot,
              which reads server HTML. */}
          <Link
            href={activeCta.header_primary.href}
            className={`${btnPrimaryBase} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`}
            data-cta="header_nav_primary"
            data-cta-placement="header"
            data-cta-goal={activeCta.header_primary.href.startsWith("/contact") ? "contact" : "pricing"}
            data-cta-variant={ctaVariant}
          >
            {activeCta.header_primary.label}
          </Link>

          <button
            type="button"
            className={`flex h-12 w-12 touch-manipulation items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 lg:hidden ${focusRing}`}
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
        // `lg:hidden`, matching the burger that opens it. It used to be `md:hidden`
        // against an `lg:hidden` burger, so between 768 and 1023px the burger
        // rendered and the drawer it opened was display:none: the site had no
        // navigation at all at tablet width.
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
            className="absolute right-0 top-0 flex h-[100dvh] w-[min(20rem,92vw)] flex-col border-l-4 border-primary-600 bg-white shadow-2xl"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <p
                  id={`${panelId}-title`}
                  className="text-xs font-bold uppercase tracking-wider text-slate-900"
                >
                  Menu
                </p>
                <button
                  type="button"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 ${focusRing}`}
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
                          ? "border-primary-600 bg-primary-50 text-primary-900"
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
                          .map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm font-semibold ${focusRing} ${
                                childActive(pathname, child.href)
                                  ? "text-primary-700"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                      </div>
                    ) : null}
                    {item.groups?.length ? (
                      // Same fleet as the desktop panel, stacked. The category
                      // headers matter more here: the drawer scrolls, so an
                      // unbroken list of every tool would be a wall of text.
                      <div className="mb-1 ml-4 border-l border-slate-200">
                        {item.groups.map((group) => (
                          <div key={group.category} className="py-1">
                            <p className="px-4 pb-0.5 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              {group.category}
                            </p>
                            {group.items.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2.5 text-sm font-semibold ${focusRing} ${
                                  childActive(pathname, child.href)
                                    ? "text-primary-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                                onClick={() => setOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
            <div className="border-t border-slate-200 p-3">
              {/* TRAP 22 again: Trade's drawer CTA keeps header_mobile_primary |
                  header_mobile, not Property's header_book_mobile | mobile_menu.
                  It renders only inside the open drawer, so it is absent from the
                  246-route server-HTML baseline and must stay that way. */}
              <Link
                href={activeCta.header_primary.href}
                className={`${btnPrimary} w-full`}
                onClick={() => setOpen(false)}
                data-cta="header_mobile_primary"
                data-cta-placement="header_mobile"
                data-cta-goal={activeCta.header_primary.href.startsWith("/contact") ? "contact" : "pricing"}
                data-cta-variant={ctaVariant}
              >
                {activeCta.header_primary.label}
              </Link>
              {activeCta.header_secondary ? (
                <Link
                  href={activeCta.header_secondary.href}
                  className={`mt-3 block py-2 text-center text-sm font-semibold text-slate-600 hover:text-slate-900 ${focusRing}`}
                  onClick={() => setOpen(false)}
                  data-cta="header_mobile_secondary"
                  data-cta-goal="contact"
                  data-cta-placement="header_mobile"
                  data-cta-variant={ctaVariant}
                >
                  {activeCta.header_secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
