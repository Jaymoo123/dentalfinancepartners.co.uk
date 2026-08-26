"""Check that lane_map picks each site's OWN blog dir, and refuses to guess.

Regression guard for the property hardcode that used to sit in _blog_dir():
before this, running lane_map against any non-property site whose config was
missing paths.blogContentDir silently counted Property's 400+ posts as that
site's coverage, and every "hole we plug" finding came out wrong.

Run:  python -m optimisation_engine.discovery.test_lane_map_blog_dir
"""
from __future__ import annotations

import json

from optimisation_engine.discovery.lane_map import ROOT, _blog_dir, assign_lane


def test_every_site_resolves_to_its_own_dir() -> None:
    seen: dict[str, str] = {}
    for cfg_path in sorted((ROOT / "sites").glob("*.json")):
        if ".discovery." in cfg_path.name:
            continue
        site_key = cfg_path.stem
        rel = json.loads(cfg_path.read_text(encoding="utf-8")).get("paths", {}).get("blogContentDir")
        if not rel:
            continue  # variant configs (e.g. property.megawave-affinity) carry no paths
        got = _blog_dir(site_key)
        assert got == ROOT / rel, f"{site_key}: got {got}, expected {ROOT / rel}"
        assert str(got) not in seen or site_key == seen[str(got)], (
            f"{site_key} resolves to the same dir as {seen[str(got)]}"
        )
        seen[str(got)] = site_key
    assert "medical" in seen.values() and "property" in seen.values()
    print(f"ok: {len(seen)} sites, each resolving to its own blog dir")


def test_missing_path_refuses_to_guess() -> None:
    try:
        _blog_dir("no-such-site-xyz")
    except ValueError as exc:
        assert "blogContentDir" in str(exc)
        print("ok: unknown site raises instead of falling back to Property")
    else:
        raise AssertionError("_blog_dir silently guessed a dir for an unknown site")


def test_medical_lane_taxonomy_sane() -> None:
    """The medical lanes must classify medical's own slugs, and must not annex
    the sibling dentists/pharmacies/care sites' ground."""
    cfg = json.loads((ROOT / "sites" / "medical.discovery.json").read_text(encoding="utf-8"))
    lanes, negs = cfg["lanes"], cfg["lane_negative_tokens"]
    slugs = [p.stem for p in _blog_dir("medical").glob("*.md")]
    assigned = [s for s in slugs if assign_lane(s, lanes, negs)]
    assert len(slugs) > 50, f"only {len(slugs)} medical slugs found"
    assert len(assigned) / len(slugs) >= 0.95, f"only {len(assigned)}/{len(slugs)} slugs got a lane"
    for sibling in ("dental-practice-accounts", "pharmacy-nhs-contract-tax", "care-home-cqc-fees"):
        assert assign_lane(sibling, lanes, negs) is None, f"medical annexed sibling slug {sibling}"
    print(f"ok: {len(assigned)}/{len(slugs)} medical slugs lane-assigned, siblings vetoed")


if __name__ == "__main__":
    test_every_site_resolves_to_its_own_dir()
    test_missing_path_refuses_to_guess()
    test_medical_lane_taxonomy_sane()
