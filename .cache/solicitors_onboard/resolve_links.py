"""Run the shared slug_resolver.fix_files against the SOLICITORS corpus.

The engine's CLI hardcodes Property paths in _DEFAULT_BLOG/_DEFAULT_MW; its
fix_files() function takes blog_dir/middleware_path kwargs, so we call it
directly pointed at the solicitors corpus. Reuses the engine logic unchanged
(no edit to the shared script). Apply mode controlled by argv[1]=='apply'.
"""
import sys
import pathlib

ROOT = pathlib.Path(r"C:\Users\user\Documents\Accounting")
sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator.slug_resolver import fix_files

BLOG = ROOT / "Solicitors" / "web" / "content" / "blog"
MW = ROOT / "Solicitors" / "web" / "src" / "middleware.ts"

apply = len(sys.argv) > 2 and sys.argv[1] == "apply"
files = sys.argv[2:] if apply else sys.argv[1:]
if files and files[0] == "apply":
    files = files[1:]
files = [a for a in files if a.endswith(".md")]
if not files:
    files = [str(p) for p in sorted(BLOG.glob("*.md"))]

changed, unresolved = fix_files(files, blog_dir=BLOG, middleware_path=MW, apply=apply)
verb = "canonicalised" if apply else "would canonicalise"
print(f"slug_resolver (SOLICITORS corpus): {verb} {changed}/{len(files)} file(s); "
      f"{len(unresolved)} unresolved (invented) link(s)")
for stem, href in unresolved:
    print(f"  UNRESOLVED: [{stem}] {href}")
