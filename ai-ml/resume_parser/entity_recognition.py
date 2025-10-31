"""Entity extraction for resume text with spaCy fallback to regex.
"""
from __future__ import annotations
from typing import Dict, Any, List
import re

try:
    import spacy
    _SPACY_AVAILABLE = True
except Exception:
    _SPACY_AVAILABLE = False


EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_RE = re.compile(r"\+?[0-9][0-9().\-\s]{6,}[0-9]")


def extract_entities(text: str) -> Dict[str, Any]:
    entities: Dict[str, Any] = {
        'emails': [], 'phones': [], 'names': [], 'orgs': [], 'skills': []}

    if not text:
        return entities

    # Regex-based extraction for email & phone
    entities['emails'] = list(set(EMAIL_RE.findall(text)))
    entities['phones'] = list(set(PHONE_RE.findall(text)))

    if _SPACY_AVAILABLE:
        try:
            nlp = spacy.load('en_core_web_sm')
            doc = nlp(text)
            names = [ent.text for ent in doc.ents if ent.label_ in ('PERSON',)]
            orgs = [
                ent.text for ent in doc.ents if ent.label_ in ('ORG', 'GPE')]
            entities['names'] = list(set(names))
            entities['orgs'] = list(set(orgs))
        except Exception:
            # If spaCy model not available or failed, fall back to nothing for NER
            pass

    # Skills placeholder: could be replaced by model-based extractor
    # For now, look for common skill tokens in the text (very basic)
    skill_tokens = ['python', 'java', 'sql',
                    'javascript', 'aws', 'docker', 'kubernetes']
    found = set()
    ltext = text.lower()
    for tok in skill_tokens:
        if tok in ltext:
            found.add(tok)
    entities['skills'] = sorted(list(found))

    return entities
