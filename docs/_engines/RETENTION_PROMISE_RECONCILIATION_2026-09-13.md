# Retention promise reconciliation, 2026-09-13

Read-only investigation. Nothing edited, built or run. Verified against source, not against the brief.

## 0. The brief was partly wrong

The brief quotes a comment "The data-sharing agreement requires deletion/anonymisation of contact
details and message content within 3 months of the enquiry date" as present "identically on ~17
sites". It is present on **16** of the 17 `retention.ts` files. **Property does not carry it.**
`Property/web/src/lib/leads/retention.ts:1-19` was rewritten and now says the opposite:

> "DSA clause 11.1 requires deletion or anonymisation no later than the period that site publishes,
> and in any event no later than 24 months from the enquiry. The published figure is therefore the
> operative promise and this mirror exists to keep the purge matching it."

Property is also the only implementation that matters at runtime for the shared `leads` table (see §4).
The 16 stale comments are copies of a superseded contract's clause.

## 1. Does a DSA exist, and what does it say about retention?

Yes. Two generations.

**Current, governing: `legal/DSA_TEMPLATE.md:125` (clause 11.1)**

> "11.1 The Supplier will delete or anonymise the Shared Data (the enquirer's contact, verification
> and enquiry details) no later than the retention period published in the privacy notice of the Site
> the enquiry was submitted through, and in any event no later than 24 months from the enquiry. It may
> keep only the minimum needed to evidence the lawful basis and consent and the transparency
> information provided, to support its own records and reconciliation, and to meet legal duties. Any
> records kept under this carve-out will be limited to what is strictly necessary, will be held under
> access controls, and will be retained for no longer than 6 years from the Referral, after which they
> will be deleted or anonymised."

Summary table restates it at `legal/DSA_TEMPLATE.md:240`. The only "3 months" in the current template
is `:91`, clause 3.6(e), a **Recipient** obligation on a Bulk Supply, not a Supplier obligation:

> "(e) the Recipient will delete or anonymise any enquiry in the batch which it does not pursue, within
> 3 months of supply."

The Aswatax instance carries the identical 11.1 text (`legal/aswatax/DSA_and_IDTA_Aswatax.md:127`).

**Superseded: `legal/_archive/Lead_Generation_and_Data_Sharing_Agreement.md:676` (DJH era, Sch 2 cl 10.1)**

> "...will delete or anonymise the Lead Data (the enquirer's contact details and any enquiry message)
> within **3 months** of Delivery..."

Its own drafting note at `:682` says: "Align the site's `enquiry_retention_months` config (currently
24) to 3 so the public privacy notice stays consistent." That is the origin of both the 3-month code
comment and `DEFAULT_MONTHS = 3`.

