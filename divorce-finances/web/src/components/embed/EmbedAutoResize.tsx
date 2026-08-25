"use client";

/**
 * Site-scoped EmbedAutoResize wrapper.
 *
 * The message type "dvf-embed-height" is stable for third-party embed pages
 * that embed our calculators listen for exactly this string. Changing it would
 * silently break live embeds on external sites. The shared component is
 * composed with the frozen type; the call sites stay prop-free.
 */
import { EmbedAutoResize as SharedEmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";

export function EmbedAutoResize() {
  return <SharedEmbedAutoResize messageType="dvf-embed-height" />;
}
