# agents1 post-freeze delta list

Items discovered after the 2026-08-21 dossier freeze. Worked in a later pass, never
folded into the frozen scope.

1. **Frozen sibling s.74 description is wrong.**
   `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` (armed
   to 2026-08-22 at freeze) describes RRA 2025 s.74 as extending Local Commissioner
   jurisdiction; the other pre-existing page called it "interpretation and
   consequential provisions". Locked position now in house_positions §26.5 [08-21]:
   s.74 is a jurisdictional boundary provision (amends s.26 LGA 1974, excludes
   housing-ombudsman-eligible complaints). Back-patch the sibling AFTER its
   monitored window closes and reads are taken.
2. **Hub pack §6.2 item 4 says "the two frozen MEES siblings"; §6.4 names three.**
   `PACK_hub_for-letting-agents.md` §6.4 lists `mees-regulations-landlords`,
   `energy-performance-certificates-epc` and
   `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`, all under the
   blanket no-edit rule, but §6.2 item 4 says to link two. The hub links all three,
   because the section makes both halves of the enacted-versus-policy split and the
   ledger row `epc c 2030 landlords` says the epc-c-2030 sibling is "linked not
   edited". Resolve the count in the pack template before the next hub. [08-21, hub writer]
3. **Two §6.4 frozen pages are named but never called for by a §6.2 section.**
   `renters-rights-act-rent-increase-section-13-tribunal-route` (our only page visible
   on either engine) and `renters-rights-act-2026-tax-implications-landlords` appear in
   the hub pack's frozen-link list, but no section mandate routes to them, so the hub
   links neither. The Section 13 page in particular is the cluster's strongest internal
   link target on the measured evidence. Decide at the 90-day read whether the hub
   should carry it; not added now because it is outside pack scope. [08-21, hub writer]
4. **Pipeline-artefact leakage on a live frozen page: `energy-performance-certificates-epc`.**
   Its section "The EPC C by 2030 Trajectory: Policy, Not Enacted Law" carries the published
   sentence "Sessions writing landlord content should not assert 'the cap rises to £10,000' or
   'EPC C is required from 2028' as live statute." That is house_positions instruction language
   addressed to writers, sitting in reader-facing copy on a live page. The same section also hedges
   with "as of the date of this page", which is self-referential rather than a dated statement.
   Frozen under DOSSIER.md §3, so no edit made. Rewrite both sentences into reader voice in a later
   pass. [08-21, page 2 writer]
5. **Two frozen EPC pages predate the 21 January 2026 detail; back-patch after their windows close.**
   `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap` (dated 2026-05-24) and
   `energy-performance-certificates-epc` (2026-05-27) both still frame the trajectory as "EPC C 2030
   for all PRS, EPC C 2028 for new tenancies, £10,000 cap". Neither carries the government response's
   own "will seek new powers by Act of Parliament" line, the single 1 October 2030 compliance date,
   the dual metric, the ten-year exemption validity or the 1 October 2029 grandparenting date now
   locked at house_positions §26.3 [08-21]. Nothing on either page is asserted as enacted, so neither
   is wrong, but both are weaker than the locked position and the 2028 framing is superseded even as
   policy. `epc-c-2030-...` also hardcodes "False as of 2026-05-24" in body copy. [08-21, page 2 writer]
