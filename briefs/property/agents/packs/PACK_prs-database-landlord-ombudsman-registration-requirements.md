# PACK prs-database-landlord-ombudsman-registration-requirements (page 5, agents1 cluster)

Full-overhaul extend pack, assembled 2026-08-21 from `briefs/property/agents/DOSSIER.md` (FROZEN
2026-08-21), `briefs/property/agents/_language_spec.md`, `briefs/property/agents/ledger.csv` and
`docs/property/house_positions.md` as patched 2026-08-21. Follows `docs/_engines/REWRITE_PROGRAM.md`
§9.5, 8 sections in reading order. Format copied from
`briefs/property/rural-estates/packs/PACK_how-to-avoid-inheritance-tax-on-a-farm.md`.

**The pack is the whole world.** Everything the writer needs is here or in the four files named
above, plus the write-time verifications this pack explicitly requires (§5c).

**This is the cluster's second A-grade page.** It carries the only measurable non-head keyword family
we can realistically own (DOSSIER.md §7 row 5). Treat it accordingly.

## 1. Target and permission level

- **Page:** `Property/web/content/blog/prs-database-landlord-ombudsman-registration-requirements.md`
- **Slug:** `prs-database-landlord-ombudsman-registration-requirements` (fixed, do not vary)
- **URL:** `/blog/landlord-tax-essentials/prs-database-landlord-ombudsman-registration-requirements`
- **Category:** `Landlord Tax Essentials` (unchanged; the frontmatter `category` string stays exactly
  as it is today)
- **Grade:** REFRAME
- **No middleware change.** The slug already exists and already resolves. Do not touch
  `Property/web/src/middleware.ts` for this page.
- **What REFRAME means here, in prose:** this is a **full overhaul**, not a light de-stale. A
  "rewrite" in this programme is never a de-stale pass. The page is rebuilt from the H1 down into the
  letting-agent register, its spine changes (see below), roughly half its factual assertions need
  correcting or verifying, and its entire worked example is deleted. Title, H1, meta, headings, FAQ
  set and body all change. The REFRAME grade token exists so the equity gate does not apply its
  byte-identical metaTitle / H1 / H2-subsequence check to a page that is deliberately being rebuilt.
- **The new spine, stated up front because it is the biggest structural change.** Today the page is a
  landlord-facing mechanics guide to two registers. After the overhaul, its spine is the
  **DO-NOT-CONFLATE distinction**: the agency's **own** redress duty, which has existed since **1
  October 2014**, versus the **new landlord** redress duty under the Renters' Rights Act 2025, which
  has no scheme regulations at all and is expected in 2028 as an expectation only. That distinction
  is the thing landlords get wrong on the phone, which makes it the thing an agent needs. It is not a
  section of the page. It is the page's organising idea, and the database sits inside the same
  "what is actually live" frame.
- **Register flip:** the page today addresses the **landlord** as "you" (in fact it barely uses "you"
  at all). After this overhaul, **"you" is the letting or estate agent** and the landlord is "your
  landlord client" or "the landlord you act for" (`_language_spec.md` §3 and hard rule 3). The page
  must remain forwardable to a landlord, which is what the scenario device is for.
- **Conditional grammar is mandatory throughout.** Nothing substantive in either chapter is a live
  duty. Every not-yet-commenced obligation is written "when the database opens, your landlords will
  need to register", never "landlords must register" (`_language_spec.md` hard rule 6, taken from W5,
  which holds p1 on the highest-signal query in the cluster). Any indicative year is labelled
  indicative in the same sentence.
- **Fixed constraints:** the slug above; the category above; **zero em-dashes**; UK English; **no
  pricing**; **no service claim**; **no named worked-example persona**; **no fee figure of any kind
  for the database** (do-not-write, see §5c); no shared CTA template with the rest of this batch and
  never the phrase "We can produce a written {noun} for/on your {noun}".

## 2. Equity register

**ZERO. Trivially satisfied.**

Measured 2026-08-21 across a 90-day window (GSC API pull, data through 2026-08-19;
`_gsc_family_queries.json`) and Bing `GetPageQueryStats` per URL (`_bing_page_queries.json`):

| Engine | Rows for this URL | Impressions | Clicks |
|---|---:|---:|---:|
| Google Search Console (90d) | **0** | 0 | 0 |
| Bing Webmaster (per-page) | **0** | 0 | 0 |

There is no ranking, no impression and no click to protect. The monitored-pages window closed
**2026-08-20**, so the one-change-per-window rule (DOSSIER.md §3) does not block the edit.

**Consequence for the outline, stated because it inverts the normal method.** In a standard rewrite
the page's own GSC + Bing query set drives the new outline and the dominant query owns the H1. Here
**the measured query set is empty on both engines**. There is nothing to derive an outline from. The
outline is therefore driven by (a) the keywords assigned in DOSSIER.md §7 row 5 and §9, and (b) the
register prescription in `_language_spec.md` §3, "Explainer 6" row. That substitution is deliberate
and is recorded here so nobody later reads the pack as having skipped the query step.

**Protected pre-existing correct copy** is handled **additively** where it is kept (§5b). Every
correction is recorded in the coverage note (§5c).

**Not measured, and therefore not assumed:** `_language_spec.md` §1's tracked "OURS" rows cover four
RRA pages and **this page is not one of them**. Do not attribute the 15.2 citations per 1,000 or the
26.8 Flesch from the measured table to this page; those belong to the frozen sibling. Measure the
overhauled draft against the Explainer 6 targets in §7.

