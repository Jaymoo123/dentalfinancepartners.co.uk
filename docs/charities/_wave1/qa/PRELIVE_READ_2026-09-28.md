# Pre-live sceptical read: charities (Trustee Tax), Leads-250 Wave 1

Read 2026-09-28, independent of Track A and Track B. Read-only pass. Scope: 7 segment rows
(5 audience rows in `charities/web/src/data/charity-types.ts`, 2 service rows in
`charity-services.ts`), 8 new posts in `charities/web/content/blog/`, plus the two templates
that render them, the entity copy in `charities/niche.config.json` and the terms page.

**Counts: READY 13 / FIX-FIRST 2 / NOT-READY 0.**

Both FIX-FIRST pieces fail on the same cause and the same one-line fix: the
`services/[slug]` template does not mount the shared `EntityBlock`, so the two service rows
render without "how it works", "what happens after the form" and "what we are not". The
content of both rows is otherwise the strongest on the site.

## Piece table

| Piece | Type | Changed since QA | Grade | The decider's question this answers | Specific | Banned-string hits | Reason |
|---|---|---|---|---|---|---|---|
| `cics` (`/for/cics`) | segment page | y (`25a7470e`, one card body de-claimed) | READY | "We run a CIC, we keep being told we cannot claim Gift Aid, should we convert to a charity?" | yes | none | Opens on the tax position, not on a definition; the conversion question is named as the decision behind most CIC enquiries and tested against income mix. CIC34 fee stated as "a filing fee applies" with no amount, which is what house position 24's FLAG requires |
| `cios` (`/for/cios`) | segment page | n | READY | "We are converting into a CIO. What moves across, and what do we now file?" | yes | none | The two conversion routes are separated correctly (company converts and keeps its number and bank accounts; unincorporated does not convert), which is the thing a decider gets wrong. Audit gate published with both limbs |
| `small-charities` | segment page | n | READY | "Our income is under the threshold. Do we need an accountant at all?" | yes | none | Answers "no" in the first FAQ and then sells the light-touch arrangement instead. The only page on the site that offers a smaller engagement rather than a service |
| `trustees-and-treasurers` | segment page | n | READY | "I have inherited the books. Which accounts format and which scrutiny level apply to us?" | yes | none | Leads on the three decisions, and the audit asset limb is called out as the trap with a worked case (£400,000 income, £4m building) |
| `grant-making-trusts-and-foundations` | segment page | n | READY | "Can we spend into the endowment, and how do we disclose grants to bodies our trustees run?" | yes | none | Endowment, total return and grant-commitment timing are the right three for a family foundation. See the ground-truth note below on the £25,000 and 25% figures |
| `charity-registration` (`/services/charity-registration`) | segment page | y (`25a7470e`, unrelated row) | FIX-FIRST | "We took donations before registering. What do we file and what do we lose?" | yes | none | Copy is READY. The route does not render the entity block, so the page never says what happens after the form or that we are not an accountancy practice |
| `charity-payroll-and-pensions` | segment page | y (`25a7470e`, unrelated row) | FIX-FIRST | "We are about to hire our first paid member of staff. What does it actually cost and trigger?" | yes | none | Copy is READY, and the £24,000 worked example is the best costing on the site. Same missing entity block |
| `charity-annual-return-related-party-transactions` | post | n | READY | "I am filling in the annual return. Who counts as a related party?" | yes | none | Gives the 20% connected-organisation test, names the three questions and where each sits, and gates them by income band |
| `charity-consolidating-legacy-bank-accounts-restricted-funds` | post | n | READY | "Can I close five dormant accounts without breaching the restrictions?" | yes | none | Answers yes with the three blocks named, and refuses the tempting wrong answer (an unevidenced balance stays restricted) |
| `charity-income-from-charitable-activities-vs-donations` | post | n | READY | "Which box does this grant go in?" | partly | none | One clean test, correctly applied to grants and fundraising. Closer to a reader's question than a decider's, but it is the classification a decider is blocked on at examination |
| `charity-vat-reduced-rate-fuel-and-power-certificate` | post | n | READY | "We are paying 20% VAT on the hall's electricity. How do we stop that?" | yes | none | Ground truth matches house position 20's 2026-09-27 addendum exactly: 1 Oct 2026 to 31 Mar 2027, GB electricity only, gas 5%, NI 5%, 5% returns 1 Apr 2027. The 60% rule and the de minimis limits are both there |
| `cic-donations-accounting-and-gift-aid` | post | n | READY | "Can our CIC claim Gift Aid on the donations we are taking?" | yes | none | Anchors the "no" on CAICE 2004 s.26(3) and FA 2010 Sch 6 para 1, matching house position 22's 2026-09-27 anchor, and prices the loss (£100 stays £100) |
| `does-a-charity-need-a-utr-and-tax-return` | post | n | READY | "HMRC has written to us and we have never paid tax. Do we have to file?" | yes | none | Splits the UTR question from the filing question, and the structure table plus the two things that can actually produce a bill is the useful part |
| `permanent-endowment-what-trustees-can-spend` | post | n | READY | "Our endowment is the only money we have. Can the trustees spend it?" | yes | none | The £25,000 test is correctly framed as the whole fund and not the spend, the adjusted-market-value trap is explained, and the borrowing route is offered as the alternative |
| `registering-a-charity-late` | post | n | READY | "We passed £5,000 months ago. How much trouble are we in and can we still claim the Gift Aid?" | yes | none | Frames s.35 as a duty outstanding rather than a penalty, and the four-year claim triage is the answer the decider came for |

