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
            # Download the file content
            response = requests.get(file_url)
            response.raise_for_status()  # Raise an error for bad responses
            
            # Write the content to the temporary file
            temp_file.write(response.content)
            
            print(f"File downloaded to: {temp_file.name}")
            return temp_file.name
    except requests.exceptions.RequestException as e:
        print(f"Error downloading file: {e}")
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