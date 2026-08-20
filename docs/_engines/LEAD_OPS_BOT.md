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
3. **Buyer accepts by REPLYING YES** (owner decision 2026-08-19: no button, no
   link in the ping; replies land on the inbound capture subdomain). A
   yes-family first line (YES/y/yep/accept/interested, any casing, negations
   refused, first line only so signatures cannot flip it) with exactly ONE
   open offer claims it atomically on the spot, and the bot asks you
   `[Release details £X] [Credit]`. Your tap sends the full details. One
   nudge after 1h. No winner ack email (the release email is the
   confirmation); losers/latecomers get a one-line "no longer available" or
   "fully allocated" note. A yes with SEVERAL open offers, or any other
   reply, surfaces in Telegram with per-offer `[Claim & release for them]`
   buttons instead (a bare yes cannot safely pick between leads).
   The old `/api/leads/claim/[token]` route stays live for any in-flight
   emails that still carry a link.
4. **Claim-race model, LIVE since 2026-08-19** (`claim_lead_offer()` SQL
   function, migration 20260819000002, atomic per lead): up to
   `CLAIM_SLOTS_PER_LEAD` (3) firms share a lead at the SAME fixed price;
   the 3rd claim closes the remaining offers; firm 4 gets "fully allocated".
   "yes exclusive" in the reply buys the lock at 3x, only while the lead is
   wholly unclaimed; the race decides, and an exclusive lock closes the lead
   to everyone. **Test buyers (`lead_buyers.is_test`) never consume a slot,
   never block an exclusive, and never appear in /month or the invoice.**
   Each claiming firm gets its own release tap and its own invoice line.
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

- **Lead content in Telegram is initials + redacted teaser only** (owner
  decision 2026-08-19: leads shown as `J.D. (L-xxxxxxxx)`). Never full names,
  numbers, emails, postcodes or raw enquiry text; buyer replies truncated.
  This keeps Telegram out of the processor list; the privacy notices do not
  name it.
- **Redaction is two AI passes, no regex, fail-closed** (owner decision
  2026-08-20 after a regex leak: an enquiry naming "KAN.AI ... Edinburgh"
  passed the pattern layer verbatim). `redactEnquiry` (gateway Opus) reads the
  enquiry and writes the situation summary; `verifyNoIdentifiers`
  independently checks the exact string that renders; anything unverified is
  withheld and the teaser degrades to structured facts only. Same verify pass
  gates the grading `intent_line`. The python `lead_engine/scripts/tiers.py`
  regex `redact()` is now a dry-run-only artefact and no longer mirrors the
  live path.
- **Pre-claim surface is situation-only** (owner decision 2026-08-20, second
  same-day pass, REVERSING 2026-08-14's verbatim-enquiry call): the enquirer's
  own words never ship before a claim, even tokenised; phrasing is
  re-identifiable residue. Buyers decide on the anonymised paraphrase; the
  full enquiry + contact details arrive on claim. `teaser.redacted_message`
  is a legacy field that renders only for teasers stored before the flip.
- Every button acts through a conditional DB transition; zero rows updated =
  stale tap = toast. Chat history holds no state.
- Every bot send is fail-open with an email fallback; a Telegram outage can
  delay convenience, never a lead.
- The tier on a ping is read from `lead_value_scores.case_tier` (recorded at
  grading time), never re-derived. Owner override writes `scored_by='owner'`
  and always wins.
- The 24h raw window is an owner-accepted divergence from the published 7-day
  wording (decision 2026-08-19); documents deliberately NOT regenerated.
- The claim-race accounting-lane model is LIVE (see the loop above). Still not
  ported: the adjacent lane and decay-cascade (no adjacent buyers exist);
  revisit when one signs.
- **Expiry alerts: one per lead, silent when the lead sold** (owner decision
  2026-08-20 after five noise pings in one sweep: a claim leaves sibling
  offers open until their own 24h expiry, which is the expected end-state,
  not news). The ping carries the highest-priced expired offer.
- **[Send to Sid] on expiry alerts** (owner decision 2026-08-20): free
  hand-off of the full lead to the unbilled fallback buyer, lead_buyers ref
  `sidekick` (sid@sidekickaccounting.co.uk, is_test=true so it never appears
  in money views or consumes claim slots; sources empty so pool sends never
  match it; DSA confirmed signed by owner 2026-08-20). Straight release, no
  accept step: the tap inserts a £0 claimed offer (the lead+buyer unique key
  is the double-tap latch, Sid's copy reuses the stored anonymised teaser)
  and fires the normal release email + nurture halt. Blocked when the lead
  was claimed/credited by a paying buyer, the enquirer objected, or Sid's
  row is paused/unsigned.

## Known limits (v1)

- `/month` is a read-only summary; the python invoice script is the billing
  source of truth.
- One raw recipient, one owner chat. Multi-buyer raw and multi-operator chat
  are deliberate non-features until needed.
- Adjacent lane, exclusivity multiplier and cascade pricing are not live.
