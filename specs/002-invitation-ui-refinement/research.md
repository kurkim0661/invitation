# Research: Invitation UI Refinement

**Branch**: `002-invitation-ui-refinement` | **Date**: 2026-04-24

## Calendar Grid Design

**Decision**: Replace current minimal calendar (no borders, circular day highlight) with a formal grid table using thin-bordered cells, matching the reference image.

**Rationale**: The reference image shows a traditional calendar grid with visible cell borders, adequate vertical cell height, and decorative images (wax seal + flower) on the wedding date cell. This is a purely visual change to an existing component.

**Alternatives considered**:
- Keep current minimal design → Rejected: does not match reference
- Use a third-party calendar library → Rejected: overkill for a static display-only calendar

## Calendar Decorative Elements

**Decision**: Use provided wax seal stamp image and dried flower image as absolutely positioned decorative overlays on the July 11 cell area.

**Rationale**: User provided both images (gold wax seal with rose pattern, dried flower stems). These replace the simple colored circle highlight. Position them overlapping the bottom-right of the July 11 cell area, matching the reference.

**Alternatives considered**:
- CSS-only decoration → Rejected: impossible to replicate the specific wax seal and flower designs
- Embedding images inside the cell → Rejected: images should overlap cell boundaries as shown in reference

## Main Photo Replacement

**Decision**: Replace `public/images/main.jpg` with the provided couple portrait.

**Rationale**: Direct file replacement. The user provided the new photo (full-length, indoor venue, groom in navy suit, bride in white gown). No component logic changes needed — only the image file changes.

**Alternatives considered**: None — straightforward asset swap.

## Contact Section Ornamental Dividers

**Decision**: Use SVG-based ornamental flourish dividers matching the scrollwork/filigree style in the reference image.

**Rationale**: The reference shows elaborate scrollwork with a central heart/diamond motif and flowing curves. An SVG or inline SVG approach provides:
- Crisp rendering at all screen sizes
- Color matching with the navy theme
- No additional image file downloads

**Alternatives considered**:
- Raster image (PNG) → Rejected: blurry on high-DPI screens, less flexible for color changes
- CSS-only borders/decorations → Rejected: too simple to replicate the ornate scrollwork design
- Web font icon (dingbats) → Rejected: limited design options, harder to match exact reference

## Contact Section Text Styling

**Decision**: Apply navy/dark blue color (#3B4B8A or similar) to family information text, with typographic weight variation for parent names vs. relationship text vs. child name.

**Rationale**: Reference image clearly shows navy-colored text with: parent names in regular weight separated by "·", relationship text in smaller/lighter weight, and child name in bold weight. Background is beige/cream (#F5F0E8 or similar).

**Alternatives considered**: None — straightforward CSS styling changes.
