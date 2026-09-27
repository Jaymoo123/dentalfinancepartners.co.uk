# Charities wave 1: per-site post sweep

Date: 2026-09-27. Scope: all 8 posts in `docs/charities/_wave1/posts/`, read together, plus the five newest live posts in `charities/web/content/blog/` (`how-much-should-a-charity-hold-in-reserves`, `which-charitable-causes-earn-the-most`, `charity-scrutiny-cliff-how-many-charities-sit-below-each-threshold`, `how-long-do-uk-charities-last`, `annual-report-vs-annual-return`). Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` s13 S4b; QA rules `docs/_engines/WAVE1_POST_QA_BRIEF.md`.

Verdict: integrate. 17 edits across 5 files. No figure, rate, date or rule changed anywhere.

## 1. Recital ownership

| Recital | Owner | Action elsewhere |
|---|---|---|
| Small trading tiers (£8,000 / 25% / £80,000, £32,000, £320,000) | `does-a-charity-need-a-utr-and-tax-return` | `charity-income-from-charitable-activities-vs-donations` carried them twice in full (H2 6 body, FAQ 5). Both cut to one clause with the £8,000 entry figure plus a pointer to the owner (body: link; FAQ: prose attribution) |
| Scrutiny gate £25,000 / £40,000 | `registering-a-charity-late` | No other post stated it. The £25,000 in the related-party and income posts is the annual-return attachment threshold, a different rule, and stays |
| Scotland / OSCR universal scrutiny | `registering-a-charity-late` | `charity-consolidating-legacy-bank-accounts-restricted-funds` carried it twice: FAQ 6 trimmed to one clause, the duplicate closing paragraph deleted. `charity-income-from-charitable-activities-vs-donations` and `does-a-charity-need-a-utr-and-tax-return` are now silent: SORP income categories and direct tax are UK-wide, so Scotland changes nothing in either |
| SORP 2026 commencement (1 January 2026) | `charity-income-from-charitable-activities-vs-donations` | `charity-annual-return-related-party-transactions` rewritten to "the SORP edition that governs your period", keeping its existing link to the live `charity-sorp-2026-changes`. `charity-consolidating...` carried it twice: the FAQ 5 tail cut to a check instruction, the body cut to one clause plus a link to the owner |
| Endowment mechanics (ss.281 to 284D, £25,000, 60 days, 25% / 20 years) | `permanent-endowment-what-trustees-can-spend` | Already clean. The bank accounts sibling carries only the consequence for a consolidation and links across. No change |

Scotland retained where it does change the answer: `charity-annual-return-related-party-transactions` (in Scotland the return is OSCR's and asks different questions) and `registering-a-charity-late` (owner).

One exception logged rather than fixed: the related-party post is at the five-link cap, so its SORP clause points at the live `charity-sorp-2026-changes` rather than at the wave owner. Acceptable, and the live post is the deeper resource.

## 2. Shingle check (8-gram, mechanical)

Ran across all 8 wave posts plus the five newest live posts, frontmatter and body together. Every wave-internal near-verbatim pair is cleared. What remains:

- **Anchor text only.** `charity-consolidating...` and `permanent-endowment...` both link "how much a charity should hold in reserves". One shingle, the link label itself. Not fixable without changing the anchor.
- **Statutory formula against live posts.** "for financial years ending on or after 30 September 2026" collides between `charity-income-from-charitable-activities-vs-donations` / `registering-a-charity-late` and three live posts. Rewording risks the fact. Left, as Track B flagged.

Openers and closers no longer follow one mould. Three posts closed on a Scotland clause; two of those closers are gone and the third (related-party) was rewritten to close on the register of interests. Two posts closed on "Support ... sits on the <service> page"; the UTR post's closer was rewritten.

The "a specialist reviews ... your accountant prepares" pairing ran in four posts. Now two: `charity-vat-reduced-rate-fuel-and-power-certificate` and `charity-consolidating-legacy-bank-accounts-restricted-funds`. The half-clause was dropped from `charity-annual-return-related-party-transactions` and `registering-a-charity-late`; both keep their single "a specialist reviews" reference.

## 3. Annual-return questions gated by income band

`charity-annual-return-related-party-transactions` listed three related party questions without saying which charities see them. Added the band gate: a charity with gross income of £10,000 or less reports income and spending and nothing more, and the fuller question set starts above that. The £100,000 gate on the highest-value donation question was already stated and is unchanged. `charity-income-from-charitable-activities-vs-donations` and `registering-a-charity-late` already stated their bands.

## 4. The "expedient" gloss

KEPT. gov.uk `permanent-endowment-rules-for-charities`, "Rules for borrowing smaller amounts", says of the s.284A expedience test: "This means it must bring a clear advantage, rather than just being convenient." The post's wording tracks the guidance. No change.

## 5. Frontmatter

All 8 pass. 15 keys each, identical set: `slug`, `title`, `date`, `dateModified`, `updatedDate`, `category`, `metaTitle`, `metaDescription`, `h1`, `summary`, `author`, `canonical`, `generator`, `keyTakeaways`, `faqs`. All three dates 2026-09-27. Every `author` is "Trustee Tax Editorial Team". Every canonical is `https://www.trusteetax.co.uk/blog/<category-slug>/<slug>` and matches the category as `slugifyCategory` in `charities/web/src/lib/blog.ts` renders it. Six FAQs and five key takeaways each. No "Source: url" tails; the one attribution added in this sweep is prose. No em-dashes in any file.

