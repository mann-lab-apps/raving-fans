# [구현 계획서] T006 #6: PWA 전환 상세 구현 계획

- 작성일: 2026-05-06
- 담당: Antigravity (Gemini 3 Flash)
- 상태: 완료 (승인됨)

## 1. 개요
`next-pwa`를 사용하여 Next.js 앱을 PWA로 전환하고, 아이폰 홈 화면 설치를 위한 메타데이터와 아이콘 설정을 완료합니다.

## 2. 상세 수정 계획

### 2.1 의존성 및 환경 설정 (`frontend/next.config.ts`)
- `next-pwa` 패키지를 설치하고, `next.config.ts`를 `withPWA`로 래핑합니다.
- 빌드 시 `public/sw.js`가 생성되도록 설정합니다.
- `dest: 'public'`, `disable: process.env.NODE_ENV === 'development'` 옵션을 적용합니다.

### 2.2 웹 앱 매니페스트 (`frontend/public/manifest.json`)
- `short_name`: "RavingFans"
- `name`: "Raving Fans: Vision Alignment"
- `icons`: 192x192, 512x512 아이콘 정의 (PNG 형식)
- `start_url`: "/"
- `display`: "standalone" (브라우저 UI 제거)
- `theme_color`: "#0f172a" (slate-900)
- `background_color`: "#f8fafc" (slate-50)

### 2.3 메타데이터 보완 (`frontend/src/app/layout.tsx`)
- `metadata` 객체에 다음 항목 추가:
    - `manifest: "/manifest.json"`
    - `themeColor: "#0f172a"`
    - `appleWebApp: { capable: true, statusBarStyle: "default", title: "Raving Fans" }`
    - `viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"`

### 2.4 아이콘 생성 (`frontend/public/icons/`)
- `generate_image` 툴을 사용하여 'Raving Fans' 서비스의 핵심 가치(Alignment, Fan)를 상징하는 프리미엄 로고 아이콘을 생성하고, 사이즈별로 배치합니다.
    - `icon-192x192.png`
    - `icon-512x512.png`

## 3. 검증 계획
1. `npm run build` 후 `public/sw.js` 및 `public/workbox-*.js` 파일 생성 확인.
2. 개발자 도구(Lighthouse)의 'PWA' 항목에서 설치 가능 여부 및 매니페스트 유효성 검증.
3. 브라우저 주소창 우측의 '앱 설치' 버튼 활성화 여부 확인.

## 4. 승인 요청
- [x] 구현 계획 승인 (작업지시자)

---

*본 문서는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험 및 방법론을 바탕으로 제작된 템플릿입니다. (원본 문서를 복제 및 수정함)*
