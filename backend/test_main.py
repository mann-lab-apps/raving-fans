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
    assert "provider" in data
    assert "customers" in data
    assert data["provider"]["name"] == "나 (1인 기업가)"

def test_update_visions():
    # 현재 데이터 로드
    response = client.get("/api/visions")
    current_data = response.json()
    
    # 데이터 수정
    current_data["provider"]["vision"] = "수정된 비전 테스트"
    
    response = client.post("/api/visions", json=current_data)
    assert response.status_code == 200
    assert response.json()["provider"]["vision"] == "수정된 비전 테스트"
    
    # 다시 읽어서 확인
    response = client.get("/api/visions")
    assert response.json()["provider"]["vision"] == "수정된 비전 테스트"