"Changed since QA" for the three `y` rows is commit `25a7470e` (2026-09-28 00:24), which removed
advice-giving self-claims from live data. It touched one card body inside the `cics` row and two
strings in rows outside this wave. Current text graded in all cases.

## Banned strings

Zero hits across all fifteen pieces: no em-dash, no fee or pricing figure for our service, no
named person, no "chartered", "ICAEW", "ACCA", "CIOT", no "our accountants", "we are
accountants", and no "we advise" or "advice" as something we give.

Three hits sit outside this wave's fifteen pieces and are listed so they are not re-found:

- `charity-types.ts:111,114,142` (`social-enterprises` row, not a Wave 1 row): "Accounts and tax
  advice for social enterprises", the same in the meta description, and the card title "Structure
  and tax advice". The card title is the known open owner call; the headline and meta are the
  separate ranking call per the 2026-09-12 ruling.
- `charity-services.ts:247,249` (`charity-vat` row, not a Wave 1 row): "Charity VAT Advice and
  Compliance", "VAT advice for UK charities". Same two rulings.
- `charity-services.ts:68` (`independent-examination` row): ICAEW, ACCA, CIPFA named. This is the
  Charities Act list of bodies an examiner may belong to, a third party's credentials and not
  ours. Not a hit.
- `app/guides/[slug]/page.tsx:128`: `CtaBand title="Need advice on your specific situation?"`.
  Open owner call, heading class.

## Ground truth

Everything traces. Two notes.

1. **The endowment figures are not in `house_positions.md`.** `grant-making-trusts-and-foundations`
   and `permanent-endowment-what-trustees-can-spend` both publish the £25,000 fund test, the 60 day
   Commission period, the 25% borrowing limit and the 20 year repayment horizon. They trace to
   Charities Act 2011 ss.281 to 284D as amended, which is primary legislation, so the grading rule
   is met. But the file's only endowment line is the commencement note at line 51, so there is no
   locked house position for a future writer or a future sweep to check these against. Two pieces
   now depend on figures held nowhere but in the pieces themselves. Recommend a position 29.
2. **The two flagged positions are respected.** CIC34 fee: stated as "A filing fee applies" with no
   amount, in the row and in the FAQ. The 30 September 2026 threshold uplifts: every statement of
   £25,000, £250,000, £1m and £3.26m across all fifteen pieces carries the rise, and every one is
   worded against the accounting year end rather than a calendar date.

## Cross-piece: does this read as one site or as fifteen fills of one template?

**One voice, one shape, and the shape is visible.** The prose genuinely varies. The structure does
not, and a sceptical reader who opens three of the posts in three tabs sees it in about ten seconds.

The posts are dimensionally identical. All eight carry exactly 6 FAQs and exactly 5 key takeaways,
and the bodies run 1,768 to 2,076 words counting frontmatter, a 15% spread across eight files.
Nothing in eight unrelated subjects should land that evenly.

Two posts carry the same closing H2, verbatim:

> `registering-a-charity-late`: `<h2>The order to work in</h2>`
> `does-a-charity-need-a-utr-and-tax-return`: `<h2>The order to work in</h2>`

