# Brief U05 — SPV Company Bank Account

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/spv-company-bank-account.md`.
- **Category:** Incorporation & Company Structures.
- **Priority:** P2.
- **Hub:** formation-mechanics.
- **Questions answered (target):** 6.
- **Intent:** practical/how-to — reader has an incorporated (or about-to-be-incorporated) SPV and is stuck on the next physical step: opening a bank account.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| spv company bank account | question (dominant) | page_map, no measured volume; questions_corpus confirms exact phrase logged under `misc` cluster |
| spv bank account | question | questions_corpus, `misc` cluster; no volume |
| what is an spv property account | question | page_map variant, no measured volume |
| business bank account for a property company | question | page_map variant |
| do i need a separate bank account for my spv | question | page_map variant |
| can i use my personal account for rental income | question | page_map variant — high-friction "can I skip this" query, answer directly (no, mixing funds against limited-liability practice, lender expectation) |
| which banks accept spv companies | question | page_map variant |
| opening a bank account for a newly formed spv | action | page_map variant |
| do you need a bank account for a limited company | question | demand_corpus-adjacent (rapidformations competitor headline), zero-volume-verified bucket, included for coverage |
| rental property bank account | conversational | demand_corpus, 10/mo, CPC 24.22 |
| separate bank account for rental property | conversational | demand_corpus, 10/mo, no CPC |
| separate bank account for each rental property | conversational | demand_corpus, 10/mo, no CPC — multi-property/multi-SPV angle, touch briefly (one SPV = one account is the norm; a portfolio of SPVs = one account per SPV, not per property) |
| how non-uk residents can open a business bank account in the uk | conversational | competitor angle (propertyspv.co.uk has a dedicated page); one short section, do not build a full non-resident sub-guide (that's U43/U44 territory if it deepens) |

Zero-volume variants are included by design — this is an autocomplete-blind, real-friction query cluster with almost no measurable search data, per the page_map note ("real gap: nothing on disk").

## 3. Our-data baseline

No page in our estate currently targets any bank-account query. No GSC/Bing impressions found for this cluster in our_queries.csv. This is genuinely unclaimed territory — write to fill the gap, not to compete with an existing ranking asset.

## 4. Competitor coverage floor

- https://propertyspv.co.uk/how-non-uk-residents-can-open-a-business-bank-account-in-the-uk/ — direct SPV-bank-account competitor, non-resident angle.
- https://propertyspv.co.uk/wp-content/uploads/2025/02/Seamless-Bank-Account-Setup-Icon-1.svg (page context: propertyspv.co.uk markets a "seamless bank account setup" service) — note the commercial framing to avoid, not to copy.
- https://www.provestor.co.uk/blog/landlords-business-bank-accounts-for-property-investment — direct landlord-bank-account competitor.
- https://www.rapidformations.co.uk/blog/do-you-need-a-bank-account-for-a-limited-company/ — generic "do you need one" competitor, useful for the baseline legal-obligation answer.
- https://www.interpolitanmoney.com/business-uk/do-i-need-a-business-bank-account — adjacent generic competitor.
- https://www.dnsassociates.co.uk/blog/offshore-company-formation-registration-bank-account-setup — non-resident/offshore angle, cross-check against U44 seam.

## 5. Seam warnings — MUST-NOT rules

1. **Do not restate formation steps.** U02 (`how-to-set-up-property-investment-company-uk-guide`) owns Companies House incorporation mechanics (IN01, share capital, PSC statement, ID verification). U05 opens after the company already exists — link up to U02 for "how the company itself gets formed," never re-walk it.
2. **No bank-referral commercials.** Do not name a "best bank" ranking, do not use affiliate or referral language, do not imply any bank pays for placement. Tide/Starling/Mettle/high-street-bank style comparisons must stay generic and descriptive (e.g. "digital-only business bank accounts typically onboard faster than a branch-based application; high-street banks may want to see the company's trading plan") — never a "sign up via our link" framing.
3. Do not restate formation cost totals — that is U03 (`spv-company-formation-cost-uk`, protected seam). U05 may note that most SPV-friendly business banking is free to open (matches U03's cost-pack line) but must not rebuild a cost table.
4. Do not go deep on non-resident director mechanics (UTR, registered office, overseas ID) — one short section max, link out; that territory belongs to the non-resident hub (U43/U44) if it grows.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md`)

- **Companies House incorporation fee: £100 online/software, £124 paper.** Confirmed current via gov.uk fees page, updated 2 July 2026, verified 2026-09-01 (§42 house_positions cross-check). Relevant only as context for "the company already exists by this point" — do not turn into a cost section.
- **Director/PSC identity verification has been a legal requirement for newly appointed directors and PSCs since 18 November 2025** (§11.A house_positions, ECCTA 2023 ss.64-69). Relevant because most business banks now ask to see evidence of CH-verified identity as part of KYC — mention this as a practical reason "have your ID verification done before you apply for the account," but do not re-explain the verification mechanics (link to U02/§11.A content instead).
- **No separate legal requirement in UK company law forces an SPV to hold a business bank account** (a private company can technically operate without one), but in practice a landlord SPV needs one because: mortgage lenders on a limited-company BTL loan require rental income to flow through a company account in the company's name; mixing personal and company funds risks piercing the separation HMRC and lenders expect, and complicates director's loan account record-keeping.
- **KYC for a newly formed SPV is typically harder than for an established company** — no trading history, no filed accounts yet — so digital-only providers (Tide, Starling, Mettle-style) that assess PSC/director ID and the company's SIC code tend to onboard faster than a branch-based high-street application for a brand-new entity. Keep this comparative, never a "best" ranking (seam rule above).
- **Registered office and PSC/director details on file at Companies House feed directly into a bank's KYC check** — an incomplete or wrong SIC code, or a registered office that fails the appropriate-address test (see U06), can slow an application. Cross-link.

