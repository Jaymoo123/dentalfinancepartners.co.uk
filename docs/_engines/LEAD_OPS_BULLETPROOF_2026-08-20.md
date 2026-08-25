# Lead-ops bulletproofing audit, 20 August 2026

Proactive scenario audit of the lead nurture + Telegram sale loop, owner-commissioned:
"solve for the problems that have not happened yet". Six parallel code walks covered
the webhook, the claim race, redaction/AI, crons + raw lane + Sid, nurture/money
interplay, and env/migrations/compliance. Roughly 45 findings after dedupe. This file
is the ledger; the runbook (`LEAD_OPS_BOT.md`) stays the operating doc.

**What was verified solid (no action):** claim atomicity via the per-lead row lock;
price snapshots at offer time (env/tier drift cannot change a bill at claim); DSA +
suppression gates on every send path; the 3-cap cannot be exceeded (re-offers, races,
late signers all re-count under the lock); fail-closed two-pass redaction on new
teasers; supplied-once latch on the raw lane; crons self-heal after missed days; all
24h windows are epoch math (DST-immune); Sid hand-off gates match the runbook.

## Owner decisions recorded 2026-08-20

- **Credits are dead-lead refunds on exclusive claims only.** No shared-claim
  credits, no prepaid credit packs. Buyer-facing copy aligned; the [Credit] button
  and `--credit` flag remain as internal ops tools.
- Raw prompt schedule stays as built (08:00 UTC daily).
- No solicitor-review list exists; Sid-hand-off legal categorisation left alone.
- DSA "Alert = enquirer's own words" wording: semantics, fix at a later version.
- Fix the rest, provided nothing reaches Rob and nothing gets stricter or more
  complex than needed. Deploy remains owner-triggered; everything below is local
  until then.

## Fixed in this pass (commit pending, deploy owner-gated)

