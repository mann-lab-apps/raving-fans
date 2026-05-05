export type VisionStatus = 'aligned' | 'pending' | 'conflict';

export interface VisionPair {
  id: string;              // 기존 slug 스타일 ID (예: 'self', 'family')
  uuid: string;            // 전역 고유 ID
  name: string;            // 대상 이름 (예: '나', '가족')
  providerVision: string;  // 제공자 비전
  customerVision: string;  // 고객 비전
  status: VisionStatus;    // 상태
  createdAt: string;       // 생성일 (ISO 8601)
  updatedAt: string;       // 수정일 (ISO 8601)
  version: number;         // 데이터 버전
}

export interface VisionStorage {
  pairs: VisionPair[];
  lastModified: string;
}
