# Data Model: Invitation UI Refinement

**Branch**: `002-invitation-ui-refinement` | **Date**: 2026-04-24

## Overview

This feature involves no data model changes. The existing `Invitation` data structure in `src/data/invitation.ts` already contains all required information (family names, wedding date, venue). Changes are purely visual/presentational.

## New Static Assets

### Image Assets

| Asset | Source | Destination | Purpose |
|-------|--------|-------------|---------|
| Wax seal stamp | User-provided (`15.png`) | `public/images/wax-seal.png` | Calendar decoration on July 11 cell |
| Dried flower | User-provided (`17.png`) | `public/images/flower.png` | Calendar decoration on July 11 cell |
| Main couple photo | User-provided (`모청메인 1.png`) | `public/images/main.jpg` | Replace existing header photo |

### SVG Assets (to be created)

| Asset | Destination | Purpose |
|-------|-------------|---------|
| Ornamental flourish divider | Inline SVG in FamilyInfo component | Decorative scrollwork above/below family info |

## Existing Entities (unchanged)

- **Family**: `{ side, fatherName, motherName, relation, childName }` — no changes
- **Contact**: `{ name, role, phone }` — no changes
- **Invitation**: Top-level object — no structural changes

## Validation Rules

- Wax seal and flower images must have transparent backgrounds (PNG format)
- Main photo must be optimized for web (target < 300KB for mobile performance)
- SVG ornamental dividers must render at any width without distortion
