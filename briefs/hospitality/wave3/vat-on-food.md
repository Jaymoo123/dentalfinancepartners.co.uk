---
slug: vat-on-takeaway-food
tier: blog
category: "Hospitality VAT"
route: /blog/hospitality-vat/vat-on-takeaway-food
intent: EXTENSION, not a new page. Take the live takeaway post up to the "vat on food" head term (6,640/mo) without creating a fourth URL on an already three-page food-VAT cluster.
---

# EXTENSION: extend `vat-on-takeaway-food.md` so it owns the "vat on food" head term

> Wave-3 high-street mechanic asset. **THIS IS NOT A NEW PAGE.** You are editing one existing file: `hospitality/web/content/blog/vat-on-takeaway-food.md`. Do not create `vat-on-food.md`. Do not change the slug. No em-dashes. Faceless authority. Raw-HTML body. Quote every frontmatter value containing a colon followed by a space.

## Why an extension and not a build

The wave 3 cannibalisation check verdict is **DEEPEN**, and the human decision has been taken. The `covers` array below hands the existing pages' exact intent to a new URL: "vat on takeaway food" IS the live page's title; "vat on hot food" and "vat on cold food" are its five hot tests; "vat on pub food" and "uk vat on restaurant food" are its eat-in rules. Publishing a separate "VAT on food" page would cannibalise the site's two strongest existing posts. So the live page grows into the head term instead.

The slug stays `vat-on-takeaway-food`. Keeping the URL keeps the page's existing authority and inbound links. The title, metaTitle, metaDescription and h1 move up to the head term. That is the whole manoeuvre.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

These phrasings are the pick's `covers` array, verbatim. They are binding. Every one must appear naturally somewhere on the extended page, in a heading, in body prose or in an FAQ question, in the words a person would actually write. **None of them may be split out into another page.** Google returns substantially the same results for them; "vat on takeaway food" against "vat on hot food" shared 7 of 10 top results with an identical top result. One page answers all of them and ranks for all of them. If you believe a phrasing does not belong, raise a flag in the Q&A file and keep writing.

```
vat on food
vat on takeaway food
is there vat on food in restaurants
uk vat on restaurant food
vat on hot food
vat on supermarket food uk
vat on food and drink uk
vat on cold food
is there vat on pub food
```

Head query: `vat on food`. Volume 6,640/mo. Mechanic: food-vat-boundary. **PILLAR** of "VAT on food and drink".

Audit the live page against this list before you write. Several phrasings are already covered in substance but not in the reader's words. `vat on supermarket food uk` is the one genuinely missing angle and needs new prose.

## Exactly what to change

### Frontmatter keys that CHANGE

| Key | Change to |
|---|---|
| `title` | Move up to the head term. Must open with "VAT on Food". Keep the hot vs cold and eat-in signals after the colon so the existing intent is not lost. Quote the whole value. Example shape: `"VAT on Food: Hot, Cold, Eat-In, Takeaway and Restaurant Rules"`. |
| `metaTitle` | <= 60 chars, must open with "VAT on Food". |
| `metaDescription` | <= 155 chars, rewritten to lead on food generally, not takeaway specifically. Must carry the zero-rated default and the 20% catering exception. |
| `h1` | The dominant phrasing verbatim. Must start "VAT on Food". Not a cleverer version. |
| `summary` | Rewrite to the food-wide frame. |
| `keyTakeaways` | Add one takeaway covering the supermarket and retail angle. Keep the existing five. |
| `faqs` | Extend to 12 to 14. The count in frontmatter must equal the count the page presents. |

### Frontmatter keys that DO NOT CHANGE

- **`slug`. Stays `vat-on-takeaway-food`.** This is the whole point of the extension. Changing it creates a redirect problem and forfeits the page's authority.
- `date`. Do not touch. The conductor decides whether the wave stamps an updated date.
- `author`. Stays empty.
- `category`. Stays `Hospitality VAT`.

### What NOT to touch in the body

Leave these sections intact and in place. They are why the page ranks now:

- The five hot-food tests section and its wording. It is correct against HP 1 and Stage 1b anchor 1.
- The eat-in and premises section (HP 2).
- The four standing carve-outs section (HP 3), including ice cream.
- The delivery and third-party apps section. Do not rewrite it; the "rate follows the underlying supply" framing is correct.
- The existing 10 FAQs. Add to them, do not replace them.
- The existing internal links.

Do not restructure the page. You are adding sections and lifting the frame, not rebuilding.

### Sections to ADD

Insert in this order, fitting around what is already there.

