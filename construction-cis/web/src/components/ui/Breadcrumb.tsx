import { siteConfig } from "@/config/site";
import {
  Breadcrumb as KitBreadcrumb,
  type BreadcrumbItem,
} from "@accounting-network/web-shared/design/primitives/Breadcrumb";

export type { BreadcrumbItem };

/**
 * Thin adapter over the shared kit's Breadcrumb (2026-09-14 kit-adoption uplift).
 *
 * The body of this file used to be a hand-copy of the kit component. It is an
 * adapter rather than 22 edited call sites for two reasons: the kit needs a
 * `siteUrl` for its BreadcrumbList JSON-LD, which is per-site and belongs in one
 * place, and the incumbent `variant` prop is spelled `onDark` upstream. Mapping
 * both here keeps every existing `<Breadcrumb items=... />` and
 * `<Breadcrumb variant="light" ... />` call site byte-identical while the render
 * comes from the kit.
 *
 * Structured data is unchanged in shape: the kit's `buildBreadcrumb` emits the
 * same BreadcrumbList, same positions, same `${siteUrl}${href}` absolute item
 * URLs as `lib/schema.ts`'s `buildBreadcrumbJsonLd` did, and `siteUrl` is the
 * same `siteConfig.url` that function read. It is strictly safer in one respect:
 * the kit serialises through `serialize()`, which escapes `</` so a crumb label
 * containing `</script>` cannot terminate the surrounding script tag.
 *
 * Rendering deltas, all of them upward against the WCAG floors. Measured as
 * emitted oklch (Tailwind v4 ramp utilities), not as v3 hex labels:
 *   trail text     neutral-500 (4.73) -> slate-600 (#45556c): 7.56 on white, 7.24 on
 *                  --surface #fafaf9. Text floor 4.5. PASS.
 *   current crumb  neutral-700 -> slate-900 (#0f172b): 17.84 on white. PASS.
 *   chevron        neutral-300 -> slate-500 (#62748e): 4.77 on white, was 1.48.
 *                  Decorative, so the 3.0 graphic floor is the bar it now clears.
 *   on dark        white/70 -> slate-300 (#cad5e2): 12.08 on neutral-900
 *                  #171717 and 12.03 on --dark #0f172a. Text floor 4.5. PASS.
 *   link hover     orange-700 -> primary-700, and on dark orange-300 -> white.
 * The kit also adds `py-0.5` to the links, taking the hit area from 20px to
 * 24px (WCAG 2.5.8). The list is `items-center`, so the trail baseline does not
 * move against the chevrons.
 *
 * `variant` is kept rather than renamed so this stays a zero-call-site change.
 * If a future sweep renames all 11 `variant="light"` sites to `onDark`, delete
 * this file and import the kit directly.
 */
export function Breadcrumb({
  items,
  variant = "default",
}: {
  items: BreadcrumbItem[];
  /** "light" means light TEXT, i.e. a dark hero ground. Maps to the kit's `onDark`. */
  variant?: "default" | "light";
}) {
  return <KitBreadcrumb items={items} siteUrl={siteConfig.url} onDark={variant === "light"} />;
}
