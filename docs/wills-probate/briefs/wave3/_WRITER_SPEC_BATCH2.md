# Writer spec — Wave 3 Batch 2 (IHT gifts / reliefs / planning cluster, 13 posts)

You are writing ONE authoritative blog post for a UK wills/probate/estate-planning site. This spec is shared by all 13 batch-2 writers. Your individual assignment (topic, brief path, output path, image block) is in the launch prompt. Read this spec fully, then read your assigned brief, then read the template file, then write.

## Non-negotiable format (copy the template exactly)
Template to mirror EXACTLY (frontmatter shape + HTML body conventions):
`wills-probate/web/content/blog/rnrb-taper-pension-inheritance-tax.md`

- Frontmatter is YAML. Body is **raw HTML** (`<h2>`, `<p>`, `<ul>`, `<ol>`, `<table>`, `<strong>`, `<em>`, `<a href>`) — NOT markdown. No markdown syntax anywhere in the body.
- Required frontmatter keys, in this order: `title`, `slug`, `date` ("2026-07-24"), `updatedDate` ("2026-07-24"), `author` ("Editorial Team"), `image`, `altText`, `imageCredit` (block: photographer/photographerUrl/source/sourceUrl), `category`, `metaTitle`, `metaDescription`, `h1`, `summary`, `keyTakeaways` (6 bullets), `sourcesVerifiedAt` ("2026-07-24"), `faqs` (5-6 Q&A, answers 60-110 words each, use your brief's FAQ candidates), `generator` ("claude-fable-5 | manual | 2026-07-24").
- `category: "Inheritance Tax"` for every batch-2 post. Route will be `/blog/inheritance-tax/<slug>`.
- `metaTitle` ≤ 60 chars. `metaDescription` 140-160 chars, includes a concrete number and a reason to click.
- `slug` = the assigned slug exactly (matches output filename).

## Quality bar (A*, gold-standard, YMYL)
- 1,300-1,900 words of genuinely authoritative, specific prose. Worked example with real numbers wherever the topic supports it (gifts, taper, reliefs, charity rate all do). Beat the answer-box: every section adds something the gov.uk overview does not.
- **Faceless authority.** The site owner is NOT a solicitor. NO named-expert claims, NO "our solicitors", NO regulated-activity or financial-advice language. Frame as neutral information + "speak to a specialist" handoff. For anything touching pensions/investments/equity release, say it is regulated territory for an FCA-authorised adviser.
- **No em-dashes anywhere** (title, meta, body, FAQs). Use commas, parentheses, full stops, or a middle dot. This is a hard rule — a single em-dash fails QA.
- English/Welsh law default; note Scotland only where materially different.
- Include a "general information, not legal or financial advice" line naturally in the intro (see template).

## FACT VERIFICATION (mandatory — this is YMYL, do not invent figures)
Verify EVERY numeric or legal claim against gov.uk / HMRC before stating it. Use WebFetch on the relevant gov.uk page and cite it with a real `<a href>` to the specific gov.uk URL (not a homepage). Prefer gov.uk, HMRC internal manuals (IHTM…), and HMRC forms.

Confirmed ground truth (still cite the source page inline):
- Nil-rate band £325,000, frozen to April 2030. Residence nil-rate band up to £175,000, tapers £1 per £2 over £2,000,000.
- IHT standard rate 40%; reduced rate 36% where ≥10% of the *baseline amount* (net estate after NRB, reliefs and exemptions, before the charitable gift) passes to qualifying charity.
- Annual exemption £3,000/yr (one year carry-forward). Small gifts exemption £250 per recipient per year. Wedding/civil-partnership gifts: £5,000 from a parent, £2,500 from a grandparent, £1,000 anyone else. Normal-expenditure-out-of-income exemption (regular gifts from surplus income that do not affect the giver's standard of living).
- 7-year rule: a failed PET is taxable if the giver dies within 7 years. **Taper relief reduces the TAX, not the gift's value, and only bites where cumulative gifts exceed the NRB.** Taper: 0-3 yrs no reduction (full 40%), 3-4 yrs 20% reduction, 4-5 yrs 40%, 5-6 yrs 60%, 6-7 yrs 80%, 7+ yrs exempt.
- Relevant-property trusts: up to 6% periodic ("10-year"/principal) charge and exit charges. Verify the exact calculation mechanic on gov.uk before writing worked numbers.
- Deed of variation: must be made within 2 years of death, in writing, by the beneficiary, with the correct statements to be "read back" for IHT (and/or CGT).
- Direct Payment Scheme: banks/building societies (and NS&I) pay IHT direct to HMRC from the deceased's accounts before probate, via **form IHT423**. IHT can also be paid via the reference from **form IHT400 / IHT422** first.

**LANDMINES — verify live, do NOT trust older drafts:**
1. **IHT205 is ABOLISHED for deaths on or after 1 January 2022.** For those deaths, excepted estates are no longer reported on IHT205; the estate values are given on the probate application (PA1P/PA1A) instead. IHT400 is still used for estates that are not excepted / that owe tax. The "IHT400 vs IHT205" post MUST explain this abolition, not present IHT205 as current. Verify on gov.uk before writing.
2. **Business Relief and Agricultural Relief April 2026 reform cap.** Verify the exact figure and mechanic on gov.uk / HMRC directly (the £1m combined 100%-relief allowance vs the "£2.5m" figure that appears in some site copy). Use ONLY the gov.uk-confirmed number. If the current gov.uk guidance and the announced-but-not-yet-in-force detail differ, state the effective date and both clearly. If you cannot confirm a figure, describe the mechanic and flag the number as "to be confirmed against HMRC guidance" rather than inventing one. Note in your return message which figure you used and its source so the manager can reconcile /for/business-owners.

If a claim cannot be verified, describe the mechanic in words and explicitly flag the uncertainty; never fabricate a precise figure or date.

## Internal links (from your brief's "Suggested Internal Links" + the interlink map in `_INDEX.md`)
Use the whitelist links in your brief. Add 2-4 sibling links from the `_INDEX.md` interlink map where natural. Every post must link to (a) the assigned calculator `/calculators/iht-threshold-calculator`, (b) at least one pillar (`/inheritance-tax` and/or `/probate`), and (c) at least one sibling wave-3 or existing post. End with a soft "speak to a vetted specialist" CTA (no pricing, no client names, /contact-style handoff — an initial conversation costs nothing).

## Image
Use the EXACT `image` / `altText` / `imageCredit` block given in your launch prompt, verbatim. Do not change the URL or credit. Do not use any Unsplash photo ID from the banned list: photo-1554224155, photo-1499750310107, photo-1470252649378, photo-1521791136064, photo-1517842645767.

## Output
Write the finished file to the given path with the Write tool. Then return a SHORT message: word count, the gov.uk URLs you cited, and any figure you had to flag as unconfirmed (especially the BR/APR cap). Do not return the post body.
