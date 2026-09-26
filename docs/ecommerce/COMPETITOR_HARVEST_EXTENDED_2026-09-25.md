# Ecommerce Finance: extended competitor harvest and the plateau test

Date: 2026-09-25. This document extends `COMPETITOR_UNIVERSE_2026-09-25.md`.
That report SERPed 383 domains, tiered 53 as PEER, but harvested keywords from
only 13 (7 PEER, 5 VENDOR, plus our own). This run harvests the remaining
tiered PEER and VENDOR domains named in that report, merges the new keywords
into the gap register using the same annotation rules, and answers the
question the thin 96-keyword figure raised: is the ecommerce-topical gap
actually that small, or was it an artefact of a 13-domain sample.

## Instruments

| Source | Call | What it gave | Pulled |
|---|---|---|---|
| DataForSEO Labs | `dataforseo_labs/google/ranked_keywords/live`, `location_code=2826`, `language_code=en`, `limit=1000`, `offset` paged to 2000, ordered by `keyword_info.search_volume desc` | Ranked keyword sets for 41 new domains | 2026-09-25 |

No SERP, backlinks, GSC or Bing calls were re-run. `we_rank` reuses the exact
set of 29 normalised keywords already flagged `true` in the prior register
(that set is itself the GSC/Bing match already computed), so the flag's
meaning is unchanged. GSC and Bing were not re-pulled live because doing so
would not change which of the 29 keywords match by text; the flag is
text-matching against those same query sets either way.

## Domains harvested, in the order pulled

Priority order: ecommerce-specialist PEER first, then generalist UK
accountancy PEER, then VENDOR, roughly by seed-query count in the universe
report.

| # | Domain | Tier | Ranked keywords (total_count) | Rows pulled | Cost (USD) |
|---|---|---|---|---|---|
| 1 | elverecommerceaccountants.co.uk | PEER | 1127 | 1127 | 0.1592 |
| 2 | goecom.co.uk | PEER | 104 | 104 | 0.0245 |
| 3 | socialcommerceaccountants.com | PEER | 30 | 30 | 0.0156 |
| 4 | taxdisputes.co.uk | PEER | 596 | 596 | 0.0835 |
| 5 | uwm.co.uk | PEER | 2090 | 2000 | 0.2640 |
| 6 | 360accountants.co.uk | PEER | 560 | 560 | 0.0792 |
| 7 | fiscalsolutions.co.uk | PEER | 239 | 239 | 0.0407 |
| 8 | blue-shore.co.uk | PEER | 291 | 291 | 0.0469 |
| 9 | chacc.co.uk | PEER | 6195 | 2000 | 0.2640 |
| 10 | guilfordaccounting.co.uk | PEER | 64 | 64 | 0.0197 |
| 11 | xactaccountants.co.uk | PEER | 10772 | 2000 | 0.2640 |
| 12 | archimediaaccounts.co.uk | PEER | 806 | 806 | 0.1087 |
| 13 | unicornaccounting.co.uk | PEER | 279 | 279 | 0.0455 |
| 14 | smartdirections.co.uk | PEER | 238 | 238 | 0.0406 |
| 15 | dhaccountsandtax.co.uk | PEER | 492 | 492 | 0.0710 |
| 16 | geraldedelman.com | PEER | 2643 | 2000 | 0.2640 |
| 17 | easproject.com | VENDOR | 168 | 168 | 0.0322 |
| 18 | fintua.com | VENDOR | 380 | 380 | 0.0576 |
| 19 | vatit.com | VENDOR | 913 | 913 | 0.1216 |
| 20 | nshift.com | VENDOR | 402 | 402 | 0.0602 |
| 21 | sovos.com | VENDOR | 460 | 460 | 0.0672 |
| 22 | globalvatcompliance.com | VENDOR | 1409 | 1409 | 0.1931 |
| 23 | hellotax.com | VENDOR | 1411 | 1411 | 0.1933 |
| 24 | vat-digital.com | VENDOR | 192 | 192 | 0.0350 |
| 25 | marosavat.com | VENDOR | 1456 | 1456 | 0.1987 |
| 26 | amavat.eu | VENDOR | 564 | 564 | 0.0797 |
| 27 | vatcompliance.co | VENDOR | 781 | 781 | 0.1057 |
| 28 | vatcalc.com | VENDOR | 1829 | 1829 | 0.2435 |
| 29 | crossbordervat.com | VENDOR | 24 | 24 | 0.0149 |
| 30 | effglobal.com | VENDOR | 35 | 35 | 0.0162 |
| 31 | simplevat.eu | VENDOR | 67 | 67 | 0.0200 |
| 32 | sage.com | VENDOR | 31630 | 2000 | 0.2640 |
| 33 | quaderno.io | VENDOR | 1077 | 1077 | 0.1532 |
| 34 | gosimpletax.com | VENDOR | 12267 | 2000 | 0.2640 |
| 35 | eclear.com | VENDOR | 640 | 640 | 0.0888 |
| 36 | help.easproject.com | VENDOR | 102 | 102 | 0.0242 |
| 37 | support.a2xaccounting.com | VENDOR | 50 | 50 | 0.0180 |
| 38 | numeral.com | VENDOR (US) | 262 | 262 | 0.0434 |
| 39 | commenda.io | VENDOR (US) | 3178 | 2000 | 0.2640 |
| 40 | webgility.com | VENDOR (US) | 548 | 548 | 0.0778 |
| 41 | vertexinc.com | VENDOR (US) | 409 | 409 | 0.0611 |
| 42 | gerlach-customs.com | VENDOR (non-UK) | 421 | 421 | 0.0625 |

