# Lead-ops Telegram bot — runbook

Built 2026-08-19. The owner runs the whole lead-sale loop from Telegram inline
buttons; the bot is a second front-end over the existing offer/claim pipeline
(`docs/_engines/CENTRAL_LEAD_PIPELINE.md`). It is additive, never load-bearing:
if Telegram is down, every prompt falls back to the existing operator emails and
claims auto-release exactly as before the bot existed.

## The loop, end to end

1. **Lead verifies** (contactability gate passes, any hour). The bot grades it
   against the rubric (`docs/CLASSIFY.md`) via the Vercel AI Gateway and sends:
   redacted teaser + suggested tier + price + reasons.
   Buttons: `[Send to pool £X] [Change tier] [Hold] [Bin]`.
   If the AI is down the message shows a tier picker instead and YOUR tap is
   the classification (the keyword fallback is never trusted with a price).
2. **Send to pool** emails the redacted ping to every matching signed buyer
   (existing `sendOffers`, 24h expiry). Gates applied automatically: enquirer
   suppression, signed DSA + active buyer, stored consent-wording check,
   never-if-raw-supplied.
3. **Buyer claims** via the link. The claim is atomic and instant (race
   decided, price fixed, siblings lost, nurture halted), then the bot asks:
   `[Release details £X] [Credit]`. Your tap sends the full details. One nudge
   after 1h if you have not tapped. If the bot cannot reach you, the release
   goes out automatically (published terms say real time).
4. **Buyer replies by email instead** (to the offer ping): the bot shows the
   reply verbatim (truncated) with `[Claim & release for them] [Ignore]` per
   open offer.
5. **Offer expires unclaimed** (24h): bot notifies with `[Re-offer for 24h]`.
6. **Raw batch, daily 08:00**: leads unverified past 24h are listed, split
   into "not in nurture" vs "mid-nurture" (selling a mid-nurture lead ends its
   chase and any future tiered sale, so those need the explicit second
   button). Buttons: `[Send batch (n)] [Include mid-nurture (n+m)] [Pick] [Skip]`.
   A batch is ONE email of full details to the single raw buyer
   (`LEAD_RAW_BUYER_REF`), £5/lead equivalent, sold as seen, logged in
   `lead_supply`. A supplied lead is excluded from tiered offers forever; if
   it later verifies or replies, the bot tells you and nothing else fires.

Commands: `/status` (pipeline counts), `/month [YYYY-MM]` (invoice view),
`/pause` (bot silent, claims auto-release again), `/resume`.

## Money

- `lead_offers` is the ledger for tiered sales (`price_gbp` snapshotted at
  offer time), `lead_supply` for raw.
- Invoice on the 1st: `python scripts/lead_offers_invoice.py YYYY-MM`
  (set `BANK_DETAILS` in the script first; still empty as of 2026-08-19).
  Claimed-but-never-released rows print as EXCEPTIONS and are NOT billed;
  release or credit them first.
- Credits: `[Credit]` button on a claim, or
  `python scripts/lead_offers_invoice.py YYYY-MM --credit OFFER_ID REASON`.

## Onboarding a new buyer (the whole workflow)

1. Get the agreement signed (`legal/build_agreement.py` pack).
2. Insert a `lead_buyers` row: `ref`, `firm_name`, `contact_name`, `email`,
   `sources` (array of site keys), `min_tier`, and **`dsa_signed_at` only when
   the signed copy is back** (that timestamp IS the arming switch; alerts and
   claims are refused without it).
3. Nothing else. The next qualifying lead pings them automatically.
4. To make a firm the raw-batch recipient: set `LEAD_RAW_BUYER_REF` to its
   `ref` in Vercel env.

## Env vars

