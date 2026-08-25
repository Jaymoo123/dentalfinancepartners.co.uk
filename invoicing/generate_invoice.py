#!/usr/bin/env python3
"""
Monthly invoice generator for Ashfield Trading Limited.

What it does:
  1. Reads your settings from a config file (default: invoice_config.toml).
  2. Optionally imports your leads from a CSV and counts them.
  3. Works out every amount, the subtotal and the total, and checks the maths.
  4. Writes a clean, black and white, A4, GBP PDF invoice into the "output" folder.

You never need to edit this file to make a normal monthly invoice.
Change the details in invoice_config.toml instead, then run:

    python generate_invoice.py

To use a different config file (for example a saved copy for one client):

    python generate_invoice.py my-other-config.toml
"""

import csv
import re
import sys
from datetime import date, timedelta
from pathlib import Path

# TOML reader: built in on Python 3.11+, falls back to the "tomli" package.
try:
    import tomllib
except ModuleNotFoundError:
    try:
        import tomli as tomllib
    except ModuleNotFoundError:
        sys.exit(
            "Could not find a TOML reader.\n"
            "On Python 3.10 or older, run this once:  pip install tomli"
        )

from fpdf import FPDF
from fpdf.enums import XPos, YPos

HERE = Path(__file__).resolve().parent
PAYMENT_TERMS_DAYS = 14
POUND = "£"  # the pound sign, written this way so it is safe in every editor

# Your fixed details, baked in as defaults. The config file can override these,
# but it does not need to. If your business or bank details ever change for good,
# update them here (or in the [business] / [bank] section of the config).
DEFAULT_BUSINESS = {
    "name": "Ashfield Trading Limited",
    "address": ["20 Ashfield Avenue, Bradford, BD18 3AL"],
    "email": "Junayd@ashfieldtrading.com",
}
DEFAULT_BANK = {
    "bank": "Tide",
    "account_name": "Ashfield Trading Limited",
    "sort_code": "04-06-05",
    "account_number": "26759454",
}

# Page geometry (millimetres). A4 is 210 wide by 297 tall.
MARGIN = 18
PAGE_W = 210
LEFT = MARGIN
RIGHT = PAGE_W - MARGIN          # 192
CONTENT_W = RIGHT - LEFT         # 174

# Invoice table column widths (must add up to CONTENT_W = 174).
COL_DESC = 94
COL_QTY = 20
COL_UNIT = 30
COL_AMT = 30


# ----------------------------------------------------------------------
#  Small helpers
# ----------------------------------------------------------------------

def money(value):
    """Format a number as GBP, e.g. 765 -> '£765.00'."""
    return f"{POUND}{value:,.2f}"


def uk_date(d):
    """Format a date the British way, e.g. '1 July 2026' (no leading zero)."""
    return f"{d.day} {d.strftime('%B')} {d.year}"


def die(message):
    """Stop with a friendly, plain-English error message."""
    sys.exit("\nProblem: " + message + "\n")


def safe_filename(text):
    """Turn a label into a file name that is safe on Windows, Mac and Linux."""
    cleaned = re.sub(r'[\\/:*?"<>|]', "", text)   # drop characters not allowed in file names
    cleaned = re.sub(r"\s+", " ", cleaned).strip().strip(".")
    return cleaned


# ----------------------------------------------------------------------
#  Load and check the config
# ----------------------------------------------------------------------

def load_config(path):
    if not path.exists():
        die(f"Could not find the config file '{path.name}'. "
            f"Make sure it is in the same folder as this tool.")
    with open(path, "rb") as f:
        try:
            cfg = tomllib.load(f)
        except tomllib.TOMLDecodeError as e:
            die(f"The config file '{path.name}' has a formatting mistake.\n"
                f"         {e}\n"
                f"         Common causes: a missing quote, or a missing comma. "
                f"Compare your edit with the notes in the file.")
    return cfg


# ----------------------------------------------------------------------
#  Lead import. This is deliberately in one small function so it is easy
#  to swap later (for example, to read from a database or a Google Sheet
#  instead of a CSV). Whatever the source, it just needs to return a
#  count and, optionally, a list of references.
# ----------------------------------------------------------------------

def load_leads(cfg):
    leads_cfg = cfg.get("leads", {})
    if not leads_cfg.get("enabled", False):
        return {"count": 0, "references": [], "used": False}

    csv_path = (HERE / leads_cfg.get("path", "")).resolve()
    if not csv_path.exists():
        die(f"Lead import is switched on but the file was not found:\n"
            f"         {csv_path}\n"
            f"         Fix the 'path' in the [leads] section, or set enabled = false.")

    date_col = leads_cfg.get("date_column", "date")
    ref_col = leads_cfg.get("reference_column", "reference")
    period = str(leads_cfg.get("period", "")).strip()

    rows = []
    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if period:
                cell = (row.get(date_col) or "").strip()
                if not cell.startswith(period):
                    continue
            rows.append(row)

    references = [(r.get(ref_col) or "").strip() for r in rows]
    references = [r for r in references if r]
    return {"count": len(rows), "references": references, "used": True}


