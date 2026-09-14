/**
 * Article bodies are raw HTML held in the post files, and 18 of the 19 posts
 * carry at least one comparison table. `.prose table { width: 100% }` cannot
 * keep them inside the column: a table is `display: table`, which treats
 * `width` as a MINIMUM, so a table whose min-content width exceeds the column
 * pushes the PAGE into horizontal scroll instead of scrolling itself. Measured
 * at phase 0 on a 390px viewport: 11 of 19 posts, worst case right=467.
 *
 * Each table therefore gets its own `overflow-x` container. The wrapper carries
 * the scroll, never the table: `overflow` on a `display: table` element cannot
 * clip its own box, which is the same trap that makes `sr-only` silently fail
 * when it is put on a `<table>` rather than a wrapping `<div>`.
 *
 * `tabindex="0"` is not decoration. A scrollable region has to be reachable by
 * keyboard (WCAG 2.1.1), and a plain `<div>` with overflow is not focusable.
 * The role/label pair gives that focus stop a name, so it is announced as
 * something scrollable rather than as an unlabelled tab stop.
 */
const TABLE_BLOCK = /<table[\s\S]*?<\/table>/gi;

export function wrapWideTables(html: string): string {
  return html.replace(
    TABLE_BLOCK,
    (table) =>
      `<div class="overflow-x-auto" tabindex="0" role="group" aria-label="Table, scrollable">${table}</div>`,
  );
}
