/**
 * RETIRED in favour of packages/web-shared/design/primitives/Breadcrumb.tsx
 * (phase 3, 2026-10-07). This file is now a two-line delegation, not an
 * implementation: everything the local copy did, the kit does.
 *
 * Why a shim rather than a deletion: the local component has THREE live
 * consumers, not the one the port plan recorded (`grep -rn "ui/Breadcrumb"
 * src/` = src/app/privacy-policy, src/app/cookie-policy, src/app/terms). All
 * three are legal pages owned by another package in this wave, so deleting the
 * module would edit files outside this package's lease. Delegating keeps the
 * local import path and prop signature byte-identical for those three while
 * retiring the duplicate markup and the duplicate schema builder.
 *
 * Nothing about what those three pages emit changes in substance:
 * - The JSON-LD is field-for-field identical. The local copy called
 *   `buildBreadcrumbJsonLd` (src/lib/schema.ts:88-99); the kit builds the same
 *   node through packages/web-shared/schema/breadcrumb.ts:7-21 (same @type,
 *   same `position`, same `name`, same absolute `item` from the site origin)
 *   and serialises it through schema/serialize, which additionally escapes
 *   `</` so a crumb label can never terminate the script tag. Strictly safer.
 * - The visible trail gains contrast rather than losing it: the kit's
 *   `"default"` tone is slate-600 text with slate-500 chevrons
 *   (Breadcrumb.tsx:54-60) where this file painted slate-500 text and slate-400
 *   chevrons; slate-400 measures 2.52 against a light ground and was the defect
 *   the kit's own comment at :95-99 records fixing. The link hover moves from
 *   the brand hex literal to the kit's `primary-700` utility, which is how the
 *   last `hex 0f3a4a` literal in this package's files is cleared.
 * - The focus ring moves from `var(--focus-ring)` to the kit's
 *   `var(--kit-focus-ring, ...)`. src/app/globals.css declares BOTH and binds
 *   them to the same value, including inside `.ground-dark` and the `footer`
 *   element rule, so the painted ring is unchanged.
 * - Hit area grows: the kit adds `py-0.5` to each crumb link for WCAG 2.5.8
 *   (:118-121).
 *
 * `BreadcrumbItem` is re-exported so the three consumers' type imports, if any
 * are added later, resolve without reaching into the kit directly.
 */
import { Breadcrumb as KitBreadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";

export type { BreadcrumbItem } from "@accounting-network/web-shared/design/primitives/Breadcrumb";

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <KitBreadcrumb items={items} siteUrl={siteConfig.url} />;
}
