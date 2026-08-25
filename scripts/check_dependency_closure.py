#!/usr/bin/env python3
"""Fail if any site imports a package it does not declare.

Why this exists (2026-08-16): the estate became silently undeployable for nine
days. Sites imported `resend`, `geist`, `botid` and `web-vitals` without
declaring them, and npm workspace hoisting resolved them anyway from a SIBLING
site's package.json, because a deploy used to upload the whole monorepo. When
`.vercelignore` became an allowlist (correctly narrowing each upload to the site
being built plus /packages), the accident stopped working and every site except
Property failed with "Module not found". Nothing had deployed since, so nobody
knew until someone tried.

A Vercel build installs `npm ci --workspace=<site>/web --include-workspace-root`,
so an import only resolves if the package is declared by that site, by
packages/web-shared (a workspace dependency of every site), or by the repo root.
This asserts exactly that, statically, in seconds - no build required.

Usage:  python scripts/check_dependency_closure.py [--verbose]
Exit 0 = every site's imports resolve; 1 = at least one would fail on Vercel.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]

IMPORT_RE = re.compile(r"""(?:from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]""")

# Comments are stripped first: a line like `// only from 'new', never regress`
# otherwise reads as an import of a package called "new". Block comments go
# wholesale; line comments only when the `//` is not part of a URL (`https://`).
BLOCK_COMMENT_RE = re.compile(r"/\*.*?\*/", re.S)
LINE_COMMENT_RE = re.compile(r"(?<![:'\"])//[^\n]*")

# Node builtins are always resolvable.
BUILTIN = {
    "fs", "path", "crypto", "os", "util", "stream", "url", "http", "https", "zlib",
    "buffer", "events", "child_process", "dns", "net", "tls", "timers", "assert",
    "querystring", "readline", "worker_threads", "perf_hooks",
}
# Framework and test packages every site carries; not worth re-asserting per site.
ALWAYS = {"next", "react", "react-dom", "vitest"}

# A bare specifier must look like a real package name. The import regex also
# matches prose inside template literals ("optimising the dental tax position"),
# which is why this filter exists rather than a smarter parser.
PKG_NAME_RE = re.compile(r"[@a-z0-9._/-]+$")


def package_of(spec: str) -> str | None:
    """Bare package name for an import specifier, or None if it is not one."""
    if spec.startswith((".", "@/", "node:")) or spec.startswith("@accounting-network"):
        return None
    name = "/".join(spec.split("/")[:2]) if spec.startswith("@") else spec.split("/")[0]
    if name in BUILTIN or name in ALWAYS or not PKG_NAME_RE.fullmatch(name):
        return None
    return name


def imports_in(tree: pathlib.Path) -> dict[str, str]:
    """{package: first file that imports it} for everything a build would bundle."""
    found: dict[str, str] = {}
    if not tree.exists():
        return found
    for f in sorted(tree.rglob("*")):
        if f.suffix not in (".ts", ".tsx") or "node_modules" in f.parts:
            continue
        if "tests" in f.parts or f.name.endswith((".test.ts", ".test.tsx")):
            continue  # not bundled by `next build`
        src = f.read_text(encoding="utf-8", errors="ignore")
        src = LINE_COMMENT_RE.sub("", BLOCK_COMMENT_RE.sub("", src))
        for m in IMPORT_RE.finditer(src):
            name = package_of(m.group(1))
            if name and name not in found:
                found[name] = str(f.relative_to(ROOT))
    return found


def declared_in(pkg_json: pathlib.Path) -> set[str]:
    if not pkg_json.exists():
        return set()
    d = json.loads(pkg_json.read_text(encoding="utf-8"))
    return set(d.get("dependencies", {})) | set(d.get("devDependencies", {})) | set(d.get("peerDependencies", {}))


def main() -> int:
    verbose = "--verbose" in sys.argv
    shared_dir = ROOT / "packages" / "web-shared"
    shared_imports = imports_in(shared_dir)
    shared_declared = declared_in(shared_dir / "package.json")
    root_declared = declared_in(ROOT / "package.json")

    sites = sorted(p.parent.parent.name for p in ROOT.glob("*/web/package.json"))
    failures = 0
    for site in sites:
        site_dir = ROOT / site / "web"
        declared = declared_in(site_dir / "package.json") | root_declared
        problems: list[str] = []
        for name, where in imports_in(site_dir / "src").items():
            if name not in declared:
                problems.append(f"{name}  (imported by {where})")
        # web-shared is a workspace dep of every site, so its imports must resolve too
        for name, where in shared_imports.items():
            if name not in shared_declared and name not in declared:
                problems.append(f"{name}  (imported by {where}, via web-shared)")
        if problems:
            failures += 1
            print(f"FAIL {site}")
            for p in sorted(problems):
                print(f"       {p}")
        elif verbose:
            print(f"ok   {site}")

    if failures:
        print(
            f"\n{failures} site(s) import packages nothing installs. Declare each one in that "
            "site's package.json, or in packages/web-shared/package.json when web-shared is "
            "the importer, then run `npm install` to update the lockfile."
        )
        return 1
    print(f"dependency closure OK across {len(sites)} sites")
    return 0


def _self_check() -> None:
    """The regex is the whole trick, so assert it on the cases that fooled it."""
    assert package_of("resend") == "resend"
    assert package_of("botid/server") == "botid"
    assert package_of("@supabase/supabase-js") == "@supabase/supabase-js"
    assert package_of("./local") is None
    assert package_of("@/lib/thing") is None
    assert package_of("node:crypto") is None
    assert package_of("@accounting-network/web-shared/analytics") is None
    assert package_of("next/server") is None  # ALWAYS
    assert package_of("optimising the dental tax position") is None  # prose in a template literal
    print("self-check OK")


if __name__ == "__main__":
    if "--self-check" in sys.argv:
        _self_check()
        sys.exit(0)
    sys.exit(main())