How we know which is current: `legal/_archive/README.md:3` — "Superseded by the pool/claim operating
model (standing DSA + LIA in `legal/`, 10 August 2026)." The DJH arrangement ended; Property's own code
comment records the same ("That deal ended and the pool-model DSA defers to whatever the site
publishes, so it moved to 24 on 2026-08-17 with the rest of the estate (owner instruction)").

## 2. Is it executed?

**No, not against anyone today.**

- `legal/DSA_TEMPLATE.md` is a template: the counterparty is "the recipient firm... signing in the
  signature block", and `:9` says "until it is completed, no agreement is formed".
- The only instantiated copy, `legal/aswatax/DSA_and_IDTA_Aswatax.md:201-204`, is **pre-signed on the
  owner's side only**: "Signature: MJ MOUGHAL | Name: Mohammed Junayd Moughal | Date: 26 August 2026",
  with the Recipient column blank dots. `:3` "Dated: the date of the last signature below" and `:147`
  "starts on the date of the last signature below" mean it is **not yet in force**.
- `legal/aswatax/Sidekick_DSA_note.md` lists "Have Sidekick sign the standing DSA" as an open, unticked
  owner action, and confirms ICO registration is "still outstanding, required before the first referral".
- The one genuinely executed DSA is the DJH agreement
  (`legal/_archive/Lead_Generation_and_Data_Sharing_Agreement_EXECUTED_2026-06-22.pdf`, signed 22 June
  2026), which is the 3-month one, and it is archived as superseded and the deal is over.

So: no binding DSA is in force against a live counterparty. Standing paperwork awaiting a signature.

## 3. Reconciling the three numbers

| Number | Source | Status |
|---|---|---|
| 3 months | Superseded DJH agreement, Sch 2 cl 10.1 | **Dead.** Executed, then terminated/superseded Aug 2026. Survives only as stale comments and `DEFAULT_MONTHS = 3`. |
| 24 months | Current DSA template cl 11.1 **longstop** | Unexecuted. And it is a *ceiling*, not a floor: it expressly defers to the published figure. |
| 24 months | Published privacy notice on 17 sites (3 on ashfield) | **This is what actually governs.** It is the Article 13 promise made to the data subject, and UK GDPR Art 5(1)(e) binds the promise regardless of any contract. |

**What governs enquiry data today: the published privacy notice figure** — 24 months everywhere except
ashfield (3). The current DSA agrees with that by design. Nothing is in breach of a binding contract,
because no contract is binding. The 3-month code comment is a documentation defect, not an exposure.

The real exposure is the opposite of the one the brief suspected: the sites **promise deletion** and the
purge is dormant (§4), so data is being kept past 24 months with a published promise that it is not.
That is a GDPR/transparency issue, not a contract issue, and it is already logged as an open owner
decision (`docs/property/STATE.md:35-61`, `docs/charities/_port/PHASE0_CLAIMS_LEDGER.md:110`).

## 4. What the purge cron actually does today

- **Scheduled** on 17 sites, daily 03:30, `/api/cron/lead-retention` (each `*/web/vercel.json`).
- **Dry-run by default**: `Property/web/src/app/api/cron/lead-retention/route.ts:51-55` sets
  `dryRun` true unless `LEAD_RETENTION_PURGE_ENABLED` is exactly `"1"` or `"true"`. Identical on every site.
- **Flag not set anywhere in the repo.** Grepped `.env`, `.env.local`, `.env.example`, every
  `*/web/.env*`, all `vercel.json`. Zero hits outside code and docs. Repo-side env documentation agrees:
  `docs/_engines/INTEGRATION_ARMING_RUNBOOK_2026-08-03.md:25-29` lists
  `LEAD_RETENTION_PURGE_ENABLED` among the vars **absent** from production, "confirms all eight are
  genuinely dark", and `:312` gives the arming command as a thing still to be done.
  Live Vercel env was NOT called, per brief. Repo evidence says dormant; production is unverified.
- **When armed it ANONYMISES, never deletes** (`retention.ts` header and body). Stripped:
  `full_name` -> `[redacted]`, `email` -> `redacted-<id>@invalid`, `phone` -> `""`, `message` ->
  `[redacted]`, `extras.role_detail` dropped; `lead_verification.phone_e164/phone_carrier/raw` -> null;
  `lead_contact_events.meta` -> null; `lead_enrichment.summary/raw/ch_*` -> null;
  `lead_value_scores.intent_line`/`rationale` cleared; `lead_offers.teaser` replaced.
- **Survives deliberately**: `consent_text`, `consent_at`, `status`, `source`, `created_at`, plus case
  tier/type and offer tier/price/status for billing. Row is never removed.
- So the published words "after which it is deleted" are inaccurate twice over: it is not running, and
  if it ran it would anonymise, not delete.

Runtime note: only Property's version reads the shared `leads` table across all sources
(`RETENTION_MONTHS_BY_SOURCE`). Every other site's `retention.ts` reads its own `siteConfig`, which is
24 (or 3 on ashfield) — so the `DEFAULT_MONTHS = 3` fallback fires only if a site's config is unreadable.
It is a dead branch in practice, and Property's table already carries an explicit 24 for every source.

## 5. Blast radius: every site publishing a retention promise

All 18 render the same sentence from `company.enquiryRetentionMonths` in
`<site>/web/src/app/privacy-policy/page.tsx`.

| Site | Months published |
|---|---|
| Property | 24 |
| Dentists | 24 |
| Medical | 24 |
| Solicitors | 24 |
| generalist | 24 |
| care | 24 |
| charities | 24 |
| construction-cis | 24 |
| contractors-ir35 | 24 |
| crypto | 24 |
| digital-agency | 24 |
| divorce-finances | 24 |
| ecommerce | 24 |
| hospitality | 24 |
| pharmacies | 24 |
| startups-tech | 24 |
| wills-probate | 24 |
| **ashfield** | **3** |

(ashfield has a privacy policy but no `retention.ts`; its leads are covered by Property's cross-source
table, which also carries `ashfield: 3`.)

## Plain English, ten seconds

No legal exposure from the 3-month figure. The only contract that ever said 3 months was the DJH deal,
which is dead and archived; the current data-sharing agreement says "whatever the site publishes, max 24
months", which is exactly what the sites publish, and it is not signed by anyone yet anyway. The
3-month comment is stale copy-paste on 16 files. The thing that IS worth a decision is the other
direction: 18 live privacy policies promise enquiry data "is deleted" after 24 months, and the purge
that would do it has never been switched on, and even when switched on it redacts rather than deletes.
That is a transparency defect against real people, not a contract breach, and it is already on the
owner's open-decisions list.

## FALSE in the brief / could not determine

**FALSE**
1. "present identically on ~17 sites" — it is on 16. Property carries a rewritten, correct header
   citing DSA clause 11.1 and 24 months.
2. "The data-sharing agreement requires... within 3 months" — no agreement in force says this. The
   current template says the opposite; the 3-month clause is from the superseded DJH agreement, and the
   only "3 months" in the current DSA is a *Recipient* obligation on unpursued bulk enquiries (cl 3.6(e)).
3. Implied by the brief that a DSA obligation could be breached — no DSA is currently executed against a
   live counterparty, so nothing can be breached.
4. "every site's `niche.config.json` sets 24 (sole exception ashfield)" — true as stated, confirmed;
   18 configs, 17 at 24, ashfield at 3.

**COULD NOT DETERMINE**
- Whether `LEAD_RETENTION_PURGE_ENABLED` is set in the live Vercel production environments. The brief
  forbade calling the Vercel API. Repo + arming runbook both say dark; that is evidence, not proof.
- Whether any enquiry data older than 24 months actually exists in prod (no DB read performed), so the
  size of the transparency gap is unquantified.
- Whether the DJH agreement was formally terminated on paper or simply lapsed. The archive README and a
  code comment both say the deal ended; no termination notice is in the repo.
