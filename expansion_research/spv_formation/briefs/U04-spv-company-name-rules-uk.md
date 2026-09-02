# Brief U04 — SPV Company Name Rules UK

## Editorial conventions (hard rules, every brief)

- £nnn always (never "GBP nnn" in prose). Per cent in prose, % in tables.
- Hyphenated compound modifiers (year-one, hold-and-let, single-purpose).
- Sentence-case H2s.
- No em-dashes anywhere in the body copy.
- No templated second paragraph. Banned shape: "this guide covers X, not Y, see Z." Write the actual opening argument instead.
- FAQs must be distinct questions, never restatements of the same query in different words.
- No build narration (no "in this section we will," no pipeline artefacts, no inline citation codes like "(HP12)").
- Citations verified against `docs/property/house_positions.md` where a lock exists; anything without a lock is flagged **verify-at-write**, never guessed.
- Tables use `<thead>`/`<tbody>`. Asides wrap text in `<p>`.

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/spv-company-name-rules-uk.md`.
- **Category:** Incorporation & Company Structures.
- **Priority:** P3.
- **Hub:** formation-mechanics.
- **Questions answered (target):** 7.
- **Intent:** informational, pre-formation and post-formation (naming now, and renaming later).

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| buy to let limited company names | dominant (page_map) | page_map, no measured volume |
| sample spv company names | variant | page_map + questions_corpus (misc bucket) |
| spv company name | variant | page_map + questions_corpus (misc bucket, distinct from the "spv company" head term U01 owns) |
| property limited company name ideas | variant | questions_corpus (misc bucket) |
| property limited company names | variant | questions_corpus (misc bucket) |
| property ltd company names | variant | questions_corpus (misc bucket) |
| change limited company name | cost/action | our_queries.csv, 320/mo, site:propertyspv.co.uk |
| change company name | action | demand_corpus, 1900/mo, site:propertyspv.co.uk — high-volume but a generic-company-law query, not SPV-specific; use for the "changing a name later" section, do not chase the volume with unrelated content |
| change ltd company name | action | our_queries.csv, 320/mo |
| companies house name rules sensitive words | question (page_map) | page_map variant, no measured volume |
| can i call my company property investments ltd | question (page_map) | page_map variant, tests the sensitive-words rule directly |
| do lenders care about my company name | question (page_map) | page_map variant, brand/lender angle |
| company name registration uk | adjacent | demand_corpus, 1000/mo, bucket "form-now" — background only, belongs to U02's filing mechanics, not this page |
| change company name companies house | action | our_queries.csv, 1300/mo — same seam note as "change company name" above; this page covers the naming RULES for the change, not the CS01/NM01 filing steps (U02's territory) |
| companies house name change | action | our_queries.csv, 1300/mo — same cluster as the row above, same seam treatment |
| company name change uk | action | our_queries.csv, 110/mo — the highest-volume UK-specific name-change phrasing in the corpus, use it in the "changing a name later" H2 |
| change my limited company name | action | our_queries.csv, 30/mo |
| company name change procedure | action | our_queries.csv, 20/mo — procedural intent; answer the RULES and the fee, hand the filing steps to U02 |
| change company name resolution / company name change board resolution | action | our_queries.csv, 20/mo + 10/mo — the special-resolution mechanic specifically; note it is a members' special resolution, not a board resolution, which is the actual confusion behind the second phrasing |
| company name registration search | pre-formation | our_queries.csv, 170/mo — name-availability checking; one line pointing at the Companies House name-availability checker, do not build a tool section |
| can i get a revised certificate of incorporation from companies house if the company name changes | question (live Bing) | questions_corpus, 4 impressions, live Bing query on the estate — real reader question, strong FAQ candidate (answer: a certificate of incorporation on change of name is issued; the original certificate and the company number are unchanged) |
| can you change limited company name on company house / companies house ltd company name change process | question (live Bing) | questions_corpus, 14 impressions each, live Bing queries on the estate |

**Do-not-chase noise in this seed.** The `change company name` seed pulled substantial non-UK and off-topic volume: `change a company name nz`, `company name change cipc` (South Africa), `company name availability texas`, `company name check texas`, `change company name on indeed`, `company name change examples/list/checklist`, `buy a company name` (720/mo), `coming up with a company name` (90/mo). None of these are UK company-law intent and none should shape the outline. Volume in this seed is not a coverage signal.

**Naming is genuinely zero-competition in the corpus** (page_map notes "thin but zero-competition"). Volume signal is thin and mostly generic company-law demand (the 1900/mo and 1300/mo "change company name" queries are not SPV-specific), so this page wins on being the only property-specific naming page in the estate, not on head-term volume.

## 3. Our-data baseline

No page in the estate currently covers company naming rules. Adjacent signals only:
- `company name registration uk` (demand_corpus, 1000/mo) sits with U02's formation-mechanics territory, not here.
- No GSC/Bing impressions currently attach to any naming query; this is a coverage play, not a ranking-recovery play.

## 4. Competitor coverage floor

- https://taxqube.co.uk/setting-up-a-special-purpose-vehicle-spv-to-purchase-properties/ — check for any naming guidance folded into the general SPV formation content.
- https://taxqube.co.uk/how-to-set-up-your-own-limited-company/ — generic formation competitor; check for a naming section.
- https://www.getground.co.uk (per demand_corpus "buy company name companies house" mapping) — SPV-specific competitor, check for naming/branding angle.
- gov.uk Companies House "Incorporation and names" guidance — the primary source for the sensitive-words list and the same-as rules; verify current wording at write time.

## 5. Seam warnings — MUST-NOT rules

1. **U04 owns naming rules only.** It never explains how to actually incorporate (IN01, share capital, PSC statement, ECCTA ID verification) — that is U02's job. One-line link to U02 for "how to file," nothing more.
2. **U04 never lists or recommends SIC codes.** SIC is U09's protected territory (`sic-code-for-an-spv-property-company`). If SIC comes up incidentally (e.g. "does my company name need to match my SIC code" — it does not, they are unrelated fields), say so in one sentence and link to U09, do not explain SIC itself.
3. Do not restate U10's territory (changing the SIC code) even though "change company name" and "change SIC code" are filed on the same CS01/confirmation-statement mechanism — name change uses form NM01 or a special resolution plus Companies House notification, not the confirmation statement; keep the two changes clearly separate.
4. Do not go deep on trademark law. A company name being accepted by Companies House does not mean it is free to trade under, or that it does not infringe an existing trademark; one paragraph, with a link out to gov.uk trademark search, is enough. This is not a trademark page.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md` where locked, else verify-at-write)

