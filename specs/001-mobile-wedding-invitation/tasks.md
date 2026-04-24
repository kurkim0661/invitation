# Tasks: 모바일 청첩장 (Mobile Wedding Invitation)

**Input**: Design documents from `specs/001-mobile-wedding-invitation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-sections.md

**Tests**: Not explicitly requested in the feature specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize React + Vite + TypeScript + Tailwind CSS project

- [X] T001 Initialize Vite project with React and TypeScript template, install core dependencies (react, react-dom, typescript) in project root
- [X] T002 Install and configure Tailwind CSS 3 with PostCSS and autoprefixer in tailwind.config.js and postcss.config.js
- [X] T003 [P] Create directory structure: src/components/, src/data/, src/hooks/, public/images/, public/fonts/
- [X] T004 [P] Create .env.example with VITE_KAKAO_MAP_API_KEY placeholder and add .env to .gitignore
- [X] T005 [P] Configure global styles with Tailwind directives and base font settings in src/index.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data types, static data, and app shell that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Define all TypeScript interfaces (Invitation, Family, Contact, Venue, Transportation, TransportLine, Parking, GalleryImage, ExternalLinks) based on data-model.md in src/data/types.ts
- [X] T007 Create static invitation data with all wedding details (names, date, venue, families, contacts, transportation, gallery images, external links) in src/data/invitation.ts
- [X] T008 Create App.tsx shell that imports and renders all section components in Figma design order (Header → Greeting → Calendar → FamilyInfo → Rsvp → Gallery → Location → Transportation) in src/App.tsx
- [X] T009 [P] Set up main entry point with React root render in src/main.tsx
- [X] T010 [P] Add placeholder wedding images to public/images/ for development (main photo, gallery samples)

**Checkpoint**: Foundation ready — `npm run dev` shows empty section placeholders in correct order

---

## Phase 3: User Story 1 — 청첩장 열람 (Priority: P1) 🎯 MVP

**Goal**: 하객이 청첩장 링크를 열면 결혼식 핵심 정보(사진, 인사말, 날짜, 달력, 혼주 정보)를 확인할 수 있다

**Independent Test**: 브라우저에서 dev 서버 접속 시 Wedding Day 헤더, 메인 사진, 인사말, 날짜, 달력(7월 11일 강조), 혼주 정보가 모두 표시됨

### Implementation for User Story 1

- [X] T011 [P] [US1] Implement Header component: "Wedding Day" script font title, full-width main wedding photo, couple names "지환, 인화" in src/components/Header.tsx
- [X] T012 [P] [US1] Implement Greeting component: centered greeting text, wedding date "2026년 7월 11일 토요일 오후 5시", venue "노블발렌티 삼성" in src/components/Greeting.tsx
- [X] T013 [P] [US1] Implement Calendar component: July 2026 calendar grid with Sun-Sat headers, highlight day 11 with circle/background accent in src/components/Calendar.tsx
- [X] T014 [P] [US1] Implement FamilyInfo component: groom side "김동희ㆍ조진숙 의 장남 지환", bride side "강대연ㆍ장옥분 의 장녀 인화", and "연락하기" button placeholder in src/components/FamilyInfo.tsx
- [X] T015 [US1] Wire US1 components into App.tsx sections, verify all display correctly with Figma design matching in src/App.tsx

**Checkpoint**: User Story 1 fully functional — 하객이 청첩장 메인 정보를 확인할 수 있음

---

## Phase 4: User Story 2 — 오시는 길 확인 (Priority: P1)

**Goal**: 하객이 카카오맵 지도, 주소 복사, 교통편(지하철/버스/셔틀/주차) 정보를 확인할 수 있다

**Independent Test**: LOCATION 섹션에서 카카오맵 마커 표시, 주소 복사 버튼 동작, 모든 교통편 정보 표시 확인

### Implementation for User Story 2

- [X] T016 [P] [US2] Implement useClipboard hook with navigator.clipboard.writeText and document.execCommand('copy') fallback in src/hooks/useClipboard.ts
- [X] T017 [P] [US2] Implement Kakao Maps SDK loader: dynamically load script via VITE_KAKAO_MAP_API_KEY env var in src/hooks/useKakaoMap.ts
- [X] T018 [US2] Implement Location component: "LOCATION" title, venue name, address with Copy button (uses useClipboard), embedded Kakao Map with marker at venue coordinates in src/components/Location.tsx
- [X] T019 [US2] Implement Transportation component: subway section (9호선 봉은사역 4번출구 도보4분, 2호선 삼성역 8번출구 도보15분), bus section (3417번, 강남01번), shuttle section (봉은사역 5번출구 5분간격), parking section (본관 100대, 별관 200대) with icons and walk time indicators in src/components/Transportation.tsx
- [X] T020 [US2] Wire US2 components into App.tsx, verify map loads and address copy works on mobile in src/App.tsx

**Checkpoint**: User Story 2 fully functional — 하객이 오시는 길 정보를 모두 확인할 수 있음

---

## Phase 5: User Story 3 — 참석 여부 전달 (Priority: P2)

**Goal**: 하객이 "참석 여부 전달하기" 버튼을 눌러 Google Form으로 이동할 수 있다

**Independent Test**: 버튼 클릭 시 새 탭에서 Google Form URL이 열리는지 확인

### Implementation for User Story 3

- [X] T021 [US3] Implement Rsvp component: guidance text "축하의 마음으로 참석해주실 모든 분을 정중히 모시고자 하오니, 참석 여부를 알려주시면 감사하겠습니다", "참석 여부 전달하기" button that opens rsvpFormUrl from invitation data in new tab in src/components/Rsvp.tsx
- [X] T022 [US3] Wire Rsvp component into App.tsx between FamilyInfo and Gallery sections in src/App.tsx

**Checkpoint**: User Story 3 fully functional — 참석 여부 버튼이 Google Form으로 정상 리다이렉트

---

## Phase 6: User Story 4 — 갤러리 감상 (Priority: P2)

**Goal**: 하객이 웨딩 사진 그리드를 보고, 탭하면 풀스크린 뷰어에서 좌우 스와이프로 탐색할 수 있다

**Independent Test**: GALLERY 섹션에서 그리드 사진 표시, 탭 시 풀스크린 전환, 좌우 스와이프 동작 확인

### Implementation for User Story 4

- [X] T023 [US4] Install Swiper.js dependency (swiper) via npm
- [X] T024 [US4] Implement Gallery component: "GALLERY" title, photo grid layout from galleryImages data, tap to open fullscreen Swiper viewer with left/right swipe navigation and close button in src/components/Gallery.tsx
- [X] T025 [US4] Wire Gallery component into App.tsx, verify grid display and fullscreen swipe on mobile in src/App.tsx

**Checkpoint**: User Story 4 fully functional — 갤러리 사진 그리드 표시 및 풀스크린 스와이프 탐색 동작

---

## Phase 7: User Story 5 — 혼주 연락하기 (Priority: P3)

**Goal**: 하객이 "연락하기" 버튼을 눌러 팝업에서 신랑/신부/혼주에게 전화 또는 문자를 보낼 수 있다

**Independent Test**: 연락하기 버튼 → 모달 표시 → 6명 연락처 목록 → 전화/문자 아이콘 탭 시 tel:/sms: 동작 확인

### Implementation for User Story 5

- [X] T026 [US5] Implement ContactModal component: overlay modal with contact list (지환/신랑, 인화/신부, 김동희/신랑아버지, 조진숙/신랑어머니, 강대연/신부아버지, 장옥분/신부어머니), each with phone (tel:) and SMS (sms:) action buttons, close on X button or outside click in src/components/ContactModal.tsx
- [X] T027 [US5] Connect FamilyInfo "연락하기" button to open ContactModal with state management in src/components/FamilyInfo.tsx

**Checkpoint**: User Story 5 fully functional — 연락하기 팝업에서 전화/문자 연결 동작

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 모바일 최적화, 성능, 공유 메타데이터 등 모든 스토리에 걸치는 개선

- [X] T028 [P] Mobile responsive fine-tuning: verify all sections match Figma design on iPhone SE ~ iPhone 16 Pro Max viewport sizes in src/components/*.tsx
- [X] T029 [P] Add lazy loading for gallery images and below-the-fold content with loading="lazy" attribute in src/components/Gallery.tsx and src/components/Header.tsx
- [X] T030 [P] Add Open Graph meta tags (og:title, og:description, og:image) and favicon for KakaoTalk/SNS link sharing in index.html
- [X] T031 [P] Add smooth scroll behavior and section fade-in animations for polished UX in src/index.css and src/App.tsx
- [X] T032 Configure Vite build for production optimization (minification, image compression) and verify Vercel deployment in vite.config.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — MVP, implement first
- **US2 (Phase 4)**: Depends on Foundational — can run in parallel with US1
- **US3 (Phase 5)**: Depends on Foundational — can run in parallel with US1/US2
- **US4 (Phase 6)**: Depends on Foundational + Swiper install — can run in parallel with US1/US2/US3
- **US5 (Phase 7)**: Depends on US1 (FamilyInfo component) — needs FamilyInfo button wired
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Independent — core display only
- **US2 (P1)**: Independent — map/transportation section
- **US3 (P2)**: Independent — single button redirect
- **US4 (P2)**: Independent — gallery section
- **US5 (P3)**: Depends on US1 (FamilyInfo component provides the trigger button)

### Within Each User Story

- Components can be built in parallel when marked [P]
- Final wiring into App.tsx depends on all story components being ready

### Parallel Opportunities

**Phase 2** — T009 and T010 can run in parallel with T006-T008

**Phase 3 (US1)** — All four components can be built simultaneously:
```
T011 Header.tsx  ─┐
T012 Greeting.tsx ─┤── all [P] ──→ T015 Wire into App.tsx
T013 Calendar.tsx ─┤
T014 FamilyInfo.tsx┘
```

**Phase 4 (US2)** — Hooks can be built in parallel, then components:
```
T016 useClipboard.ts ─┐── [P] ──→ T018 Location.tsx ──→ T020 Wire
T017 useKakaoMap.ts  ─┘           T019 Transportation.tsx ─┘
```

**Phase 5+6 (US3/US4)** — Can run entirely in parallel with each other

**Phase 8** — T028, T029, T030, T031 all run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Vite + React + Tailwind)
2. Complete Phase 2: Foundational (types, data, app shell)
3. Complete Phase 3: User Story 1 (Header, Greeting, Calendar, FamilyInfo)
4. **STOP and VALIDATE**: 브라우저에서 결혼식 핵심 정보 표시 확인
5. Deploy to Vercel if ready

### Incremental Delivery

1. Setup + Foundational → Project scaffold ready
2. Add US1 (청첩장 열람) → Test → Deploy (MVP!)
3. Add US2 (오시는 길) → Test → Deploy
4. Add US3 + US4 (참석여부 + 갤러리) → Test → Deploy (parallel)
5. Add US5 (연락하기) → Test → Deploy
6. Polish → Final Deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks included (not requested in spec); add manually if TDD desired
