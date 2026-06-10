"use client";

/**
 * Fire `onInView` exactly once, the first time the referenced element actually
 * scrolls into the viewport. An honest "the user saw this", not a mere mount.
 *
 * If IntersectionObserver is unavailable, counts the mount as the impression
 * rather than silently losing it.
 */
import { useEffect, useRef } from "react";

export function useInViewOnce<T extends Element>(
  onInView: () => void,
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const firedRef = useRef(false);
  const cbRef = useRef(onInView);
  cbRef.current = onInView;

  useEffect(() => {
    if (firedRef.current) return;
    const el = ref.current;
    if (!el) return;

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
    return () => io.disconnect();
  }, []);

  return ref;
}
