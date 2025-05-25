from pydantic import BaseModel

class MCQRequest(BaseModel):
    segment: str
