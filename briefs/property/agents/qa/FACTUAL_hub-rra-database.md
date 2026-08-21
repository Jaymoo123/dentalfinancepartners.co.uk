# FACTUAL QA: agents1 hub + RRA commencements + PRS database/redress

Date: 2026-08-21. Adversarial factual pass, read-only: **nothing was edited**.

Governing sources, read in full before the surfaces: `docs/property/house_positions.md` §20.1-§20.3,
§20.6, §20.8, §20.10, §20.12 (incl. the [08-21] self-commencement layer, SI 2026/638, SIs
2026/321/324/325/354, the SI 2026/421 reg 2 private-tenancies carve-out and Form 4A), §20.13, §26.1,
§26.3, §26.5 (incl. the [08-21] s.74 lock), §26.6 (incl. the [08-21] precision block), §26.7, §26.8
(incl. the three [08-21] do-not-writes), §26.9; the three packs in `briefs/property/agents/packs/`;
`briefs/property/agents/DOSSIER.md` §3, §6, §8; the three coverage notes and `notes/delta.md`.
Cross-page reads: `mees-epc-rules-what-your-landlords-think.md`,
`mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md`,
`tenancy-deposits-landlord-tax-position.md`.

## Verdicts

| Surface | Verdict | Headline reason |
|---|---|---|
| `Property/web/src/app/for-letting-agents/page.tsx` | **must_fix** | "Neither has a commencement date" is the framing §20.12 forbids in terms: s.74 was commenced 1 May 2026 and the Part 2 regulation-making powers have been in force since Royal Assent. Also contradicts both posts it links |
| `Property/web/content/blog/rra-2026-whats-in-force-letting-agents.md` | **all_clear** (1 advisory) | Every figure, date, instrument and tense re-derived clean against §20 and §26. One FAQ compresses the redress position further than the body does |
| `Property/web/content/blog/prs-database-landlord-ombudsman-registration-requirements.md` | **must_fix** | The agent-redress scheme list, which is the page's organising idea, names one scheme twice and invents a succession. Two further tense/attribution advisories |

Counts: **2 BLOCKER, 4 ADVISORY** across the three surfaces (hub 1B/1A, RRA post 0B/1A, database
post 1B/2A).

Structural checks that passed outright, listed so they are not re-run: frozen-page integrity, every
internal link, both external gov.uk links, the calculator registry, blog category prefixes, the
banned-string sweep and cross-page consistency on everything except the item in F1. Detail in §4-§6.

---

## 1. Hub: `Property/web/src/app/for-letting-agents/page.tsx` — must_fix

### F1 BLOCKER. The Part 2 commencement position is stated as the thing §20.12 says never to write.

Quoted, `page.tsx:208-209` (section `not-yet`):

> "Neither has a commencement date, so neither puts a duty on your landlord today."

Preceded by, `page.tsx:199-200`:

> "Two of the things your landlords have read about are in the Renters' Rights Act 2025 and are not
> running. One is the landlord database. The other is the landlord redress scheme."

The two things named are Part 2 Chapter 3 and Part 2 Chapter 2, i.e. the whole of Part 2. §20.12
[08-21] is explicit and verbatim: **"Never write 'none of Part 2 is in force'; write 'in force for
regulation-making only; no regulations made'."** Three separate facts in §20.12 and §26.5 refute the
sentence as written:

1. **s.74 has a commencement date.** §20.12 status table, Part 2 Chapter 2 row: "**Partial** (s.74
   fully ...)", date "1 May 2026", source "SI 2026/421 reg.3". §26.5 first bullet repeats it.
2. **The Chapter 2 and Chapter 3 regulation-making powers have a commencement date**: Royal Assent,
   27 October 2025, under s.145(2), "including the s.77 fee power" (§26.6 [08-21] precision block).
3. Only the *database duty itself* is in the position the sentence describes: s.75 "marked
   **Prospective** ... NO fee regulations made" (§26.6), and for redress "no landlord redress scheme
   SI exists at all" (§20.12 practical writing rule).

It is also a cross-page contradiction. Both posts this section links state the opposite: the RRA post
writes "One provision took effect on 1 May 2026 and the rest is regulation-making only"
(`rra-2026-whats-in-force-letting-agents.md:100`), and the database post gives Section 74 and the
regulation-making powers their own bullets under the heading "What is actually in force today?"
(`prs-database-...:57-58`) plus a table row "Section 74 boundary provision | In force | 1 May 2026,
done". A reader who follows either link is told the hub was wrong.

