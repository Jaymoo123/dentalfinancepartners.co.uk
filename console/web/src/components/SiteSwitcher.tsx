"use client";

/**
 * Registry-driven site switcher.
 *
 * Receives the sites list as a serialisable prop from the RSC parent.
 * No functions cross the boundary. The switcher derives its options
 * entirely from the sites prop -- add a new site to the sites table and
 * it appears here with zero code edits (spec: registry-driven, PF-07).
 *
 * Renders a compact select on narrow screens and a tab-style strip on wider.
 */
import { useRouter } from "next/navigation";
import type { SiteRegistryEntry } from "@accounting-network/web-shared/console/estateData";

export default function SiteSwitcher({
  sites,
  activeSiteKey,
}: {
  sites: SiteRegistryEntry[];
  activeSiteKey: string | null;
}) {
  const router = useRouter();
  const active = sites.filter((s) => s.active);

  const navigate = (siteKey: string | null) => {
    if (siteKey === null) {
      router.push("/");
    } else {
      router.push(`/site/${siteKey}`);
    }
  };

  return (
    <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Site switcher">
      {/* Estate overview tab */}
      <button
        type="button"
        onClick={() => navigate(null)}
        className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
          activeSiteKey === null
            ? "bg-slate-900 text-white"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        All sites
      </button>

      {active.map((site) => (
        <button
          key={site.site_key}
          type="button"
          onClick={() => navigate(site.site_key)}
          className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeSiteKey === site.site_key
              ? "bg-emerald-600 text-white"
              : "text-slate-500 hover:text-slate-800"
          }`}
          title={site.domain}
        >
          {site.display_name}
        </button>
      ))}
    </nav>
  );
}
