/**
 * Geometrically correct Union Jack inline SVG.
 *
 * Based on the official 2:1 ratio specification:
 *  - Blue field: #012169
 *  - White diagonals (saltires) and horizontal/vertical cross fimbriation: white
 *  - Red cross of St George and diagonal cross of St Patrick: #C8102E
 *  - St Andrew saltire (Scotland) at full width, St Patrick counter-charged beneath
 *
 * Accessible: role="img" + aria-label.
 * Crisp at small sizes: no subpixel coordinates, viewBox 60x30 (2:1).
 */

type UnionJackProps = {
  /** Pixel width. Height is derived at 1:2 ratio. */
  width?: number;
  className?: string;
  "aria-label"?: string;
};

export function UnionJack({
  width = 30,
  className,
  "aria-label": ariaLabel = "Union Jack flag",
}: UnionJackProps) {
  const height = width / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      {/* Blue field */}
      <rect width="60" height="30" fill="#012169" />

      {/*
        St Andrew's Cross (Scotland) — white saltire, full diagonal.
        Top-left to bottom-right and top-right to bottom-left.
        Each arm is 1/5 of the shorter dimension wide (30/5=6 units).
      */}
      {/* Top-left to bottom-right white arm */}
      <polygon points="0,0 6,0 60,27 60,30 54,30 0,3" fill="#fff" />
      {/* Top-right to bottom-left white arm */}
      <polygon points="54,0 60,0 60,3 6,30 0,30 0,27" fill="#fff" />

      {/*
        St Patrick's Cross (Ireland) — red saltire, counter-charged (offset).
        Sits inside the white saltire: 2/5 width of the white (2 units).
        Counter-charged means the red is on opposite sides of the centre on each diagonal.
      */}
      {/* Top-left diagonal — red on lower half of the white arm */}
      <polygon points="0,3 2,0 30,13.5 30,16.5" fill="#C8102E" />
      <polygon points="58,0 60,0 60,3 30,16.5 30,13.5" fill="#C8102E" />
      {/* Bottom-right diagonal — red on upper half of the white arm */}
      <polygon points="60,27 60,30 58,30 30,16.5 30,13.5" fill="#C8102E" />
      <polygon points="0,27 2,30 0,30 30,13.5 30,16.5" fill="#C8102E" />

      {/*
        St George's Cross (England) — white fimbriation then red.
        Horizontal bar: 1/3 height (10 units), centred at 15.
        Vertical bar: 1/3 width (20 units), centred at 30.
      */}
      {/* White fimbriation horizontal */}
      <rect x="0" y="11" width="60" height="8" fill="#fff" />
      {/* White fimbriation vertical */}
      <rect x="26" y="0" width="8" height="30" fill="#fff" />
      {/* Red horizontal */}
      <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
      {/* Red vertical */}
      <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
    </svg>
  );
}
