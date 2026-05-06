# [구현 계획서] T007 #3: Vercel 배포용 데이터 경로 수정 상세

- 작성일: 2026-05-06
- 담당: Antigravity (Gemini 3 Flash)
- 상태: 완료 (승인됨)

## 1. 개요
Vercel 환경에서 서버리스 함수가 `visions.json` 파일을 정상적으로 로드할 수 있도록 데이터 파일의 위치를 조정하고, 읽기/쓰기 실패 시의 예외 처리를 강화합니다.

## 2. 상세 수정 계획

### 2.1 파일 시스템 변경
- 현재 위치: `/Users/jaemankim/Desktop/privates/coding/raving-fans/data/visions.json`
- 변경 위치: `frontend/src/data/visions.json`
- 작업: `cp` 명령어를 통해 파일을 복사한 후, 추후 빌드 프로세스에서 해당 경로가 포함되도록 합니다.

### 2.2 `frontend/src/app/actions.ts` 수정
- **상수 수정**:
  ```typescript
  // AS-IS
  const DATA_PATH = path.join(process.cwd(), '../data/visions.json');
  // TO-BE
  const DATA_PATH = path.join(process.cwd(), 'src/data/visions.json');
  ```
- **데이터 읽기(`getVisions`) 로직 강화**:
    - 파일이 존재하지 않을 경우(`fs.access` 실패 시), 에러를 던지는 대신 **기본 초기 데이터(Default JSON)**를 메모리 상에서 반환하고 필요시 새로 생성하도록 수정합니다.
- **데이터 쓰기(`updateVisions`) 로직 강화**:
    - Vercel 등 읽기 전용 환경에서 쓰기 실패 시 시스템이 중단되지 않도록 `try-catch`로 묶어 경고만 출력하도록 처리합니다. (추후 DB 도입 시까지의 임시 조치)

## 3. 검증 계획
1. `npm run dev` 실행 시 새로운 경로(`src/data/`)에서 데이터를 정상적으로 불러오는지 확인.
2. 임의로 `visions.json`을 삭제한 후에도 기본 데이터로 앱이 실행되는지 확인.
3. 배포 후 Vercel 로그를 통해 500 에러 해결 여부 확인.

## 4. 승인 요청
- [x] 구현 계획 승인 (작업지시자)
