from __future__ import annotations

from typing import Optional, Dict, Any

import re

try:
    import spacy
except Exception:  # pragma: no cover
    spacy = None

from config import NLPConfig


_name_like_regex = re.compile(r"\b([A-Z][a-z]+\s+[A-Z][a-z]+)\b")


def _load_spacy_model() -> Optional["spacy.Language"]:
    if spacy is None:
        return None
    try:
        return spacy.load(NLPConfig.SPACY_MODEL_NAME)
    except Exception:
        return None


_nlp = _load_spacy_model()


def extract_entities(text: str) -> Dict[str, Any]:
    text = text or ""
    if not text:
        return {"persons": [], "orgs": [], "locations": []}

    if _nlp is None:
        # Fallback heuristics
        names = []
        match = _name_like_regex.search(text)
        if match:
            names.append(match.group(1))
        return {"persons": names, "orgs": [], "locations": []}

    doc = _nlp(text)
    persons = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    orgs = [ent.text for ent in doc.ents if ent.label_ in {"ORG", "WORK_OF_ART"}]
    locs = [ent.text for ent in doc.ents if ent.label_ in {"GPE", "LOC"}]
    return {"persons": persons, "orgs": orgs, "locations": locs}

