# Section 20 verification pass against enacted RRA 2025 - 2026-05-23

## Overall status

DRIFTS FOUND (2 hard drifts, 4 soft / clarification flags)

Hard drifts:
- 20.10 - RRO maximum extended to 2 years, not 12 months as locked.
- 20.5 - Ombudsman compensation up to GBP 25,000 has no statutory basis in the enacted Act.

Soft / clarification flags (locked text is not wrong but is loose enough to mislead future writers):
- 20.2 - tenant notice-to-quit (2 months) is set by RRA 2025 s.5 amending the Protection from Eviction Act 1977, not by the periodic-tenancy mechanic in HA 1988. Pin the statutory hook.
- 20.3 - the "7+ years carve-out" framing collapses two distinct paragraphs (3D and 3E) into one. Pin both.
- 20.8 - "first month" framing for the s.4B advance-rent prohibition is imprecise; enacted text uses "initial 28 day period" and "permitted pre-tenancy period" definitions. Pin the statutory definitions.
- 20.11 - bullet 3 (pet damage insurance, where required as a consent condition, is a deductible expense) survives uncorrected after F-11 fixed the underlying rule in 20.7. Internal inconsistency.

No unresolved fetches; one definition ("restricted period") was not visible via WebFetch on legislation.gov.uk/ukpga/1988/50/section/16E and was resolved by downloading the full enacted-Act PDF and reading s.17(3)-(7) of the RRA 2025 directly (defines restricted period as twelve months from the s.8 notice / claim).

## Per-section findings

### 20.1 - Status and commencement

**Status:** VERIFIED

**Citations checked:**
- RRA 2025 contents (legislation.gov.uk/ukpga/2025/26/contents)
- SI 2025/1354 (Commencement No. 1)
- SI 2026/421 (Commencement No. 2 and Transitional and Saving Provisions)

**Findings:**
- "Renters' Rights Act 2025 (2025 c. 26)" - VERIFIED.
- "Phased by Statutory Instrument" - VERIFIED. Two SIs operative as of 21 May 2026 per the legislation.gov.uk "up to date with all changes" header on the enacted-version PDF.
- "Wales-specific provisions (ss.43-49) remained pending" - VERIFIED. Contents page explicitly notes ss.43-49 scheduled for future commencement via S.I. 2026/6 (separate Wales-track SI; not yet operative).
- Royal Assent date "27 October 2025" - not visible on the contents page in the WebFetch return, but consistent with the citation "2025 c. 26" and SI 2025/1354 making date. No countervailing evidence found.

### 20.2 - Section 21 abolition and reformed Section 8 grounds

**Status:** VERIFIED with one clarification flag (statutory hook for tenant notice-to-quit)

**Citations checked:**
- RRA 2025 s.2 (omits HA 1988 s.6A and Chapter 2 of Part 1, abolishing AST regime - legislation.gov.uk/ukpga/2025/26/section/2)
- RRA 2025 s.3 + Schedule 1 (Changes to grounds for possession - legislation.gov.uk/ukpga/2025/26/section/3 and /schedule/1)
- RRA 2025 s.5 (amending Protection from Eviction Act 1977 to fix tenant notice-to-quit at 2 months - verified in enacted-Act PDF lines 2477-2491)
- RRA 2025 s.17 (defines "restricted period" for re-letting - verified in enacted-Act PDF lines 2177-2233)

