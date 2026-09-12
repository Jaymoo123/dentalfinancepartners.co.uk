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
    <table className="sr-only">
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
  );
}
