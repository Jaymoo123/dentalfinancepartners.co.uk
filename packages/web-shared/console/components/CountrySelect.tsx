"use client";

/**
 * Country slicer for the analytics dashboard. Defaults to GB (set server-side)
 * so headline rates reflect the real UK audience; "All countries" widens the
 * whole dashboard. Navigating updates the ?country= search param; the page is
 * force-dynamic, so the server re-queries every panel with the new scope.
 *
 * basePath is the console root (e.g. "/admin/analytics") so this component is
 * not hardcoded to any one site's route structure.
 *
 * NOTE: credential travels in a cookie, NOT in the URL. This component does
 * NOT accept or forward any key parameter (OB-01 design).
 *
 * Shared across all operator consoles. Lifted from Property with auth pattern
 * corrected (Property keeps its own copy until adoption).
 */
import { useRouter } from "next/navigation";

export default function CountrySelect({
  value,
  options,
  basePath,
}: {
  value: string;
  options: string[];
  basePath: string;
}) {
  const router = useRouter();

  const seen = new Set<string>();
  const choices = ["GB", "ALL", ...options].filter((c) => {
    if (seen.has(c)) return false;
    seen.add(c);
    return true;
  });

  return (
    <label className="flex items-center gap-1 text-slate-500">
      <span>Country</span>
      <select
        value={value}
        onChange={(e) => router.push(`${basePath}?country=${e.target.value}`)}
        className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-xs text-slate-700"
      >
        {choices.map((c) => (
          <option key={c} value={c}>
            {c === "ALL" ? "All countries" : c}
          </option>
        ))}
      </select>
    </label>
  );
}
