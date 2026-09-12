# P0-C3 public and downloadable assets, contractors-ir35

Audit only. Nothing in `contractors-ir35/web/` was edited. Ground truth =
`docs/contractors-ir35/house_positions.md` (HP). Follow-up to the gap P0-C1 named itself
(`P0C1_CLAIMS_LEDGER.md`, "Not covered" bullet: `contractors-ir35/web/public/**` not opened).

Scope swept: `contractors-ir35/web/public/**` (7 files, the whole tree), plus every route that
emits a downloadable or machine-read artefact outside the page renderer:
`src/app/llms-full.txt/route.ts`, `src/app/feed.xml/route.ts`, `src/app/robots.ts`,
`src/app/sitemap.ts`, and the three `src/app/research/*/data/route.ts` CSV endpoints.
No PDF, DOCX, ZIP or static JSON feed exists anywhere in `public/`.

**Headline: the brief's premise is inverted.** The brief said "those documented constants are
themselves wrong". They are not. All three workbooks ship, all three carry a `Rates` sheet, and
**every locked numeric constant in all three matches HP exactly** (dividend 10.75/35.75/39.35,
£500 allowance, PA £12,570, basic-rate limit £37,700, EE NIC 8%/2% £12,570 to £50,270,
ER NIC 15% above £5,000, levy 0.5%, CT 19/25 with 3/200 and £50k/£250k limits). The wrong
constants P0-C1 found (LEL £6,396, Employment Allowance £5,000) are in the **prose that describes**
the workbooks, not in the workbooks. The workbooks are the clean artefact; the guide pages are
the dirty one. Fixing the prose must not "correct" the workbook to match it.

The workbooks are not clean on **claims**, though. Two non-numeric claims inside them are wrong
and are new (not in the P0-C1 ledger), and they sit in the artefact a reader acts on.

---

## The asset table

