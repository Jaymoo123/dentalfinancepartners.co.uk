# Medical Wave 1: per-site post sweep (2026-09-27)

Scope: all 10 posts in `docs/medical/_wave1/posts/`, read together with their 20 Track A and
Track B reviews in `docs/medical/_wave1/qa/posts/`. Fixes applied in place. No commit.
No figure, rate, date or rule changed beyond the one correction the brief authorised.

VERDICT: PASS. 10 edits across 5 files. Two integration notes for the manager, neither blocking.

## 1. The carried-over factual defect

`salaried-gp-locum-work-tax.md` FAQ 1 still carried "Registering early costs nothing and starts
nothing, so there is no reason to wait." Track A on `register-self-employed-locum-doctor.md`
graded that same claim WRONG (edit log item 1: a registered self assessment record attracts a
notice to file, so registration does start something) and corrected it there. The sibling was
outside that review's scope and was flagged by its Track B for the manager.

Aligned, without copying the sibling's wording:

> Registering early costs nothing, but it is registration itself that starts the annual filing
> obligation.

Same position as the corrected `register-self-employed-locum-doctor.md` FAQ 1, different sentence.

## 2. Cross-post repetition

Detection was mechanical rather than by eye: every key takeaway, FAQ question, FAQ answer,
summary and body sentence of 7 words or more was reduced to 4-word shingles and compared
pairwise across posts (Jaccard >= 0.30). Seven pairs were above the line before the sweep;
zero are above it now.

| Repeat | Posts | Fixed in |
|---|---|---|
| Type 2 form, 28 February in arrears, 2025/26 due 28 Feb 2027 | register / salaried-gp | salaried-gp, recast and its trailing duplicate sentence folded in |
| Mileage 55p to 10,000 miles then 25p, plus the home-to-first-site commuting clause | nhs-uniform / register / salaried-gp | register and salaried-gp recast; nhs-uniform kept as the canonical phrasing, it being the expenses post |
| "Tell HMRC by 5 October following the end of the tax year ..." | doctors-returning (body + FAQ 5) / salaried-gp (KT 1, FAQ 1, body) | doctors-returning, both places, it being the tangential mention |
| "Class 2 is no longer a required payment ..." | register / salaried-gp (body + FAQ 2) | salaried-gp, both places |
| "Registering early costs nothing ..." | created by the item-1 fix | salaried-gp, see above |

Worked examples: no example is reused across posts. The consultant on £120,000 across 12
programmed activities appears only in `nhs-pension-partial-retirement-doctors-guide.md`; the
£1,000 of pensionable income worth £18.52 a year, and the £30,000 of solo income worth £555.56,
appear only in `medical-practice-incorporation-step-by-step.md`.

Intro openers. Three of the ten opened on the same "If you have X, ..." conditional
(closing-a-medical-limited-company, doctors-undeclared-income, nhs-pension-scheme-pays).
Two were recast to break the cluster, with every figure left where it was:

- doctors-undeclared-income: now opens on the list of income types as a bare noun phrase.
- nhs-pension-scheme-pays: now opens on the charge as the subject, not on the reader.

The ten openers now run: conditional, imperative-and, noun-phrase list, flat negation,
prepositional, numeric declarative, subject-first declarative, "you can", possessive
declarative, imperative-and. No single pattern.

## 3. Frontmatter sweep, by rule

Checked against the required key list, against the actual keys of the two newest live posts
(`nurse-tax-relief-professional-subscriptions.md` and
`maternity-pay-and-maternity-allowance-for-doctors.md`, both dated 2026-08-26), and against
`Medical/web/src/lib/blog.ts` with `STANDARD_MANIFEST` in
`packages/web-shared/lib/frontmatter.ts`.

- **Canonical host is `medicalaccounts.co.uk`, not `medicalaccountants.co.uk`.** All 88 live
  posts and all 10 wave posts use `https://www.medicalaccounts.co.uk/blog/<slug>`. All 10 wave
  canonicals match their own slug exactly. Nothing to fix; recording it because the sweep
  instruction named the other host.
- `updatedDate` was **missing on all 10**. Added to each, set equal to that post's
  `dateModified` (2026-09-27 on all ten). The Medical loader reads `dateModified`; `updatedDate`
  is read as an optional field and no live Medical post carries one, so this is additive and
  harmless, and it satisfies the QA brief's "set both".
- Every other required key present and non-empty on all 10: slug, title, date, dateModified,
  category, metaTitle, metaDescription, h1, summary, author, canonical, generator, faqs,
  keyTakeaways.
- `slug` matches the filename on all 10.
- `metaTitle` 43 to 55 characters, all within 60. `metaDescription` 137 to 154, all within 155.
- Categories all match categories already in use live: Incorporation & Company Structures,
  GP Tax & Accounts, Private Practice, GP Practice Management, NHS Pension Planning,
  Medical Expenses, Locum Tax.
- `STANDARD_MANIFEST` requires slug, title, date, category, metaDescription. All satisfied, so
  `assertFrontmatter` will not throw on any of the ten.
- YAML re-parsed cleanly on all 10 after every edit.
- Body word counts 963 to 1,200, all inside the 800 to 1,200 band. No em-dashes, no markdown
  in the body, no pipeline leakage strings.

## 4. Link resolution

38 internal links across the ten posts, 4 or 5 per post, none over the five-link cap.

- 34 `/blog/<slug>` links resolve to a file in `Medical/web/content/blog/`.
- 1 resolves to a sibling in the wave: `register-self-employed-locum-doctor.md` links to
  `/blog/salaried-gp-locum-work-tax`. Both must be integrated in the same batch or that link 404s.
- 3 `/calculators/<slug>` links all resolve through the tool registry:
  `private-practice-incorporation` (`src/lib/tools/configs/incorporation-calculator.ts`),
  `nhs-pension-scheme-pays`, `locum-tax-calculator`. Note that
  `Medical/web/src/app/calculators/[slug]/page.tsx` sets `dynamicParams = false`, so these
  three are prerendered and safe.
- No dead links.

## 5. Notes for the integrator

1. **Five of the ten overwrite an existing live post, five are new.** Overwrites:
   `gp-vat-registration`, `medical-practice-incorporation-step-by-step`,
   `nhs-pension-partial-retirement-doctors-guide`, `nhs-pension-scheme-pays-doctors-deadlines`,
   `nhs-uniform-tax-relief-laundry-allowance`. Each of those keeps the live post's original
   `date` and carries 2026-09-27 only in `dateModified` and `updatedDate`, which is the correct
   shape for a rewrite. New: `closing-a-medical-limited-company`,
   `doctors-returning-to-uk-tax-residence-split-year`,
   `doctors-undeclared-income-digital-disclosure-service`, `register-self-employed-locum-doctor`,
   `salaried-gp-locum-work-tax`. Confirm the five overwrites are intended rewrites before the
   files are moved.
2. **The five new posts carry no `image`, `altText` or `imageCredit`.** All 88 live Medical posts
   have one. The loader treats `image` as optional and `BlogPostRenderer` guards on it, and the
   OG image falls back to `buildOgImageUrl`, so nothing breaks; those five would simply be the
   only posts on the site with no in-body image. Sourcing images is outside a QA sweep.
   The five overwrites all keep their live image block.
3. The five new posts also omit `schema: ''`, which all live posts carry. Optional in the loader
   and not on the required list, so left alone.
