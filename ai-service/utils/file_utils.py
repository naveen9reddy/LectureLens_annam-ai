import uuid
import os
from fastapi import UploadFile

from config import UPLOAD_DIR

def save_upload_file(file: UploadFile) -> str:
    file_id = str(uuid.uuid4())
    filename = f"{file_id}_{os.path.basename(file.filename)}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_path

def delete_file(path: str):
    if os.path.exists(path):
        os.remove(path)
