# Antigravity AI-BDD-TDD Template

이 저장소는 **Google Antigravity(Gemini) 기반 AI Agent와 협업하여 BDD-TDD 방법론을 실천하기 위한 최적화 템플릿**입니다.

## 🚀 왜 이 템플릿인가?
단순히 "이 가이드를 따라줘"라고 프롬프트로 지시하는 것은 컨텍스트 초기화 시 쉽게 잊혀집니다.
이 템플릿은 Antigravity의 강력한 워크스페이스 룰 자동 로딩 기능(`.agents/rules/`)을 활용하여, **AI Agent가 프로젝트에 진입하는 순간 원칙을 스스로 인지하고 통제하도록 시스템적으로 강제**합니다.

## 📂 핵심 구조

1. **`AGENTS.md` (또는 `GEMINI.md`)**:
   - 프로젝트 최상단에서 AI 행동 규약(절대 어기면 안 되는 규칙)을 선언하는 진입점입니다.
2. **`.agents/rules/`**:
   - Antigravity가 자동으로 감지하고 로드하는 워크스페이스 세부 룰 폴더입니다.
   - BDD-TDD 라이프사이클, 검증 게이트, 엔지니어링 원칙 등 긴 가이드라인이 모듈화되어 있습니다.
3. **`docs/`**:
   - 요구사항 추적 매트릭스(`rtm.md`)와 Gherkin 시나리오(`user-flow/`)가 담긴 살아있는 문서 보관소입니다.

## ⚙️ AI-Agent 협업 워크플로우 (요약)
AI는 이 템플릿 환경에서 다음과 같은 리듬으로 작동합니다:

1. **설계 (Phase 1)**: `docs/rtm.md` 확인 후 `.feature`를 작성합니다.
2. **테스트 (Phase 2)**: `.feature` 기반 실패하는 테스트를 작성합니다.
3. **🛑 대기 (Phase 3)**: **AI는 여기서 반드시 멈춥니다.** 사용자의 명시적 승인("시작", "승인") 전까지 실제 코드를 짜지 않습니다.
4. **구현 (Phase 4)**: 승인이 떨어지면 테스트를 통과할 프로덕션 코드를 구현합니다.
5. **리팩터 및 갱신 (Phase 5)**: `rtm.md`의 상태(Status)를 갱신합니다.

## 🏁 시작하기
이 템플릿을 사용하여 새로운 프로젝트를 시작하려면 아래의 명령어를 순서대로 실행하세요.

```bash
# 1. 템플릿 클론 (원하는 프로젝트 이름 지정)
git clone https://github.com/mannMae/ai-bdd-tdd-template.git <your-project-name>

# 2. 프로젝트 폴더로 이동
cd <your-project-name>

# 3. 기존 원격 저장소(템플릿 저장소) 연결 해제
git remote remove origin

# 4. (선택) 자신의 새로운 원격 저장소 연결 및 푸시
# git remote add origin <your-new-repo-url>
# git push -u origin main
```

이후 프로젝트의 성격에 맞게 `package.json` 등을 추가하고, `.agents/rules/` 내의 파일들을 필요에 따라 조금씩 튜닝하여 사용하세요.