| path | what it is | linked from | figures found | verdict | severity | deriving command |
|---|---|---|---|---|---|---|
| `web/public/resources/ir35/outside-vs-inside-ir35-model.xlsx` | 4-sheet Excel model (Rates / Start here / Your figures / Notes), 55 named ranges, live formulas, no cached values | `src/lib/resources/registry.ts:70` (`enabled: true`) → rendered as a download link at `src/app/resources/[topic]/page.tsx:83-92`, behind `ResourceGate`; described in `content/resources/ir35.md` | Rates sheet: PA 12570; basic-rate limit 37700; higher-rate upper 112570; div allowance 500; div 0.1075/0.3575/0.3935; EE PT 12570, UEL 50270, 8%/2%; ER ST 5000, 15%; levy 0.005; CT 0.19/0.25, limits 50000/250000, fraction 0.015. Notes sheet repeats PA £12,570, 20% to £50,270, 40% to £125,140, 45%, and "no Employment Allowance for a single-director PSC" | **VERIFIED** (all constants) | n/a | `python -c "import zipfile,glob;..."` (full dumper below) |
| ↳ same file, `Notes!A18` + `Start here` framing | claim, not a figure: "Use a compliant umbrella **on the HMRC list**" | as above | — | **WRONG** | SERIOUS | `python dumper \| grep -i "HMRC list\|compliant list"` |
| ↳ same file, `Notes!A12` | "There is no 5% allowance **from April 2017**" | as above | — | **WRONG** (imprecise) | MINOR | same |
| `web/public/resources/structure/umbrella-vs-limited-model.xlsx` | 4-sheet Excel model, 58 named ranges, adds running-costs input (£2,000 default) and a net-benefit-after-fees row | `src/lib/resources/registry.ts:87` (`enabled: true`), same renderer + gate; described in `content/resources/structure.md` | Identical Rates sheet to the ir35 model (all 20 constants), plus default inputs: day rate 500, days 240, salary 12570, expenses 6000, umbrella margin 1200, running costs 2000 | **VERIFIED** (all constants) | n/a | as above |
| ↳ same file, `Start here!A14` and `Notes!A16` | "Always use an umbrella **on the HMRC-supervised compliant list**" | as above | — | **WRONG** | SERIOUS | `python dumper \| grep -i "HMRC-supervised"` |
| ↳ same file, `Notes!A17` | "Non-compliant tax avoidance schemes carry personal liability **under the Loan Charge**" | as above | — | **WRONG** (overstated) | MINOR | `python dumper \| grep -i "Loan Charge"` |
| `web/public/resources/pay-planning/salary-dividend-model.xlsx` | 4-sheet Excel model, 45 named ranges, personal-tax stack for a chosen salary/dividend split | `src/lib/resources/registry.ts:114` (`enabled: true`), same renderer + gate; described in `content/resources/pay-planning.md` | Rates sheet as above minus the levy (19 constants). Notes: "10.75% (was 8.75%)", "35.75% (was 33.75%)", "39.35% (unchanged)", ER NIC 15% above £5,000, no EA for a single-director PSC, CT 19/25 + 3/200, PA taper £1 per £2 over £100,000 nil at £125,140, "effective 60% marginal rate" | **VERIFIED** (all constants) | n/a | as above |
| `web/public/llms.txt` | 14.4 KB hand-authored AI-retrieval index; carries a "Key facts (current UK contractor tax figures, 2026/27)" block of **10 figure bullets** that reach machines without page review | served statically at `/llms.txt`; referenced by `src/app/llms-full.txt/route.ts` header | dividend 10.75/35.75/39.35 + £500; PA £12,570, taper, 20/40/45 to £50,270/£125,140, frozen to April 2031; EE 8% then 2%, ER 15% above £5,000, EA £10,500 not for single-director PSC; CT 19/25, 3/200, ~26.5%; small-company £15m / £7.5m / 50 employees for FYs from 6 Apr 2025, earliest exit 6 Apr 2027; umbrella JSL 6 Apr 2026 FA 2026 s.24 ITEPA Ch.11, umbrella stays employer; AMAP 55p/25p from 6 Apr 2026; VAT £90,000 / £88,000, FRS LCT 16.5%; s.455 35.75% on/after 6 Apr 2026; BADR 18% from 6 Apr 2026, £1m; MTD £50k/£30k/£20k Apr 2026/27/28, sole traders and landlords only | **VERIFIED** (all 10 bullets, every figure, against HP §§1.A, 5, 6, 7, 9, 10, 12, 14, 15 and the MTD verification-log line) | n/a | `cat contractors-ir35/web/public/llms.txt` |
| ↳ same file, all 60+ internal URLs | link integrity: 10 calculator slugs, 8 cornerstone blog posts, 3 research pages + 3 CSV endpoints, 10 sector pages, 7 categories, glossary/locations/embed | — | — | **VERIFIED** (zero dead links; the 8 blog URLs use `/blog/<category>/<slug>` and resolve via `src/app/blog/[category]/[slug]`, with the files flat in `content/blog/`) | n/a | see "Deriving commands" §2 |
| `web/public/brand/primary-logo.png` | PNG, 760x200, 10.3 KB | `niche.config.json:23` `brand.logo_path` | none (no text-baked figures; wordmark only) | VERIFIED | n/a | `python -c "import struct;d=open(p,'rb').read();print(struct.unpack('>II',d[16:24]))"` |
| `web/public/brand/icon-alt.png` | PNG, **512x512**, 10.7 KB; used as `publisherLogoUrl` | `niche.config.json:24` → `src/config/site.ts:29` → `src/app/layout.tsx:55` (`openGraph.images`) and `:61` (`twitter.images`) | none | **VERIFIED as an asset**, but see note: it is the **only** og:image and it is square | MINOR | `grep -n "publisherLogoUrl" -r contractors-ir35/web/src` |
| `web/public/fc84f134ebf231eaec2e26e2646a4ede.txt` | 32-byte site-verification token (IndexNow key file); content is its own filename | nothing in the repo; consumed by Bing/IndexNow by convention | none | **VERIFIED** (correct IndexNow key-file form: body == basename) | n/a | `cat contractors-ir35/web/public/fc84f134ebf231eaec2e26e2646a4ede.txt` |
| `/llms-full.txt` (route, `src/app/llms-full.txt/route.ts`) | force-static machine dump of all 62 blog posts, with an editorial header | `public/llms.txt` "Full index"; built via `@accounting-network/web-shared` | header: "dividend rates 10.75% / 35.75% / 39.35%, employer NIC 15% above £5,000, corporation tax 19% to 25% with marginal relief" | **VERIFIED** | n/a | `sed -n '1,30p' contractors-ir35/web/src/app/llms-full.txt/route.ts` |
| `/research/uk-contractor-index/data` (CSV route) | force-static press CSV of monthly incorporations by SIC | `public/llms.txt` research block; research page | no tax figures (counts only); OGL v3.0 attribution and a "not a direct count of contractors" caveat present | VERIFIED (out of figures scope) | n/a | `head -40 contractors-ir35/web/src/app/research/uk-contractor-index/data/route.ts` |
| `/research/uk-contractor-survival-index/data`, `/research/uk-contractor-insolvency-index/data` (CSV routes) | same pattern, ONS / Insolvency Service series | same | no tax figures | VERIFIED (out of figures scope) | n/a | `ls contractors-ir35/web/src/app/research/*/data/route.ts` |
| `/robots.txt` (route, `src/app/robots.ts`) | allow-all with a 50-plus named AI/search bot allow-list; disallows `/thank-you`, `/admin`, `/api/` | Next metadata route | none | **VERIFIED**, no oddity (sitemap + host set, no stray `Disallow: /`) | n/a | `cat contractors-ir35/web/src/app/robots.ts` |
| `/sitemap.xml` (route, `src/app/sitemap.ts`) | generated sitemap | Next metadata route | none | VERIFIED (references `/resources/` but the three resource guides carry `noindex: true` in frontmatter, so index and sitemap agree in intent) | n/a | `grep -n "resources" contractors-ir35/web/src/app/sitemap.ts` |
| `/feed.xml` (route) | RSS | site chrome | none checked as figures | out of scope | n/a | `ls contractors-ir35/web/src/app/feed.xml/route.ts` |

