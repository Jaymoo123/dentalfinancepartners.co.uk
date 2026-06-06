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

/* ---- INTEGRATION POINT: Vercel BotID -------------------------------------
 * To add platform-grade verification, install @vercel/botid and call
 * checkBotId() here, merging its verdict (e.g. reason: "botid"). Left as a
 * heuristic-only check until the dependency is enabled so this builds/runs with
 * no extra setup. The Python reclassifier remains the daily backstop either way.
 * -------------------------------------------------------------------------- */

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
