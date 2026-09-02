# Brief U32 — Landlord Registration, Limited Company (Scotland and Wales)

## Editorial conventions (hard rules, every brief)

- £nnn always. Per cent in prose, % in tables.
- Hyphenated compound modifiers.
- Sentence-case H2s.
- No em-dashes anywhere in the body copy.
- No templated second paragraph.
- FAQs must be distinct questions, never restatements of the same query.
- No build narration, no inline citation codes.
- Citations verified against `docs/property/house_positions.md` where a lock exists; else flagged verify-at-write.
- Tables use `<thead>`/`<tbody>`. Asides wrap text in `<p>`.

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/landlord-registration-limited-company-scotland-wales.md`.
- **Category:** Incorporation & Company Structures (run-the-company).
- **Priority:** P3.
- **Hub:** run-the-company.
- **Questions answered (target):** 5.
- **Intent:** compliance/administrative — a company landlord (or its director) needing to register in a devolved nation.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| landlord registration limited company scotland | dominant (page_map) | page_map, no measured volume |
| landlord registration limited company | variant (page_map) | page_map |
| rent smart wales limited company | variant (page_map) | page_map |
| who registers when the owner is a company | variant (page_map) | page_map, plain-language framing |
| does the director or the company register as landlord | variant (page_map) | page_map, plain-language framing |
| selective licence in a company name | variant (page_map) | page_map, deliberate England cross-reference (see §5) |
| landlord registration limited company | questions_corpus | questions_corpus (landlord limited company seed, misc bucket) |
| landlord registration scotland limited company | questions_corpus | questions_corpus, same bucket |
| landlord registration scotland renewal online | our-data | demand_corpus, 20/mo, seed:transfer property to limited company, bucket form-now |
| apply for landlord registration scotland | our-data | demand_corpus, 10/mo, same seed/bucket |
| landlord registration renewal scotland | our-data | demand_corpus, 10/mo, same seed/bucket |
| landlord registration gov uk | our-data | demand_corpus, 10/mo, same seed/bucket |

**Corpus check note (2026-09-02).** A full sweep of `questions_corpus.csv`, `demand_corpus.csv` and `our_queries.csv` for Scotland, Wales, Rent Smart and licensing terms surfaced no further company-landlord registration phrasings beyond those tabled above. What the sweep did surface is a large volume of adjacent Scottish demand that this page must not chase: Scottish tax queries (`income tax rates scotland` 4400/mo, `land and buildings transaction tax scotland calculator` 4400/mo, `capital gains tax scotland calculator` 210/mo), Scottish buy-to-let generalities (`buy to let scotland` 140/mo), and the Scottish-versus-English SPV entity queries covered by MUST-NOT 5. The thinness recorded below is real and confirmed, not an artefact of an incomplete variant list.

**Genuinely thin, genuinely unhosted.** No page in the estate currently addresses a devolved landlord-registration regime as it applies to a corporate (company) landlord specifically. Volume is low across the board (page_map records no measured volume; demand_corpus tops out at 20/mo) but every existing licensing page in the estate assumes an individual landlord, so this is a coverage gap, not a ranking-recovery play.

## 3. Our-data baseline

No existing page targets any of the above queries. The nearest content is `landlord-licensing-explained` (live), which is explicitly England-only under the Housing Act 2004 and already flags, in one FAQ answer, that "Wales runs a separate national scheme (Rent Smart Wales)... and Scotland and Northern Ireland have their own registration and HMO regimes" — without explaining either. U32 is the page that answers what that one sentence gestures at, for a company landlord specifically.

## 4. Competitor coverage floor

- gov.wales / rentsmart.gov.wales — primary source for Rent Smart Wales registration and licensing requirements; verify current company-registration mechanics at write time (no lock exists in house_positions).
- mygov.scot / local-authority landlord registration pages (Scotland) — primary source for the national landlord registration scheme administered by local authorities; verify current company-registration mechanics at write time.
- No direct competitor URL identified in `competitor_urls.csv` for this specific corporate-landlord-registration angle; treat this as a genuine white-space build rather than a competitor-parity build.

## 5. Seam warnings — MUST-NOT rules

1. **U32 covers Scotland and Wales only, for a company landlord.** It does not re-explain the English licensing regimes (mandatory/additional HMO, selective licensing) that `landlord-licensing-explained` already owns in full. Where England needs a mention (because a portfolio landlord may hold property across nations), give it **one line and a link**, never a re-explanation.
2. **Never re-explain the individual-landlord licensing content that already exists.** The existing `landlord-licensing-explained` page and its companion `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` page own the general mechanics (definitions, fees, penalties, designations) for individual landlords. U32's job is narrower and sharper: **who registers when the landlord is a company** — the director, the company, or both — and what changes about the devolved regimes when the applicant is a corporate entity rather than a person. That is the genuinely unhosted question (page_map: "every existing licensing page assumes an individual landlord. The devolved registers treat a corporate owner differently").
3. Do not build out Scottish HMO licensing (a separate regime under the Civic Government (Scotland) Act 1982 / Housing (Scotland) Act 2006, per `house_positions.md` §26 do-not-write list) as a full topic. One sentence distinguishing landlord *registration* (the national scheme, what this page is about) from HMO *licensing* (a further, separate requirement for shared housing) is enough, with a link out if a dedicated Scottish HMO page exists or is planned; do not attempt the licensing depth here.
4. Do not build a fee comparison table across councils the way `landlord-licensing-explained` does for England's mandatory/additional/selective licences. **This bans the per-council England-style table, not the national figures.** Both devolved schemes set fees nationally, and those national figures are now verified at source in §6 (Scotland £85 principal plus £20 per property, £170 late; Wales £60 registration and £254 licence, with renewal rates), so they may be stated as fact with the source named. What must still not be asserted is that a company pays on the same basis as an individual: that parity is unverified in Scotland and should not be claimed.

5. **Do not answer "is a Scottish SPV different from an English SPV".** The corpus carries several live Bing queries on exactly that (`differences between an england spv and scottish spv`, `differences between an england spv and scottish spv regarding property ownership`, `does it have to be a scottish spv regarding owning an asset or property`), all of which already resolve to `types-of-property-company-structure-uk-guide` and `spv-property-investment-special-purpose-vehicle-guide`. Those are **company-law and entity-choice questions, not landlord-registration questions**, and they belong to those pages. The word "Scotland" appearing in both places is the trap. U32 is about a compliance register that a company landlord must appear on; it is not about where or how to incorporate, and it must not drift into comparing Scottish and English company vehicles.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md` where locked, else verify-at-write)

