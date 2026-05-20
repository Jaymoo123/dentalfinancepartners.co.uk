#!/usr/bin/env python3
"""
Normalize American spellings to British English in Property site editorial content.
Run from repo root. Only touches Property/web/content/blog/*.md by default.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "Property" / "web" / "content" / "blog"

# Ordered longest-first to avoid partial replacements (e.g. optimization before optimize).
REPLACEMENTS: list[tuple[str, str]] = [
    ("customizations", "customisations"),
    ("customization", "customisation"),
    ("customizing", "customising"),
    ("customized", "customised"),
    ("customize", "customise"),
    ("prioritizations", "prioritisations"),
    ("prioritization", "prioritisation"),
    ("prioritizing", "prioritising"),
    ("prioritized", "prioritised"),
    ("prioritizes", "prioritises"),
    ("prioritize", "prioritise"),
    ("characterizations", "characterisations"),
    ("characterization", "characterisation"),
    ("characterizing", "characterising"),
    ("characterized", "characterised"),
    ("characterizes", "characterises"),
    ("characterize", "characterise"),
    ("summarizations", "summarisations"),
    ("summarization", "summarisation"),
    ("summarizing", "summarising"),
    ("summarized", "summarised"),
    ("summarizes", "summarises"),
    ("summarize", "summarise"),
    ("standardizations", "standardisations"),
    ("standardization", "standardisation"),
    ("standardizing", "standardising"),
    ("standardized", "standardised"),
    ("standardizes", "standardises"),
    ("standardize", "standardise"),
    ("finalizations", "finalisations"),
    ("finalization", "finalisation"),
    ("finalizing", "finalising"),
    ("finalized", "finalised"),
    ("finalizes", "finalises"),
    ("finalize", "finalise"),
    ("capitalizations", "capitalisations"),
    ("capitalization", "capitalisation"),
    ("capitalizing", "capitalising"),
    ("capitalized", "capitalised"),
    ("capitalizes", "capitalises"),
    ("capitalize", "capitalise"),
    ("amortization", "amortisation"),
    ("amortizing", "amortising"),
    ("amortized", "amortised"),
    ("amortizes", "amortises"),
    ("amortize", "amortise"),
    ("optimizations", "optimisations"),
    ("optimization", "optimisation"),
    ("optimizing", "optimising"),
    ("optimized", "optimised"),
    ("optimizes", "optimises"),
    ("optimize", "optimise"),
    ("maximizations", "maximisations"),
    ("maximization", "maximisation"),
    ("maximizing", "maximising"),
    ("maximized", "maximised"),
    ("maximizes", "maximises"),
    ("maximize", "maximise"),
    ("minimizations", "minimisations"),
    ("minimization", "minimisation"),
    ("minimizing", "minimising"),
    ("minimized", "minimised"),
    ("minimizes", "minimises"),
    ("minimize", "minimise"),
    ("specializations", "specialisations"),
    ("specialization", "specialisation"),
    ("specializing", "specialising"),
    ("specialized", "specialised"),
    ("specializes", "specialises"),
    ("specialize", "specialise"),
    ("utilizations", "utilisations"),
    ("utilization", "utilisation"),
    ("utilizing", "utilising"),
    ("utilized", "utilised"),
    ("utilizes", "utilises"),
    ("utilize", "utilise"),
    ("recognizably", "recognisably"),
    ("recognizable", "recognisable"),
    ("unrecognizable", "unrecognisable"),
    ("recognizing", "recognising"),
    ("recognizes", "recognises"),
    ("recognize", "recognise"),
    ("organizations", "organisations"),
    ("organizational", "organisational"),
    ("organization", "organisation"),
    ("organizing", "organising"),
    ("organized", "organised"),
    ("organizes", "organises"),
    ("organize", "organise"),
    ("analyzing", "analysing"),
    ("analyzed", "analysed"),
    ("analyzes", "analyses"),
    ("analyze", "analyse"),
    ("remodeling", "remodelling"),
    ("remodeled", "remodelled"),
    ("modeling", "modelling"),
    ("modeled", "modelled"),
    ("favorites", "favourites"),
    ("favorite", "favourite"),
    ("favorable", "favourable"),
    ("favorably", "favourably"),
    ("favoring", "favouring"),
    ("favored", "favoured"),
    ("favors", "favours"),
    ("favor", "favour"),
    ("defenses", "defences"),
    ("defense", "defence"),
    ("offenses", "offences"),
    ("offense", "offence"),
    ("labeled", "labelled"),
    ("labeling", "labelling"),
    ("travelers", "travellers"),
    ("traveler", "traveller"),
    ("traveling", "travelling"),
    ("traveled", "travelled"),
    ("canceled", "cancelled"),
    ("canceling", "cancelling"),
    ("fulfillment", "fulfilment"),
    ("fulfill", "fulfil"),
    ("town center", "town centre"),
    ("Town center", "Town centre"),
    ("city center", "city centre"),
    ("City center", "City centre"),
    ("shopping center", "shopping centre"),
    ("Shopping center", "Shopping centre"),
    ("gray", "grey"),
    ("Gray", "Grey"),
    ("digitizations", "digitisations"),
    ("digitization", "digitisation"),
    ("digitizing", "digitising"),
    ("digitized", "digitised"),
    ("digitizes", "digitises"),
    ("digitize", "digitise"),
    ("categorizations", "categorisations"),
    ("categorization", "categorisation"),
    ("categorizing", "categorising"),
    ("categorized", "categorised"),
    ("categorizes", "categorises"),
    ("categorize", "categorise"),
    ("scrutinizations", "scrutinisations"),
    ("scrutinization", "scrutinisation"),
    ("scrutinizing", "scrutinising"),
    ("scrutinized", "scrutinised"),
    ("scrutinizes", "scrutinises"),
    ("scrutinize", "scrutinise"),
    ("realizations", "realisations"),
    ("realization", "realisation"),
    ("realizing", "realising"),
    ("realized", "realised"),
    ("realizes", "realises"),
    ("realize", "realise"),
    ("unrealized", "unrealised"),
    ("authorizations", "authorisations"),
    ("authorization", "authorisation"),
    ("authorizing", "authorising"),
    ("authorized", "authorised"),
    ("unauthorized", "unauthorised"),
    ("centralizations", "centralisations"),
    ("centralization", "centralisation"),
    ("centralizing", "centralising"),
    ("centralized", "centralised"),
    ("centralizes", "centralises"),
    ("centralize", "centralise"),
    ("jeopardizes", "jeopardises"),
    ("jeopardizing", "jeopardising"),
    ("jeopardized", "jeopardised"),
    ("jeopardize", "jeopardise"),
]

# Title-case / heading variants (run after core list; longest keys first within this block).
TITLE_AND_HEADING: list[tuple[str, str]] = [
    ("Optimizations", "Optimisations"),
    ("Optimization", "Optimisation"),
    ("Optimizing", "Optimising"),
    ("Optimized", "Optimised"),
    ("Optimizes", "Optimises"),
    ("Optimize", "Optimise"),
    ("Maximizations", "Maximisations"),
    ("Maximization", "Maximisation"),
    ("Maximizing", "Maximising"),
    ("Maximized", "Maximised"),
    ("Maximizes", "Maximises"),
    ("Maximize", "Maximise"),
    ("Minimizations", "Minimisations"),
    ("Minimization", "Minimisation"),
    ("Minimizing", "Minimising"),
    ("Minimized", "Minimised"),
    ("Minimizes", "Minimises"),
    ("Minimize", "Minimise"),
    ("Specializations", "Specialisations"),
    ("Specialization", "Specialisation"),
    ("Specializing", "Specialising"),
    ("Specialized", "Specialised"),
    ("Specializes", "Specialises"),
    ("Specialize", "Specialise"),
    ("Utilizations", "Utilisations"),
    ("Utilization", "Utilisation"),
    ("Utilizing", "Utilising"),
    ("Utilized", "Utilised"),
    ("Utilizes", "Utilises"),
    ("Utilize", "Utilise"),
    ("Recognizing", "Recognising"),
    ("Recognizes", "Recognises"),
    ("Recognize", "Recognise"),
    ("Organizations", "Organisations"),
    ("Organization", "Organisation"),
    ("Organizing", "Organising"),
    ("Organized", "Organised"),
    ("Organizes", "Organises"),
    ("Organize", "Organise"),
    ("Analyzing", "Analysing"),
    ("Analyzed", "Analysed"),
    ("Analyzes", "Analyses"),
    ("Analyze", "Analyse"),
    ("Modeling", "Modelling"),
    ("Modeled", "Modelled"),
    ("Digitizations", "Digitisations"),
    ("Digitization", "Digitisation"),
    ("Digitizing", "Digitising"),
    ("Digitized", "Digitised"),
    ("Digitizes", "Digitises"),
    ("Digitize", "Digitise"),
    ("Categorizations", "Categorisations"),
    ("Categorization", "Categorisation"),
    ("Categorizing", "Categorising"),
    ("Categorized", "Categorised"),
    ("Categorizes", "Categorises"),
    ("Categorize", "Categorise"),
    ("Scrutinizing", "Scrutinising"),
    ("Scrutinized", "Scrutinised"),
    ("Scrutinizes", "Scrutinises"),
    ("Scrutinize", "Scrutinise"),
    ("Realizing", "Realising"),
    ("Realized", "Realised"),
    ("Realizes", "Realises"),
    ("Realize", "Realise"),
    ("Unauthorized", "Unauthorised"),
    ("Authorizations", "Authorisations"),
    ("Authorization", "Authorisation"),
    ("Authorizing", "Authorising"),
    ("Authorized", "Authorised"),
    ("Centralizing", "Centralising"),
    ("Centralized", "Centralised"),
    ("Centralizes", "Centralises"),
    ("Centralize", "Centralise"),
    ("Jeopardizing", "Jeopardising"),
    ("Jeopardized", "Jeopardised"),
    ("Jeopardizes", "Jeopardises"),
    ("Jeopardize", "Jeopardise"),
]

# Standalone word boundaries for -ize words not covered above (conservative).
_EXTRA_IZE = [
    ("emphasize", "emphasise"),
    ("emphasized", "emphasised"),
    ("emphasizes", "emphasises"),
    ("emphasizing", "emphasising"),
    ("generalize", "generalise"),
    ("generalized", "generalised"),
    ("generalizes", "generalises"),
    ("generalizing", "generalising"),
    ("personalize", "personalise"),
    ("personalized", "personalised"),
    ("visualize", "visualise"),
    ("visualized", "visualised"),
]


def patch_licence(text: str) -> str:
    """UK: noun licence/licences; verb license/licenses/licensed/licensing unchanged."""
    text = re.sub(r"\blicenses\b", "licences", text)
    text = re.sub(r"\bLicense\b", "Licence", text)
    text = re.sub(r"\blicense\b", "licence", text)
    return text


def normalise_file(path: Path) -> bool:
    raw = path.read_text(encoding="utf-8")
    out = raw
    for a, b in REPLACEMENTS:
        out = out.replace(a, b)
    for a, b in _EXTRA_IZE:
        out = out.replace(a, b)
    for a, b in TITLE_AND_HEADING:
        out = out.replace(a, b)
    out = patch_licence(out)
    if out != raw:
        path.write_text(out, encoding="utf-8", newline="\n")
        return True
    return False


def main() -> int:
    if not BLOG_DIR.is_dir():
        print(f"Missing blog dir: {BLOG_DIR}", file=sys.stderr)
        return 1
    changed = 0
    for md in sorted(BLOG_DIR.glob("*.md")):
        if normalise_file(md):
            changed += 1
    print(f"Updated {changed} markdown files under {BLOG_DIR.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
