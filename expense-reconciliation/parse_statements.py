"""
Parse Nationwide FlexAccount (bank) + American Express (AMEX) PDF statements into
one normalized transaction ledger, and self-verify each statement against its own
declared control totals (start/end balance for bank; prev/credits/debits/closing for
AMEX). Any statement whose parsed transactions don't reconcile is FLAGGED, not trusted.

Deterministic only — no LLM touches the numbers. Business-relevance categorisation is
a later, separate step.

Outputs (gitignored):
  output/transactions_raw.csv     one row per transaction
  output/reconciliation_report.csv  one row per statement, pass/fail + deltas

Usage:  python expense-reconciliation/parse_statements.py [--statements DIR]
"""
from __future__ import annotations
import argparse, csv, re, sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

import pdfplumber

MONTHS = {m: i for i, m in enumerate(
    ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], start=1)}
AMT = re.compile(r"^-?[\d,]+\.\d{2}$")
MONEY = re.compile(r"[\d,]+\.\d{2}")

def money(s: str) -> float:
    return float(s.replace(",", "").replace("£", "").replace("�", "").strip())

def row_clusters(page):
    """Group a page's words into visual rows (list of word-dicts), top-to-bottom."""
    rows: list[list[dict]] = []
    for w in sorted(page.extract_words(use_text_flow=False), key=lambda w: (round(w["top"]), w["x0"])):
        if rows and abs(w["top"] - rows[-1][0]["top"]) < 4:
            rows[-1].append(w)
        else:
            rows.append([w])
    for r in rows:
        r.sort(key=lambda w: w["x0"])
    return rows

def row_text(row) -> str:
    return " ".join(w["text"] for w in row)

@dataclass
class Txn:
    source_file: str
    account: str            # 'bank' | 'amex'
    txn_date: str           # ISO yyyy-mm-dd
    description: str
    direction: str          # 'out' | 'in'
    amount: float
    currency: str = "GBP"
    foreign_amount: str = ""
    foreign_ccy: str = ""

@dataclass
class Recon:
    source_file: str
    account: str
    n_txn: int
    parsed_out: float
    parsed_in: float
    declared_out: float
    declared_in: float
    status: str
    note: str = ""


# ----------------------------------------------------------------------------- BANK
def parse_bank(path: Path) -> tuple[list[Txn], Recon]:
    txns: list[Txn] = []
    with pdfplumber.open(str(path)) as pdf:
        p0 = pdf.pages[0].extract_text() or ""
        # statement month/year, e.g. "Statement date: 31 July 2023"
        m = re.search(r"Statement date:\s*\d{1,2}\s+([A-Za-z]+)\s+(\d{4})", p0)
        stmt_month = m.group(1)[:3].title() if m else None
        stmt_year = int(m.group(2)) if m else None
        start_bal = end_bal = None
        for line in p0.splitlines():
            lm = re.search(r"Start\s*balance\D*([\d,]+\.\d{2})", line)
            if lm: start_bal = money(lm.group(1))
            lm = re.search(r"End\s*balance\D*([\d,]+\.\d{2})", line)
            if lm: end_bal = money(lm.group(1))

        cur_day = None
        cur_month = MONTHS.get(stmt_month) if stmt_month else None
        cur_year = stmt_year

        for page in pdf.pages:
            words = page.extract_words(use_text_flow=False)
            # cluster words into visual rows by 'top'
            rows: list[list[dict]] = []
            for w in sorted(words, key=lambda w: (round(w["top"]), w["x0"])):
                if rows and abs(w["top"] - rows[-1][0]["top"]) < 4:
                    rows[-1].append(w)
                else:
                    rows.append([w])

            for row in rows:
                row.sort(key=lambda w: w["x0"])
                date_words = [w for w in row if w["x1"] < 90]
                desc_words = [w for w in row if 90 <= w["x0"] < 265]
                out_amt = in_amt = None
                for w in row:
                    if AMT.match(w["text"]):
                        x1 = w["x1"]
                        if x1 < 334:      out_amt = money(w["text"])
                        elif x1 < 390:    in_amt = money(w["text"])
                        # else: balance column, ignore
                # update running date
                dtext = " ".join(w["text"] for w in date_words)
                dm = re.search(r"\b(\d{1,2})\b", dtext)
                mm = re.search(r"\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b", dtext)
                if dm: cur_day = int(dm.group(1))
                if mm: cur_month = MONTHS[mm.group(1)]
                ym = re.search(r"\b(20\d{2})\b", dtext)
                if ym: cur_year = int(ym.group(1))

                desc = " ".join(w["text"] for w in desc_words).strip()

                if out_amt is not None or in_amt is not None:
                    if cur_day and cur_month and cur_year:
                        iso = f"{cur_year:04d}-{cur_month:02d}-{cur_day:02d}"
                    else:
                        iso = ""
                    txns.append(Txn(path.name, "bank", iso, desc,
                                    "out" if out_amt is not None else "in",
                                    out_amt if out_amt is not None else in_amt))
                elif desc and txns and txns[-1].source_file == path.name:
                    # continuation / merchant-detail line -> enrich previous txn
                    if not desc.lower().startswith("balance from statement"):
                        txns[-1].description = (txns[-1].description + " " + desc).strip()

    out_sum = round(sum(t.amount for t in txns if t.direction == "out"), 2)
    in_sum = round(sum(t.amount for t in txns if t.direction == "in"), 2)
    status, note = "NO_TOTALS", ""
    if start_bal is not None and end_bal is not None:
        expected_end = round(start_bal - out_sum + in_sum, 2)
        if abs(expected_end - end_bal) <= 0.01:
            status = "OK"
        else:
            status = "MISMATCH"
            note = f"start {start_bal} - out {out_sum} + in {in_sum} = {expected_end} != end {end_bal} (delta {round(expected_end-end_bal,2)})"
    rec = Recon(path.name, "bank", len(txns), out_sum, in_sum,
                round((start_bal - end_bal + in_sum), 2) if start_bal is not None else 0.0,
                in_sum, status, note)
    return txns, rec