## 3. The market's keyword set

Source: `briefs/property/agents/ledger.csv` (2026-08-21). Volumes are Google Ads `search_volume`
(DataForSEO, UK, pulled 2026-08-21). Positions are DuckDuckGo, not Google (DOSSIER.md §11).

| keyword | vol/mo | best peer pos | peer domain | in our copy |
|---|---:|---:|---|---|
| private rented sector database | 1000 | n/a | n/a | yes, primary |
| landlord ombudsman | 480 | n/a | n/a | yes |
| landlord database | 320 | n/a | n/a | yes |
| landlord redress scheme | 140 | n/a | n/a | yes |
| prs database registration | 70 | n/a | n/a | yes |
| property redress scheme | 27100 | 4 | mydeposits.co.uk | **no, DECLINED** |

**All five assigned terms are at or above the 50/mo gate**, so all five must be placed in copy or
named in the coverage note. Place them: `private rented sector database` in the metaTitle and H1
region and repeatedly in body; `landlord ombudsman` in a question H2 or FAQ (it is the phrase
landlords actually use, even though the Act does not create a single ombudsman); `landlord database`
as the plain-English variant in body; `landlord redress scheme` in the redress half; `prs database
registration` in an FAQ question phrased as typed.

**DECLINED, coverage note required: `property redress scheme` (27,100/mo, best tracked peer p4,
mydeposits.co.uk).** ALREADY-COVERED by the sibling page
`renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords`, which is **FROZEN**
(monitored window armed to **2026-08-22**), is **Bing-visible on that exact head at positions 4 to
10** (28 impressions, 9 rows), and is the only page in the RRA family other than the section-13 page
with any Bing presence at all. DOSSIER.md §9 is explicit: "Page 5 must not chase it; links it."

**Practical rule for the writer:** the phrase "property redress scheme" must not appear in this
page's metaTitle, H1, any H2, or any FAQ question. Where the concept is unavoidable in body prose,
write "approved redress scheme" or "the landlord redress regime" and **link the sibling**
(`/blog/landlord-tax-essentials/renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords`).
Record the decline, the sibling, its Bing position band and its armed-to date in the coverage note.

**Belongs-to-sibling, do not rebuild.** The frozen sibling owns these heading themes. This page may
reference them in a sentence and link, and must not re-derive any of them:

| Sibling heading theme | Ruling |
|---|---|
| The plural-scheme architecture (why there is no single statutory ombudsman on the face of the Act) | belongs-to-sibling. One sentence here, then link. |
| The £25,000 compensation figure and why it is policy commentary, not statute | belongs-to-sibling. **Best handled by omitting it here entirely.** |
| Scheme rules and anticipated scheme architecture | belongs-to-sibling. |
| Comparison with other statutory redress frameworks (Housing Ombudsman, First-Tier Tribunal, County Court, Local Authority complaints) | belongs-to-sibling. Do not import. |
| A worked scheme complaint about disrepair | belongs-to-sibling. Do not import, and no worked personas here anyway. |
| Schemes and the landlord sales / acquisition cycle | belongs-to-sibling. |
| Two penalty tiers, in depth | belongs-to-sibling for the redress side. This page states the £7,000 / £40,000 shape once, in the agent register, and links. |

The one theme the sibling touches that this page **takes over and expands**, because the sibling
treats it as a subsection and this page makes it the spine: **the pre-existing letting-agent redress
regime versus the new landlord regime.** The sibling has it as three H3s inside one H2. Here it is
the organising idea of the whole page, written for the agent rather than about the agent. That is a
differentiation, not a duplication, and the coverage note must say so in those terms.

## 4. Competitor teardown extracts

Per DOSSIER.md §4, the "Landlord database + redress enrolment" row records the current holders as
mydeposits, LandlordsGuild, Law Society Gazette and councils. **No teardown file exists for any of
them** (the six SERPs behind `_language_spec.md` were pulled for RRA and MEES queries, not database
queries). Their heading structures are **not inventoried and must not be invented.** The only peer
datum available is the ledger row: mydeposits.co.uk at p4 on `property redress scheme`, which is the
term this page declines.

What transfers is the **register model** measured in `_language_spec.md` §2. Four patterns are
mandatory here, and one of them is quoted at length because it is the single most important
structural instruction in this pack.

- **P4, and this is the one. Commencement is presented as a two-state split, in force versus not,
  with the not-yet in conditional grammar.** W5 (tenancypilot.co.uk) holds **p1 on "commencement
  dates"**, the highest-signal topic in the cluster, and its structure is: H2 "Already in force: the
  1 May 2026 reforms", then H2 "Coming next: phased provisions (not yet in force)". It states the
  rule explicitly: *"Because each of these depends on secondary legislation, the safest stance is
  conditional: 'when the database opens, you will need to register,' not 'you must register now.'"*
  And it explains the distinction most pages never explain: *"Royal Assent makes the text part of the
  statute book; commencement makes a given section operative. Until a section is commenced, it is
  dormant, it imposes no duties and grants no rights. This is exactly why you can correctly say the
  database provisions are 'in the Act' while also saying they are 'not in force yet.' Both statements
  are true at once."* And on its own table: *"Treat phased items as indicative: the Government has
  committed to them, but the exact go-live dates are confirmed only by later regulations."*
  `_language_spec.md` P4 records that **we already hold the harder and better version of this fact**
  and lose on grammar. **Take W5's structure wholesale.**
