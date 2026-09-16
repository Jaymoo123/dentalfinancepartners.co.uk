# Property value claim: what the data can actually support

Read-only investigation, 2026-08-22. Replaces the unsupportable
"£2.4M+ Tax savings identified" stat in `Property/web/src/lib/site-stats.ts:14`.

Data through 2026-08-21. All figures re-derivable from the SQL in section 6.

---

## 1. Headline answer

**There is no client base in this database, so no figure can be called
"property we advise on".** Property is a lead-gen site: enquiries are handed to
a partner firm. There is no clients table, no engagement record, no
`status = 'client'`. Anything that says or implies "our clients" is a lie.

**Property VALUES are stated by 10 of 158 enquiries (6.3%).** Total stated,
strictly filtered: **£12.3M**. That is a real, defensible, re-derivable number,
but it is a manual read of free text, not a database column, and one enquiry is
28% of it.

**Property COUNTS are far better attested than values.** Every single enquiry
carries a bucketed portfolio-size band (`leads.role`), so a floor count of
**280+ properties** is computable in one SQL statement with zero estimation and
zero judgement. This is the strongest thing the site holds.

Recommendation is in section 7.

---

## 2. Data inventory: everywhere the estate could hold property holdings

Verified against live schema and code, not the docs.

| Source | Table.column | Type | Holds property value? | Verdict |
|---|---|---|---|---|
| Portfolio-size band | `leads.role` | text | No, holds property COUNT band | **USABLE — 100% coverage** |
| Enquiry free text | `leads.message` | text | Sometimes, unstructured | **USABLE — 6.3% coverage for value** |
| Lead extras | `leads.extras` | jsonb | No | Dead end |
| Calculator inputs | — | — | **Not persisted at all** | Dead end |
| Assistant slot capture | `lead_conversation_state.captured` | jsonb | Table is EMPTY (0 rows) | Dead end |
| LLM lead scoring | `lead_value_scores.est_value_gbp` | int | No — it is an estimated FEE, capped £20k | Dead end, and a trap |
| Lead enrichment | `lead_enrichment.*` | — | Companies House match only | Dead end |
| Nurture system | `lead_nurture_*` | — | Send/state bookkeeping only | Dead end |
| Analytics events | `web_events.props` | jsonb | Field IDs only, never values | Dead end |
| Agency health check | `health_check_submissions` | — | Agency site, not Property; no property values | Out of scope |

### 2.1 `leads.role` — the portfolio-size band (the good source)

`Property/niche.config.json` `lead_form.role_options` defines five options, and
three of them are explicit property-count bands the visitor self-selects:

| `role` value | Label shown to visitor | Implied floor |
|---|---|---|
| `Individual landlord` | "Individual landlord (1-3 properties)" | 1 |
| `Portfolio owner` | "Portfolio owner (4-10 properties)" | 4 |
| `Large portfolio` | "Large portfolio (10+ properties)" | 10 |
| `Property developer` | "Property developer" | unknown |
| `Other` | "Something else" | unknown |

- **Type:** bucketed range, self-declared by the person, not derived.
- **Coverage:** 158 / 158 non-spam Property leads. No nulls.
- **Date range:** 2026-04-05 to 2026-08-21.
- **Belongs to:** ANY VISITOR who completed a capture form (all placements
  require role since the 2026-07 multi-step change).

### 2.2 `leads.message` — free text (the weak source)

- 158 non-spam rows, 2 empty, mean length 348 chars.
- 25 rows contain a `£` figure. After reading all 25 plus 44 more that mention
  properties/portfolio/worth without a `£`, **10 rows state a value for property
  the enquirer themselves currently owns.**
- **Type:** real figures the person typed, but in prose, mixing purchase price,
  current value, mortgage balance and planned-purchase price in the same
  sentence. Extraction is a human/LLM read, not a query.

### 2.3 Calculators — confirmed NOT persisted