- **No dedicated house_positions lock exists for Scottish landlord registration or Rent Smart Wales mechanics.** The only relevant line in `house_positions.md` is at §26's do-not-write list: "'HMO licensing is England-only' (Scotland + Wales + NI have parallel but distinct regimes — Welsh Rent Smart Wales is the equivalent; Scottish HMO licensing under Civic Government (Scotland) Act 1982 / Housing (Scotland) Act 2006)." This confirms the regimes exist and are distinct, but supplies no operative registration mechanics for a corporate applicant. **The load-bearing operative facts were therefore verified at source on 2026-09-02 and are marked VERIFIED below with their source. Items that could not be confirmed at source are marked NOT VERIFIED and must not be asserted; statutory section numbers were not verified and must not be guessed.**

### Scotland (VERIFIED 2026-09-02)

- **Registration is compulsory before letting, and unregistered letting is a criminal offence carrying a fine of up to £50,000.** Source: mygov.scot, "Registering as a private landlord". This is the sharpest compliance fact available to the page and belongs high in the Scotland section.
- **Registration lasts 3 years and must then be renewed.** Source: mygov.scot. Confirms the demand_corpus renewal queries are answering a real 3-yearly cycle.
- **Every joint owner must register**, not just one of them. Source: mygov.scot.
- **Fees: £85 principal fee, plus £20 per property let.** Applying online to more than one local authority attracts a **50% discount on the principal fee per authority (£42.50 each)**. **Late applications cost £170.** Where a property is jointly owned, **only the lead owner pays the principal fee; the other owners apply free of charge.** No fee applies to HMO properties or to Scottish-registered charities. Source: landlordregistrationscotland.gov.uk, "Charges for landlord registration". **These are national fees set for the scheme, not per-council fees, so quoting them does not breach MUST-NOT 4** (which bans an England-style per-council comparison table, not the national figures).
- **Exemptions listed by mygov.scot:** resident landlord, letting to family members, holiday lets (which may instead need a short-term let licence), religious-organisation-managed property, agricultural and crofting tenancies, and Care-Inspectorate-regulated services.
- **NOT VERIFIED — who registers when the owner is a company.** Neither mygov.scot nor the Scottish Landlord Register's application and "information you will need" pages publish how a body corporate applies, whether the company is the registered landlord, or whether a director must also be named and assessed. **This is the page's core question and it is the one fact that could not be established at source.** Do not infer it from the Welsh position, which is published and differs in structure. The writer must confirm it directly with the register operator or a local authority before drafting the Scotland side of the "does the director register, or the company?" H2, and must not fill the gap with a plausible-sounding assumption. If it cannot be confirmed, say what is known (registration is mandatory, joint owners each register) and be explicit that the corporate applicant route should be confirmed with the relevant council, rather than asserting an answer.

### Wales (VERIFIED 2026-09-02)