- **P2, the labelled one-line answer.** W8's first H2 is literally "The one-line answer". None of our
  four tracked pages has one. This page opens with the answer: **nothing about either register is a
  live duty for a landlord today, and the redress duty your agency already has is a different regime
  entirely.**
- **P3, the agent is "you" and the landlord is the third party who asks**, with W8's scenario device:
  a landlord's question in quotation marks, then the answer, in the agent's voice.
- **P6, the safe default in one move**, including the anti-scam line, which W5 supplies verbatim:
  *"Do not assume any of these binds you before its commencement order is in force, and do not let a
  salesperson persuade you that a not-yet-live obligation is already mandatory."* `_language_spec.md`
  §3 calls the anti-scam line "a genuine reader service" for this page type. It is required here
  (§6 point 8).

**Do not copy, named (`_language_spec.md` §4):** W5's own datable phrasing ("they impose no duties on
you on 18 June 2026"), W8's countdown framing and unsourced quantification, W9's closing disclaimer
that hands the question back to the reader, W7's in-body vendor block, W3's unverified numbers, and
W11's habit of asserting unenacted policy as settled law. That last one is the failure mode this page
exists to avoid.

## 5. Ours, side by side: full inventory of the current page

Current file: 238 lines, ~3,000 body words, 14 FAQ entries, 2 tables, 2 service asides, 1 worked
example built entirely on invented fee figures, 0 mentions of the 2014 letting-agent regime, and
citation-style statute references throughout the body and in six of its headings.

### 5a. Current headings, in order

| # | Current heading | Level | Disposition |
|---|---|---|---|
| 1 | Status on 22 May 2026: Two Registers, Neither Yet Fully Operative | H2 | **CORRECT AND REFRAME.** The date-stamped heading is the clearest stale artefact on the page. Becomes W5's two-state split. See 5c items 1 to 4. |
| 2 | The Landlord Redress Scheme (PRS Ombudsman): What Section 64 Will Require | H2 | **KEEP the content, CUT the statute reference from the heading** (hard rule 8). Re-cut as a question. |
| 3 | Civil penalty and offence regime under sections 66 and 67 | H3 | **CUT the statute reference from the heading.** Compress the content; the sibling owns the depth. |
| 4 | The Private Rented Sector Database: What Chapter 3 Will Require | H2 | **KEEP, CUT the statute reference.** This is the primary-keyword section. |
| 5 | Landlord entry: what goes in | H3 | **KEEP, mark speculative.** See 5c item 8. |
| 6 | Dwelling entry: what goes in | H3 | **KEEP, mark speculative.** Genuinely useful to an agent, because it is the compliance pack the agency already holds. |
| 7 | Active vs inactive entries (section 79) | H3 | **CUT the statute reference.** Compress. |
| 8 | The unique identifier and the marketing restriction (sections 82 and 84) | H3 | **KEEP, CUT the statute reference.** This is the part agents are most affected by. See §6 point 5. |
| 9 | The possession bar at section 90 | H3 | **KEEP, CUT the statute reference, VERIFY.** See 5c item 10. |
| 10 | Access to the database (sections 86 and 87) | H3 | **CUT the statute reference, compress heavily, mark speculative.** |
| 11 | Civil penalty and offence regime under sections 91 and 92 | H3 | **CUT the statute reference.** Merge with heading 3 into one penalties block. |
| 12 | The Other Database: Why the PRS Database is Not the Rogue Landlord Database | H2 | **KEEP, VERIFY.** Good contrast, genuinely useful, but see 5c item 11. |
| 13 | Tax Treatment of Registration Fees, Ombudsman Subscription, and Civil Penalties | H2 | **KEEP.** This is the page's strongest and most defensible section. See 5b items 6 and 7. |
| 14 | Worked Example: 8-Property Portfolio Landlord, First-Year Compliance Cost Stack | H2 | **DELETE IN FULL.** Every figure in it is invented and one of them is an explicit do-not-write. See 5c item 5. |
| 15 | What to Do Now: Planning Moves for the Pre-Commencement Window | H2 | **KEEP the good half, CORRECT the rest.** See 5c items 4 and 12. |

Question-heading share today: **0 of 15**. Target is half or more (hard rule 7).
Statute references in headings today: **6 of 15**. Target is **zero** (hard rule 8).

### 5b. KEEP: factually still correct as at 2026-08-21, carry forward additively

1. **Neither register imposes a live registration duty on a landlord.** Correct, and it survives the
   2026-08-21 re-verification (house_positions §20.12, §26.5, §26.6): no commencement order for the
   database chapter, and **no landlord redress scheme instrument exists at all** (title search
   2026-08-21 returns nothing). Keep the substance; rewrite the grammar.
2. **Section 74 is in force from 1 May 2026 and is the only part of the redress chapter substantively
   commenced.** Correct (house_positions §26.5, §20.12). Keep, but see 5c item 9 on **what** Section
   74 actually does, which the page and its frozen sibling currently describe differently.
