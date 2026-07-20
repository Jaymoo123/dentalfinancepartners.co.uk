"""Niche config registry -- auto-discovered via pkgutil.

Pattern lifted from optimisation_engine.blog_generator.site_configs.__init__.
Each niches/<niche>.py exports a NICHE_CONFIG (NicheConfig instance).
"""
from __future__ import annotations

import importlib
import pkgutil

from ..config import NicheConfig

NICHE_CONFIGS: dict[str, NicheConfig] = {}

for _info in pkgutil.iter_modules(__path__):
    _mod_name = _info.name
    if _mod_name.startswith("_"):
        continue
    _mod = importlib.import_module(f"{__name__}.{_mod_name}")
    _cfg = getattr(_mod, "NICHE_CONFIG", None)
    if not isinstance(_cfg, NicheConfig):
        continue
    NICHE_CONFIGS[_cfg.site_key] = _cfg
