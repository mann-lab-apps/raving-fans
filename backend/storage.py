import json
import os
from backend.models import VisionData

DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/visions.json")

class VisionStorage:
    @staticmethod
    def load_data() -> VisionData:
        if not os.path.exists(DATA_PATH):
            return VisionData(provider={"name": "", "vision": ""}, customers=[])
        
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return VisionData(**data)

    @staticmethod
    def save_data(data: VisionData):
        with open(DATA_PATH, "w", encoding="utf-8") as f:
            json.dump(data.model_dump(), f, indent=2, ensure_ascii=False)
