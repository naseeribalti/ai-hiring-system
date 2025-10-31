"""Embedding service: lazy-load SentenceTransformer and provide a single helper.

This module intentionally performs lazy imports so the ai-ml package can be used
with a minimal footprint when embeddings are not required.
"""
from __future__ import annotations
import numpy as np
from typing import Optional
from functools import lru_cache

from config import NLPConfig


@lru_cache(maxsize=1)
def _load_embedder():
    try:
        from sentence_transformers import SentenceTransformer
    except Exception as e:
        raise RuntimeError(
            "sentence-transformers is not installed or failed to import. "
            "Install the optional requirements to enable embeddings.") from e

    model = SentenceTransformer(
        NLPConfig.HF_EMBEDDING_MODEL, device=NLPConfig.EMBEDDING_DEVICE)
    return model


def get_text_embedding(text: str) -> np.ndarray:
    """Return a 1D numpy array embedding for the provided text.

    Raises RuntimeError if sentence-transformers/torch is not available.
    """
    model = _load_embedder()
    emb = model.encode(text, show_progress_bar=False)
    return np.array(emb, dtype=np.float32)
