"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Home,
  ShieldAlert,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons are addressed by name rather than passed in as components, because the
 * pages using this carousel are server components and a function prop cannot
 * cross that boundary. Adding a card icon means adding a key here.
 */
const ICONS: Record<string, LucideIcon> = {
  home: Home,
  building: Building2,
  growth: TrendingUp,
  alert: ShieldAlert,
  globe: Globe,
};

export type CarouselItem = {
  title: string;
  body: string;
  icon?: keyof typeof ICONS;
  /** Optional read-on link, rendered at the foot of the card. Both or neither. */
  href?: string;
  linkLabel?: string;
};

/** Long enough to read a card, not so long the rotation reads as broken. */
const ROTATE_MS = 6500;

/**
 * Horizontally scrolling version of `CardStack`, for sections where the card
 * count would otherwise make a very long column.
 *
 * Deliberate choices:
 * - Native scroll with CSS scroll snap, not a transform slider. Swipe, trackpad,
 *   keyboard and screen reader scrolling all work without us reimplementing them.
 * - Arrows page by the visible width, so they respect however many cards fit.
 * - Autoplay is opt-in per usage, and always pausable. See `autoplay` below.
 */
export function CardCarousel({
  items,
  tone = "slate",
  label,
  autoplay = false,
  numbered = false,
}: {
  items: CarouselItem[];
  tone?: "slate" | "white";
  label: string;
  /**
   * Badge each card with its position instead of an icon. For a set the copy
   * introduces as a count ("four routes do most of the work"), where the
   * numbering is part of the claim. Ignored on cards that carry an `icon`.
   */
  numbered?: boolean;
  /**
   * Rotate through the cards, wrapping at the end.
   *
   * It starts on its own and there is no play/pause button, by request. The
   * guards that remain are the implicit ones: no motion at all under
   * prefers-reduced-motion, a pause on hover and on keyboard focus, a pause
   * while the tab is hidden, and a permanent stop the moment someone works the
   * arrows or dots — once a reader has taken control, moving the panel under
   * them is just rude.
   *
   * Note for whoever revisits this: dropping the explicit control is a
   * departure from WCAG 2.2.2, which wants a pause mechanism for automatic
   * motion running past five seconds. Taking over with an arrow or a dot is the
   * mechanism now.
   */
  autoplay?: boolean;
}) {
  const surface = tone === "white" ? "bg-white" : "bg-slate-50";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const [stops, setStops] = useState(items.length);

  const [playing, setPlaying] = useState(autoplay);
  const [held, setHeld] = useState(false);
  const activeRef = useRef(0);
  const stopsRef = useRef(items.length);

  /**
   * Read the dot count off the DOM rather than the item count.
   *
   * Every card is a snap-start point, but the scroller stops at
   * scrollWidth - clientWidth, so the last (visible - 1) cards share the final
   * resting position. One dot per card therefore renders dots that can never
   * become active. Count only the cards whose offset is actually reachable, and
   * recount on resize because the visible count is a breakpoint of the layout.
   */
  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);

    const offsets = Array.from(el.children).map(
      (child) => (child as HTMLElement).offsetLeft - el.offsetLeft,
    );
    const reachable = Math.max(1, offsets.filter((offset) => offset <= max + 1).length);
    setStops(reachable);
    stopsRef.current = reachable;

    let nearest = 0;
    for (let i = 0; i < reachable; i += 1) {
      if (Math.abs(offsets[i] - el.scrollLeft) < Math.abs(offsets[nearest] - el.scrollLeft)) nearest = i;
    }
    setActive(nearest);
    activeRef.current = nearest;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  /** Someone taking control ends the rotation for the rest of the visit. */
  const takeOver = () => setPlaying(false);

  // Never animate for a reader who has asked us not to.
  useEffect(() => {
    if (!autoplay) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) setPlaying(false);
    const onChange = () => query.matches && setPlaying(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [autoplay]);

  useEffect(() => {
    if (!playing || held) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const next = activeRef.current + 1 >= stopsRef.current ? 0 : activeRef.current + 1;
      scrollToIndex(next);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [playing, held, scrollToIndex]);

  const page = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    takeOver();
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  const goTo = (index: number) => {
    takeOver();
    scrollToIndex(index);
  };

  const control =
    "flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

  return (
    <div
      className="mt-8 sm:mt-10"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div
        ref={scrollerRef}
        tabIndex={0}
        aria-live={playing ? "off" : undefined}
        className="flex snap-x snap-mandatory gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
      >
        {items.map((item, i) => {
          const Icon = item.icon ? ICONS[item.icon] : undefined;

          return (
            <div
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              className={`flex shrink-0 basis-[85%] flex-col snap-start rounded-xl sm:basis-[48%] lg:basis-[32%] ${surface} p-6 sm:p-8`}
            >
              {Icon ? (
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </div>
              ) : (
                numbered && (
                  <span
                    aria-hidden
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-base font-bold text-emerald-700 ring-1 ring-emerald-100"
                  >
                    {i + 1}
                  </span>
                )
              )}
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
              {item.href && item.linkLabel && (
                <Link
                  href={item.href}
                  onClick={takeOver}
                  className="mt-auto pt-4 text-sm font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  {item.linkLabel}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 sm:mt-6 flex items-center gap-4">
        <button type="button" onClick={() => page(-1)} disabled={atStart} className={control} aria-label="Previous">
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => page(1)} disabled={atEnd} className={control} aria-label="Next">
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
        {/* gap-0: the spacing between dots is now the buttons' own horizontal
            padding, which is what makes each target 24px wide. A gap on top of
            that would push them visibly apart. */}
        <div className="flex items-center gap-0">
          {items.slice(0, stops).map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${item.title}`}
              aria-current={i === active}
              // The button is the hit area (24px, WCAG 2.5.8) and the span is
              // the dot. They used to be the same element, which made the
              // target 8px tall: the hardest thing on the site to hit on a
              // phone, on the control most likely to be used there.
              className="group/dot flex h-6 items-center px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <span
                aria-hidden
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-emerald-600" : "w-2 bg-slate-300 group-hover/dot:bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
