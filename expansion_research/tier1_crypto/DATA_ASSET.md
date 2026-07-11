# Flagship data asset — UK Crypto Tax Gap & Compliance Index (R3, 2026-07-11)

Pattern: Property's UK Landlord Tax Index (SHIPPED precedent, /research/landlord-tax-index) —
a citable, annually-refreshed research page built from free official sources, aimed at
data-PR / GEO citations / faceless authority (user-is-not-an-accountant constraint).

## Concept

**"How many UK crypto holders owe tax they haven't reported — and what happens in 2027?"**
A modelled index combining (a) UK crypto ownership levels, (b) disposal/turnover behaviour,
(c) CGT/income rules, (d) the CARF reporting wall (first HMRC data drop mid-2027), into:
per-region / per-age-band estimates of unreported-liability exposure, a "compliance countdown"
to the first CARF exchange, and a yearly refresh hook (FCA runs the consumer survey annually).

Why it fits THIS niche: the story writes itself for journalists ("X million Brits face HMRC
crypto data sweep"), and every citation lands on the exact urgency narrative the site converts
on (house position 24).

## Sources — feasibility checked live 2026-07-11

| Source | What it gives | Verified |
|---|---|---|
| [FCA Cryptoassets consumer research 2024 (Wave 5)](https://www.fca.org.uk/publications/fca-research/research-note-cryptoassets-consumer-research-2024) | 12% of UK adults (~7m) hold crypto (Aug 2024); demographics, holding sizes, behaviour | 200 via search; PDF at fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2024-wave-5.pdf |
| [FCA Cryptoassets consumer research 2025 (Wave 6)](https://www.fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2025-wave-6.pdf) | Annual refresh leg — the index updates each wave | found via search 2026-07-11 |
| [HMRC: Research with Cryptoasset Investors and Industry Participants](https://www.gov.uk/government/publications/research-with-cryptoasset-investors-and-industry-participants) | HMRC's own qualitative base on investor tax awareness (low) | HTTP 200 |
| [gov.uk CARF guidance: collecting cryptoasset user and transaction data](https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data) | The 1 Jan 2026 collection start that anchors the countdown | HTTP 200 (s6, phrase-checked) |
| [gov.uk CARF guidance: reporting cryptoasset user and transaction data](https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data) | The first-report window: "submit your first report between 1 January 2027 and 31 May 2027" | HTTP 200, phrase-checked 2026-07-11 |
| [gov.uk CGT rates](https://www.gov.uk/capital-gains-tax/rates) + [allowances](https://www.gov.uk/capital-gains-tax/allowances) | Modelling parameters (18/24%, £3,000 AEA) | HTTP 200 (s6) |
| HMRC nudge-letter volumes | Via existing press/FOI figures ONLY if a primary source is found at build time; otherwise omit — no unsourced claims | to re-check at build |

All modelling assumptions published on-page (Landlord-Tax-Index house style); the output is an
"estimate with stated method", never presented as HMRC data.

## Build shape

- One research page + methodology section + downloadable table; annual refresh on FCA wave
  publication (self-driving follow-up: calendar the wave-7 check).
- Secondary spin-off pages: per-region exposure snippets feed the blog; the countdown widget
  is embeddable (link magnet).

## Rejected alternatives

- On-chain analytics index (wallet-level data): needs paid chain-analytics APIs, and estate
  has no edge — fails feasibility.
- "Crypto accountant fee benchmark survey": no data source we can access without outreach
  (user constraint: faceless, no outreach-dependent assets at launch).
- Scraping Koinly/Recap directories for a "state of UK crypto accountancy" report: legally
  murky scrape of competitors and thin value — rejected on quality bar.
