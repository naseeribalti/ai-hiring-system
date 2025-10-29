from flask import Flask, request, jsonify
from flask_cors import CORS
from resume_parser.pdf_processor import (
    extract_text_from_pdf,
    download_file_from_url
)
# --- ADD THIS IMPORT ---
from resume_parser.skill_extractor import extract_skills

# Initialize the Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    """A simple route to check if the AI service is alive."""
    return jsonify(message="AI-ML Service is running!")

@app.route("/parse", methods=["POST"])
def parse_resume():
    """
    API Endpoint to parse a resume.
    It now extracts raw text AND a list of skills.
    """
    data = request.get_json()
    file_url = data.get('file_url')

    if not file_url:
        return jsonify(error="No file_url provided"), 400

    print(f"Processing file from URL: {file_url}")

    # 1. Download the file
    temp_pdf_path = download_file_from_url(file_url)
    if temp_pdf_path is None:
        return jsonify(error="Failed to download file from URL"), 500

    # 2. Extract raw text
    extracted_text = extract_text_from_pdf(temp_pdf_path)
    if extracted_text is None:
        return jsonify(error="Failed to extract text from PDF"), 500
    
    # --- ADD THIS NEW STEP ---
    # 3. Extract skills from the raw text
    found_skills = extract_skills(extracted_text)
    print(f"Found {len(found_skills)} skills: {found_skills}")

    # 4. Return the new, richer data
    return jsonify(
        file_url=file_url,
        extracted_text=extracted_text,
        extracted_skills=found_skills, # <-- NEW FIELD
        word_count=len(extracted_text.split())
    )

if __name__ == "__main__":
    app.run(port=5001, debug=True)