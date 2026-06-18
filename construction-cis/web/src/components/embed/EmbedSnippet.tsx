/**
 * Re-export the shared EmbedSnippet.
 *
 * The shared component is API-identical to the local ancestor; it uses
 * --brand-primary CSS token for the Copy button (orange-500 on construction-cis
 * via the site's CSS variable, so the rendered colour is identical).
 */
export { EmbedSnippet } from "@accounting-network/web-shared/tools/embed/EmbedSnippet";