- **Registration and licensing are two separate requirements, and the split is the answer to the page's core question.** The immediate landlord must complete the **registration** and must do so themselves. A landlord who is not personally involved in letting and management activities registers but must appoint a **licensed agent**; a landlord who personally carries out letting and management must hold a **licence** as well as being registered. Source: rentsmart.gov.wales, "Landlord Registration" and "Landlord and Agent Licensing".
- **When the landlord is a company, the company is what gets registered.** Rent Smart Wales states that where a company, charity or trust is the landlord, it is the organisation's details that are registered, not those of the individual completing the paperwork, and the entity's **Companies House company number** is required on the application. Source: rentsmart.gov.wales, "Landlord Registration". **This is the single most valuable verified fact in the brief: it answers "who registers when the owner is a company" for Wales, on the record.**
- **Licence applications also capture the Companies House company number and registered office**, indicating corporate applicants apply directly rather than through a personally-held licence. Source: rentsmart.gov.wales, "Landlord and Agent Licensing". **Partially verified only:** the guidance does not state explicitly whether a named individual must be designated on a corporate licence or must complete the training personally. Treat the "who completes the training" detail as NOT VERIFIED and confirm before asserting it.
- **Fees: landlord registration £60 online, £102 paper. Renewal £48 online, £87 paper**, the renewal rate applying only where the application is made within 84 days before expiry. **Landlord licence £254 online, reduced to £230 for early renewal 42 or more days before expiry.** Agent licence fees are graduated by portfolio size with discounts for members of UKALA, ARLA, RICS and Safeagent. Source: rentsmart.gov.wales fee pages and Fee Policy.
- **Registration and licences each last 5 years**, renewable from 84 days before expiry with the anniversary date protected. Source: rentsmart.gov.wales. **The 5-year Welsh cycle against the 3-year Scottish cycle is a clean, genuinely useful contrast for the comparison table in outline item 4.**
- **NOT VERIFIED, but high-value if confirmed — incorporation may trigger a fresh registration and fee.** Secondary Rent Smart Wales material indicates that where property ownership changes from one entity to another, for example from an individual to a body corporate, a **new registration and a new fee** are required. This was not confirmable on the primary registration, licensing or FAQ pages when checked on 2026-09-02. **If the writer can confirm it with Rent Smart Wales, it is directly on-topic for this programme** (a landlord incorporating a Welsh portfolio does not carry the existing personal registration across), and it is the natural answer to the planned FAQ "do i need a new registration if i transfer property into a company". If it cannot be confirmed, frame that FAQ as a question to put to Rent Smart Wales rather than asserting the answer.
- **Do not cross-apply English provisions.** The s.68(6) Housing Act 2004 point on `landlord-licensing-explained` is England-only and governs neither Wales nor Scotland.
- **Renters (Scotland) Act and Housing (Wales) Act context:** if the writer needs current statutory anchors for either nation's registration regime, verify against legislation.gov.uk at write time; no lock exists to cite from house_positions.
- **England cross-reference (one line only):** England does not run a national landlord registration scheme; the equivalent compliance question in England is selective licensing, which is designation-based and covered in full by `landlord-licensing-explained`. State this once, as a pointer, not as content to build out here.

## 7. Interlink spec (verified against files on disk)

- `/spv-company` (U01 pillar, live route) — **mandatory up-link.**
- `landlord-licensing-explained` (live at `Property/web/content/blog/landlord-licensing-explained.md`) — **mandatory one-line pointer for the England selective-licensing angle**, and the natural "if your portfolio also includes English property" cross-link; never re-explain its content here.
- `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` (live) — optional, only if the writer needs to point to the deeper England mechanics from the same one-line England note above.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live) — light link if the "which entity registers" question needs a reminder of who the directors/PSCs of the company are.

## 8. Fresh outline

1. **Intro** — direct answer up top: England has no national landlord registration scheme, but Scotland and Wales do, and both treat a company-owned property differently from a personally-owned one. State scope in one sentence (Scotland and Wales, company landlords, registration not licensing), no templated second paragraph.
2. **H2 — Scotland: landlord registration for a company-owned property** — the national registration scheme administered by local authorities; who registers (company, named individual, or both) per verify-at-write source; renewal cycle and online-renewal mechanics per the demand_corpus signal ("landlord registration scotland renewal online").
3. **H2 — Wales: Rent Smart Wales for a company-owned property** — registration vs licensing as two separate Rent Smart Wales requirements; who registers and who (if different) holds the licence for a corporate landlord, per verify-at-write source.
4. **H2 — Does the director register, or the company?** — direct answer to the page_map plain-language variant, drawing together the Scotland and Wales answers side by side (a short comparison table is appropriate here, not a fee table).
5. **H2 — What about HMOs and selective licensing?** — one short section: HMO licensing (Scotland) and any additional Rent Smart Wales licensing layer are separate from the base registration and out of scope for this page; one line on England's selective licensing with the mandatory link to `landlord-licensing-explained`.
6. **H2 — Registering a portfolio held across nations** — practical note for a landlord with property in England, Scotland and/or Wales through one or more companies: each nation's regime is a separate compliance exercise, none recognises another's registration (echoing the existing site's own framing on `landlord-licensing-explained` for the England/Wales/Scotland/NI split, restated here for the company-specific angle rather than copied).
7. **FAQ (5 questions minimum, aim toward the wave's 10-14 where the corpus supports it; this unit's corpus is thin so do not pad with restatements)** — built from §2's tagged variants: "do i need to register as a landlord in scotland if i own through a limited company," "does rent smart wales apply to a limited company," "who is the registered landlord if my company owns the property," "do i need a new registration if i transfer property into a company," "is scottish landlord registration the same as an hmo licence," "does my english selective licence cover a scottish or welsh property" (answer: no, separate regimes), "how often do i renew my scottish landlord registration."
