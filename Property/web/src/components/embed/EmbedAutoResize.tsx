"use client";

import { useEffect } from "react";

/**
 * Posts the document height to the parent window so an embedding iframe can
 * resize to fit the content (it grows when, e.g., a relief warning appears).
 * The parent listens for { type: "ptp-embed-height", height } — see the embed
 * snippet given to partners.
 */
export function EmbedAutoResize() {
  useEffect(() => {
    const post = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      window.parent?.postMessage({ type: "ptp-embed-height", height }, "*");
    };
    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    window.addEventListener("load", post);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
    };
  }, []);

  return null;
}
