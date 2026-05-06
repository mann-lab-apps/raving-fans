# [수행 계획서] T006 #6: PWA(Progressive Web App) 전환 및 모바일 최적화

- 작성일: 2026-05-06
- 담당: Antigravity (Gemini 3.1 Pro)
- 상태: 완료 (승인됨)

## 1. 개요
Raving Fans 비전 관리 시스템을 사용자의 아이폰에 설치하고 향후 능동적인 푸쉬 알림을 수신할 수 있도록, 기존 Next.js 웹 앱을 PWA(Progressive Web App)로 전환합니다. 모바일 네이티브 앱과 같은 사용자 경험을 제공하여 앱 접근성과 Retention(유지율)을 극대화하는 것이 목적입니다.

## 2. 목표
- [ ] `next-pwa` 등 라이브러리를 활용하여 Next.js 프로젝트에 PWA 기능 연동
- [ ] 홈 화면 설치를 위한 `manifest.json` 생성 및 메타 태그 적용
- [ ] 오프라인 캐싱 및 백그라운드 작업을 위한 `Service Worker` 등록
- [ ] 기본 앱 아이콘(192x192, 512x512) 구성

## 3. 작업 범위
- `frontend/next.config.js`: PWA 플러그인 설정
- `frontend/src/app/manifest.ts` (또는 `public/manifest.json`): 웹 앱 매니페스트 정의
- `frontend/src/app/layout.tsx`: PWA 관련 필수 메타 태그(theme-color, apple-mobile-web-app-capable 등) 추가
- `frontend/public/icons/`: 임시 앱 아이콘 배치

## 4. 수행 단계
1. **1단계: 의존성 설치 및 설정**
   - `npm install next-pwa` 패키지 설치.
   - `next.config.js`에 PWA 모듈 래핑.
2. **2단계: 매니페스트 및 메타 태그 구성**
   - 앱 이름(Raving Fans), 테마 색상, 디스플레이 모드(standalone) 등을 정의한 매니페스트 설정.
   - iOS 특화 메타 태그(`apple-touch-icon` 등)를 `layout.tsx`에 반영.
3. **3단계: 아이콘 리소스 배치**
   - 구동 테스트를 위한 임시 192x192, 512x512 아이콘을 `public` 폴더에 생성 및 연결.
4. **4단계: 빌드 및 로컬 테스트**
   - 서비스 워커가 정상적으로 등록되는지 확인.
   - Chrome 개발자 도구를 통해 Installability(설치 가능성) 조건이 충족되었는지 검증.

## 5. 승인 요청
- [x] 계획 승인 (작업지시자)

---

*본 문서는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험 및 방법론을 바탕으로 제작된 템플릿입니다. (원본 문서를 복제 및 수정함)*
