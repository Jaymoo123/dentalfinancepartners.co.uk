---
slug: machine-games-duty
tier: blog
category: "Licensed Trade"
route: /blog/licensed-trade/machine-games-duty
intent: EXTENSION, not a new page. The live page is slug-for-slug identical to the pick and already owns the intent; it is under pillar depth and deliberately carries no rates. Stage 1b has now verified the rates, so the gap closes.
---

# EXTENSION: add the verified MGD rates and the Type 1 / Type 2 split to `machine-games-duty.md`

> Wave-3 high-street mechanic asset. **THIS IS NOT A NEW PAGE.** You are editing one existing file: `hospitality/web/content/blog/machine-games-duty.md`. Do not create a second file. Do not change the slug. No em-dashes. Faceless authority. Raw-HTML body. Quote every frontmatter value containing a colon followed by a space.

## Why an extension, and why the live page's caution is now obsolete

The wave 3 cannibalisation check verdict is **DEEPEN** and the human decision has been taken. A page with this exact slug is live and targets the same single covered term. Publishing a second would be a straight duplicate.

The live page deliberately states no rates. It says rates can change and directs the reader to gov.uk. That was the right call at the time, because the rates were not a verified house position. **They now are.** Stage 1b anchor 5 locks the three machine types and the three rates against Finance Act 2012 Schedule 24 and the live GOV.UK table, both fetched 2026-09-11. The whole point of this extension is to close that gap: the page can now answer the question it currently defers.

Everything else on the live page is correct and stays.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

This phrasing is the pick's `covers` array, verbatim. It is binding and must appear naturally on the page, in a heading, in body prose or in an FAQ question, in the words a person would actually write. **It may not be split out into another page**, and no second page may be created for a variant of it, including a rates-specific one. A separate "machine games duty rates" page would split one result set with this page, which is cannibalisation and the house rule forbids it. If you believe a phrasing does not belong, raise a flag in the Q&A file and keep writing.

```
machine games duty
```

Head query: `machine games duty`. Volume 390/mo. Mechanic: gambling-duty. **PILLAR** of "Gaming and machine games duty".

The FAQ block carries the long tail in the words people type: "how much is machine games duty", "what is a type 1 machine", "mgd rates", "do i pay mgd on a quiz machine", "what if my machine has more than one game".

## Exactly what to change

### Frontmatter keys that CHANGE

| Key | Change to |
|---|---|
| `metaTitle` | <= 60 chars. The current one leads on "Register Before Play". Rework so it carries the rates, which are now the page's strongest asset. Must contain "Machine Games Duty". |
| `metaDescription` | <= 155 chars. Rewrite to lead with the three rates (5%, 20%, 25%) and the registration-before-play duty. The rates are what the searcher wants and no competing page states them alongside the statutory test. |
| `keyTakeaways` | Add two: one covering the three rates and the type split, one covering the highest-rate-applies rule for multi-game machines. Keep the existing ones. |
| `faqs` | Extend from 8 to 12 to 14. The count in frontmatter must equal the count the page presents. |
| `summary` | Light rewrite so it mentions that the page carries the rates. |

### Frontmatter keys that DO NOT CHANGE

- **`slug`. Stays `machine-games-duty`.**
- `title` and `h1`. Both currently frame the page around registration before play, which remains the page's strongest operator message and the thing an operator gets penalised for. Leave them. This is a rates addition, not a repositioning.
- `date`, `author`, `category` (`Licensed Trade`).

### What NOT to touch in the body

Every existing H2 stays, in place and in order:

- "You must register for MGD before a cash-prize machine takes a penny"
- "Which machines are caught by MGD"
- "Who is liable: the operator holding the qualifying licence"
- "How to register for MGD"
- "MGD returns: the reporting cycle and what you report"
- "Record-keeping and how MGD sits alongside your other pub taxes"
- "Getting your gaming-machine compliance handled"

Do not restructure. Do not rewrite the registration, liability or returns content, which is anchored on HP 18 and is correct. The one thing that must be **removed or rewritten** is any sentence that says the page does not state rates, or that tells the reader to check gov.uk because rates can change. That caution is now stale. Replace it with a dated statement of the rates plus the gov.uk link.

### Sections to ADD

Insert the new material after "Which machines are caught by MGD" and before "Who is liable", so the reader meets the type test and then the rate.