3. **The database chapter creates two entry types, landlord and dwelling, and marketing a dwelling
   without an active entry will be an offence once commenced.** Correct in substance
   (house_positions §26.6: the database duty covers landlords, dwellings and persons subject to
   banning orders or relevant convictions; there is a continuing duty to keep active entries up to
   date; marketing without an active entry is an offence, without invalidating tenancy contracts).
   **Add the "without invalidating tenancy contracts" point**, which the page currently omits and
   which is exactly the kind of thing a landlord panics about.
4. **Knowingly false information, and continued breach after a penalty notice, are criminal.**
   Correct (house_positions §26.6).
5. **Penalty shape: up to £7,000 for a breach and up to £40,000 where it is dealt with as an
   offence.** Correct (house_positions §26.5 for redress, §26.6 architecture for the database). See
   5c item 7 on how to write it without pinning section numbers.
6. **Scheme membership fees and database registration fees will be deductible against rental income
   as professional or regulatory expenses of the rental business, under ITTOIA 2005 s.272.** Correct
   (house_positions §26.7 and §20.11). This is the page's clearest differentiator: no tracked
   competitor touches tax treatment at all (`_language_spec.md` §2 P8). Keep it, keep the link to the
   HMO licensing fees deductibility guide, and keep the ITTOIA reference **in a foot reference line
   or the coverage note**, not in prose (hard rule 1).
7. **Financial penalties for regulatory breach are not deductible; professional fees defending a
   notice are deductible where they are revenue in character.** Correct in substance. Keep. Verify
   the HMRC manual reference at write time and keep the manual paragraph in the coverage note rather
   than in prose.
8. **The Housing Act 2004 civil penalty ceiling is £40,000 from 1 May 2026, uplifted from £30,000.**
   Correct (house_positions §26.9). Keep if it survives the compression; it is peripheral here.
9. **The three internal links in the opening block plus the Decent Homes, Section 21, HMO licensing,
   NRL, gas safety and portfolio-disposal links.** All live targets, all correct. Keep the ones that
   still earn their place after the page shortens; drop the rest rather than padding a related-links
   paragraph.
10. **The editorial frame that in-force-versus-scheduled is the page's primary discipline.** Correct
    instinct, wrong execution. Keep the instinct, take W5's execution.

### 5c. CORRECT: stale, wrong, invented or unverifiable as at 2026-08-21

**Both this page and the MTD page predate SI 2026/638 and the government roadmap.** Every item below
is a required correction and every one goes in the coverage note. Items 1 to 5 are the stale
commencement framing the brief asked to have flagged sentence by sentence.

1. **Every "as of 22 May 2026" stamp must go.** They appear in the `summary`, in H2 1, in the body
   paragraph under H2 1, in the status table's final column header, in the rogue-database comparison
   table's last row, in three FAQ answers and in the `editorialNote`. The page is dated to a specific
   week, which hard rule 11 forbids outright: dated statements name the date they are **true from**,
   never the date the page was written. Rewrite each as a from-date or as a conditional.

