from fastapi import APIRouter, UploadFile, File, HTTPException
from utils.file_utils import save_upload_file, delete_file
from services.whisper_service import transcribe_audio

router = APIRouter()

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        file_path = save_upload_file(file)
        transcript = transcribe_audio(file_path)
        delete_file(file_path)
        return {"filename": file.filename, "transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
