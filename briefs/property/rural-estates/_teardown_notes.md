# §9.10 competitor domain teardown — saffery.com + oldmillgroup.co.uk (Old Mill / om.uk)

Run 2026-08-21. Crawl delay 0.65s/request, normal browser UA. Full per-page records in
`_teardown_saffery.json` and `_teardown_oldmill.json`.

## Hubs found

- **Saffery**: `https://www.saffery.com/our-sectors/landed-estates-and-rural-businesses/` — 11 sub-pages
  (agribusiness, agriculture, charities, diversified-enterprises, heritage,
  land-and-rural-property-transactions, natural-capital-accounting, offshore-owners, renewables,
  sporting-estates-and-businesses, trusts), matching the brief's "~11 sub-pages" note exactly.
- **Old Mill**: `oldmillgroup.co.uk` redirects (via `www.oldmillgroup.co.uk` — the bare apex domain fails
  TLS handshake, `TLSV1_ALERT_INTERNAL_ERROR`) to **`om.uk`**. Its sitemap is at
  `https://om.uk/sitemap_index.xml`. Current hub: `https://om.uk/sectors/farming/` ("farming and rural"
  hub). A second, legacy hub survives from the Covid era: `https://om.uk/covid-19-knowledge-hub/rural/`.
  Old Mill also runs a dedicated evergreen page outside the normal `/services/` tree:
  `https://om.uk/business-property-relief-bpr/`.

## Crawl bounds and limitations (stated, not guessed)

Both domains publish full XML sitemaps (Saffery: 722 URLs across page/sector/service/post/category
sitemaps; om.uk: 533 URLs). Neither domain blocked crawling. Exhaustive crawl of either firm's full site
was out of scope by design. The crawl was seeded from sitemap URLs matching a broad keyword filter
(farm, agri, land, estate, herd, wood, inheritance, iht, apr, bpr, relief, succession, tenanc, diversif,
sporting), manually curated down to genuinely rural/agricultural/landed-estate/IHT-relevant pages, plus
the known ranking URL for Saffery, plus the two hub pages. **One further hop** was taken from every seed
page's body links, but only followed when the discovered same-domain URL itself carried a family
keyword — this is what caught pages the sitemap-keyword scan missed (see below). No second hop was
taken from hop-1 pages. Excluded from both domains: people/office/careers pages, generic tax-relief
content with no rural or IHT nexus (BADR, R&D relief, EIS/SEIS, multiple dwellings relief, generic SDLT,
generic pensions), and Saffery's separate "real estate" sector (commercial property, not rural/landed
estates). All 23 surviving 2020 "covid-19 practical guidance for our rural and farming clients" weekly
bulletins on om.uk were crawled and counted — they are genuinely filed under the rural/farming label,
even though thin and largely duplicate of each other, and dropping them without a stated reason would
have been guessing rather than bounding.

Two pages were confirmed **sitemap-under-declared** and only found via the one-hop BFS step, matching
the exact failure mode the method calls out: Saffery's `/insights/articles/business-property-relief/`
and `/insights/news/changes-to-iht-rules-will-impact-apr-and-woodland-relief/` are both live, on-topic,
family-keyword pages absent from `post-sitemap.xml`.

No page on either domain returned a non-200 status or an empty body. **Fetch failures: 0 of 162 pages
crawled** (63 Saffery, 99 Old Mill). Nothing was dropped silently.

## Domain stats

| Metric | saffery.com | om.uk (Old Mill) |
|---|---:|---:|
| Pages crawled | 63 | 99 |
| Fetched OK (200) | 63 | 99 |
| Fetch failures | 0 | 0 |
| Pages mentioning the family | 58 | 94 |
| Pages with 5+ mentions | 40 | 74 |
| Owner pages (≥15 mentions + family keyword in URL) | 12 | 23 |
| Non-owner-heavy pages (5+ mentions, not an owner) | 28 | 51 |
| Non-owner-heavy pages linking (body links) to an owner page | 23 | 11 |
| **Share of non-owner-heavy pages linking to an owner** | **82.1%** | **21.6%** |