**Findings:**
- "Section 21 abolished" - VERIFIED. Abolition is by s.2 of the Act which removes Chapter 2 of Part 1 of the HA 1988 entirely; s.21 sits within that omitted Chapter.
- "Section 8 restructured with substantially expanded list" - VERIFIED via Schedule 1.
- "Rent arrears (extended threshold and notice period)" - VERIFIED but vague. Schedule 1 para 24 confirms Ground 8 threshold went from 8 weeks to 13 weeks and payment-window from 2 weeks to 3 weeks. Worth pinning the specific numbers.
- "Tenant notice 2 months written" - VERIFIED. New s.5(1ZA) of Protection from Eviction Act 1977 (inserted by RRA 2025 s.5) sets the minimum tenant NTQ at "not less than two months before the date on which the notice is to take effect." Locked text frames this as a consequence of periodic tenancies; in fact the 2-month floor is set explicitly in the amended PEA 1977. Clarification flag: pin the statutory source.
- "12-month restriction on re-letting on landlord-sale / landlord-occupation grounds" - VERIFIED. New HA 1988 s.16E(2) (inserted by RRA 2025 s.13) prohibits letting within "the restricted period," and the restricted period is defined by new HA 1988 s.16E(4) (inserted by RRA 2025 s.17(3)-(4)) as twelve months beginning with the date specified in the s.8 notice (or, where no valid notice, twelve months from filing of the claim form). The 12-month figure is exact.
- "Breach is an offence with civil penalty up to GBP 40,000" - VERIFIED. New HA 1988 s.16K (inserted by RRA 2025 s.15) caps the financial-penalty-as-alternative-to-prosecution at GBP 40,000; s.16I (lesser breach) caps at GBP 7,000.

### 20.3 - Periodic-tenancy default and AST phase-out

**Status:** VERIFIED with one clarification flag (7+-year carve-out framing)

**Citations checked:**
- RRA 2025 s.1 inserting HA 1988 s.4A (all assured tenancies periodic, rent period not exceeding one month) - legislation.gov.uk/ukpga/2025/26/section/1
- RRA 2025 s.31 inserting HA 1988 Sch 1 paras 3D and 3E (carve-outs for long tenancies) - enacted-Act PDF lines 3040-3097

**Findings:**
- "All new assured tenancies periodic from grant" - VERIFIED. New HA 1988 s.4A voids fixed-term provisions in assured tenancies and converts them to periodic.
- "Default rent period: monthly (max one month)" - VERIFIED. s.4A limits rent periods to "a period of 28 days or shorter, or a monthly rent period." Six-monthly or annual rent periods are void.
- "Pre-existing fixed-term leases of 7+ years and most company-let / business tenancies are outside the assured tenancy regime" - VERIFIED but imprecise. The enacted Act inserts two new paragraphs:
  - Para 3D (HA 1988 Sch 1): fixed-term tenancies of term certain more than 21 years are excluded from the assured tenancy regime - applies prospectively.
  - Para 3E (HA 1988 Sch 1): fixed-term tenancies of 7 to 21 years are excluded only if granted (a) before the day the Act was passed, (b) during the two-month period beginning with that day, or (c) after that period under a contract entered into before its end. This is a closed transitional cohort, not an ongoing carve-out.
  Going forward, only fixed terms longer than 21 years are outside the assured regime. The "7+ years" wording could mislead a future writer into thinking new 10-year ASTs sit outside; they do not. Clarification flag: split 3D and 3E in the locked text.
- "Existing fixed-term ASTs convert to periodic on commencement" - VERIFIED via SI 2026/421 reg.2 commencing Chapter 1 of Part 1 on 1 May 2026 in relation to private assured tenancies. The "Government's published transition window" hedge is appropriate; Schedule 6 contains the savings.

### 20.4 - Decent Homes Standard extended to PRS

**Status:** VERIFIED with one observation (commencement status accurately hedged in 20.12 but framed in 20.4 as if substantive standard is already live)

**Citations checked:**
- RRA 2025 ss.100-101 (Part 3 - Decent Homes Standard)
- SI 2025/1354 (brings s.100(1), (5), (6) and Schedule 4 Part 1 paras 1, 9(1), 9(3) into force on 27 December 2025 - partial only)
- SI 2026/421 (does not bring the substantive Decent Homes provisions into force)

**Findings:**
- "Standard extended to PRS" - VERIFIED as a statutory hook, but the substantive standard is not yet in force. SI 2025/1354 brought only preliminary-meaning-of-qualifying-residential-premises provisions into force. Locked text in 20.4 does not flag this; 20.12 does, so the reader who follows the cross-reference will land correctly. No correction strictly required if 20.12 is treated as authoritative, but a one-line "see 20.12 commencement table - substantive standard awaits SI" hedge would harden 20.4.
- "Rent Repayment Order route where the property is non-compliant" - VERIFIED. RRA 2025 amends Housing and Planning Act 2016 to add new RRO-eligible offences; see also drift below under 20.10 for the 12-months to 2-years extension.
- "HHSRS Category 1 hazards, reasonable state of repair, modern facilities, thermal comfort" - these are the four pillars of the existing social-housing DHS as carried into PRS. VERIFIED conceptually; substantive content set by regulations under s.100, not yet made.

