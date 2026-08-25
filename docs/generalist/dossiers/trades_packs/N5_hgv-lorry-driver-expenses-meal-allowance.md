# PACK N5: net-new — HGV and lorry driver expenses (meal allowance, sleeper cab, subsistence)

Derived 2026-08-25 from FROZEN dossier `../trades_transport_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **reference table-led**: employed vs owner-driver rates
table first, prose explains the rows).

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug: `hgv-lorry-driver-expenses-uk`
  (writer may refine; resolver conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- Shape: consumer expenses explainer split hard on employment status, because the rates differ
  by status and the ranking incumbent blurs it.

## 2. Equity register

None (net-new).

## 3. Market keyword slice (ledger, T-HGV, 100/mo, peer-winnable 0)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| lorry driver meal allowance | 50 | gondal p15 |
| meal allowance for hgv drivers | 50 | gondal p17 |

## 4. Competitor teardown (fetch anomaly, recorded per §9.7)

The harvested ranking URL `gondalaccountancy.co.uk/accountants-hgv-lorry-drivers` (p15/p17 on
both head terms) **redirected to gondal's courier/delivery page at fetch (2026-08-25); two URL
guesses 404'd**. Recorded as fetch-redirected; the keyword evidence stands. What the served
sibling page shows about gondal's model: current figures, big FAQ, **no overnight subsistence,
meal allowance or sleeper-cab figures anywhere** on the drivers or courier pages fetched. The
head terms are held at p15/p17 by a page that apparently no longer resolves cleanly: the field
is effectively open.

## 5. Whitespace (§18.5 — the exact-rate answer nobody publishes)

- **The employed-driver flat rates, exactly:** £34.90 per night (EIM66110, from 1 Jan 2013),
  reduced to 75% (about £26.20) with a sleeper cab (EIM66130), tax/NIC-free only where the
  EIM66105 conditions hold (genuine overnight absence, checking regime/approval). No fetched
  page in the cluster quotes any of these figures.
- **The owner-driver split done honestly:** sole traders deduct ACTUAL reasonable accommodation
  and subsistence of an itinerant trade, not the employed flat rate. This is the answer that
  separates us from every "lorry driver allowance" listicle.
- Meal-allowance framing via the employed benchmark rates vs the owner-driver actual-cost rule,
  plus vehicle costs (a lorry is plant: AIA/FYA per §8) and the §18.6 method-choice rule for
  van-scale owner-drivers.

## 6. Fences (binding)

- **No rebate-agent framing, hard rule:** this page describes what is claimable and how to claim
  it yourself (Self Assessment or PAYE claim); the estate never processes claims, never links
  rebate firms, never uses "claim your refund now" framing. The excluded uniform-rebate keyword
  set (EX-OFFNICHE, 910/mo) stays excluded: do not chase it with employee-rebate content.
- §18.5 verbatim in substance: £34.90 / 75% are EMPLOYED rates with conditions stated every
  time; owner-drivers get actual costs. Never present the flat rate as available to sole traders.
- §18.5 open question 2: the current EIM66105 approval mechanics (bespoke agreement post-2017
  practice) must be verified at write before describing HOW an employer gets approval; until
  then state the conditions, not the application process.
- O-licence: describe only (C1 row 66 CLEAR). Cite §2, §8, §12, §18 by number. No em-dashes.

## 7. Acceptance criteria (deterministic)

1. Queries answerable: lorry driver meal allowance; meal allowance for HGV drivers; HGV overnight
   allowance / sleeper cab allowance; can self-employed lorry drivers claim the overnight rate
   (answer: no, actual costs).
2. Figures, recomputable: £34.90; 75% / about £26.20; date-tags (1 Jan 2013, EIM references in
   the source note not the copy); AIA/40% FYA/WDA 14% per §8 for owner-driver vehicles; one
   worked example (an employed driver's week of nights vs an owner-driver's actual-cost claim,
   re-derivable).
3. Rates table renders the employed vs owner-driver split as the first content block
   (lead structure).
4. Links: N4 (haulage companies), E1; resolver-clean; all §4 floors + coverage pass.

## 8. Expectation

100/mo, incumbent at p15/17 on a redirecting URL with no rates on the destination page.
Realistic: Google top-10 on both head terms within a quarter of indexing (exact-figure page
against a field that quotes nothing); Bing earlier. Maturity caveat: net-new, judge at 28d
Bing / 90d Google. Failure trigger: zero impressions on both head terms at 90d post-index.
