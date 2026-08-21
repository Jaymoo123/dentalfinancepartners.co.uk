# EDITORIAL QA: rural / landed-estates batch B

Date: 2026-08-21. Read-only pass, no edits made.
Judged against `briefs/property/rural-estates/_language_spec.md` (register spec) and the per-page
packs in `briefs/property/rural-estates/packs/`, not against taste.

Surfaces reviewed:

| # | Surface | Register band | Verdict |
|---|---|---|---|
| 1 | `Property/web/content/blog/farm-tax-uk-guide.md` | Consumer decision | **must_fix** |
| 2 | `Property/web/content/blog/how-to-avoid-inheritance-tax-on-a-farm.md` | Consumer head | **must_fix** |
| 3 | `Property/web/content/blog/maximising-business-relief-to-reduce-inheritance-tax.md` | Adviser reference (REFRAME) | **must_fix** |
| 4 | `Property/web/src/lib/calculators/tools/bpr-apr-allowance-calculator.ts` | Tool copy | **must_fix** |

Skimmed for cross-page comparison only, not graded here:
`inheritance-tax-on-farms.md`, `agricultural-relief-for-inheritance-tax-key-benefits.md`.

---

## 0. Measured baseline

Body prose only. Frontmatter (`summary`, `faqs:`) measured separately, per spec §1 method.
Tool measured on user-facing strings only (comments and identifiers stripped).

| Surface | Words | you/1k | Statute refs | Statute/1k | Em-dashes | Question H2s |
|---|---:|---:|---:|---:|---:|---|
| farm-tax-uk-guide | 2,008 | 33.4 | 2 (both in closing reference line) | 1.0 | 0 | 6 of 7 |
| how-to-avoid | 1,646 (1,599 excl. reference block) | 48.6 (50.0 excl.) | 0 in prose, 6 in closing block | 0.0 in prose | 0 | 8 of 9 |
| maximising-bpr | 2,942 | 24.8 | 4 | 1.4 | 0 | 5 of 10 |
| TOOL bpr-apr | 2,178 | **2.8** | **8** | **3.7** | 0 | n/a |

Targets: consumer head 20+ you/1k and 0 statute; consumer decision 15+ and 0-1; adviser 6+ and at
most 2. **Three of four hit or beat their second-person target.** The two register misses are the
tool's statute density (3.7 against an adviser ceiling of 2.0) and the tool's second person (2.8,
the least reader-present surface in the batch).

Clean across all four: zero em-dashes; zero US spellings; zero pricing; zero pipeline artefacts
(`TODO`, placeholders, brief references) in rendered copy; zero classic AI-tell phrases
(`important to note`, `it is worth noting`, `crucial`, `robust`, `navigate the landscape`,
`delve`, `when it comes to`, `in conclusion` all return no hits).

Arithmetic spot-checked and **correct on all four surfaces**, including the £900,000 SDLT
mixed-use comparison (£34,500 vs £80,000, saving £45,500), the £4m farm at £300,000, the
£3,800,000 Holloway estate at £460,000 / £360,000 / £100,000 saving, the £47,220 dividend
own-goal, and both calculator worked examples (£140,000 and £100,000).

---

## 1. CROSS-SURFACE SAMENESS (the primary hunt)

This is the batch's dominant defect and it is a **method** problem, not a sentence problem. Four
writers produced six surfaces that share the same paragraph architecture, the same pivot fragment,
the same closing move and the same four fact-sentences. A reader who lands on two of these pages in
one session will recognise the second as the same page.

### F1. The CTA is one template, used six times, and it exists nowhere else in the corpus. **must_fix**

Every surface closes on `We can produce a written {noun} for/on your {noun}`:

- `farm-tax-uk-guide.md:97`: "We can produce a written property tax position for the farm that puts the four taxes in one place"
- `how-to-avoid-inheritance-tax-on-a-farm.md:99`: "We can produce that written position for your farm"
- `maximising-business-relief-to-reduce-inheritance-tax.md:180`: "We can produce a written view on those three questions for your own asset structure"
- `inheritance-tax-on-farms.md:101`: "We can produce a written farm inheritance tax position for your family"
- `agricultural-relief-for-inheritance-tax-key-benefits.md:103` and `:200`: "We can produce a written qualification view on your holding" / "We can produce a written IHT agricultural relief view on your holding"

`grep -rl "We can produce a written" content/blog` returns **exactly 5 files, all of them this
batch**. The phrase is batch-local and batch-universal. Spec rule 9 offered the Pawson page's
"We can produce a written planning view tailored to your portfolio" as *the model*; every writer
copied the model as a *template*.

Two of them then land the same follow-on verb too:

- `farm-tax-uk-guide.md:97`: "get in touch and tell us what the holding looks like"
- `maximising-business-relief-to-reduce-inheritance-tax.md:180`: "Get in touch and tell us what the estate is made of"

**Cross-reference: this extends batch A finding S1, it does not duplicate it.** `EDITORIAL_batchA.md`
found the same template on its own four surfaces (`inheritance-tax-on-farms:101`,
`agricultural-relief:103` and `:200`, `landed-estates/page.tsx:461`, `iht-april-2026...:205`) and
adjudicated the fix: **the template stays on the pillar `page.tsx:461` and comes off everywhere
else.** Taken together the two passes show the formula on **all eight surfaces of both batches**,
and the corpus-wide grep confirms it appears nowhere in Property outside them.

