"""
Independent QA / triple-check of the parsed statements. Goes beyond "does it sum to
the declared totals" (which compensating or date errors can slip past) with three
stronger, independent checks:

  1. BANK RUNNING-BALANCE REPLAY  — walk parsed transactions in order and confirm the
     computed balance equals the statement's own printed running balance at EVERY
     checkpoint. Validates each txn's amount, direction and order, not just the total.
  2. CROSS-STATEMENT CONTINUITY   — each statement's closing balance must equal the
     next statement's opening balance, with no gaps, across the whole chain.
  3. COVERAGE / DUPLICATES / SANITY — every page read, no absurd amounts, duplicate scan.

Usage:  python expense-reconciliation/qa_statements.py
"""
from __future__ import annotations
import csv, re, sys
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent))
try:
    sys.stdout.reconfigure(encoding="utf-8")   # Windows console defaults to cp1252
except Exception:
    pass
import pdfplumber
from parse_statements import row_clusters, row_text, money, AMT, MONTHS, BANK_RE, AMEX_RE

S = Path(r"c:\Users\user\iCloudDrive\Statements")
OUT = Path(__file__).parent / "output"

def bank_balances(text: str):
    start = end = None
    for line in text.splitlines():
        m = re.search(r"Start\s*balance\D*([\d,]+\.\d{2})", line)
        if m: start = money(m.group(1))
        m = re.search(r"End\s*balance\D*([\d,]+\.\d{2})", line)
        if m: end = money(m.group(1))
    return start, end

# ---------------------------------------------------- 1) BANK RUNNING-BALANCE REPLAY
def replay_bank(path: Path):
    with pdfplumber.open(str(path)) as pdf:
        start, end = bank_balances(pdf.pages[0].extract_text() or "")
        if start is None:
            return dict(name=path.name, ok=False, note="no start balance")
        running = start
        cps = matched = 0
        first_bad = None
        for page in pdf.pages:
            for row in row_clusters(page):
                out = inn = bal = None
                for w in row:
                    if AMT.match(w["text"]):
                        x1, val = w["x1"], money(w["text"])
                        if x1 < 334:            out = val
                        elif x1 < 410:          inn = val
                        elif 418 <= x1 <= 426:  bal = val
                if out is not None: running = round(running - out, 2)
                if inn is not None: running = round(running + inn, 2)
                if bal is not None:
                    cps += 1
                    if abs(running - bal) <= 0.01:
                        matched += 1
                    elif first_bad is None:
                        first_bad = (bal, running, row_text(row)[:55])
        final_ok = end is not None and abs(running - end) <= 0.01
    return dict(name=path.name, ok=(matched == cps and final_ok), cps=cps, matched=matched,
                first_bad=first_bad, computed_end=running, declared_end=end)

# ---------------------------------------------------- 2) CONTINUITY + amex totals
def amex_totals(path: Path):
    with pdfplumber.open(str(path)) as pdf:
        full = "\n".join((pg.extract_text() or "") for pg in pdf.pages)
    cm = re.search(r"([\d,]+\.\d{2})\s*-\s*[^\d]*([\d,]+\.\d{2})\s*\+\s*[^\d]*([\d,]+\.\d{2})\s*=\s*[^\d]*([\d,]+\.\d{2})", full)
    if not cm: return None
    prev, credits, debits, closing = (money(cm.group(i)) for i in range(1, 5))
    return dict(prev=prev, credits=credits, debits=debits, closing=closing)

def bank_key(name):   # "Jul 2023 Statement.pdf" -> (2023, 7)
    m = re.match(r"([A-Z][a-z]{2}) (\d{4})", name)
    return (int(m.group(2)), MONTHS[m.group(1)])

def amex_key(name):   # "11_Jun_2024_-_10_Jul_2024.pdf" -> end (2024,7)
    m = re.search(r"-_\d{2}_([A-Z][a-z]{2})_(\d{4})", name)
    return (int(m.group(2)), MONTHS[m.group(1)])