Pack §6.5 bullets 3 and 4 permit exactly the narrower claim ("the landlord database is not in
force"; "no landlord redress scheme instrument exists at all"), not the blanket one.

**Drop-in fix.** Replace the quoted sentence with:

> "Neither duty has been switched on, so neither puts anything on your landlord today. The database
> has no commencement date at all, and on the redress side the only part in force is a boundary
> provision about which ombudsman handles which complaint. The power to write the rules is live. The
> rules are not written."

(That also keeps the section inside the pack's zero-citation rule: no section numbers, no SI.)

### F2 ADVISORY. Two unqualified universals drop the carve-out §20.12 says to quote.

Quoted, `page.tsx:227`:

> "Every assured tenancy is periodic now, and two questions follow from that."

And the page-level meta description, `page.tsx:11`, which is the SERP snippet and is read alone:

> "The tenancy rules changed on 1 May 2026."

§20.12 [08-21]: "Reg 2's heading confines the whole 1 May tenancy-reform wave to assured tenancies
that are NOT social-housing assured tenancies ... **Quote this carve-out in any 'does this apply to
me' content**." The hub does carry it, once, in the `what-changed` section ("Social-housing assured
tenancies were carved out of that wave"), and then contradicts it in the section a housing-association
landlord would actually be pointed at. Not a BLOCKER because the carve-out is present on the page and
correct where it appears.

**Drop-in fix.** `page.tsx:227` -> "Every private assured tenancy is periodic now, and two questions
follow from that." Meta description -> "The tenancy rules changed for private assured tenancies on
1 May 2026." (135 chars, still inside the snippet budget.)

### Re-derived clean on the hub

£3,500 including VAT with exemption registration above it (§26.3); EPC E as the enacted floor and
EPC C 2030 as unenacted policy with no regulations laid (§26.3, §26.8); "no registration fee exists
in law" (§26.6, §26.8 [08-21]); "a regime of approved schemes rather than one named ombudsman"
(§26.5, §26.8); the agent's own redress duty as separate and older, untouched by the Act (§26.5);
"Section 21 is gone", Section 8 possession, Section 13 for rent rises, once a year (§20.2, §20.6);
the Act named "Renters' Rights Act 2025" throughout with no 2026 naming slip (§20.13, §26.1); MTD as
the landlord's obligation with the gross-not-net threshold trap (§19.13 via the MTD page); deposits
framed as an end-of-tenancy question with the agency's client-money regime excluded (DOSSIER §1).

---

## 2. RRA post: `content/blog/rra-2026-whats-in-force-letting-agents.md` — all_clear (1 advisory)

### F3 ADVISORY. FAQ 1 compresses the redress position past the §20.12 line the body respects.

Quoted, frontmatter FAQ 1 (`:17`):

> "The landlord database, the landlord redress scheme and the substantive Decent Homes Standard for
> the private rented sector are all still awaiting commencement, so none of them imposes a duty on
> anybody yet."

Read strictly, "the landlord redress scheme ... awaiting commencement" is the same over-claim as F1:
s.74 of that chapter was commenced on 1 May 2026 (§20.12, §26.5). The second half of the sentence is
right, and the body, the milestone table and the dedicated "Why is part of the Act still not law?"
section all state the nuance correctly, so the exposure is one FAQ answer. FAQ 4 (`:23`) carries a
milder echo: "Everything else has no commencement date in law."

**Drop-in fix.** FAQ 1 -> "The landlord database, the duty for landlords to join a redress scheme and
the substantive Decent Homes Standard for the private rented sector are all still awaiting
commencement, so none of them imposes a duty on anybody yet." FAQ 4 -> "Everything else that puts a
duty on a landlord has no commencement date in law."

### Re-derived clean, item by item

Every date, figure, instrument and tense on this page was re-derived independently. All correct:

| Claim on the page | Governing section | Result |
|---|---|---|
| Royal Assent 27 Oct 2025; whole Act in force for making regulations | §20.12 s.145(2) | correct |
| 27 Dec 2025 tranche, preparatory + investigatory powers, SI 2025/1354 + s.145 | §20.12 | correct |
| 1 May 2026 wave, **private assured tenancies only**, social housing Phase 2 "expectation" 2027 | §20.12 [08-21] reg 2 carve-out | correct, and stated in its own H2 |
| 22 June 2026, category 1 hazard civil penalties **up to £7,000**, proceeds fund superior-landlord enforcement, **not** the Decent Homes Standard | §20.12 [08-21] SI 2026/638 | correct, including the anti-conflation line |
| Information sheet is a statutory duty; new tenancies from 1 May 2026; existing tenancies **31 May 2026** | §20.12 SI 2026/324 | correct |
| **Form 4A** prescribed s.13 notice, **Form 5A** for assured agricultural occupancies | §20.12 SI 2026/354 | correct |
| Section 8 form is the Secretary of State's live published version; links gov.uk, no static copy | §20.12, §26.8 [08-21] | correct, do-not-write avoided |
| Section 13: once per twelve months, two months' written notice, review clauses unenforceable, tribunal cannot exceed the proposed rent | §20.6 | correct on all four |
| Fixed terms >21 years outside; 7-21 years a closed transitional cohort, "a new ten-year term does not escape" | §20.3 + F-15 correction | correct, and avoids the exact trap F-15 logged |
| Rent periods monthly, max one month; six-monthly and annual gone | §20.3 | correct |
| Tenant two months' notice at any point, sourced to an amendment to the Protection from Eviction Act 1977 rather than the periodic mechanic | §20.2 + F-14 correction | correct, and is the F-14 point stated in reader voice |
| Twelve-month re-letting bar after sale/occupation possession | §20.2, §20.11 | correct |
| Rent Repayment Orders reaching two years' rent | §20.10 + F-12 | correct |
| Advance rent prohibited before and during the tenancy | §20.8 (two regimes) | correct |
| Redress penalties £7,000 breach / £40,000 offence | §26.5 s.66 | correct |
| Plural approved-scheme regime; "the single statutory ombudsman" named only to refute it; compensation cap called commentary | §26.5, §26.8 | correct |
| Database: prospective, no commencement order, fee power live, no fee figure, rollout "late 2026" labelled an expectation | §20.12, §26.6 [08-21] | correct |
| Redress: no scheme instrument at all, membership 2028 labelled an expectation | §20.12, §26.5 [08-21] | correct |
| Decent Homes: two preliminary tranches, substantive standard awaits an order, 2035 or 2037 proposed | §20.12, §26.4 | correct |
| Act named "Renters' Rights Act 2025", cited 2025 c. 26, "2026" used only as commencement context and once in the approved corrective form | §20.13, §26.1, pack §6.2(i) | correct |

Both gov.uk links were fetched live on 2026-08-21 and both resolve: the information sheet publication
page (`/government/publications/the-renters-rights-act-information-sheet-2026`, MHCLG, last updated
8 June 2026) and the forms guidance page (`/guidance/assured-tenancy-forms`, which does carry Form
3A, Form 4A and Form 5A, as the page asserts). Neither republishes or mirrors a PDF.

---

## 3. Database post: `content/blog/prs-database-landlord-ombudsman-registration-requirements.md` — must_fix

### F4 BLOCKER. The agent-redress scheme list names one scheme twice and invents a succession.

Quoted twice, identically in substance. Body (`:94`):

> "Three approved schemes have operated over that period: The Property Ombudsman, the Property
> Redress Scheme, and Property Redress, which succeeded Ombudsman Services: Property after it left
> the sector in 2018."

FAQ 3 (`:26`):

> "Three approved schemes have operated over that period: The Property Ombudsman, the Property
> Redress Scheme, and Property Redress, which succeeded Ombudsman Services: Property after it left
> the sector in 2018."

**Property Redress Scheme and Property Redress are the same organisation.** Verified 2026-08-21:
`theprs.co.uk` returns a 301 to `propertyredress.co.uk`, and that site describes itself as "Property
Redress ... established in 2014" (the Property Redress Scheme's own launch year). The rebrand is the
whole story; there is no separate approved scheme called Property Redress, and nothing succeeded
Ombudsman Services: Property, which withdrew from property redress in 2018 leaving two approved
schemes. So the sentence lists two entries for one body and attributes a lineage that does not exist.

This matters more than a name slip because the agent's own 2014 duty is the page's organising idea
(pack §6 item 3, "the DO-NOT-CONFLATE spine, as the page's largest section and its reason for
existing"), and the sentence is the concrete detail an agent would check against their own
membership certificate.

**Root cause, and it is not the writer's.** §26.5 itself says "Three approved schemes operate: The
Property Ombudsman (TPO), Property Redress Scheme (PRS), and Property Redress (formerly Ombudsman
Services: Property — exited 2018)", and the frozen sibling
`renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords:98` publishes the same
thing harder ("Property Redress: (formerly Ombudsman Services: Property, which exited in 2018;
Property Redress was established as a successor scheme)"). The page inherited a wrong house position.
The sibling is armed to 2026-08-22 and must not be edited (DOSSIER §3); the house-position correction
is not a content-task edit either.

**Drop-in fix**, true under either reading and still zero-citation:

> "Two approved schemes are open to agents today: The Property Ombudsman, and Property Redress,
> which is the Property Redress Scheme under its current name. A third, Ombudsman Services: Property,
> left the sector in 2018."

Then add to `notes/delta.md`: §26.5's third-scheme parenthetical and the frozen sibling's
"successor scheme" sentence both conflate the Property Redress Scheme rebrand with the 2018 exit of
Ombudsman Services: Property; correct the house position and back-patch the sibling after its window
closes (same pass as delta items 1, 4, 7 and 8).

### F5 ADVISORY. A prospective amendment is written in the present tense.

Quoted, `:129`:

> "The Renters' Rights Act 2025 adds a signpost from that register across to the new one."

The page's own coverage note, §6 item 3, records what was verified: "the Renters' Rights Act 2025
section 94(2) inserts a new subsection 4 cross-referring to the section 75 database, **a prospective
amendment not yet applied**." Nothing in the database chapter is commenced (§26.6), so the amendment
has not taken effect and the present tense breaches the page's own stated discipline two paragraphs
earlier ("your safe stance is conditional").

**Drop-in fix.** "When the new database commences, the Renters' Rights Act 2025 will add a signpost
from that register across to it."

### F6 ADVISORY. The £7,000 / £40,000 pair is applied to database non-registration, where no locked figure exists.

Quoted, `:153`:

> "Once the duties commence, and only then, a local housing authority will be able to impose a
> financial penalty of up to £7,000 where it treats the failure as a breach, or up to £40,000 where
> it deals with it as an offence."

The section heading above it is "What happens if a landlord is not registered?", so the figures read
as the database penalties. §26.5 locks £7,000/£40,000 for the **redress** regime (s.66). §26.6 names
s.92 for the criminal limb on the database side and **names no civil-penalty figure at all**; the
pack's own §5c item 7 records that house_positions does not support pinning the database side, and
the coverage note §6 item 4 declines the attribution rather than verifying it. The tense is right and
the figures are right for redress; what is unsupported is applying them to the database chapter
without saying so.

**Drop-in fix.** Open the paragraph with the attribution the sources do support: "Once the duties
commence, and only then, the penalty shape on the redress side is a financial penalty of up to £7,000
where a local housing authority treats the failure as a breach, and up to £40,000 where it deals with
it as an offence. The database side carries its own penalty and offence regime, and the figures for
it will be set alongside the regulations." Alternatively verify the database civil-penalty section
against legislation.gov.uk and record it in the coverage note.

### Re-derived clean on this page

Section 74 as a jurisdictional boundary provision amending the Local Government Act 1974, in force
1 May 2026 (§26.5 [08-21], and the incoming page's wrong description is gone); regulation-making
powers in force since Royal Assent with no regulations made, in the exact §20.12 form; 22 June 2026
category 1 hazard penalties up to £7,000 as HHSRS plumbing and not the Decent Homes Standard, plus
"no further commencement order has been made since" (§20.12: no Commencement No. 4 as of 2026-08-21);
database duty marked Prospective, no commencement order, **no fee figure anywhere on the page in any
form**, "every figure circulating in commentary was invented" (§26.6, §26.8 [08-21]); marketing
without an active entry an offence once commenced, "without invalidating the tenancy contract"
(§26.6 s.82); knowingly false information and continued breach after a penalty notice at the criminal
end (§26.6 s.92); data fields labelled a working expectation (§26.6, pack §5c item 8); plural
approved-scheme regime, no "single statutory ombudsman" (§26.5, §26.8); agent duty since 1 October
2014 and the do-not-write "letting agents joined the redress regime under RRA 2025" avoided (§26.5,
§26.8); possession bar written conditionally with the anti-social behaviour carve-out and the
unsupported date-of-service refinement removed (coverage note §6 item 2); rogue landlord database
operative since 6 April 2018 with no access claim asserted in either direction (coverage note §6 item
3); fees deductible as regulatory costs, penalties not deductible, defence fees deductible where
revenue in character (§26.7, §26.9). Every pound figure on the page is £7,000 or £40,000, matching
pack acceptance criterion 8.

---

## 4. Cross-page consistency across all six batch surfaces

Checked pairwise on every fact two or more pages touch.

| Question | hub | RRA post | database post | MEES post | MTD post | deposits post | Result |
|---|---|---|---|---|---|---|---|
| Does any part of Part 2 have a commencement date? | "neither has a commencement date" | s.74 1 May 2026 + reg-making since RA | s.74 1 May 2026 + reg-making since RA | - | - | - | **CONFLICT, see F1** |
| Who does the 1 May 2026 wave reach? | private, carve-out stated once then dropped (F2) | private only, own H2 | - | - | - | "private assured tenancies", social housing later | consistent |
| Database fee | none in law | none in law | none in law, invented figures called out | - | - | - | consistent |
| Redress: single ombudsman or plural? | "approved schemes rather than one named ombudsman" | "one or more approved schemes" | "one or more approved schemes" | - | - | - | consistent |
| Expected years | not stated | late 2026 / 2028, labelled expectations | late 2026 / 2028, labelled indicative | - | - | - | consistent |
| Decent Homes | not stated | preliminary only, 2035 or 2037 proposed | not the Decent Homes Standard | - | - | - | consistent |
| MEES enacted position | EPC E, £3,500 inc VAT, EPC C 2030 policy | - | - | same, plus the 21 Jan 2026 response detail | - | - | consistent |
| MTD filer and threshold basis | landlord files, gross decides | - | - | - | landlord files, gross decides | - | consistent |
| Deposit tax timing | end of tenancy, on the retained part | - | - | - | - | same | consistent |
| Agent's own 2014 redress duty | separate and older | separate, since 1 Oct 2014 | separate, since 1 Oct 2014 | - | - | - | consistent on the duty; **scheme names wrong, see F4** |

One further cross-surface note, not a finding against this batch: the frozen sibling
`renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` still carries the retired
"before April 2027" database framing and the wrong s.74 description. Both are already logged at
`notes/delta.md` items 1, 6 and 7 for back-patch after 2026-08-22, and neither page in this batch
repeats them.

## 5. Links, routes and registry

- **Internal links, all three surfaces: every one resolves on disk.** Fifteen distinct blog slugs
  checked as files, with each target's frontmatter `category` run through `slugifyCategory()`
  (`src/lib/blog.ts:95`) to confirm the URL prefix: `landlord-tax-essentials` for thirteen,
  `making-tax-digital-mtd` for the MTD page ("Making Tax Digital (MTD)"), and
  `property-types-and-specialist-tax` for the HMO licensing page ("Property Types & Specialist Tax",
  where the `&` -> `and` rule applies). No prefix is guessed or wrong.
- **Hub calculator slugs: all five present in `src/lib/calculators/registry.ts`.**
  `stamp-duty-calculator`, `section-24-calculator` and `mtd-checker` are bespoke entries;
  `rental-yield-calculator` and `rental-income-tax-calculator` are generic tools rendered through
  `/calculators/[slug]`. `/calculators` and `/embed` both exist as routes.
- **The hub's embed condition matches the embed page.** "Powered by Property Tax Partners" is the
  condition actually stated at `src/app/embed/page.tsx:72`; the hub does not reproduce the snippet.
- **External links: 2 of 2 fetched live and resolving** (see §2). The dead
  `/government/collections/assured-tenancy-forms` path recorded at `notes/delta.md` item 14 is not
  used anywhere in the batch.
- **Route wiring present**: `/for-letting-agents` added to `sitemap.ts` `staticPaths`, to
  `niche.config.json` nav children and to `footer_links`; the two new blog slugs added to
  `SLUG_TO_CATEGORY_MAP`, and the EXTEND target correctly left out of it. (Cosmetic only: the
  middleware now carries two separately-labelled "agents1 cluster" blocks rather than one.)

## 6. Frozen-page integrity

`git status --porcelain` on a clean tree shows only: the three batch content files (two untracked
net-new, one modified EXTEND), the third net-new post and the MTD EXTEND target, the new hub route,
the three wiring files, `docs/property/house_positions.md` (the DOSSIER §8 pre-write patch),
`scripts/sdlt_equity_gate.py` (one line: the `agents` cluster registered in `CLUSTERS`) and the new
`briefs/property/agents/` tree. **No page on the DOSSIER §3 frozen list is modified.**

Specifically checked, as instructed: `git diff --stat` on
`Property/web/content/blog/renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords.md`
returns empty and the file is absent from `git status`. The frozen redress sibling was not touched,
including where this batch found it to be wrong (F4, and delta items 1, 6, 7, 8).