Owner-page threshold is a judgment call by design (the method only says "highest-mention pages that
plausibly own the family topics"). Threshold used here: ≥15 family-term mentions AND a family keyword
in the URL, applied identically to both domains. Saffery's mention distribution has a clear elbow (63,
50, 45, 42, 38, 34, 30, 29, 26, 26, then a drop to 22, 18, 18…) — a small, genuinely concentrated set of
pillar pages. Old Mill's distribution is flat with no elbow (58 down to 5 in a near-even slope) — its
23-page "owner" set is itself a symptom of a decentralised content model with no clear topic hierarchy,
not an artefact of the threshold: a stricter threshold would only shrink the owner set further and push
the linking share down, not up. Either way the direction holds — **Saffery consolidates internal links
onto a small set of pillar pages; Old Mill does not**, consistent with the 98%/100% vs 39% pattern the
method describes for prior teardowns.

## Owner pages

**Saffery** (12, ranked by mentions):
1. 63 — `/insights/articles/agricultural-property-relief/` (the known ranking URL)
2. 50 — `/insights/articles/commercial-woodland-tax-incentives/`
3. 45 — `/insights/articles/business-property-relief/`
4. 42 — `/insights/articles/agricultural-property-relief-and-business-property-relief-reforms-from-6-april-2026/`
5. 38 — `/insights/articles/farm-succession-planning/`
6. 34 — `/insights/news/over-4-8-million-acres-of-uk-farmland-at-risk-from-iht-reforms/`
7. 30 — `/insights/case-studies/inside-lockerley-estates-regenerative-farming-vision/`
8. 29 — `/insights/news/business-property-relief-and-agricultural-property-relief-remain-valuable-despite-future-changes/`
9. 26 — `/insights/articles/does-my-business-qualify-for-business-property-relief/`
10. 26 — `/insights/articles/autumn-budget-2024-for-individuals/` (hop-1 discovery)
11. 22 — `/insights/news/planned-cap-on-apr-and-bpr-inheritance-tax-reliefs-raised-to-2-5m/` (staleness-check page)
12. 18 — `/insights/articles/farm-budgeting-why-its-never-been-more-important/`

**Old Mill** (23, top 10 by mentions):
1. 58 — `/insight/farm-wills-inheritance-disputes/`
2. 34 — `/insight/how-putting-your-successor-in-place-early-helps-to-secure-your-farms-future/`
3. 30 — `/insight/farm-diversification-tax/`
4. 28 — `/insight/five-top-tips-to-help-you-make-the-right-decision-for-your-farming-business/`
5. 27 — `/insight/farm-diversification-guide/`
6. 25 — `/insight/do-you-need-to-re-evaluate-business-property-relief-bpr-in-your-estate-plan/`
7. 24 — `/business-property-relief-bpr/` (the dedicated evergreen BPR page — see staleness below)
8. 22 — `/insight/a-practical-guide-to-farm-success-planning/`
9. 22 — `/insight/family-farm-young-farmers/`
10. 22 — `/insight/how-trusts-can-still-be-used-to-mitigate-inheritance-tax-hikes-for-farming-families/`
… full list of 23 in `_teardown_oldmill.json` → `owner_pages`.

Note the shape difference even among "owners": Saffery's top owner is its single ranking URL running
away with the topic (63 mentions, next is 50). Old Mill's top page (58) is a wills/disputes angle, not
its BPR or hub page — the hub (`/sectors/farming/`, 19 mentions) and dedicated BPR page (24 mentions)
both rank below several individual blog posts, evidence against a deliberate pillar structure.

## April 2026 £2.5m combined BPR/APR allowance — staleness check