# ---------------------------------------------------------------------------- main
def main():
    bank = sorted([p for p in S.glob("*.pdf") if BANK_RE.match(p.name)], key=lambda p: bank_key(p.name))
    amex = sorted([p for p in S.glob("*.pdf") if AMEX_RE.match(p.name)], key=lambda p: amex_key(p.name))
    other = [p for p in S.glob("*.pdf") if not BANK_RE.match(p.name) and not AMEX_RE.match(p.name)]

    print("="*72)
    print("CHECK 1 — BANK RUNNING-BALANCE REPLAY (every printed balance must match)")
    print("="*72)
    tot_cp = tot_ok = 0; bad = []
    for p in bank:
        r = replay_bank(p)
        tot_cp += r.get("cps", 0); tot_ok += r.get("matched", 0)
        if not r["ok"]:
            bad.append(r)
            print(f"  ** {p.name}: {r.get('matched')}/{r.get('cps')} checkpoints, "
                  f"end computed {r.get('computed_end')} vs {r.get('declared_end')}  first_bad={r.get('first_bad')}")
    print(f"  {len(bank)} bank statements | checkpoints matched: {tot_ok}/{tot_cp} | statements fully clean: {len(bank)-len(bad)}/{len(bank)}")

    print("\n" + "="*72)
    print("CHECK 2 — CROSS-STATEMENT CONTINUITY (closing[m] == opening[m+1], no gaps)")
    print("="*72)
    # bank
    breaks = 0
    prev = None
    for p in bank:
        s, e = bank_balances(pdfplumber.open(str(p)).pages[0].extract_text() or "")
        if prev is not None:
            pe, pname = prev
            if abs(pe - s) > 0.01:
                breaks += 1
                print(f"  ** BANK gap: {pname} closed {pe} but {p.name} opened {s}  (Δ{round(s-pe,2)})")
        prev = (e, p.name)
    print(f"  BANK: {len(bank)} statements chained, breaks: {breaks}")
    # amex
    abreaks = 0; prev = None; internal_bad = 0
    for p in amex:
        t = amex_totals(p)
        if t is None:
            print(f"  ** AMEX {p.name}: no totals"); continue
        if abs(t["prev"] - t["credits"] + t["debits"] - t["closing"]) > 0.01:
            internal_bad += 1
            print(f"  ** AMEX {p.name} internal identity off: {t['prev']} - {t['credits']} + {t['debits']} != {t['closing']}")
        if prev is not None:
            pc, pname = prev
            if abs(pc - t["prev"]) > 0.01:
                abreaks += 1
                print(f"  ** AMEX gap: {pname} closed {pc} but {p.name} prev-balance {t['prev']}  (Δ{round(t['prev']-pc,2)})")
        prev = (t["closing"], p.name)
    print(f"  AMEX: {len(amex)} statements chained, breaks: {abreaks}, internal-identity failures: {internal_bad}")

    print("\n" + "="*72)
    print("CHECK 3 — COVERAGE / DUPLICATES / SANITY")
    print("="*72)
    print(f"  PDFs: {len(bank)} bank + {len(amex)} amex parsed; {len(other)} non-statement skipped ({[p.name for p in other]})")
    rows = list(csv.DictReader(open(OUT / "transactions_raw.csv", encoding="utf-8")))
    amts = [float(r["amount"]) for r in rows]
    zeros = sum(1 for a in amts if a == 0); negs = sum(1 for a in amts if a < 0)
    print(f"  transactions: {len(rows)} | amount min {min(amts)} max {max(amts)} | zero-amount: {zeros} | negative: {negs}")
    excl = sum(1 for r in rows if r["direction"] == "excluded")
    print(f"  direction: out={sum(1 for r in rows if r['direction']=='out')} "
          f"in={sum(1 for r in rows if r['direction']=='in')} excluded={excl}")
    dups = defaultdict(int)
    for r in rows:
        dups[(r["account"], r["txn_date"], r["amount"], r["description"])] += 1
    dgroups = {k: v for k, v in dups.items() if v > 1}
    print(f"  exact-duplicate groups (same acct+date+amount+desc): {len(dgroups)} "
          f"(often legitimate repeat purchases — sample below)")
    for k, v in list(sorted(dgroups.items(), key=lambda x:-x[1]))[:5]:
        print(f"      x{v}  {k[1]} £{k[2]}  {k[3][:45]}")
    missing_date = sum(1 for r in rows if not r["txn_date"])
    print(f"  transactions with no parsed date: {missing_date}")

    print("\n" + "="*72)
    print("CHECK 4 — DATE-IN-RANGE (every txn date falls inside its statement's period)")
    print("="*72)
    import calendar
    from datetime import date, timedelta
    def allowed(fname):
        if BANK_RE.match(fname):
            y, m = bank_key(fname)
            return date(y, m, 1), date(y, m, calendar.monthrange(y, m)[1])
        am = re.match(r"(\d{2})_([A-Z][a-z]{2})_(\d{4})_-_(\d{2})_([A-Z][a-z]{2})_(\d{4})", fname)
        if am:
            return (date(int(am.group(3)), MONTHS[am.group(2)], int(am.group(1))),
                    date(int(am.group(6)), MONTHS[am.group(5)], int(am.group(4))))
        return None
    out_of_range = 0; oor_samples = []
    for r in rows:
        if r["direction"] == "excluded" or not r["txn_date"]:
            continue
        rng = allowed(r["source_file"])
        if not rng:
            continue
        d = date(*map(int, r["txn_date"].split("-")))
        # AMEX purchase dates can precede the billing period start by a few days
        # (card posting lag). Bank statements are strict calendar months.
        grace = timedelta(days=10) if AMEX_RE.match(r["source_file"]) else timedelta(0)
        if not (rng[0] - grace <= d <= rng[1]):
            out_of_range += 1
            if len(oor_samples) < 6:
                oor_samples.append((r["source_file"], r["txn_date"], r["amount"], r["description"][:35]))
    print(f"  transactions outside their statement period: {out_of_range}")
    for s in oor_samples:
        print(f"      {s[0]}  date={s[1]} £{s[2]}  {s[3]}")

    print("\n" + "="*72)
    verdict = (len(bad) == 0 and breaks == 0 and abreaks == 0 and internal_bad == 0
               and missing_date == 0 and out_of_range == 0)
    print("OVERALL:", "ALL CHECKS PASS ✓" if verdict else "SEE FLAGS ABOVE ✗")
    print("="*72)

if __name__ == "__main__":
    main()
