"use client";

/**
 * IR35-scoped EmbedAutoResize wrapper.
 *
 * The message type "ir35-embed-height" is FROZEN -- third-party partner pages
 * that embed our calculators listen for exactly this string. Changing it would
 * silently break live embeds on external sites. The shared component is
 * composed with the frozen type; the call sites stay prop-free.
 */
import { EmbedAutoResize as SharedEmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";

export function EmbedAutoResize() {
  return <SharedEmbedAutoResize messageType="ir35-embed-height" />;
}