6. **Correction to item 1: the two pages are the other way round.** Verified at write time by
   reading both files. The FROZEN sibling
   `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` is the one that calls
   s.74 "interpretation and consequential provisions" (FAQ 2 and the H2 "The Enforcement
   Architecture: ss.66 and s.74"). `prs-database-landlord-ombudsman-registration-requirements` was
   the one describing it as extending Local Commissioner jurisdiction, and that description has now
   been replaced with the locked house_positions §26.5 [08-21] position (jurisdictional boundary
   provision amending s.26 LGA 1974). Item 1's back-patch instruction still stands, it just points
   at the sibling for both wrong descriptions. [08-21, page 5 writer]
7. **Frozen sibling carries the retired "before April 2027" database framing.**
   `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` says "The PRS Database
   is expected to commence before April 2027 per government policy statements". house_positions
   §26.6 [08-21] retired that phrasing: the roadmap's own expectation is a regional rollout from
   late 2026 for the database and mandatory redress membership in 2028. The sibling also carries
   three "As of 2026-05-24" stamps, which hard rule 11 forbids. Frozen to 2026-08-22, so no edit
   made. Back-patch after the window closes. [08-21, page 5 writer]
8. **Pipeline-artefact leakage on the frozen sibling, same class as item 4.**
   `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` publishes writer
   instructions in reader-facing copy: "Sessions writing on the topic should hedge as 'approved
   redress scheme regime'... not 'the statutory ombudsman'" and "sessions should not write it as if
   it were statutory". Its own `summary` also opens "RRA 2025 Part 2 Chapter 2 (ss.64-74)". Frozen,
   no edit made; fold into the same rewrite pass as items 1, 4 and 7. [08-21, page 5 writer]
9. **HMRC manual anchor refinement, house_positions §26.9 and §26.7.** Verified at gov.uk on
   2026-08-21: BIM38500 is the contents page, titled "Wholly and exclusively: fines, penalties and
   damages: contents". The operative proposition sits one page down at **BIM38515**, "Fines,
   penalties and damages: penalties for infractions of the law are not allowable". house_positions
   anchors "BIM38500+", which is not wrong but is imprecise. Page 5's foot reference line cites
   "BIM38500 to BIM38515". Tighten the house position to name BIM38515 in a later pass; not patched
   from inside a content task. [08-21, page 5 writer]
10. **DOSSIER.md §6's two PIM candidates for deposit tax treatment are both wrong.** Verified at
    gov.uk on 2026-08-21. **PIM2510 is "Beginning and end of a property business: cessation"**, not a
    deposits paragraph. **PIM1058 is "Local authority grants & other contributions"**, so the
    deposits line in PIM1051's receipts list does not lead there either. The governing paragraph is
    **PIM1052, "Income chargeable: deposits or bonds taken from tenants"**, found from the PIM1050
    contents page, with the cash-basis timing rule and the Mr F worked example at **PIM1094**.
    (QA nit accepted 08-21: PIM1051's deposits line routes within PIM1051, "see final paragraph
    below", so PIM1058 is simply the next contents entry and not a mis-route.) The
    dossier said its candidates were starting points and not findings, and that was right. Correct
    §6 in the dossier before the next deposit-shaped page is packed. [08-21, page 4 writer]
11. **A deposit-tax house_positions lock is now writable and does not exist.** Fourteen positions
    were verified against the Property Income Manual for this page and are registered with their
    paragraphs in `notes/tenancy-deposits-landlord-tax-position.md_coverage.md` §3. Promoting that
    register into `docs/property/house_positions.md` would stop every future page in this topic
    re-deriving it and would give QA a lock to check against. Manager/owner decision, not made from
    inside a content task. The register is verified as at 2026-08-21; PIM1051, PIM1052, PIM1092 and
    PIM1094 all show "Updated: 21 May 2026" on gov.uk. [08-21, page 4 writer]
12. **The CGT base-cost half of the capital/revenue point has no Property Income Manual home.**
    PIM2030 states that capital expenditure cannot be deducted in computing property business
    profits and routes to capital allowances, but says nothing about the capital gains base cost.
    Under the pack's verification regime that half was declined and left off the page. If the topic
    is packed again, source the base-cost proposition from the Capital Gains manual or from TCGA and
    lock it, rather than leaving writers to decline a true and useful point. [08-21, page 4 writer]
13. **Three linked siblings are absent from `SLUG_TO_CATEGORY_MAP`.**
    `pet-rights-tenancy-landlord-refusal-reasonable-grounds`,
    `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages` and
    `a-complete-guide-to-periodic-tenancy` all carry
    `/blog/landlord-tax-essentials/<slug>` canonicals but have no map entry, so the flat
    `/blog/<slug>` form does not 301 to the canonical for any of them. Their canonical URLs resolve
    normally, so this is a tidy-up rather than a break, and it is outside this page's scope. Not
    touched. [08-21, page 4 writer]
14. **The gov.uk Section 8 form URL in circulation is dead.** Pack §7 criterion 16 requires a link
    to "gov.uk's live Section 8 form page", and no standalone page for that form exists.
    `https://www.gov.uk/government/collections/assured-tenancy-forms`, the path most commentary
    cites, returns **404** (checked 2026-08-21). The live location is the guidance page
    `https://www.gov.uk/guidance/assured-tenancy-forms` (HTTP 200, checked 2026-08-21), which
    carries Form 3A, its completion guidance, Form 4A and Form 5A on one page. Page 1 links that
    guidance page for both the possession notice and the rent-increase notice. Other cluster
    writers, and any back-patch of the frozen pages, should use the same URL. [08-21, page 1 writer]
15. **Three gov.uk RRA guidance pages exist that the winner set never measured.** A gov.uk search
    API pull on 2026-08-21 returned `/guidance/repossessing-your-privately-rented-property-after-1-may-2026`,
    `/guidance/giving-notice-of-possession-to-tenants-before-1-may-2026` and
    `/guidance/enforcement-measures-for-landlords-renters-rights-act-2025`. None appears in
    `_language_spec.md` §1, which measured only the gov.uk landlord overview and the
    information-sheet publication page. They sit in the officialdom register the cluster does not
    contest, so they change no target, but they are additional gov.uk estate on the commencement
    family and should be counted before any future claim about how much of that head gov.uk holds.
    [08-21, page 1 writer]
16. **Page 1 links `/for-letting-agents`, which the hub writer landed mid-run.** The link is
    required by pack §7 criterion 16. `src/app/for-letting-agents/page.tsx` was absent when page 1
    started and present when it finished, so the target now exists, but the two must ship in the
    same push or the link 404s in production. Deploy-ordering item, not a content item.
    [08-21, page 1 writer]
17. **`reviewerCredentials` renders publicly, and six live Property pages leak house-position
    section codes through it.** `BlogPostRenderer.tsx` line 333 renders `reviewerCredentials` in the
    "Reviewed by" block, so anything in that field is reader-facing copy, not internal metadata.
    Page 3's own field carried "Position aligned with house position §19.13 (letting-agent managed
    portfolio, Wave 4 extension, locked 2026-05-23)" and was rewritten into reader voice at write
    time. Six other files still carry the same shape: `mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence`,
    `mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment`,
    `mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics`,
    `mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics`,
    `mtd-record-keeping-landlords-digital-requirements` and
    `prs-database-landlord-ombudsman-registration-requirements`. All are outside this batch's edit
    scope except the last, which is page 5. Frontmatter-only fix, no body change, but it is a
    pipeline-artefact leak on live surfaces and should be swept estate-wide rather than page by
    page. Worth checking whether other sites' renderers do the same. [08-21, page 3 writer]
18. **No SA105 box-number lock exists in house_positions §19.** §19.14 names the expense categories
    but never the boxes, and page 3 previously published "box 27", "box 25" and "box 29" with no
    source behind them. Those box numbers are now removed rather than verified, because the pack
    forbids guessing one. Several other MTD pages in the corpus may carry the same unsourced box
    numbers. If the box anchor is wanted as a content device (the Wave 3 discovery log argued it is
    high-value, `docs/property/_archive/wave3_discovery_log_session_B.md`), it needs a verified lock
    against the current SA105 first. [08-21, page 3 writer]
19. **Manager adjudication, hub `epc` section keeps four explainer links.** EDITORIAL_batchB
    "Hub-only notes" flagged that the section routes to four pages against the §3 hub row's "each
    linking one explainer", and asked for a call. Call at the 2026-08-21 fix round: **keep all four**.
    Rationale: the section states both halves of the enacted-versus-policy split, and the enacted
    floor, the EPC certificate page and the 2030 policy sibling each hold a different half of the
    answer an agent gets asked. Revisit only if the 90-day read shows the section leaking clicks.
20. **Manager adjudication, hub keeps the "Powered by Property Tax Partners" embed block.**
    EDITORIAL_batchB flagged it as the batch's only commercial ask and structurally close to the W7
    pattern on the do-not-copy list, explicitly "flagging for a decision, not proposing a cut".
    Call at the 2026-08-21 fix round: **keep, unchanged**. Rationale: it carries no pricing, the
    attribution line is the condition `/embed` already states, and embed attribution is the return
    read the owner set for this cluster. EDITORIAL_batchA ADVISORY 1.2 (cut the "you never have to
    think about it again" clause) was therefore left unapplied as part of the same block.
21. **Frozen sibling publishes the two-scheme error that house_positions §26.5 has now corrected.**
    `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` lists three approved
    agent schemes and states "Property Redress: (formerly Ombudsman Services: Property, which exited
    in 2018; Property Redress was established as a successor scheme)". Both halves are wrong.
    Property Redress IS the Property Redress Scheme rebranded (theprs.co.uk 301s to
    propertyredress.co.uk, verified 2026-08-21); nothing succeeded Ombudsman Services: Property when
    it left in 2018. §26.5 was corrected in the 2026-08-21 factual QA round to two schemes; the
    sibling still carries the pre-correction text and its FAQ 5 repeats it. Page 5 was fixed to the
    corrected lock. Frozen to 2026-08-22, so no edit made. Back-patch in the same pass as delta
    items 1, 6, 7 and 8. FACTUAL_hub-rra-database F4. [08-21, page 5 writer, fix round]
22. (writers append below)
