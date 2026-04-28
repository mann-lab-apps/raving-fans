# 로컬 개발 서버 운영 매뉴얼

본 프로젝트를 로컬 환경에서 실행하고 테스트하기 위한 개발 서버 사용법을 안내합니다.

## 1. 프론트엔드 개발 서버 (Vite 등)

최신 프론트엔드 프레임워크를 사용하는 경우, 핫 리로드(Hot Reload) 기능을 지원하는 개발 서버를 실행합니다.

### 1.1 실행 방법
```bash
cd [ui-project-dir]
npm install
npm run dev
```

### 1.2 주요 특징
- **자동 갱신**: 소스 코드 수정 시 브라우저가 즉시 업데이트됩니다.
- **포트 설정**: 기본적으로 `5173` 또는 `3000` 포트를 사용하며, 설정에서 변경 가능합니다.
- **Secure Context**: `localhost` 접속 시 브라우저의 보안 정책(Clipboard API 등)이 정상 작동합니다.

## 2. 정적 웹 서버 (Python/Node.js)

빌드된 정적 파일이나 단순한 HTML/JS 환경을 테스트할 때 사용합니다.

### 2.1 Python 기반 실행
```bash
# HTTP 서버
python3 -m http.server 8000

# HTTPS 서버 (인증서 필요 시 전용 스크립트 실행)
python3 tools/https_server.py
```

### 2.2 Node.js 기반 실행
```bash
npx serve .
```

## 3. HTTPS 개발 환경 구축

일부 최신 브라우저 API(Clipboard, WebAssembly 등)는 보안상의 이유로 HTTPS 환경을 요구할 수 있습니다.

### 3.1 로컬 인증서 생성 (mkcert 권장)
```bash
# mkcert 설치 후
mkcert -install
mkcert localhost
```

### 3.2 개발 서버 적용
Vite나 Webpack 설정에서 생성된 `localhost.pem`과 `localhost-key.pem` 파일을 지정하여 HTTPS 서버를 구동합니다.

## 4. 백엔드/API 개발 서버

데이터 처리를 위한 API 서버를 독립적으로 실행해야 하는 경우입니다.

```bash
[백엔드 실행 명령어 예: python app.py 또는 go run main.go]
```

## 5. 트러블슈팅

- **포트 충돌**: 이미 사용 중인 포트라는 메시지가 나오면 다른 포트를 지정하거나, 해당 포트를 사용 중인 프로세스를 종료합니다.
- **CORS 오류**: 프론트엔드와 백엔드의 포트가 다를 경우 CORS 설정을 확인해야 합니다.
- **WASM 로드 실패**: 서버가 `.wasm` 파일의 MIME 타입을 `application/wasm`으로 올바르게 전송하고 있는지 확인하세요.

---

> [!NOTE]
> 개발 서버는 프로덕션 배포 전 빠른 피드백 루프를 위해 존재합니다. 배포 전에는 반드시 `build` 명령어를 통해 생성된 아티팩트로 최종 테스트를 수행하세요.

---

*본 문서는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험 및 방법론을 바탕으로 제작된 템플릿입니다. (원본 문서를 복제 및 수정함)*
