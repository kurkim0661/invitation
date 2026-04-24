# Quickstart: Invitation UI Refinement

**Branch**: `002-invitation-ui-refinement` | **Date**: 2026-04-24

## Prerequisites

- Node.js (existing project setup)
- `npm install` already completed

## Development

```bash
# Start dev server
npm run dev

# View in browser (mobile viewport recommended)
# Default: http://localhost:5173/invitation/
```

## Asset Preparation

Before modifying components, prepare the image assets:

1. **Main photo**: Copy user-provided wedding photo to `public/images/main.jpg` (replace existing)
2. **Wax seal**: Copy `15.png` (from Downloads) to `public/images/wax-seal.png`
3. **Dried flower**: Copy `17.png` (from Downloads) to `public/images/flower.png`

## Components to Modify

| Component | File | Change Type |
|-----------|------|-------------|
| Calendar | `src/components/Calendar.tsx` | Major redesign — grid borders, date heading, venue, decorative images |
| Header | `src/components/Header.tsx` | No code change — only asset replacement |
| FamilyInfo | `src/components/FamilyInfo.tsx` | Restyle — add ornamental dividers, navy text, rounded-rect button |

## Verification

After changes, verify each section by comparing against the reference images:
1. Calendar: Grid borders, font styling, "7" month number, wax seal + flower on July 11
2. Header: New couple photo displays correctly with proper cropping
3. Contact: Navy text, ornamental scrollwork dividers, rounded-rect button
4. Cross-browser: Test on Safari and Chrome mobile viewports