Both are in the same category, Trustee Compliance, so they will sit next to each other in the
category list. Three more posts close on the same move under a different label: "Run the exercise
in this order", "What to do this quarter", "What should you do next?". Five of eight posts end in a
numbered or sequenced do-this list.

The specialist sentence is a fingerprint. Every single one of the eight posts carries exactly one
"a specialist reviews" or "a specialist reads" clause, and five of the eight put it in the final
paragraph:

> VAT post, last paragraph: "a specialist reviews the percentage and the claim period before you
> approach them. Your accountant prepares the supporting calculation ..."
> Bank accounts post, last paragraph of the closing list: "A specialist reviews the fund mapping
> where the history is thin, and your accountant prepares the fund notes on the new basis."
> Permanent endowment post, last sentence: "A specialist reviews the trust deed against the
> statutory powers ..."
> Income post, last sentence: "A specialist reviews the classification against the agreements ..."

The same clause runs six times across the segment rows, four of them inside the `cics` row alone:

> "A specialist reviews how trading, contract and grant income has been recognised ..."
> "a specialist reviews what the asset lock and any dividend cap permit ..."
> "a specialist reviews your income mix and prepares a written CIC against charity or CIO
> comparison."

Track B saw this and cut it from four posts to two pairings, and the page sweep counted openers
only, which is why a clause that now appears once per piece in fifteen consecutive pieces was
scored as clean. One per piece across fifteen pieces is not variety, it is a slot.

Set against that, the openings are genuinely differentiated and several are very good. "Money came
in for a cause first, and the paperwork has caught up since." "Company rules, not charity rules,
govern a CIC's money." "Trustees inheriting a charity with five or six bank accounts usually find
that most of them are historical rather than legal." Not one of the fifteen opens on a definition
of its own subject, which is the usual failure mode and is absent here.

**Verdict: one site, one voice, one visible chassis.** It will not read as a template to a single
visitor who lands on one page from an assistant, which is the traffic this wave is built for. It
will read as a template to anyone who reads three, and to a sweep that counts shape rather than
words. Not a blocker for live. It is a brief change for Wave 2: vary FAQ count and length
deliberately, and allow some pieces to have no specialist sentence at all.

## Assistant test

What ChatGPT would say about "who this firm is and who it is for" from each page's text alone.

**`/for/cics`** (entity block renders): "Trustee Tax is a trading name of Ashfield Trading Ltd, a
UK company that publishes charity accounting research and refers enquiries on to firms in its
specialist partner network; it is not an accountancy practice and does not do the work itself. It
covers UK charities, CICs and social enterprises, and this page is aimed at community interest
company directors dealing with corporation tax, the asset lock and dividend cap, CIC34 filing and
whether to convert to a charity." Model correct, entity correct, no person named. Pass.

**`/for/trustees-and-treasurers`** (entity block renders): "Trustee Tax, a trading name of Ashfield
Trading Ltd, introduces UK charities to charity specialist firms rather than acting as their
accountant. This page is for trustees and volunteer treasurers of registered charities in England
and Wales who have to settle the accounts format, whether an independent examination or an audit
applies, and what the trustees' annual report must contain." Pass.

