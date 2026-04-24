# UI Section Contracts: Invitation UI Refinement

**Branch**: `002-invitation-ui-refinement` | **Date**: 2026-04-24

## Modified Sections

### 1. Calendar Section (`Calendar.tsx`)

**Current**: Minimal grid with no borders, circular accent-color highlight on wedding day.

**Target**: Formal calendar grid matching reference design.

**Visual Contract**:
- **Date heading**: "2026년 7월 11일 토요일 오후 5시" — serif font, centered, above venue
- **Venue**: "노블발렌티 삼성" — sans-serif, smaller, centered below date
- **Month indicator**: Large "7" — light serif, centered, generous spacing
- **Day headers**: Sun/Sat in pink/red (#E8A0A0 or similar), Mon-Fri in light gray (#999)
- **Grid**: 7 columns, thin light-gray borders on all cells, cells have ~60-70px minimum height
- **Date numbers**: Sans-serif, left-aligned within cells, positioned at top of cell
- **Wedding day (11)**: No colored circle; instead, wax seal + flower images overlap from bottom-right of cell area, extending slightly beyond cell boundary
- **Background**: Beige/cream (#FAFAF8) consistent with existing theme

**Props Contract** (additions to existing):
```
weddingDate: string        // existing
weddingDateDisplay: string // new - formatted display string
venueName: string          // new - venue name for display
```

### 2. Header Section (`Header.tsx`)

**Current**: Uses `public/images/main.jpg` as main photo.

**Target**: Same component, updated image file.

**Visual Contract**:
- Replace image file at `public/images/main.jpg` with new couple portrait
- Maintain existing aspect ratio behavior (`aspect-[3/4]`, `object-cover`)
- No component code changes expected — only asset replacement
- Verify cropping looks correct with the new full-length portrait

### 3. Family Info / Contact Section (`FamilyInfo.tsx`)

**Current**: Simple text layout with rounded-pill contact button, no decorative elements.

**Target**: Elegant layout with ornamental dividers, navy text, and rounded-rect button.

**Visual Contract**:
- **Background**: Beige/cream (#F5F0E8 or similar warm neutral)
- **Ornamental divider (top)**: SVG scrollwork/filigree, navy/steel-blue color, centered, ~60% of container width
- **Family text**: 
  - Color: Navy/dark blue (#3B4B8A or similar)
  - Parent names: Regular weight, separated by " · " (centered dot)
  - Relationship: Smaller font size or lighter weight ("의 장남" / "의 장녀")
  - Child name: Bold weight ("지환" / "인화")
  - Line format: `[아버지] · [어머니] 의 [관계] [이름]`
- **Ornamental divider (bottom)**: Same SVG as top, possibly mirrored
- **연락하기 button**: Rounded rectangle (border-radius ~8-12px), thin border, centered below dividers
- **Spacing**: Generous vertical padding between dividers and text

**Props Contract** (unchanged):
```
families: Family[]
onContactClick: () => void
```
