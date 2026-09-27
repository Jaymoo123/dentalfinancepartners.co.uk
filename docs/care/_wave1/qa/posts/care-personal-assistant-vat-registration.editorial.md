# Track B editorial QA: care-personal-assistant-vat-registration

Date: 2026-09-27. Grader: Opus. Read: all 12 posts in `docs/care/_wave1/posts/`, plus the two newest live posts `care/web/content/blog/care-provider-formation-trends.md` and `care-home-bed-supply-and-care-deserts.md` (both dated 2026-07-23, the newest date in the live corpus). Track A report read first: `care-personal-assistant-vat-registration.factual.md` (PASS, 0 edits).

**Verdict: PASS after 6 edits.** Body 1,189 words. No figure, rate, date or rule changed.

## The Track A carry-over: inconsistent "Source: gov.uk/..." tails

Track A left two FAQ answers carrying a trailing `Source: gov.uk/...` string (FAQs 1 and 2 only, of six) and flagged the inconsistency to this pass.

Evidence gathered before deciding which way to make it consistent:

- Wave-wide: `grep "Source:"` across all 12 `_wave1/posts/` drafts returns hits in this post **only**. No sibling draft uses the pattern.
- Live corpus, the two newest posts: neither `care-provider-formation-trends.md` nor `care-home-bed-supply-and-care-deserts.md` uses a `Source:` tail in any of their twelve FAQ answers. Both name the source inside the prose instead ("based on CQC's HSCA Active Locations extract cross-referenced with ONS mid-2024 population estimates", "From CQC's HSCA Active Locations, Deactivated Locations and ratings-by-domain open data extracts, published under the Open Government Licence v3.0").
- Track A's counter-example, `mtd-it-care-owner-operators.md`, is a July post and is not among the newest two.

So the newest live house style is: attribute in prose, never as a bare URL tail. **Both tails removed.** FAQ 1 now ends on the substance. FAQ 2 keeps the attribution but in prose ("HMRC sets out the same test in its welfare services notice"), matching the live pattern and preserving the sourcing signal Track A relied on.

## Overlap check against the sibling `vat-on-domiciliary-care.md`

Requested check, on the £90,000 threshold wording, plus the other shared surfaces Track A flagged.

| Surface | This post, before | Sibling | Action |
|---|---|---|---|
| £90,000 threshold, key takeaway 1 | "Registration is compulsory once taxable turnover exceeds £90,000 over any rolling 12 month period" | body: "Registration is compulsory once taxable supplies in a rolling twelve month period exceed £90,000"; FAQ 3: "Registration bites only once taxable turnover on a rolling twelve month basis exceeds £90,000" | Near-verbatim (same opening clause, same components). Rewritten second-person: "You must register once your taxable turnover over any rolling 12 months goes past £90,000, or as soon as you expect to pass £90,000 in the next 30 days alone." Figures untouched. |
| £90,000, body H2 and FAQ 1 of this post | "taxable turnover over any rolling 12 months goes above £90,000"; body "your taxable turnover over the previous 12 months, checked at the end of every month" | sibling frames it as what exempt fees do *not* do | No overlap. The two posts answer opposite questions on the same threshold, which is the intended split. Left. |
| £625 de minimis | "the de minimis test only lets you recover exempt input tax where it averages no more than £625 a month and stays under half your total input tax" | "exempt input tax averaging no more than £625 a month, and staying under half of the period's total input tax" | Near-verbatim. Rewritten: "you keep the exempt side of your input tax only while it clears both de minimis limbs: an average of no more than £625 a month, and below half your input tax overall." Both figures and both limbs intact. |
| Group 7 of Schedule 9 framing | FAQ 2 "The welfare exemption in Group 7 of Schedule 9 to the Value Added Tax Act 1994 covers supplies by charities, public bodies and state regulated providers" | sibling summary and FAQ 1 both cite Group 7 the same way; and this post's own body carries a third near-identical list | Statutory citation cannot be varied, but the surrounding list was duplicated three ways. FAQ 2 rewritten to state the test ("turns on who is supplying the care, and it reaches only charities, public bodies and state regulated providers") and the full citation left to the body, which is where it does the work. |
| "A specialist reviews..." | "A specialist reviews the split before you commit, and a care VAT review is where that gets written down" | "A specialist reviews the contract chain rather than the job descriptions"; "a structured care VAT review is where a mixed position gets tested properly" | Same two-part construction reused. Rewritten: "Work out which side of the line leaves you better off before you take the step, and put the numbers on paper in a care VAT review." Link preserved. |
| "Exemption is a cost" | this post: "The cost arrives on the other side" | sibling: "Exemption is a cost, not a perk" | Already distinct. Left. |

