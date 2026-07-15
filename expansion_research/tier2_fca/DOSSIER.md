# R3 dossier: FCA-regulated firms accountancy (tier2_fca)

Date: 2026-07-15. Free sources only (DDG SERPs, Google Autocomplete, direct fetches,
sitemaps). Zero paid API calls. No fabricated figures: all volumes null pending paid pulls.

R2 prior being tested: "weak field, tiny demand, compliance moat". Open question: does the
moat plus lead value beat the tiny search demand?

## 1. What the niche actually is

Accountancy and reporting services for FCA-authorised businesses: CASS (client assets)
audits, safeguarding audits for payment institutions and e-money institutions, FCA
regulatory reporting (RegData, the GABRIEL successor), prudential/capital adequacy work
under IFPR/MIFIDPRU including ICARA, FCA authorisation applications (financial projections
and regulatory business plans), appointed representative oversight, consumer credit firm
accounting.

## 2. THE AUDIT-REGISTRATION WALL (mandatory analysis)

This niche splits hard into two halves, and the estate operator can only ever stand on
one side of the line.

### Services that REQUIRE registration/authorisation (estate CANNOT provide, ever)

- **CASS audits (client assets reports to the FCA).** Must be performed by an auditor
  eligible under the statutory audit framework; the FCA's SUP 3 rules require appointed
  auditors for CASS firms. Not available to an unregistered content operator under any
  branding.
- **Safeguarding audits for payment institutions / EMIs.** The FCA's 2025 safeguarding
  regime (CASS 15, following CP24/20) moved safeguarding audits onto a mandatory,
  qualified-auditor footing. Same wall.
- **Statutory audits of regulated firms.** Registered auditor status required.
- Anything signed as an opinion to the regulator.

The two DEDICATED rivals found (cassauditservices.co.uk, client.money) are both
registered-auditor propositions. Their positioning is not copyable.

### Services the estate model COULD front (lead-gen / content, no registration needed)

- **Referral/lead-gen to specialist audit firms**: capture "cass audit cost",
  "safeguarding audit firm", "fca client money audit" intent and hand the lead to a
  registered auditor. This is exactly the estate's existing model (all 5 current niche
  sites are lead-gen handoffs). Note: the estate's own partner firm, Reflex Accounting,
  already runs a "CASS Audit for FCA-Regulated Firms" page, so a handoff route exists
  in principle, subject to Reflex actually being able to sign CASS opinions
  (unverified: whether Reflex holds audit registration; FLAG for owner).
- **Regulatory bookkeeping and management accounts** for small regulated firms
  (mortgage/insurance brokers, IFAs, ARs, consumer credit firms). Ordinary accountancy;
  no FCA permission needed to do a regulated firm's books.
- **IFPR/MIFIDPRU calculation support content**: own-funds requirement explainers, ICARA
  process guides, K-factor calculators, RegData deadline trackers. Pure content/tools,
  no registration needed, strong calculator-asset fit with the estate playbook.
- **FCA authorisation financial projections** (spreadsheets for the application pack):
  unregulated service, though the SERP is owned by compliance consultancies.

### Does the lead-gen handoff model even work here?

Partially, with a structural weakness the other estate niches do not have:

1. **The buyer's primary problem is compliance, not accounting.** The verified SERP
   occupants are compliance consultancies (Cosegic, Complyport, Thistle, fscom, Richdale,
   FC360 and 13 more) and law firms. A lead captured on "fca authorisation help" wants a
   compliance consultant; the estate's accountancy partner is the wrong handoff for most
   of the query surface.
2. **The highest-value queries (CASS/safeguarding audit) can only be served by registered
   auditors.** The handoff works only if the receiving firm holds audit registration.
   Reflex's status is unverified; if it cannot sign CASS opinions, the estate would be
   generating leads it has no buyer for, or would need a second partner (a registered
   audit firm), which is a new commercial negotiation, not a site build.