- **No lock exists in `house_positions.md` for company-naming statute.** The load-bearing facts below were therefore **verified at source on 2026-09-02** against gov.uk, and are marked VERIFIED with their source. Anything still marked verify-at-write was not confirmable at source and must not be guessed.
- **VERIFIED 2026-09-02 — Name-change fee. A change of company name is NOT free.** Companies House charges **£20 online, £20 software, £30 paper**, plus a **£85 same-day change of name** service (online/software only). Source: gov.uk "Companies House fees", page updated 2 July 2026. **This corrects an earlier draft of this brief, which stated that name changes "have historically been free to file online". That was wrong; do not write it.** The £20 is the single most concrete number on this page and belongs in the "changing a name later" H2 and in the "is there a fee to change my company name" FAQ.
- **VERIFIED 2026-09-02 — Same-as rule.** Two names are treated as the same where the regulations' disregarded elements are stripped out: legal-form suffixes (limited, ltd, plc, cic and Welsh equivalents), geographic/descriptive additions such as "UK", "Wales", "Northern Ireland", connectors such as "&co" and "and company", punctuation, spaces and certain symbols. Characters are also treated as equivalent: accented letters match unaccented, and numerals match the spelled-out word ("2" = "TWO"). Source: gov.uk "Incorporation and names" guidance. This directly powers the worked example in outline item 2.
- **VERIFIED 2026-09-02 — "Too like" rule (distinct from same-as, and the brief's original draft did not carry it).** A name may be challenged as "too like" an existing name where it differs only by a few characters, signs or punctuation, or where it looks or sounds similar. Trademark concerns and geographic separation are expressly not relevant to that assessment. **The Secretary of State must order a change within 12 months of registration**, so this is a time-limited risk, not an open-ended one. Source: gov.uk "Incorporation and names". This is a better and more accurate answer to the page_map variant "what happens if someone else registers a name similar to mine after i do" than the same-as rule is.
- **VERIFIED 2026-09-02 — Suffix.** A private company limited by shares must end in "Limited" or "Ltd" (or the Welsh equivalents). The exemption exists only for companies limited by guarantee whose articles restrict objects to commerce, art, education or charity, prohibit dividends and direct assets to similar bodies on winding up. **A property SPV is limited by shares, so the exemption never applies; state this plainly rather than hedging it.** Source: gov.uk "Incorporation and names".
- **VERIFIED 2026-09-02 — Sensitive words.** Words and expressions listed in Annexes A to C of the gov.uk "Incorporation and names" guidance require prior approval, and in some cases the written view of a named relevant body submitted to Companies House. Names may also not falsely imply a connection with UK government, devolved administrations, local authorities or specified international bodies; may not be offensive or facilitate fraud; and may not contain computer code. **Using a sensitive word without approval is a criminal offence carrying a fine.** Source: gov.uk "Incorporation and names", Annex A (sensitive words requiring approval) and Annex C (words regulated under other legislation). The annexes are the live lists; if the writer wants a specific example word, check it against the annex rather than asserting it.
- **Ordinary property-SPV words are not sensitive.** "Property", "investments", "holdings", "residential", "portfolio", "estates" and similar descriptive terms do not appear as sensitive words requiring approval, and are used freely by registered property companies. Safe to state. If the writer wants to name a contrasting sensitive example, take it from Annex A rather than inventing one.
- **VERIFIED 2026-09-02 — Changing a name later.** The company changes its name by special resolution of the **members** (not a board resolution), or by any other means provided in the articles. Where the special-resolution route is used, the resolution must be delivered to Companies House **within 15 days of being passed**. **The change takes effect when Companies House registers it, not when the resolution is passed.** Source: gov.uk "Incorporation and names". Form NM01 is the paper notice route; the online/software route is the £20 filing above. This remains a separate mechanism from the SIC-code change on the confirmation statement (U10's territory).
- **Companies House incorporation fee: £100 online/software, £124 paper** (verified against gov.uk Companies House fees page, updated 2 July 2026; verified current 2026-09-01 per `house_positions.md` §42). Relevant only as a one-line reminder that the name is set (or changed) as part of, or alongside, this filing, not a separate fee item for this page to build out.
- **Trading name vs registered name:** a company can trade under a different "business name" from its registered company name, subject to trading-disclosure rules (displaying the registered name at the registered office and on business documents). Flag this distinction; do not build a full trading-names page here, verify-at-write for current disclosure requirements if the writer wants a worked example.
- **Lender perspective on naming (page_map "do lenders care about my company name" variant):** this is a practitioner-experience point, not a statutory one. A generic, professional-sounding SPV name (avoiding anything that reads as consumer-facing or unrelated to property) is standard market practice; do not present this as a rule, present it as practical guidance and mark it as such.

## 7. Interlink spec (verified against files on disk)

- `/spv-company` (U01 pillar, live route `Property/web/src/app/spv-company/page.tsx`) — **mandatory up-link.** Naming sits inside the SPV lifecycle the pillar owns; link from the intro.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live at `Property/web/content/blog/how-to-set-up-property-investment-company-uk-guide.md`) — for "how to actually file," from the incorporation-fee mention and from the intro's scope note.
- `sic-code-for-an-spv-property-company` (U09, live at `Property/web/content/blog/sic-code-for-an-spv-property-company.md`) — one-line link only, from the "naming vs SIC code are unrelated fields" aside; never explain SIC content here.
- `change-sic-code-companies-house-property-company` (U10, once live) — from the "changing a name is a different filing from changing your SIC code" note, once U10 is published.
- `spv-company-formation-cost-uk` (U03, live at `Property/web/content/blog/spv-company-formation-cost-uk.md`) — optional light link if the NM01/name-change filing cost comes up, matching U03's own light-link note back to this page.

## 8. Fresh outline

1. **Intro** — direct answer up top: what Companies House will and will not accept as a name for a property SPV, and that changing it later is straightforward. State scope in one sentence (naming rules only, not the filing mechanics), then move straight to content, no templated second paragraph.
2. **H2 — What makes a company name valid** — the "limited"/"Ltd" suffix requirement (mandatory for a share-limited SPV, no exemption available), the same-as rule with the verified disregarded-elements list (suffixes, "UK", "&co", punctuation, accents, numerals-for-words) and a short worked example: two applicants both wanting "Oakridge Property Investments Ltd," what happens, and why "Oakridge Property Investments UK Ltd" does not solve it. Then the offensive/misleading prohibition.
2a. **H2 — "Too like" an existing name** — the second, separate objection route, distinct from same-as: a name accepted at registration can still be ordered changed if it is too like an existing name, but only within 12 months of registration. This is the honest answer to the "someone registered a similar name after me" variant and it is currently the sharpest fact on the page.
3. **H2 — Sensitive words and expressions** — what triggers extra scrutiny (government/royal/professional-body implication, regulated-activity words), and reassurance that ordinary property-SPV words ("property," "investments," "holdings," "residential," "portfolio") are not sensitive. One clearly marked verify-at-write example table if the writer has time to check current examples against the gov.uk list; otherwise prose only.
4. **H2 — Choosing a name for a property SPV: practical considerations** — brand and lender perspective (page_map variant): generic vs descriptive naming, whether to name the SPV after yourself, portfolio-scale naming (numbered SPVs, e.g. "Oakridge Property 1 Ltd," "Oakridge Property 2 Ltd") for landlords running multiple companies, and the trading-name option if the reader wants to trade under something different from the registered name.
5. **H2 — Can I call my company "Property Investments Ltd"?** — direct answer to the page_map variant: descriptive, generic property words are not sensitive, but genericness has a practical downside (harder to search for, more likely to collide with the same-as rule against an existing company). Balance the legal answer with the practical one.
6. **H2 — Changing a company name later** — the members' special-resolution mechanism (15 days to deliver the resolution, effective on registration by Companies House, not on passing), the **£20 online / £30 paper fee and the £85 same-day option**, that it is separate from the SIC-code change on the confirmation statement, and that there is no material downside to renaming an SPV later (contracts, bank accounts and the Companies House number are unaffected by a name change). One-line link to U10 once live.
7. **H2 — What a name change does not affect** — bank account, VAT/CT registration, existing contracts and mortgages continue under the new name once notified; this is a reassurance section for landlords worried about renaming a portfolio SPV.
8. **FAQ (10-14 questions)** — built from §2's tagged variants plus natural follow-ups: e.g. "what company names are banned in the uk," "can i use my own name for my spv," "does companies house check trademarks," "how long does a name change take," "does changing my company name affect my mortgage," "can two spvs have similar names," "do i need permission to use the word 'estates' in my company name," "is there a fee to change my company name" (answer with the verified £20/£30/£85 figures, not a hedge), "can i reserve a company name before incorporating," "does my trading name need to match my registered name," "what happens if someone else registers a name similar to mine after i do" (the too-like rule and its 12-month limit), "do i get a new certificate of incorporation when i change my company name" (from the live Bing query in §2: yes, a certificate on change of name is issued, and the company number does not change), "is a name change a board resolution or a members' resolution" (members' special resolution, unless the articles provide another means).
