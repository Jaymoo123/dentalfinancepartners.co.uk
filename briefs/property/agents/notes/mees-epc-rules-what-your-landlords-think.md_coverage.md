# Coverage note: `mees-epc-rules-what-your-landlords-think` (agents1 page 2)

Written 2026-08-21 with the page. Required by `PACK_mees-epc-rules-what-your-landlords-think.md`
§7 criterion 13 and DOSSIER.md §9. **This page is assigned no measured keywords.** That is the
design, not an oversight, so this note is the deliverable that proves each decline was deliberate.

Figures and buckets below are read from `briefs/property/agents/ledger.csv` (Google Ads UK
`search_volume` via DataForSEO, pulled 2026-08-21) and match it exactly.

## 1. Measured heads DECLINED, with the page that holds each

Every MEES and EPC head in the cluster ledger is bucketed `already-covered` to a page this batch
does not touch. DOSSIER.md §3 puts a blanket no-edit rule on all of them; they are linked from the
new page and were not modified.

| Declined keyword | Vol/mo | Holding page | Freeze status |
|---|---|---|---|
| `mees regulations` | 720 | `mees-regulations-landlords` | Wave 11 net-new, registered 2026-08-21, **armed to 2026-11-19**, HARD FROZEN |
| `epc requirements for landlords` | 720 | `mees-regulations-landlords` **and** `energy-performance-certificates-epc` | MEES page armed to 2026-11-19; EPC page frozen (no-edit rule) |
| `minimum energy efficiency standard` | 30 | `mees-regulations-landlords` | armed to 2026-11-19, HARD FROZEN |
| `epc rules rental property` | 0 | `mees-regulations-landlords` | armed to 2026-11-19, HARD FROZEN |

**Why declined rather than chased.** `mees-regulations-landlords` is a hard-frozen asset inside its
measured window and owns `mees regulations` at 720/mo. Writing this page to take any of the four
heads would put two of our own pages into the same SERP slot and risk the frozen page's Bing rows
for no incremental measured demand. The pack states it directly: "Writing it to rank would break the
frozen sibling without gaining anything." The pack's own failure trigger is built on this, and it is
the primary one for the page: if `mees-regulations-landlords` loses Bing rows or GSC impressions
over the 90-day window, this page cannibalised a hard-frozen asset and is a failure regardless of
its own numbers.

**How the decline was executed on the page.** The enacted figures appear once, in a glance list, and
then link out. The page does not re-run the cap arithmetic, the exemption classes and durations, the
PRS Exemptions Register mechanics, the penalty ladder, the grants detail or the portfolio worked
example. All six are the frozen siblings' owned H2 subject matter per the pack §5.1
belongs-to-sibling inventory, and all six were checked against `mees-regulations-landlords` read end
to end before ship (pack §7 criterion 17).

## 2. Zero-volume terms CARRIED, and the sharing position

Three terms are carried by the myth table. All three are zero-volume and none is taken from another
page.

| Carried keyword | Vol/mo | Ledger bucket | Position |
|---|---|---|---|
| `epc c 2030 landlords` | 0 | assigned, page 2 | **Shared with** `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`, which is linked and not edited |
| `landlord epc exemptions` | 0 | assigned, page 2 | Shared, same sibling; exemption depth stays with the siblings, this page states the route exists and links |
| `mees cost cap` | 0 | assigned, page 2 | Shared, same sibling; the £3,500 figure is stated, the arithmetic is not |

Shared, not taken. The `epc-c-2030-...` sibling keeps its enacted-state, exemption-framework,
planning and worked-example ground. This page occupies what neither sibling has: the myth table, the
21 January 2026 government response quoted with the primary-legislation line, the answer script for
"do I need to spend £10,000", and the agent register.

## 3. Out of scope, declined explicitly

- **Non-domestic and commercial MEES** (the seven-year payback test, the absence of a £3,500 cap on
  the commercial side, rateable-value-linked penalties). Belongs to the commercial pages, outside the
  dossier's frozen scope for agents1, not mentioned on the page.
- **Any MEES penalty figure.** No penalty number is locked in the house_positions sections governing
  this page, and the enforcement ladder is `mees-regulations-landlords` content. W11's £5,000 and
  £30,000 figures were available and were not used.
- **Upgrade-cost estimates.** W11 carries 26 of them; house_positions locks none, so none appear.

## 4. Expected measured return

Approximately zero, by design. Grade C in DOSSIER.md §7 for relationship value. Success at the
90-day read = any impressions at all on the three zero-volume myth-shaped terms **and** no measurable
loss on the frozen siblings. Monitoring is standard `monitored_pages` registration at deploy inside
the existing weekly detector. No new monitor, cron, alert or notification.
