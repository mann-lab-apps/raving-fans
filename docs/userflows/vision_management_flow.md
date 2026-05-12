# 비전 관리 유저플로우 (Vision Management Flow)

이 문서는 사용자가 팀 비전과 고객 비전을 수립하고 각각의 기대 만족도 및 생산성을 점수화하는 흐름을 정의합니다.

## 1. 개요
사용자는 자신의 서비스(예: 산책)에 대한 이상적인 상태(팀 비전)와 고객으로서 바라는 상태(고객 비전)를 정의하고, 이를 시각화하기 위한 기초 데이터를 입력합니다.

## 2. 시퀀스 다이어그램 (Sequence Diagram)

```mermaid
sequenceDiagram
    actor User as 사용자
    participant App as "프론트엔드 (Next.js)"
    participant Storage as "로컬 저장소 (LocalStorage)"

    User->>App: 비전 설정 페이지 진입
    App->>Storage: 기존 비전 데이터 요청
    Storage-->>App: 비전 데이터 반환 (없을 경우 초기값)
    App-->>User: 비전 입력 폼 출력 (팀/고객 섹션)

    User->>App: 팀 비전 내용 및 점수(흥미/생산성) 입력
    User->>App: 고객 비전 내용 및 점수(흥미/생산성) 입력
    User->>App: '저장하기' 버튼 클릭

    App->>App: 데이터 유효성 검사
    App->>Storage: 비전 데이터 저장 (JSON)
    Storage-->>App: 저장 완료 성공
    App-->>User: 저장 완료 메시지 출력 및 대시보드 이동 유도
```

## 3. 플로우차트 (Flowchart)

```mermaid
graph TD
    A[비전 설정 시작] --> B{"기존 데이터 존재?"}
    B -- "Yes" --> C[기존 내용 불러오기]
    B -- "No" --> D[빈 폼 출력]
    C --> E["팀 비전 작성 및 점수 설정"]
    D --> E
    E --> F["고객 비전 작성 및 점수 설정"]
    F --> G[저장 버튼 클릭]
    G --> H{"유효성 검사"}
    H -- "Fail" --> I[에러 메시지 출력]
    H -- "Pass" --> J["LocalStorage 저장"]
    J --> K[완료 알림 및 종료]
    I --> E
```
