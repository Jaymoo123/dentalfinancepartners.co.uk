"""Fast pre-build validator for generated expansion .md pages.

Checks the STANDARD_MANIFEST required keys + estate content rules WITHOUT a full
Next build. Run after each writer batch; do the real `npm run build` once per site.

Usage: python validate_md.py <file.md> [<file.md> ...]
"""
import re
import sys
from pathlib import Path

import yaml

REQUIRED = ["slug", "title", "date", "category", "metaDescription"]
EMDASH = ["—", "–"]  # — –


def split_fm(text):
    if not text.startswith("---"):
        return None, text
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.DOTALL)
    if not m:
        return None, text
    return m.group(1), m.group(2)


def check(path):
    errs, warns = [], []
    text = Path(path).read_text(encoding="utf-8")
    fm_raw, body = split_fm(text)
    if fm_raw is None:
        return [f"no YAML frontmatter"], []
    try:
        fm = yaml.safe_load(fm_raw)
    except Exception as e:
        return [f"YAML parse error: {e}"], []
    if not isinstance(fm, dict):
        return ["frontmatter is not a mapping"], []

    for k in REQUIRED:
        if not str(fm.get(k, "")).strip():
            errs.append(f"missing/empty required key: {k}")
    d = str(fm.get("date", ""))
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", d):
        errs.append(f"date not YYYY-MM-DD: {d!r}")

    faqs = fm.get("faqs") or []
    if not isinstance(faqs, list) or not (5 <= len(faqs) <= 14):
        warns.append(f"faqs count {len(faqs) if isinstance(faqs, list) else 'n/a'} (want 10-14)")
    else:
        for i, q in enumerate(faqs):
            if not isinstance(q, dict) or not str(q.get("question", "")).strip() or not str(q.get("answer", "")).strip():
                errs.append(f"faq[{i}] missing question/answer")
            elif re.search(r"\[\d+\]", str(q.get("answer", ""))):
                errs.append(f"faq[{i}] answer has [n] citation marker")

    # em-dash anywhere
    for ch in EMDASH:
        if ch in text:
            errs.append(f"em/en-dash present ({ch!r})")
            break
    # body is HTML not markdown
    if not body.strip():
        errs.append("empty body")
    else:
        if not re.search(r"<(p|h2|h3|ul|table|aside)\b", body):
            errs.append("body has no HTML block tags (markdown not HTML?)")
        if re.search(r"^#{1,4}\s", body, re.MULTILINE):
            errs.append("markdown headings (#) in body")
        if re.search(r"class=\"[^\"]*\b(text-|bg-|flex|grid|p-\d|mt-\d)", body):
            warns.append("possible Tailwind classes in body")
    # meta length
    mt = str(fm.get("metaTitle", ""))
    md = str(fm.get("metaDescription", ""))
    if len(mt) > 60:
        warns.append(f"metaTitle {len(mt)} chars (>60)")
    if len(md) > 160:
        errs.append(f"metaDescription {len(md)} chars (>160)")
    # schema should be empty string (auto-emitted)
    if str(fm.get("schema", "")).strip():
        warns.append("schema is non-empty (template auto-emits; usually leave '')")
    wc = len(re.findall(r"\w+", body))
    return errs, warns + [f"~{wc} words"]


def main():
    bad = 0
    for f in sys.argv[1:]:
        errs, warns = check(f)
        name = Path(f).name
        if errs:
            bad += 1
            print(f"FAIL {name}")
            for e in errs:
                print(f"   ERROR: {e}")
        else:
            print(f"OK   {name}")
        for w in warns:
            print(f"   note: {w}")
    print(f"\n{bad} file(s) with errors of {len(sys.argv) - 1}.")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
