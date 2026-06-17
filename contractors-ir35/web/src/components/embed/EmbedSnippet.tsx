/**
 * Re-export the shared EmbedSnippet.
 *
 * The shared component is brand-agnostic; it uses the --brand-primary CSS token
 * for the Copy button (cyan-700 on contractors-ir35 via the site's CSS
 * variable), so the rendered colour matches the petrol-cyan brand automatically.
 */
export { EmbedSnippet } from "@accounting-network/web-shared/tools/embed/EmbedSnippet";
