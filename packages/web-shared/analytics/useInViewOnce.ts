"use client";

/**
 * Fire `onInView` exactly once, the first time the referenced element actually
 * scrolls into the viewport. An honest "the user saw this", not a mere mount.
 *
 * Implemented as a CALLBACK ref, not a ref object + mount effect: the observer
 * attaches whenever the element actually APPEARS, including elements that
 * mount on a later render (e.g. an experiment arm that resolves client-side
 * after the first paint). The previous effect-based version only looked for
 * the element once, at component mount, so a surface rendered after variant
 * resolution could never record exposure (found live on generalist's
 * calc_promo_inline, 2026-06-11).
 *
 * If IntersectionObserver is unavailable, counts the attach as the impression
 * rather than silently losing it.
 */
import { useCallback, useRef } from "react";

export function useInViewOnce<T extends Element>(
  onInView: () => void,
): (el: T | null) => void {
  const firedRef = useRef(false);
  const cbRef = useRef(onInView);
  cbRef.current = onInView;
  const ioRef = useRef<IntersectionObserver | null>(null);

  return useCallback((el: T | null) => {
    ioRef.current?.disconnect();
    ioRef.current = null;
    if (!el || firedRef.current) return;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      cbRef.current();
    };

    if (typeof IntersectionObserver === "undefined") {
      fire();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fire();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    ioRef.current = io;
  }, []);
}
