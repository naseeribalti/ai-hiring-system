from __future__ import annotations
from typing import Dict, Any
import numpy as np
from matching_engine.similarity_calculator import cosine_similarity
from matching_engine.embedding_service import get_text_embedding
from config import NLPConfig
import joblib
import os


def _load_tfidf_vectorizer():
    path = NLPConfig.TFIDF_VECTORIZER_PATH
    if path.exists():
        return joblib.load(path)
    return None


def compute_match_score(resume_text: str, job_text: str, tfidf_weight: float = 0.4, embedding_weight: float = 0.6) -> Dict[str, Any]:
    """Compute a combined match score using TF-IDF cosine and embedding cosine.

    Returns a dict with component scores and combined_score.
    """
    tfidf_vec = _load_tfidf_vectorizer()
    tfidf_score = None
    if tfidf_vec is not None:
        try:
            r_v = tfidf_vec.transform([resume_text])
            j_v = tfidf_vec.transform([job_text])
            # sklearn sparse vector -> dense arrays for cosine
            r_arr = r_v.toarray()[0]
            j_arr = j_v.toarray()[0]
            tfidf_score = cosine_similarity(r_arr, j_arr)
        except Exception:
            tfidf_score = None

    # Embedding score (lazy; may raise if model not installed)
    embedding_score = None
    try:
        r_emb = get_text_embedding(resume_text)
        j_emb = get_text_embedding(job_text)
        embedding_score = cosine_similarity(r_emb, j_emb)
    except Exception:
        embedding_score = None

    # Combine scores with weights where available
    components = {}
    if tfidf_score is not None:
        components['tfidf_score'] = tfidf_score
    if embedding_score is not None:
        components['embedding_score'] = embedding_score

    # Default combined logic
    if tfidf_score is None and embedding_score is None:
        combined = 0.0
    elif tfidf_score is None:
        combined = float(embedding_score)
    elif embedding_score is None:
        combined = float(tfidf_score)
    else:
        combined = float(tfidf_weight * tfidf_score +
                         embedding_weight * embedding_score)

    return {
        'combined_score': combined,
        **components
    }
