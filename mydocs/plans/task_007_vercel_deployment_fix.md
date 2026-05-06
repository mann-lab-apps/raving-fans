# [수행 계획서] T007 #3: Vercel 배포 환경 최적화 (데이터 경로 수정)

- 작성일: 2026-05-06
- 담당: Antigravity (Gemini 3 Flash)
- 상태: 대기 (승인 전)

## 1. 개요
현재 프로젝트가 Vercel 배포 시 `data/visions.json` 파일을 찾지 못해 500 에러가 발생하는 문제를 해결합니다. 서버리스 환경의 파일 시스템 제약을 고려하여 데이터 위치를 최적화하고 안정적인 데이터 로딩 구조를 구축합니다.

## 2. 목표
- [ ] `visions.json` 파일을 `frontend` 디렉토리 내부로 이동하여 빌드 포함 보장
- [ ] `actions.ts` 내 데이터 참조 경로를 상대 경로(`process.cwd()`) 기반으로 수정
- [ ] 데이터 파일 부재 시 에러 방지 로직(Default Data) 강화

## 3. 작업 범위
- **파일 이동**: `data/visions.json` -> `frontend/src/data/visions.json`
- **로직 수정**: `frontend/src/app/actions.ts` 내 `DATA_PATH` 정의 및 `getVisions` 함수

## 4. 수행 단계
1. **1단계**: 데이터 파일 이동 및 `frontend` 패키지 내 포함 확인
2. **2단계**: `actions.ts` 내 경로 상수 수정 및 배포 환경 대응 예외 처리 추가
3. **3단계**: 로컬 환경 테스트 및 Vercel 재배포 확인

## 5. 승인 요청
- [ ] 계획 승인 (작업지시자)
