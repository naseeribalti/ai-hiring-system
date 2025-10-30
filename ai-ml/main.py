from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import socket
from urllib.parse import urlparse

from config import AppConfig
from resume_parser.pdf_processor import (
    extract_text_from_pdf,
    download_file_from_url,
)
from resume_parser.resume_parser import parse_resume_text
from resume_parser.skill_extractor import extract_skills
from resume_parser.model_training import (
    train_tfidf_multilabel_classifier,
    train_transformer_multilabel_classifier,
)
from matching_engine.semantic_matcher import compute_match_score


app = Flask(__name__)


# Secure CORS
cors_origins = AppConfig.CORS_ORIGINS
if cors_origins == "*":
    CORS(app)
else:
    origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
    CORS(app, resources={r"/*": {"origins": origins}})


@app.route("/", methods=["GET"])
def home():
    return jsonify(message="AI-ML Service is running!")


def _is_url_allowed(file_url: str) -> bool:
    try:
        parsed = urlparse(file_url)
        if parsed.scheme not in {"http", "https"}:
            return False
        hostname = parsed.hostname or ""
        # Basic SSRF protection: disallow localhost and private IPs
        blocked_hosts = {"localhost", "127.0.0.1", "::1"}
        if hostname in blocked_hosts:
            return False
        # Resolve IP and check private ranges
        try:
            ip = socket.gethostbyname(hostname)
            private_prefixes = ("10.", "172.16.", "172.17.", "172.18.", "172.19.", "172.2", "192.168.")
            if ip.startswith(private_prefixes):
                return False
        except Exception:
            return False
        return True
    except Exception:
        return False


@app.route("/parse", methods=["POST"])
def parse_resume():
    data = request.get_json(silent=True) or {}
    file_url = data.get("file_url")

    if not file_url:
        return jsonify(error="No file_url provided"), 400
    if not _is_url_allowed(file_url):
        return jsonify(error="file_url not allowed"), 400

    temp_pdf_path = download_file_from_url(file_url)
    if temp_pdf_path is None:
        return jsonify(error="Failed to download file from URL"), 502

    extracted_text = extract_text_from_pdf(temp_pdf_path)
    if extracted_text is None:
        return jsonify(error="Failed to extract text from PDF"), 500

    parsed = parse_resume_text(extracted_text)
    skills = parsed.get("skills", []) or extract_skills(extracted_text)

    return jsonify(
        file_url=file_url,
        extracted_text=extracted_text,
        extracted_skills=skills,
        parsed=parsed,
        word_count=len(extracted_text.split()),
    )


@app.route("/match/score", methods=["POST"])
def match_score():
    data = request.get_json(silent=True) or {}
    resume_text = data.get("resume_text", "")
    job_text = data.get("job_text", "")
    if not resume_text or not job_text:
        return jsonify(error="resume_text and job_text are required"), 400
    score = compute_match_score(resume_text, job_text)
    return jsonify(
        embedding_similarity=score.embedding_similarity,
        tfidf_similarity=score.tfidf_similarity,
        combined_score=score.combined_score,
    )


@app.route("/train/tfidf", methods=["POST"])
def train_tfidf():
    data = request.get_json(silent=True) or {}
    csv_path = data.get("csv_path")
    try:
        result = train_tfidf_multilabel_classifier(csv_path)
        return jsonify(
            message="TF-IDF classifier trained",
            micro_f1=result.micro_f1,
            macro_f1=result.macro_f1,
            vectorizer_path=result.vectorizer_path,
            classifier_path=result.classifier_path,
        )
    except FileNotFoundError:
        return jsonify(error="Dataset not found"), 404
    except Exception as e:
        return jsonify(error=str(e)), 400


@app.route("/train/transformer", methods=["POST"])
def train_transformer():
    data = request.get_json(silent=True) or {}
    csv_path = data.get("csv_path")
    model_name = data.get("model_name")
    try:
        result = train_transformer_multilabel_classifier(csv_path, model_name)
        return jsonify(
            message="Transformer classifier trained",
            output_dir=result.output_dir,
            micro_f1=result.micro_f1,
            macro_f1=result.macro_f1,
            num_labels=result.num_labels,
        )
    except FileNotFoundError:
        return jsonify(error="Dataset not found"), 404
    except Exception as e:
        return jsonify(error=str(e)), 400


if __name__ == "__main__":
    app.run(port=AppConfig.PORT, debug=AppConfig.DEBUG)