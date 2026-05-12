# 비전 관리 시나리오 (Vision Management Scenario)

**출처**: [비전 관리 유저플로우](file:///Users/gimjaeman/Desktop/coding/mannlab/raving-fans/docs/userflows/vision_management_flow.md)
**관련 기능**: F02(팀 비전 수립), F03(고객 비전 수립)

Feature: 비전 수립 및 점수 설정
  사용자가 팀 비전과 고객 비전을 작성하고 각각의 지표(흥미, 생산성)를 점수화하여 저장할 수 있어야 한다.

  Background:
    Given 사용자가 비전 설정 페이지에 접속해 있다.

  Scenario: 새로운 비전 정보를 입력하고 저장한다.
    When 사용자가 팀 비전 내용에 "이상적인 산책"을 입력한다.
    And 팀 비전의 흥미 점수를 5점으로 설정한다.
    And 팀 비전의 생산성 점수를 4점으로 설정한다.
    And 사용자가 고객 비전 내용에 "바라는 산책"을 입력한다.
    And 고객 비전의 흥미 점수를 4점으로 설정한다.
    And 고객 비전의 생산성 점수를 5점으로 설정한다.
    And "저장하기" 버튼을 클릭한다.
    Then 비전 데이터가 로컬 저장소에 안전하게 저장된다.
    And "저장되었습니다"라는 성공 메시지가 표시된다.

  Scenario: 입력값 없이 저장하려고 할 때의 예외 처리
    When 사용자가 모든 입력란을 비워둔 채 "저장하기" 버튼을 클릭한다.
    Then "내용을 입력해주세요"라는 경고 메시지가 표시된다.
    And 데이터가 저장되지 않는다.