| Var | Meaning |
|---|---|
| `TELEGRAM_BOT_TOKEN` | BotFather token |
| `TELEGRAM_CHAT_ID` | Owner's chat id; send target AND inbound allowlist |
| `TELEGRAM_WEBHOOK_SECRET` | Checked against Telegram's secret-token header |
| `LEAD_BOT_ENABLED` | Master arm ("1"). Unset = pipeline behaves as pre-bot |
| `LEAD_RELEASE_AUTO` | "1" = instant release at claim (no-deploy revert path) |
| `LEAD_RAW_SOURCES` | CSV of sites whose leads may enter the raw lane |
| `LEAD_RAW_BUYER_REF` | `lead_buyers.ref` of the single raw recipient |
| `LEAD_RAW_PRICE_GBP` | Raw per-lead price (default 5) |
| `HEARTBEAT_LEAD_RAW_BATCH` | Dead-man URL for the daily raw cron |

Existing knobs reused unchanged: `LEAD_OFFER_SOURCES`, `LEAD_OFFER_PRICES`,
`LEAD_OFFER_MIN_TIER`, `LEAD_OFFER_FROM`, `LEAD_OFFER_BASE_URL`, `CRON_SECRET`.

## Arming sequence (deploy dark first)

1. Apply migration: `python scripts/apply_web_analytics_migrations.py prod 20260819`
   (staging first). Pre-deploy: confirm prod already has `20260810000001` +
   `20260814000001` (lead_value_scores.case_tier etc); apply in order if not.
2. Deploy Property (clean-worktree recipe). Everything ships inert.
3. BotFather: `/newbot` → copy token; `/setcommands`:
   `status - pipeline counts`, `month - invoice month`, `pause - silence bot`,
   `resume - re-arm`.
4. Vercel env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET` (32+ random
   chars). Redeploy.
5. Register:
   `curl "https://api.telegram.org/bot<TOKEN>/setWebhook" -d "url=https://www.propertytaxpartners.co.uk/api/telegram/webhook" -d "secret_token=<SECRET>" -d 'allowed_updates=["message","callback_query"]'`
   then check `getWebhookInfo`.
6. DM the bot `/start`; read your chat id from the Vercel function logs
   (`TELEGRAM_CHAT_ID unset; sender chat id: ...`); set `TELEGRAM_CHAT_ID`;
   redeploy; `/status` should answer.
7. `LEAD_BOT_ENABLED=1` → verify pings, holds, expiry alerts live.
8. Raw lane last: `LEAD_RAW_SOURCES` + `LEAD_RAW_BUYER_REF` (buyer row must
   carry `dsa_signed_at`). The 08:00 prompt starts the next morning.

## Rollback ladder (no deploy needed at any rung)

1. `/pause` — bot silent, claims auto-release (published terms restored).
2. `LEAD_RELEASE_AUTO=1` — keep pings, drop the release hold.
3. Unset `LEAD_BOT_ENABLED` — bot fully off, pipeline identical to pre-bot.
4. `curl https://api.telegram.org/bot<TOKEN>/deleteWebhook` — Telegram detached.
5. Migration rollback block in `20260819000001_telegram_lead_ops.sql`
   (export `lead_supply` first if it has rows: it is the raw billing ledger).

## Design rules baked in (do not regress)

- **No lead PII in any Telegram message** (names, numbers, emails, postcodes,
  raw enquiry text). Teaser fields + rubric intent_line only; buyer replies
  truncated; leads referenced as `L-xxxxxxxx`. This keeps Telegram out of the
  processor list; the privacy notices do not name it.
- Every button acts through a conditional DB transition; zero rows updated =
  stale tap = toast. Chat history holds no state.
- Every bot send is fail-open with an email fallback; a Telegram outage can
  delay convenience, never a lead.
- The tier on a ping is read from `lead_value_scores.case_tier` (recorded at
  grading time), never re-derived. Owner override writes `scored_by='owner'`
  and always wins.
- The 24h raw window is an owner-accepted divergence from the published 7-day
  wording (decision 2026-08-19); documents deliberately NOT regenerated.
- Live claim model is one-claim-exclusive (DB index enforced). The claim-race
  3+3-lane model exists only in `lead_engine/` + `config/tiers.json`; port it
  when buyer #2 signs.

## Known limits (v1)

- `/month` is a read-only summary; the python invoice script is the billing
  source of truth.
- One raw recipient, one owner chat. Multi-buyer raw and multi-operator chat
  are deliberate non-features until needed.
- Adjacent lane, exclusivity multiplier and cascade pricing are not live.
