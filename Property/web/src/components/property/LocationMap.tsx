import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * A map of Great Britain and Northern Ireland with the office cities pinned.
 *
 * The coastline is a hand-built ring of about 130 real headlands, ports and estuary mouths, projected
 * with the pins on one equirectangular projection (longitude scaled by cos 55 degrees, the
 * mid-latitude of the islands). That shared projection is the whole point: the pins land where the
 * cities actually are rather than where they looked about right. The point count is what buys the
 * recognisable shape, because Wales, Cornwall, the Wash, the Bristol Channel and the Firth of Clyde
 * all need coordinates to exist.
 *
 * It is still a stylised map, not a survey. Islands other than Great Britain and Ireland's north are
 * left off, and the smaller inlets are straightened.
 *
 * Pins are numbered rather than labelled. Manchester and Leeds are close enough that text on the map
 * would collide at this size, and a number ties each pin to its row in the list beside it without any
 * risk of overlap. Both the pin and the row link to the same page.
 */

const VIEW_W = 300;
const VIEW_H = 463;

const GB_PATH =
  "M94.7 2.1L102.0 5.3L112.7 8.0L118.8 7.4L139.5 3.7L144.1 0.0L153.2 1.6L152.6 12.2L135.5 29.2L129.4 35.0L124.0 41.9L131.9 43.0L123.7 52.6L118.2 63.2L128.8 57.9L146.5 50.4L156.5 52.6L169.6 53.1L185.8 52.0L192.5 61.6L183.0 80.7L179.4 90.8L171.5 104.1L168.1 112.0L156.2 117.4L167.8 126.9L150.5 135.9L149.5 142.8L169.9 141.8L181.5 147.1L185.8 154.0L197.7 174.2L203.5 193.8L204.7 199.7L209.8 211.3L214.1 215.1L228.1 222.0L234.5 233.1L244.3 241.6L240.9 243.7L241.8 252.8L250.1 270.3L236.6 261.8L244.6 271.3L254.6 283.0L257.1 293.6L247.6 302.1L258.9 314.4L261.6 304.3L272.6 303.2L286.3 304.8L299.4 321.8L300.0 329.2L295.4 346.2L287.8 356.3L281.7 365.3L268.3 379.1L288.7 386.6L289.9 389.8L286.6 400.4L276.5 412.1L264.1 415.2L254.3 421.1L242.4 416.8L222.6 421.6L213.2 418.4L204.1 412.6L189.4 422.1L187.0 428.0L172.1 428.0L157.2 422.1L142.8 427.5L135.5 448.7L120.6 440.7L105.4 442.9L88.3 462.5L72.8 456.7L79.8 449.2L92.0 438.6L108.1 416.3L108.7 406.2L121.2 396.1L141.0 396.1L155.9 388.7L164.5 380.7L165.1 373.3L155.6 378.1L149.8 382.9L126.7 374.4L115.7 371.2L103.6 371.7L94.4 371.2L86.2 360.5L95.0 353.6L104.8 349.9L122.4 332.4L123.4 315.9L112.4 306.9L103.2 311.7L116.6 293.6L105.7 284.6L114.5 279.3L120.9 288.9L130.1 284.1L140.4 284.1L151.4 287.8L149.8 280.9L154.4 277.2L155.0 266.6L153.8 257.5L154.7 252.2L159.3 244.3L148.6 242.1L142.8 229.4L137.4 218.8L138.6 214.0L140.1 210.3L143.5 201.8L149.2 197.5L137.1 195.9L123.4 203.4L98.7 214.5L93.5 200.2L98.7 182.1L105.7 170.5L102.0 144.4L81.6 148.7L75.8 172.0L70.1 178.4L73.7 162.0L77.7 137.0L80.1 120.0L57.3 103.0L69.1 88.7L72.5 73.8L69.1 65.8L73.1 50.4L89.5 40.9L86.8 27.6L92.9 11.7Z";

const NI_PATH =
  "M56.6 184.3L43.9 184.3L41.1 188.0L35.0 185.3L24.1 192.2L19.5 203.9L12.2 216.1L0.0 222.5L6.1 232.0L22.8 238.4L35.0 242.7L53.6 238.4L57.9 245.3L64.3 244.8L67.3 236.3L77.7 227.8L78.3 214.0L74.0 212.9L67.0 216.1L69.7 210.3L70.1 202.8L62.4 190.6Z";

/** North to south, so the numbers read down the map. */
const PINS: Array<{ slug: string; city: string; x: number; y: number }> = [
  { slug: "leeds", city: "Leeds", x: 199.5, y: 258.6 },
  { slug: "manchester", city: "Manchester", x: 178.4, y: 275.5 },
  { slug: "birmingham", city: "Birmingham", x: 189.1, y: 328.4 },
  { slug: "london", city: "London", x: 242.8, y: 380.3 },
  { slug: "bristol", city: "Bristol", x: 167.9, y: 383.1 },
];

/** The map only knows about cities the site actually has a page for. */
const PINNED = PINS.filter((pin) => siteConfig.locations.some((loc) => loc.slug === pin.slug));

export function LocationMap({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Across the UK</p>

      <div className="mt-5 grid gap-6 sm:grid-cols-[minmax(0,10rem)_1fr] sm:items-center sm:gap-8">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mx-auto h-auto w-40 sm:w-full"
          role="img"
          aria-label="Map of the United Kingdom showing the cities we cover"
        >
          <g fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" strokeLinejoin="round">
            <path d={GB_PATH} />
            <path d={NI_PATH} />
          </g>
          {PINNED.map((pin, i) => (
            <Link
              key={pin.slug}
              href={`/locations/${pin.slug}`}
              aria-label={`Property accountants in ${pin.city}`}
              className="group"
            >
              {/* Invisible hit circle. The visible pin is r=16, which scales
                  down to a 17px target at 390px wide, under the WCAG 2.5.8
                  minimum. This one is not painted and only widens the target;
                  it scales with the SVG, so it stays proportionate. */}
              <circle cx={pin.x} cy={pin.y} r="26" fill="transparent" />
              <circle
                cx={pin.x}
                cy={pin.y}
                r="16"
                className="fill-emerald-600 transition-colors group-hover:fill-emerald-700"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text
                x={pin.x}
                y={pin.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none fill-white text-[16px] font-bold"
              >
                {i + 1}
              </text>
            </Link>
          ))}
        </svg>

        <div>
          <ul className="space-y-1">
            {PINNED.map((pin, i) => (
              <li key={pin.slug}>
                <Link
                  href={`/locations/${pin.slug}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">
                    {pin.city}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/locations"
            className="mt-4 inline-block px-2 py-0.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            All locations &rarr;
          </Link>
        </div>
      </div>

      {/* Rule Zero (c): slate-500, not the designer's slate-400. 11px on this
          card's white ground, so the 4.5:1 AA floor applies and slate-400
          measures 2.63:1 against it. */}
      <p className="mt-6 text-[11px] leading-relaxed text-slate-500">
        We act for landlords across the UK, not only in these cities.
      </p>
    </div>
  );
}
