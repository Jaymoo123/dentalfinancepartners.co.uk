---
slug: charity-structures-which-to-choose
tier: pillar (guide)
route: /guides/charity-structures-which-to-choose
intent: DIY / BLUF + decision content. Founders choosing a legal form. Own the structure-comparison lane; the page is written to later host the queued structure-chooser tool.
---
# Charity structures compared: CIO, charitable company, unincorporated and CIC

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK, fetched 2026-07-11)

- Primary family: "charity types" 390/mo + "charity structures" / "types of charity structure" 950/mo (combined ~1,340/mo); plus "cio vs charitable company", "which charity structure", "charitable trust vs cio" long-tail.
- Head "charitable incorporated organisation" 6,600/11 is owned by wave-1 `/guides/set-up-a-charity-cio`; this page targets the *comparison/chooser* intent, not the CIO head term.

## Asset type + why

Pillar **guide** (`/guides/`). Written as a content page that can later host the queued **structure-chooser tool** (per `CALCULATORS.md` queue tier — NOT embedded at launch). Reserve a section for the future embed with a placeholder heading + a plain "answer a few questions to narrow your options" line, but ship as full standalone content; the tool slots in later without a rewrite.

## Search-intent class + play

DIY / BLUF + decision guidance. gov.uk keeps structure guidance deliberately neutral; the win is a genuine decision layer (which structure and why, with the accounting/tax/liability consequences gov.uk underplays) plus the definitive comparison table. Capture into `/services/charity-accounts` and `/for/cics` / `/for/social-enterprises`.

## Dedup — page-level

- **vs wave-1 `/guides/set-up-a-charity-cio`**: that guide leads on *what a CIO is + registration*; a short structure comparison lives there. This page owns the *full four-way comparison + decision logic*. Coordinate: the CIO guide keeps its CIO-deep content and links here for "compare all structures"; this page keeps CIO to a comparison row + links there for CIO detail. Shared table STRUCTURE is fine; copy must not be duplicated.
- **vs wave-1 `/guides/cic-complete-guide`**: CIC-deep content stays there; here CIC is one comparison column + a "when a CIC fits instead" signpost.
- **vs wave-1 `cic-vs-charity` blog**: that is the narrow CIC-vs-charity binary; this is the full four-way chooser. Link, do not duplicate.
- **vs generalist**: no structure-comparison content estate-wide. Virgin.

## Required structure (H2 skeleton)

1. The short answer (BLUF 40-60w): the four main routes are the charitable incorporated organisation (CIO), the charitable company, the unincorporated association/trust, and the CIC (which is not a charity). The right choice turns on incorporation/liability, who you register with, and whether you need charity tax reliefs.
2. The two questions that decide it (do trustees need limited liability? do you need charity tax reliefs?) — decision framing.
3. **Structure comparison table** (the core asset): CIO · charitable company · unincorporated · CIC, across rows: legal personality/limited liability, registers with, main regulator, charity tax reliefs (Gift Aid/rate relief), accounts framework, best-fit scenario.
4. CIO: the default for most new charities (why — Commission-only registration).
5. Charitable company: when incorporation via Companies House is preferred (dual registration).
6. Unincorporated association / trust: simplest, but no separate legal personality (trustee personal liability).
7. CIC: when a social mission does not need charity status (link to CIC pillar; no Gift Aid).
8. [Future tool slot] Narrow it down: structure chooser (placeholder — one line; tool queued).
9. How to register once you have chosen (signpost → register hub).
10. Scotland and Northern Ireland structures differ (flag).
11. Frequently asked questions.

- **Internal links (live)**: `/guides/set-up-a-charity-cio`, `/guides/cic-complete-guide`, `/blog/cics-and-social-enterprises/cic-vs-charity`, `/guides/register-a-charity-step-by-step` (wave-2 sibling), `/for/cics`, `/for/social-enterprises`, `/services/charity-accounts`.

## FAQ candidates

What is the difference between a CIO and a charitable company? Which charity structure has limited liability? Do all charity structures register with the Charity Commission? Can I change my charity's structure later? Is a CIC a type of charity? What is the most common structure for a new charity? Do unincorporated charities have to register? Which structure lets us claim Gift Aid?

## House positions touched (figures map)

- **HP 25** (structure choice canonical; CIO registers with the Commission only, charitable company registers with BOTH Commission and Companies House): https://www.gov.uk/guidance/charity-types-how-to-choose-a-structure — spine of the whole page + table.
- **HP 1** (£5,000 registration gate; CIOs register at any income) — table row + §9: https://www.gov.uk/guidance/how-to-register-your-charity-cc21b
- **HP 6** (accounts framework: non-company charities ≤£250,000 may use receipts and payments; companies + over £250,000 use accruals) — accounts-framework table row: https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d (anchor figures via CC31 per HP 6/open flag 4)
- **HP 22** (CIC is not a charity; no charity tax reliefs; regulated by ORCIC) — CIC column: https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies
- **HP 10** (charity tax reliefs need HMRC recognition — the reliefs column caveat): https://www.gov.uk/charities-and-tax
- **HP 26** (Scotland/NI differ) — §10 flag: https://www.oscr.org.uk/

## HP GAPS (FLAG, do not invent)

- **Charitable trust vs charitable company liability specifics / trust-deed mechanics**: not in HP. Describe unincorporated bodies as lacking separate legal personality (trustees personally liable) at a high level; do NOT assert statutory detail. Verify at https://www.gov.uk/guidance/charity-types-how-to-choose-a-structure.
- **Whether/how a structure can be converted later (e.g. unincorporated → CIO)**: HP silent. Answer the FAQ qualitatively ("conversion is possible for some structures, subject to Commission process") and link the structure guidance; do NOT detail the conversion mechanism.
- **CC15d body figures**: HP open flag 4 — anchor the accruals/receipts-and-payments boundary via CC31, not CC15d body.

## Hallucination danger zones

- Do not state SORP tier thresholds (HP open flag 1); the accounts row references the £250,000 accruals boundary only.
- Do not imply a CIC is a charity or can claim Gift Aid/rate relief.
- Do not assert incorporation timescales or fees.
- Do not enumerate the statutory descriptions of charitable purpose here (out of scope; that is the register hub's territory and is itself flagged).

## Meta

- metaTitle (≤60): "Charity Structures Compared: CIO, Company, CIC & More"
- metaDescription (≤155): "CIO, charitable company, unincorporated or CIC? Compare liability, registration, regulator and tax reliefs for each charity structure and choose the right one."
