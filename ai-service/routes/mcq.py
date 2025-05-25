from fastapi import APIRouter, HTTPException
from models.request_models import MCQRequest
from services.mcq_service import generate_mcq_from_text

router = APIRouter()

@router.post("/generate-mcq")
async def generate_mcq(request: MCQRequest):
    try:
        questions = generate_mcq_from_text(request.segment)
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
