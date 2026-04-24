# Implementation Plan: Invitation UI Refinement

**Branch**: `002-invitation-ui-refinement` | **Date**: 2026-04-24 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-invitation-ui-refinement/spec.md`

## Summary

기존 모바일 청첩장의 3개 섹션(달력, 메인 사진, 연락처)을 참조 디자인 이미지에 맞춰 리파인한다. 달력은 테두리 있는 정식 그리드 테이블로 변경하고 인장+꽃 장식 이미지를 7월 11일 셀에 배치한다. 메인 사진을 새 웨딩 사진으로 교체한다. 연락처 섹션에 장식 구분선(스크롤워크)을 추가하고 텍스트 색상을 네이비로 변경한다.

## Technical Context

**Language/Version**: TypeScript 6.x  
**Primary Dependencies**: React 19, Vite 8, Tailwind CSS 4  
**Storage**: N/A (정적 데이터, 프론트엔드 상수 파일)  
**Testing**: Visual comparison against reference images  
**Target Platform**: 모바일 웹 브라우저 (Safari, Chrome) — iOS 15+, Android 10+  
**Project Type**: Static SPA (Single Page Application)  
**Performance Goals**: 장식 이미지 포함 2초 이내 로딩  
**Constraints**: 모바일 최적화 우선, 기존 기능 영향 없음  
**Scale/Scope**: 3개 컴포넌트 수정, 3개 이미지 에셋 추가, 1개 SVG 에셋 생성

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution이 아직 정의되지 않음 (템플릿 상태). 별도의 gate 위반 없이 진행.

**Post-Phase 1 재확인**: 위반 사항 없음. 기존 구조 내에서 컴포넌트 수정만 진행.

## Project Structure

### Documentation (this feature)

```text
specs/002-invitation-ui-refinement/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── ui-sections.md   # UI 섹션 계약 (Calendar, Header, FamilyInfo)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Calendar.tsx        # [MODIFY] 그리드 테이블 + 날짜 헤딩 + 인장/꽃 이미지
│   ├── Header.tsx          # [NO CHANGE] 이미지 에셋만 교체
│   ├── FamilyInfo.tsx      # [MODIFY] 장식 구분선 + 네이비 텍스트 + 둥근 사각 버튼
│   └── ...                 # 나머지 컴포넌트 변경 없음
├── data/
│   └── invitation.ts       # [NO CHANGE] 데이터 구조 변경 없음
├── App.tsx                 # [MINOR] Calendar에 추가 props 전달
└── index.css               # [MINOR] 네이비 색상 테마 변수 추가 가능

public/
└── images/
    ├── main.jpg            # [REPLACE] 새 웨딩 사진
    ├── wax-seal.png        # [NEW] 인장 이미지
    └── flower.png          # [NEW] 꽃 이미지
```

**Structure Decision**: 기존 단일 프로젝트 구조 유지. 기존 컴포넌트 파일 내에서 수정하고, 새 이미지 에셋을 `public/images/`에 추가한다.

## Complexity Tracking

해당 없음. Constitution gate 위반 사항 없음.
