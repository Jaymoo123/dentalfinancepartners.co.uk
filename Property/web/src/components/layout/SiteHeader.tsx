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
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${focusRing} ${
                  active
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
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
            className={`${btnPrimary} hidden min-h-10 min-w-0 px-6 py-2 text-sm sm:inline-flex`}
          >
            Book consultation
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
              {siteConfig.nav.map((item) => {
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
            </nav>
            <div className="border-t border-slate-200 p-3">
              <Link
                href="/contact"
                className={`${btnPrimary} w-full`}
                onClick={() => setOpen(false)}
              >
                Book consultation
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
