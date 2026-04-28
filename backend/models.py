from pydantic import BaseModel
from typing import List, Optional

class Provider(BaseModel):
    name: str
    vision: str

class Customer(BaseModel):
    id: str
    name: str
    vision: str
    status: Optional[str] = "pending"

class VisionData(BaseModel):
    provider: Provider
    customers: List[Customer]