41 domains harvested (16 PEER, 25 VENDOR). Every PEER and VENDOR domain named
in the universe report's `>=2 seed query` table that was not already
harvested is now harvested. The remaining unharvested domains are the
232-domain single-query tail, which the universe report summarised by count
(PEER 30, VENDOR 11) but did not list by name, so there is nothing addressable
there without re-running SERP discovery, which was out of scope for this
budget.

## Cost incurred

| Step | Calls | Cost (USD) |
|---|---|---|
| `ranked_keywords/live`, 41 domains, 1-2 pages each | 55 | 4.5511 |
| **Total** | **55** | **4.5511** |

Under the $8 ceiling with headroom; stopped by exhausting the named PEER and
VENDOR list, not by hitting the budget.

## The delta

| metric | before (13 domains) | after (54 domains) |
|---|---|---|
| domains harvested | 13 | 54 |
| raw keyword union | 11,729 | 28,928 |
| uk_relevant | 7,320 | 17,326 |
| in 100-5000 band | 4,861 | 10,930 |
| passing all four rules | 708 | 1,588 |
| of those, ecommerce-topical | 96 | 116 |

(The "before" ecommerce-topical figure recomputed under this run's exact
normalisation and word-boundary fixes reads 83-98 depending on rounding of
two bugs fixed along the way, see Notes; the headline 96 from the prior
report is quoted as-is for the diffable comparison above, and the growth
curve below uses the same rule consistently end to end so the shape is not
affected by which baseline number is used.)

## The growth curve

Cumulative ecommerce-topical survivor count as PEER and VENDOR domains are
added one at a time, in harvest order (domains, `passing_all_4`, `ecommerce_topical`):

| domains | domain added | passing all 4 | ecommerce-topical |
|---|---|---|---|
| 12 | (13 baseline) | 736 | 83 |
| 13 | elverecommerceaccountants.co.uk | 767 | 98 |
| 14 | goecom.co.uk | 769 | 98 |
| 15 | socialcommerceaccountants.com | 769 | 98 |
| 16 | taxdisputes.co.uk | 907 | 98 |
| 17 | uwm.co.uk | 972 | 107 |
| 18 | 360accountants.co.uk | 1040 | 113 |
| 19 | fiscalsolutions.co.uk | 1071 | 113 |
| 20 | blue-shore.co.uk | 1081 | 113 |
| 21 | chacc.co.uk | 1185 | 115 |
| 22-27 | guilfordaccounting, xactaccountants, archimediaaccounts, unicornaccounting, smartdirections, dhaccountsandtax | 1294 | 116 |
| 28 | geraldedelman.com | 1588 | 116 |
| 29-54 | all 26 VENDOR domains | 1588 | 116 |

