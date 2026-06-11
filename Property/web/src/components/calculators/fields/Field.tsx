/**
 * Re-export the shared Field renderer.
 *
 * The shared Field uses --brand-primary CSS token for focus rings and toggle
 * borders; Property's CSS sets --brand-primary: #059669 (emerald-600), so
 * the rendered appearance is identical to the local ancestor.
 *
 * The MiniGrid and PremiumCalculator components import Field from this path,
 * so this re-export keeps them working without any call-site changes.
 */
export { Field } from "@accounting-network/web-shared/tools/components/Field";
