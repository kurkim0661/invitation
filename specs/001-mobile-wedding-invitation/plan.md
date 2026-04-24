# Implementation Plan: 모바일 청첩장

**Branch**: `001-mobile-wedding-invitation` | **Date**: 2026-04-24 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-mobile-wedding-invitation/spec.md`

## Summary

Figma 디자인 기반의 모바일 청첩장 단일 페이지 웹 애플리케이션을 구현한다. React + Vite + Tailwind CSS로 정적 SPA를 구축하며, 카카오맵 임베드, 갤러리 풀스크린 뷰어(Swiper.js), 연락처 모달, Google Form RSVP 리다이렉트 기능을 포함한다. 백엔드 없이 정적 파일로 Vercel에 배포한다.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18, Vite 5, Tailwind CSS 3, Swiper.js  
**Storage**: N/A (정적 데이터, 프론트엔드 상수 파일)  
**Testing**: Vitest (단위), Playwright (E2E)  
**Target Platform**: 모바일 웹 브라우저 (Safari, Chrome) — iOS 15+, Android 10+  
**Project Type**: Static SPA (Single Page Application)  
**Performance Goals**: 초기 콘텐츠 로딩 3초 이내, 부드러운 스크롤/스와이프  
**Constraints**: 모바일 최적화 우선, 정적 호스팅, 외부 API 최소화 (카카오맵만)  
**Scale/Scope**: 단일 페이지, 8개 섹션, 예상 트래픽 수백~수천 방문자

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution이 아직 정의되지 않음 (템플릿 상태). 별도의 gate 위반 없이 진행.

**Post-Phase 1 재확인**: 위반 사항 없음. 단일 프로젝트, 단순 구조, 외부 의존성 최소화.

## Project Structure

### Documentation (this feature)

```text
specs/001-mobile-wedding-invitation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── ui-sections.md   # UI 섹션 계약
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/          # React 컴포넌트
│   ├── Header.tsx       # Wedding Day 헤더 + 메인 사진
│   ├── Greeting.tsx     # 인사말 섹션
│   ├── Calendar.tsx     # 달력 컴포넌트
│   ├── FamilyInfo.tsx   # 혼주 정보 + 연락하기 버튼
│   ├── ContactModal.tsx # 연락처 팝업 모달
│   ├── Rsvp.tsx         # 참석 여부 (Google Form 링크)
│   ├── Gallery.tsx      # 갤러리 그리드 + 풀스크린 뷰어
│   ├── Location.tsx     # 카카오맵 임베드 + 주소 복사
│   └── Transportation.tsx # 교통편 안내
├── data/
│   └── invitation.ts    # 청첩장 정적 데이터
├── hooks/
│   └── useClipboard.ts  # 클립보드 복사 훅
├── App.tsx              # 메인 앱 (섹션 조합)
├── main.tsx             # 엔트리포인트
└── index.css            # 글로벌 스타일 + Tailwind

public/
├── images/              # 웨딩 사진, 아이콘 등
└── fonts/               # 웹폰트 (선택)

tests/
├── unit/                # Vitest 단위 테스트
└── e2e/                 # Playwright E2E 테스트
```

**Structure Decision**: 단일 프로젝트 구조 (Single SPA). 백엔드가 없으므로 프론트엔드만 구성. 컴포넌트는 Figma 디자인의 섹션 단위로 분리하여 각 섹션을 독립적으로 개발/테스트 가능하게 한다.

## Complexity Tracking

해당 없음. Constitution gate 위반 사항 없음.
