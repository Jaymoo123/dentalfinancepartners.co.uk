import subprocess, re, pathlib

ROOT = pathlib.Path("C:/Users/user/Documents/Accounting")
HOST = "https://www.propertytaxpartners.co.uk"


def slugify_category(c: str) -> str:
    # Mirror Property's route slugifyCategory: lowercase, & -> and, spaces -> -,
    # strip non-alphanumeric/hyphen, collapse repeats, trim.
    c = c.lower().replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"[^a-z0-9-]", "", c)
    c = re.sub(r"-{2,}", "-", c)
    return c.strip("-")


out = subprocess.run(
    ["git", "diff", "--name-only", "e49a4d73", "HEAD", "--", "Property/web/content/blog/"],
    cwd=str(ROOT), capture_output=True, text=True, check=True,
).stdout
files = [l.strip() for l in out.splitlines() if l.strip().endswith(".md")]

urls = []
skipped = []
for rel in files:
    p = ROOT / rel
    if not p.exists():
        skipped.append((rel, "deleted"))
        continue
    txt = p.read_text(encoding="utf-8")
    fm = txt.split("---", 2)
    if len(fm) < 3:
        skipped.append((rel, "no-frontmatter"))
        continue
    head = fm[1]
    sm = re.search(r'(?m)^slug:\s*["\']?([^"\'\n]+?)["\']?\s*$', head)
    cm = re.search(r'(?m)^category:\s*["\']?([^"\'\n]+?)["\']?\s*$', head)
    if not sm or not cm:
        skipped.append((rel, "no-slug-or-cat"))
        continue
    slug = sm.group(1).strip()
    cat = slugify_category(cm.group(1).strip())
    urls.append(f"{HOST}/blog/{cat}/{slug}")

urls = list(dict.fromkeys(urls))
outfile = ROOT / ".cache" / "rewritten_urls.txt"
outfile.write_text("\n".join(urls) + "\n", encoding="utf-8")
print(f"Wrote {len(urls)} URLs to {outfile}  (skipped {len(skipped)})")
for u in urls[:6]:
    print("  ", u)
for rel, why in skipped:
    print(f"  SKIP [{why}] {rel}")