# ----------------------------------------------------------------------------- AMEX
AMEX_TXN = re.compile(r"^([A-Z][a-z]{2}\d{1,2})\s+([A-Z][a-z]{2}\d{1,2})\s+(.+?)\s+([\d,]+\.\d{2})$")
AMEX_DATE = re.compile(r"^([A-Z][a-z]{2})(\d{1,2})$")

def _amex_year_for(month: int, start_m: int, start_y: int, end_m: int, end_y: int) -> int:
    if start_y == end_y:
        return start_y
    # period spans a year boundary (e.g. Dec->Jan): later months belong to start_y
    return start_y if month >= start_m else end_y

def parse_amex(path: Path) -> tuple[list[Txn], Recon]:
    txns: list[Txn] = []
    prev_bal = new_credits = new_debits = closing = None
    start_m = start_y = end_m = end_y = None
    with pdfplumber.open(str(path)) as pdf:
        full = "\n".join((pg.extract_text() or "") for pg in pdf.pages)
        # control totals: "�1,482.44 - �2,769.63 + �1,816.07 = �528.88"
        cm = re.search(r"([\d,]+\.\d{2})\s*-\s*[^\d]*([\d,]+\.\d{2})\s*\+\s*[^\d]*([\d,]+\.\d{2})\s*=\s*[^\d]*([\d,]+\.\d{2})", full)
        if cm:
            prev_bal, new_credits, new_debits, closing = (money(cm.group(i)) for i in range(1, 5))
        pm = re.search(r"Statement Period From\s*(\d{1,2})\s*([A-Za-z]+)\s*to\s*(\d{1,2})\s*([A-Za-z]+)\s*(\d{4})", full)
        if pm:
            start_m = MONTHS[pm.group(2)[:3].title()]
            end_m = MONTHS[pm.group(4)[:3].title()]
            end_y = int(pm.group(5))
            start_y = end_y - 1 if start_m > end_m else end_y

        for pg in pdf.pages:
            rows = [row_text(r) for r in row_clusters(pg)]
            section = "main"   # main -> other -> suspense
            for i, line in enumerate(rows):
                up = line.upper()
                if "OTHER ACCOUNT TRANSACTIONS" in up:
                    section = "other"; continue
                if "ITEMS IN SUSPENSE" in up:
                    section = "suspense"; continue
                m = AMEX_TXN.match(line.strip())
                if not m:
                    continue
                tdate, _pdate, details, amt_s = m.groups()
                dm = AMEX_DATE.match(tdate)
                if not dm:
                    continue
                mon = MONTHS.get(dm.group(1))
                day = int(dm.group(2))
                if not mon:
                    continue
                if start_m:
                    yr = _amex_year_for(mon, start_m, start_y, end_m, end_y)
                else:
                    yr = end_y or 0
                iso = f"{yr:04d}-{mon:02d}-{day:02d}" if yr else ""

                # credit? scan the next up-to-2 rows (stop at the next txn) for a CR marker.
                # Handles both "CR" on its own row (payments) and "...Benefit CR" (Deliveroo etc.)
                is_credit = False
                for k in range(i + 1, min(i + 3, len(rows))):
                    nxt = rows[k].strip()
                    if AMEX_TXN.match(nxt):
                        break
                    if nxt == "CR" or nxt.endswith(" CR"):
                        is_credit = True; break
                # disputed-charge suspensions/reversals net to zero and are excluded
                # from AMEX's own debit/credit totals -> drop from spend, keep for audit.
                excluded = section == "suspense" or "DISPUTED CHARGE" in up or "SUSPENSION" in up
                direction = "excluded" if excluded else ("in" if is_credit else "out")
                txns.append(Txn(path.name, "amex", iso, details.strip(), direction, money(amt_s)))

    out_sum = round(sum(t.amount for t in txns if t.direction == "out"), 2)
    in_sum = round(sum(t.amount for t in txns if t.direction == "in"), 2)
    status, note = "NO_TOTALS", ""
    if new_debits is not None:
        d_ok = abs(out_sum - new_debits) <= 0.01
        c_ok = abs(in_sum - new_credits) <= 0.01
        if d_ok and c_ok:
            status = "OK"
        else:
            status = "MISMATCH"
            note = f"debits parsed {out_sum} vs declared {new_debits} (d{round(out_sum-new_debits,2)}); credits parsed {in_sum} vs declared {new_credits} (d{round(in_sum-new_credits,2)})"
    rec = Recon(path.name, "amex", len(txns), out_sum, in_sum,
                new_debits or 0.0, new_credits or 0.0, status, note)
    return txns, rec


