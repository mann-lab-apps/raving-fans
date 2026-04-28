# AI Hyper-Waterfall Template

AI 시대의 소프트웨어 개발 방법론: **거시적 워터폴(Macro Waterfall)**과 **미시적 애자일(Micro Agile)**을 결합한 하이퍼-워터폴(Hyper-Waterfall) 템플릿 프로젝트입니다.

## 🚀 프로젝트 개요

이 템플릿은 **Antigravity(Gemini 3 Flash)** 페어 프로그래머와 협업할 때 **품질(규율)**과 **속도**를 동시에 확보하기 위한 문서 체계와 워크플로우를 제공합니다.

- **핵심 문서**: [Hyper-Waterfall 방법론](mydocs/manual/hyper_waterfall.md)
- **독지 순서**: [매뉴얼 로드맵 (Reading Roadmap)](mydocs/manual/READING_ROADMAP.md) ⬅️ **처음 방문하셨다면 여기부터!**
- **작업 가이드**: [문서 체계 가이드](mydocs/manual/hyper_waterfall_docs_guide.md)

## 📁 디렉토리 구조

```text
.
├── ANTIGRAVITY.md         # Antigravity 에이전트를 위한 핵심 규칙 및 워크플로우
├── README.md              # 프로젝트 개요 및 가이드
└── mydocs/                # 실제 프로젝트 타스크 기록 (Hyper-Waterfall 실천)
    ├── orders/            # 오늘 할일 (Daily tasks)
    ├── plans/             # 수행/구현 계획서
    ├── working/           # 단계별 완료 보고서
    ├── report/            # 최종 결과 보고서
    ├── feedback/          # 인간의 피드백 기록
    ├── tech/              # 기술 조사 내용
    ├── troubleshootings/  # 문제 해결 기록
    ├── pr/                # 외부 PR 검토 기록
    ├── release/           # 릴리즈 노트 및 배포 기록
    ├── eng/               # 영문 문서 아카이브
    ├── manual/            # 방법론 정의 및 가이드 (rhwp 스타일)
    └── templates/         # 계획서/보고서 마크다운 템플릿
```

## 🛠 사용 방법

1. 이 레포지토리를 클론하거나 템플릿으로 사용하여 새 프로젝트를 시작합니다.
2. **Antigravity(Gemini)** 에이전트에게 `ANTIGRAVITY.md`를 읽게 하여 워크플로우를 숙지시킵니다.
3. `mydocs/orders/`에 오늘 할일을 기록하고 타스크를 시작합니다.
4. 모든 타스크는 **계획(plans) -> 구현(working) -> 보고(report)**의 사이클을 준수하며 작업지시자의 승인을 거칩니다.

## ⚖️ 원칙 (The 3 Principles)

1. **컨텍스트 유지**: 구현 가치가 Antigravity 컨텍스트 내에 머물게 합니다.
2. **작업 통제권**: 모든 결정과 승인권은 사람이 가집니다.
3. **주기적 검증**: Gemini의 맥락 손실을 방지하기 위해 문서를 적극 활용합니다.

---
*본 프로젝트는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험을 바탕으로 제작되었습니다.*

---

*본 문서는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험 및 방법론을 바탕으로 제작된 템플릿입니다. (원본 문서를 복제 및 수정함)*
