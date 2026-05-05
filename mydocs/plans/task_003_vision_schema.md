# [수행 계획서] T003 #3: 아키텍처 단순화(Backend-less) 및 비전 데이터 구조 고도화

- 작성일: 2026-05-06
- 담당: Antigravity (Gemini 3 Flash)
- 상태: 대기 (승인 전)

## 1. 개요
현재 FastAPI(Backend)와 Next.js(Frontend)로 분리된 구조를 Next.js 단일 아키텍처로 통합하여 개발 효율성을 극대화합니다. Next.js의 Server Actions를 통해 `visions.json`을 직접 관리하며, 이 과정에서 데이터 구조를 TypeScript 기반으로 고도화합니다.

## 2. 목표
- [ ] **아키텍처 통합**: 별도의 FastAPI 서버 없이 Next.js 내부에서 데이터 I/O 처리
- [ ] **Server Actions 구현**: 파일 시스템(`fs`) 접근을 위한 서버 측 로직 구현
- [ ] **데이터 고도화**: UUID, 메타데이터(createdAt, updatedAt) 필드 추가 및 TS 인터페이스 정의
- [ ] **프로젝트 경량화**: 불필요한 `backend` 폴더 및 설정 제거

## 3. 작업 범위
- `frontend/src/app/actions.ts`: (신규) JSON 읽기/쓰기를 위한 Server Actions
- `frontend/src/types/vision.ts`: (신규) 고도화된 비전 데이터 타입 정의
- `frontend/src/app/page.tsx`: Server Actions 연동 및 UI 수정
- `data/visions.json`: 신규 스키마에 따른 데이터 마이그레이션
- `backend/`: 폴더 삭제 (혹은 아카이브)

## 4. 수행 단계
1. **1단계: Next.js Server Actions 및 타입 정의**
   - `types/vision.ts`에 `VisionPair` 스키마 정의.
   - `actions.ts`에 `getVisions()`, `updateVision()` 등 파일 I/O 함수 작성.
2. **2단계: 기존 기능 이관 및 테스트**
   - 기존 FastAPI로 보내던 API 호출을 Server Actions 호출로 교체.
   - 브라우저에서 수정 시 `data/visions.json`이 정상적으로 업데이트되는지 검증.
3. **3단계: 데이터 구조 고도화 및 마이그레이션**
   - 기존 데이터를 신규 스키마(UUID, Timestamp 추가)로 변환하는 로직 수행.
   - UI에 `Last updated` 등의 메타데이터 노출.
4. **4단계: 백엔드 코드 정리**
   - 더 이상 필요 없는 `backend` 폴더 및 관련 설정 파일 삭제.

## 5. 승인 요청
- [ ] 계획 승인 (작업지시자)

---

*본 문서는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험 및 방법론을 바탕으로 제작된 템플릿입니다. (원본 문서를 복제 및 수정함)*
