"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { BrandWordmarkHomeLink } from "@/components/brand/BrandWordmarkHomeLink";
import { btnPrimary, focusRing, siteContainer } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-[var(--navy)]"
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
      className="sticky top-0 z-40 border-b border-[var(--border)]/80 bg-[var(--surface)]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--surface)]/85"
      style={{
        paddingTop: "max(0px, env(safe-area-inset-top))",
      }}
    >
      <div
        className={`${siteContainer} flex min-h-[3.25rem] items-center justify-between gap-3 py-2.5 sm:min-h-14 sm:gap-4 sm:py-3`}
      >
        <BrandWordmarkHomeLink />

        <nav
          aria-label="Primary"
          className="hidden min-w-0 items-center gap-0.5 md:flex lg:gap-1"
        >
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium tracking-tight transition-colors ${focusRing} ${
                  active
                    ? "bg-[var(--copper-soft)] text-[var(--navy)]"
                    : "text-[var(--muted)] hover:text-[var(--navy)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact"
            className={`${btnPrimary} hidden min-h-11 min-w-0 px-4 sm:inline-flex md:min-h-12`}
          >
            Book a call
          </Link>

          <button
            type="button"
            className={`flex h-12 w-12 touch-manipulation items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--navy)] hover:bg-[var(--surface-elevated)] md:hidden ${focusRing}`}
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
            className="absolute inset-0 bg-[var(--navy)]/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            className="absolute right-0 top-0 flex h-[100dvh] w-[min(20rem,92vw)] flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-[var(--navy)]/15"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p id={`${panelId}-title`} className="text-sm font-bold uppercase tracking-wider text-[var(--navy)]">
                  Menu
                </p>
                <button
                  type="button"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] ${focusRing}`}
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <MenuIcon open />
                </button>
              </div>
              <BrandWordmarkHomeLink />
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-4 py-3.5 text-base font-semibold ${focusRing} ${
                      active
                        ? "bg-[var(--copper-soft)] text-[var(--navy)]"
                        : "text-[var(--navy)] hover:bg-[var(--surface-elevated)]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-[var(--border)] p-3">
              <Link
                href="/contact"
                className={`${btnPrimary} w-full`}
                onClick={() => setOpen(false)}
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