1. **A new opening, 60 words, food-wide.** The current opening is takeaway-first. Replace it with the food-wide answer: most food for human consumption is zero-rated; it becomes standard-rated at 20% when it is catering, which means consumed on the premises, or when it is hot food taken away, or when it falls into one of the standing excepted categories. Everything else on the page is the detail of those three exceptions. The page must still open on a plain prose sentence of 30+ characters, never a table or a heading.
2. **A statutory rule section, new.** The live page cites Notice 709/1. Add the law above the notice: VATA 1994 Schedule 8 Group 1, the catering exclusion in Note 3, the premises definition in Note 3A, the ambient-temperature test in Note 3C, and the five conditions in Note 3B. Then say that the 20% rate itself is VATA 1994 s.2(1). This is a citation upgrade no competitor carries. See the figures table.
3. **The ambient gateway, new and important.** The five conditions are not free-standing. The Note 3B gateway is that the food is above ambient air temperature *when it is provided to the customer*; only then do the five conditions bite. Writing "any food marketed as hot is standard-rated" without the ambient gateway is wrong, and the live page is close to that error. Fix it here explicitly.
4. **The supermarket and retail angle, new.** This is the missing covered phrasing (`vat on supermarket food uk`). A supermarket's cold sandwich taken away is zero-rated; the same sandwich eaten at the store's own seating, or at shared food-court seating the supplier sets aside, is standard-rated by Note 3(a), not by any hot-food rule. That last point is the one almost everyone gets wrong: **cold food eaten in is standard-rated because of the premises test, not because of temperature.** Make the distinction explicit.
5. **Restaurants and pubs, in their own words, new or expanded.** Carry `is there vat on food in restaurants`, `uk vat on restaurant food` and `is there vat on pub food` in prose headings or subheadings. The answer is the same rule (all on-premises consumption is catering) but the reader needs to see their own trade named before they will accept it.
6. **The expanded BOUNDARY TABLE.** See the dedicated section below. If the live page already has a comparison table, replace it with this one rather than adding a second.
7. **"What people get wrong", new section.** See below. The live page does not have one and it is the most valuable section on the anatomy.
8. **One line to the pet food branch**, linking the new `is-there-vat-on-dog-food` page from the excepted items discussion.

## BOUNDARY TABLE (explicit spec, load-bearing)

Two columns: **"Zero-rated"** against **"Standard-rated at 20%"**. Each row is one trade sitting on both sides of the line, so hot, cold, takeaway, restaurant, supermarket and pub are all answered at a glance. Minimum four trade-anchored row pairs; use all of these:

| Zero-rated | Standard-rated at 20% |
|---|---|
| A baker's loaf cooling on the rack, incidentally warm, meeting none of the five conditions | The same baker's pasty kept in a heated cabinet, because it is kept hot after being heated |
| A butcher's raw joint of beef | The same butcher's hot rotisserie chicken, heated for the purpose of being eaten hot |
| A supermarket's cold sandwich taken away | The same sandwich eaten at the supermarket's own seating, or at shared food-court seating the supplier sets aside, by Note 3(a) |
| A sandwich shop's cold wrap in a paper bag | The same wrap toasted to order, because it was heated to order |
| A pub's packet of cold sandwiches sold to take away | The same pub's Sunday roast served at a table, because all on-premises consumption is catering |
| A cafe's cold cake taken away | The same cafe's cold cake eaten at its tables, standard-rated by the premises test and not by temperature |
| A takeaway's cold soft drink: **no**, always standard-rated | A takeaway's cold soft drink, standard-rated as an excepted item even cold and taken away |

That final row is deliberately lopsided. Present it as the exception it is: temperature and premises are not the only tests, because the excepted categories bite regardless of both.

## Worked examples (two or three, trade-named, real figures)

Keep any that exist. Ensure at least these:

- A £4.20 hot pasty from a bakery counter, kept in a heated cabinet. Standard-rated: £3.50 net plus £0.70 VAT. The same pasty sold cold from the shelf, meeting none of the five conditions: zero-rated, and the whole £4.20 is the bakery's.
- A £5.80 supermarket meal deal sandwich taken away, zero-rated, against the same sandwich eaten at the in-store seating, standard-rated: £4.83 net plus £0.97 VAT.
- A pub selling a £14.00 cold platter to a table, standard-rated because it is catering: £11.67 net plus £2.33 VAT. Show that temperature never entered the calculation.

## Figures mapped to HP + ledger