`Property/web/src/components/calculators/premium/PremiumCalculator.tsx:503-520`
emits `calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`.
The event payload (`base`, line 492) is `{calculator_slug, placement,
tool_kind, category}` and `calc_input_change` adds `field_id` only. **No input
value ever leaves the browser.** The analytics allowlist in
`packages/web-shared/analytics/types.ts` confirms no value-carrying calc event
exists. Several calculators take property values and portfolio sizes; all of it
is discarded client-side. Nothing to mine, historic or future.

### 2.4 `lead_value_scores.est_value_gbp` is a trap

205 rows, well populated, looks tempting. It is the Claude triage estimate of
the **first-year accountancy fee if the lead were won**
(`Property/web/src/lib/leads/value-score.ts:16`, capped at £20,000). It is a
model guess about fees, not property value, and it is estate-wide, not
Property-only. Do not use it for anything public.

### 2.5 There is no CLIENT tier

`leads.status` values present for Property: `new`, `nurturing`, `contactable`,
`forwarded`, `unreachable`, `closed`. `forwarded` (n=6) means handed to the
partner firm, not won. Nothing in the estate records whether the partner firm
converted anyone. **Candidate figure (a) — total property value across CLIENTS —
is not derivable at all, and will not be until the partner firm reports back.**

---

## 3. Row-count integrity

| Check | Result |
|---|---|
| Property lead rows, all time | 159 |
| `is_test = true` | 0 |
| `role = 'resource'` (download gate, never forwarded) | 0 |
| `extras.suspected_spam = 'true'` | 1 — **excluded**, working base = **158** |
| `extras.honeypot` present | 4 (1 later cleared as false positive; honeypot rows are de-fanged at submit, they are already inside the 158 and 3 remain suspect) |
| Distinct emails | 155 of 159 → **4 duplicate submissions** |
| Duplicate emails | `anniewolohan@`, `ronaldcurtis@`, `sanitizingsolutions@`, `benjenmel@` — all same-person repeats within 6 days |

None of the 4 repeat submitters appears in the 10 value-stating rows, so the
value figure is not double-counted. A count-based figure must dedupe on email.

---

## 4. Candidate figures

### (a) Total property value across CLIENTS
**Not derivable. No client records exist.** Do not produce a number.

### (b) Total property value across QUALIFIED LEADS
Qualified = reached `contactable`, `forwarded` or `closed` (i.e. someone proved
responsive and it went somewhere). 83 of 158.

Of the 10 value-stating rows, 8 are qualified. Stated values:

| Date | `role` | Stated value owned | Properties |
|---|---|---|---|
| 2026-07-11 | Individual landlord | £325,000 | 1 of 2 valued |
| 2026-07-22 | Individual landlord | £515,000 | 1 of 2 valued |
| 2026-07-23 | Portfolio owner | £2,100,000 | 8 |
| 2026-07-31 | Individual landlord | £546,000 | 2 (investment only) |
| 2026-08-13 | Individual landlord | £475,000 | 1 (mid of "450-500K") |
| 2026-08-13 | Portfolio owner | £900,000 | 5 |
| 2026-08-14 | Large portfolio | £600,000 | 2 |
| 2026-08-19 | Portfolio owner | £3,400,000 | 11 |

**Total: £8,861,000 across 8 qualified enquiries.**

### (c) Total property value across ALL enquiries
Adds the 2 unqualified (status `new` / `unreachable`) value-stating rows:

| Date | `role` | Stated value owned | Properties |
|---|---|---|---|
| 2026-06-16 | Large portfolio | £2,250,000 | 12 (freehold block, Cardiff) |
| 2026-07-03 | Other | £1,213,000 | portfolio, count not stated |

**Total: £12,324,000 across 10 enquiries, out of 158 (6.3% coverage).**
Round honestly to **£12M+**.

Deliberately EXCLUDED, with reasons (this is where an inflated number would come from):