**Fix.** Defer to batch A's adjudication: the pillar keeps it. All three blog surfaces graded here
(`farm-tax-uk-guide:97`, `how-to-avoid:99`, `maximising-bpr:180`) name a different deliverable and a
different doer. Suggested, one each and none of them a "written view":

- `farm-tax-uk-guide:97`: "Send us the acreage, what is let and what you are thinking of selling,
  and we will tell you which of the four taxes is actually your problem."
- `how-to-avoid:99`: "Send us your latest land valuation and the dates of any gifts, and we will
  tell you how many years of clock you have left and on what."
- `maximising-bpr:180`: "Send us the balance sheet and we will tell you what a claim would actually
  get, in figures a will draftsman can use."

Spec rule 9 asks for a named deliverable, not one named document type repeated eight times.

### F2. The "[Number] things" fragment pivot, twelve times across six surfaces. **must_fix**

Each surface uses a two-to-four-word count fragment as its section pivot:

- `farm-tax-uk-guide.md:53` "Two reliefs are worth knowing about before you accept an offer."
- `farm-tax-uk-guide.md:77` "Two things follow that catch people out."
- `how-to-avoid...md:45` "Two things push it higher."
- `how-to-avoid...md:91` "Two things do that work."
- `maximising-bpr.md:25` "Three things changed."
- `maximising-bpr.md:140` "Two things would change the answer."
- `inheritance-tax-on-farms.md:55` "Two things sit outside the pot."
- `inheritance-tax-on-farms.md:99` "Three things, in this order."
- `agricultural-relief...md:37` "Three things account for most refusals."
- `agricultural-relief...md:50` "Two limits are built into the relief and both of them catch people out."
- `agricultural-relief...md:118` "Four points about how it behaves."
- `agricultural-relief...md:167` "Two things fall out of that."

The closest pair is verbatim on the tail: `farm-tax-uk-guide.md:77` "…that **catch people out**"
against `agricultural-relief...md:50` "…both of them **catch people out**".

