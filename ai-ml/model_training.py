"""Lightweight training utilities for the ai-ml pipeline.

Provides TF-IDF + Logistic (One-vs-Rest) multi-label training and artifact
serialization. Designed to be runnable with a small starter CSV dataset.
"""
from __future__ import annotations
from typing import Optional, Tuple
import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score

from config import NLPConfig, MODELS_DIR


def _load_csv(csv_path: str) -> pd.DataFrame:
    return pd.read_csv(csv_path)


def train_tfidf_multilabel_classifier(csv_path: Optional[str] = None) -> dict:
    """Train TF-IDF + Logistic multi-label classifier.

    Expected CSV columns: 'text' and 'labels' where labels is a comma-separated string.
    Saves vectorizer and classifier to paths in `NLPConfig`.
    Returns a small dict with metrics and paths.
    """
    if csv_path is None:
        # Look for default starter dataset
        default = os.path.join(os.path.dirname(
            __file__), 'data', 'skills_dataset.csv')
        csv_path = default

    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Training CSV not found at {csv_path}")

    df = _load_csv(csv_path)
    if 'text' not in df.columns or 'labels' not in df.columns:
        raise ValueError("CSV must contain 'text' and 'labels' columns")

    # Prepare multilabel targets
    df['labels'] = df['labels'].fillna('').astype(str)
    y_labels = df['labels'].apply(lambda s: [t.strip()
                                  for t in s.split(',') if t.strip()])
    mlb = MultiLabelBinarizer()
    Y = mlb.fit_transform(y_labels)

    X_train, X_test, y_train, y_test = train_test_split(
        df['text'], Y, test_size=0.2, random_state=42)

    vectorizer = TfidfVectorizer(max_features=20000, ngram_range=(1, 2))
    clf = OneVsRestClassifier(LogisticRegression(max_iter=1000))

    # Fit vectorizer + classifier
    X_train_vec = vectorizer.fit_transform(X_train)
    clf.fit(X_train_vec, y_train)

    # Evaluate
    X_test_vec = vectorizer.transform(X_test)
    y_pred = clf.predict(X_test_vec)
    f1 = f1_score(y_test, y_pred, average='micro') if y_test.size > 0 else 0.0

    # Persist artifacts
    joblib.dump(vectorizer, NLPConfig.TFIDF_VECTORIZER_PATH)
    joblib.dump(clf, NLPConfig.LOGREG_CLASSIFIER_PATH)
    joblib.dump(mlb, MODELS_DIR / 'mlb.joblib')

    return {
        'tfidf_path': str(NLPConfig.TFIDF_VECTORIZER_PATH),
        'classifier_path': str(NLPConfig.LOGREG_CLASSIFIER_PATH),
        'mlb_path': str(MODELS_DIR / 'mlb.joblib'),
        'f1_micro': float(f1)
    }
