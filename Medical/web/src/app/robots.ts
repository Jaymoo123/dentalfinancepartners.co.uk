import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.ts — explicit allow-list for every major AI and search engine crawler.
 *
 * Two named blocks below make future opt-out a one-line change per group:
 *   TRAINING BOTS  — crawlers that build LLM training corpora (currently ALLOWED).
 *                    To opt out of training, delete or disallow this block.
 *   RETRIEVAL BOTS — crawlers that power AI answer engines + search indices
 *                    (OAI-SearchBot, PerplexityBot, Claude-SearchBot, bingbot …).
 *                    Keep these ALLOWED to maintain citation / ranking surface.
 *
 * Explicit named rules beat the wildcard because many bots only honour their
 * own entry. Mirrors the Property gold-standard robots.ts.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  // /admin is the login-gated in-app console and /embed is the calculator
  // iframe surface. Neither is a page anyone should reach from a SERP, and
  // /admin/analytics/* carries no route-level `robots` export, so this list is
  // the only thing keeping it out of an index. /book and /complete are covered
  // by their own `robots: { index: false }` metadata.
  /* /complete sits beside /thank-you: both are post-submit surfaces, neither is
     in the sitemap, and neither is linked from anywhere crawlable. Blocking one
     and not the other was an inconsistency a review caught. /book is the third
     of the same kind: it is token-gated post-submit and must never be a public
     destination. */
  const disallow = ["/api/", "/thank-you", "/complete", "/book", "/admin", "/embed"];

  // ---------------------------------------------------------------------------
  // TRAINING BOTS — LLM corpus crawlers (ALLOWED; delete block to opt out)
  // ---------------------------------------------------------------------------
  const trainingBots = [
    // OpenAI training
    "GPTBot",
    "ChatGPT-User",
    // Anthropic training
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "Claude-User",
    // Common Crawl (training data for many open-source models)
    "CCBot",
    // Cohere
    "cohere-ai",
    "cohere-training-data-crawler",
    // ByteDance / TikTok
    "Bytespider",
    // Mistral
    "MistralAI-User",
    // Google extended training
    "Google-Extended",
    "GoogleOther",
    // Apple extended
    "Applebot-Extended",
    // Meta training
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "FacebookBot",
    "facebookexternalhit",
    // Diffbot (used in Apple / many AI pipelines)
    "Diffbot",
    // Amazon (Alexa, Rufus)
    "Amazonbot",
  ];

  // ---------------------------------------------------------------------------
  // RETRIEVAL BOTS — AI answer-engine + search-index crawlers (KEEP ALLOWED)
  // ---------------------------------------------------------------------------
  const retrievalBots = [
    // OpenAI retrieval
    "OAI-SearchBot",
    // Anthropic retrieval
    "Claude-SearchBot",
    // Perplexity
    "PerplexityBot",
    "Perplexity-User",
    // Microsoft / Bing
    "bingbot",
    "msnbot",
    "adidxbot",
    // DuckDuckGo
    "DuckAssistBot",
    "DuckDuckBot",
    // Google search
    "Googlebot",
    "Googlebot-Image",
    "Googlebot-News",
    // You.com
    "YouBot",
    // Brave
    "BraveBot",
    // Apple search
    "Applebot",
    // Yandex
    "YandexBot",
    "YandexImages",
    // Naver
    "Yeti",
    // Seznam
    "SeznamBot",
    // Mojeek (independent index)
    "MojeekBot",
    // Ahrefs / Yep
    "AhrefsBot",
    "YepBot",
    // Social previews (OG card rendering)
    "Twitterbot",
    "LinkedInBot",
    "Slackbot",
    "Discordbot",
    "WhatsApp",
    "TelegramBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...trainingBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
      ...retrievalBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
