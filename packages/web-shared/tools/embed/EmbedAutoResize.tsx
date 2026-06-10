"use client";

import { useEffect } from "react";

/**
 * Posts the document height to the parent window so an embedding iframe can
 * resize to fit the content.
 *
 * The parent listens for `{ type: messageType, height }` — see the embed
 * gallery page's resize snippet for the listener code.
 *
 * The messageType is site-scoped (e.g. "hd-embed-height") so the listener
 * on the embedding page selects only the right site's iframes.
 */
export function EmbedAutoResize({ messageType }: { messageType: string }) {
  useEffect(() => {
    const post = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      window.parent?.postMessage({ type: messageType, height }, "*");
    };
    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    window.addEventListener("load", post);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
    };
  }, [messageType]);

  return null;
}
