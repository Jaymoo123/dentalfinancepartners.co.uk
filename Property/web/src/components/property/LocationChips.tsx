import Link from "next/link";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * The "Across the UK" locations strip.
 *
 * Lifted out of the homepage so the service pages can carry the same row
 * instead of a second copy that drifts. The chips are deliberately links to the
 * location pages rather than a filter control: there is nothing on the page to
 * filter, and the job here is to give a reader searching "landlord accountant
 * near me" somewhere local to land.
 */
export function LocationChips({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
        <MapPin aria-hidden className="h-4 w-4 text-emerald-600" />
        Across the UK
      </span>
      {siteConfig.locations.map((loc) => (
        <Link
          key={loc.slug}
          href={`/locations/${loc.slug}`}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {loc.title.replace("Property accountants in ", "")}
        </Link>
      ))}
      <Link
        href="/locations"
        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:border-emerald-600 transition-colors"
      >
        All locations →
      </Link>
    </div>
  );
}