2. **"Government policy statements anticipate commencement before April 2027" is STALE and appears
   four times.** In FAQ 1 ("anticipate commencement before April 2027 but a specific date has not
   been set as of 22 May 2026"), FAQ 2 ("again anticipate commencement before April 2027"), FAQ 14
   ("anticipate commencement before April 2027 but no statutory instrument appointing the day has
   been made"), and in the body paragraph closing the status-table section ("anticipate full
   commencement of both registers before April 2027"). Also in H2 15's opening sentence
   ("anticipated before April 2027"). **The current position, per house_positions §20.12 and §26.6 as
   patched 2026-08-21:**
   - **Database:** the gov.uk roadmap of 13 November 2025 expects a **regional rollout for landlords
     and local councils from late 2026**. Cite as **expectation only**, in conditional grammar, and
     label the year indicative in the same sentence. There is **no SI**.
   - **Redress:** the roadmap expects mandatory membership **in 2028**. Expectation only. There is
     **no landlord redress scheme instrument of any kind**.
   These are two different expected dates for the two registers, and the current page treats them as
   one. That merger is itself a correction to record.
   **Note for the writer, recorded honestly:** house_positions §26.6's older "Practical writing rule"
   paragraph still carries the pre-patch phrase "expected before April 2027". The [08-21] precision
   bullet at the head of §26.6, and §20.12's updated practical writing rule, supersede it. Use the
   08-21 position. If this internal inconsistency is still present when the page is written, log it
   to `briefs/property/agents/notes/delta.md` (DOSSIER.md §12) rather than fixing house_positions
   from inside a content task.

3. **"The entire PRS Database chapter remains pending a further commencement order" understates the
   position and produces a wrong sentence.** house_positions §20.12 [08-21] is explicit: **the whole
   Act came into force "for the purposes of making regulations" at Royal Assent on 27 October 2025.**
   So the regulation-making powers in both chapters, **including the database fee power**, ARE in
   force; only the substantive duties are not. The instruction is verbatim: **never write "none of
   Part 2 is in force"; write "in force for regulation-making only; no regulations made".** The
   status table's "Pending" rows for the redress duty and for the database provisions are wrong on
   this axis and must be corrected. The database duty itself is marked **Prospective** on
   legislation.gov.uk.

4. **The page asserts, implicitly, that nothing has commenced since 1 May 2026. Something has.**
   **SI 2026/638, the Commencement No. 3 Regulations, in force 22 June 2026**, commences HHSRS
   enforcement plumbing: local housing authorities can impose civil penalties **up to £7,000 for
   category 1 hazards**, and penalty proceeds can fund enforcement involving superior landlords. It
   is **not** the Decent Homes Standard and must never be described as such (house_positions §20.12
   [08-21]). Also true and worth one clause: **no Commencement No. 4 exists as of 2026-08-21** (title
   search). An agent asked "has anything else come in?" needs both halves of that answer.

5. **DELETE the entire worked example and every fee figure in it.** house_positions §26.8 carries an
   explicit [08-21] do-not-write: **"Database registration costs £X" is false; no fee regulations
   have been made under the fee power, and any circulating figure is invented.** §26.6 goes further:
   "the £30-£50 numbers in commentary are invented" and **"no fee figure is citable"**. The page
   currently states: a landlord entry fee of £80; dwelling entry fees of £30 each; an Ombudsman
   annual subscription of £100; an agent set-up fee of £200; an accountancy fee of £180; a first-year
   total of £800; £320 of relief at 40%; a net cost of £480; a steady state of £520 gross and £312
   net; £39 per property net of tax; and, in H2 15, "£520 to £800 first-year, declining to £300 to
   £400 steady-state". **Every one of those figures comes off the page.** Do not replace them with a
   range, an estimate, an analogue from another scheme, or a hedge. The correct treatment is a
   sentence saying no fee has been set in law, that any figure circulating is invented, and that an
   agency should not quote one to a landlord. That sentence is more useful than the table it
   replaces, and it is the anti-scam line's natural home.

6. **The £25,000 compensation figure: cut it here.** The page currently writes "compensation up to a
   maximum to be set by regulation (anticipated at £25,000 on current policy)". That hedged form is
   the one house_positions §20.5 blesses, so it is **not wrong**. It is nonetheless **cut from this
   page** for two reasons: the frozen sibling owns that discussion (§3, belongs-to-sibling), and hard
   rule 10 says cut the figure count and put the survivors in the reader's verb. If the writer judges
   it unavoidable, the **only** permitted form is the hedged one, never "compensation is capped at
   £25,000", which is an explicit do-not-write (house_positions §26.8).

7. **Penalty section numbers are pinned more precisely than house_positions supports.** The page
   attributes the £7,000 civil penalty to Section 91 and the £40,000 offence to Section 92 on the
   database side, and Section 66 and Section 67 respectively on the redress side. house_positions
   §26.5 attributes **both** limbs to Section 66 for redress ("financial penalty up to £7,000 for
   breach of the regulations or up to £40,000 for offences"), and §26.6 names Section 92 for the
   criminal limb on the database side without naming a civil-penalty section. **Resolution: write the
   penalties without pinning section numbers at all.** "Up to £7,000 where the local housing
   authority deals with it as a breach, up to £40,000 where it is dealt with as an offence" is
   accurate, is in the reader's register, and removes the exposure. This also satisfies hard rule 1.
   If the writer wants the section attribution anyway, it must be verified against legislation.gov.uk
   at write time and recorded in the coverage note.

8. **Everything described as a database data field is speculative and must be labelled as such.**
   house_positions §26.6 states plainly that the fee structure, compliance timelines, **required
   information fields** and evidence requirements are **all to be set by regulations not yet made**.
   The page's landlord-entry list (7 items) and dwelling-entry list (12 items) are presented as "the
   expected dataset" in one line and then as fact for two full lists. Keep the lists, because they
   are genuinely useful (they are the compliance pack an agency already holds for every managed
   property), but label them **once, clearly, as a working expectation with no regulations behind
   them**, and keep the conditional grammar inside the lists too. The same treatment applies to the
   published-versus-restricted access discussion, the joint-landlord mechanics, the active-versus-
   inactive rules and the six-month post-tenancy membership guess, all of which are currently written
   with more confidence than the source supports.

9. **Our two pages describe Section 74 differently, and one of them is wrong.** This page says
   Section 74 "extends the existing Local Government and Social Care Ombudsman jurisdiction to
   investigate complaints made by persons who are not tenants". The frozen sibling's FAQ says Section
   74 is "interpretation and consequential provisions". house_positions does not resolve it: §26.5
   and §20.12 record only that Section 74 is in force from 1 May 2026. **Verify against
   legislation.gov.uk at write time.** Write whichever the statute supports, and record the finding
   in the coverage note. If it cannot be verified, say only that Section 74 is the one provision of
   the redress chapter substantively in force and do not characterise its content. **Do not edit the
   sibling**, whatever the answer: it is frozen to 2026-08-22 and DOSSIER.md §3's blanket rule holds.
   If the sibling turns out to be the wrong one, that is a delta note, not an edit.

10. **The possession-bar section needs verification.** house_positions carries no lock on the
    possession bar, on the anti-social-behaviour ground carve-outs, or on the claim that "the
    validity of the notice goes to the registration status at the date of service". That last
    sentence is a strong, actionable legal proposition with no source behind it. **Verify at write
    time or decline it.** The bar itself is worth keeping if verified, because it is the sharpest
    "why this matters" line available for the database; the date-of-service refinement should come
    out unless it can be sourced.

11. **The rogue-landlord database contrast needs verification.** The page asserts the Housing and
    Planning Act 2016 database "has existed since 2018 and continues to operate in parallel", with
    mandatory and discretionary inclusion routes and restricted access. house_positions does not lock
    any of this, and the Renters' Rights Act touches the surrounding regime. **Verify that the 2016
    database is still operative and still restricted-access at write time.** If it is, keep the
    contrast, because it answers a real landlord question ("am I going on a rogue landlord list?").
    If it cannot be verified, cut the section rather than hedging it.

12. **The "what to do now" list is written for a landlord and must be rewritten for an agent.** The
    substance is good and mostly survives: consolidate the per-property compliance evidence pack; find
    and fix the gaps before there is anything to register; keep a portfolio-level register; agree in
    the management agreement who will do the registering. Rewrite each as something **the agency**
    does across its managed book, not something a landlord does alone. **Cut** the budget-for-the-fees
    item entirely, since there is no fee to budget for (item 5).

13. **Both service asides must be removed in full.** Current lines 103 to 106 ("Book a portfolio-level
    review with one of our property-tax specialists") and 219 to 222 ("Talk to one of our specialists
    about portfolio-level set-up planning"). `_language_spec.md` hard rule 14 forbids in-body service
    offers, W7 is on the do-not-copy list for exactly this, and DOSSIER.md §1 rules out any service
    tier or claim on this surface. Cut both; do not soften them.

14. **Citation grammar, throughout body and headings.** Convert every `s.74`, `ss.64 to 65`,
    `ss.75 to 76`, `ss.77 to 80`, `ss.82 + 84`, `s.90`, `ss.91 to 92`, `s.28`, `s.29`, `s.30`,
    `s.76`, `s.89`, `Ch.3 Pt.2` and `HP Act 2016 s.28` into written-out notice-names ("Section 74",
    "the Renters' Rights Act 2025", "the Housing and Planning Act 2016") **or remove the reference
    entirely** where the sentence works without it, which is most of the time. Move
    `SI 2026/421 reg.3`, `SI 2026/319 reg.2`, `ITTOIA 2005 s.272`, `PIM2080`, `PIM2090` and
    `BIM38500` to a **single reference line at the foot of the page** or to the coverage note. **Six
    headings currently carry statute references and all six must lose them** (hard rule 8). Target
    for this page type: **zero citation-style references per 1,000 words**, with notice-names at 10
    to 15 per 1,000.

15. **The status table survives, but as the page's only table** (hard rule 13). The page currently
    has two: the 8-row commencement status table and the 6-row rogue-database contrast. Keep the
    commencement table, recast as W5's indicative-milestones table with the "treat phased items as
    indicative" caveat stated in the same block. The rogue-database contrast becomes prose (and only
    if item 11 verifies).

16. **14 FAQ entries; target is 5 or 6** (hard rule 15), each a near-verbatim query as typed.
    Candidates in priority order: "is the landlord database live yet", "how much does landlord
    database registration cost" (answered with: no fee exists in law, do not believe anyone quoting
    one), "do letting agents need to be in a redress scheme" (the 2014 answer, which is yes and has
    been since 2014), "what is the difference between the landlord ombudsman and the property redress
    scheme my agency is in", and "prs database registration" phrased as typed. The rest go.

17. **`metaTitle`, `metaDescription`, `title`, `h1`, `summary`, `editorialNote` all change.** The
    current summary is a 200-word paragraph that names the deleted cost stack and the deleted worked
    example. `dateModified` and `reviewedAt` move to the deploy date. `reviewerCredentials` currently
    reads "Reviewed against legislation.gov.uk and HMRC guidance", which is thin for an A-grade page;
    bring it up to the standard of the sibling pages in the folder.

## 6. Whitespace / content mandate

Every point below is required; QA fails the page if one is missing or compressed to a throwaway line.

1. **The labelled one-line answer, first.** Two sentences maximum before it. The answer: **neither
   register is a live duty for a landlord today, nobody can register on anything, no fee exists in
   law, and the redress scheme your agency is already in is a completely different regime from the
   one landlords will eventually have to join.** Then the W8 move: that is the short version, here is
   why the detail matters.

2. **The two-state split, W5's structure taken wholesale.** Two headings, in force versus not yet in
   force, with the conditional-grammar rule stated on the page in the writer's own words. What is
   actually in force: Section 74 of the redress chapter, from 1 May 2026 (characterised only as far
   as verification supports, per §5c item 9); the regulation-making powers across both chapters,
   since Royal Assent on 27 October 2025, with **no regulations made** under either; and, in the
   wider Act, the 22 June 2026 tranche that lets local housing authorities impose civil penalties up
   to £7,000 for category 1 hazards, which is HHSRS enforcement plumbing and **not** the Decent Homes
   Standard. What is not in force: the database duty, marked Prospective; the landlord redress
   membership duty; every fee, field, timeline and mechanic that regulations would have to set.

3. **The DO-NOT-CONFLATE spine, as the page's largest section and its reason for existing.** Written
   for the agent, not about the agent:
   - **The agency's own duty, which is old news.** Letting and managing agents have had to belong to
     an approved redress scheme since **1 October 2014**. Three approved schemes have operated:
     The Property Ombudsman, the Property Redress Scheme, and Property Redress (formerly Ombudsman
     Services: Property, which exited in 2018). Nothing in the Renters' Rights Act changed that duty.
     The instrument behind it goes in the foot reference line, never in prose.
   - **The landlord's duty, which does not exist yet.** A separate regime, created by the Renters'
     Rights Act 2025, for **landlords**, **additional to** the agent regime, with **no scheme
     regulations made at all** and mandatory membership expected in 2028 as an expectation only.
   - **The explicit do-not-write, quoted from house_positions §26.8:** "Letting agents joined the
     redress scheme regime under RRA 2025" is **false**. The agent duty is from 2014 and the Act's
     regime is for landlords.
   - **The other do-not-write, same source:** "There is a single statutory ombudsman for landlords" is
     **false on the face of the Act**, which permits one or more approved schemes. Write "approved
     redress scheme regime". One sentence, then link the frozen sibling, which owns the depth.
   - **Why an agent needs this.** The landlord on the phone has read a headline about a landlord
     ombudsman, knows their agency is in a redress scheme, and concludes they are covered. They are
     not, and there is nothing to join yet. Both halves of that answer are counter-intuitive, which
     is why the call keeps happening. Give the agent the sentence to say.

4. **The database, in the agent register.** What it will be (a register of landlords, of dwellings,
   and of people subject to banning orders or convictions for relevant offences); the continuing duty
   to keep an active entry up to date; the two entry types; and the fields the agency already holds
   for every managed property, labelled as a working expectation with no regulations behind them
   (§5c item 8). Primary keyword lives here.

5. **The marketing restriction, and why it lands on the agency rather than the landlord.** Once
   commenced, marketing a dwelling without an active entry will be an offence, **without invalidating
   the tenancy contract itself**. The practical consequence for an agency is that its own listing
   workflow, on the portals and in the window, becomes the compliance surface for somebody else's
   registration duty. Write that plainly and conditionally. It is the single most agent-relevant fact
   on the page and the current version buries it in an H3 among nine.

6. **No fee figure, and the reason, stated as a service to the reader.** No fee regulations exist. No
   figure circulating in commentary has any legal basis. An agency that quotes one to a landlord is
   passing on somebody's invention. This is a full short section, not a caveat, and it replaces the
   deleted worked example.

7. **Penalties, once, in the shape landlords ask about**: up to £7,000 where the local housing
   authority deals with it as a breach, up to £40,000 where it is dealt with as an offence, once the
   duties are commenced. Conditional grammar. No section pinning (§5c item 7). Then link the sibling
   for the redress-side depth.

8. **The anti-scam line, required.** `_language_spec.md` §3 names it as a genuine reader service for
   this page type, and W5 supplies the model: do not let anyone persuade a landlord that a not-yet-
   live obligation is already mandatory, and do not let anyone charge them to register for something
   that does not exist yet. Pair it with point 6.

9. **The tax hook, kept and given its own section.** Scheme membership and database registration fees
   **will be** deductible against rental income as regulatory or professional expenses of the rental
   business when they arrive (conditional, because they have not arrived). Regulatory penalties are
   not deductible. Professional fees defending a notice are deductible where revenue in character.
   No tracked competitor covers tax treatment at all, so this is free differentiation. Keep the
   statutory and manual references out of prose and in the foot line or the coverage note.

10. **The required "what has not changed" block** (hard rule 5), named item by item. Candidates:
    the agency's own redress membership; deposit protection; gas safety, EICR and EPC duties; Right
    to Rent; HMO and selective licensing; and the fact that no landlord can register for anything
    today. Most of the questions an agent gets are about things that did not change, which is what
    makes this block the highest-value device on the page.

11. **The scenario device, at least three times** (hard rule 9): *"Do I need to register on the
    landlord database?"*, *"You're in a redress scheme, doesn't that cover me?"*, *"Someone rang me
    offering to do my landlord registration for me, should I?"*.

12. **The close names a job the reader was already doing** (`_language_spec.md` §2 P7). For an agency
    that job is the per-property compliance file it already keeps for every managed let. The close is
    what to tidy in it now so that registration, whenever it opens, is a data transfer rather than a
    project. No service, no form, no offer, no disclaimer. This close must differ from the other two
    packs in the batch.

**Do-not-write, quoted from house_positions §26.8 and §20.13.** Every one of these is a QA fail:
- "Landlords must register on the PRS Database from 1 May 2026" (and any variant asserting a live
  registration duty).
- "Database registration costs £X."
- "There is a single statutory ombudsman for landlords."
- "Compensation under the new landlord ombudsman is capped at £25,000."
- "Letting agents joined the redress scheme regime under RRA 2025."
- "The Renters' Rights Act 2026" (the Act is the Renters' Rights Act 2025; 2026 is commencement
  context only).
- "The Decent Homes Standard for PRS is in force" (only preliminary provisions; the substantive
  standard awaits a further order, with 2035 or 2037 proposed).
- "None of Part 2 is in force" (write "in force for regulation-making only; no regulations made").

## 7. Acceptance criteria

1. **Writer model: Opus.** Batch size 1.

2. **The pack is the whole world**, plus the write-time verifications §5c requires (items 7, 9, 10,
   11, and the HMRC manual reference in 5b item 7).

3. **Register targets, quoted from `_language_spec.md` §3, "Explainer 6: landlord database + redress
   enrolment" row, measured on body prose only:**

   | Metric | Target |
   |---|---|
   | Register | Agent-as-you |
   | Second person "you" per 1,000 words | **15 or above** |
   | Citation-style references per 1,000 words | **0** |
   | Notice-name references per 1,000 words | **10 to 15** |
   | Flesch reading ease | **45 or above** |
   | Mean sentence length | **18 words or below** (hard rule 2) |
   | Words | **1,400 to 2,000** |
   | Question headings | **half or more of H2s** (hard rule 7) |
   | Tables | **1 maximum** (hard rule 13), the commencement table |
   | FAQ | **5 or 6 questions**, each a near-verbatim query (hard rule 15) |

   "You" is the **agent**. The landlord is "your landlord client", "the landlord you act for" or "the
   landlord". Note that the page will shrink from roughly 3,000 words to 1,400 to 2,000; that is
   correct, and word count is not a lever in this cluster (hard rule 16).

4. **Citation grammar.** Zero citation-style references in prose, zero in headings (hard rule 8).
   Instruments identified, if at all, in **one reference line at the foot**. The absolute ceiling for
   the batch is one citation-style reference per 1,000 words; this page's target is zero.

5. **Conditional grammar throughout for everything not commenced**, with every indicative year
   labelled indicative in the same sentence (hard rule 6). Nothing datable to a week (hard rule 11).

6. **All five assigned keywords placed**, all of them at or above the 50/mo gate: `private rented
   sector database`, `landlord ombudsman`, `landlord database`, `landlord redress scheme`,
   `prs database registration`.

7. **`property redress scheme` (27,100/mo) DECLINED**, absent from metaTitle, H1, every H2 and every
   FAQ question, with the frozen sibling linked and the decline recorded in the coverage note. The
   belongs-to-sibling themes in §3 are not rebuilt.

8. **Every figure matches house_positions as patched 2026-08-21, or is declined.** In particular:
   **no database fee figure anywhere**, in any form, including ranges, estimates and analogues. The
   only pound figures that may survive are £7,000, £40,000, and the Housing Act 2004 £40,000 ceiling
   if it earns its place. Winner median is one pound figure per page; the current page has 18.

9. **All twelve §6 content points present**, including the DO-NOT-CONFLATE spine as the largest
   section, the no-fee section, the anti-scam line and the "what has not changed" block as genuine
   sections.

10. **All ten §5b KEEP items survive** in substance, handled additively where kept.

11. **All seventeen §5c corrections applied**, each recorded in the coverage note, including the
    deletion of the worked example in full and the deletion of both service asides.

12. **No named worked-example persona.** No pricing. No service claim. No "how we can help" block.
    No shared CTA template with the other two packs in this batch, and never "We can produce a written
    {noun} for/on your {noun}".

13. **Zero em-dashes. UK English.**

14. **No edit to any other page.** The frozen sibling (armed to 2026-08-22) and every other page in
    the RRA family are linked, never modified (DOSSIER.md §3). Anything discovered that would change
    another page goes to `briefs/property/agents/notes/delta.md`.

15. **Coverage note written to `briefs/property/agents/notes/prs-database-landlord-ombudsman-registration-requirements.md_coverage.md`.**
    It must record: the zero-equity measurement and its date; the declined keyword `property redress
    scheme` (27,100/mo) with the sibling slug, its Bing position band 4 to 10 and its armed-to date;
    the five assigned keywords and where each is placed; the belongs-to-sibling theme list and the
    differentiation statement for the one theme this page takes over; every correction from §5c with
    the house_positions section that governs it; the result of each write-time verification (Section
    74's content, the possession bar, the rogue-landlord database, the penalty section attribution,
    the HMRC manual reference); and any position declined for want of verification.

16. **No middleware change.** The slug exists; `SLUG_TO_CATEGORY_MAP` is not touched for this page.

17. **QA factual re-derives every figure and every commencement claim independently** against
    house_positions §20.12, §26.5, §26.6, §26.7 and §26.8. Given how much of the current page is
    speculative, QA should assume nothing on the incoming page is right until it checks.

## 8. Expectation + failure trigger

- **Re-baselining:** at deploy this page **re-baselines in `monitored_pages` IN PLACE**, with a
  supersession note. The registrar dedupes on slug, so no new row is created and the closed window
  (ended 2026-08-20) is superseded rather than duplicated. Standard monitored_pages registration
  inside the existing weekly detector only. **No new monitor, cron, alert, digest or notification of
  any kind** (DOSSIER.md §10, owner ruling §1).

- **Deploy is owner-triggered.** Build local-first. Do not deploy, do not submit IndexNow, do not
  register monitored_pages unless the owner asks in that turn.

- **90-day read** (DOSSIER.md §10).

- **Success at 90 days:** this is the page with the most to prove and the best chance of proving it.
  DOSSIER.md §7 grades it A because its keyword family is "the only measurable non-head family we can
  own". Success is **GSC impressions on the `private rented sector database` family** (1,000 + 480 +
  320 + 140 + 70 a month across five terms) and **any stable Bing long-tail presence**, following the
  section-13 page's pattern: 40 Bing query rows without holding the head. Equity to preserve was zero
  on both engines, so any row is a strict improvement.

- **Page-level failure trigger:** zero Bing rows AND zero GSC impressions on this URL at the 90-day
  read. On the cluster's strongest measurable keyword family, with a full overhaul behind it, that
  outcome would say the register thesis is wrong rather than that this page is weak, and it should be
  reported that way.

- **Cluster-level trigger:** zero Bing rows AND zero GSC impressions across the whole agents1 cluster
  at the 90-day read falsifies the register thesis, and no Track-2-style audience surface gets built
  on this evidence base (DOSSIER.md §10).
