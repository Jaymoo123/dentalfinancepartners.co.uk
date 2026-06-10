/**
 * Server-side bot detection + minimal UA parsing for /api/track.
 *
 * Layered defence (the plan's Phase 4): this is the heuristic layer that runs at
 * ingest. Events are TAGGED is_bot (not dropped) so they can be audited, and the
 * human-only rollup views exclude them. Vercel BotID can be slotted in at the
 * marked integration point, and a Python reclassifier is the daily backstop.
 *
 * Never stores raw IP — callers pass it only for heuristics/rate-limiting.
 */

const BOT_UA =
  /bot|crawl|spider|slurp|mediapartners|bingpreview|headless|phantom|puppeteer|playwright|selenium|webdriver|curl|wget|python-requests|python-urllib|axios|node-fetch|go-http|java\/|httpclient|scrapy|facebookexternalhit|embedly|quora link|whatsapp|telegrambot|discordbot|googlebot|adsbot|applebot|yandex|baiduspider|duckduckbot|semrush|ahrefs|mj12bot|dotbot|petalbot/i;

export interface BotVerdict {
  isBot: boolean;
  reason: string | null;
}

/** Heuristic bot check from the request User-Agent. */
export function detectBot(ua: string | null): BotVerdict {
  if (!ua || ua.trim().length < 10) return { isBot: true, reason: "ua_missing" };
  if (BOT_UA.test(ua)) return { isBot: true, reason: "ua_pattern" };
  // Browsers always send a Mozilla/ token; its absence is a strong bot signal.
  if (!/mozilla\//i.test(ua)) return { isBot: true, reason: "ua_no_mozilla" };
  return { isBot: false, reason: null };
}

/* ---- Vercel BotID (platform-grade verification) --------------------------
 * Layered ON TOP of the heuristic: a positive BotID verdict can ADD a bot flag
 * the UA check missed, and its human verdict populates `botid_verified`. It is
 * intentionally fail-open — off-Vercel, unconfigured, or on error it returns
 * null and the heuristic alone governs, so ingest never breaks.
 *
 * Caveat: /api/track arrives via navigator.sendBeacon, which can't carry BotID's
 * client challenge, so this runs in basic (signal-only) mode — it hardens the
 * denominator at the margin rather than giving deep per-request proof. Deep mode
 * would require routing the action through a BotIdClient-instrumented fetch
 * (the lead form is the candidate, deferred). The Python reclassifier remains
 * the daily backstop regardless.
 * -------------------------------------------------------------------------- */

/** Tri-state human verdict from BotID: true=human, false=bot, null=unknown. */
export interface BotIdResult {
  /** BotID is confident this is an automated client. */
  isBot: boolean;
  /** true human / false bot / null unknown — maps straight to botid_verified. */
  verified: boolean | null;
}

/**
 * Platform-grade verification via Vercel BotID. Fail-open: any error (not on
 * Vercel, product not enabled, etc.) returns null so the caller falls back to
 * the heuristic. Keeps the hot path safe.
 *
 * ⚠️ DO NOT call this on /api/track or any other navigator.sendBeacon endpoint.
 * sendBeacon cannot carry BotID's client challenge, so checkBotId() returns
 * isBot=true for EVERY such request — when wired into ingest on 2026-06-08 it
 * false-flagged 100% of real visitors as bots and blanked the dashboard. Only
 * use it behind a BotIdClient-instrumented action (e.g. the lead form), where a
 * real challenge is present and "bot" is meaningful.
 */
export async function verifyBotId(): Promise<BotIdResult | null> {
  try {
    const { checkBotId } = await import("botid/server");
    const v = await checkBotId();
    const verified = v.isHuman ? true : v.isBot ? false : null;
    return { isBot: v.isBot === true, verified };
  } catch {
    return null;
  }
}

/** Very small UA → family parser (coarse cohorting only). */
export function parseUa(ua: string | null): { uaFamily: string; osFamily: string } {
  if (!ua) return { uaFamily: "unknown", osFamily: "unknown" };
  let uaFamily = "other";
  if (/edg\//i.test(ua)) uaFamily = "Edge";
  else if (/opr\/|opera/i.test(ua)) uaFamily = "Opera";
  else if (/chrome\//i.test(ua)) uaFamily = "Chrome";
  else if (/firefox\//i.test(ua)) uaFamily = "Firefox";
  else if (/safari\//i.test(ua)) uaFamily = "Safari";

  let osFamily = "other";
  if (/windows/i.test(ua)) osFamily = "Windows";
  else if (/iphone|ipad|ios/i.test(ua)) osFamily = "iOS";
  else if (/mac os x|macintosh/i.test(ua)) osFamily = "macOS";
  else if (/android/i.test(ua)) osFamily = "Android";
  else if (/linux/i.test(ua)) osFamily = "Linux";

  return { uaFamily, osFamily };
}
