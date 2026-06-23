#!/usr/bin/env python
"""Render a Markdown file to a clean, black-text A4 PDF using reportlab.

Produces NO page header or footer at all (no date/time, no file path).
Handles: # / ## headings, paragraphs with **bold** / *italic*, "- " bullet
lists, and simple | pipe | tables.

Usage: python build_pdf.py input.md [output.pdf]
"""
import re
import sys
import pathlib

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, ListFlowable, HRFlowable)

BLACK = colors.black
GREY = colors.Color(0.6, 0.6, 0.6)
LGREY = colors.Color(0.94, 0.94, 0.94)
SEP = re.compile(r"^:?-{2,}:?$")

STYLES = {
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=18, leading=22,
                            alignment=TA_CENTER, textColor=BLACK, spaceAfter=4),
    "intro": ParagraphStyle("intro", fontName="Helvetica-Oblique", fontSize=9.5, leading=13,
                            textColor=BLACK, spaceAfter=8),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=15,
                         textColor=BLACK, spaceBefore=12, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.3, leading=14,
                           textColor=BLACK, spaceAfter=6),
    "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=9.8, leading=12.5, textColor=BLACK),
}


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(t):
    t = esc(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"\*(.+?)\*", r"<i>\1</i>", t)
    return t


def split_row(line):
    cells = line.strip().split("|")
    if cells and cells[0] == "":
        cells = cells[1:]
    if cells and cells[-1] == "":
        cells = cells[:-1]
    return [c.strip() for c in cells]


def is_sep(line):
    cs = split_row(line)
    return bool(cs) and all(SEP.match(c or "-") for c in cs)


def main():
    src = pathlib.Path(sys.argv[1])
    out = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else src.with_suffix(".pdf")
    lines = src.read_text(encoding="utf-8").splitlines()
    usable = A4[0] - 36 * mm
    story = []
    bullets = []

    def flush_bullets():
        if bullets:
            story.append(ListFlowable(
                [Paragraph(inline(b), STYLES["body"]) for b in bullets],
                bulletType="bullet", leftIndent=16, bulletColor=BLACK))
            bullets.clear()

    def flush_table(block):
        rows = [split_row(l) for l in block if not is_sep(l)]
        rows = [r for r in rows if any(c.strip() for c in r)]
        if not rows:
            return
        ncol = max(len(r) for r in rows)
        data = [[Paragraph(inline(r[j]) if j < len(r) else "", STYLES["cell"]) for j in range(ncol)]
                for r in rows]
        cw = [0.30 * usable, 0.70 * usable] if ncol == 2 else [usable / ncol] * ncol
        t = Table(data, colWidths=cw)
        ts = [("GRID", (0, 0), (-1, -1), 0.5, GREY), ("VALIGN", (0, 0), (-1, -1), "TOP"),
              ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
              ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]
        if ncol == 2:
            ts.append(("BACKGROUND", (0, 0), (0, -1), LGREY))
        t.setStyle(TableStyle(ts))
        story.extend([Spacer(1, 4), t, Spacer(1, 6)])

    i = 0
    while i < len(lines):
        raw = lines[i]
        if raw.lstrip().startswith("|") and "|" in raw.lstrip()[1:]:
            blk = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                blk.append(lines[i])
                i += 1
            flush_bullets()
            flush_table(blk)
            continue
        s = raw.strip()
        if not s:
            flush_bullets()
            i += 1
            continue
        if s.startswith("# "):
            flush_bullets()
            story.append(Paragraph(inline(s[2:].strip()), STYLES["title"]))
            story.append(HRFlowable(width="100%", thickness=1.2, color=BLACK, spaceBefore=4, spaceAfter=8))
        elif s.startswith("## "):
            flush_bullets()
            story.append(Paragraph(inline(s[3:].strip()), STYLES["h2"]))
            story.append(HRFlowable(width="100%", thickness=0.5, color=GREY, spaceBefore=1, spaceAfter=6))
        elif s.startswith("- "):
            bullets.append(s[2:].strip())
        elif s.startswith("*") and s.endswith("*") and not s.startswith("**"):
            flush_bullets()
            story.append(Paragraph(inline(s), STYLES["intro"]))
        else:
            flush_bullets()
            story.append(Paragraph(inline(s), STYLES["body"]))
        i += 1
    flush_bullets()

    doc = SimpleDocTemplate(str(out), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=16 * mm, bottomMargin=16 * mm, title="", author="")
    doc.build(story)
    print("PDF:", out, "| exists:", out.exists(), "| bytes:", out.stat().st_size if out.exists() else 0)


if __name__ == "__main__":
    main()