1. **"The three machine types, and the rate each one pays".** The core addition. Set out:
   - **Type 1, lower rate, 5%.** The highest charge payable for playing a dutiable machine game on the machine does not exceed 20p **and** the maximum cash that can be won does not exceed £10. Both limbs. Finance Act 2012 Sch 24 para 5(2).
   - **Type 2, standard rate, 20%.** Not a type 1 machine, **and** it can be demonstrated that the highest charge payable for playing does not exceed £5. Sch 24 para 5(3).
   - **All other machines, higher rate, 25%.** Cost of play exceeding £5. The residual category.
   Present this as prose plus a table. The table is not the boundary table; it is the rate table.
2. **"What happens when one machine offers more than one type of game".** Where a machine offers more than one type of game, the highest applicable rate applies to **all** takings from that machine. GOV.UK verbatim: "If your machine has more than one type of game, you pay the rate for the highest rated game on all takings from the machine." This is the single most expensive thing an operator can get wrong and no competing page leads on it.
3. **"What MGD is charged on: net takings".** MGD is charged on net takings from dutiable machine games, not on gross cash in. Explain the arithmetic so the worked examples land.
4. **THE BOUNDARY TABLE.** See the dedicated section below. Load-bearing, and the live page has nothing like it.
5. **Worked examples.** Two or three, trade-named, with real figures. See below. The live page has none.
6. **"What people get wrong".** New section. See below.
7. **Two statutory citation upgrades inside the existing sections.** The live page rests on HP 18 and the GOV.UK guidance page. Add Finance Act 2012 Schedule 24 as the law wherever the type test or the rates appear. A manual or a guidance page is practice; the schedule is the law.

## BOUNDARY TABLE (explicit spec, load-bearing)

Two columns: **"Inside MGD, duty is due"** against **"Outside MGD, no duty"**. Trade-anchored on both sides, with the deciding test named in each row. Minimum four row pairs:

| Inside MGD, duty is due | Outside MGD, no duty |
|---|---|
| A pub's fruit machine at 20p a play with a £10 top cash prize: type 1, 5% of net takings | The same pub's pool table, no game of chance for a cash prize, so not a dutiable machine game at all |
| A bar's £1-a-play machine with a £100 cash jackpot: type 2, 20%, because cost of play is under £5 and it is not type 1 | The same bar's jukebox and its quiz machine that pays only in free replays, because the prize is not more than the cost to play (HP 18) |
| A hotel arcade's £6-a-play terminal: higher rate, 25%, because cost of play exceeds £5 | The same hotel's children's ride-on machine, no prize |
| A social club machine offering a 20p game and a £2 game on the same cabinet: 20% on **all** takings from that machine, because the highest applicable rate applies across the board | A machine at the same club that has been unplugged and is not made available to play |
| A restaurant's grabber machine paying a cash prize above the cost to play | A grabber machine offering only a non-cash toy prize worth less than the cost to play |

The fourth pair is the multi-game trap and is the most valuable row on the page. Keep it and cite the GOV.UK line verbatim beside it.

## Worked examples (two or three, trade-named, real figures)

- A pub with one type 1 fruit machine taking £3,600 cash in over an accounting period and paying out £2,400 in prizes. Net takings £1,200. MGD at 5% is £60. Show the arithmetic.
- The same pub's second machine, a £1-a-play type 2 with £8,000 in and £5,500 out. Net takings £2,500. MGD at 20% is £500.
- The trap: the operator adds a £2-a-play game to the type 1 cabinet. The cabinet is no longer type 1, so 20% applies to **all** of that machine's net takings, not just the new game's. On the first machine's £1,200 net takings that turns £60 into £240. This example is the reason the section exists; do not cut it.

State that net takings means cash in less prizes paid out, and that the operator's own figures come from the machine's meters and the supplier's collection records.

## Figures mapped to HP + ledger

| Figure or claim | Anchor | Cite |
|---|---|---|
| Registration required before a cash-prize machine is made available to play | HP 18 | https://www.gov.uk/guidance/machine-games-duty |
| Duty falls on the operator holding the qualifying gambling or alcohol licence | HP 18 | same |
| No registration where prizes are less than the cost to play | HP 18 | same |
| Type 1, lower rate 5%: cost of play not exceeding 20p AND maximum cash prize not exceeding £10 | Stage 1b anchor 5 (LOCKED) | FA 2012 Sch 24 para 5(2), https://www.legislation.gov.uk/ukpga/2012/14/schedule/24 and https://www.gov.uk/machine-game-duty/how-much-you-pay |
| Type 2, standard rate 20%: not type 1, and highest charge payable for playing does not exceed £5 | Stage 1b anchor 5 | FA 2012 Sch 24 para 5(3), same URLs |
| All other machines, higher rate 25%: cost of play exceeding £5 | Stage 1b anchor 5 | FA 2012 Sch 24 para 9, same URLs |
| Highest applicable rate applies to all takings from a multi-game machine | Stage 1b anchor 5, GOV.UK verbatim | https://www.gov.uk/machine-game-duty/how-much-you-pay |
| MGD is charged on net takings from dutiable machine games | Stage 1b anchor 5 | FA 2012 Sch 24 |

