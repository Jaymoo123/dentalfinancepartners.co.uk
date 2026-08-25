# Solicitors conversion diagnosis, 2026-08-03

Task: Solicitors has the estate's second-highest traffic and produces 2 leads a month. Find
out why and fix it.

All figures are a fresh pull taken 2026-08-03 from `web_sessions` / `web_events` (estate
project `dhlxwmvmkrfnmcgjbntk`), 30-day window, **bot rows excluded** (`is_bot = false`), with
Property as the control on the same window.

---

## 1. What the funnel actually looks like

| Step | Property | Solicitors | Solicitors as % of Property rate |
|---|---:|---:|---:|
| Human sessions | 6,135 | 1,755 | — |
| Engaged (>10s) | 3,691 (60.2%) | 985 (56.1%) | 93% |
| Reached 100% scroll | 229 (3.7%) | 126 (7.2%) | **194%** |
| Saw a capture form | 1,717 (28.0%) | 380 (21.6%) | 77% |
| **Started the form** | **362 (21.1% of viewers)** | **26 (6.8% of viewers)** | **32%** |
| Submitted | 63 (17.4% of starts) | 2 (7.7% of starts) | 44% |
| Leads | 63 | 2 | — |

Read the third row twice. **Solicitors readers scroll deeper than Property readers**, by
almost 2x. They are not bouncing, they are not failing to reach the form, and engagement is
within 7% of Property's.

The collapse is at one specific step: **form seen to form started, 6.8% against 21.1%.** Then
a second, smaller loss at start-to-submit. Everything upstream is healthy.

That rules out the obvious suspects. It is not traffic quality in the engagement sense, not
form placement, not scroll depth, and not page speed.

## 2. The cause

`Solicitors/web/src/components/forms/MiniCapture.tsx` hardcoded its own step-1 role list
instead of reading the site's `niche.config.json`, and the two had drifted apart:

| Source | Options offered |
|---|---|
| `niche.config.json` (what `LeadForm` reads) | Sole practitioner · Law firm partner · **Practice manager/COFA** · Multi-partner firm (6+ partners) · Other |
| `MiniCapture.tsx` (what the in-article form actually showed) | LLP partner · Sole practitioner · Partnership · **Barrister** · Other |

The in-article form dropped **Practice manager/COFA** and substituted **Barrister**.

Now look at who the traffic is. The top entry paths by session:

| Entry path | Sessions | Engaged | Leads |
|---|---:|---:|---:|
| /blog/vat-compliance/vat-on-overseas-clients-uk-legal-services | 129 | 83 | 0 |
| /blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour | 84 | 52 | 0 |
| /blog/vat-compliance/disbursements-vs-recharges-conveyancing-vat | 73 | 2 | 0 |
| /blog/sra-compliance-trust-accounting/sra-accounts-rules-compliance-guide | 63 | 42 | 0 |
| /blog/sra-accounts-rules/handling-client-money-interest-sra-rules | 61 | 46 | 0 |
| /blog/sra-accounts-rules/handling-client-disbursements-properly-uk | 57 | 34 | 0 |
| /blog/sra-accounts-rules/office-account-vs-client-account-differences | 48 | 29 | 0 |

This is client-account and disbursement-VAT mechanics. The person reading it is a legal
cashier, a practice manager, or a COFA doing their job. The form asked them to pick between
LLP partner, sole practitioner, partnership and barrister.

A reader who cannot describe themselves at step 1 abandons at step 1. That is exactly the
shape of the 380 → 26 collapse, and the site's own configuration already had the right
option in it.

Barristers, meanwhile, largely do not hold client money the way the SRA Accounts Rules
content describes, so the substituted option was serving nobody on the pages carrying the
traffic.

## 3. The fix (applied)

Deleted the hardcoded list; `MiniCapture` now reads `niche.lead_form.role_options` and
`role_label` from config, which is what Property's adapter does and what this site's own
`LeadForm` already did. One file, net negative lines.

Reading from config rather than editing the hardcoded list is deliberate: it removes the
drift as a class, so the two forms on this site cannot silently ask different questions again.

Verification: `tsc --noEmit` clean, 158/158 tests pass, `npm run build` exit 0. No downstream
code keys off the old role string values (checked across `Solicitors/web/src` and
`packages/web-shared`), so no scoring or routing behaviour changes.

Not deployed. Deploys are being handled separately.

## 4. Honest limits on this fix

**This is one fix, deliberately.** Per the locked isolate-variables rule, nothing else was
changed, so the effect is measurable. Read it at 14 and 28 days on
`form_step_view → form_start` for site_key `solicitors`; that ratio is the metric this
targets, and it should move before leads do.

**It will not close the whole gap on its own.** Even at Property's full 21.1% start rate and
17.4% submit rate, 380 form views a month yields roughly 14 leads. That is a 7x improvement on
2, and worth having, but it depends on the compliance-role reader wanting an accountant at
all, which is unproven. The role option was a hard blocker; removing it does not prove demand
behind it.

**The deeper issue is the traffic mix, and it is not a CRO problem.** The site ranks for
staff-task queries (how do I treat this disbursement) rather than buyer queries (I need an
accountant for my firm). The genuine buyer intent that does exist is thin but visible:

- `/blog/practice-succession-sale/how-to-value-a-uk-law-firm-2026` drew 12 form views from 9
  sessions, and "Free Practice succession and sale tool" is the most-clicked tool on the site
  (10 `see_result` clicks, more than any other).
- In Google Search Console, the buyer-shaped queries are ranked but not landed:
  `accountants for lawyers` 42 impressions at position 18.8, `vat law firm` 41 at 12.4,
  `vat law firm uk` 33 at 14.4. All zero clicks.

Succession, sale and firm-structure content is where this audience has money intent, and it
is where the site has the least traffic. That is a content and ranking workstream, not a form
change, and it should be scoped separately.

## 5. One finding that is not solicitors-specific

`DeepScrollModal` is a net negative on both sites measured:

| Site | Modal dismissed (`deep_scroll_close`) | Modal engaged (`deep_scroll_modal`) | Ratio |
|---|---:|---:|---:|
| Property | 294 | 4 | 74:1 |
| Solicitors | 110 | 2 | 55:1 |

Property carries it and still converts, so it is not the solicitors gap and I did not touch it
here (one variable at a time). But an interstitial that is dismissed 55-74 times for every
engagement is worth a separate estate-wide decision. Flagging, not fixing.

Related, and confirmed **not** a problem: `exit_intent_shown` fires on solicitors in the data,
which looked like the retired ExitIntentModal still being live. It is not. The events stop
dead after the week of 2026-07-13, consistent with the 07-19 deploy that removed it. The
component is now dead code in the tree, referenced by nothing.