| Figure or claim | Anchor | Cite |
|---|---|---|
| VAT standard rate 20% | Ledger `vat_standard_rate`; statutory upgrade per Stage 1b anchor 1 | https://www.legislation.gov.uk/ukpga/1994/23/section/2 |
| Food for human consumption zero-rated, subject to excepted items and the catering exclusion | HP 1, HP 3; Stage 1b anchor 1 | VATA 1994 Sch 8 Group 1, https://www.legislation.gov.uk/ukpga/1994/23/schedule/8/2026-04-06 |
| Catering includes consumption on the premises and hot food for consumption off the premises (Note 3) | Stage 1b anchor 1 | same |
| Premises include any area set aside for the consumption of food by that supplier's customers (Note 3A) | HP 2; Stage 1b anchor 1 | same and https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091 |
| Food is hot where it is above ambient air temperature (Note 3C) | Stage 1b anchor 1 | same |
| The five conditions (heated to be consumed hot; heated to order; kept hot after heating; heat-retentive or hot-food packaging; advertised or marketed as supplied hot) | HP 1; Stage 1b anchor 1, Note 3B | same |
| Four standing carve-outs plus ice cream, all standard-rated | HP 3 | https://www.gov.uk/guidance/food-products-and-vat-notice-70114 |
| VAT registration threshold £90,000 rolling 12 months | HP 4; ledger `vat_registration_threshold` | https://www.gov.uk/vat-registration/when-to-register |
| FRS catering 12.5%, pubs 6.5%, hotels 10.5%, limited cost trader 16.5% | HP 5; ledger `frs_catering_rate`, `frs_pubs_rate`, `frs_hotels_accommodation_rate` | https://www.gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300 |

Only mention the threshold and the FRS rates if the page routes there naturally. Do not bolt on a registration section.

## HP GAPS (do NOT invent, omit or link out)

1. **Do not cite the pre-2012 single hot-food test.** Stage 1b anchor 1's drafting-history note is explicit: the "heated for the purposes of enabling it to be consumed at a temperature above ambient" single test is obsolete, superseded by the Notes 3A to 3C codification inserted by Finance Act 2012. It must not be cited.
2. **Cakes vs biscuits, Jaffa-cake-style borderlines, flavoured milk.** Not locked positions. Describe the principle, link Notice 701/14, route to the checker. Do not assert a verdict on a borderline item from memory.
3. **Mixed and linked supply apportionment mechanics.** Not a locked HP. State the principle and flag it as a check-with-us point. No worked apportionment formula presented as authoritative.
4. **The 2021-22 temporary reduced hospitality VAT rate is history and is NOT a house position.** Do not mention a live reduced rate. If the page currently references it, remove the reference.
5. **No delivery-fee VAT mechanics beyond what is already on the page.** The existing "rate follows the underlying supply" framing is the ceiling.
6. **VAT is UK-wide.** No devolution flag on this page.

## What people get wrong (new section, the one no competitor writes)

- "Cold food eaten in is zero-rated because it is not hot." No. Cold food eaten in is standard-rated by the premises test in Note 3(a). Temperature never enters it.
- "Any food marketed as hot is standard-rated." Only if it is above ambient air temperature when provided to the customer. The five conditions do not bite until that gateway is passed.
- "Shared food-court seating is not my premises." The premises test is statutory, not just HMRC practice, and it captures any area set aside for the consumption of food by that supplier's customers, whether or not other retailers' customers use it too.
- "Freshly baked bread is hot food." It is incidentally warm. If it meets none of the five conditions it stays zero-rated.
- "Cold means zero-rated." Not for the excepted categories: confectionery, crisps and savoury snacks, soft drinks, alcohol and ice cream are standard-rated cold and taken away.
- "Delivery changes the rate." It does not. The rate follows the underlying supply.

## Internal links

**Out (add or confirm):**
- `/blog/hospitality-vat/vat-rates-soft-drinks-and-food` (**required**: it stays the per-item rate table beneath this page, and this page must link down to it from the excepted-items section, framed as "the rate for a specific item").
- `/blog/hospitality-vat/is-there-vat-on-dog-food` (new this wave, the pet food branch of the excepted items).
- `/calculators/food-drink-vat-rate-checker`
- `/services/hospitality-vat`
- `/for/takeaways`, `/for/cafes-and-coffee-shops`, `/for/restaurants`, `/for/pubs-and-bars`

**In (conductor to add):**
- `vat-rates-soft-drinks-and-food.md` must link UP to this page as the head-term parent, framed as "the hot, cold, eat-in and takeaway decision". It already links to `vat-on-takeaway-food`; confirm the anchor text is updated to the new title so the link reads as a parent link, not a sibling.
- `is-there-vat-on-dog-food.md` links up to this page.

The two-way relationship with `vat-rates-soft-drinks-and-food` is the cannibalisation check's explicit obligation: this page owns the temperature and premises decision, that page owns the per-item product classification. Neither may absorb the other.

## Body length

**TARGET TOTAL AFTER EXTENSION: 3,800 to 4,200 body words.** The page is currently 2,210 body words, so this is an addition of roughly 1,600 to 2,000 words. Pillar range is 3,500 to 4,500; aim mid-range. Frontmatter does not count. Do not hit the number by restating the five tests in different words; the new words are in the statutory rule section, the supermarket angle, the expanded boundary table, the errors section and the four new FAQs.

## Verification before handing back

- `python scripts/frontmatter_lint.py --check --site hospitality` exits 0.
- `faqs:` count in frontmatter equals the FAQ count the page presents.
- `slug` still reads `vat-on-takeaway-food`.
- No em-dashes anywhere in the body.
- Body still opens on a plain prose sentence, not a table or a heading.
