"""Strip leaked agent tool-call markup from blog .md files.

Some rewrite/megawave sub-agents malformed their Write tool call and appended
their own closing tags (</content>, </invoke>) to the saved file body. These
tokens are never valid blog content. This removes any line that is exactly one
of those tokens. Mechanical + safe (no judgement). Reports changed files.

Usage: python scripts/strip_leaked_tool_markup.py [--commit]   (dry-run by default)
"""
import sys
import pathlib

BLOG = pathlib.Path("Property/web/content/blog")
LEAKED = {"</content>", "</invoke>", "<content>", "</parameter>"}

commit = "--commit" in sys.argv
changed = []
for f in sorted(BLOG.glob("*.md")):
    lines = f.read_text(encoding="utf-8").splitlines(keepends=True)
    kept = [ln for ln in lines if ln.strip() not in LEAKED]
    if len(kept) != len(lines):
        removed = len(lines) - len(kept)
        changed.append((f.name, removed))
        if commit:
            # preserve trailing newline behaviour: join kept lines as-is
            f.write_text("".join(kept), encoding="utf-8")

print(f"{len(changed)} file(s) with leaked tool markup:")
for name, n in changed:
    print(f"  -{n} line(s): {name}")
print("\n" + ("APPLIED." if commit else "DRY RUN. Re-run with --commit to strip."))
