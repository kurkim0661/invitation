# Mobile Invitation Plan

## Goal
GitHub Pages로 배포 가능한 모바일 청첩장 MVP를 만든다.

## Confirmed Decisions
- 호스팅: GitHub Pages
- 참석의사 전달(RSVP): Google Form 리다이렉트
- RSVP 링크: `https://forms.gle/TjiMDuPTEdXHm5699`
- 백엔드/DB는 MVP 범위에서 제외

## MVP Scope
- 메인 인사말/커버 섹션
- 예식 정보(날짜, 시간, 장소)
- 신랑/신부 및 가족 정보
- 갤러리 또는 대표 사진
- 오시는 길 / 지도 링크
- 연락 버튼
- 참석의사 전달 버튼

## RSVP Approach
- 청첩장 내 CTA 버튼 클릭 시 Google Form 새 탭 이동
- 응답 저장과 관리 기능은 Google Forms가 담당
- 사이트 자체에서는 참석 데이터 저장을 하지 않음

## Suggested Structure
- `index.html` — 단일 페이지 엔트리
- `assets/images/` — 사진 및 아이콘
- `assets/styles/` — CSS
- `assets/scripts/` — 인터랙션 JS
- `plans/` — 방향성과 범위 문서

## Reference Materials
- `plans/materials/noble-valenti-samsung-directions.md` — 노블발렌티 삼성 오시는 길 공식 자료 요약

## Development Phases
1. 기본 단일 페이지 레이아웃 구성
2. 청첩장 카피/사진 반영
3. RSVP 버튼 및 외부 링크 연결
4. 모바일 반응형/가독성 조정
5. GitHub Pages 배포

## Future Enhancements
- Google Form prefill 링크로 이름/관계 자동 입력
- 캘린더 저장 버튼
- 카카오/지도 앱 딥링크
- 다크 모드 또는 테마 스위치
- 애니메이션 및 스크롤 효과

## Open Items
- 최종 문구와 사진 자산 확정
- 지도 삽입 방식(정적 이미지 vs 외부 링크) 선택
- 폰트 및 컬러 테마 결정
