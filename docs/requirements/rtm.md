# Requirements Traceability Matrix (RTM)

본 문서는 프로젝트의 요구사항(Feature) 상태와 테스트 케이스 추적을 위한 마스터 문서입니다.
작업(Phase 1, Phase 5) 시 이 문서를 항상 갱신하십시오.

## 1. Page List (P)
| ID  | Page Name | Description | Status | Notes |
|:----|:----------|:------------|:-------|:------|
| P01 | 대시보드 | 5x5 매트릭스 및 비전 다이아그램 시각화 메인 화면 | Pending | |
| P02 | 비전 설정 | 팀 비전 및 고객 비전 작성/수정 페이지 | Pending | |
| P03 | 세션 기록 | 현재 활동(산책 등)의 점수(흥미/생산성) 입력 페이지 | Pending | |

## 2. Feature List (F) & Mapping
| ID  | Category | Feature (Requirement) | Page ID | Priority | Status | Test Case |
|:----|:---------|:----------------------|:--------|:---------|:-------|:----------|
| F01 | Design | Premium Design System (CSS, Typography, Glassmorphism) | ALL | P2 | Pending | - |
| F02 | Vision | 팀 비전 수립 및 점수화 (내용 + 흥미/생산성) | P02 | P1 | Pending | `Vision.F02.test.tsx` |
| F03 | Vision | 고객 비전 수립 및 점수화 (내용 + 흥미/생산성) | P02 | P1 | Pending | `Vision.F03.test.tsx` |
| F04 | Status | 현재 활동 상태 기록 및 점수화 (내용 + 흥미/생산성) | P03 | P1 | Pending | `Score.F04.test.tsx` |
| F05 | History | 비전 및 활동의 변화 이력(Snapshot) 관리 | ALL | P1 | Pending | `Data.F05.test.tsx` |
| F06 | Visual | 5x5 매트릭스 (팀 vs 고객 vs 현재 상태 정렬 시각화) | P01 | P1 | Pending | `Matrix.F06.test.tsx` |
| F07 | Data | 로컬 JSON/LocalStorage 데이터 저장 핸들러 | ALL | P1 | Pending | `Data.F07.test.tsx` |
| F08 | PWA | PWA 매니페스트 및 서비스 워커 설정 | ALL | P2 | Pending | - |
| F09 | PWA | 리텐션을 위한 푸시 알림 기능 | ALL | P2 | Pending | - |

> **Status 속성 가이드:**
> - `Pending`: 작업 전
> - `WIP`: 테스트 작성 및 구현 진행 중
> - `Done`: 테스트 Pass 및 구현 완료
