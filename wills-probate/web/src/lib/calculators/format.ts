/**
 * Re-exports the shared formatting helpers.
 *
 * gbp and pct are byte-identical in both the local and shared packages
 * (verified 2026-06-11 during F2 audit). All tool configs that import
 * format from "@/lib/calculators/format" continue to work unchanged.
 */
export { gbp, pct } from "@accounting-network/web-shared/tools/format";
