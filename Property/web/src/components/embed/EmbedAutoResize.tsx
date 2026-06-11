"use client";

/**
 * Property-scoped EmbedAutoResize wrapper.
 *
 * The message type "ptp-embed-height" is FROZEN — third-party partner pages
 * that embed our calculators listen for exactly this string. Changing it would
 * silently break live embeds on external sites. The shared component is
 * composed with the frozen type; the call sites stay prop-free.
 *
 * Embed contract diff (F2 STOP check):
 *   Local (pre-F2):  window.parent.postMessage({ type: "ptp-embed-height", height }, "*")
 *   Shared:          window.parent.postMessage({ type: messageType, height }, "*")
 *   Composition:     <SharedEmbedAutoResize messageType="ptp-embed-height" />
 *   Verdict:         IDENTICAL wire format — STOP condition NOT triggered.
 */
import { EmbedAutoResize as SharedEmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";

export function EmbedAutoResize() {
  return <SharedEmbedAutoResize messageType="ptp-embed-height" />;
}
