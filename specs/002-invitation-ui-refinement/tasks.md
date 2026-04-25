# Tasks: Invitation UI Refinement

**Input**: Design documents from `/specs/002-invitation-ui-refinement/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/ui-sections.md

**Tests**: Not requested for this feature. Verification is via visual comparison against reference images.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Prepare all image assets before modifying components

- [x] T001 [P] Copy wax seal image from /Users/jihwankim/Downloads/15.png to public/images/wax-seal.png
- [x] T002 [P] Copy dried flower image from /Users/jihwankim/Downloads/17.png to public/images/flower.png
- [x] T003 [P] Copy new wedding photo from "/Users/jihwankim/Downloads/모청메인 1.png" to public/images/main.jpg (replace existing)
- [x] T004 Optimize all new images for web delivery (target < 300KB each, preserve transparency for PNG files) using available CLI tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared style changes that support multiple user stories

**⚠️ CRITICAL**: Complete before user story implementation

- [x] T005 Add navy color theme variable (--color-navy: #3B4B8A or similar matching reference) to src/index.css @theme block

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Calendar Section Matches Reference Design (Priority: P1) 🎯 MVP

**Goal**: Redesign the calendar section to match the reference image with formal grid, date heading, venue, and decorative wax seal + flower images on July 11

**Independent Test**: Open the invitation, scroll to the calendar section, and visually compare against the reference image for grid borders, font styling, "7" month number, day header colors (Sun/Sat in pink), cell height, and wax seal + flower placement on July 11

### Implementation for User Story 1

- [x] T006 [US1] Update Calendar component props interface to accept weddingDateDisplay (string) and venueName (string) in src/components/Calendar.tsx
- [x] T007 [US1] Add date heading ("2026년 7월 11일 토요일 오후 5시") and venue name ("노블발렌티 삼성") above the month indicator in src/components/Calendar.tsx
- [x] T008 [US1] Restyle calendar grid to use thin light-gray bordered cells with ~60-70px minimum height, date numbers left-aligned at top of each cell in src/components/Calendar.tsx
- [x] T009 [US1] Update day-of-week headers so Sun and Sat appear in pink/red color while Mon-Fri appear in light gray in src/components/Calendar.tsx
- [x] T010 [US1] Replace the circular highlight on July 11 with absolutely positioned wax seal (public/images/wax-seal.png) and flower (public/images/flower.png) images overlapping the bottom-right of the cell area in src/components/Calendar.tsx
- [x] T011 [US1] Update App.tsx to pass weddingDateDisplay and venueName props from invitation data to the Calendar component in src/App.tsx

**Checkpoint**: Calendar section matches reference image - grid borders, typography, decorative images all correct

---

## Phase 4: User Story 2 - Main Photo Updated (Priority: P1)

**Goal**: Display the updated main wedding couple portrait in the header

**Independent Test**: Open the invitation and verify the header shows the new full-length couple portrait (groom in navy suit, bride in white gown, indoor venue) without cropping issues on mobile viewport

### Implementation for User Story 2

- [x] T012 [US2] Verify the replaced public/images/main.jpg displays correctly in the Header component, checking that the aspect-[3/4] and object-cover CSS produce proper framing of the full-length portrait in src/components/Header.tsx

**Checkpoint**: Main photo displays the correct couple portrait with no cropping issues on 320-430px viewports

---

## Phase 5: User Story 3 - Contact Section Matches Reference Design (Priority: P2)

**Goal**: Restyle the family info / contact section with ornamental flourish dividers, navy text, and rounded-rect button matching the reference design

**Independent Test**: Scroll to the contact section and visually compare against the reference image for ornamental scrollwork dividers, navy-colored text with correct weight hierarchy (parent names · relationship · child name bold), and rounded-rect "연락하기" button

### Implementation for User Story 3

- [x] T013 [P] [US3] Create an inline SVG ornamental flourish divider component matching the scrollwork/filigree style from the reference image (heart/diamond center motif with flowing curves) in src/components/FamilyInfo.tsx
- [x] T014 [US3] Restyle the FamilyInfo component: add ornamental SVG dividers above and below family text, apply navy/dark blue (#3B4B8A) text color, adjust font weights (parent names regular, relationship text smaller/lighter, child name bold) in src/components/FamilyInfo.tsx
- [x] T015 [US3] Change the "연락하기" button from rounded-pill (rounded-full) to rounded-rectangle style (border-radius ~8-12px) with thin border in src/components/FamilyInfo.tsx
- [x] T016 [US3] Add warm beige/cream background color (#F5F0E8 or similar) to the contact section and ensure generous vertical padding between elements in src/components/FamilyInfo.tsx

**Checkpoint**: Contact section shows ornamental dividers, navy text with weight hierarchy, and rounded-rect button matching reference

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all updated sections

- [ ] T017 [P] Verify all three sections render correctly on Safari mobile viewport (375px width)
- [ ] T018 [P] Verify all three sections render correctly on Chrome mobile viewport (375px width)
- [ ] T019 Verify decorative images (wax seal, flower, flourish dividers) degrade gracefully when images fail to load — fallback highlight should still indicate July 11 on calendar
- [ ] T020 Verify calendar grid renders legibly on narrow screens (320px width) with proportionally scaled cells
- [x] T021 Run quickstart.md validation — start dev server and compare all sections against reference images

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Can run in parallel with Setup
- **User Story 1 (Phase 3)**: Depends on Setup (T001, T002 for images) and Foundational (T005 for colors)
- **User Story 2 (Phase 4)**: Depends on Setup (T003 for photo replacement) only
- **User Story 3 (Phase 5)**: Depends on Foundational (T005 for navy color)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Needs wax seal + flower assets (T001, T002) and navy color variable (T005)
- **User Story 2 (P1)**: Needs main photo replaced (T003) — can run in parallel with US1 and US3
- **User Story 3 (P2)**: Needs navy color variable (T005) — can run in parallel with US1 and US2

### Parallel Opportunities

- T001, T002, T003 can all run in parallel (different files)
- US1, US2, US3 can all start in parallel once Setup and Foundational phases are complete
- T013 (SVG creation) can run in parallel with other US3 tasks
- T017, T018 (browser testing) can run in parallel

---

## Parallel Example: Setup Phase

```bash
# Launch all asset copies in parallel:
Task: "Copy wax seal image to public/images/wax-seal.png"
Task: "Copy dried flower image to public/images/flower.png"  
Task: "Copy new wedding photo to public/images/main.jpg"
```

## Parallel Example: User Stories (after Setup + Foundational)

```bash
# All three user stories can run in parallel:
Task: "Redesign Calendar.tsx - grid, heading, decorative images"
Task: "Verify main.jpg displays correctly in Header"
Task: "Restyle FamilyInfo.tsx - dividers, navy text, button"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Complete Phase 1: Asset preparation (copy all images)
2. Complete Phase 2: Add navy color variable
3. Complete Phase 3: Calendar redesign (highest visual impact)
4. Complete Phase 4: Main photo verification
5. **STOP and VALIDATE**: Check calendar and header against references
6. Deploy if calendar + photo are correct

### Incremental Delivery

1. Complete Setup + Foundational → Assets + colors ready
2. Add User Story 1 (Calendar) → Validate against reference → Most impactful change
3. Add User Story 2 (Main Photo) → Validate framing → Quick win
4. Add User Story 3 (Contact) → Validate against reference → Final polish
5. Polish phase → Cross-browser + fallback verification

---

## Notes

- No tests are included — verification is purely visual comparison against reference images
- US2 (Main Photo) is primarily an asset swap; T012 is a verification/adjustment task
- The SVG ornamental divider (T013) requires design skill to match the reference scrollwork pattern
- All changes are CSS/JSX only — no data model or business logic changes
- Existing functionality (RSVP, Gallery, Location, Transportation) is not affected
