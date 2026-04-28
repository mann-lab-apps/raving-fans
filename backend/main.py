from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.models import VisionData, Provider, Customer
from backend.storage import VisionStorage

app = FastAPI(title="Raving Fans Vision Manager")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 단계이므로 모두 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/visions", response_model=VisionData)
async def get_visions():
    return VisionStorage.load_data()

@app.post("/api/visions", response_model=VisionData)
async def update_visions(data: VisionData):
    VisionStorage.save_data(data)
    return data

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