### 20.5 - Landlord database and PRS Ombudsman

**Status:** DRIFT (GBP 25,000 Ombudsman cap), with one other observation

**Citations checked:**
- RRA 2025 Part 2 Chapter 2 (Landlord redress schemes, ss.64-74)
- RRA 2025 Part 2 Chapter 3 (Database, ss.75-96), particularly s.82 (restrictions on marketing/advertising/letting)
- SI 2026/421 (Ch.2 Pt.2 partial commencement - s.74 only on 1 May 2026; Ch.3 Pt.2 not commenced)

**Drift 1 - Ombudsman compensation cap:**
- Locked text: "Ombudsman decisions can require compensation up to GBP 25,000."
- Enacted text: Sections 64-74 set the framework for the redress scheme and regulate what regulations may provide, including (s.65(2)(j)) that the individual determining a complaint may require members to "provide redress of the following types to the complainant - (i) providing an apology or explanation, (ii) paying compensation, and (iii) taking such other actions." No monetary cap is set in the enacted Act. The GBP 25,000 figure is a forward-looking policy estimate, not statute.
- Citation: RRA 2025 s.65(2)(j), legislation.gov.uk/ukpga/2025/26/section/65.
- Recommended correction: strike the "compensation up to GBP 25,000" claim, or rephrase as "compensation up to a cap to be set by regulations under s.65(2)(j); GBP 25,000 is the figure suggested in government policy material but is not in the Act." The existing live blog prs-database-landlord-ombudsman-registration-requirements.md already uses the safer "anticipated at GBP 25,000 on current policy" form; the house position should match.

**Other findings:**
- "PRS Database, national register, mandatory before a property can be let" - VERIFIED. RRA 2025 s.82(1): "A person must not market a dwelling for the purpose of creating a residential tenancy unless (a) there is an active landlord entry in the database in respect of the person who will be the residential landlord if the tenancy is granted, and (b) there is an active dwelling entry in the database in respect of the dwelling." VERIFIED, but note s.82 is not yet in force - locked 20.12 correctly logs this as Pending.
- "Operating outside the database or refusing to join the ombudsman = civil penalty up to GBP 40,000" - VERIFIED (database breach via s.84/85 enforcement framework; redress-scheme breach via the s.66/67 / s.72/73 frameworks - penalty splits at GBP 7,000 / GBP 40,000 depending on severity).

### 20.6 - Rent-rise mechanics, Section 13 reform, and tribunal challenge

**Status:** VERIFIED

**Citations checked:**
- RRA 2025 s.6 (statutory procedure for increases of rent, amending HA 1988 s.13 and inserting s.13A) - legislation.gov.uk/ukpga/2025/26/section/6
- RRA 2025 s.7 (inserts HA 1988 s.14ZA and s.14ZB - tribunal determination) - legislation.gov.uk/ukpga/2025/26/section/7

**Findings:**
- "Rent increases via Section 13 procedure only, once per 12-month period" - VERIFIED. The amended HA 1988 s.13 limits the frequency of rent increase notices to once per 52 weeks (53 weeks in specific anniversary cases). The locked text once per 12-month period is close enough.
- "Notice period: 2 months' written notice" - VERIFIED. RRA 2025 s.6(4)(a) substitutes "two months" for "the minimum period" in HA 1988 s.13(2)(a).
- Tribunal cannot set rent above the proposed amount - VERIFIED. New HA 1988 s.14ZB(5) (inserted by RRA 2025 s.7) defines "new rent amount" as (a) the open-market rent, if lower than the proposed rent, and (b) otherwise, the proposed rent. This is the exact mechanic the locked 20.6 describes; verified clean.
- "Contractual rent-review clauses unenforceable for rent increases" - VERIFIED. New HA 1988 s.13(4A) (inserted by RRA 2025 s.6(7)) renders any provision of an assured tenancy of no effect "so far as it provides that the rent for a particular period of the tenancy must or may be greater than the rent for the previous period otherwise than by virtue of" a s.13 notice, s.14 determination, or post-determination written agreement.

