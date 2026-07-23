import type { CSSProperties, ReactNode } from "react";

/**
 * Broadsheet figure caption: hairline top rule, "Fig. N – text. Source: X."
 * Rendered under every chart via ChartFigure. Ink-45 caption, oldstyle fig number.
 */
export function FigureCaption({
  fig,
  children,
  source,
}: {
  fig: number;
  children: ReactNode;
  source?: string;
}) {
  return (
    <figcaption
      style={{
        borderTop: "1px solid var(--color-hairline, #14161a1f)",
        marginTop: "0.75rem",
        paddingTop: "0.5rem",
        fontSize: "0.8125rem",
        lineHeight: 1.5,
        color: "var(--color-ink-70, #14161ab3)",
        fontVariantNumeric: "oldstyle-nums",
      }}
    >
      <span style={{ fontVariantNumeric: "oldstyle-nums" }}>Fig. {fig}</span>
      {" – "}
      {children}
      {source ? <> Source: {source}.</> : null}
    </figcaption>
  );
}

const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

/** Visually-hidden data table adjacent to each chart for screen readers. */
export function VisuallyHiddenTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <table style={visuallyHidden}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Wrapper every chart renders inside: SVG + hidden table + broadsheet caption. */
export function ChartFigure({
  fig,
  caption,
  source,
  children,
}: {
  fig?: number;
  caption?: ReactNode;
  source?: string;
  children: ReactNode;
}) {
  return (
    <figure style={{ margin: 0 }}>
      {children}
      {fig !== undefined && caption ? (
        <FigureCaption fig={fig} source={source}>
          {caption}
        </FigureCaption>
      ) : null}
    </figure>
  );
}
