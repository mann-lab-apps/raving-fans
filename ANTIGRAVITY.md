# Hyper-Waterfall Project Instructions (Antigravity/Gemini)

이 파일은 **Antigravity(Gemini 3 Flash)** 페어 프로그래머가 **Hyper-Waterfall** 방법론을 준수하며 작업할 수 있도록 가이드를 제공합니다. 처음 투입되었다면 [매뉴얼 로드맵](mydocs/manual/READING_ROADMAP.md)에 따라 관련 문서들을 먼저 학습하십시오.

## 방법론 개요 (Methodology Overview)

**Hyper-Waterfall**: 거시적 워터폴(Macro Waterfall)의 규율과 미시적 애자일(Micro Agile)의 속도를 AI를 통해 결합한 방법론입니다.

- **거시적 (프로젝트 수준)**: 계획 -> 설계 -> 구현 -> 검증 -> 배포 (문서화 필수).
- **미시적 (타스크 수준)**: 2~4시간 단위의 빠른 피드백 루프 및 자동화된 구현.

## 핵심 원칙 (Core Principles)

1. **컨텍스트 내 목표 가치 유지**: Antigravity가 항상 프로젝트의 비전과 아키텍처 원칙을 이해하고 있는지 확인합니다.
2. **작업 통제권 유지**: 작업지시자(사람)가 무엇을 만들지, 어떤 순서로 할지, 언제 멈출지에 대한 모든 결정권을 가집니다.
3. **주기적 컨텍스트 검증**: Antigravity가 핵심 맥락을 유지하고 있는지 주기적으로 확인하고, 중요한 결정은 반드시 문서화하여 외부 메모리로 활용합니다.

## 문서 구조 (`mydocs/`)

| 폴더 | 용도 | 파일명 규칙 |
|------|------|-------------|
| `orders/` | 오늘 할 일 (Daily Task List) | `yyyymmdd.md` |
| `plans/` | 수행 및 구현 계획서 | `task_m{N}_{issue}.md`, `task_m{N}_{issue}_impl.md` |
| `working/` | 단계별 완료 보고서 | `task_m{N}_{issue}_stage{X}.md` |
| `report/` | 최종 결과 보고서 | `task_m{N}_{issue}_report.md` |
| `feedback/` | 인간의 피드백/리뷰 기록 | (자유 형식) |
| `tech/` | 기술적 발견 및 명세 | (자유 형식) |
| `troubleshootings/` | 문제 해결 이력 | (자유 형식) |
| `manual/` | 방법론 가이드 및 매뉴얼 | `hyper_waterfall.md` 등 |
| `pr/` | 외부 PR 검토 기록 | `pr_{번호}_review.md` 등 |
| `release/` | 릴리즈 노트 및 배포 기록 | `release_notes_v{N}.md` 등 |
| `eng/` | 영문 문서 아카이브 | (영문 버전 문서) |
| `templates/` | 계획서/보고서용 양식 | `task_plan_template.md` 등 |
| `templates/` | 계획서/보고서용 양식 | `task_plan_template.md` 등 |

## 표준 워크플로우 (Standard Workflow)

1. **이슈 등록**: GitHub Issues에 타스크를 등록합니다.
2. **오늘 할 일 추가**: `mydocs/orders/yyyymmdd.md`에 타스크를 추가합니다.
3. **수행 계획서 작성**: `plans/task_...md` 작성 (목표, 범위, 단계). **작업지시자 승인 대기.**
4. **구현 계획서 작성**: `plans/task_..._impl.md` 작성 (상세 코드 수정 계획). **작업지시자 승인 대기.**
5. **단계별 구현**: 작업을 3~6단계로 나누어 진행합니다.
6. **단계별 보고**: 각 단계 완료 시 `working/task_..._stage{X}.md` 작성. **작업지시자 승인 대기.**
7. **최종 보고**: 모든 단계 완료 후 `report/task_..._report.md` 작성. **작업지시자 승인 대기.**
8. **이슈 클로즈**: 최종 승인 후에만 이슈를 종료합니다.

## Antigravity 전용 지침 (Specific Instructions)

- **절차 준수**: 워크플로우의 단계를 절대 건너뛰지 마십시오.
- **선 계획 후 구현**: 승인된 계획 없이는 절대 소스 코드를 수정하지 마십시오.
- **단계별 승인**: 이전 단계의 승인 없이는 다음 단계로 진행하지 마십시오.
- **언어 설정**: 모든 문서는 특별한 요청이 없는 한 **한국어**로 작성합니다.
- **Gemini 최적화**: 긴 대화 시 중요한 컨텍스트가 유실되지 않도록, 각 단계 보고서 작성 시 핵심 맥락을 요약하여 포함하십시오.

---

*본 문서는 [rhwp](https://github.com/edwardkim/rhwp) 프로젝트의 실전 개발 경험 및 방법론을 바탕으로 제작된 템플릿입니다. (원본 문서를 복제 및 수정함)*