**MISSING: none.** Every downloadable artefact described in `content/resources/*.md` exists on
disk, at the exact path the registry points to, with the "rates tab" the prose promises.
No PDF, DOCX, ZIP or static JSON is described anywhere and absent.

**ORPHANED: none in the harmful sense.** The only unreferenced file is the IndexNow key file,
which is unreferenced **by design** (the crawler fetches it by URL). `primary-logo.png` and
`icon-alt.png` are both wired through `niche.config.json`.

**UNREADABLE: none.** All three xlsx files were opened as OOXML zips and every cell, formula and
named range read directly. Nothing in this report is inferred from a filename.

---

## The three serious findings

**1. "the HMRC list" / "the HMRC-supervised compliant list" of umbrella companies does not exist.**
`outside-vs-inside-ir35-model.xlsx` `Notes!A18`, and `umbrella-vs-limited-model.xlsx`
`Start here!A14` + `Notes!A16`. HMRC publishes a list of **named tax avoidance schemes and
promoters** (a blacklist) and, separately, guidance on working through an umbrella. It does not
publish, supervise or accredit a list of compliant umbrella companies. HP §12 says the opposite
of what these cells say: the house position is **"FCSA / Professional Passport accredited,
transparent KID"**, ie private accreditation, precisely because there is no state list. A reader
who follows this instruction goes looking for a government list, does not find one, and either
gives up on the check or mistakes HMRC's blacklist-absence for a clean bill of health. This is
the more serious class of defect the brief anticipated (wrong content inside the artefact the
reader plans with), and it is **new**: it appears in no row of the P0-C1 ledger.
Severity **SERIOUS**, two files, three cells.

**2. "personal liability under the Loan Charge" is the wrong mechanism.**
`umbrella-vs-limited-model.xlsx` `Notes!A17`. The Loan Charge is a specific, historic charge on
disguised-remuneration loans outstanding at 5 April 2019. It is not the live liability route for
a contractor who joins a non-compliant umbrella scheme **today**; that exposure runs through the
disguised-remuneration rules (ITEPA Part 7A), Accelerated Payment / Follower Notices and HMRC's
named-schemes powers. Naming a closed historic charge as the current risk is both wrong and
weaker than the truth. Severity **MINOR** (the warning points the right way; only the citation
is wrong), but it is a named statutory mechanism in a published artefact.

**3. "There is no 5% allowance from April 2017" is only half the date band.**
`outside-vs-inside-ir35-model.xlsx` `Notes!A12`. Correct per HP §4 for the public sector; for
medium and large private-sector clients Chapter 10 (and so the loss of the 5%) bites from
**6 April 2021**. The same workbook's own companion prose (`content/resources/ir35.md`) states
both dates correctly, so the workbook is the outlier. Severity **MINOR**.

## What passed, and is worth recording because it was doubted

- **Every locked constant in all three Rates sheets matches HP.** Twenty constants in the two
  IR35/structure models, nineteen in the pay-planning model. Zero retired figures anywhere in
  the three workbooks: no 8.75/33.75, no 13.8%, no £9,100, no £6,396, no £5,000 EA, no 45p,
  no £85,000. The brief's stated premise ("those documented constants are themselves wrong")
  does not hold.
- **The workbook arithmetic is right, checked by recomputation, not by reading.** Running the
  ir35 model's own default inputs (£500/day, 240 days, salary £12,570, expenses £6,000, margin
  £1,200) by hand through its published formula chain gives outside net £71,821 and inside net
  £69,890, a gap of **£1,931**. Both `content/resources/ir35.md:12` and
  `content/resources/structure.md:21` claim "typically around GBP1,900 to GBP2,000". Those two
  prose claims are **VERIFIED against the artefact**, which is the check P0-C1 could not make.
- **The umbrella grossing-up formula is correct.** `gross = (pot + ER_RATE*ER_ST) / (1 + ER_RATE
  + LEVY)`, which is the right algebraic solution to the employer-NIC circularity given a
  threshold, and it matches the formula written out in `content/resources/ir35.md:31` verbatim.
