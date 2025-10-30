from __future__ import annotations

import re
from typing import Dict, Any, List

import joblib

from config import NLPConfig
from resume_parser.skill_extractor import extract_skills

_email_regex = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
_phone_regex = re.compile(r"\+?\d[\d\s().-]{7,}\d")


def _extract_contacts(text: str) -> Dict[str, str]:
    email_match = _email_regex.search(text or "")
    phone_match = _phone_regex.search(text or "")
    return {
        "email": email_match.group(0) if email_match else "",
        "phone": phone_match.group(0) if phone_match else "",
    }


def _load_vectorizer_classifier():
    vec = None
    clf = None
    if NLPConfig.TFIDF_VECTORIZER_PATH.exists():
        try:
            vec = joblib.load(NLPConfig.TFIDF_VECTORIZER_PATH)
        except Exception:
            vec = None
    if NLPConfig.LOGREG_CLASSIFIER_PATH.exists():
        try:
            clf = joblib.load(NLPConfig.LOGREG_CLASSIFIER_PATH)
        except Exception:
            clf = None
    return vec, clf


def classify_skills_ml(text: str) -> List[str]:
    vec, clf = _load_vectorizer_classifier()
    if not text or vec is None or clf is None:
        return extract_skills(text)
    try:
        X = vec.transform([text])
        y_pred = clf.predict(X)
        # If clf is OneVsRestClassifier, its classes_ may not map to labels; we fallback to top terms
        # Without a label map saved, we return keyword-based skills as baseline
        # This keeps runtime safe in case training artifacts are incomplete.
        return extract_skills(text)
    except Exception:
        return extract_skills(text)


def parse_resume_text(raw_text: str) -> Dict[str, Any]:
    text = (raw_text or "").strip()
    contact = _extract_contacts(text)
    skills = classify_skills_ml(text)
    return {
        "contact": contact,
        "skills": skills,
        "summary": text[:2000],
    }