| Value | Why excluded |
|---|---|
| £5,000,000 | An ADVISER enquiring on behalf of their private client. Not our enquirer's property. |
| £2,000,000 | Value of a share issue, not of the property. |
| £475,000 | The enquirer's PARENTS' house. Third party. |
| £1,500,000 + £400,000 | Edinburgh home about to be purchased. Not owned, and a main residence. |
| £645,000 / £445,000 / £80-150k | Planned purchases. Not owned. |
| £240,000 ("3 × £80k BTLs") | Reads as a pasted adviser agenda for a planned acquisition. |
| £168,000 | Office "in the process of purchasing". |
| £220,000 | A property already sold. |
| £40,000 | Estonian property, overseas, marginal. |
| ~£180,000 | Portuguese property, currency ambiguous (€ vs £). |
| £350,000 | Family home of an included lead — investment property only counted. |
| Every mortgage balance | Debt, not value. |

Including all of the above gets you to **~£20.8M across 17 enquiries**. It is a
bigger number and it is not honest.

### (d) Averaged / gap-filled figures

Two averaging routes exist. Both are dominated by estimate.

**(d1) Per-property average from stated data.** Excluding the one lead that
gave a portfolio value without a count, the other 9 state £11,111,000 across 43
properties = **£258,395 average per property**. (Sanity check: close to the UK
average house price, which is reassuring but also means the average carries no
information the ONS does not already publish.)

**(d2) Band floor × that average.** Multiplying the 280-property floor by
£258,395 gives **~£72M**. **97% of that is estimated, not stated** — 43
properties out of 280 have a stated value. It is arithmetic dressed as
evidence. **Reject.**

**(d3) Filling the 148 value-less enquiries with the average.** 148 of 158 rows
filled = 94% estimated. Same objection. **Reject.**

The owner's instinct ("where we can average it we do") is reasonable but the
coverage is 6.3%, not the 60-70% that would make averaging defensible. At this
coverage, averaging IS the number.

### (e) The strong alternative the owner did not ask for: property COUNT

`leads.role` is a self-declared band on 100% of rows, so a **floor** is exact:

| Band | Leads | Floor per lead | Floor properties |
|---|---|---|---|
| Individual landlord (1-3) | 80 | 1 | 80 |
| Portfolio owner (4-10) | 20 | 4 | 80 |
| Large portfolio (10+) | 12 | 10 | 120 |
| Property developer | 6 | 0 (unknown) | 0 |
| Other | 40 | 0 (unknown) | 0 |
| **TOTAL** | **158** | | **280** |

**280+ properties represented by enquiries received.** Zero estimation, zero
judgement, one SQL statement, and it is a genuine understatement (developers and
"Other" contribute nothing, and every band is counted at its bottom edge).

Qualified-leads-only version: 44 + (12×4) + (7×10) = **162 properties**.

Free-text corroboration: enquirers who stated an exact count include 32 flats,
~90 units (historic), 18, 15, 13, 12, 11, 8, 7, 6, 5, 5, 5, 5 — the bands are
conservative, several "Large portfolio" leads are far above 10.

---

## 5. Honesty analysis

### 5.1 What each figure may and may not be called

| Figure | May be called | May NOT be called |
|---|---|---|
| £12.3M (c) | "£12M+ of property value described in enquiries we have received" | "property we advise on", "£12M under advice", "client portfolios", "assets managed" |
| £8.9M (b) | "£8.9M of property described by landlords we have spoken to" | anything with "clients" or "managed" |
| 280+ | "280+ properties represented by landlord enquiries" | "280 properties we look after" |
| £72M (d2) | nothing publishable | anything at all |

The gap between "property we advise on" and "property value represented by
enquiries we have handled" is the whole exercise. The site advises nobody: it
qualifies enquiries and hands them to a partner firm. Any wording implying a
book of business under management is false and would also contradict the
lead-gen model documented across the estate.

### 5.2 Concentration / GDPR

Aggregate-only publication is fine in principle, but **concentration is a real
problem for the value figure**:

- The single largest enquiry (£3.4M) is **28%** of the £12.3M.
- The top 3 (£3.4M + £2.25M + £2.1M) are **63%**.
- n = 10. That is small enough that a person who submitted a distinctive
  enquiry (e.g. "freehold block of 12 flats in Cardiff, £2.25m") could
  recognise their own contribution, and someone who knows the market could
  potentially identify them. The published total does not disclose them, but
  the figure is one enquiry away from moving materially.

The 280-property count has n = 158 with no single row worth more than 32/280
(11%), and the published number is a floor derived from bands, not from any
individual's disclosure. **Materially safer.**

### 5.3 Duplicates, tests, spam

- 0 test rows, 1 spam row excluded, 4 duplicate emails (none in the value set).
- 3 honeypot-flagged rows remain in the 158 base; they inflate the count figure
  by at most 3 properties, i.e. ~1%. Since 280 is a floor, this is noise.
- No repeat submitter contributes to the value total, so no double counting.

### 5.4 Is it an estimate?

- £12.3M: **not an estimate**. Every pound is a figure a person typed. One item
  is a stated range (£450-500k) taken at midpoint; that is £475k of £12.3M, 3.9%.
  Label it "stated in enquiries", not "estimated".
- £72M: **97% estimated**. If published it must say "estimated", at which point
  it is worth less than the honest £12.3M.

### 5.5 Stability across the 12 pages it renders on

- **£12.3M is unstable.** 10 rows in ~5 months. One £3M+ enquiry moves it 25%.
  It will also *decline* in credibility terms if a quiet quarter passes, and the
  "+" suffix only protects against understatement, not against the number
  looking frozen. Maintaining it means re-reading free text by hand every
  quarter. That is exactly the maintenance burden that produced the
  £2.4M problem in the first place.
- **280+ is stable and monotonic.** It only ever rises, roughly +30/month at the
  current ~30 leads/month rate, and refreshing it is one query. Rounded to a
  "+" figure it needs touching perhaps twice a year.

---

## 6. Reproducible queries

Runner: `python scripts/_q.py <file.sql>` (read-only, Supabase Management API,
project `dhlxwmvmkrfnmcgjbntk`, `SUPABASE_ACCESS_TOKEN` from root `.env`).

### 6.1 The recommended figure — property count floor

```sql
-- Property enquiry portfolio floor. Bands come from
-- Property/niche.config.json lead_form.role_options; each band is counted at
-- its BOTTOM edge, developers and "Other" contribute zero, so the result is a
-- guaranteed understatement.
with base as (
  select *
  from leads
  where source = 'property'
    and coalesce(is_test, false) = false
    and (extras->>'suspected_spam') is distinct from 'true'
    and coalesce(role, '') <> 'resource'
)
select
  count(*)                                          as enquiries,
  count(distinct lower(email))                      as unique_people,
  sum(case role
        when 'Individual landlord' then 1
        when 'Portfolio owner'     then 4
        when 'Large portfolio'     then 10
        else 0 end)                                 as properties_floor,
  sum(case when status in ('contactable','forwarded','closed') then
        case role
          when 'Individual landlord' then 1
          when 'Portfolio owner'     then 4
          when 'Large portfolio'     then 10
          else 0 end
      else 0 end)                                   as properties_floor_qualified,
  min(created_at)::date                             as first_enquiry,
  max(created_at)::date                             as data_through
from base;
```

Result 2026-08-21: `enquiries=158, unique_people=154, properties_floor=280,
properties_floor_qualified=162, first_enquiry=2026-04-05,
data_through=2026-08-21`.

### 6.2 The value figure — candidate shortlist, then a human read

There is no query that produces £12.3M, because the values live in prose. What
IS reproducible is the candidate set and the audit trail:

```sql
-- Step 1: every Property enquiry that mentions a money figure or a holding.
select id, created_at::date, role, status,
       regexp_replace(message, '\s+', ' ', 'g') as msg
from leads
where source = 'property'
  and coalesce(is_test, false) = false
  and (extras->>'suspected_spam') is distinct from 'true'
  and (message ~* '[£]\s*[0-9]'
       or message ~* '[0-9][0-9,\.]*\s*(k|m|million)\y'
       or message ~* '\yworth\y|\yvalue|\yportfolio|\yproperties\y|\yflats\y|\yunits\y')
order by created_at;
```

Returns 69 rows (25 with `£`, 44 without). Step 2 is a read against these
inclusion rules, which must be applied identically on any re-run:

1. Count only property the ENQUIRER currently owns. Exclude planned purchases,
   properties already sold, third parties (advisers' clients, parents).
2. Count value, never mortgage balance, never rental income, never turnover.
3. Exclude main residences unless the enquiry is about them as an asset.
4. Exclude non-GBP or currency-ambiguous overseas holdings.
5. Take the midpoint of a stated range and record that it was a range.

The 10 rows that pass, as of 2026-08-21, and their audit trail:

| lead id (prefix) | Value | Basis |
|---|---|---|
| `5ff07766` | £2,250,000 | "block of 12 flats... Value £2,25m" |
| `0a8b9d70` | £1,213,000 | "purchased for £350,00 now valued at 1,213,000" |
| `83e35f85` | £325,000 | "159B... Current value around £325k" |
| `b6cc7851` | £515,000 | "Current value 515'000" |
| `02ef5d1f` | £2,100,000 | "portfolio is worth ~£2.1m" |
| `e29d6825` | £546,000 | "£400,000" + "£146,000" (family home £350k excluded) |
| `ec7159cd` | £900,000 | "Value of properties currently stands at £900k" |
| `9305eea2` | £600,000 | "2 commercial properties for £300,000 each" |
| `4262fa4b` | £3,400,000 | "x8... value £2.2M" + "x3... Value £1.2M" |
| `1b5f5ec5` | £475,000 | "worth 450-500K", midpoint |
| **TOTAL** | **£12,324,000** | 10 of 158 enquiries |

Qualified-only subset (drop `5ff07766` status `new` and `0a8b9d70` status
`unreachable`): **£8,861,000 across 8**.

### 6.3 Integrity checks

```sql
select count(*) as rows_all,
       count(*) filter (where is_test) as test_rows,
       count(*) filter (where (extras->>'suspected_spam') = 'true') as spam,
       count(*) filter (where (extras->>'honeypot') is not null) as honeypot,
       count(*) - count(distinct lower(email)) as duplicate_submissions
from leads where source = 'property';
```

---

## 7. Recommendation

**Use the property count, not the property value.**

Replace "£2.4M+ Tax savings identified" with a figure built on
`leads.role`, and call it something like **"280+ properties represented by
landlord enquiries"** (exact wording is the owner's call; the constraint is that
it must say *enquiries*, never *clients*, *advise*, or *manage*).

Why, in order:

1. It is 100% covered by a database column, 0% estimated, and it is a floor.
2. It is one SQL statement. It can be re-derived in ten seconds, forever, which
   is the entire point of this exercise.
3. It is stable and monotonic. It only goes up, ~30/month, so a rounded "+"
   figure survives a year between edits across all 12 pages.
4. No concentration risk. No individual is identifiable from it.
5. It is a genuine understatement, so it survives challenge. Enquirers with 32
   flats, 18 properties and 15 properties are each counted as 10.

**If a money figure is wanted anyway**, the only defensible one is
**£12M+ of property value described in enquiries we have received** (10 of 158
enquiries, £12,324,000 stated). It is honest and every pound is quoted, but be
clear about the cost: 6.3% coverage, one enquiry is 28% of it, and it needs a
manual re-read of free text every time it is refreshed. Do not publish the
averaged £72M under any label.

**Do not publish any "clients" or "advise on" framing.** There are no clients in
this system, and the first person to ask "which clients?" ends the conversation.

Blast radius of the recommended change: one array literal in
`Property/web/src/lib/site-stats.ts`, rendered on 12 pages. Revert = git revert.
