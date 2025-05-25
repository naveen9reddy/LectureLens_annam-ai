from fastapi import FastAPI
from routes import transcription, mcq

app = FastAPI()

app.include_router(transcription.router, tags=["Transcription"])
app.include_router(mcq.router, tags=["MCQ Generation"])