Categories used, all inside the eight in `POST_BRIEF.md`: Trustee Compliance (3), Charity Finance, Charity Accounts and SORP, Charity VAT, CICs and Social Enterprises, Charity Governance.

The loader requires only `slug`, `title`, `date`, `category`, `metaDescription` (`STANDARD_MANIFEST` in `packages/web-shared/lib/frontmatter.ts`). It reads `updatedDate`, not `dateModified`; `dateModified` is inert but kept for parity with the wave. Charities blog files are flat in `content/blog/` with the category in frontmatter, which is how these are written.

**Byline finding: charities renders no byline.** `charities/web/src/app/blog/[category]/[slug]/page.tsx` never reads `post.author`, and `buildArticleJsonLd` is called with title, description, url, datePublished and dateModified only, so `author` reaches neither the page nor the Article schema. The two newest live posts carry `author: "Trustee Tax Editorial Team"` and nothing renders it either. The key is kept for corpus consistency and in case the template later adopts it, but nobody should expect a visible byline or an author node on this site today.

`updatedDate` equals `date` on all 8, so `hasUpdate` is false and no "Updated" pill renders. Correct for a first publication.

## 6. Internal links

Every link resolves. Counts after the sweep: 5 links in seven posts, 3 in the fuel and power post. None over the cap.

Blog targets, all live on disk with a category that slugifies to the path used: `charity-commission-annual-return-guide`, `charity-trading-subsidiary-gift-aid`, `charity-sorp-2026-changes`, `trustees-annual-report-guide`, `annual-report-vs-annual-return`, `what-is-an-independent-examination`, `best-charity-bank-accounts`, `how-much-should-a-charity-hold-in-reserves`, `do-charities-pay-vat`, `can-charities-claim-back-vat`, `cic-vs-charity`, `business-donations-to-charity-tax`, `cic-funding-and-grants`, `hmrc-recognition-vs-charity-registration`, `gift-aid-declaration-wording`.

Calculators, checked against `charities/web/src/lib/calculators/tools/`: `/calculators/gift-aid-calculator` and `/calculators/independent-examination-vs-audit-checker`. The second resolves on the `slug` field inside `independent-examination-audit-checker.ts`, which differs from the filename. Correct as written.

`src/data/` targets: `/for/cics` (`charity-types.ts`), `/services/charity-accounts` and `/services/charity-registration` (`charity-services.ts`). All present.

### Sibling-dependent links (break if a wave post slips)