**Ground truth** (per `br_apr_1m_cap_2026_ground_truth.md`): the October 2024 Budget originally proposed
a £1 million 100% relief allowance for combined APR+BPR from 6 April 2026. On 23 December 2025 the
government raised this to a **£2.5 million combined allowance** (£5m transferable between spouses), 50%
relief above that. £1 million is the superseded figure.

**Saffery — CURRENT.** Every evergreen/pillar page checked leads with £2.5 million as the live number,
and where £1 million appears it is explicitly framed as the superseded prior figure. Its own
ranking URL:

> "The 100% rate of relief will only apply to the first £2.5 million of combined agricultural and
> business property and any value above this will receive relief at 50%. At the 2025 Autumn Budget the
> government..." — `/insights/articles/agricultural-property-relief/`

And its dedicated news post on the change states the supersession explicitly:

> "When the new rules take effect on 6 April 2026, the maximum value eligible for 100% relief will
> increase from the previously proposed £1 million to £2.5 million." —
> `/insights/news/planned-cap-on-apr-and-bpr-inheritance-tax-reliefs-raised-to-2-5m/`

11 distinct Saffery pages carry a £2.5m reference; no page was found stating £1 million as the current
live cap (the several £1m hits that remain are either about the historical Oct-2024 announcement,
explicitly marked as superseded, or about an unrelated £1m — the BADR lifetime allowance, the combined
nil-rate-band/RNRB, or the AIA — not the APR/BPR figure).

**Old Mill — MIXED, and specifically stale on its highest-authority evergreen page.** Old Mill *did*
update two of its news-style posts to the correct £2.5m figure:

> "the government increased the cap from £1 million to £2.5 million on 23 December 2025." —
> `/insight/how-trusts-can-still-be-used-to-mitigate-inheritance-tax-hikes-for-farming-families/`

> "the government announced that the Agricultural and Business Property Reliefs threshold will rise
> from £1m to £2.5m when introduced in April 2026." —
> `/insight/inheritance-tax-reliefs-threshold-to-rise-to-2-5m-for-farmers-and-businesses/`

But its **dedicated evergreen BPR page** — the page with a clean, service-page-style URL
(`/business-property-relief-bpr/`) rather than a dated blog slug, and Old Mill's 7th-highest owner page
by mentions — was not updated and still leads with the superseded figure as if current:

> "Introduction of a £1 Million allowance. Effective from 6 April 2026, the 100% BPR rate will be capped
> at £1 million per individual." — `/business-property-relief-bpr/`

The same stale £1 million framing, word-for-word in places, also survives on three more on-topic pages
that plausibly get organic traffic: `/insight/how-the-recent-changes-to-business-property-relief-bpr-
may-impact-you/`, `/insight/what-the-new-draft-legislation-on-apr-and-bpr-could-mean-for-you/`, and
`/insight/a-practical-guide-to-farm-success-planning/`. Old Mill's farming hub itself
(`/sectors/farming/`, 19 mentions) contains no £1m/£2.5m reference either way. **Verdict: Old Mill
updated its news feed but not its pillar/service content — exactly the gap a competitor teardown is
meant to surface.**

## Other observations

- Table usage is rare on both domains (1 Saffery page, 2 Old Mill pages, out of 162 crawled).
- Neither domain uses a calculator/interactive tool or an FAQ block on any crawled rural/IHT page —
  this cluster's competitor set is text-and-narrative content, not tool-shaped, on both sides.
- Old Mill bylines several posts with named advisers and dates (e.g. "23rd December 2025 Willem Puddy"),
  which is how the two current £2.5m posts were identifiable as later/updated relative to the stale
  evergreen page — a possible editorial-process signal (news desk updates fast, service pages don't) worth
  carrying into the dossier's page-shape guidance.

## Files

- `_teardown_saffery.json` — 63 pages, full per-page records + domain stats + owner pages + crawl bounds
- `_teardown_oldmill.json` — 99 pages, full per-page records + domain stats + owner pages + crawl bounds
- `_teardown_notes.md` — this file
