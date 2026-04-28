from fastapi.testclient import TestClient
from backend.main import app
import os
import json

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_get_visions():
    response = client.get("/api/visions")
    assert response.status_code == 200
    data = response.json()
    assert "pairs" in data
    assert len(data["pairs"]) > 0
    assert data["pairs"][0]["name"] == "가족"

def test_update_visions():
    # 현재 데이터 로드
    response = client.get("/api/visions")
    current_data = response.json()
    
    # 데이터 수정 (첫 번째 페어의 providerVision 수정)
    current_data["pairs"][0]["providerVision"] = "수정된 테스트 비전"
    
    response = client.post("/api/visions", json=current_data)
    assert response.status_code == 200
    assert response.json()["pairs"][0]["providerVision"] == "수정된 테스트 비전"
    
    # 다시 읽어서 확인
    response = client.get("/api/visions")
    assert response.json()["pairs"][0]["providerVision"] == "수정된 테스트 비전"
