# U44 — offshore-company-owning-uk-property

Verdict: NEW (the one non-resident hub page the programme allows, per PAGE_MAP.md §9 seam 10). Cluster: non-resident. Priority: P2.

## 1. Unit facts

- Slug: `offshore-company-owning-uk-property` (verify free on disk; not found under `content/blog/` in current search).
- Dominant query: "can an offshore company buy property in uk" (page_map.csv row U44: no measured volume; 8 GSC queries / 162 impressions in our data).
- Tagged query variants, with data (all from questions_corpus.csv non-resident bucket, unmeasured volume individually, part of the 27-question bucket total; seed = "offshore company uk property"):
  - "overseas company holding uk property" (line 1331/1346)
  - "offshore company owning uk property" (line 1343/1344, exact page_map dominant phrasing)
  - "uk property owned by offshore company" (line 1351)
  - "offshore company selling uk residential property" (line 1345)
  - "should i buy uk property through an offshore company" — editorial framing from page_map.csv, not an independent corpus hit found; treat as the verdict-framing question, not a separately measured query.
  - "is an offshore property company still worth it" — same status, editorial framing; this is the honest-verdict angle the router must lead with.
  - "buying uk property with offshore company" (line 1327)
  - "can an offshore company own property in the uk" / "can offshore company own property uk" (lines 1329, 1330)
  - "overseas company buying uk property" (line 1346, duplicate seed of "overseas company holding")
  - "list of offshore companies in uk" (line 1333) — low relevance, likely noise (directory-intent, not tax-intent); do not target, do not build a listicle.
  - **Added at gate review** (three exact-match corpus rows in the non-resident bucket that the original list missed; all are near-identical head formulations and cheap to cover in the H1/intro and FAQ wording):
    - "holding uk property in an offshore company" — questions_corpus.csv, non-resident bucket, seed `offshore company uk property`. This is the **holding**-verb formulation, distinct from the buy/own/sell verbs already listed; work it into the "three stacked costs" H2 phrasing.
    - "overseas company owning uk property" — non-resident bucket. The `overseas` synonym of the page's own dominant phrasing; the page must use "overseas company" as an explicit synonym at least once so the synonym set is covered rather than relying on `offshore` alone.
    - "overseas company selling uk property" — non-resident bucket. Pairs with "offshore company selling uk residential property" already listed; both feed the "Selling: NRCGT and indirect disposal" H2 and one FAQ entry.

**Formulation types.** The non-resident bucket for this seed is overwhelmingly **question**-shaped ("can an offshore company own property in the uk", "can an offshore company buy property in uk") and **technical**/noun-phrase-shaped ("offshore company holding uk property", "uk property owned by offshore company", "overseas company selling uk property"). **Conversational** is served by the editorial framings in §1 ("should i buy uk property through an offshore company", "is an offshore property company still worth it") — these are genuine reader phrasings even though they are not measured corpus rows, and they carry the verdict. There is no **action** formulation in the corpus (nobody searches "how to set up an offshore property company" in this bucket) and the router framing means we would not want to serve one anyway — do not invent an action-shaped section.

## 2. Our-data baseline

Page_map.csv states 8 GSC queries / 162 impressions land somewhere in our data on offshore-company-related phrasing, but no row in `our_queries.csv` matches "offshore company" or "overseas company" against any live URL in the sample pulled for this brief (search returned zero hits for "offshore compan" or "overseas compan" in our_queries.csv). This is consistent with page_map's framing: measurable demand exists in GSC at the aggregate level, but no single existing page currently owns or ranks for it — a genuine zero-baseline build, not a rewrite. State this plainly in the brief's dated-facts framing; do not claim a specific ranking position that the data does not show.

## 3. Competitor floor

- `dnsassociates.co.uk` runs a general "offshore company formation" service page and two supporting blog posts (benefits of offshore company formation; offshore company formation registration bank account setup) — competitor_urls.csv lines 6959, 7019, 7092, 7119. These are formation-service pages, not property-specific tax-verdict content; they do not answer "should I hold UK property through an offshore company," which is this page's job.
- No competitor in the corpus runs a dedicated "offshore company owning UK property" tax-verdict page. The closest adjacent content is the general ATED/NRCGT/ROE cluster on `uklandlordtax.co.uk` (non-resident category, lines 6412-6856), none of which frames the offshore-company decision as a single up-front verdict.
- This confirms the router framing (verdict first, then route to the specialist pages) is a genuine content-gap play, not a catch-up rewrite.

