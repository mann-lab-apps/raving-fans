# [Plan] T001: 프로젝트 초기화 및 기본 아키텍처 설정

## 1. 개요
- **타스크 ID**: T001
- **목표**: FastAPI 백엔드와 Next.js 프론트엔드의 기본 구조를 잡고, JSON 기반의 데이터 입출력이 가능한 상태를 만든다.
- **연관 이슈**: #1

## 2. 상세 작업 단계

### Step 1: 프로젝트 디렉토리 구조 생성
- `backend/` 폴더 생성 및 FastAPI 초기화
- `frontend/` 폴더 생성 및 Next.js(App Router) 초기화
- 전역 `.gitignore` 설정

### Step 2: 백엔드(FastAPI) 기초 설정
- `main.py`: 기본 API 엔드포인트 설정
- `storage.py`: `data/visions.json` 파일을 읽고 쓰기 위한 유틸리티 클래스 구현
- `models.py`: Pydantic을 이용한 Vision 및 Customer 데이터 모델 정의
  - Provider (나)
  - Customer (가족, 회사, 친구 등)
  - Vision (Title, Description)

### Step 3: 프론트엔드(Next.js) 기초 설정
- Tailwind CSS를 활용한 기본 테마 설정 (Raving Fans 컨셉에 맞는 프리미엄 디자인)
- API 클라이언트 설정 (Axios 또는 Fetch fetcher)
- 메인 레이아웃 및 네비게이션 바 구성

### Step 4: 기본 데이터 시딩(Seeding)
- 초기 `visions.json` 파일 생성 (샘플 데이터 포함: 나, 가족 비전 등)

## 3. 검증 계획
- **백엔드**: `/api/visions` 엔드포인트가 JSON 데이터를 올바르게 반환하는지 확인 (Swagger UI)
- **프론트엔드**: 로컬 서버 실행 시 기본 레이아웃이 정상적으로 노출되는지 확인
- **통합**: 프론트엔드에서 백엔드 데이터를 Fetch하여 콘솔에 찍히는지 확인

## 4. 기대 결과물
- 동작하는 백엔드 API 서버
- 기본 레이아웃이 잡힌 프론트엔드 웹 앱
- `data/visions.json` 파일 시스템 기반 저장소
