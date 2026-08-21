# P1 build brief: /landed-estates root pillar

Pattern: follow `Property/web/src/app/leasehold/page.tsx` exactly (metadata shape,
Breadcrumb, CTASection, siteContainerLg, buildFaqPageJsonLd, an in-force ledger
table as the maintained differentiator, curated link blocks into the blog family).
Add nav/footer entries to `Property/niche.config.json` for parity with /leasehold
and /landlord-compliance (same conductor step as wave11 §6).

Route: `Property/web/src/app/landed-estates/page.tsx`. Register in
`src/app/sitemap.ts` alongside the other pillars.

Title direction (write against `_language_spec.md`, consumer register on the page
top, adviser precision in the tables): the £2.5m question answered for mixed
estates, farms held by landlords, and families staring at the April 2026 change.

## The maintained differentiator: the cap ledger table

Source of truth `docs/property/house_positions.md` §15.4. Rows (status column is
the point, mirror the leasehold in-force table):
- Combined £2.5m BPR+APR allowance (IHTA 1984 s.124D via FA 2026 Sch 12 para 4):
  IN FORCE from 6 April 2026. 100% relief below, 50% above, effective 20% IHT on
  the excess.
- £5m transferable between spouses/civil partners: state the couples figure
  prominently, nobody else does.
- AIM shares 50% sub-tier: separate, does NOT consume the allowance.
- Anti-forestalling: lifetime transfers since 30 October 2024 count. Gifts made
  before the announcement do not.
- Trust anti-fragmentation: same-settlor multi-trust structures settled on/after
  30 Oct 2024 share ONE allowance.
- The stale-£1m warning row: gov.uk's announcement summary still shows £1m
  (do-not-cite F-102) and at least one incumbent firm's evergreen BPR page still
  teaches £1m as live law (teardown 2026-08-21). Do not name the firm on-page;
  "some guides still show the earlier £1m figure" is the register.

## The Pawson boundary card

house_positions §22.1: pure BTL fails BPR on the investment line. The pillar says
the honest no early: a landlord reader with only a BTL portfolio gets "this
allowance is probably not for your rentals" with the link to E5 for why.

## Link blocks (bind the family)

Core: the 11 family pages from DOSSIER §1 + the three net-new (N1
inheritance-tax-on-farms, N2 farm-tax-uk-guide, N3
how-to-avoid-inheritance-tax-on-a-farm) + T1 calculator when it exists. Blog path
prefix per each page's real category (grep frontmatter, do not guess).

## Conceded-topics signpost (scope honesty, owner-approved boundary)

One short section: herd basis, farmers' averaging, BPS/SFI and tenancy law are
farm-accountancy work, one sentence each pointing at "your farm accountant", no
links out, no coverage. This is deliberate and stays.

## Constraints

No em-dashes. UK English. No pricing. Statute citations belong in the tables, not
the prose (language spec). tsc must pass; prod build must pass. FAQ block with
buildFaqPageJsonLd, 4-6 consumer-phrased questions from the ledger's net-new set.
