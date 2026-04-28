from fastapi.testclient import TestClient
from backend.main import app
from backend.storage import DATA_PATH
import os
import json
import pytest

client = TestClient(app)

# 테스트용 임시 데이터 파일 경로
TEST_DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/test_visions.json")

@pytest.fixture(autouse=True)
def setup_test_data():
    # 테스트 시작 전 임시 데이터 생성
    test_data = {
        "pairs": [
            {
                "id": "test",
                "name": "테스트고객",
                "providerVision": "테스트 제공자 비전",
                "customerVision": "테스트 고객 비전",
                "status": "pending"
            }
        ]
    }
    # 기존 DATA_PATH를 임시로 가로채기 위해 storage의 DATA_PATH를 수정하는 대신 
    # 파일 자체를 백업하고 교체하는 방식은 위험하므로, 
    # 여기서는 테스트용 데이터를 직접 POST로 쏴서 메모리/파일 상에서 확인만 합니다.
    # 하지만 더 깔끔한 방법은 storage 클래스에서 경로를 주입받는 것입니다.
    yield
    # 테스트 후 임시 파일 삭제 (필요시)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200

def test_get_visions():
    response = client.get("/api/visions")
    assert response.status_code == 200
    assert "pairs" in response.json()

def test_update_visions():
    # 실제 데이터를 건드리지 않기 위해, 현재 데이터를 읽어온 뒤 
    # '원본 데이터와 똑같이' 다시 저장하는 식으로 테스트하여 
    # '쓰기 기능' 자체만 검증하고 원본 내용은 유지합니다.
    response = client.get("/api/visions")
    original_data = response.json()
    
    response = client.post("/api/visions", json=original_data)
    assert response.status_code == 200
    assert response.json() == original_data