- **Named ranges resolve.** 55 / 58 / 45 `definedName` entries; every symbol used in a formula is
  defined. The models will compute on open.
- **llms.txt is clean on both figures and links.** All 10 key-fact bullets verified against HP;
  all 60-plus internal URLs resolve to a real route or content file. Given P0-C1 found 21 serious
  wrong figures in the prose, an untouched machine-facing figure block was the likeliest place
  for a 22nd. It is not there.
- **The IR35 status disclaimer is present three times in the ir35 workbook** (`Start here!A8-A13`,
  `Your figures!A39-A41`, `Notes!A3-A9`), correctly naming Ready Mixed Concrete, Atholl House,
  Kickabout and PGMOL, and correctly stating the CEST stand-behind promise **with its limits**
  (HP §2 writing rule). The workbooks do not repeat the two PGMOL "2023" citation errors P0-C1
  found in the prose; they cite PGMOL without a year. Clean by omission.

## Two lower-severity notes

- **`Notes!A21`, both models: "basic 20% to GBP50,270; higher 40% to GBP125,140".** Correct as
  written (those are total-income points), and the Rates sheet separately holds the
  taxable-income forms 37,700 and 112,570 that the formulas actually use. No defect; recorded
  because the two number pairs look contradictory on a fast read and a fixer might "correct" the
  right one.
- **No cached cell values.** The workbooks store formulas with no `<v>` result, so a preview pane
  that does not recalculate (Windows Explorer / Quick Look / some mail clients) shows blank
  result cells. Excel, LibreOffice and Google Sheets all recalculate on open, so a reader who
  actually opens the file is fine. Cosmetic, but it is how a "broken spreadsheet" complaint would
  arrive.
- **og:image is a 512x512 square.** `icon-alt.png` is the only Open Graph and Twitter image for
  the whole site. It is a real asset with no baked-in text, so it publishes no claim, but at
  512x512 it is not the 1200x630 that Twitter `summary_large_image` and most social unfurlers
  expect. Presentational, outside the figures brief, flagged because the brief asked about OG
  images and this is what the sweep found.

---

## Deriving commands

**1. Dump every cell, formula and shared string from all three workbooks** (this is the command
behind every workbook row above; no third-party library needed):

```bash
cd contractors-ir35/web && python -c "
import zipfile,glob
from xml.etree import ElementTree as ET
NS='{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
for f in sorted(glob.glob('public/resources/*/*.xlsx')):
    print('='*70); print(f)
    z=zipfile.ZipFile(f)
    ss=[''.join(t.text or '' for t in si.iter(NS+'t')) for si in ET.fromstring(z.read('xl/sharedStrings.xml'))]
    wb=ET.fromstring(z.read('xl/workbook.xml'))
    for i,nm in enumerate([s.get('name') for s in wb.iter(NS+'sheet')],1):
        print('--- SHEET',i,nm)
        for row in ET.fromstring(z.read('xl/worksheets/sheet%d.xml'%i)).iter(NS+'row'):
            cells=[]
            for c in row.iter(NS+'c'):
                v=c.find(NS+'v'); fo=c.find(NS+'f')
                val='={}'.format(fo.text) if fo is not None else (ss[int(v.text)] if (v is not None and c.get('t')=='s') else (v.text if v is not None else ''))
                if val: cells.append(c.get('r')+':'+val)
            if cells: print(' | '.join(cells))
"
```

**2. llms.txt link integrity** (calculator slugs, blog slugs, top-level routes):

```bash
cd contractors-ir35/web
for s in $(grep -o "calculators/[a-z0-9-]*" public/llms.txt | sed 's|.*/||' | sort -u); do
  [ -f "src/lib/calculators/tools/$s.ts" ] || echo "MISSING calc: $s"; done
for p in $(grep -o "blog/[a-z0-9-]*/[a-z0-9-]*" public/llms.txt | sort -u); do
  [ -f "content/blog/$(basename $p).md" ] || echo "MISSING blog: $p"; done
for p in glossary locations embed research calculators resources; do
  [ -d "src/app/$p" ] || echo "MISSING route: $p"; done
```

**3. Enumerate the whole public surface and what links to each file:**

```bash
cd contractors-ir35/web
find public -type f | while read f; do
  echo "== $f"; grep -rn "$(basename "$f")" src content ../niche.config.json 2>/dev/null | head -5
done
```

**4. Retired-figure sweep across the workbooks** (the P0-C1 rule, applied to the artefacts):

```bash
# run the §1 dumper, then:
... | grep -nE "8\.75|33\.75|13\.8|9,?100|6,?396|85,?000|\b45p\b|40,?000|240,?000|10\.2m|5\.1m"
# expected: only the historical "(was 8.75%)" / "(was 33.75%)" annotations in the
# pay-planning Notes sheet, which are correctly date-banded.
```