**Cross-reference: extends batch A finding S4.** Batch A logged eight instances on its four surfaces
(including `iht-april-2026...:183` "Two details change that sum.", `:203` "Three things follow for
you.", `landed-estates/page.tsx:248` "Two things change that answer quickly."). Adding batch B's,
the device runs to **sixteen instances across eight surfaces**, which is roughly one every 900
words of the whole cluster. Batch A's note applies: the spec does not ban the construction, four
writers landing on it independently is what makes it a finding.

**Fix.** Cap at one per page, which for the four graded here means cutting `farm-tax-uk-guide:53`,
`how-to-avoid:91` and `maximising-bpr:140` and keeping the other one on each page. Elsewhere lead
with the thing itself ("Converted holiday cottages stopped being a special category on 6 April
2025…") and let the count be implicit, or carry it in the list that follows rather than
announcing it.

### F3. The anti-forestalling clause is one sentence, reproduced on five surfaces. **must_fix**

Verbatim or near-verbatim tail "…**where the donor dies on or after 6 April 2026 and within seven
years of the gift**":

- `how-to-avoid...md:25` (FAQ): "…to lifetime transfers made on or after 30 October 2024 where the person making the gift dies on or after 6 April 2026 and within seven years of the gift."
- `maximising-bpr.md:91`: "The new rules bite on lifetime gifts made on or after 30 October 2024 where the donor dies on or after 6 April 2026 and within seven years of the gift."
- `inheritance-tax-on-farms.md:31`: "The new rules catch lifetime gifts made on or after 30 October 2024 where the donor dies on or after 6 April 2026 and within seven years of the gift."
- `agricultural-relief...md:35` and `:179`
- `bpr-apr-allowance-calculator.ts:87`, `:175`, `:186`, `:213` (four times inside one file, see F21)

Only the finite verb changes: bite / catch / applies / brings / reduce. The 22-word tail is
identical.

**Fix.** One surface per phrasing. Suggested split, so each surface owns a different angle on the
same rule: the consumer head page states it as a date test in the reader's words ("If you gave land
away after 30 October 2024 and you die before you have had it seven years, the new rules apply to
that gift"); the adviser page states it as the donor test; the tool's field help states it as an
input instruction; `inheritance-tax-on-farms` keeps the "which gifts count" framing it already has.

### F4. "effective 20% inheritance tax on the excess", six surfaces, one sentence shape. **must_fix**

The batch's central conversion arrives in near-identical words everywhere. Closest pairs:

- `how-to-avoid...md:17`: "…is relieved at 100%, and value above that gets 50% relief, **which works out as an effective 20% inheritance tax on the excess**."
- `maximising-bpr.md:17`: "…and 50% relief on anything above that, **which works out as an effective 20% inheritance tax rate on the excess**."

and

- `inheritance-tax-on-farms.md:23`: "Above it the rate drops to 50%, **which produces an effective 20% inheritance tax charge on the excess**."
- `maximising-bpr.md:25`: "…value above that allowance drops to 50% relief, **giving an effective 20% inheritance tax charge on the excess**."

Also `farm-tax-uk-guide.md:17,23,43`, `bpr-apr-allowance-calculator.ts:53,185`,
`agricultural-relief...md:116`.

Spec rule 5 requires the conversion on every page, so the *fact* must stay on all six. The
*sentence* must not.

**Fix.** Give each surface a different vehicle for the same number, which is also better copy on
each: the consumer head page owns the pound conversion it already has at `:43` ("Every pound above
your allowance costs your family 20p"); `inheritance-tax-on-farms` owns the whole-farm percentage
("6.3% of the whole £3,650,000"); the tool owns the computed output row; `maximising-bpr` owns
"40% of half of £500,000"; `farm-tax-uk-guide` owns "A million pounds above the allowance costs
your family £200,000, not £400,000". Delete the "which works out as an effective 20%…" clause
wherever a page already carries its own conversion.

### F5. Two more shared fact-sentences. **must_fix**

**Spouse transfer**, verbatim opener on three surfaces:
- `farm-tax-uk-guide.md:23` "Unused allowance passes to a surviving spouse or civil partner, so a couple can cover up to £5 million between them."
- `maximising-bpr.md:39` "Unused allowance passes to a surviving spouse or civil partner, which is why couples are commonly described as having up to £5,000,000 between them."
- `maximising-bpr.md:87` "Unused allowance passes to a surviving spouse or civil partner in the same way the nil-rate band does…" (**also a same-page self-duplication, see F9**)
- cf. `agricultural-relief...md:121` "Unused allowance transfers to a surviving spouse or civil partner, in the same way the nil-rate band does."

**AIM definition**, verbatim on three surfaces: "shares designated as not listed on the markets of
recognised stock exchanges" at `maximising-bpr.md:99`, `inheritance-tax-on-farms.md:33`,
`bpr-apr-allowance-calculator.ts:79` and `:185`. This is the statutory formula, so it is defensible
once. On a consumer page it should be "AIM shares" and nothing else.

**"reading the announcement rather than the Act"**, verbatim on two:
- `bpr-apr-allowance-calculator.ts:193` "Any adviser or article still quoting £1 million is reading the announcement rather than the Act."
- `agricultural-relief...md:127` "If an adviser or an article quotes £1 million to you as current law, they are reading the announcement rather than the Act."

### F6. "Honest" used six times as a claim about our own copy. **must_fix**

- `farm-tax-uk-guide.md:39` "there is an **honest** list of what that includes near the end"
- `how-to-avoid...md:17` "It ends where **honest** advice sometimes has to end"
- `how-to-avoid...md:87` "`<h2>`What if the **honest** answer is that your family will have to pay?"
- `maximising-bpr.md:138` "That arithmetic is the **honest** case for and against acting"
- `maximising-bpr.md:176` "the **honest** answer is that this relief is not your route"
- `agricultural-relief...md` (1 further instance)

Four writers reached for the same self-describing adjective. Telling the reader the page is being honest
is weaker than the page being honest; it is also the tell that gives the batch a single voice.

**Fix.** Keep at most one, on `how-to-avoid` where the concession is the section's actual subject
(`:87`). Delete the rest. `maximising-bpr.md:176` reads better as "this relief is not your route";
`farm-tax-uk-guide.md:39` should not describe its own list at all (see F7).

---

## 2. SURFACE 1: `farm-tax-uk-guide.md` = must_fix

**Register: PASS.** 33.4 you/1k against a 15+ target. Zero statute in the prose body. 6 of 7 H2s
are complete reader questions, the highest share in the batch. Answer-first in every section
("Only on the value above £2.5 million", "Yes.", "You pay it, and you pay it at the non-residential
rates", "The rent-shaped kind.", "Plenty.", "With the qualifying value on paper."). This is the
W4 shape the pack asked for and it is executed well.

**Conceded-topic signposts (hunt d): PASS.** All five bullets at `:86-90` are exactly one sentence
after the bold label (herd basis, farmers' averaging, BPS/SFI, agricultural tenancy law, farm
accountancy generally). None has grown a second sentence or a sub-heading. None is apologetic: each
names the topic, states who owns it, and stops. The section's opener at `:83` ("Plenty. A farming
family needs advice that reaches well beyond the four property taxes above, and we would rather
point you at the right person than write a thin version of their work.") reads as a scope statement
and not as a disclaimer. **Pack acceptance criterion 3 is met.**

### F7. Two paragraphs describe the page to the reader instead of answering. **must_fix**

`:39` (second paragraph of the page): "It does not cover the other half of farming taxation, the
half that lives in your farm accounts, and **there is an honest list of what that includes near the
end rather than a pretence that this page is everything**."

`:47` (first sentence): "**This page states the position and stops.**"

Spec rule 4 forbids opening on our own corpus, and rule 10 forbids the "the pages compound" move,
naming our APR page's closing sentence as the failure. Both sentences here are the same move: the
reader is told about the page's architecture rather than about their farm. `:39` is in the position
where the spec's P1 says the query gets answered.

**Fix.** `:39` becomes a scope sentence with the reader as subject and no self-reference: "It does
not cover the half of farming tax that lives in your farm accounts, and the section near the end
says who does." Or cut the clause entirely and let the section at `:81` do its own work, which it
already does. `:47` opening becomes the fact: "The depth on the allowance sits elsewhere." Or delete
and start the paragraph at "The consumer walk-through…".

### F8. `:47` is a five-link manifest presented as a paragraph. **must_fix**

Quoted in full:

> "This page states the position and stops. The consumer walk-through of how the allowance applies
> to a working farm is in `inheritance tax on farms`, the wider picture across a whole rural holding
> is on our `landed estates hub`, and the technical detail of the cap, including how lifetime gifts
> consume it, is in `the April 2026 BPR and APR cap` and `Agricultural Property Relief and the
> qualification gate`. If your holding mixes farmland with let property, `the mixed estate
> allocation problem` is the one to read, because the trading and agricultural parts compete for
> the same allowance."

Five internal links, 84 words, and the paragraph's subject is our own information architecture
throughout. The pack required links out to the siblings (criterion 6), so the links stay; the
inventory framing goes.

**Fix.** Distribute. One link where the reader hits the need: put the `inheritance-tax-on-farms`
link on the sentence that raises the qualifying-value question at `:45`, put the mixed-estate link
in the diversification section at `:77` where let property is already the subject, and keep at most
two links in this paragraph. The same problem recurs in the closing paragraph of surface 2 (F13).

### F9. Word count 2,008 against a pack ceiling of 1,600. **must_fix**

Pack acceptance criterion 1: "900-1,600 words". Body prose measures 2,008, over by 408 words (25%).
Spec rule 11 says word count is not a lever in this cluster, so the overshoot buys nothing.

**Fix.** The 408 words are recoverable from F7 and F8 alone (about 120), plus the closing external
sources line (F10, about 70), plus tightening the CGT section at `:51-55` which is the longest
signpost section on a page whose pack says explicitly "does NOT attempt protaxaccountant's depth"
(criterion 5) and restricts the CGT treatment to "1-2 short paragraphs". It currently runs three
paragraphs and 340 words.

### F10. The page closes on a bibliography. **must_fix (spec conflict noted)**

`:99`, the page's last block: "External sources used on this page: `section 124D of the Inheritance
Tax Act 1984` for the £2.5 million allowance, `the non-residential stamp duty rate table`,
`gov.uk capital gains tax rates` and `gov.uk guidance on working out rental income`. Figures
verified to August 2026."

Spec rule 10 is unambiguous: "No closing bibliography… Close on the reader's next decision." The
spec's P7 quotes our Pawson page's closing block as the named failure and this is the same shape.

The conflict to record: spec §3's prescription table permits "Move citations out of prose into a
single reference line", but that row applies to **"Existing four pages in this family | Adviser,
corrected"**, not to net-new consumer pages. Both surfaces 1 and 2 are net-new consumer pages, so
the concession does not reach them. Note also that the two batch siblings resolve this correctly:
`agricultural-relief...md:192` and `maximising-bpr.md:94` both put their reference block in a
mid-page `<aside>` and close on the reader.

**Fix.** Move to a mid-page `<aside>`, matching the two siblings, or drop it: this page carries no
statute in prose, so there is nothing for a reference line to discharge. The last thing the reader
sees should be `:97`, which is already a good close.

### Also on this surface

- Shares F1 (CTA template), F2 (`:53`, `:77`), F4, F5, F6.
- `:79` mixed metaphor: "leaves property tax territory for your farm accountant's ground instead".
  Territory and ground are the same figure used twice. Cut to "…and belongs with your farm
  accountant."
- No personas. No banned-list name. No pricing. Verified.

---

## 3. SURFACE 2: `how-to-avoid-inheritance-tax-on-a-farm.md` = must_fix

**Register: PASS, and it is the strongest register performance in the batch.** 48.6 you/1k against
a 20+ target, more than any winner in the measured set including W6 at 40.9. **Zero statute
references in the prose** (all six sit in the closing reference block). 8 of 9 H2s are complete
reader questions. The opening sentence is exactly the P1 pattern: "You cannot avoid inheritance tax
on a farm entirely, and anyone telling you otherwise is selling something." Answer, then
qualification, reader as subject, no citation.

**Personas: PASS.** No named person anywhere, as declared. No collision with the banned list
(Yusuf, Lars, Marcus, Bev, Dele, Priya, Farah, Nadia, Tom, Sunita, Bola, Idris, Dermot, Renata,
Callum, Fergal, Rafiq, Orla, Bernadette, Helen, Whitfield all return zero hits on all four
surfaces).

**"What does not work" (hunt g): mostly PASS, one fix.** The section at `:71-85` is a genuine
section, not a throwaway line, and all three required items are named (deathbed gifting,
reservation of benefit, artificial fragmentation). Each is stated as failing, not as attemptable:
"does nothing for the tax", "there is no shortened clock and no exception for illness", "stopped
working on 30 October 2024", "five trusts get you one allowance split five ways". The intro at
`:73` ("none of them survives contact with the rules") sets the register correctly. **Pack
acceptance criterion 4 is met.** One sentence breaks it, below.

### F11. `:81` offers a workaround inside the "what does not work" section. **must_fix**

> "**The ways round it** all involve genuinely giving up the benefit: you move out, or you pay a
> full market rent to the new owner and keep the evidence."

The substance is correct and worth keeping. "The ways round it" is the problem: in a section whose
job is to close three doors, the phrase reads as reopening one, and "ways round it" is the register
of scheme-promotion that the pack's §1 framing constraint rules out ("no deathbed-planning or
artificial-fragmentation content presented as if it worked"). A reader skimming H3s sees "Gifting
the farmhouse and carrying on living in it" and then "the ways round it".

**Fix.** Reframe as a condition on the gift rather than a workaround on the rule: "The only thing
that makes the gift real is giving up the benefit for good: you move out, or you pay a full market
rent to the new owner and keep the evidence. Anything short of that leaves the farmhouse in your
estate."

### F12. "Anti-forestalling" is jargon and it is in an H2 on a consumer head page. **must_fix**

`:51`: `<h2>What does the anti-forestalling rule do to a gift you have already made?</h2>`

Spec §1 counts "anti-forestalling" in its jargon-noun set, where the winner rate is 0.0 per 1,000
words across all seven winners. The term appears four times on this page (`:17`, `:25`, `:51`,
`:97`). Spec rule 7 requires consumer H2s to be "a complete question **in the reader's words**". No
farmer types "anti-forestalling". The pack requires the *rule* to be explained in full (criterion
3) but never requires it to be named.

**Fix.** H2 becomes the reader's question: "Does a gift you have already made still count?" or
"What happens to land you gave away in 2025?". Keep the mechanics underneath exactly as written,
they are good. Drop the term from `:17` and `:97`; keep at most one naming, in the FAQ at `:25`
where a reader who has heard the term from an adviser can match it.

### F13. Closes on a five-citation reference block, on a zero-statute consumer page. **must_fix**

`:101`: "**Reference.** The £2.5 million 100% relief allowance: `IHTA 1984 s.124D`. Seven-year rule
for gifts: `IHTA 1984 s.3A`. Spouse and civil partner exemption: `IHTA 1984 s.18`. Reservation of
benefit: `FA 1986 s.102`. Payment by instalments on land: `IHTA 1984 s.227`. Verified against
legislation.gov.uk on 21 August 2026."

Same finding as F10, worse in degree: six statute references, on the batch's purest consumer page,
as the page's final move. The pack's own acceptance criterion 8 sets the statute floor at
"0/1,000 words in prose, consumer-head band"; the prose passes and the closing block puts them back.

**Fix.** Delete, or move to a mid-page `<aside>` per the two siblings. Nothing in the prose cites a
section, so there is nothing to discharge. Close on `:99`.

### F14. `:99` closes with "Use the form below" plus a four-link run. **must_fix**

> "We can produce that written position for your farm: … **Use the form below**, with your latest
> land valuation and the dates of any gifts. Size the allowance yourself with `our BPR and APR
> allowance calculator`, read `the mixed-estate position` if you also let property, `our page on the
> April 2026 cap` for the reform itself, and `our landed estates hub` for everything else."

Two problems. First, spec rule 9 names "use the form at the foot of the page" as the anti-pattern by
which three of our four existing pages end; the deliverable *is* named first here, which is the
important half, but the banned phrase shape survives. Second, the four-link run repeats surface 1's
F8 problem, and "our landed estates hub **for everything else**" is filler: it tells the reader
nothing about why to click.

**Fix.** "Send us your latest land valuation and the dates of any gifts and we will run it." Move
the calculator link up into the arithmetic section at `:43` where the reader is doing the sum, and
keep at most one link in the close.

### F15. The page's AIM stance contradicts the tool's. **must_fix (pick one)**

- `how-to-avoid...md:67`: `<h2>Do AIM shares still help a farming estate?</h2>` / "**They do**, and
  the reason is easy to miss."
- `bpr-apr-allowance-calculator.ts:208`: "**Anyone who bought AIM stock purely as an inheritance
  tax shelter is now holding a higher-risk portfolio for half the relief it was bought for**, which
  is worth revisiting on its own merits."

Both are defensible readings of the same change, but a consumer reading the blog page gets "they
help" and an adviser reading the calculator gets "revisit it". The consumer page does hedge at `:69`
("Whether AIM suits you is an investment question, not a tax one"), which is the right instinct, but
the H2 has already answered "They do".

**Fix.** Align on the tool's stance, which is the more defensible one for a page called "how to
avoid". H2: "Do AIM shares still do anything for a farming estate?" Answer: "Less than they did, and
the part that survives is easy to overrate." Then the (correct and genuinely useful) point that the
50% tier does not consume the £2.5m allowance.

### Also on this surface

- Shares F1, F2 (`:45`, `:91`), F3, F4, F5, F6.
- Word count 1,646 against a pack range of 700-1,600. Marginal; 1,599 once the F13 block is
  removed, which puts it inside the band. Not a separate fix.
- No pricing, no product or insurer named (the insurance mention at `:93` is generic, per pack
  criterion 5). Verified.

---

## 4. SURFACE 3: `maximising-business-relief-to-reduce-inheritance-tax.md` = must_fix

**Register: PASS on every measured axis, and this is a large improvement on the pre-reframe page.**
Statute 1.4/1k against a ceiling of 2.0 (was 20.1, the worst in the measured set). Second person
24.8/1k against a floor of 6.0 (was 0.4). Case-law citations down to one case, Pawson, which is the
page's own gate and therefore permitted by spec rule 2 (was 20). Zero statute references in any of
the 15 headings, per rule 3. Opens answer-first at `:42` with no citation, per rule 4. Closes on the
reader's decision, not on a bibliography, with the reference material correctly placed in a mid-page
`<aside>` at `:94`. **Pack acceptance criteria 6, 7 and 8 are met.**

The findings below are about surface texture, not register.

### F16. Keyword-lists-as-prose: thirteen grafts, one six-item list. **must_fix**

Worst instance, `:50`, quoted in full:

> "You will see the same relief called several things, and the variety is not a signal of anything.
> HMRC now calls it Business Relief. **Advisers, textbooks and search boxes still say Business
> Property Relief, BPR, BPR relief, business relief IHT, inheritance tax BPR or IHT business
> property relief.** The Act itself uses none of them: the definition of BPR you will find in the
> legislation is really a definition of the assets that get it, which it calls relevant business
> property. **Business Property Relief inheritance tax** claims are made by your executors on form
> IHT413."

Six keyword permutations in one sentence, then a seventh grafted onto the following sentence as its
subject. The same sentence is duplicated in the FAQ at `:19` with four further variants ("business
relief IHT, BPR IHT, business relief tax and business relief inheritance tax").

The remaining grafts, each a keyword permutation used as a noun phrase where plain English would do:

| Line | Graft | Plain reading |
|---|---|---|
| `:48` | "The **BPR meaning** in one line" | "In one line" |
| `:56` | "**Business property relief examples** that qualify include a sole trade…" | "What qualifies includes a sole trade…" |
| `:60` | "The **business property relief shares test** asks about the activity…" | "The test asks about the activity…" |
| `:64` | "the **inheritance tax Business Property Relief rules** are of no help" | "the relief is of no help" |
| `:101` | "which is a **BPR tax saving** of £100,000" | "which saves £100,000" |
| `:101` | "**Business relief qualifying investments** are not a separate category" | acceptable, the sentence is about the term |
| `:172` | "The **APR Budget announcement** of 30 October 2024" | "The Budget announcement of 30 October 2024" |
| `:180` | "setting out your **BPR inheritance tax position**" | "setting out where you stand" |

**Cross-page note.** The sibling `agricultural-relief-for-inheritance-tax-key-benefits.md` runs the
identical technique eight times ("Most **agricultural relief inheritance tax** questions come down
to…" `:42`; "**agricultural inheritance tax relief** only covers…" `:50`; "The **agricultural
property relief inheritance tax** rules changed…" `:116`; "**IHT agricultural property relief**
claims run on two forms" `:187`; "Every **inheritance tax agricultural relief** claim…" `:189`;
"Your **agricultural relief IHT** position…" `:198`). Two writers, same habit, different relief.
This is a batch-level technique finding, not a one-page one. `EDITORIAL_batchA.md` logs the
agricultural-relief half independently ("Eight keyword permutations of 'agricultural relief
inheritance tax' used as prose"); the finding here is that the **same technique** recurs on a
different page by a different writer, which makes it a house habit to correct rather than one
writer's tic.

**Fix.** Keep the variant-naming paragraph, it does real work for a reader who has met three names
for one relief, but state it as a fact rather than as a list: "HMRC calls it Business Relief.
Advisers and textbooks still say Business Property Relief or BPR. The Act calls the assets relevant
business property and never names the relief at all, so nothing turns on which name a guide uses."
Delete the FAQ duplicate at `:19` or reduce it to one line. Replace the eight grafts with the plain
readings above.

### F17. The £1m correction is written twice, near-verbatim, on the same page. **must_fix**

- `:27` (FAQ): "The GOV.UK announcement page was never updated and still carries the old number,
  and a good many adviser guides copied it from there."
- `:89` (body): "the GOV.UK announcement page was never updated and still carries the old figure,
  and many guides simply copied it."

One word apart ("number"/"figure", "a good many adviser guides copied it from there"/"many guides
simply copied it"). Both paragraphs also carry the same £1,500,000 headroom consequence
(`:27` "will understate the relief available to you by £1,500,000 of value" / `:89` "you have been
given £1,500,000 less headroom than you actually have").

**Fix.** The body paragraph at `:89` is the better written of the two and should stay. Cut the FAQ
answer at `:27` to its first two sentences: "£2,500,000. The £1 million figure was announced on
30 October 2024 and raised before the legislation was finalised; the enacted figure is in IHTA 1984
s.124D."

### F18. "Mr Holloway" collides with an established Property persona of the same surname. **must_fix**

`:105`, `:146`, `:154` introduce "Mr Holloway", 65, founder of an engineering company since 1995,
wife died 2018, £3,800,000 estate.

`Holloway` is already a named recurring persona family across **fourteen** Property blog files,
several of which declare it explicitly (`gift-with-reservation-of-benefit.md` carries
"Persona: Holloway-family." and "Mrs Holloway, widowed, 76", against a £900,000 London home;
`inheritance-tax-and-the-family-home.md` runs "the Holloways" as a worked family). A 65-year-old
widowed engineering-company founder in the same corpus, on an IHT page, under the same surname, is
either a contradiction or an accidental second wife.

Separately: `Holloway Davies` is the estate's own generalist trading brand, which makes the surname
a poor choice for a Property persona in any case.

**Cross-reference.** `EDITORIAL_batchA.md` §(d) treated `Holloway` as an exclusion-list name when it
adjudicated its own persona collision: "No reuse of Yusuf, Lars, Marcus, Bev, Dele, Priya, Farah,
Nadia, Tom, Sunita, Bola, Idris, Dermot, Renata, Callum, Fergal, Rafiq, Orla, Bernadette **or
Holloway** on any of the four surfaces." Batch A's surfaces are clear; this one is not. Batch A also
renames its own colliding persona (Helen on `inheritance-tax-on-farms`, proposed "Malcolm Rees"), so
both batches need one rename each and the two replacements must be checked against each other.

The declared risk (collision with the banned list) is **clear**: no surface uses Yusuf, Lars,
Marcus, Bev, Dele, Priya, Farah, Nadia, Tom, Sunita, Bola, Idris, Dermot, Renata, Callum, Fergal,
Rafiq, Orla, Bernadette, Helen or Whitfield. The collision is with our own house persona instead.

**Fix.** Rename to a surname unused in the Property corpus and not a sibling brand. Three
substitutions in this file (`:105`, `:146`, `:154`) plus the pronoun runs around them. Check the
replacement against the same fourteen-file list before committing.

### Also on this surface

- Shares F1 (`:180`), F2 (`:25`, `:140`), F3 (`:91`), F4 (`:17`, `:25`, `:52`), F5 (`:39`, `:87`,
  `:99`), F6 (`:138`, `:176`).
- The worked example at `:103-140` is genuinely good and should survive edit intact. `:138`
  ("The company grew by £1,000,000 and moving it out of his estate saved £100,000, not £400,000…
  which is 40% of half of £500,000") is the batch's single best piece of writing: it computes the
  number, then argues against the reader's intuition using it, then states the case against acting.
  Spec rule 11 says worked examples are not a lever in this cluster but should be kept where they
  help an adviser page. This one helps.
- No pricing. UK English. Zero em-dashes. Verified.

---

## 5. SURFACE 4: `bpr-apr-allowance-calculator.ts` = must_fix

**Arithmetic: PASS.** Both worked examples recompute correctly (£140,000 and £100,000), the
effective-rate row resolves to "20% of £500,000, which is £100,000", the AIM sub-tier is correctly
kept out of the allowance netting, and the anti-forestalling consumption branch reduces headroom as
the brief specifies. `note` correctly scopes out NRB, RNRB, the 36% charity rate and trust-side
allowances. `ponytail:` comment at `:33-39` names its own ceiling and upgrade path. Zero em-dashes,
no pricing, UK English, no personas.

### F19. Statute density is 3.7/1k in user-facing copy, and the headline figure arrives inside its
citation. **must_fix**

Eight statute references across 2,178 words of rendered copy, against an adviser ceiling of 2.0/1k
(spec rule 1) and a winner maximum of 0.8. The worst instance is `:193`, the first FAQ:

> "The enacted **quantum** in **section 124D(2)(a) of the Inheritance Tax Act 1984**, inserted by
> **Schedule 12 to the Finance Act 2026**, is £2,500,000."

Three statute references and a jargon noun wrapped around the one number the whole tool exists to
communicate. Spec P4 is explicit: "The number goes early in the sentence and stands alone, without
its authority", and quotes W3 spending 27 words and no citation on this exact fact.

Also `:183` in the explainer: "…inserted into the Inheritance Tax Act 1984 as section 124D by the
Finance Act 2026."

**Fix.** `:193` becomes: "£2,500,000. The £1 million figure was announced at the Autumn Budget 2024,
raised before the legislation was finalised, and never corrected on the GOV.UK summary page. The
enacted figure is £2,500,000." Keep one citation for the whole tool, in the `note` or a single
reference line, not one per FAQ. Three of the eight references then go.

### F20. "Quantum" is a spec-counted jargon noun, used twice. **must_fix**

`:193` "The enacted quantum…" and `:10` (comment, not rendered). Spec §1 lists `quantum` in the
jargon set it counts; the winner rate is 0.0 per 1,000 words across all seven winners and 10,827
words. "Anti-forestalling" also appears four times in rendered copy (`:87`, `:175`, `:186`, `:213`),
same jargon set, same F12 finding as surface 2.

**Fix.** "quantum" becomes "figure" or "amount". Name "anti-forestalling" at most once, in the FAQ
at `:213` where a reader who met the term elsewhere can match it.

### F21. The anti-forestalling clause appears four times inside one file. **must_fix**

- `:87` field help: "Qualifying property given away on or after 30 October 2024 where the donor dies on or after 6 April 2026 and within seven years of the gift."
- `:175` note: "Gifts of qualifying property made on or after 30 October 2024 reduce the allowance available on death where the donor dies on or after 6 April 2026 and within seven years of the gift."
- `:186` explainer: "Lifetime transfers of qualifying property made on or after 30 October 2024, the date of the announcement, are brought inside the new rules where the donor dies on or after 6 April 2026 and within seven years of the gift."
- `:213` FAQ: "The anti-forestalling rule applies the new rules to lifetime transfers made on or after 30 October 2024 where the donor dies on or after 6 April 2026 and within seven years of the gift."

Plus the "Gifts made before 30 October 2024 are not caught / are outside that rule / sit outside the
rule" companion at `:87`, `:175`, `:186` and `:213` as well. A reader who scrolls the whole page
reads the same 22-word clause four times.

Some restatement is inherent to the format (field help, note, explainer and FAQ serve different
readers arriving by different routes). Four verbatim copies is not that.

**Fix.** Field help becomes an input instruction, which is what a field help is for: "Enter the
value of qualifying property you have given away since 30 October 2024. Gifts made before that date
do not count." Note keeps the mechanism in one sentence. Explainer keeps the full statement. FAQ
answers the reader's actual question ("Can I give the farm away now to avoid the cap?") without
restating the rule a fourth time.

### F22. Two output rows carry the same number under two labels. **must_fix**

`:142` `{ label: "Allowance used", value: gbp(relievedFull) }`
`:144` `{ label: "Value relieved at 100%", value: gbp(relievedFull) }`

Identical value, adjacent-but-one in an 12-row output table. A user reading the result sees
"£2,500,000" twice and looks for the difference. There is none: allowance used *is* the value
relieved at 100%.

**Fix.** Drop `:142`. `:143` "Allowance remaining" still gives the reader the headroom number,
which is the useful half of the pair. Twelve rows is already at the top end for a result table.

### F23. `note` is a single unbroken ~200-word paragraph. **must_fix**

`:177`, the always-on tail of `note`, runs from "This tool assumes every figure you entered already
qualifies…" to "…Get the qualification tested before you rely on any of these numbers." without a
break, and covers: the qualification assumption, APR occupation and ownership, BPR mainly-trading,
the Pawson line, buy-to-let, HMOs, serviced accommodation, NRB, RNRB and its £2m taper, the 36%
charity rate, trust-side allowances, and a closing instruction. Twelve subjects, one paragraph, in a
UI element below a result.

The content is correct and the honesty is exactly what the brief asked for ("Honest `note`… the tool
assumes the values entered already qualify; nil-rate bands and RNRB are OUT of this tool's scope and
said so"). The delivery buries it.

**Fix.** Split into two or three strings joined with a break, or lead with the one sentence that
matters ("This tool assumes every figure you entered already qualifies, and that is the hard part
rather than the arithmetic") and move the scope-out list to the existing FAQ at `:221`, which
already asks "What is not in this calculator?" and answers it. Currently that FAQ and the note say
the same thing twice.

### F24. Second person at 2.8/1k, the least reader-present surface in the batch. **should_fix**

The spec sets no band for tool copy, so this is not a rule breach. It is a contrast worth recording:
the four blog surfaces run 24.8 to 48.6 and the tool runs 2.8. The field help and explainer are
written about "the donor", "the estate", "an estate £1,000,000 over the line" and "a farmer with
£2,000,000 of qualifying farmland". The FAQ questions are correctly first-person ("Can I give the
farm away now?", "Does my buy-to-let portfolio use up the allowance?") and their answers do reach
for "you", which is why the file is not lower still.

**Fix (optional, cheap).** The four field `help` strings are where the reader is actually acting.
"Enter the agricultural value of land, farmhouses and farm buildings **you** own that already meet
the occupation and ownership tests" costs nothing and puts the reader in the sentence at the point
of input.

### Also on this surface

- Shares F3 (four times, see F21), F4 (`:53`, `:185`), F5 (`:79`, `:185`, `:218`).
- `ctaLabel` "Farm, trading business or mixed estate? Talk to us →" is correct house convention
  (checked against 12 sibling tools, all question-plus-arrow) and is the one CTA in the batch that
  does **not** share the F1 template. Good.
- `:203` names Pawson without a citation, which is the correct treatment under spec rule 2.

---

## 6. Adjacent observations (outside the four graded surfaces)

Recorded because they were surfaced by the cross-page comparison and affect pages these four link
to heavily. Not graded, not in scope, flagged for whoever owns those pages.

1. **`inheritance-tax-on-farms.md:97`**: `<h2>What should you do before 6 April 2026?</h2>` on a
   page dated `2026-08-21`. The deadline is four months in the past. Both graded consumer surfaces
   link to this page as the diagnostic sibling.
2. **`agricultural-relief-for-inheritance-tax-key-benefits.md`** writes "per cent" throughout while
   the other five surfaces write "%". A batch-level house-style inconsistency.
3. **Generator field drift**: `farm-tax-uk-guide` and `how-to-avoid` carry
   `generator: "opus/netnew-rural-estates-cluster"`; `inheritance-tax-on-farms` carries
   `generator: "opus/netnew-rural-cluster"`. Frontmatter only, not rendered.

---

## 7. Fix ordering, if the batch is being repaired in one pass

1. **F18 (persona rename)**: the only finding that is factually wrong rather than stylistically
   repetitive, and it touches three lines.
2. **F1, F2, F4, F6**: the four sameness tics. These are the batch's defining problem and they are
   cheap: roughly thirty sentence-level edits spread over six files, no restructuring.
3. **F10, F13**: the two closing bibliographies. Decide the spec conflict once and apply it to both.
4. **F16, F17, F21, F22**: per-surface repetition and keyword grafts.
5. **F7, F8, F9, F12, F14, F19, F20, F23**: the remaining per-surface items.
6. **F11, F15**: the two stance items, which need a decision before an edit.

Nothing here requires a rewrite. The register work in this batch is largely successful; three of
four surfaces hit or beat their second-person and statute targets, the arithmetic is right
everywhere, and the em-dash, spelling, pricing and AI-tell sweeps all come back clean. The defect is
uniformity, and uniformity is fixed one sentence at a time.
