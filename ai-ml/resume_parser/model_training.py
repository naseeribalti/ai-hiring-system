from __future__ import annotations

from dataclasses import dataclass
from typing import List, Tuple

import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import f1_score

from config import NLPConfig, TrainingConfig, DatasetConfig


def _parse_labels(labels_str: str) -> List[str]:
    if not labels_str:
        return []
    return [label.strip().lower() for label in str(labels_str).split(",") if label.strip()]


@dataclass
class TFIDFTrainingResult:
    vectorizer_path: str
    classifier_path: str
    micro_f1: float
    macro_f1: float


def train_tfidf_multilabel_classifier(
    csv_path: str | None = None,
) -> TFIDFTrainingResult:
    dataset_path = csv_path or str(DatasetConfig.SKILLS_DATASET_CSV)
    df = pd.read_csv(dataset_path)
    if "text" not in df.columns or "labels" not in df.columns:
        raise ValueError("Dataset must contain 'text' and 'labels' columns")

    texts = df["text"].astype(str).tolist()
    labels = [ _parse_labels(x) for x in df["labels"].tolist() ]

    mlb = MultiLabelBinarizer()
    Y = mlb.fit_transform(labels)

    X_train, X_test, y_train, y_test = train_test_split(
        texts, Y, test_size=TrainingConfig.TEST_SIZE, random_state=TrainingConfig.RANDOM_STATE
    )

    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        max_features=100_000,
        min_df=2,
    )
    classifier = OneVsRestClassifier(
        LogisticRegression(max_iter=TrainingConfig.LOGREG_MAX_ITER, solver="saga", n_jobs=-1)
    )

    # Build pipeline for convenience
    pipe = Pipeline([
        ("tfidf", vectorizer),
        ("clf", classifier),
    ])

    pipe.fit(X_train, y_train)

    y_pred = pipe.predict(X_test)
    micro = f1_score(y_test, y_pred, average="micro")
    macro = f1_score(y_test, y_pred, average="macro")

    # Persist vectorizer and classifier separately for runtime usage with semantic matcher
    joblib.dump(vectorizer, NLPConfig.TFIDF_VECTORIZER_PATH)
    joblib.dump(classifier, NLPConfig.LOGREG_CLASSIFIER_PATH)

    return TFIDFTrainingResult(
        vectorizer_path=str(NLPConfig.TFIDF_VECTORIZER_PATH),
        classifier_path=str(NLPConfig.LOGREG_CLASSIFIER_PATH),
        micro_f1=float(micro),
        macro_f1=float(macro),
    )


# ---------------- Transformers (PyTorch) fine-tuning ----------------

from typing import Dict

class _MultiLabelDataset:  # type: ignore[no-redef]
    def __init__(self, encodings: Dict[str, np.ndarray], labels: np.ndarray):
        # Lazily import torch to avoid hard dependency when unused
        import torch  # noqa: WPS433
        self._torch = torch
        self.encodings = encodings
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        torch = self._torch
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = torch.tensor(self.labels[idx], dtype=torch.float)
        return item


 


@dataclass
class HFTrainingResult:
    output_dir: str
    micro_f1: float
    macro_f1: float
    num_labels: int


def train_transformer_multilabel_classifier(
    csv_path: str | None = None,
    model_name: str | None = None,
) -> HFTrainingResult:
    # Lazy imports to avoid heavy deps unless needed
    import torch  # noqa: WPS433
    from torch.utils.data import Dataset  # noqa: WPS433
    from transformers import (  # noqa: WPS433
        AutoTokenizer,
        AutoModelForSequenceClassification,
        Trainer,
        TrainingArguments,
    )
    dataset_path = csv_path or str(DatasetConfig.SKILLS_DATASET_CSV)
    df = pd.read_csv(dataset_path)
    if "text" not in df.columns or "labels" not in df.columns:
        raise ValueError("Dataset must contain 'text' and 'labels' columns")

    texts = df["text"].astype(str).tolist()
    labels = [ _parse_labels(x) for x in df["labels"].tolist() ]

    mlb = MultiLabelBinarizer()
    Y = mlb.fit_transform(labels)

    X_train, X_val, y_train, y_val = train_test_split(
        texts, Y, test_size=TrainingConfig.TEST_SIZE, random_state=TrainingConfig.RANDOM_STATE
    )

    model_name = model_name or NLPConfig.HF_CLASSIFIER_MODEL
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    train_encodings = tokenizer(X_train, truncation=True, padding=True, max_length=256)
    val_encodings = tokenizer(X_val, truncation=True, padding=True, max_length=256)

    train_dataset = _MultiLabelDataset(train_encodings, y_train)
    val_dataset = _MultiLabelDataset(val_encodings, y_val)

    model = AutoModelForSequenceClassification.from_pretrained(
        model_name,
        problem_type="multi_label_classification",
        num_labels=Y.shape[1],
    )

    training_args = TrainingArguments(
        output_dir=str(NLPConfig.TRANSFORMER_OUTPUT_DIR),
        per_device_train_batch_size=TrainingConfig.TRAIN_BATCH_SIZE,
        per_device_eval_batch_size=TrainingConfig.EVAL_BATCH_SIZE,
        num_train_epochs=TrainingConfig.NUM_EPOCHS,
        learning_rate=TrainingConfig.LEARNING_RATE,
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="f1",
        report_to=[],
    )

    def compute_metrics(eval_pred):
        logits, labels = eval_pred
        preds = 1 / (1 + np.exp(-logits)) > 0.5
        micro = f1_score(labels, preds, average="micro")
        macro = f1_score(labels, preds, average="macro")
        return {"f1": micro, "f1_macro": macro}

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics,
    )

    trainer.train()
    metrics = trainer.evaluate()

    micro = float(metrics.get("eval_f1", 0.0))
    macro = float(metrics.get("eval_f1_macro", 0.0))

    trainer.save_model()

    return HFTrainingResult(
        output_dir=str(NLPConfig.TRANSFORMER_OUTPUT_DIR),
        micro_f1=micro,
        macro_f1=macro,
        num_labels=Y.shape[1],
    )