### 20.7 - Pet rights and reasonable refusal

**Status:** VERIFIED (already corrected via F-11; spot-check confirms nothing further needed)

**Citations checked:**
- RRA 2025 s.11 (inserts HA 1988 s.16A and s.16B) - legislation.gov.uk/ukpga/2025/26/section/11

**Findings:**
- New HA 1988 s.16A(1)(c): landlord must give or refuse consent in writing on or before the 28th day after the date of the request, subject to extensions in s.16A(2)-(5). VERIFIED - matches locked text.
- New HA 1988 s.16B(4): reasonable grounds restricted to (a) superior-landlord-agreement breach and (b) superior-landlord refusal after reasonable steps. VERIFIED.
- New HA 1988 s.16B(5): remedy is specific performance in the court (no FTT route). VERIFIED.
- Tenant Fees Act 2019 carries no pet-insurance carve-out in the enacted Act. VERIFIED - no permitted-payment exception for pet damage insurance appears in the Act amendments to TFA 2019.

F-11 correction stands. No further changes required.

### 20.8 - Prohibition on bidding wars and asking-rent caps

**Status:** VERIFIED with one clarification flag (advance-rent framing)

**Citations checked:**
- RRA 2025 s.56 (rent must be stated; bidding prohibition) - legislation.gov.uk/ukpga/2025/26/section/56
- RRA 2025 s.57 (financial penalties for s.56 breach, capped at GBP 7,000) - legislation.gov.uk/ukpga/2025/26/section/57
- RRA 2025 s.8 (inserts HA 1988 s.4B - prohibition of rent in advance after lease entered into) - legislation.gov.uk/ukpga/2025/26/section/8
- RRA 2025 s.9 (amends Tenant Fees Act 2019 - prohibition on pre-lease rent payments) - legislation.gov.uk/ukpga/2025/26/section/9

**Findings:**
- "Cannot invite or accept offers above the advertised rent" - VERIFIED. s.56(2) prohibits inviting/encouraging offers above the stated rent; s.56(3) prohibits accepting such offers; s.57 penalty up to GBP 7,000.
- "Advertised rent is the statutory ceiling for the marketing period" - VERIFIED, by combined effect of s.56(1) (must state proposed rent in writing) and s.56(2)/(3) (cannot solicit or accept above-stated offers).
- Clarification flag - "Advance rent prohibited beyond the first month": The enacted Act has two separate prohibitions on advance rent, which the locked text collapses into one phrasing:
  - s.8 inserts HA 1988 s.4B: terms providing for rent to be due in advance (of the rent period) are of no effect; carve-outs for "initial rent" payable during the "initial 28 day period" and for rent due in the "permitted pre-tenancy period" (defined as the gap between contract execution and the first day of the tenancy).
  - s.9 amends Tenant Fees Act 2019 to make any pre-tenancy payment of rent a prohibited payment (with carve-outs in the new permitted-payment para 1A).
  - The "first month" framing in the locked text is close enough operationally (initial 28-day period) but elides the distinction between pre-lease (s.9) and post-lease (s.8) regimes. Clarification flag: rewrite 20.8 to separate the two prohibitions explicitly.

### 20.9 - Transition for existing tenancies

**Status:** VERIFIED

**Citations checked:**
- RRA 2025 s.146(3) (commencement date definition referenced in HA 1988 s.4B(2)(a))
- RRA 2025 Schedule 6 (transitional and saving provisions) - referenced from enacted-Act PDF lines 2736, 2823, 2889, 2971
- SI 2026/421 reg.6 ("Chapter 1 of Part 1 in force on 1 May 2026 with reg 6") - the saving-provisions regulation