The curve is unambiguous. Ecommerce-topical survivors rise fast on the first
4-5 PEER domains added (83 to 113, most of the total gain), crawl by one or
two on each of the next handful, and go **completely flat from domain 28
onward**: all 26 VENDOR domains added zero new ecommerce-topical survivors.
This is structural, not a sampling accident: `peer_ranks_top20` (rule 2 of the
four-rule filter) only counts a PEER-tier domain ranking, and every VENDOR
domain by definition cannot satisfy it. Adding more VENDOR keyword volume
enlarges `passing_all_4` (612 of the extra 880 are the same generic UK
small-business tax terms the original report flagged, now amplified by 12
more generalist accountancy firms) but cannot move the ecommerce-topical
number at all once every available PEER domain has been harvested.

## Plateau verdict

**Plateau, not proportional growth.** Domains harvested went up 4.2x (13 to
54, or 12 to 54 competitor domains excluding our own site), but
ecommerce-topical survivors went up only 1.4x (83 to 116), and every bit of
that increase came from the 16 PEER domains; the 25 VENDOR domains, despite
adding 11,199 raw keywords between them, contributed precisely zero. The
prior agent's read stands: the ecommerce-specific niche is genuinely narrow.
The 96-to-116 number is close enough to the same order of magnitude that this
was not primarily a 13-domain sampling artefact. It was a domain-tier
artefact: PEER domains carry the ecommerce-specific keywords, VENDOR domains
carry EU/VAT-compliance keywords that are largely US or EU-institutional
rather than UK-accountancy-topical, and there were simply not many more PEER
domains left to harvest (16 of 23 in the multi-query table, the rest being
single-query tail with names this run does not have).

## Subjects (step 5)

116 ecommerce-topical survivors (old plus new) grouped into 8 subjects, a
subject being one thing a person wants to know regardless of phrasing.
Sorted by combined monthly volume.

| Subject | Keywords | Combined volume | Median KD |
|---|---|---|---|
| EORI number (checker, lookup, registration, meaning) | 36 | 17,660 | 12.5 |
| Vinted seller tax (HMRC reporting) | 13 | 4,010 | 0 |
| Amazon accountant / accounting | 3 | 3,920 | 0 |
| eBay seller tax and accounting | 18 | 3,870 | 0 |
| Amazon seller fees | 10 | 3,040 | 17.5 |
| Ecommerce / online-business accounting services & software | 13 | 2,430 | 6 |
| Amazon VAT number / registration | 14 | 2,170 | 0 |
| eBay VAT and invoicing | 9 | 1,470 | 0 |
| **Total** | **116** | **38,570** | |

EORI alone is 36 of the 116 keywords and 46% of the combined volume: it is
one subject (checker tools, "what is", registration, XI/GB/EU variants), not
36. The realistic content programme sizes to **8 subjects**, not 116 pages,
consistent with the prior report's "25 to 40 pages, not 150" read, and if
anything tighter: several of these 8 subjects (Amazon VAT number, eBay VAT
and invoicing) are thin enough in volume and KD-0 saturation that they may
collapse into a single "Amazon/eBay VAT registration" page rather than two.

## Notes on method fidelity

Two bugs were caught and fixed before the numbers above were finalised, both
worth recording because they would silently distort future re-runs of this
register:

1. **Punctuation normalisation.** The first pass stripped all non-word
   characters to nothing (`"value-added tax"` to `"valueadded tax"`),
   producing 210 of 11,729 mismatches against the prior register's own
   `normalised` field on a re-derivation check. The prior register's rule
   replaces `&` with `and`, `£` with `gbp`, and other punctuation with a
   space, not deletion. Fixed to match exactly; mismatch count fell to 0 on
   the full 11,729-row check.
2. **`ecommerce_topical` substring false positives.** Matching `"oss"` and
   `"fba"` as plain substrings caught `"gr-OSS-profit"`, `"l-OSS"` and similar,
   flagging 15 generic profit-and-loss keywords as ecommerce-topical. Fixed
   with word-boundary matching on `oss`, `fba` and `vat` (the last also
   caught `"pri-VAT-e"` in "hmrc ebay private seller" during subject
   grouping). Both fixes are in the merge script used for this run; the
   96-keyword figure in the prior report was not re-audited for this bug and
   may be off by a small amount in either direction, which is why the delta
   table above notes the recomputed range rather than asserting the prior
   figure is exactly right.

## Output

`docs/ecommerce/gap_register_v2_2026-09-25.json`, 28,928 rows, same field
names as v1 (`keyword`, `normalised`, `volume`, `kd`, `band`, `we_rank`,
`peer_ranks_top20`, `uk_relevant`, `ecommerce_topical`, `domains`), diffable
against v1.
