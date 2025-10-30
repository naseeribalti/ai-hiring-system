from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib

from config import NLPConfig
from matching_engine.embedding_service import get_text_embedding


@dataclass
class MatchScore:
    embedding_similarity: float
    tfidf_similarity: float
    combined_score: float


def _load_tfidf_vectorizer() -> Optional[TfidfVectorizer]:
    if NLPConfig.TFIDF_VECTORIZER_PATH.exists():
        try:
            return joblib.load(NLPConfig.TFIDF_VECTORIZER_PATH)
        except Exception:
            return None
    return None


def compute_match_score(
    resume_text: str,
    job_text: str,
    tfidf_weight: float = 0.4,
    embedding_weight: float = 0.6,
) -> MatchScore:
    resume_text = (resume_text or "").strip()
    job_text = (job_text or "").strip()

    # Embedding similarity
    emb_resume = get_text_embedding(resume_text)
    emb_job = get_text_embedding(job_text)
    denom = (np.linalg.norm(emb_resume) * np.linalg.norm(emb_job)) + 1e-12
    emb_sim = float(np.dot(emb_resume, emb_job) / denom)

    # TF-IDF similarity if vectorizer exists
    tfidf_sim = 0.0
    vec = _load_tfidf_vectorizer()
    if vec is not None and resume_text and job_text:
        try:
            r_vec = vec.transform([resume_text])
            j_vec = vec.transform([job_text])
            tfidf_sim = float(cosine_similarity(r_vec, j_vec)[0, 0])
        except Exception:
            tfidf_sim = 0.0

    # Weighted combination
    combined = max(0.0, min(1.0, embedding_weight * emb_sim + tfidf_weight * tfidf_sim))

    return MatchScore(
        embedding_similarity=emb_sim,
        tfidf_similarity=tfidf_sim,
        combined_score=combined,
    )
