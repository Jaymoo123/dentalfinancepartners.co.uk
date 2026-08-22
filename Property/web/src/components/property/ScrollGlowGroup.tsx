"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from "react";

/**
 * Fires a one-time staggered glow across its direct children once the group is
 * fully on screen. The animation itself lives in globals.css keyed off
 * `data-glow="on"`, so children stay server-rendered: this wrapper only flips
 * the attribute and never needs to know what it is wrapping.
 *
 * "Fully on screen" is measured against the group, not the viewport, because a
 * threshold of 1 can never fire for a group taller than the viewport (tall
 * phones with three stacked cards). We ask for the highest ratio that is
 * actually reachable, so the sequence still runs on mobile, just at the point
 * where as much of the group as can be visible is visible.
 *
 * Disconnects after firing: this is a punctuation mark on first sight, not an
 * effect that should re-trigger every time the user scrolls back up.
 */
export function ScrollGlowGroup({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Seconds to hold before the first child glows, published as `--glow-delay`.
   * For a single-child group this is what keeps it feeling like the next beat
   * of a sequence rather than an unrelated flash the instant it appears. The
   * `:nth-child` stagger rules are more specific, so a multi-child group's
   * second and third children keep their own delays regardless.
   */
  delay?: number;
  /**
   * Element to render. `ol` is for groups that are genuinely a sequence — an
   * ordered flow of steps — so the glow can be added without giving up the
   * list semantics. The stagger keys off `:nth-child`, so it works the same
   * either way.
   */
  as?: "div" | "ol";
}) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect the OS setting: no observer, no animation, cards render at rest.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (typeof IntersectionObserver === "undefined") {
      setLit(true);
      return;
    }

    const reachable = Math.min(1, (window.innerHeight / node.offsetHeight) * 0.9);
    const target = Math.max(0.25, reachable);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= target - 0.01) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: [0.25, 0.5, 0.75, target, 1] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement & HTMLOListElement>}
      className={className}
      style={delay ? ({ "--glow-delay": `${delay}s` } as CSSProperties) : undefined}
      data-glow={lit ? "on" : "off"}
    >
      {children}
    </Tag>
  );
}