| From | To | Path depends on |
|---|---|---|
| `charity-consolidating-legacy-bank-accounts-restricted-funds` | `permanent-endowment-what-trustees-can-spend` | category staying "Charity Governance" |
| `charity-consolidating-legacy-bank-accounts-restricted-funds` | `charity-income-from-charitable-activities-vs-donations` (added this sweep) | category staying "Charity Accounts and SORP" |
| `permanent-endowment-what-trustees-can-spend` | `charity-consolidating-legacy-bank-accounts-restricted-funds` | category staying "Charity Finance" |
| `charity-income-from-charitable-activities-vs-donations` | `does-a-charity-need-a-utr-and-tax-return` (added this sweep) | category staying "Trustee Compliance" |

All eight must publish together, or these four links need repointing.

## Edits by file

**charity-annual-return-related-party-transactions.md (4)**
1. H2 "Which annual return questions ask about related parties?": added the £10,000 band gate on the question set.
2. SORP paragraph: commencement date removed, now "the SORP edition that governs your period". Link unchanged.
3. Dropped "Your accountant prepares the same analysis" (pairing cap), replaced with "The same analysis feeds the notes to the accounts".
4. Closing paragraph rewritten so the post no longer closes on a Scotland clause. Scotland content retained.

**charity-consolidating-legacy-bank-accounts-restricted-funds.md (4)**
1. FAQ 5: SORP 2026 commencement sentence replaced with a check instruction.
2. Body "What the accounts have to carry afterwards": commencement date cut, link to the owner post added. Link count 4 to 5.
3. FAQ 6: Scotland clause trimmed to the one fact that matters here.
4. Deleted the duplicate Scotland closing paragraph. Post now closes on the ordered exercise.

**charity-income-from-charitable-activities-vs-donations.md (5)**
1. FAQ 5: tiers cut to the £8,000 entry figure plus prose attribution to the owner post.
2. Body trading paragraph: tiers cut to one clause, link to the owner post added.
3. H2 6: reworded off a 9-shingle run with the live `annual-report-vs-annual-return`; `trustees-annual-report-guide` link dropped to stay at the cap.
4. FAQ 6: same run trimmed.
5. Deleted the Scotland H2 and its paragraph. Scotland changes nothing about which box income goes in.

**does-a-charity-need-a-utr-and-tax-return.md (3)**
1. Deleted the Scotland sentence. Direct tax is UK-wide, so the post stays silent. (This was the Track B reviewer's own open question in the editorial report, resolved.)
2. CIC sentence reworded off a shingle clash with the fuel and power post.
3. Closer rewritten off the shared "Support ... sits on the <service> page" mould.

**registering-a-charity-late.md (1)**
1. Dropped "and your accountant prepares the accounts on whichever basis applies" (pairing cap).

**charity-vat-reduced-rate-fuel-and-power-certificate.md, cic-donations-accounting-and-gift-aid.md, permanent-endowment-what-trustees-can-spend.md**: no edits needed.

## After the sweep

| Post | Words | Links |
|---|---|---|
| charity-annual-return-related-party-transactions | 1,160 | 5 |
| charity-consolidating-legacy-bank-accounts-restricted-funds | 1,156 | 5 |
| charity-income-from-charitable-activities-vs-donations | 990 | 5 |
| charity-vat-reduced-rate-fuel-and-power-certificate | 1,093 | 3 |
| cic-donations-accounting-and-gift-aid | 1,199 | 5 |
| does-a-charity-need-a-utr-and-tax-return | 1,181 | 5 |
| permanent-endowment-what-trustees-can-spend | 1,019 | 5 |
| registering-a-charity-late | 1,114 | 5 |

All inside the 800 to 1,200 band. YAML re-parsed clean on all 8 after editing. Not committed.

## Open for the manager

1. `charity-vat-reduced-rate-fuel-and-power-certificate` has an `h1` of 90 characters and only 3 internal links. Neither breaches this brief. Left alone.
2. `charity-annual-return-related-party-transactions` has `title` identical to `h1` at 59 characters. No rule against it; flagged by both tracks and left.
3. Track B suggested holding one canonical small-trading-tier sentence in `docs/charities/house_positions.md`. Now that the tiers live in one owner post, that is a smaller job. Worth doing before wave 2.
