# Feature Specification: Invitation UI Refinement

**Feature Branch**: `002-invitation-ui-refinement`  
**Created**: 2026-04-24  
**Status**: Draft  
**Input**: User description: "Refine calendar section, main photo, and contact section to match provided reference designs"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calendar Section Matches Reference Design (Priority: P1)

A guest views the wedding invitation and sees the calendar section displaying July 2026 in a formal, elegant grid layout. The calendar shows "2026년 7월 11일 토요일 오후 5시" as the date heading, "노블발렌티 삼성" as the venue, a large stylized "7" month indicator, and a full grid calendar with thin-bordered cells. Sunday and Saturday day labels appear in pink/red. The wedding date cell (July 11, Saturday) displays a decorative wax seal stamp and dried flower arrangement overlapping that cell area, serving as the highlight instead of a simple colored circle.

**Why this priority**: The calendar is a core informational element of the invitation and the current design does not match the intended visual.

**Independent Test**: Can be verified by viewing the calendar section and comparing against the reference image for layout, typography, grid borders, day coloring, and decorative image placement.

**Acceptance Scenarios**:

1. **Given** a guest opens the invitation, **When** they scroll to the calendar section, **Then** they see a date heading "2026년 7월 11일 토요일 오후 5시" and venue "노블발렌티 삼성" above the calendar grid.
2. **Given** the calendar grid is displayed, **When** a guest views the month indicator, **Then** a large stylized "7" appears centered above the grid in a light serif font.
3. **Given** the calendar grid is displayed, **When** a guest views the day-of-week headers, **Then** "Sun" appears in pink/red text and "Sat" appears in pink/red text while weekdays appear in light gray.
4. **Given** the calendar grid is displayed, **When** a guest views the grid cells, **Then** each cell has thin light-gray borders forming a complete grid, and cells have adequate vertical height for a formal appearance.
5. **Given** the calendar grid is displayed, **When** a guest views the July 11 (Saturday) cell area, **Then** a gold wax seal stamp image and dried flower image appear overlapping or adjacent to that cell, replacing any simple highlight circle.

---

### User Story 2 - Main Photo Updated (Priority: P1)

A guest opens the invitation and sees the updated main wedding photo showing the couple in a full-length portrait: groom in a navy suit and bride in a white gown holding a bouquet, taken in an elegant indoor venue with chandeliers.

**Why this priority**: The main photo is the first visual element guests encounter and must show the correct couple photo.

**Independent Test**: Can be verified by opening the invitation and confirming the header displays the new wedding photo.

**Acceptance Scenarios**:

1. **Given** a guest opens the invitation, **When** the header loads, **Then** the main photo displays the provided couple portrait (full-length, indoor venue).
2. **Given** the main photo is displayed, **When** viewed on a mobile device, **Then** the image is properly framed and not cropped in a way that cuts off the couple.

---

### User Story 3 - Contact Section Matches Reference Design (Priority: P2)

A guest scrolls to the contact/family information section and sees an elegant layout with ornamental flourish dividers (scrollwork/filigree style) framing the family information. The family details display in navy/dark blue text with a formal structure: "김동희 · 조진숙 의 장남 지환" and "강대연 · 장옥분 의 장녀 인화". A "연락하기" (Contact) button appears below with a rounded rectangular border.

**Why this priority**: The contact section presents the families formally and the current design does not match the intended ornamental style.

**Independent Test**: Can be verified by viewing the contact section and comparing against the reference image for text styling, ornamental dividers, and button design.

**Acceptance Scenarios**:

1. **Given** a guest scrolls to the family/contact section, **When** the section loads, **Then** ornamental flourish dividers (scrollwork/filigree) appear above and below the family information area.
2. **Given** the family information is displayed, **When** a guest reads it, **Then** text appears in navy/dark blue color with parent names connected by a centered dot separator ("·"), relationship text ("의 장남" / "의 장녀") in a smaller or lighter weight, and the child's name ("지환" / "인화") in a bolder weight.
3. **Given** the contact section is displayed, **When** a guest views the button area, **Then** a "연락하기" button appears with a rounded rectangular border (not fully circular/pill-shaped).

---

### Edge Cases

- What happens when the wax seal and flower images fail to load on the calendar? A fallback highlight should still indicate July 11 as the wedding date.
- How does the calendar grid render on very narrow screens (< 320px width)? The grid should remain legible with proportionally scaled cells.
- What happens if the ornamental flourish images in the contact section fail to load? The section should still display family information clearly without broken image indicators.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Calendar section MUST display the heading "2026년 7월 11일 토요일 오후 5시" above the grid.
- **FR-002**: Calendar section MUST display "노블발렌티 삼성" as the venue below the date heading.
- **FR-003**: Calendar section MUST display a large, centered "7" as the month indicator in a light serif typeface.
- **FR-004**: Calendar grid MUST show 7 columns (Sun through Sat) with thin-bordered cells forming a complete grid table.
- **FR-005**: Calendar day headers "Sun" and "Sat" MUST appear in pink/red color; weekday headers MUST appear in light gray.
- **FR-006**: Calendar cell for July 11 MUST display a gold wax seal stamp image and a dried flower image as decorative elements overlapping the cell area.
- **FR-007**: Calendar cells MUST have adequate vertical height to create a formal, spacious appearance matching the reference.
- **FR-008**: The main header photo MUST be updated to the provided couple portrait (full-length, indoor venue, groom in navy suit, bride in white gown).
- **FR-009**: Contact/family section MUST display ornamental flourish dividers (scrollwork/filigree style) above and below the family information.
- **FR-010**: Family names MUST display in navy/dark blue color with parent names separated by "·", relationship text in lighter weight, and child name in bolder weight.
- **FR-011**: The "연락하기" button MUST have a rounded rectangular border style.
- **FR-012**: All decorative images (wax seal, flower, ornamental dividers) MUST degrade gracefully if they fail to load.

### Key Entities

- **Calendar Decoration**: Wax seal stamp image and dried flower image positioned on the July 11 cell area.
- **Ornamental Divider**: Scrollwork/filigree decorative element framing the family information section.
- **Main Photo**: Full-length couple portrait used in the invitation header.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Calendar section visually matches the provided reference image in layout, typography, grid structure, and decorative elements when viewed on a standard mobile screen.
- **SC-002**: Main photo displays the correct couple portrait without cropping issues on devices 320px to 430px wide.
- **SC-003**: Contact section displays ornamental dividers and navy-colored family text matching the reference image style.
- **SC-004**: All three updated sections render correctly on both Safari and Chrome mobile browsers.
- **SC-005**: Decorative images (seal, flower, flourishes) load within 2 seconds on a standard mobile connection.

## Assumptions

- The wax seal stamp and dried flower images are provided as separate asset files to be placed in the project.
- The ornamental flourish dividers will use image assets or inline decorative elements provided by the user.
- The new main photo is provided as an image file to replace the existing `main.jpg`.
- Existing functionality (RSVP, gallery, location, transportation) is not affected by these changes.
- The calendar grid style change from the current minimal design to a bordered-cell grid is intentional and desired.
- The contact section text content (family names, relationships) remains unchanged; only the visual presentation is updated.
- The beige/cream background of the calendar and contact sections matches the existing invitation color scheme.