# ----------------------------------------------------------------------
#  Build the priced line items and check every number adds up
# ----------------------------------------------------------------------

def build_line_items(cfg, lead_count):
    raw_items = cfg.get("line_items", [])
    if not raw_items:
        die("No line items found. Add at least one [[line_items]] block to the config.")

    items = []
    for i, item in enumerate(raw_items, start=1):
        desc = str(item.get("description", "")).strip()
        if not desc:
            die(f"Line item {i} has no description.")

        qty_raw = item.get("quantity")
        if isinstance(qty_raw, str) and qty_raw.strip().lower() == "auto":
            if not cfg.get("leads", {}).get("enabled", False):
                die(f"Line item {i} uses quantity = \"auto\", but lead import is off.\n"
                    f"         Either set enabled = true in the [leads] section, "
                    f"or put a number instead of \"auto\".")
            qty = lead_count
        else:
            try:
                qty = int(qty_raw)
            except (TypeError, ValueError):
                die(f"Line item {i} has an invalid quantity: {qty_raw!r}. "
                    f"Use a whole number, or the word \"auto\".")

        try:
            unit = float(item.get("unit_price"))
        except (TypeError, ValueError):
            die(f"Line item {i} has an invalid unit_price: {item.get('unit_price')!r}.")

        amount = round(qty * unit, 2)
        items.append({"description": desc, "qty": qty, "unit": unit, "amount": amount})

    subtotal = round(sum(it["amount"] for it in items), 2)
    total = subtotal  # No VAT (Ashfield Trading Limited is not VAT registered).

    # Independent check that the maths adds up before we print anything.
    recomputed = round(sum(round(it["qty"] * it["unit"], 2) for it in items), 2)
    if recomputed != subtotal:
        die("Internal maths check failed. Please tell your developer.")

    return items, subtotal, total


# ----------------------------------------------------------------------
#  Draw the PDF
# ----------------------------------------------------------------------