| ID | Defect | Fix |
|---|---|---|
| P0-1 | Buyer replies YES while Telegram down/paused/unarmed: claim created, nothing releases it, nobody told; `/pause` + `LEAD_RELEASE_AUTO` ignored on this path | Inbound route now mirrors the claim-token route: hold only when the prompt provably delivered, else instant release |
| P0-2 | Test buyer's "yes exclusive" locks the lead against all real firms; twin test sims copied the bug | Migration `20260820000002`: exclusive-lock count joins `lead_buyers`, ignores `is_test`; both sims synced + regression tests |
| P0-3 | [Re-offer] re-emails pre-08-20 regex-redacted teasers unverified (KAN.AI leak class) under an "independently verified" line | Legacy `redacted_message` removed from both teaser renderers; legacy teasers render structured facts only |
| P0-4 | Expiry alerts fire-once with no fallback: Telegram blip or paused bot = the [Re-offer]/[Send to Sid] decision lost forever | One batched operator fallback email per sweep when the ping fails or the bot is dark (implements the runbook's existing fail-open rule) |
| P0-5 | Invoice: credited rows subtracted from a gross they were never in (bill understated); raw lane never billed; BANK_DETAILS knob didn't exist | Credited-in-month rows list at £0 with no deduction; prior-window credits print as a manual-adjust note; `lead_supply` section added (is_test excluded); BANK_DETAILS constant + refusal when empty |
| P1-1 | Stale-thread YES silently claims the buyer's one other open lead when the subject ref is no longer open | Ref-present-but-unmatched never falls back; routes to owner buttons (or "already yours" ack) |
| P1-2 | "Interested, can you share a bit more first?" auto-claims | First line with `?` or maybe/possibly/depends refused; yes-vocabulary otherwise untouched |
| P1-3 | Buyer reply from alias/mixed-case address dies silently | Case-insensitive buyer match; unknown sender whose subject carries a lead ref pings the owner (no claim) |
| P1-4 | [Bin] left open offers claimable and releasable | Bin withdraws open offers, toast counts them; [Send to pool] refuses binned leads |
| P1-5 | Backfilled `intent_line`s (08-14 run stored raw message prefixes) render to Telegram unverified | Pre-08-20 rows verified once at read; failures dropped and nulled in DB |
| P1-6 | No suppression re-check at release: objection landing between claim and [Release] tap still delivered | One `isSuppressed` check before the release latch; owner alerted, row left for credit/close |
| P1-7 | Raw batch beyond the 30s webhook budget latches leads as supplied that the buyer never received; insert failure stranded leads with no revert | 30-per-tap cap with "N remaining"; compensating status revert + failure-alert inclusion |
| P1-8 | Sold leads still got T-24/T-2 booked-slot reminders; concierge would chat with sold enquirers | Both now skip sold/binned leads |
| P1-9 | Legacy claim page sold exclusivity ("first firm to accept gets the lead") under the 3-share model, and promised credits on shared claims | Copy rewritten to the shared model; shared-claim credit line removed (see owner decision) |
| P1-10 | Duplicate YES told the winner "no longer available" | Same-buyer 'not-offered' now acks "you already have this lead" |
| P1-11 | Redaction prompt said "sell the situation" with no anti-invention rule | One-sentence never-invent-facts clause appended |
| P1-12 | Enquirer reply after a sale: owner email gave no hint the lead was sold | One "released to a buyer on date" line added to that email |
| P2 | Buyer-reply excerpts shipped to Telegram unchecked (buyer could quote lead PII); per-buyer offer-email failure silently left an offer claimable; four different send-blocks shared one toast (consent-copy drift would silently stop a site's sales); `LEAD_RELEASE_AUTO=true` ignored (only "1" worked); release alert silent on DB-read failure; `--credit` accepted any status; exceptions block included test buyers; open-offers reply query capped at 5 | All fixed small: verify-gated excerpts, operator fallback email, distinct block reasons in toasts, both env spellings, alert on read-failure, claimed-only guard, is_test-filtered exceptions, cap 25 |

## Deliberately NOT fixed

| Item | Why |
|---|---|
| Tier change / re-offer price parity (two firms can share one lead at different prices if the tier changes between sends) | Needs a pricing policy call, not a code call. Trigger requires an owner re-tier plus a later re-send; owner-attended both times |
| Claimed-never-released escalation beyond the 1h nudge | New alert surface = owner sign-off first. Invoice EXCEPTIONS is the backstop |
| Heartbeat semantics (green means "route ran", not "work landed") | Changing it changes when the dead-man fires = alert-behaviour change, owner call |
| Raw prompt at 08:00 UTC (09:00 UK summer) | Owner reviewed, left as built |
| Re-offer does not reach buyers who signed after the original send | Feature, not defect; revisit at buyer #3 |
| Telegram allowlist is chat-scoped, not user-scoped | Fine while `TELEGRAM_CHAT_ID` is the owner's DM. Never point it at a group without adding a from-id check |
| Shadow-offer trick for pre-pool leads (hand-run SQL; the row also excludes the lead from the raw lane) | Documented here instead of codified; one-off era ends as pre-pool leads age out |
| Sid hand-off legal categorisation; DSA "own words" Alert definition | Owner: leave / later |
| `lead_buyers.email` non-unique; sendTelegram 4096 mid-tag slice; leadLabel HTML edge; preview/send teaser rebuild divergence (~4-8 Opus calls per sold lead); stale-callback spinner | Cosmetic or speculative at current volume. Fixing = fixing for its own sake |
| Published docs still selling cascade/adjacent lane (BUYER_ONBOARDING) and single-firm/own-words lines (LEAD_PRICING, PRICE_SHEET) | Published buyer terms; regeneration is owner-gated |

## Standing traps (unchanged, re-confirmed)

- `claim_lead_offer()` joins the prod-drift watch list: diff `pg_get_functiondef`
  before any future CREATE OR REPLACE (see `20260820000002` header).
- The twin claim sims in `lead-offers.test.ts` + `telegram-webhook.test.ts` must
  track the SQL by hand; they cannot exercise the row lock.
- 'claimed' in `lead_offers` is only a sale if the buyer is not `is_test`.
- Consent-anchor drift on any site is caught by CI only; runtime signal is now the
  "consent wording not recognised" toast.
- Retention purge arming (`LEAD_RETENTION_PURGE_ENABLED`) unverifiable from the
  repo; check `vercel env ls` at next deploy. Property's published promise is 24
  months since 08-17, so no breach today.

## Arming note

The runbook's arming step must apply `20260820000001` (chart restore) AND
`20260820000002` (this pass) after `20260819*`, or a fresh arming re-flattens the
dashboards and re-introduces the test-exclusive lock bug.