**URL TRAP, read this.** `https://www.gov.uk/machine-games-duty/how-much-you-pay` returns HTTP 404. The live path is **singular**: `https://www.gov.uk/machine-game-duty/how-much-you-pay`. Use the singular form in every anchor to the rates page. The registration guidance page at `https://www.gov.uk/guidance/machine-games-duty` is plural and is correct as it stands on the live page. Both forms are in use on gov.uk; do not "fix" one into the other.

## HP GAPS (do NOT invent, omit or link out)

1. **Do not write "type 3 machines as defined in Schedule 24".** That citation does not exist. The statute defines type 1 and type 2 only; "type 3" is GOV.UK shorthand for machines that are neither, which the statute reaches as the residual higher-rate category. Write it as "all other machines" and explain the shorthand.
2. **Do not rely on the GOV.UK table's type 2 prize column.** It shows "£11 or more" as if prize value were part of the type 2 test. Stage 1b anchor 5 flags this as a presentational simplification: the statutory type 2 test is only about cost of play (not exceeding £5) plus failing the type 1 test. Follow the statute for any borderline case, and say so on the page.
3. **The 1 March 2015 commencement date for the 25% higher rate is NOT locked.** The rate itself is confirmed twice over, but its commencement rests on secondary GOV.UK narrative and the Finance Act 2015 provision was not fetched. **Omit the commencement date.** State the rate, not its history.
4. **No MGD registration threshold, no accounting period length, no due dates beyond what the live page already says.** The returns cycle content on the live page is what we have. Do not add filing deadlines from memory.
5. **No Gambling Commission licensing detail.** MGD is a tax; the gaming machine permit regime is separate and is not a house position. One sentence distinguishing the two is the ceiling.
6. **No Scotland, Wales or Northern Ireland variation.** MGD is a UK excise duty. Do not add a devolution flag; it would be wrong.
7. **No rate history table.** We hold today's three rates, verified. We hold no verified prior-year table.

## What people get wrong (new section, the one no competitor writes)

- "One game on the machine is cheap, so the machine is type 1." If any game on the cabinet exceeds the type 1 limits, the machine is not type 1, and the highest applicable rate applies to all of that machine's takings.
- "The prize value decides whether I pay 20%." It does not. The statutory type 2 test is about cost of play. The prize column on the GOV.UK table is a simplification.
- "I pay duty on the cash in the machine." You pay on net takings: cash in less prizes paid out.
- "Type 3 is a statutory category." It is not. The statute defines type 1 and type 2, and everything else is the residual higher-rate category.
- "I can register once the machine is earning." Registration must be in place before the machine is made available to play (HP 18).
- "Free-replay quiz machines are caught." Where the prize is less than the cost to play, the machine is not a dutiable machine game (HP 18).

## Internal links

**Out (add or confirm):**
- `/blog/licensed-trade/alcohol-duty` (new this wave: the other excise duty a licensed operator pays, and the page that explains excise duty as a category). Add this link from the "how MGD sits alongside your other pub taxes" section.
- `/blog/licensed-trade/awrs-checks`
- `/blog/hospitality-accounts/gross-profit-menu-pricing` (machine income in the revenue mix).
- `/for/pubs-and-bars`
- `/services/hospitality-vat`
- `https://www.gov.uk/machine-game-duty/how-much-you-pay` (external, singular path).

**In (conductor to add):**
- `alcohol-duty.md`'s excise-duty-as-a-category section should name gambling duties and link here as the hospitality example.

## Body length

**TARGET TOTAL AFTER EXTENSION: 3,500 to 4,000 body words.** The page is currently 1,364 body words, so this is an addition of roughly 2,100 to 2,600 words. Pillar range is 3,500 to 4,500; the low-to-mid end is right here because the underlying rule is genuinely compact and padding would show. Frontmatter does not count. The new words are in the type-and-rate section, the multi-game rule, the boundary table, the three worked examples, the errors section and four to six new FAQs.

## Verification before handing back

- `python scripts/frontmatter_lint.py --check --site hospitality` exits 0.
- `faqs:` count in frontmatter equals the FAQ count the page presents.
- `slug` still reads `machine-games-duty`.
- Every rate on the page carries an inline cite to FA 2012 Sch 24 or the singular gov.uk path.
- No sentence anywhere still says the page does not state rates.
- No em-dashes in the body.
