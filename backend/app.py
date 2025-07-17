from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

app = FastAPI()

# CORS setup (already present, but make sure it's here)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for predict endpoint
class PredictRequest(BaseModel):
    symbol: str

@app.post("/api/predict")
async def predict_stock(req: PredictRequest):
    # For now, just echo the symbol back
    load_dotenv()
    FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
    return {"message": f"Received symbol: {req.symbol}"}