3. **Population is small and London-concentrated.** ~42,000 FCA-authorised firms exist
   (FCA public figure, order of magnitude; not verified this run), but most are one-adviser
   IFAs and ARs whose accounting needs are generic. The firms needing CASS/IFPR work are
   a few thousand, heavily served by incumbent relationships.
4. **What DOES map to the estate model**: small regulated firms (brokers, IFAs, credit
   firms) needing a normal accountant who understands FCA reporting. This is the
   "SECTION page on a generalist firm" space (UHY, HWB, BKL, Ross Brooke). Demand exists
   but is a thin slice of an already tiny pool.

**Wall conclusion: the moat is real but it faces the wrong way.** The regulatory moat
protects the registered auditors from the estate, not the estate from competitors. The
estate can only play in the unwalled half, where the true competitors are well-funded
compliance consultancies, and the deliverable lead (a small regulated firm wanting
bookkeeping) is ordinary-value, not moat-priced.

## 3. Demand evidence (free sources only)

- Autocomplete: 648 queries swept, 1,860 unique suggestions, but heavily contaminated:
  "cass county auditor" (US), social-care "safeguarding audit", consumer "is X FCA
  regulated" checks. The clean firm-side surface is narrow.
- DDG SERPs: 32 buyer-intent queries all return results, but accountancy-specific results
  are sparse; Google indexes thin SECTION pages and lets consultancies/law firms rank,
  which is what a weak-demand, high-specialism SERP looks like.
- No paid volume data pulled this run (hard rule). All cluster volumes are null.
- Topic pool: 1,440 raw scoped terms -> 1,382 after estate dedupe (0 exact, 0 fuzzy estate
  dupes; 19 borderline pairs all judged false positives) -> 1,258 after junk sweep
  (121 junk: US "cass county auditor", social-care safeguarding, Brazilian IFPR institute,
  consumer brand checks; 3 sibling-adjacent dropped) -> 845 page-level clusters
  (topic_pool_final.json). Residual noise remains (news-y sitemap slugs from big-firm
  blogs); treat 845 as an upper bound, the realistic writable firm-side pool is smaller.

## 4. Competitor field

See COMPETITORS.md. 2 DEDICATED accountancy microsites, 17 SECTION firms, ~19 compliance
consultancies, 6+ law firms, 7 regtech vendors. The consultancies are the real field.

## 5. Content/asset angles that survive the wall (if ever built)

- IFPR/MIFIDPRU own-funds calculator; RegData reporting-calendar tool; CASS
  classification (small vs medium vs large firm) checker; safeguarding reconciliation
  explainer; AR vs direct authorisation cost comparison.
- These are good GEO/citation assets but they feed leads whose natural buyer is a
  compliance consultancy or registered auditor, not the estate partner.

## 6. Risks

- Positioning risk: an unregulated content brand giving CASS/prudential guidance sits in
  the FCA's own perimeter-adjacent space; YMYL scrutiny is maximal, and the estate's
  faceless/no-credential constraint (user is not an accountant, no named experts) bites
  hardest exactly here.
- Partner conflict: Reflex already markets CASS audits; an estate site would either
  cannibalise or depend on an unverified capability.
- Estate leak check: 0 estate domains in survivors (hard assert in s1).

## TODO - paid pulls (deferred keyword list)

When paid data is next authorised, pull volumes/KD/CPC for:
accountants for fca regulated firms; fca regulated accountants; cass audit; cass audit
cost; cass audit firms; cass audit report deadline; client money audit; client assets
audit; safeguarding audit; safeguarding audit payment institution; emi safeguarding audit;
cass 15; regdata; regdata reporting; fca regulatory reporting; mifidpru; mifidpru
reporting; ifpr; icara; icara process; own funds requirement; k-factor calculation; fca
authorisation; fca authorisation cost; fca application accountant; regulatory business
plan; consumer credit licence accountant; appointed representative costs; accountants for
mortgage brokers; accountants for insurance brokers; accountants for ifas; accountants
for investment firms; payment institution accountant; e money institution accountant.
