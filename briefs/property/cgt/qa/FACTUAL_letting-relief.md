# Adversarial factual QA — letting-relief-landlords-2026-changes.md

Reviewer: adversarial factual QA (attempt to refute, not to confirm).
Date: 2026-08-20.
Scope: **only** the copy added in the working-tree diff (`git diff HEAD`) — 112 added lines = 8 new H2 sections (body lines 67-164) and 6 new FAQs (frontmatter lines 47-58), plus the `dateModified` bump. Pre-existing body copy and the pre-existing 14 FAQs were read for cross-reference and internal-consistency purposes only and are not themselves in scope.
Authority: `docs/property/house_positions.md` §5 (CGT on UK residential property 2026/27), §13 (general do-not-write list). House positions beat every other source.

## Verdict

**must_fix** — 2 BLOCKER, 7 ADVISORY.

| # | Severity | Location | One-line |
|---|---|---|---|
| B1 | BLOCKER | Body, "Worked example" H2 (Dana) | Gives a live-in lodger landlord a £10,876.80 CGT bill; the same page's second worked example, the sibling PRR page and the gov.uk source this page cites all give the same fact pattern **nil** |
| B2 | BLOCKER | Body "What will you pay in 2026/27" + new FAQ "Can you claim both lettings relief and the annual exempt amount?" | States brought-forward losses come off **before** the £3,000 AEA. They come off after it, and only down to it |
| A1 | ADVISORY | Dana Step 4 | Whole £45,320 charged at 24% with no 18% slice; Dana's income is never stated, and the next H2 says the 18% band applies first |
| A2 | ADVISORY | "Who no longer qualifies after April 2020" | "Complete on or after 6 April 2020" — the CGT disposal date is exchange of contracts (s.28 TCGA 1992), not completion |
| A3 | ADVISORY | "Is there still a 36-month rule" | s.225E 36-month final period stated without its second statutory limb (no other interest in a main-residence dwelling) |
| A4 | ADVISORY | New FAQ "Do you have to show the lettings relief computation on your tax return?" | "HMRC does not want the worksheet with the return" — the SA108 notes ask you to provide/attach your computations |
| A5 | ADVISORY | Same FAQ + body 60-day paragraph | "the disposal still belongs on the Self Assessment pages" where reliefs bring the gain to nil — a disposal fully covered by PRR is generally not SA-reportable |
| A6 | ADVISORY | "Who no longer qualifies after April 2020" | Flat "you get nothing on a ... annexe" contradicts the protected section's "may qualify (fact-specific on the 'shared' test)" |
| A7 | ADVISORY | "What is lettings relief?" | "you and your partner could claim up to £80,000 between you" — omits that each owner must independently clear the gateway and their own lower-of-three |

---

## Checks that PASSED (attempted refutation, could not break)

**Every §5 figure in the new copy.** AEA £3,000 (three instances: Dana Step 4, "What will you pay", new FAQ on AEA + new FAQ on other reliefs). 18% basic / 24% higher on residential (two instances). PRR final period 9 months (four instances: "Who qualifies" implied, "How do PRR and lettings relief fit together", "Is there still a 36-month rule", new FAQ on other reliefs, new FAQ on PPR). No instance of 28%, 18 months, or a 36-month general rule anywhere in the new copy.

**§5 do-not-write list — all four items clear.**
- "CGT rate is 28%" — absent.
- "Letting Relief is available for all rental periods" — the new copy states the opposite in four separate places, correctly and unambiguously ("since 6 April 2020 you only get it if you shared the home with your tenant"; "closed to everyone who was not living in the property alongside their tenant"; new FAQ "Has lettings relief been abolished?"). This is the single most important house position on this page and the new copy holds it.
- "60-day applies to all UK residents' disposals regardless of tax due" — the new copy states the §5 rule correctly twice: "If your reliefs bring the gain to nil you do not need the 60-day return as a UK resident" and the matching FAQ sentence. The non-resident carve-out ("Non-residents file on every UK land disposal whether or not tax is due") is present and correct.
- s.162 incorporation relief automatic — not asserted; the new FAQ says only "the deferral routes if you are reinvesting" and defers to the protected section, which lists s.162 without the "automatic" claim.