## 7. Interlink spec

- `/spv-company` (U01, live) — mandatory up-link to the pillar.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live, slug confirmed on disk at `Property/web/content/blog/how-to-set-up-property-investment-company-uk-guide.md`) — for "how the company itself was formed," from the intro.
- `spv-company-formation-cost-uk` (U03, live, slug confirmed on disk) — for the "what does this cost" handoff (bank account itself is typically free; formation costs live there).
- `registered-office-address-property-spv` (U06, once live) — from the KYC/registered-office point in the facts pack.
- Non-resident director section — link to `non-resident-landlord-scheme-uk-complete-guide` if it exists on disk (verify slug at write time); keep the link light, one sentence.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in tables; hyphenated compounds (digital-only provider, high-street bank, source-of-funds check, buy-to-let, single-director company); sentence-case H2s; no em-dashes anywhere in the copy; no templated second paragraph (do not open with a rephrased restatement of the H1, the pattern Wave 1 QA flagged across multiple posts — see §9.1 of this brief for the required alternative opening); every FAQ answer distinct in substance, not a rephrasing of a body section; no build or pipeline narration in the copy ("verify at build", inline house-position codes, "as covered above"); every citation either verified against `house_positions.md` or explicitly flagged for the factual QA pass. **Non-promotional rule carries into the wording itself** (§5.2): descriptive, comparative, never a ranking, never a recommendation of a named provider, never affiliate or referral phrasing.

**Formulation types.** The corpus is thin here (only two exact rows: "spv bank account", "spv company bank account"), so the type spread comes from the page_map and demand_corpus variants in §2: **question** ("do i need a separate bank account for my spv", "which banks accept spv companies"), **action** ("opening a bank account for a newly formed spv"), **conversational** ("can i use my personal account for rental income", "separate bank account for each rental property"). There is no genuine **technical** formulation in either corpus for this topic — do not invent one; the KYC section carries the technical depth without needing a keyword to hang on.

## 9. Fresh outline

1. **Intro** — direct answer up top: yes, open a dedicated business bank account for the SPV; state why (lender requirement, fund separation, HMRC record-keeping) in two sentences, then move to mechanics. Second paragraph must NOT follow a "this guide covers X, deliberately not Y, see our Z" template — open instead with the practical trigger point (e.g. "most landlords do this in the fortnight after incorporation, once the certificate and SIC code are confirmed").
2. **H2 — Do you legally need a business bank account for an SPV** — direct answer, personal-account risk explained plainly (director's loan account complications, lender refusal, audit-trail problems).
3. **H2 — What you need before you apply** — certificate of incorporation, company number, registered office and SIC code on file, director/PSC ID verification status, proof of address for the applicant.
4. **H2 — Digital-only vs high-street: how onboarding differs for a new SPV** — comparison table (see below), generic and non-promotional.
5. **Comparison table — digital-only vs high-street business banking for a new SPV**

   | Factor | Digital-only provider | High-street bank |
   |---|---|---|
   | Typical onboarding time for a new company | Often same day to a few days | Can take one to several weeks |
   | Trading history required | Usually none | May ask for a business plan or forecast |
   | In-branch support | None (app/web only) | Available |
   | Typical monthly fee | Often free or low-cost tier | Varies, sometimes free for a promotional period |
   | Multi-currency / international | Common on digital-only providers | Varies by bank |

   (Writer to keep language generic — no named-provider endorsement beyond factual, non-promotional mentions where needed for reader orientation.)
6. **H2 — Opening the account: what to expect in the KYC check** — director/PSC ID verification, SIC code check, registered office check, source-of-funds questions for the initial deposit if buying imminently.
7. **H2 — Can I use my personal account instead** — direct no, with the specific risks (director's loan account tax exposure, lender refusal at mortgage stage, messy bookkeeping).
8. **H2 — One SPV, one account: what changes with multiple SPVs** — each SPV is a separate legal entity and needs its own account; briefly touch the multi-SPV/portfolio landlord case from the demand-corpus variant.
9. **H2 — Non-UK resident directors: what's different** — short section only, link out for depth.
10. **FAQ (10-14 questions)** — built from §2's variant list plus natural follow-ups, e.g. "can i use my personal bank account for my spv," "do i need a business bank account before i can buy a property through my spv," "which banks accept newly formed property companies," "how long does it take to open a business bank account for a limited company," "do i need a trading history to open a business account," "is a business bank account free," "can i open an spv bank account before incorporation completes," "does my registered office affect my bank application," "do i need id verification done before applying for a bank account," "can a non-uk resident director open a uk business bank account for their spv," "do i need a separate account for each property," "what happens if i mix personal and company funds."