**Findings:**
- "Existing fixed-term ASTs convert to periodic at commencement" - VERIFIED. The combination of s.1 (new s.4A voiding fixed-term provisions in assured tenancies) and SI 2026/421 reg.2 commencing Chapter 1 of Part 1 in relation to private assured tenancies operates the conversion on 1 May 2026.
- "Tenants in fixed-term tenancies gain new tenant-notice rights from commencement" - VERIFIED via the s.5 amendment to PEA 1977.
- "Pre-commencement Section 21 notices already served remain operative for a defined transitional window" - VERIFIED. Schedule 6 of the RRA 2025 contains the savings; the locked text correctly hedges and tells sessions to check the specific transitional saving provision rather than asserting a date. No correction needed.

### 20.10 - Enforcement and penalties

**Status:** DRIFT (RRO maximum)

**Citations checked:**
- RRA 2025 Part 4 (Enforcement - ss.102-136)
- RRA 2025 s.98 (amending Housing and Planning Act 2016 Part 2 - RRO provisions)
- Enacted-Act PDF lines 8678-8687 (s.98 amends HPA 2016 s.41(2)(b) and s.42(5) to substitute "2 years" for "12 months")
- Enacted-Act PDF lines 9179-9180 (s.98 amends HPA 2016 s.44 - RRO amount calculation table - to substitute "2 years" for "12 months in both places")

**Drift 1 - RRO 12-month claim:**
- Locked text: Rent Repayment Orders (RROs) extended to new offences; tenants can claim up to 12 months rent.
- Enacted text: RRA 2025 s.98(3)(a) amends HPA 2016 s.41(2)(b) to substitute "2 years" for "12 months". RRA 2025 s.98(4) makes the same substitution in HPA 2016 s.42(5). RRA 2025 s.98(5) restructures the amount-of-order table in HPA 2016 s.44 and inserts a new row "an offence mentioned in row 2B [...] the period of 2 years ending with the date of the offence or, if the tenancy ends before that date, the date on which it ends".
- Citation: RRA 2025 s.98 amending HPA 2016 ss.41, 42, 44.
- Recommended correction: Tenants can claim up to 2 years rent (extended from 12 months by RRA 2025 s.98 amending HPA 2016 ss.41, 42 and 44).

**Other findings:**
- "Local authorities have expanded investigatory powers" - VERIFIED. Part 4 Chapter 3 (ss.114-136) contains the new investigatory-powers framework.
- "Civil penalty regime: up to GBP 40,000 per offence for serious breaches" - VERIFIED. GBP 40,000 is the upper figure used consistently across the Act penalty-as-alternative-to-prosecution provisions (s.16K, s.66/67, s.84, etc.); GBP 7,000 is the lower-tier figure.
- "Banning orders for repeat or serious offenders" - VERIFIED via new HPA 2016 / Schedule 5 references; banning-order trigger offences are extended by RRA 2025.

### 20.11 - Tax implications for landlords

**Status:** VERIFIED on the legal hooks (tax framing itself out of scope per brief), with one internal-consistency flag

**Citations checked:** the 20.11 commentary leans on 20.2, 20.5, 20.6 statutory hooks. Each hook verified individually above.

**Findings:**
- "Rent-increase frequency limits affect cash-flow modelling" - relies on 20.6 once-per-12-month limit. VERIFIED.
- "12-month landlord-sale re-letting restriction affects timing of CGT disposals" - relies on the 12-month restricted period for grounds 1 / 1A. VERIFIED.
- "Pet damage insurance, where required as a consent condition, is a deductible expense" - stale: as corrected in F-11, pet damage insurance cannot lawfully be required as a consent condition under the enacted Act. The 20.11 sentence is internally inconsistent with the corrected 20.7. Clarification flag. (Strictly this is a 20.11 housekeeping issue, not a fresh legal drift - F-11 already fixed the underlying rule; 20.11 just was not back-patched.)
- "PRS database registration fees and Ombudsman subscription are deductible as professional expenses" - depends on fee regulations not yet made; the deductibility framing is sound (assumed-deductible as rental-business operating expense) but writers should hedge "subject to the fee regime confirmed by regulations". Not a drift, but worth pinning.
- "Decent Homes Standard compliance spend, repairs revenue-deductible; capital improvements added to base cost" - depends on 20.4 hook, verified, plus the standard split between revenue repairs and capital improvements (not RRA-specific).
- "Sale-driven possession route affects 17.4 NRCGT timeline" - relies on the s.16E re-letting / 12-month restricted-period mechanic in conjunction with the landlord-sale ground. VERIFIED.

