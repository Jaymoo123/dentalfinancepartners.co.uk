"use client";

import { useEffect, useRef, useState } from "react";

type Item = { title: string; body: string };

/**
 * Numbered "Why choose us" list. When the whole list is in the viewport, the
 * 01–04 figures light up one after another (staggered glow, honours
 * reduced-motion via the global media query since it's a CSS animation).
 */
export function WhyUsList({ items }: { items: Item[] }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /**
     * "Fully visible" is unreachable when the list is taller than the viewport,
     * which is the normal case on a phone with four items — a flat 0.99 meant
     * the numbers stayed dimmed forever there. So the required ratio is how
     * much of the list *can* be on screen at once, capped at 0.99 to survive
     * sub-pixel rounding and floored at 0.35 so it still waits for a real read.
     */
    const needed = () => {
      const height = el.getBoundingClientRect().height;
      if (!height) return 0.99;
      return Math.min(0.99, Math.max(0.35, window.innerHeight / height));
    };
    if (typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= needed())) {
          setPlay(true);
          io.disconnect();
        }
      },
      // Watch a spread of ratios, because the ratio we actually need depends on
      // how tall the list is relative to the viewport — see `needed`.
      { threshold: [0.2, 0.4, 0.6, 0.8, 0.99] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className="space-y-6 sm:space-y-8">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4 sm:gap-5">
          <span
            aria-hidden
            className={`font-mono text-2xl sm:text-3xl font-bold leading-none text-primary-600 ${
              play ? "animate-[num-glow_1.6s_ease-in-out_both]" : "opacity-30"
            }`}
            style={play ? { animationDelay: `${i * 0.7}s` } : undefined}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="border-l border-slate-200 pl-4 sm:pl-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-600">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