## 4. Router framing (PAGE_MAP.md §9 seam 10, mandatory)

This is explicitly the ONE non-resident hub page the programme allows. It must be built as a **router**, not a fourth technical deep-dive:

- **Verdict up top**: offshore ownership of UK property rarely pays, once ATED, NRCGT and the Register of Overseas Entities are stacked together. State this as the honest answer in the first 100-150 words, not buried after a long explainer.
- **Then route**: 2-3 links into the ATED cluster (do not re-explain bands — 20+ ATED pages exist on disk, confirmed: `ated-overview-companies-holding-uk-residential-property-2026-27`, `ated-complete-guide-2026-27`, `ated-rates-2026-27-bands-table-worked-examples`, `ated-relief-rental-property-relief-mechanics`, etc.), 1-2 links into NRCGT detail (`nrcgt-indirect-disposal-property-rich-companies-shares`, `indirect-disposals-property-rich-entities-section-356od-section-517d-slice-action`, both confirmed on disk), and a link into U43 (`non-resident-landlord-scheme-uk-complete-guide`) for the NRL scheme, since U43 owns that intent entirely.
- **Do NOT** re-explain ATED bands, NRCGT computation detail, or NRL scheme mechanics on this page. If a fact needs stating to support the verdict (e.g. "ATED can run to six figures a year on a £5m+ dwelling"), cite the figure and link out for the full table rather than reproducing it.

## 5. Seam MUST-NOTs

