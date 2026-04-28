from pydantic import BaseModel
from typing import List, Optional

class VisionPair(BaseModel):
    id: str
    name: str
    providerVision: str  # 이 고객에게 제공하고자 하는 나의 비전
    customerVision: str  # 고객이 원하는/가진 비전
    status: Optional[str] = "pending"

class VisionData(BaseModel):
    pairs: List[VisionPair]
