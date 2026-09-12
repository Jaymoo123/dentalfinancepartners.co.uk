/**
 * Visually-hidden data table that carries an SVG chart's values into the
 * accessibility tree.
 *
 * The charts on this site are decorative inline SVG: they are marked
 * aria-hidden so a screen reader skips the drawing, and this table (rendered
 * with the site's existing Tailwind `sr-only` utility, same one used by the
 * homepage table caption and the skip link) is what actually carries the
 * numbers. First cell of each row is a row header.
 *
 * ponytail: plain table, no caching/memo. Series are tens of rows at most.
 */
export function ChartDataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    // The `sr-only` utility sits on a plain block WRAPPER, never on the <table>
    // itself. `sr-only` works by pinning the box to 1px x 1px with
    // overflow:hidden, but CSS table layout treats `width` as a MINIMUM: a
    // display:table box cannot be squeezed below its min-content width, so
    // `width:1px` on the table is ignored, the absolutely positioned table lays
    // out at its natural width and contributes real scrollable overflow to the
    // document (measured: right=428 on a 390px viewport). `clip`/`clip-path`
    // only affect painting, not the scroll area, so they do not save it.
    // A <div> honours width:1px, and its overflow:hidden contains the table.
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