**§13 general do-not-write list.** Zero em-dashes in the 112 added lines (verified by character search; the single non-ASCII dash is a U+2212 minus sign inside `£88,320 − £40,000`, which is arithmetic notation and matches the pre-existing style at line 222). No client names — "Dana ... in Leeds" is an anonymised persona in exactly the §13 house form. No emoji. No invented £ figure attributed to an HMRC publication (Dana's numbers are self-evidently a hypothetical). PRR, PPR and principal private residence relief are all defined at first use in the new "How do private residence relief and lettings relief fit together?" section and again in the new PPR FAQ.

**Statutory citations in the new copy.** s.223B TCGA 1992 (new FAQ on residential-vs-CGT letting relief) — correct, matches §5 and the protected sections. "sections 222 to 226 TCGA 1992" for PRR (new PPR FAQ) — correct, matches §5's "s.222–226 TCGA 1992". Rent-a-Room named as an income tax relief and expressly distinguished from the CGT relief (new FAQ) — correct and consistent with the protected Rent-a-Room section.

**Lowest-of-three cap, all three limbs.** The new "How is lettings relief calculated?" H2 states them as £40,000 / the PRR already given / the gain attributable to the letting, and instructs "take the smallest". That matches s.223B(4) and matches the protected s.223B(4) bullet at line 173 limb-for-limb, including the ordering-agnostic "lowest" framing. The new copy also correctly reproduces the PRR-prerequisite ("You cannot claim lettings relief on a property that never qualified for private residence relief"; "no private residence relief means no lettings relief"), which is the s.223B(4)(a) anchor.

**Disposal-date cut-off — the page's own verified position.** New copy: "The date that decides which rules apply to you is the date you sell, not the date you started letting ... the restricted rules cover your entire letting history, including the years before 2020". This is the corrected CG64710 position and it agrees with the protected transitional-rules section and the protected FAQ. The new copy also correctly points readers down to that section rather than restating the mechanics. (One wording caveat at A2 below, which does not disturb the position itself.)

**Shared-occupation gateway wording.** "share the kitchen, bathroom or living room with them" and "You let a room or rooms, not a self-contained part of the building with its own front door, kitchen and bathroom" match the protected FAQ on shared common areas and the protected s.223B(1) bullet. No drift.

**The 9/18/36 month history.** "cut from 36 months to 18 months on 6 April 2014, and from 18 months to 9 months on 6 April 2020" — correct (FA 2014 s.58 and FA 2020 s.23 respectively), and consistent with the HMRC CG64985 table this page already cites in its sources.

**"On a 15-year ownership the difference is 15% of your gain."** Re-derived: (36 − 9) months = 27; 27/180 = 15.0% exactly. Correct.

**Arithmetic, Dana example, re-derived to the penny.** Every figure the brief listed checks out:

| Step | Stated | Re-derived |
|---|---|---|
| Whole gain | £368,000 | 600,000 − 12,000 − 220,000 = **368,000** ✓ |
| Let-attributable | £88,320 | 368,000 × 0.30 × 12/15 = **88,320.00** ✓ |
| PRR ("covers the rest") | £279,680 | 368,000 − 88,320 = **279,680** ✓ |
| Lowest of three | £40,000 | min(279,680; 40,000; 88,320) = **40,000** ✓ |
| After lettings relief | £48,320 | 88,320 − 40,000 = **48,320** ✓ |
| After AEA | £45,320 | 48,320 − 3,000 = **45,320** ✓ |
| Tax at 24% | £10,876.80 | 45,320 × 0.24 = **10,876.80** ✓ |

The internal date arithmetic is also consistent: 2011 to June 2026 = 15 years; 2014 to 2026 = 12 years; 12/15 is the stated let fraction. No arithmetic defect anywhere in the new copy. **The problem with this example is not the maths — see B1.**

**Internal links.** All six slugs newly referenced by the added copy resolve to real files in `Property/web/content/blog/`: `cgt-annual-exempt-amount-3000-allowance-2026-27`, `reduce-cgt-property-disposal-uk`, `principal-private-residence-relief-landlords`, `cgt-main-residence-election-two-properties`, `cgt-payment-deadlines-property-sales-2026`, `cgt-rates-property-2026-27-current-rates-explained`. No broken cross-links.

---

## BLOCKERS

### B1 — The Dana worked example gives a live-in lodger landlord a tax bill that this page, its sibling page, and its own cited gov.uk source all say is nil

**Quoted (body, "Worked example: how much lettings relief would you get on a 2026/27 sale?"):**

> "Dana bought a house in Leeds in 2011 for £220,000 and lived in it as her only home for all 15 years. From 2014 she let two bedrooms to lodgers, together 30% of the floor area and used only by them, **while sharing the kitchen, bathroom and living room**."

and the answer it reaches:

> "At the 24% higher rate for residential property: **£10,876.80** of capital gains tax"

and the attempted reconciliation:

> "Share the whole house with no room set aside and there is usually no let-portion gain at all, **which is why the two worked examples on this page reach different answers**."

**Why wrong.** Dana's stated facts are a textbook live-in-landlord-with-lodgers arrangement — owner in occupation throughout, lodgers sharing kitchen, bathroom and living room. That is precisely the fact pattern that four other places say produces full PRR and no CGT:

1. **The same page, protected worked example (Priya, lines 218-235).** Identical structure: owner in occupation throughout, "let one bedroom plus access to the bathroom and kitchen to a series of lodgers". Verdict there: *"So 100% of the ownership period is main-residence: PRR = £122,000 ... Note that this gives no residual gain, so no Lettings Relief is needed. This is the typical clean shared-occupation case where PRR alone covers the disposal."* Dana and Priya are indistinguishable on their stated facts and get opposite answers.

2. **The new copy's own qualifying bullet, six paragraphs earlier.** *"in plenty of lodger cases private residence relief covers everything and lettings relief is never needed."* Dana is a lodger case and the new copy then says PRR does not cover it.

3. **The sibling PRR page** (`principal-private-residence-relief-landlords.md`, FAQ at line 44), which is the estate's established position: *"Taking in a lodger under Rent-a-Room does not disturb the property's status as your main residence for PRR, and **you still get full PRR on the eventual sale**. HMRC's view on lodger-letting and PRR is at CG64702."*

4. **gov.uk `/tax-sell-home`, which this page lists in its own Sources block** (line 385): you may have to pay CGT if "you let part of it out — **this does not include having a lodger**."

The stated reconciliation does not hold either. It claims the two examples differ because Priya had no room set aside — but Priya's facts explicitly say she "let one bedroom". Both examples set a room aside. A reader who reaches the protected example after reading the new one gets a straight contradiction on the page's single most commercially important question ("I'm a live-in landlord with lodgers, what will I pay?").

**Correction.** There is a real line here and the page needs to draw it rather than land on both sides of it:

- **HMRC CG64702:** where the lodger lives as a member of the owner's household (sharing living accommodation), no part of the dwelling is treated as ceasing to be occupied as the owner's only or main residence, and PRR is **not** restricted. This is the Priya case, the sibling-page case, and the gov.uk case.
- PRR is restricted by apportionment only where part of the dwelling-house is genuinely set aside on a basis that stops it being part of the owner's residence — a commercially let, separately-occupied part, not a household lodger arrangement. That restricted residual gain is what s.223B then works on, which is why s.223B is not a dead letter.

Two ways to fix, both acceptable:

- **(a) Preferred, smallest change.** Change Dana's *answer*, not her facts: PRR covers the full £368,000, tax nil, consistent with Priya, the sibling page and gov.uk. Then show the £40,000 cap biting in a variant — the accidental-landlord-who-moved-back-in pattern already sitting in the protected Priya variant is the natural one.
- **(b) Keep the tax bill, change the facts and say why.** Re-draft Dana so the letting is unambiguously outside the CG64702 household case (separate tenancy of a defined self-contained-in-practice part, tenants not part of the household, owner's own living space distinct) — and add one sentence naming the CG64702 line so the reader can see why Dana is on the restricted side and Priya is not. Note the trap in this route: push the facts far enough to restrict PRR and you risk pushing them past the s.223B shared-occupation gateway too, at which point there is no lettings relief at all. The qualifying window is narrow and the copy should say so.

Whichever route is taken, the "which is why the two worked examples on this page reach different answers" sentence must be rewritten, because as drafted it describes a distinction the second example does not contain.

**Sources:** HMRC CG64702 (lodgers / PRR); gov.uk "Tax when you sell your home" (already in this page's Sources list); `Property/web/content/blog/principal-private-residence-relief-landlords.md` line 44; this page's own protected lines 218-235.

**Note on house positions:** §5 carries no lodger/PRR-restriction depth beyond the one-line letting relief entry, so this conflict cannot be resolved from house positions. It is an internal-consistency and cross-page defect, and per §14 the underlying question (where exactly the estate draws the CG64702 line) is worth a flag rather than a unilateral decision if route (b) is chosen.

---

### B2 — Brought-forward capital losses are stated as coming off before the £3,000 AEA. They come off after it, and only down to it

**Quoted, body ("What will you pay in 2026/27 if lettings relief does not cover your gain?"):**

> "Capital losses come off after the two reliefs, **this year's first and then any brought forward, and the £3,000 annual exempt amount comes off last**."

**Quoted, new FAQ ("Can you claim both lettings relief and the annual exempt amount?"):**

> "The order is: gain, less private residence relief, less lettings relief, **less any capital losses, less the £3,000 annual exempt amount**."

**Why wrong.** The two limbs behave differently and the copy collapses them:

- **Current-year losses** are deducted before the AEA and must be used in full even if that wastes the allowance. For this limb the stated order is right.
- **Brought-forward losses** are deducted **only to the extent that the year's gains (after current-year losses) exceed the AEA**. The allowance is protected; you carry the unused loss forward instead of burning it.

As written, a reader with brought-forward losses is told to deduct them before the £3,000 and therefore to throw the allowance away. On a residential gain that is £720 of tax at 24%, plus the permanent loss of carried-forward relief. It also makes the page inconsistent with the AEA depth guide it links to in the same breath.

**Correction.** Split the two limbs, e.g.: *"This year's capital losses come off before the annual exempt amount and must be used in full, even if that wastes some of the £3,000. Losses brought forward from earlier years come off last, and only so far as your gains still exceed the £3,000, so the allowance is never wasted on them."*

**Source:** HMRC Capital Gains Manual, Individuals: losses (CG21500 onwards) and the SA108 Capital gains summary notes; statutory home is the FA 2019 Sch 1 rewrite of the former TCGA 1992 s.3(5A) restriction. **Confirm the exact rewritten section number before it goes into copy** — the rule is settled, the post-rewrite citation is the bit I have not verified to the letter and should not be asserted on my say-so.

---

## ADVISORIES

### A1 — Dana's whole gain is taxed at 24% but her income is never stated, and the next section says the 18% band applies first

**Quoted:** "At the 24% higher rate for residential property: **£10,876.80** of capital gains tax" — against, one H2 later: "The 18% rate covers whatever part of the gain fits inside your remaining basic-rate band and 24% takes everything above it."

Dana's facts give her purchase price, occupation dates, floor area and sale price, but no income and no mention of her basic-rate band. The example then charges every pound of the £45,320 at 24%, which is only right if she has no basic-rate band left. A reader following the method with a modest income gets a different number and cannot see why. **Fix:** one clause in her facts — "Dana is a higher-rate taxpayer with no basic-rate band left" — and the figure stands as stated. (Both rates match §5; this is a completeness point, not a rate error.)

### A2 — "Complete on or after 6 April 2020" uses the wrong disposal-date test

**Quoted:** "**Complete** on or after 6 April 2020 and the restricted rules cover your entire letting history".

For CGT the date of disposal is the date of the **contract** (exchange), not completion — TCGA 1992 s.28 — and FA 2020 s.24 applies the s.223B rules to disposals made on or after 6 April 2020. The same paragraph opens correctly with "the date you sell", so only the word "complete" is off. It also sits awkwardly against the body's 60-day paragraph, where "60 days from completion" **is** correct (the 60-day clock genuinely runs from completion), so the page uses "completion" for two different tests without distinguishing them. The practical window this affects (exchanged before 6 April 2020, completed after) is six years stale, hence advisory rather than blocker, but the rule as stated is wrong. **Fix:** "Exchange contracts on or after 6 April 2020 ..." and, if worth a clause, note that the 60-day reporting clock is the one that runs from completion.

### A3 — The 36-month care-home / disabled final period is stated without its second statutory limb

**Quoted:** "The 36 months survives in one place: if you are disabled, or you move into a care home, the final period is still 36 months."

TCGA 1992 s.225E also requires that neither the individual nor their spouse or civil partner has any other interest in a dwelling-house that is their only or main residence at the time of disposal, and the care-home limb is a **long-term** resident test, not simply having moved in. As drafted the copy promises 36 months to someone who has bought elsewhere and would not get it. **Fix:** add the condition — "provided you (and your spouse or civil partner) do not have another property that is your main residence".

Minor related note, not worth its own finding: the final-period rule is irrelevant to Dana, who lived in the property until sale. The 36-month section is a search-intent grab rather than something the worked example touches, which is fine, but the two should not be read as connected.

### A4 — "HMRC does not want the worksheet with the return" is the wrong way round

**Quoted (new FAQ):** "**HMRC does not want the worksheet with the return**, but you need to be able to produce it".

The SA108 Capital gains summary notes ask you to provide your computations, either attached to the return (PDF on an online filing) or set out in the additional-information space, and to identify reliefs claimed. The advice as written points readers toward under-disclosure, which also costs them the protection that full disclosure gives on the enquiry window. **Fix:** "Attach or enter your computations with the return, as the SA108 notes ask, and keep the underlying working papers." The second half of the sentence (what the worksheet must show: whole gain, PRR given, let-attributable gain, the £40,000 cap, which limb was lowest) is correct and should stay.

### A5 — "The disposal still belongs on the Self Assessment pages" where the gain is nil

**Quoted (new FAQ):** "Where reliefs reduce the gain to nil, UK residents do not need the 60-day return **but the disposal still belongs on the Self Assessment pages**." Same claim in the body: "though the disposal still goes on your Self Assessment return."

The 60-day half is correct and matches §5. The SA half is overstated: a disposal of a residence that is wholly covered by PRR is generally not reportable on SA at all — it does not need to be entered merely because it happened, and HMRC's own report-and-pay guidance says so. The reporting triggers are gains above the AEA or disposal proceeds above the £50,000 threshold for chargeable assets, and a fully-PRR-relieved main residence is outside them.

**Scope note:** this claim is not original to the new copy — the protected "Reporting and records" section (line 354) already says "The disposal still appears on the SA108 capital gains pages of the Self Assessment return with the relief figures shown." The new FAQ is faithfully restating protected content. Flagging it because the brief asks for factual refutation, but the fix belongs to both places or neither, and the protected section is outside my scope to call.

### A6 — Flat "you get nothing on an annexe" contradicts the protected section's fact-specific position

**Quoted (new, "Who no longer qualifies after April 2020"):** "You also get nothing on a self-contained flat, **annexe** or basement with its own kitchen, bathroom and entrance".

**Against (protected, "When Lettings Relief still applies"):** "a self-contained annex within the main dwelling that is let to a tenant who shares common areas with the owner **may qualify (fact-specific on the 'shared' test)**."

These are reconcilable on a close read — the new copy's annexe has its own kitchen and bathroom, the protected one shares common areas — but a reader scanning for "annexe" gets "nothing" in one place and "may qualify" in the other. **Fix:** the cheapest change is to drop "annexe" from the absolutist list and let "self-contained flat or basement with its own kitchen, bathroom and entrance" carry it, since the protected section already handles the annexe case properly.

### A7 — The £80,000 couple figure omits that both owners must independently qualify

**Quoted:** "it goes per owner rather than per property, so **you and your partner could claim up to £80,000 between you**."

Per-owner is correct and matches §5, the protected spouse section and the protected table ("£40,000 cap — Same (per owner)"). But £80,000 requires both people to be beneficial owners **and** for each independently to clear the s.223B shared-occupation gateway, hold PRR on their share, and pass their own lower-of-three. The protected FAQ carries the caveat ("subject to the per-owner lower-of-three test"); the new plain-language version drops it, and £80,000 stated bare in the opening section is the number a reader will carry away. **Fix:** "...up to £80,000 between you, if you both own the property and you both lived there alongside the tenant."

---

## Summary for the brief

- Arithmetic: clean, every figure re-derived to the penny, no defects.
- §5 figures: clean — AEA £3,000, 18%/24%, final 9 months, all correct in every instance.
- §5 and §13 do-not-write lists: clean, all items.
- The failure is not in the numbers. It is that the flagship new worked example lands on the opposite side of the lodger/PRR question from the protected example directly below it, from the sibling PRR page, and from the gov.uk source this page cites (B1), plus a loss-ordering rule stated backwards in two places (B2).
