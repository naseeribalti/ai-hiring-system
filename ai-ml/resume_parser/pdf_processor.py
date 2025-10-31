from pdfminer.high_level import extract_text
import os
import requests
import tempfile
from urllib.parse import urlparse

# Configuration (tunable via environment variables)
DEFAULT_MAX_BYTES = 10 * 1024 * 1024  # 10 MB
DEFAULT_TIMEOUT = (5, 20)  # (connect timeout, read timeout)


def download_file_from_url(file_url):
    """
    Downloads a file from a URL into a temporary file.
    Returns the path to the temporary file.
    """
    try:
        # Basic URL validation
        parsed = urlparse(file_url)
        if parsed.scheme not in ("http", "https"):
            print(
                f"Rejected download, unsupported URL scheme: {parsed.scheme}")
            return None

        # Optional allowed hosts check
        allowed = os.getenv("ALLOWED_DOWNLOAD_HOSTS")
        if allowed:
            allowed_hosts = [h.strip().lower()
                             for h in allowed.split(",") if h.strip()]
            hostname = parsed.hostname.lower() if parsed.hostname else ""
            ok = any(hostname == h or hostname.endswith("." + h)
                     for h in allowed_hosts)
            if not ok:
                print(
                    f"Rejected download, host not in ALLOWED_DOWNLOAD_HOSTS: {hostname}")
                return None

        # Configurable limits
        max_bytes = int(os.getenv("MAX_DOWNLOAD_BYTES", DEFAULT_MAX_BYTES))
        timeout = DEFAULT_TIMEOUT
        env_timeout = os.getenv("DOWNLOAD_TIMEOUT_SECONDS")
        if env_timeout:
            try:
                t = int(env_timeout)
                timeout = (5, max(5, t))
            except ValueError:
                pass

        # Stream the response and enforce size limits
        with requests.get(file_url, stream=True, timeout=timeout) as response:
            response.raise_for_status()

            content_type = response.headers.get("Content-Type", "").lower()
            # Basic content type check for PDFs
            if content_type and not (
                "application/pdf" in content_type or
                "application/octet-stream" in content_type or
                "application/x-pdf" in content_type
            ):
                print(
                    f"Warning: unexpected Content-Type '{content_type}' for {file_url}")

            total = 0
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                for chunk in response.iter_content(chunk_size=8192):
                    if not chunk:
                        continue
                    total += len(chunk)
                    if total > max_bytes:
                        # Exceeded allowed download size
                        print(
                            f"Download exceeded max size ({max_bytes} bytes), aborting")
                        temp_path = temp_file.name
                        temp_file.close()
                        try:
                            if os.path.exists(temp_path):
                                os.remove(temp_path)
                        except Exception:
                            pass
                        return None
                    temp_file.write(chunk)

            print(f"File downloaded to: {temp_file.name} ({total} bytes)")
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