- ATED bands/reliefs/mechanics: owned by the ATED cluster (20+ pages). Link 2-3, do not restate.
- NRCGT computation and indirect-disposal detail: owned by `nrcgt-indirect-disposal-property-rich-companies-shares` and the indirect-disposals page. Link 1-2, do not restate.
- NRL scheme mechanics (withholding, NRL1/NRL2/NRL3, gross-payment approval, and after this wave's EXTEND, the NRL4/NRL6 company path): owned by U43. Link, do not restate — this is the seam explicitly called out against U43 in the task brief.
- Register of Overseas Entities operational detail (registration, annual update statement): owned by `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` (confirmed on disk). U44 references RoE as part of the verdict (it is one of the three stacked costs/frictions) but does not re-teach the filing mechanics.
- DTA/treaty detail: owned by the treaty-framework guide referenced from U43 ("tax-treaties-property-investors-treaty-framework-guide"). One-line mention only if relevant to the verdict, no treaty-article walkthrough.

## 6. Dated facts pack (verified vs house_positions.md)

- ATED headline: applies to non-natural persons (including non-UK companies) holding a UK dwelling worth over £500,000; 2026/27 bands run £4,600 (£500k-£1m) up to £303,450 (over £20m) (house_positions.md §18.1, verified gov.uk 2026-05-22). Cite the existence and shape of the charge to support the verdict; link to the ATED bands page for the full table, do not reproduce all six bands here.
- ATED-related CGT abolished from 6 April 2019; non-resident company gains on UK property now fall under the standard non-resident CGT regime, TCGA 1992 s.1A + Sch 1A (house_positions.md §2, §18.5). This is a common competitor error (old 28% ATED-CGT rate still cited elsewhere) — the page should get this right explicitly.
- NRCGT rate for non-resident company disposals from 30 October 2024: aligned with individuals at 18%/24%, though companies typically route gains through the standard non-resident chargeable-gains mechanism at the prevailing rate (house_positions.md §18.5). Do not compute a worked NRCGT example here — link to the NRCGT page for that.
- RoE (Register of Overseas Entities, ECCTA 2023 / Economic Crime (Transparency and Enforcement) Act 2022) runs in parallel with ATED, does not displace it; a non-RoE-compliant overseas entity cannot complete UK Land Registry dispositions (house_positions.md §18.6, §11, §11.A). This is the third stacked friction supporting the verdict — registration, ongoing annual update statements, and the Land Registry lock-out risk.
- NRL scheme is statutory (ITA 2007 ss.971-972 + SI 1995/2902), not treaty-based, and a DTA does not remove UK taxing rights over UK property income or gains (house_positions.md §10, §16.2, §16.6). Useful for knocking down the "an offshore company avoids UK tax via treaty" myth as part of the verdict.
- Art 13(4) OECD-model property-rich-entity rule: gains on shares in a property-rich offshore company (broadly ≥50% of value from UK immovable property) are also caught by UK taxing rights under most modern UK treaties and by NRCGT's indirect-disposal regime regardless (house_positions.md §16.3). Relevant if the verdict addresses "can I avoid tax by holding shares in the offshore company instead of the property directly" — the honest answer is generally no; link to the indirect-disposals page rather than deriving the property-richness test here.

## 7. Interlink spec (verified on disk)

- ATED (pick 2-3): `ated-overview-companies-holding-uk-residential-property-2026-27`, `ated-complete-guide-2026-27`, `ated-rates-2026-27-bands-table-worked-examples` (all confirmed present under `content/blog/`).
- NRCGT (pick 1-2): `nrcgt-indirect-disposal-property-rich-companies-shares`, `indirect-disposals-property-rich-entities-section-356od-section-517d-slice-action` (both confirmed present).
- `non-resident-landlord-scheme-uk-complete-guide` (U43) — mandatory, this is the named seam-10 partner.
- `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` (confirmed present) — RoE mechanics.
- `changes-nrl-companies` (confirmed present) — if the offshore company is letting (not just holding for capital growth), point non-resident landlords running rental income through the company here for the CT-regime detail.
- Mandatory up-link: `/spv-company` (U01 pillar). **Route VERIFIED ON DISK 2026-09-01** at `Property/web/src/app/spv-company/page.tsx`, so the live path is `/spv-company` at the site root, NOT under `/services/`. This page should make clear that a UK SPV is very likely the better answer for most readers landing here, which is itself part of the honest verdict.

## 8. Editorial conventions (hard rules)

£nnn always; "per cent" in prose, % in tables; hyphenated compounds (offshore-company where used as a compound adjective, e.g. "offshore-company ownership," not when used as a noun phrase "an offshore company"); sentence-case H2s; no em-dashes; no templated second paragraph; distinct FAQs; no build/pipeline narration; citations verified against house_positions.md §2/§10/§16/§17/§18 or flagged.

## 9. Outline

1. **H1**: Can an offshore company own UK property? The honest answer
2. Sentence-case H2s, router-shaped:
   - The verdict, up top: why offshore ownership of UK property rarely pays now (100-150 words, ATED + NRCGT + RoE stacked, then "read on for the detail, or jump straight to the page that answers your specific question")
   - What counts as an offshore company for UK property purposes (brief definitional section, non-UK-incorporated entity, not a UK company with an offshore shareholder)
   - The three stacked costs: ATED, NRCGT and the Register of Overseas Entities (short summary of each, link out to the owning page for each, this is the router's core section)
   - The myth: does a tax treaty protect an offshore company's UK property from UK tax (no; link to §16.2/§16.6-grounded explanation, point to U43's treaty section)
   - When an offshore company still makes sense (the honest minority case: pre-existing structure, non-tax commercial reasons, jurisdictional requirement — keep this short and genuinely honest, do not manufacture false balance)
   - The UK SPV alternative (link to `/spv-company` pillar and make the comparison explicit: most non-resident buyers are better served by a UK company)
   - If letting the property: the NRL scheme applies regardless of where the company is incorporated (link to U43 and `changes-nrl-companies`)
   - Selling: NRCGT and indirect disposal (short, link to NRCGT pages)
3. **FAQ, 10-14 questions**, distinct, drawing on §1's tagged variants plus natural follow-ons (e.g. "Does an offshore company avoid UK inheritance tax on UK property?" — link to the IHT non-resident section, house_positions.md §15.6/§9, do not answer in full here; "Is Register of Overseas Entities registration compulsory for an offshore property-holding company?" — yes, link to the RoE page; "What is the cheapest jurisdiction for an offshore property company?" — decline to recommend a jurisdiction, redirect to the honest verdict that a UK SPV is usually the better answer).
4. Mandatory up-link to `/spv-company` woven into the "UK SPV alternative" section, not just a footer link.
