/**
 * Minimal Telegram Bot API client for the lead-ops approval bot.
 *
 * Plain fetch, no SDK. Every send is best-effort and FAIL-OPEN: the bot is an
 * additive interface over the lead pipeline, so a Telegram outage must never
 * block a lead, a claim or a release. Callers branch on the boolean result and
 * fall back to the existing operator email paths.
 *
 * Messages must NEVER contain lead PII (no names, phone numbers, emails,
 * postcodes, raw messages). Telegram would otherwise become a data processor
 * that no privacy notice discloses. Builders in bot-notify.ts own that rule;
 * this module is transport only.
 */

export type InlineButton = { text: string; callback_data: string };

/** Rows of inline-keyboard buttons, e.g. [[a, b], [c]]. */
export type InlineKeyboard = InlineButton[][];

// .trim() every env read: a pasted token with a trailing newline turns every
// fetch into "Invalid value" at request time (known estate trap).
function botToken(): string {
  return (process.env.TELEGRAM_BOT_TOKEN || "").trim();
}

export function ownerChatId(): string {
  return (process.env.TELEGRAM_CHAT_ID || "").trim();
}

export function webhookSecret(): string {
  return (process.env.TELEGRAM_WEBHOOK_SECRET || "").trim();
}

export function telegramConfigured(): boolean {
  return Boolean(botToken() && ownerChatId());
}

/**
 * Master arm for the bot: env flag AND transport capability. The DB kill
 * switch (lead_nurture_control.bot_paused) is layered on top by callers that
 * need it; this predicate stays synchronous and cheap.
 */
export function botArmed(): boolean {
  const flag = (process.env.LEAD_BOT_ENABLED || "").trim();
  return (flag === "1" || flag === "true") && telegramConfigured();
}

const API_TIMEOUT_MS = 5000;

async function callApi(method: string, payload: Record<string, unknown>): Promise<boolean> {
  const token = botToken();
  if (!token) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[telegram] ${method} HTTP ${res.status}`, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[telegram] ${method} failed`, err);
    return false;
  }
}

/**
 * Send a message to the owner's chat. HTML parse mode; callers escape any
 * dynamic text with escapeHtml from notify-email. Returns false on ANY
 * failure (unconfigured, timeout, API error) and never throws.
 */
export async function sendTelegram(text: string, buttons?: InlineKeyboard): Promise<boolean> {
  const chatId = ownerChatId();
  if (!chatId) return false;
  return callApi("sendMessage", {
    chat_id: chatId,
    text: text.slice(0, 4096),
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...(buttons?.length ? { reply_markup: { inline_keyboard: buttons } } : {}),
  });
}

/** Replace a message's text + keyboard (used to re-render pickers in place). */
export async function editMessageText(
  messageId: number,
  text: string,
  buttons?: InlineKeyboard,
): Promise<boolean> {
  const chatId = ownerChatId();
  if (!chatId) return false;
  return callApi("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text: text.slice(0, 4096),
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...(buttons?.length ? { reply_markup: { inline_keyboard: buttons } } : {}),
  });
}

/** Strip (or swap) a message's buttons after an action so stale taps stop. */
export async function editMessageReplyMarkup(
  messageId: number,
  buttons?: InlineKeyboard,
): Promise<boolean> {
  const chatId = ownerChatId();
  if (!chatId) return false;
  return callApi("editMessageReplyMarkup", {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: { inline_keyboard: buttons ?? [] },
  });
}

/** Acknowledge a callback tap; `text` shows as a toast on the owner's phone. */
export async function answerCallbackQuery(callbackQueryId: string, text?: string): Promise<boolean> {
  return callApi("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    ...(text ? { text: text.slice(0, 200) } : {}),
  });
}