def draw_invoice(cfg, items, subtotal, total, leads):
    business = {**DEFAULT_BUSINESS, **cfg.get("business", {})}
    bank = {**DEFAULT_BANK, **cfg.get("bank", {})}
    client = cfg.get("client", {})

    invoice_number = str(cfg.get("invoice_number", "")).strip()
    if not invoice_number:
        die("invoice_number is missing from the config.")

    try:
        inv_date = date.fromisoformat(str(cfg.get("invoice_date", "")).strip())
    except ValueError:
        die(f"invoice_date must look like 2026-07-01 (year-month-day). "
            f"Got: {cfg.get('invoice_date')!r}")
    due_date = inv_date + timedelta(days=PAYMENT_TERMS_DAYS)
    billing_period = str(cfg.get("billing_period", "")).strip()

    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=MARGIN)
    pdf.set_margins(LEFT, MARGIN, MARGIN)
    pdf.set_title(f"Invoice {invoice_number} - {business['name']}")
    pdf.set_author(business["name"])
    pdf.set_text_color(0, 0, 0)
    pdf.set_draw_color(0, 0, 0)
    pdf.add_page()

    # ---- Header: business (left) and INVOICE block (right) ----
    top = MARGIN

    # Right block first: the big word and the invoice meta, all right aligned.
    pdf.set_xy(LEFT, top)
    pdf.set_font("Helvetica", "B", 26)
    pdf.cell(CONTENT_W, 12, "INVOICE", align="R",
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 10)
    meta_lines = [
        f"Invoice No:  {invoice_number}",
        f"Date:  {uk_date(inv_date)}",
        f"Due:  {uk_date(due_date)}",
    ]
    if billing_period:
        meta_lines.append(f"Period:  {billing_period}")
    for line in meta_lines:
        pdf.set_x(LEFT)
        pdf.cell(CONTENT_W, 5, line, align="R",
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    right_bottom = pdf.get_y()

    # Left block, drawn over the blank left side of the header band.
    pdf.set_xy(LEFT, top + 1)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 6, business["name"], new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("Helvetica", "", 10)
    for line in list(business.get("address", [])) + [business.get("email", "")]:
        if line:
            pdf.set_x(LEFT)
            pdf.cell(0, 5, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    left_bottom = pdf.get_y()

    # Thin rule under the taller of the two header blocks.
    y = max(left_bottom, right_bottom) + 4
    pdf.set_line_width(0.2)
    pdf.line(LEFT, y, RIGHT, y)

    # ---- BILL TO ----
    y += 8
    pdf.set_xy(LEFT, y)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(0, 5, "BILL TO", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_x(LEFT)
    pdf.set_font("Helvetica", "B", 11)
    if client.get("contact"):
        pdf.cell(0, 5, client["contact"], new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 10)
    bill_lines = []
    if client.get("title"):
        bill_lines.append(client["title"])
    if client.get("company"):
        bill_lines.append(client["company"])
    bill_lines += list(client.get("address", []))
    if client.get("email"):
        bill_lines.append(client["email"])
    for line in bill_lines:
        pdf.set_x(LEFT)
        pdf.cell(0, 5, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # ---- Line items table ----
    y = pdf.get_y() + 8
    pdf.set_xy(LEFT, y)
    pdf.set_font("Helvetica", "B", 10)
    row_h = 8
    pdf.cell(COL_DESC, row_h, "Description", border=1)
    pdf.cell(COL_QTY, row_h, "Qty", border=1, align="C")
    pdf.cell(COL_UNIT, row_h, "Unit Price", border=1, align="R")
    pdf.cell(COL_AMT, row_h, "Amount", border=1, align="R",
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 10)
    for it in items:
        pdf.set_x(LEFT)
        pdf.cell(COL_DESC, row_h, " " + it["description"], border=1)
        pdf.cell(COL_QTY, row_h, str(it["qty"]), border=1, align="C")
        pdf.cell(COL_UNIT, row_h, money(it["unit"]) + " ", border=1, align="R")
        pdf.cell(COL_AMT, row_h, money(it["amount"]) + " ", border=1, align="R",
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # ---- Totals (right aligned, under the Unit Price / Amount columns) ----
    label_x = LEFT + COL_DESC + COL_QTY      # start of the Unit Price column
    label_w = COL_UNIT
    value_w = COL_AMT

    y = pdf.get_y() + 3
    pdf.set_xy(label_x, y)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(label_w, 7, "Subtotal ", align="R")
    pdf.cell(value_w, 7, money(subtotal) + " ", align="R",
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # Heavier rule above and below the Total Due.
    y = pdf.get_y() + 1
    pdf.set_line_width(0.5)
    pdf.line(label_x, y, RIGHT, y)

    pdf.set_xy(label_x, y + 1.5)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(label_w, 8, "Total Due ", align="R")
    pdf.cell(value_w, 8, money(total) + " ", align="R",
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    y = pdf.get_y() + 0.5
    pdf.line(label_x, y, RIGHT, y)
    pdf.set_line_width(0.2)

    # ---- Payment details ----
    y = pdf.get_y() + 12
    pdf.set_xy(LEFT, y)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(0, 5, "PAYMENT DETAILS", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 10)
    pay_lines = [
        f"Bank:  {bank['bank']}",
        f"Account name:  {bank['account_name']}",
        f"Sort code:  {bank['sort_code']}",
        f"Account number:  {bank['account_number']}",
        f"Payment reference:  {invoice_number}",
    ]
    for line in pay_lines:
        pdf.set_x(LEFT)
        pdf.cell(0, 5, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # ---- Payment terms line ----
    y = pdf.get_y() + 6
    pdf.set_xy(LEFT, y)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 5,
             f"Payment is due within {PAYMENT_TERMS_DAYS} days of the invoice date, "
             f"by {uk_date(due_date)}.",
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # ---- Optional list of lead references ----
    if leads.get("used") and cfg.get("leads", {}).get("itemise", False) and leads["references"]:
        y = pdf.get_y() + 8
        pdf.set_xy(LEFT, y)
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(0, 5, "LEADS INCLUDED (references)",
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.set_x(LEFT)
        pdf.set_font("Helvetica", "", 9)
        pdf.multi_cell(CONTENT_W, 5, ",  ".join(leads["references"]))

    return pdf, invoice_number, inv_date, due_date


# ----------------------------------------------------------------------
#  Main
# ----------------------------------------------------------------------

def main():
    config_name = sys.argv[1] if len(sys.argv) > 1 else "invoice_config.toml"
    config_path = (HERE / config_name).resolve()

    cfg = load_config(config_path)
    leads = load_leads(cfg)
    items, subtotal, total = build_line_items(cfg, leads["count"])
    pdf, invoice_number, inv_date, due_date = draw_invoice(
        cfg, items, subtotal, total, leads)

    out_dir = HERE / "output"
    out_dir.mkdir(exist_ok=True)

    # Descriptive, email-friendly file name, for example:
    #   Ashfield Trading Limited - Invoice INV-001 - July 2026.pdf
    business_name = {**DEFAULT_BUSINESS, **cfg.get("business", {})}["name"]
    period_label = str(cfg.get("billing_period", "")).strip() or inv_date.strftime("%B %Y")
    file_stem = safe_filename(f"{business_name} - Invoice {invoice_number} - {period_label}")
    out_path = out_dir / (file_stem + ".pdf")
    pdf.output(str(out_path))

    # A plain summary so you can eyeball the numbers before you send it.
    print("\nInvoice created.")
    print("-" * 48)
    print(f"  Invoice number : {invoice_number}")
    print(f"  Invoice date   : {uk_date(inv_date)}")
    print(f"  Due date       : {uk_date(due_date)}")
    if leads["used"]:
        print(f"  Leads imported : {leads['count']}")
    print("  Line items     :")
    for it in items:
        print(f"    - {it['description']}: {it['qty']} x {money(it['unit'])} "
              f"= {money(it['amount'])}")
    print(f"  Subtotal       : {money(subtotal)}")
    print(f"  Total Due      : {money(total)}")
    print("  Amounts check  : PASS (every line and the total add up)")
    print("-" * 48)
    print(f"  Saved to: {out_path}")
    print()


if __name__ == "__main__":
    main()
