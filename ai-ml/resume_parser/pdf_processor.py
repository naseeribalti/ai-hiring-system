from pdfminer.high_level import extract_text
import os
import requests
import tempfile

def download_file_from_url(file_url):
    """
    Downloads a file from a URL into a temporary file.
    Returns the path to the temporary file.
    """
    try:
        # Create a temporary file to store the downloaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            # Download the file content with timeout and streaming
            response = requests.get(file_url, timeout=10, stream=True)
            response.raise_for_status()

            content_type = response.headers.get("Content-Type", "").lower()
            if "pdf" not in content_type and not file_url.lower().endswith(".pdf"):
                raise ValueError("URL does not point to a PDF file")

            bytes_written = 0
            max_bytes = 10 * 1024 * 1024  # 10 MB safety cap
            for chunk in response.iter_content(chunk_size=8192):
                if not chunk:
                    continue
                bytes_written += len(chunk)
                if bytes_written > max_bytes:
                    raise ValueError("File too large")
                temp_file.write(chunk)

            print(f"File downloaded to: {temp_file.name}")
            return temp_file.name
    except requests.exceptions.RequestException as e:
        print(f"Error downloading file: {e}")
        return None
    except Exception as e:
        print(f"Error processing file: {e}")
        return None

def extract_text_from_pdf(pdf_path):
    """
    Extracts raw text from a given PDF file.
    """
    try:
        # Use pdfminer.six to extract text
        text = extract_text(pdf_path)
        return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return None
    finally:
        # Clean up: Remove the temporary file after processing
        if os.path.exists(pdf_path):
            os.remove(pdf_path)
            print(f"Temporary file {pdf_path} removed")