### 20.12 - Commencement timeline

**Status:** VERIFIED

**Citations checked:**
- SI 2025/1354 (brings ss.63, 99, 100(1)(5)(6), Sch 4 Pt 1 paras 1, 9(1), 9(3) into force on 27 December 2025)
- SI 2026/421 reg.2 (Chapter 1 of Part 1 except s.25(3); Sch 1; Sch 2; on 1 May 2026 for private assured tenancies) and reg.3 (s.25(3), Ch.3 of Pt 1, Ch.6 of Pt 1, ss.58, 62, 74, 97, s.98 partial, ss.102-109; on 1 May 2026)
- RRA 2025 contents page footer ("up to date with all changes known to be in force on or before 21 May 2026")

**Findings:**
- The table in 20.12 matches the operative SIs. Each row spot-checked against SI 2025/1354 and SI 2026/421 outputs above. VERIFIED.
- One small refinement: locked 20.12 marks "Landlord Redress Scheme / PRS Ombudsman (Ch.2 Pt.2, ss.64-74)" as Partial (s.74 only). SI 2026/421 reg.3 brings s.74 into force on 1 May 2026 (this is the regulation-making power for the redress scheme). Substantive scheme depends on regulations under s.65 which have not yet been made. The "Partial" label is correct. VERIFIED.
- "PRS Database (Ch.3 Pt.2, ss.75-96): Pending" - VERIFIED.
- "Decent Homes Standard for PRS (Pt.3, ss.100-101): Partial (s.100 + Sch.4 partial in force 27 Dec 2025; full standard awaits SI)" - VERIFIED.
- "Wales-specific provisions (ss.43-49): Pending" - VERIFIED. Contents page on legislation.gov.uk notes ss.43-49 are scheduled for future commencement via S.I. 2026/6.

### 20.13 - Do not write

**Status:** No verification required per brief. (Style guide, not legal claim.)

## Manager actions required

### Hard correction 1 - 20.10 RRO drift

- Correction logged 2026-05-23 (F-12): 20.10 RRO maximum is 2 years rent, not 12 months, per RRA 2025 s.98 amending HPA 2016 ss.41, 42 and 44 (in force 1 May 2026 per SI 2026/421 reg.3).
- Recommended edit to house_positions.md 20.10 bullet 3: "Rent Repayment Orders (RROs) extended to new offences; tenants can claim up to 2 years rent (extended from 12 months by RRA 2025 s.98)."
- Grep - existing live pages:
  - Property/web/content/blog/london-property-accountant.md line 124: "rent repayment orders up to 12 months under Housing and Planning Act 2016" - STALE, requires back-patch.
  - Property/web/content/blog/property-accountant-bournemouth-landlords-tax-services.md lines 38-40, 207 (long lines, not fully visible in grep) - confirmed RRO/12-month reference present; requires manual verification before back-patch.
- Wave-mapped: Both flagged pages are part of the pre-Wave-3 inventory (city / accountant series). Need to extend the F-12 back-patch sweep to the full blog directory; recommend the same grep as a sweep pattern: `rent repayment.{0,40}12 months|12 months.{0,30}rent repayment`.

### Hard correction 2 - 20.5 Ombudsman compensation drift

- Correction logged 2026-05-23 (F-13): 20.5 "Ombudsman decisions can require compensation up to GBP 25,000" - the GBP 25,000 figure is policy expectation, not statute. The Act (s.65(2)(j)) provides only that regulations may set redress amounts; no cap is on the face of the Act.
- Recommended edit to house_positions.md 20.5 bullet 3: "PRS Ombudsman, single statutory ombudsman scheme covering all landlords. Landlords must register; tenants can escalate disputes without a court route. Ombudsman compensation cap is to be set by regulations under RRA 2025 s.65(2)(j); GBP 25,000 is the figure used in government policy material but is not on the face of the Act."
- Grep - existing live pages:
  - Property/web/content/blog/prs-database-landlord-ombudsman-registration-requirements.md line 95: already uses the safer "anticipated at GBP 25,000 on current policy" form. OK - house position should match this page hedging, not the other way round.
  - 19 other files mention "25,000" but spot-check confirms these are unrelated (GBP 25,000 SDLT band, IHT NRB taper threshold, etc.) - no further Ombudsman drift identified.