## Track A note 2: FAQ 5 restating the body's fifth H2

Confirmed. FAQ 5 and the body paragraph shared the verb list ("employ another carer, work in partnership with one, or send someone in your place" against "Employ someone, take a partner, or send a substitute") and then the same consequence sentence almost word for word. FAQ 5 rewritten to lead with the answer ("Your VAT position inverts") and to state the consequence in its own words. The body paragraph is the fuller treatment and was left alone.

## Checklist, everything else

| Check | Result |
|---|---|
| Intro answers with numbers | Yes. First sentence carries £90,000; the paragraph contrasts £300,000 exempt against £91,000 standard rated. |
| H2s answer-first | All six are questions the reader would type, each answered in the first clause of the paragraph beneath. No edit. |
| AI tells | None. Grepped delve, landscape, navigate, crucial, "It is important", "In today's", realm, tapestry: zero hits. |
| Em-dashes and en-dashes | None in the file. |
| Markdown in the body | None. Body is raw HTML throughout; the only list is a `<ul>`. |
| Thin or padded sections | None. Shortest section is the incorporation H2 at two paragraphs, both load-bearing. No filler paragraph found to cut. |
| Pipeline leakage | None. No "verify at build", no "(HP*)", no TODO. The two `Source:` tails were the closest thing and are gone. |
| Banned claims | None. No pricing, no named people, no "chartered", no "ICAEW", no "our accountants", no "we advise", no "advice". "Your accountant prepares the registration and the first returns" is a role reference, not a claim about us, and is the same construction the other Wave 1 drafts use. |
| Body word count | 1,189, inside 800 to 1,200. Was 1,175. The three body edits net +14 words; trimmed once to hold headroom. No fact removed. |
| metaTitle | 42 chars. |
| metaDescription | 149 chars. |
| Internal links | 4, maximum 5. All four verified on disk by Track A; none added or removed. |
| YAML | Re-parsed after every edit. 15 keys, valid. `date`, `dateModified` and `updatedDate` all 2026-09-27. |

## Edits made (6)

1. FAQ 1: removed the trailing `Source: gov.uk/vat-registration/when-to-register.`
2. FAQ 2: removed the trailing `Source: gov.uk/guidance/welfare-services-and-goods-notice-7012.`, replaced with a prose attribution, and de-duplicated the Group 7 list against the body.
3. Key takeaway 1: rewritten to clear the near-verbatim threshold sentence shared with `vat-on-domiciliary-care.md`.
4. FAQ 5: rewritten to stop restating the body's fifth H2.
5. Body, final H2: de minimis sentence rewritten to clear the near-verbatim overlap with the sibling. Both figures and both limbs preserved.
6. Body, fifth H2: closing sentence rewritten to clear the shared "A specialist reviews..." construction.

## Manager notes

1. **The £625 de minimis sentence is near-verbatim across at least three other Wave 1 drafts**, outside this post's scope to fix: `cost-to-set-up-a-care-agency.md` ("averages no more than £625 a month and is less than half of total input tax in the period") and `supported-living-company-structure-before-framework-bid.md` (the identical clause) both carry it, and `vat-on-domiciliary-care.md` carries a close variant. This post is now the odd one out in a good way. Worth a wave-level sweep so the four do not ship reading as one template.
2. **Related: the "Only taxable turnover counts towards the £90,000 registration threshold, and exempt ... income is not taxable turnover" sentence** recurs near-verbatim in `nhs-continuing-healthcare-accounts.md`, `supported-accommodation-registration-and-tax.md` and `supported-living-company-structure-before-framework-bid.md`. Same sweep.
3. **House-style decision now set by this post**: `Source: <url>` tails are out, prose attribution is in, matching the two newest live posts. If the manager wants the opposite (tails everywhere), this post needs reverting and eleven siblings need adding to, so it is worth confirming once rather than per post.
4. No factual doubt raised. Nothing in Track A's table was touched.