# ----------------------------------------------------------------------------- main
BANK_RE = re.compile(r"^[A-Z][a-z]{2} \d{4} Statement\.pdf$")
AMEX_RE = re.compile(r"^\d{2}_[A-Z][a-z]{2}_\d{4}_-_\d{2}_[A-Z][a-z]{2}_\d{4}\.pdf$")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--statements", default=r"c:\Users\user\iCloudDrive\Statements")
    args = ap.parse_args()
    src = Path(args.statements)
    out_dir = Path(__file__).parent / "output"
    out_dir.mkdir(exist_ok=True)

    all_txns: list[Txn] = []
    recons: list[Recon] = []
    for pdf in sorted(src.glob("*.pdf")):
        try:
            if AMEX_RE.match(pdf.name):
                t, r = parse_amex(pdf)
            elif BANK_RE.match(pdf.name):
                t, r = parse_bank(pdf)
            else:
                print(f"  ? skipped (unrecognised name): {pdf.name}")
                continue
            all_txns.extend(t)
            recons.append(r)
            flag = "OK " if r.status == "OK" else f"** {r.status}"
            print(f"  {flag} {pdf.name:42s} {r.account:4s} n={r.n_txn:3d} out={r.parsed_out:>10.2f} in={r.parsed_in:>10.2f}  {r.note}")
        except Exception as e:
            print(f"  !! ERROR {pdf.name}: {type(e).__name__}: {e}")
            recons.append(Recon(pdf.name, "?", 0, 0, 0, 0, 0, "ERROR", str(e)))

    with open(out_dir / "transactions_raw.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(asdict(all_txns[0]).keys()) if all_txns else
                           ["source_file","account","txn_date","description","direction","amount","currency","foreign_amount","foreign_ccy"])
        w.writeheader()
        for t in all_txns:
            w.writerow(asdict(t))
    with open(out_dir / "reconciliation_report.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(asdict(recons[0]).keys()))
        w.writeheader()
        for r in recons:
            w.writerow(asdict(r))

    n_ok = sum(1 for r in recons if r.status == "OK")
    n_bad = sum(1 for r in recons if r.status in ("MISMATCH", "ERROR"))
    print("\n" + "="*70)
    print(f"Statements: {len(recons)}  reconciled OK: {n_ok}  flagged: {n_bad}")
    print(f"Transactions parsed: {len(all_txns)}")
    print(f"  total OUT (money spent): {round(sum(t.amount for t in all_txns if t.direction=='out'),2):,.2f}")
    print(f"  total IN  (credits):     {round(sum(t.amount for t in all_txns if t.direction=='in'),2):,.2f}")
    print(f"Output -> {out_dir/'transactions_raw.csv'}")
    print(f"          {out_dir/'reconciliation_report.csv'}")

if __name__ == "__main__":
    main()