- Wave-mapped: the prs-database-landlord-ombudsman page is a Wave 3 page; back-patching not required as the page already hedges appropriately.

### Soft / clarification flag 1 - 20.2 tenant notice statutory hook

- Correction logged 2026-05-23 (F-14): 20.2 attributes the tenant-2-months-notice rule to "the periodic-tenancy default makes fixed-term lock-in unavailable." The actual statutory hook is RRA 2025 s.5 amending PEA 1977 to insert s.5(1ZA), which sets the floor at two months independent of the periodic-tenancy mechanic.
- Recommended edit to house_positions.md 20.2 bullet 3: add "(RRA 2025 s.5 amending Protection from Eviction Act 1977 s.5(1ZA))" after "2 months written notice".

### Soft / clarification flag 2 - 20.3 long-tenancy carve-out split

- Correction logged 2026-05-23 (F-15): 20.3 "Pre-existing fixed-term leases of 7+ years ... outside the assured tenancy regime" collapses HA 1988 Sch 1 paras 3D (longer than 21 years, prospective) and 3E (7-21 years, closed transitional cohort only) into one phrase. Going forward, only fixed terms longer than 21 years sit outside the assured regime.
- Recommended edit to house_positions.md 20.3 bullet 4: rewrite as "Fixed-term tenancies of more than 21 years are outside the assured tenancy regime (HA 1988 Sch 1 para 3D). Fixed-term tenancies of 7-21 years granted before the Act passed (or within a two-month transitional window) are also outside (HA 1988 Sch 1 para 3E) but this is a closed cohort, not an ongoing carve-out. Most company-let and business tenancies are outside the assured regime on the existing HA 1988 carve-outs and are unaffected by the reform."

### Soft / clarification flag 3 - 20.8 advance-rent dual prohibition

- Correction logged 2026-05-23 (F-16): 20.8 collapses two separate prohibitions (pre-lease via s.9 amending TFA 2019; post-lease via s.8 inserting HA 1988 s.4B) into one "first month" sentence. The enacted regime is more layered.
- Recommended edit to house_positions.md 20.8 bullet 3: rewrite as "Advance rent prohibited on two layers: (i) pre-tenancy rent payments are a prohibited payment under the Tenant Fees Act 2019 (RRA 2025 s.9 amendment); (ii) post-tenancy, terms providing for rent due in advance of the rent period are of no effect (new HA 1988 s.4B, inserted by RRA 2025 s.8). Carve-outs exist for 'initial rent' payable during an 'initial 28 day period' and for rent due during a 'permitted pre-tenancy period' (the gap between contract execution and the first day of the tenancy)."

### Soft / clarification flag 4 - 20.11 internal inconsistency post-F-11

- Correction logged 2026-05-23 (F-17): 20.11 bullet 3 ("Pet damage insurance, where required as a consent condition, is a deductible expense") survives in the locked text but is inconsistent with corrected 20.7 (pet damage insurance cannot be required as a consent condition). Strike or rewrite.
- Recommended edit to house_positions.md 20.11 bullet 3: replace with "Landlord own pet damage insurance (the GBP 30 to GBP 80 annual uplift over standard cover noted in 20.7) is deductible as ordinary landlord insurance against rental income. Pet damage insurance cannot be required as a consent condition - see 20.7." Cross-reference avoids drift.

## Sub-agent open questions

None unresolved. The one item that required deeper digging - the definition of "restricted period" referenced in HA 1988 s.16E - was not visible via WebFetch of individual section pages on legislation.gov.uk, but was resolved by downloading the full enacted Act PDF (legislation.gov.uk/ukpga/2025/26/data.pdf) and reading RRA 2025 s.17 directly, which inserts HA 1988 s.16E(3)-(7) and pins the restricted period at twelve months from the s.8 notice (or claim filing). The 12-month figure in 20.2 is therefore verified clean against the enacted Act.

For future verification passes, the enacted-Act PDF is the most reliable source when WebFetch returns only summary content on a per-section URL.
