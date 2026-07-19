# Implementation brief — dentists homepage corepage rewrite (B2)

Author: Opus 4.8 (architect). Date: 2026-07-19. Engine run: 75 head queries / 5,145 impr, core owns 65, 12 competitors extracted.

## Diagnosis (not a restatement)

The homepage already IS the catcher for 65 of 75 head queries and holds ~4,676 of the head impressions. This is not a cannibalisation problem for the national terms; it is a **relevance/authority ranking problem on a page that is invisible to the crawler as a "dental accountants" page**. The single mechanical cause is in the pack: the title contains no head token in a matchable position and the H1 is a keywordless slogan ("Specialist dental accountants for UK practices."). Google is asked to rank a page for "dental accountants" / "accountants for dentists" whose most-weighted on-page signals (title lead, H1) do not carry those exact tokens, and whose schema is only Organization+WebSite while every page-1 competitor carries AccountingService/Service/BreadcrumbList and most carry FAQPage. Position 41-76 on a term the page half-owns is consistent with "recognised as relevant, not trusted as the answer".

So B2 is a signal-strengthening pass, NOT a redesign and NOT new pages:
1. Put the exact head tokens in the title lead and the H1 (highest leverage, per pack FLAG).
2. Close the schema gap with the existing builders (AccountingService national areaServed GB, Service, BreadcrumbList, FAQPage) on one #organization graph so the page reads as a regulated national accounting service.
3. Grow the FAQ from 3 to 8 targeting the zero-click head queries verbatim ("do I need a specialist dental accountant", "how much", London, near-me, groups) so the page owns the question phrasings too.
4. Two real cannibalisation edges, handled by catcher edits, NOT by homepage content:
   - **London chooser post** (`dental-accountant-london-how-to-choose-specialist`) ranks 11.9 for "specialist dental accountants london" while the homepage sits 51.3. Per ledger + plan: soften its title toward the genuine long-tail chooser intent and add an exact-anchor link UP to the homepage. Do NOT expand it into a London service page in this pass (supporting-page decision deferred +6 weeks).
   - **/blog index** leaks head service terms ("dental accounting", "dental practice tax") at pos 17-67. Per ledger Disagreement 2 + plan: fix by homepage strength + one exact-anchor link from the blog index up to the homepage. Do NOT expand the blog index as a traffic play.

Software-integration catcher (accounting-software queries, pos 9-10) is a distinct long-tail intent the homepage should NOT chase; leave it (it is a separate ledger `refresh` item, and is a batch-2-adjacent flat-URL question out of scope here). Location pages already rank locally (Manchester 25.8, Nottingham 28.6): do NOT de-optimise them; geo intent funnels DOWN to /locations via the new "Areas we serve" link.

## Title / meta formula

- **metaTitle** (<=60): `Dental Accountants | Accountants for Dentists UK` — leads with the two highest-volume head tokens (1,168 + 1,157 impr), drops "Specialist" from the lead (kept in body/H1). 47 chars.
- **metaDescription**: keep specialist framing + national + the service spine (NHS contracts, associate tax, VAT, acquisitions), keyword-bearing, no em-dash.

## H1 (recommended + options)

Chosen: **"Dental accountants for UK practices, associates and groups"** — carries "dental accountants" head token + segments, keeps national scope. Demote the current slogan to the sub-headline `<p>` already present.
- Alt A: "Specialist accountants for dentists across the UK"
- Alt B: "Dental accountants and tax advisers for UK dental practices"

## On-page (conservative, no redesign)

- H1 swap + keep slogan line as sub-head.
- Add ONE keyword-bearing intro sentence to the existing hero sub-paragraph carrying "accountants for dentists" naturally (it already says "accountants for dentists" — tighten so the exact head phrase and "dental accountants" both appear once in the first 2 sentences).
- Add a compact **"Areas we serve"** block near the existing free-resources/FAQ area: national statement + exact link to `/locations` (funnels geo down, gives the crawler a national areaServed cue in copy to match the schema). No city grid.
- Grow FAQ from 1 rendered `<details>` (array of 3 in metadata note; only 1 in JSX) to **8** `<details>`, each also fed into FAQPage schema.

## Schema additions (existing builders only, one #organization graph)

Emit via `<JsonLd data={[...]} />` (existing component) or inline `<script>` (matching the locations page pattern), using:
- `buildAccountingService(input, opts)` from `@accounting-network/web-shared/schema` — national instance: `city: "United Kingdom"`, `areaServed: ["United Kingdom"]`, no fake street/postcode (address = country GB only), no phone (contact via form, matching locations page). This yields the AccountingService/LocalBusiness node competitors have.
- `buildService(...)` — one Service ("Dental accountancy and tax") with `provider` pointing at the org, `areaServed` GB.
- `buildBreadcrumbList` via `buildBreadcrumbJsonLd([{label:"Home"}])` (single-item Home crumb; the builder handles it) — gives the BreadcrumbList competitors carry.
- `buildFaqPage(faqs)` from the grown FAQ array — FAQPage node.
- Keep existing Organization + WebSite (shipped from root layout). Do NOT duplicate Organization on the page; reference `#organization` as provider @id where the builder supports it.
- **No AggregateRating/Review** (no genuine review corpus; never fabricate).

## Cannibalisation / internal-linking actions (exact)

1. `Dentists/web/content/blog/dental-accountant-london-how-to-choose-specialist.md`: metaTitle soften from "Dental Accountant London: How to Choose a Specialist" toward the long-tail chooser ("How to Choose a Dental Accountant in London (2026 Guide)") so it stops competing for the bare head term; add one in-body link up: anchor text "specialist dental accountants" → `/`. Leave content, schema graph, and the reviewer credential untouched (credential question is a separate flagged workstream).
2. Blog index (`Dentists/web/src/app/blog/page.tsx` or equivalent): add one exact-anchor link "specialist dental accountants" → `/` in the hub intro copy. Conservative, reversible.

## Trust additions

Reuse existing honest signals only: "100% dental-only", "50+ dental professionals", "fixed fees" already on page. Do NOT invent stats. No pricing block (competitors have one but we route to /calculators for numbers; owner copy needed before any tier/price claim — out of scope).

## Geo angle

National page owns the national family; "Areas we serve" + the AccountingService areaServed GB is the only geo cue. London/Manchester/Wales stay with /locations and the (softened) London post. No `term + city` duplication on the homepage.

## Fact-check anchors (all date-tagged if used)

Dividend 2026/27 10.75/35.75/39.35 (HP §222); employer NIC 15%/£5,000 from 6 Apr 2025 (HP §228); CT 19%/25% marginal; AMAP 55p first 10k from 6 Apr 2026; BADR 18% from 6 Apr 2026. Homepage FAQ deliberately avoids hard rate claims (landing page; pillars carry rates); any figure cited is date-tagged.

## Risks

- Title/H1 token swap is the intended single variable this window. Confound policy: homepage is disjoint from all batch-2 held URLs (holds are 3 blog posts, none touched here). London-post title soften is a catcher edit the plan explicitly scopes to this run, not an independent meta experiment.
- Schema over-claim: mitigated by no fabricated ratings, honest areaServed, form-only contact (no fake phone).
- Measurement: head cluster ("dental accountants" / "accountants for dentists" / "specialist dental accountants") from pos 41-76 → target pos <20 and first meaningful clicks in 6 weeks; re-pull GSC page×query on the family at +2/+6 wks (~08-02 / ~08-30) via `_fresh_gsc_bing_pull.py`; ledger re-run ~08-05.
