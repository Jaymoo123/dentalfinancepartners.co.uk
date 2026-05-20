"""Per-site configuration registry.

Each site_configs/<site>.py exports a SITE_CONFIG dict. This module
auto-discovers them so new sites added by `optimisation_engine.ops.spinup_site`
register without touching this file.

Filename convention: lowercase with underscores (Python-identifier-safe).
The site_key inside the SITE_CONFIG dict can use hyphens (matches URL slug
+ directory name), e.g. `construction_cis.py` exports site_key="construction-cis".

Misconfigurations fail loudly at import time via assert_site_config_consistent.
"""
from __future__ import annotations

import importlib
import pkgutil

from optimisation_engine.blog_generator.routing_safety import assert_site_config_consistent

SITE_CONFIGS: dict[str, dict] = {}

for _info in pkgutil.iter_modules(__path__):
    _mod_name = _info.name
    if _mod_name.startswith("_"):
        continue
    _mod = importlib.import_module(f"{__name__}.{_mod_name}")
    _cfg = getattr(_mod, "SITE_CONFIG", None)
    if _cfg is None:
        continue
    _key = _cfg.get("site_key")
    if not _key:
        continue
    SITE_CONFIGS[_key] = _cfg

# Crossover safety: each registered config must agree with the expected
# site prefix from routing_safety + name unified topic table.
for _site_key, _cfg in SITE_CONFIGS.items():
    assert_site_config_consistent(_cfg, _site_key)