**`/services/charity-registration`** (entity block does NOT render): "Trustee Tax provides charity
registration and first-year accounting support for founders registering a charity in England and
Wales. It rebuilds the income record, drafts the financial sections of the Charity Commission
application and the HMRC recognition submission, sets up Gift Aid, and prepares the first accounts
and annual return." **Fail: gets the model wrong.** Nothing on the page says Ashfield Trading Ltd,
nothing says partner network, nothing says what happens after the form, and the page's own copy
("the financial sections ... are drafted together", "the first accounts ... are prepared", "Speak
to a charity accounts specialist") reads as a practice describing its own service. This is the
exact false claim the 2026-09-12 ruling exists to prevent, and it is a template omission rather
than a writing defect. `/services/charity-payroll-and-pensions` reads the same way.

For contrast, the `/for` template mounts `EntityBlock` at line 137, and `/`, `/about` and
`/services` (the hub, not the detail pages) all mount it too. Only `services/[slug]` does not.

## Ranked fix list

**1. Mount the entity block on the service detail route.** This is the only finding that changes a
grade, and it fixes both FIX-FIRST pieces and the five older service pages at once.

In `charities/web/src/app/services/[slug]/page.tsx`, after the `FaqSection` line and before
`<CtaBand ...>`, add the line the sibling route already uses at
`charities/web/src/app/for/[slug]/page.tsx:137`:

```tsx
{niche.entity ? <EntityBlock {...niche.entity} /> : null}
```

with the two imports the `for` route has and this file lacks (`EntityBlock` from
`@accounting-network/web-shared/design/marketing/EntityBlock`, and `niche` from
`@/config/niche-loader`).

**2. Positioning: the terms page has not caught up with the entity block.**
`charities/web/src/app/terms/page.tsx` says the site is operated by Ashfield Trading Ltd, that
content is not advice, and that "No accountant-client relationship is created by your use of this
Site or submission of an enquiry form". It never says that an enquiry is passed to a firm in a
partner network, which is what `niche.config.json` now tells every visitor and every assistant on
the homepage, `/about`, `/services` and all five `/for` pages. Nothing contradicts, but the terms
page is the document the grading rule points at and it is silent on the model. Add one sentence to
section 1, after the registered-office sentence:

> We publish research and calculators, take your enquiry and introduce you to a firm from our
> specialist partner network. We are not an accountancy practice, we do not give advice, and the
> partner firm does the work under its own engagement letter.

**3. Lock the endowment figures as a house position.** Add position 29 to
`docs/charities/house_positions.md` covering Charities Act 2011 ss.281 to 284D: the £25,000
available-endowment-fund test and which side resolves alone, the 60 day Commission period and its
extensions, the adjusted market value rule where trustees have borrowed, the 25% borrowing limit
and the 20 year repayment horizon, and the 14 June 2023 commencement. Two live pieces depend on
these and nothing in the ground-truth file currently backs them.

**4. Break the one-specialist-sentence-per-piece slot, cheapest three.** Delete the clause outright
in the three pieces where it adds nothing to the decider's answer:

- `charity-income-from-charitable-activities-vs-donations`, final paragraph: change "A specialist
  reviews the classification against the agreements when your accounts are prepared, and a
  documented decision is far quicker to defend than a reconstructed one." to "A documented decision
  is far quicker to defend at examination than a reconstructed one."
- `charity-vat-reduced-rate-fuel-and-power-certificate`, final paragraph: change "Overcharged VAT
  can be corrected by the supplier for past periods under the normal time limits, and a specialist
  reviews the percentage and the claim period before you approach them. Your accountant prepares
  the supporting calculation so the figure on the certificate is one you can stand behind." to
  "Overcharged VAT can be corrected by the supplier for past periods under the normal time limits,
  so have the percentage and the claim period checked before you approach them, with the
  calculation behind the figure written down."
- `cics` row, `howWeHelp` item 3 (`charity-types.ts:78`): change "a specialist reviews what the
  asset lock and any dividend cap permit and puts salary, capped dividend and reinvestment side by
  side." to "what the asset lock and any dividend cap permit is established first, and salary,
  capped dividend and reinvestment are put side by side."

**5. Rename one of the two identical closing H2s.** In
`charities/web/content/blog/does-a-charity-need-a-utr-and-tax-return.md`, change
`<h2>The order to work in</h2>` to `<h2>What to check before you decide there is nothing to
file</h2>`. Both posts sit in Trustee Compliance and will appear in the same category list under
the same heading otherwise.

**6. Open owner call, graded not fixed.** The heading-class "advice" strings left on this site are
the guides `CtaBand` ("Need advice on your specific situation?") and the `social-enterprises` and
`charity-vat` card titles and metas. Left as an open owner call, not counted as a defect against
any of the fifteen pieces. Charities' blog CTA is clean ("Need help with your charity's
accounts?"), so the blog surface needs no call.

## Two things checked and found sound, recorded so nobody re-checks them

All four sibling-dependent internal links between the new posts resolve against the categories the
posts actually declare (`charity-governance`, `charity-finance`, `charity-accounts-and-sorp`,
`trustee-compliance`), so the set is safe to publish together as the post sweep required. And the
page sweep's own header says "`charity-types.ts` (2 rows) and `charity-services.ts` (5 rows)",
which is the wrong way round: five audience rows live in `charity-types.ts` and two service rows in
`charity-services.ts`. The sweep's body treats them correctly, so this is a typo in the QA record
and not a scope error in the work.
