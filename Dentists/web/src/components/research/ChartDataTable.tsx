/**
 * The accessible copy of a research chart.
 *
 * Every chart on the four `/research/*` pages draws its values as recharts
 * geometry: a `<rect>` or a `<path>` carries the number, and the only real text
 * nodes in the SVG are axis ticks. A screen reader therefore reached the axis
 * labels and not one data value. recharts' own `accessibilityLayer` does not
 * fix that: it sets `role="application"` and `tabIndex={0}` on the surface
 * (`recharts/lib/container/RootSurface.js`, MainChartSurface) and emits no
 * `<title>` or `<desc>` unless one is passed, so the result was an unnamed
 * application region wrapping geometry.
 *
 * The fix is the one phase 4 applied to `PremiumBarChart`: emit the values as
 * real text nodes in an `sr-only` table, mark the decorative svg subtree
 * `aria-hidden`, and use no `role="img"` anywhere (`role="img"` collapses its
 * whole subtree, so it would hide the values just as completely).
 *
 * The table is a SIBLING of the hidden chart, never a descendant. That
 * placement is the whole fix: an `aria-hidden` ancestor removes a node from the
 * accessibility tree outright, so a table nested inside the chart wrapper would
 * be exactly as unreachable as the bars.
 *
 * Callers pass values already formatted through the page's own `lib/research`
 * formatters, so the table reads the same numbers the chart draws, from one
 * binding.
 *
 * ponytail: one table component for all ten charts, not a bespoke summary per
 * chart. Rows are pre-formatted strings, so there is no formatting logic here
 * to drift away from the pages'.
 */

export function ChartDataTable({
  caption,
  columns,
  rows,
}: {
  /** What the chart shows, in a sentence. Read out before the data. */
  caption: string;
  /** Header cells. The first names the row key (region, month, year). */
  columns: string[];
  /** One array per row, already formatted. First cell is the row header. */
  rows: string[][];
}) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={c} scope="col" className={i === 0 ? undefined : "text-right"}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            <th scope="row">{row[0]}</th>
            {row.slice(1).map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
